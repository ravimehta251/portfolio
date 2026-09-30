import process from 'node:process'
import { URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Deployment metadata is optional locally. No production domain is assumed.
function deploymentMetadata(siteUrl) {
  return {
    name: 'portfolio-deployment-metadata',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        if (!siteUrl) return html
        const socialImage = new URL('social-preview.png', siteUrl).href
        return {
          html: html.replaceAll('content="/social-preview.png"', `content="${socialImage}"`)
            .replace(/(<script type="application\/ld\+json">)(.*?)(<\/script>)/s,
              (_, opening, data, closing) => `${opening}${JSON.stringify({ ...JSON.parse(data), url: siteUrl })}${closing}`),
          tags: [
            { tag: 'link', attrs: { rel: 'canonical', href: siteUrl }, injectTo: 'head' },
            { tag: 'meta', attrs: { property: 'og:url', content: siteUrl }, injectTo: 'head' },
          ],
        }
      },
    },
    generateBundle() {
      if (!siteUrl) return
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source:
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}</loc></url></urlset>\n` })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source:
        `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', siteUrl).href}\n` })
    },
  }
}

export default defineConfig(({ mode }) => {
  const configuredUrl = loadEnv(mode, process.cwd(), 'SITE_').SITE_URL?.trim()
  let siteUrl = ''
  if (configuredUrl) {
    const url = new URL(configuredUrl)
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
      throw new Error('SITE_URL must be an HTTP(S) origin, e.g. https://your-domain.com, without a path, query, or credentials.')
    }
    siteUrl = `${url.origin}/`
  }
  return {
    plugins: [react(), tailwindcss(), deploymentMetadata(siteUrl)],
    build: {
      // The 3D scene is dynamically imported; its runtime is outside the initial UI bundle.
      chunkSizeWarningLimit: 1000,
    },
  }
})
