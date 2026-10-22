import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const baseURL = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173/'
const executablePath = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync)
const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) })
const failures = []
const results = []
const accessibility = []
const dimensions = [['small-mobile', 320, 740], ['mobile', 390, 844], ['tablet', 768, 1024], ['desktop', 1440, 900], ['wide', 1920, 1080]]
const requiredIds = ['home', 'about', 'projects', 'skills', 'education', 'achievements', 'contact']
const projectURLs = ['https://github.com/ravimehta251/Recall', 'https://github.com/ravimehta251/bidly', 'https://github.com/ravimehta251/ShopMesh']
function check(condition, message) { if (!condition) failures.push(message) }

async function scrollPage(page, height) {
  const total = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < total; y += Math.floor(height * 0.68)) {
    await page.evaluate(position => window.scrollTo({ top: position, behavior: 'instant' }), y)
    await page.waitForTimeout(80)
  }
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
  await page.waitForTimeout(800)
}

async function inspectPage(page, label, width, reducedMotion) {
  const state = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    missingAnchors: [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')).filter(href => href.length < 2 || !document.getElementById(decodeURIComponent(href.slice(1)))),
    brokenImages: [...document.images].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.currentSrc || img.src),
    unsizedImages: [...document.images].filter(img => !img.hasAttribute('width') || !img.hasAttribute('height')).map(img => img.src),
    hiddenReveals: [...document.querySelectorAll('.reveal')].filter(element => Number(getComputedStyle(element).opacity) < 0.99 || getComputedStyle(element).visibility === 'hidden').map(element => element.className),
    motionReady: document.documentElement.classList.contains('motion-ready'),
  }))
  check(state.width <= width + 1, label + ': horizontal overflow ' + state.width + 'px > ' + width + 'px')
  check(!state.missingAnchors.length, label + ': broken internal anchors ' + state.missingAnchors.join(', '))
  check(!state.brokenImages.length, label + ': broken images ' + state.brokenImages.join(', '))
  check(!state.unsizedImages.length, label + ': images without reserved dimensions ' + state.unsizedImages.join(', '))
  check(!state.hiddenReveals.length, label + ': reveal content remained hidden: ' + state.hiddenReveals.join(', '))
  check(reducedMotion ? !state.motionReady : state.motionReady, label + ': unexpected motion enhancement state')
  for (const id of requiredIds) check(await page.locator('[id="' + id + '"]').count() === 1, label + ': missing or duplicate #' + id)
  return state
}

async function scanAccessibility(page, label) {
  const report = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  const violations = report.violations.map(violation => ({
    id: violation.id, impact: violation.impact, description: violation.description,
    nodes: violation.nodes.map(node => ({ target: node.target, html: node.html, failureSummary: node.failureSummary })),
  }))
  accessibility.push({ label, violations })
  for (const violation of violations) {
    failures.push(label + ': accessibility ' + violation.id + ' (' + violation.nodes.length + ' nodes)')
    console.error(JSON.stringify({ label, ...violation }, null, 2))
  }
  console.log(label + ': Axe ' + violations.length + ' violations')
}

async function testProjectDetails(page, label) {
  const toggles = page.getByRole('button', { name: 'Under the hood', exact: true })
  check(await toggles.count() === 3, label + ': expected three project disclosure controls')
  for (let i = 0; i < await toggles.count(); i++) {
    const toggle = toggles.nth(i)
    const controlledId = await toggle.getAttribute('aria-controls')
    const panel = page.locator('[id="' + controlledId + '"]')
    check(await toggle.getAttribute('aria-expanded') === 'false' && !(await panel.isVisible()), label + ': ' + controlledId + ' must start collapsed')
    await toggle.click()
    check(await toggle.getAttribute('aria-expanded') === 'true' && await panel.isVisible(), label + ': ' + controlledId + ' did not expand')
    check(await panel.locator('li').count() >= 3, label + ': ' + controlledId + ' lacks engineering notes')
    await toggle.click()
    check(await toggle.getAttribute('aria-expanded') === 'false' && !(await panel.isVisible()), label + ': ' + controlledId + ' did not collapse')
  }
}

async function testMobileMenu(page, label) {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  const toggle = page.locator('.menu-toggle')
  const nav = page.getByRole('navigation', { name: 'Main navigation' })
  await toggle.click()
  check(await toggle.getAttribute('aria-expanded') === 'true' && await nav.isVisible(), label + ': menu failed to open')
  await nav.locator('a[href="#projects"]').click()
  check(await toggle.getAttribute('aria-expanded') === 'false' && !(await nav.isVisible()), label + ': menu did not close after anchor navigation')
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await toggle.click()
  await nav.locator('a[href="#about"]').focus()
  await page.keyboard.press('Escape')
  check(await toggle.getAttribute('aria-expanded') === 'false' && !(await nav.isVisible()), label + ': Escape did not close menu')
  check(await toggle.evaluate(element => element === document.activeElement), label + ': Escape did not restore toggle focus')
}

await mkdir('qa', { recursive: true })
try {
  for (const [label, width, height] of dimensions) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'no-preference', acceptDownloads: true })
    const page = await context.newPage()
    page.on('pageerror', error => failures.push(label + ': page error ' + error.message))
    page.on('console', message => { if (message.type() === 'error') failures.push(label + ': console error ' + message.text()) })
    try {
      const response = await page.goto(baseURL, { waitUntil: 'networkidle' })
      check(response?.status() === 200, label + ': page HTTP ' + response?.status())
      await page.waitForTimeout(1100)
      if (label === 'mobile' || label === 'desktop') {
        await page.screenshot({ path: 'qa/rebuild-' + label + '-hero.png', animations: 'disabled' })
        await page.screenshot({ path: 'qa/rebuild-' + label + '-initial.png', animations: 'disabled' })
      }
      await scrollPage(page, height)
      const state = await inspectPage(page, label, width, false)
      for (const url of projectURLs) check(await page.locator('a[href="' + url + '"]').count() === 1, label + ': missing project link ' + url)
      check(await page.locator('a[href="mailto:ravi7481081raj@gmail.com"]').count() >= 1, label + ': missing working email link')
      await testProjectDetails(page, label)
      if (label === 'desktop') {
        await page.locator('.project-row-recall').scrollIntoViewIfNeeded()
        await page.screenshot({ path: 'qa/rebuild-project-viewport.png', animations: 'disabled' })
      }
      if (width <= 700) await testMobileMenu(page, label)
      if (label === 'mobile' || label === 'desktop') {
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
        await scanAccessibility(page, label)
      }
      if (label === 'desktop') {
        const pdf = await context.request.get(new URL('/resume.pdf', baseURL).href)
        const bytes = await pdf.body()
        check(pdf.status() === 200 && bytes.subarray(0, 5).toString() === '%PDF-' && bytes.length > 10000, 'desktop: resume response is not a valid supplied PDF')
        const resume = page.getByRole('link', { name: 'Download resume', exact: true })
        check(await resume.getAttribute('download') === 'Ravi-Kumar-Resume.pdf', 'desktop: resume download attribute missing')
        const downloadPromise = page.waitForEvent('download')
        await resume.click()
        const download = await downloadPromise
        check(download.suggestedFilename() === 'Ravi-Kumar-Resume.pdf' && !(await download.failure()), 'desktop: resume download failed')
        console.log('resume: ' + bytes.length + ' bytes, valid PDF, download ' + download.suggestedFilename())
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      await page.waitForTimeout(150)
      await page.screenshot({ path: 'qa/rebuild-' + label + '.png', fullPage: true, animations: 'disabled', timeout: 60000 })
      results.push({ label, width, height, mode: 'normal-motion', scrollWidth: state.width, hiddenReveals: state.hiddenReveals.length })
      console.log(label + ': ' + state.width + '/' + width + 'px, ' + requiredIds.length + ' anchors, all images/reveals checked')
    } catch (error) { failures.push(label + ': ' + (error.stack || error.message)) }
    finally { await context.close() }
  }
  for (const [label, width, height] of [['mobile', 390, 844], ['desktop', 1440, 900]]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    page.on('pageerror', error => failures.push(label + ' reduced-motion: page error ' + error.message))
    page.on('console', message => { if (message.type() === 'error') failures.push(label + ' reduced-motion: console error ' + message.text()) })
    try {
      await page.goto(baseURL, { waitUntil: 'networkidle' })
      await scrollPage(page, height)
      const state = await inspectPage(page, label + ' reduced-motion', width, true)
      await page.screenshot({ path: 'qa/rebuild-' + label + '-reduced-motion.png', fullPage: true, animations: 'disabled', timeout: 60000 })
      results.push({ label, width, height, mode: 'reduced-motion', scrollWidth: state.width, hiddenReveals: state.hiddenReveals.length })
      console.log(label + ' reduced-motion: all reveal content visible')
    } catch (error) { failures.push(label + ' reduced-motion: ' + (error.stack || error.message)) }
    finally { await context.close() }
  }
} finally {
  await browser.close()
  await writeFile('qa/rebuild-report.json', JSON.stringify({ baseURL, executablePath, results, accessibility, failures }, null, 2))
}
if (failures.length) {
  console.error('Browser checks failed (' + failures.length + '):\n' + failures.join('\n'))
  process.exitCode = 1
} else console.log('Browser checks passed: five widths, normal/reduced motion, navigation, disclosures, resume download, links, images, and accessibility.')

