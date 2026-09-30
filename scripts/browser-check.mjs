import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const baseURL = process.env.PORTFOLIO_URL || 'http://localhost:5173/'
const localBrowsers = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe']
const executablePath = localBrowsers.find(existsSync)
const browser = await chromium.launch({ ...(executablePath ? { executablePath } : {}), headless: true })
const failures = []
await mkdir('qa', { recursive: true })
try {
  for (const [label, width, height] of [['desktop', 1440, 900], ['tablet', 820, 1180], ['mobile', 390, 844], ['small-mobile', 320, 700]]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    page.on('pageerror', error => failures.push(`${label} page error: ${error.message}`))
    page.on('console', message => { if (message.type() === 'error') failures.push(`${label} console: ${message.text()}`) })
    const response = await page.goto(baseURL, { waitUntil: 'networkidle' })
    if (label === 'mobile' || label === 'small-mobile') await page.screenshot({ path: `qa/${label}-initial.png`, animations: 'disabled' })
    if (response?.status() !== 200) failures.push(`${label}: HTTP ${response?.status()}`)
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < pageHeight; y += Math.floor(height * 0.65)) {
      await page.evaluate(position => window.scrollTo(0, position), y)
      await page.waitForTimeout(55)
    }
    await page.locator('#home').scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    const dimensions = await page.evaluate(() => ({ body: document.body.scrollWidth, viewport: innerWidth, sections: [...document.querySelectorAll('main > section[id]')].map(element => element.id) }))
    if (dimensions.body > width + 2) failures.push(`${label}: horizontal overflow ${dimensions.body} > ${width}`)
    if (dimensions.sections.join(',') !== 'home,about,skills,projects,achievements,education,contact') failures.push(`${label}: missing sections ${dimensions.sections}`)
    if (label === 'desktop' || label === 'mobile') {
      const report = await new AxeBuilder({ page }).analyze()
      for (const violation of report.violations) {
        failures.push(`${label} accessibility ${violation.id}: ${violation.nodes.length} element(s)`)
        console.log(violation.nodes.map(node => `${node.target.join(' ')} :: ${node.failureSummary}`).join('\n'))
      }
    }
    await page.screenshot({ path: `qa/${label}.png`, fullPage: true, animations: 'disabled', timeout: 60000 })
    if (label === 'desktop') {
      for (const id of ['home', 'skills', 'projects', 'achievements', 'education', 'contact']) {
        await page.locator(`#${id}`).scrollIntoViewIfNeeded()
        await page.waitForTimeout(150)
        await page.screenshot({ path: `qa/${id}-viewport.png`, animations: 'disabled' })
      }
    }
    if (label === 'desktop') {
      await page.getByRole('tab', { name: /AI \/ RAG/ }).click()
      if (!(await page.getByRole('tabpanel').textContent())?.includes('Recall')) failures.push('Skills tab failed')
      await page.getByRole('button', { name: 'Follow the data' }).click()
      if (!(await page.locator('.pipeline-readout').textContent())?.includes('02 / 07')) failures.push('Recall pipeline failed')
      await page.getByRole('button', { name: 'Simulate concurrent bids' }).click()
      await page.getByRole('button', { name: 'Commit & broadcast' }).click()
      if (!(await page.locator('.bid-price').textContent())?.includes('1,300')) failures.push('Bidly simulation failed')
      await page.getByRole('button', { name: 'Failure' }).click()
      for (let i = 0; i < 3; i++) await page.locator('.shopmesh-demo .demo-button').click()
      if (!(await page.locator('.shopmesh-demo .demo-status').textContent())?.includes('release reserved stock')) failures.push('ShopMesh compensation failed')
      await page.locator('.project-recall .project-actions button').click()
      if (!(await page.getByRole('dialog').textContent())?.includes('Authenticated SSE')) failures.push('Project dialog failed')
      await page.getByRole('button', { name: 'Close project details' }).click()
      await page.getByRole('button', { name: 'Create email draft' }).click()
      if (!(await page.locator('#name-error').textContent())?.includes('Please enter')) failures.push('Contact validation failed')
      const urls = await page.locator('a[href]').evaluateAll(anchors => anchors.map(anchor => anchor.getAttribute('href')))
      for (const url of urls) {
        if (url?.startsWith('#') && !(await page.locator(url).count())) failures.push(`Broken anchor: ${url}`)
      }
    }
    if (label === 'mobile') {
      await page.getByRole('button', { name: 'Open menu' }).click()
      if (!(await page.getByRole('link', { name: 'Achievements', exact: true }).isVisible())) failures.push('Mobile menu failed')
      await page.getByRole('link', { name: 'Achievements', exact: true }).click()
      if (await page.getByRole('button', { name: 'Close menu' }).count()) failures.push('Mobile menu did not close')
    }
    console.log(`${label}: sections=${dimensions.sections.length}, width=${dimensions.body}/${width}`)
    await page.close()
    await context.close()
  }
  const scenePage = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  scenePage.on('pageerror', error => failures.push(`3D page error: ${error.message}`))
  await scenePage.goto(baseURL, { waitUntil: 'domcontentloaded' })
  try {
    await scenePage.locator('.scene-stage canvas').waitFor({ timeout: 20000 })
    await scenePage.waitForTimeout(1400)
    await scenePage.screenshot({ path: 'qa/hero-3d.png' })
    await scenePage.getByRole('button', { name: 'Pause 3D animation' }).click()
    if (!(await scenePage.getByRole('button', { name: 'Play 3D animation' }).count())) failures.push('3D pause button failed')
    console.log('3D scene: canvas loaded and pause control worked')
  } catch { failures.push('3D scene canvas did not load') }
  await scenePage.close()
} finally { await browser.close() }
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1 }
else console.log('Browser checks passed.')
