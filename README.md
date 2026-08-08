# Ravi Kumar — Engineering Portfolio

A responsive portfolio for a backend and full-stack software engineer, built with React, Vite, Framer Motion, React Three Fiber, Drei, and modern CSS.

## Redesign summary

- Replaced the duplicated legacy component trees with one data-driven component system.
- Reframed projects as engineering case studies with challenges, architecture decisions, diagrams, and verified outcomes.
- Added technical expertise, engineering metrics, education, achievements, coding profiles, and an accessible contact workflow.
- Added a lazy-loaded distributed-systems 3D hero with reduced-motion and tab-visibility handling.
- Added responsive navigation, active-section state, scroll progress, accessible focus states, SEO metadata, structured data, a manifest, and social-preview artwork.
- Removed unsupported claims, fabricated LeetCode breakdowns, dead demo links, expensive custom-cursor behavior, and duplicate dependencies.

## Structure

```text
src/
├── components/
│   ├── three/NetworkScene.jsx
│   ├── ArchitectureDiagram.jsx
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── ProjectCard.jsx
│   ├── EngineeringMetrics.jsx
│   ├── Education.jsx
│   ├── Achievements.jsx
│   ├── CodingProfiles.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── shared animation/heading components
├── data/portfolio.js
├── hooks/useActiveSection.js
├── App.jsx
└── index.css
public/
├── favicon.svg
├── site.webmanifest
├── social-preview.svg
└── robots.txt
```

## Install and run

```bash
npm install
npm run dev
```

Production validation:

```bash
npm run lint
npm run build
npm run preview
```

## Configuration

### Resume

The resume buttons read `VITE_RESUME_URL` from the local `.env` file. Copy `.env.example` when setting up a new environment, then provide the real URL:

```env
VITE_RESUME_URL=https://example.com/path-to-your-resume.pdf
```

For a local PDF, add an optimized file at `public/ravi-kumar-resume.pdf` and set `VITE_RESUME_URL=/ravi-kumar-resume.pdf`. Add the `download` attribute to resume links only if you want forced download behavior; leaving it off provides an in-browser preview.

`VITE_` variables are included in the browser bundle. Use this variable for configuration, not for secrets.

### Project screenshots

The project cards intentionally use architecture diagrams rather than fabricated screenshots. To add real screenshots:

1. Export WebP or AVIF images at approximately 1600px wide.
2. Place them in `public/projects/`.
3. Add an `image` and descriptive `imageAlt` field to each project in `src/data/portfolio.js`.
4. Render a responsive `<picture>` in `ProjectCard.jsx` above `ArchitectureDiagram`.

Do not use mock screenshots that imply a live deployment.

### Profile and project links

All verified URLs are centralized in `src/data/portfolio.js`. Update `links` for GitHub, LinkedIn, LeetCode, and resume changes. Project repository URLs live in the `projects` array. Live-demo controls should only be added after a real deployment URL exists.

### Contact

The contact section provides Ravi's email address, a copy-email control, location, GitHub, and LinkedIn. It does not include a contact form or phone number.

### Deployment metadata

A production domain was not provided, so no canonical URL or sitemap domain is fabricated. Before deployment:

1. Add an absolute canonical URL in `index.html`.
2. Add matching `og:url`, absolute Open Graph image URLs, and `url` in the JSON-LD object.
3. Add `public/sitemap.xml` with the real production URL and reference it from `public/robots.txt`.
4. Prefer a PNG social image for broad platform compatibility; `social-preview.svg` is the editable source.

If deploying to a repository subpath, set Vite's `base` option in `vite.config.js` and update manifest asset paths accordingly.

## Build and deployment

### Vercel or Netlify

- Build command: `npm run build`
- Output directory: `dist`
- Node version: current LTS

### GitHub Pages

Set the correct `base` in `vite.config.js` (`'/repository-name/'` for project pages), build, and publish `dist`. For a user/organization root page, `/` remains correct.

## Missing information

The implementation still needs these owner decisions:

- Final production domain for canonical, sitemap, and absolute social metadata.
- A local resume PDF if Google Drive should be replaced.
- Real project screenshots, if desired.
- Real live-demo URLs, if deployments become available.

Existing GitHub, LinkedIn, LeetCode, email, project repository, and resume links were retained from the supplied resume/current site.

## QA checklist

- [x] All supplied resume details represented without invented employment, metrics, demos, or profile statistics.
- [x] Navigation, project, profile, email, and resume controls have destinations.
- [x] Keyboard-accessible mobile navigation with Escape support and visible focus states.
- [x] Semantic sections, labels, status messaging, skip link, and decorative-canvas hiding.
- [x] Layout breakpoints cover 320px mobile through large desktop without page-level horizontal overflow.
- [x] Reduced motion removes the 3D canvas and suppresses nonessential animation.
- [x] Three.js is dynamically imported, pixel ratio is capped, and rendering pauses in hidden tabs.

- [x] `npm run lint` passes.
- [x] `npm run build` passes.
- [ ] Test the deployed URL with Lighthouse and real iOS/Android devices.
- [ ] Add final canonical/sitemap URLs after the deployment domain is known.
