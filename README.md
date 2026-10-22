# Ravi Kumar — Engineering Portfolio

A complete responsive portfolio using React, TypeScript, and Vite. The visual direction combines dark olive, electric lime, warm off-white, oversized typography, original RK branding, and Ravi’s supplied portrait. [DESIGN.md](DESIGN.md) records the reference study and design decisions.

## Run locally

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

```sh
npm run lint
npm run build
npm run preview
```

The production build is written to `dist/`. It can be served by a static host at a domain root. The existing deployment metadata configuration is preserved. Set `SITE_URL=https://your-domain.com` in your build environment to generate canonical URLs, absolute social metadata, a sitemap, and crawler rules. No production URL is assumed.

## Content and assets

- `src/data/portfolio.ts`: profile, verified project details, grouped skills, and education.
- `src/sections/`: hero, about, skills, education/achievements, and contact.
- `src/components/ProjectShowcases.tsx`: three project case studies and clearly labeled interface/architecture illustrations. These are visual explanations, not live backend demos.
- `src/components/Identity.tsx`: original RK monogram and decorative asterisk.
- `src/index.css`, `src/sections.css`, `src/projects.css`: design tokens, responsive compositions, and component styling.
- `public/resume.pdf`: supplied resume, downloaded by the resume links.
- `public/images/`: optimized transparent WebP portraits, with responsive sources and reserved dimensions.
- `public/social-preview.svg`: editable, self-contained 1200×630 social-card artwork; `social-preview.png` is its raster export.

Professional details and metrics were checked against `public/resume.pdf`. No `my.jpg` or project screenshots were present in the project. The supplied root `ravi.png` is preserved byte-for-byte; the optimized copies retain transparency and do not change Ravi’s identity.

Contact links open the visitor’s email app. The copy-email button uses the browser clipboard and reports success or a manual-copy fallback. Project repository links go to the verified GitHub pages; no unverified live-demo links are shown.

Motion is limited to an opening portrait reveal, once-only section entrances, and hover feedback. Natural scrolling, keyboard navigation, visible focus states, an Escape-dismissible mobile menu, and `prefers-reduced-motion` are supported. Fonts are hosted locally; no animation or 3D runtime is required.

## Browser verification

With the dev server running:

```sh
npm run check:browser
```

Set `PORTFOLIO_URL` for a different URL. The check uses installed Chrome/Edge on Windows or a Playwright Chromium installation elsewhere. It checks responsive layouts, image loading, anchors, resume delivery, project disclosures, mobile navigation, reduced motion, browser errors, and accessibility. Screenshots are saved in the ignored `qa/` directory.

## Recoverable checkpoint

The pre-rebuild tracked project is saved as `checkpoints/2026-10-23-before-rebuild/portfolio-tracked.zip`. See the adjacent `RESTORE.txt`. Git history, environment files, the original photograph, and unrelated `output/` and `tmp/` files are preserved. The checkpoint folder is excluded from version control and production assets.
