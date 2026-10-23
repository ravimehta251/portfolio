# Ravi Kumar — Engineering Portfolio

React, TypeScript and Vite portfolio for Ravi Kumar, a backend-focused software engineer. The established olive, cream and lime identity, personal information, resume and project repository links are retained. [DESIGN.md](DESIGN.md) records the live-site audit, reference study and implementation decisions.

## Development

```sh
npm ci
npm run dev
```

Vite serves the local project, normally at http://localhost:5173. Production output is generated in `dist/`:

```sh
npm run typecheck
npm run lint
npm run build
```

Set `SITE_URL=https://www.ravisingh.online` in the build environment for canonical/social metadata, sitemap and crawler rules. Existing deployment configuration is preserved. These source changes do not change the live deployment.

## Experience

- A coordinated hero entrance finishes in 1.08 seconds, with masked name reveals, a restrained portrait entrance, short content staggers and limited desktop pointer parallax.
- One CSS/IntersectionObserver motion system varies text, image, depth and line reveals. It cleans up listeners and observers, responds to reduced-motion changes and leaves content visible when observation is unavailable.
- Recall, Bidly and ShopMesh have distinct visual identities, explicit problem/approach summaries, code links and expandable engineering details. Their replayable demonstrations use clearly labeled sample data; they do not connect to live backends.
- The ShopMesh architecture explorer uses SVG connections and native buttons. Keyboard and touch users can select nodes to read routing, event, data-ownership and failure-handling explanations.
- The mobile menu supports focus management, focus looping, Escape, outside dismissal, anchor navigation and desktop resizing. Contact actions include visible copy success and failure feedback.

## Content and assets

`src/data/portfolio.ts` remains the content source for profile information, project claims, toolkit and education. `public/resume.pdf` is preserved. No project screenshots were supplied: the project visuals are original interface and architecture illustrations, labeled accordingly.

The supplied portrait is retained in responsive transparent WebP encodings. The previous `.webp` files were actually identical 1.93 MB PNGs. The corrected assets are approximately 210 KB at 1122px and 101 KB at 768px. The unmodified input is retained in the ignored `qa/ravi-portrait-original.png` for this workspace. `scripts/optimize-portrait.mjs` documents the deterministic encoding; it does not alter the portrait's content. Fonts are served locally.

## Browser verification

With the dev server running:

```sh
npm run check:browser
node scripts/check-project-demos.mjs
node scripts/check-navigation.mjs
```

Set `PORTFOLIO_URL` to test another local or production preview. On Windows the script uses installed Chrome; other platforms use Playwright Chromium. It checks 360, 390, 768, 1440 and 1920px layouts, anchors, PDF delivery, project disclosures, architecture keyboard controls, menu focus, reduced motion, missing-observer fallback, browser errors and axe accessibility rules. Captures and results are saved to ignored `qa/`.

`node scripts/audit-sites.mjs` records the public-site reference audit and screenshots. This requires network access. See [VALIDATION.md](VALIDATION.md) for the completed checks and their limits.
