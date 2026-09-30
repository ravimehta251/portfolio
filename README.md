# Ravi Kumar — Engineering Portfolio

A complete React + TypeScript portfolio built with Vite, Tailwind CSS, Framer Motion, Lucide, React Three Fiber, Drei, and Three.js. All personal information, project descriptions, links, education, and achievements come from the supplied `H:/RAVI_RESUME.pdf`. The deployed resume is the tracked `public/resume.pdf`.

## Run and validate

```bash
npm install
npm run dev
```

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

For the browser interaction and responsive checks, leave `npm run dev` running in one terminal, then run `npm run check:browser` in another. Set `PORTFOLIO_URL` if Vite uses another port. The check uses Edge or Chrome on Windows (or a Playwright browser installation on other systems) and writes screenshots to the ignored `qa/` directory.

`npm run build` checks TypeScript before producing `dist/`. Serve `dist/` through a static host or use `npm run preview` to inspect that production output locally.

## Structure

```text
src/
  App.tsx                 All seven sections, navigation, cursor, and footer
  main.tsx                React entry point and global styles
  data/portfolio.ts       Resume-derived profile, skills, projects, and education
  types/portfolio.ts      Shared content types
  sections/               Home, about, skills, projects, achievements, education, contact
  components/             Navigation, project details, interactive demos, shared UI
  hooks/                  Active-section tracking
  three/NetworkScene.tsx  Lazy-loaded distributed-system hero
public/
  resume.pdf              Downloadable original resume
  favicon.svg             Browser icon
  social-preview.png      1200 × 630 social card
  social-preview.svg      Editable social-card source
  robots.txt              Local/default crawler rules
  site.webmanifest        Site identity and icon
```

The main app links every section through matching navigation anchors. Projects open accessible detail dialogs with problem, solution, stack, decisions, repository links, and interactive architecture demonstrations. Recall illustrates the document-to-answer pipeline; Bidly illustrates serialized bid processing; ShopMesh illustrates checkout and payment-failure compensation. Demo data and timing are illustrative, run entirely in the browser, and do not connect to the project backends. Resume-supported outcomes are presented separately.

The hero loads its 3D runtime on desktop with a static network alternative on mobile, for reduced motion, and if the scene fails. Rendering pauses outside the hero or in a hidden tab; users can pause it manually. The custom cursor is restricted to desktop pointer devices. Section reveals and interactive diagrams respect reduced-motion preferences.

## Contact behavior

The contact form validates name, email, and message, then prepares a `mailto:` draft in the visitor's email app. The visitor reviews and sends it there. The site has no mail backend and never claims delivery. Email, telephone, GitHub, LinkedIn, and LeetCode destinations come from the resume.

## Content updates

Edit `src/data/portfolio.ts` for profile, navigation, skills, projects, and education. Achievements are rendered in `src/sections/Achievements.tsx`. Replace `public/resume.pdf` when the resume changes. Keep professional claims supported by the resume, and update identity metadata in `index.html` when changing profile details. Only add live-demo links when a real deployment exists.

## Deployment

Use `npm run build` as the build command and `dist` as the publish directory on Vercel, Netlify, or another static host. The app currently expects deployment at a domain root.

Copy `.env.example` to `.env.local` or set this build environment variable on the host:

```env
SITE_URL=https://your-actual-domain.com
```

`SITE_URL` must be the actual HTTP(S) origin, without a subpath, query, or credentials. At build time it generates the canonical URL, Open Graph URL, absolute PNG social-image URLs, Person structured-data URL, `dist/sitemap.xml`, and the sitemap reference in `dist/robots.txt`. Leave it blank while a production domain is unknown: development and builds still work, with no invented canonical URL or sitemap domain. The default crawler rules remain available. `SITE_URL` is public metadata and must never contain secrets.

The PNG social card is served locally and has no external image dependency. Its SVG source is included for future design edits. Validate the deployed site on actual mobile devices and run Lighthouse against the production URL before launch.
