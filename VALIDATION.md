# Portfolio upgrade validation

Validated on 23 October 2026 in installed Chrome through Playwright. Changes are implemented in the existing React/TypeScript/Vite codebase; the production build is available in `dist/`. No live deployment was performed.

## Completed checks

| Check | Result |
| --- | --- |
| `npm run lint` | Passed with restored ESLint configuration |
| `npm run build` | Passed TypeScript and Vite production build |
| `npm run check:browser` | Passed at 360, 390, 768, 1440 and 1920px |
| Heading and hero action bounds | No clipping or horizontal overflow at tested widths |
| Section navigation | All internal anchors resolve; native hash navigation preserved |
| Resume | Local delivery and `%PDF` signature verified; live resume also returned HTTP 200 |
| Project details | All three buttons expand/collapse their controlled engineering notes |
| Architecture explorer | All six controls activate with keyboard Enter, expose selected state and retain visible focus |
| Reveal visibility | Every reveal target becomes visible when scrolled into view |
| Accessibility | Zero axe WCAG 2 A/AA and WCAG 2.1 AA violations in the sampled page states at all five widths |
| Reduced motion | Hero animations and smooth scrolling disabled; all reveal content visible |
| Preference changes | Changing to reduced motion removes scroll-reveal initialization and resets portrait parallax |
| Touch devices | Portrait parallax disabled even at desktop viewport width with coarse/touch input |
| Motion initialization failure | Missing or throwing IntersectionObserver leaves content and completed project illustrations available |
| Browser errors | No page/runtime or console errors in the final responsive check |

`scripts/check-project-demos.mjs` additionally verifies Recall's progressive answer and final source citation, Bidly's commit before broadcast to both clients, and ShopMesh's event progression through Inventory and Payment. Playback completes in approximately 3.3–3.9 seconds, can be replayed, completes offscreen and respects reduced motion. These are illustrative sample sequences, not live product data.

`scripts/check-navigation.mjs` passes all nine focused navigation/contact checks: inert closed navigation, initial menu focus, Tab and Shift+Tab looping, Escape restoration, outside dismissal, anchor destination focus and removal of the scroll lock on desktop resizing. Clipboard success and rejection are simulated separately to verify both visible feedback branches without writing private data. No runtime or console errors were captured.

## Visual review and fixes

Actual desktop, tablet and mobile screenshots were inspected. Review caught and corrected a clipped tablet portrait contact card, overlapping mobile contact decoration, hidden mobile Back to top control and low-contrast project labels. A reveal/anchor interaction was corrected so tall project blocks cannot keep their controls clipped. Every final tested viewport has visible headings and actions, reserved portrait dimensions and no document-level horizontal overflow.

The portrait files were identified as identical PNGs mislabeled as WebP. Deterministic encoding preserved the source image content and alpha channel while reducing the 1122px asset from 1,925,893 to 209,562 bytes and the 768px asset to 100,556 bytes.

Evidence is saved in the ignored `qa/` directory:

- `browser-results.json` and `{hero,about,projects,architecture,skills,education,contact}-{width}.png`
- `project-demo-results.json` and `project-{recall,bidly,shopmesh}-{1440,390}.png`
- `project-contrast-results.json`
- `navigation-results.json`
- `live-audit.json`, `link-results.json` and public-site reference captures

See [DESIGN.md](DESIGN.md) for verified baseline observations, exact palette values and reference analysis. The existing profile data and resume are unchanged.

## External links and limits

The GitHub profile and all three project repositories returned HTTP 200. The live resume returned a valid PDF. LinkedIn returned HTTP 999 and LeetCode returned a 403 challenge, so automated availability checks for those destinations are inconclusive; their existing URLs are preserved. Email actions use the visitor's mail client and were verified by their `mailto:` destinations without sending mail.

No actual product screenshots were supplied. The portfolio is complete with clearly labeled original illustrations; authentic screenshots are an optional future asset. Browser emulation does not establish animation frame rates on physical mobile hardware or certify every assistive technology/browser combination.
