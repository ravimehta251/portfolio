# Ravi Kumar portfolio design direction

## Reference and capture context

- Reference: [Lando Norris homepage](https://landonorris.com/), captured 23 October 2026 for visual-system study only.
- Fresh Firecrawl scrape (`maxAge: 0`), HTTP 200, scrape ID `01a16523-e2fa-76ae-83dc-3dd85cc62488`. Requested branding, markdown, HTML, images, and a full-page screenshot at 1440 × 1000 viewport.
- The resulting screenshot is 1440 × 14364 pixels. Its actual pixels were inspected; the full page and a high-resolution editorial crop are preserved locally as [.design-reference/reference-full.png](.design-reference/reference-full.png) and [.design-reference/reference-editorial.png](.design-reference/reference-editorial.png).
- CSS evidence: [published stylesheet](https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/css/lando-offbrand.shared.4f53262f0.css), also saved as `.design-reference/reference.css`. Additional inline style evidence comes from the homepage raw HTML. HTML states last published 13 September 2026.
- The screenshot's animated hero is largely blank; several scroll-driven intervals are also blank. A static capture does not establish completed hero appearance, mobile behavior, precise choreography, or hover states. These limits are reflected below.
- Source logos, photos, signature, helmets, and brand illustrations are reference evidence only. They must not appear in Ravi's implementation. Preserve the existing `ravi.png` file.

## Observed visual language

The reference alternates offwhite and very dark olive canvases, reserving electric lime for action and emphasis. It combines tightly stacked oversized uppercase sans-serif copy with occasional high-contrast serif words. The structure feels editorial: small technical labels, hard-edged images at intentionally different scales, large stretches of negative space, and repeated full-width sections. Decoration is sparse compared with the scale of type and photography.

The inspected desktop screenshot shows a corner wordmark, small centered emblem, and compact upper-right lime action/menu controls. A dark manifesto follows the hero, centered in a broad but constrained column. Below it, an irregular image/quote collage gives way to offwhite editorial features. A dark product/gallery region and large offwhite store/partner sections follow, with an oversized typographic contact/footer composition. These are observations about composition, not templates for identical portfolio sections.

## Extracted tokens

The following values are exact published CSS values unless indicated otherwise.

| Role | Reference value | Evidence / Ravi use |
| --- | --- | --- |
| Dark olive canvas | `#282C20` | `--color--dark-green`; user-required foundation |
| Offwhite | `#F4F4ED` | `--color--white`; user-required light canvas and inverse type |
| Electric lime | `#D2FF00` | `--color--lime`; user-required action/emphasis color |
| Muted lime | `#B2C73A` | `--color--lime-off`; source editorial emphasis; optional quieter secondary |
| Nearblack | `#111112` | `--color--black`; source gallery canvas |
| Light muted olive | `#DDE1D2` | `--color--green-off-white-1`; supporting inverse copy |
| Muted olive | `#B4B8A5` | `--color--green-off-white-2`; secondary metadata |
| Warm light grey | `#EBEEE0` | `--color--grey-1` / `--color--green-light` |
| Restrained orange | `#FF6B00` | `--color--orange`; proposed Ravi micro-accent only |
| Default gap | `1.25rem` | `--gap`; root font is fluid, so this is not a fixed pixel value |
| Container gutter | `1.25rem` | `--padding--container`; full-width `.c` containers |
| Primary button radius | `.54rem` | `.btn-w`; source button has 1px lime border, no shadow |
| Primary button height | `3rem` | `.btn-w`; navigation variant `3.75rem` |
| Default transition | `.75s cubic-bezier(.65,.05,0,1)` | Inline root custom properties |

Firecrawl's branding extraction corroborates the main colors and Mona Sans family, but its sampled `h1: 38px` and `h2: 32px` values do not describe the giant visual display system. Published CSS is stronger evidence for the typography below.

## Typography

**Extracted source system:**

- Primary family: `Mona Sans Variable, Arial, sans-serif`; source font face is variable weight `200 900`.
- Impact text: uppercase, `font-variation-settings: "wght" 660, "wdth" 93`, `line-height: 90.6%`, `letter-spacing: -.0625rem`.
- Selected emphasized impact words: `Brier` Bold serif, `font-size: 8.25rem`, `line-height: 83%`, `letter-spacing: -.1875rem`, muted lime in the home manifesto.
- Eyebrows: uppercase Mona Sans, variable weight 700/width 100, `.625rem`, line-height 1 on the desktop base; media queries increase/change these values.
- Small labels: `.75rem`, weight 600, line-height 1.25.
- Source scales root type with a viewport-dependent formula around a 1728-unit design width. Do not assume all `rem` values map to 16px.

**Proposed original Ravi system:**

- Use an available open font with a bold condensed display voice (or the project's current suitable font). Keep readable sans-serif body copy. Do not download Brier or other proprietary reference font assets.
- Hero name can use a heavy geometric/condensed sans with tight tracking, `clamp()` sizing, and 0.8–0.9 line-height. A two-line `RAVI / KUMAR` wordmark gives a recognizable personal hierarchy.
- Technical labels and role text use small uppercase sans or monospace with restrained tracking. Body text remains 16–18px with 1.5–1.65 line-height.
- A serif accent is optional for a short manifesto phrase; use a legally available local/system family and make it visually distinct from the reference.

## Layout and components

### Reference evidence

- `.nav` is fixed at the top and uses a flexible full-width `.nav-inner` with a `var(--gap)` gutter. The screenshot shows brand left, small emblem center, controls right.
- `.c.home-hero` centers its contents with `min-height: 100svh`, `max-width: none`, and relative positioning. Actual animated subject/wordmark placement was not captured reliably.
- The manifesto occupies roughly 75–80% of the desktop width in the inspected crop (visual estimate), with centered stacked type and generous breathing room before/after.
- Editorial imagery uses sharp rectangles, inconsistent sizes, and staggered alignment rather than a uniform card grid. Caption labels sit just above images.
- The on/off-track feature uses a split composition with huge words in the central zone and cutout portraits at opposing outside edges. This is reference-specific imagery, not an asset source.
- Product cards use thin muted outlines on nearblack and very little box decoration. The dominant information is the object and its compact label.
- Buttons are flat lime filled rectangles with moderate corner rounding, uppercase compact text and an icon. Tertiary buttons have transparent fill, current-color border, and `.411875rem` radius.
- There is little use of drop shadow. Contrast, typography, boundaries, and image placement carry hierarchy.

### Ravi implementation proposal

1. **Navigation:** original `RK` monogram and `RAVI KUMAR` identity at left; work/about/contact or compact menu at right; lime availability/contact action. Use real buttons, visible keyboard focus, and correct menu state.
2. **Hero:** dark olive canvas, massive offwhite two-line name, preserved `ravi.png` as the central human subject; giant outline/solid letterforms may sit behind the portrait. Add sparse metadata, a small orange status marker, a short role descriptor, and a scroll cue. Treat this composition as original because reference hero evidence is incomplete.
3. **Manifesto/about:** short, confident personal statement in large typography. Pair the existing portrait or a detail crop with concrete background/skills text. Content must remain readable before animation completes.
4. **Selected work:** large editorial project panels on offwhite or dark canvas. Use actual project screenshots if present; otherwise build code-native interface previews that correspond to real project descriptions. Give every project a clear title, category, description, and working destination/details action.
5. **Capabilities/experience:** concise rows or a modular grid with strong labels and thin dividing rules. Avoid unnecessary pill clouds and card chrome.
6. **Contact/footer:** oversized contact statement and a strong lime action, followed by genuine social/email links. Do not invent employers, metrics, endorsements, or unavailable destinations.

Proposed spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px. Proposed outer gutter: `clamp(20px, 4vw, 64px)`. These values are implementation choices, not extracted source measurements.

## Imagery evidence and restrictions

The following URLs demonstrate source treatments; none should be used as Ravi portfolio content:

| Source image | Observed use |
| --- | --- |
| [Paddock portrait](https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baa04b14a1ca33c0b25_ln-home-horiz-1.webp) | Small sharp vertical editorial image |
| [Trophy portrait](https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baab12220595c8223b3_ln-home-horiz-2.webp) | Smaller muted/olive editorial crop |
| [Large winning moment](https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302babcf12f0111d96322e_ln-home-horiz-3.webp) | Large offset photo balancing smaller images |
| [Helmet profile](https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67d18655b032045a4dc78e53_ln4-hp-lando-helmet.webp) | Cutout subject anchored outside a split feature |
| [Casual profile](https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67d18655b032045a4dc78e56_ln4-hp-lando-head.webp) | Opposing cutout subject in same split feature |

Ravi's photo is user supplied. Keep the file intact, use descriptive alt text, reserve dimensions to prevent layout movement, and adjust `object-position` or code-native masking if needed. Do not replace it with a reference subject.

## Motion and interaction guidance

**Supported by source code / DOM:** `.75s` default easing, split-text wrappers, clipped line reveals, Rive navigation/emblem canvases, sticky horizontal-scroll containers, Lenis classes, and a Three.js/WebGL canvas. The screenshot alone does not show their timing or full behavior.

**Proposed Ravi motion:** subtle entrance and scroll reveals, one slow decorative marqueelike strip, small button arrow/position changes, and controlled portrait/wordmark depth. Prefer CSS transforms/opacity and IntersectionObserver if an animation dependency is unnecessary. Keep text and image visible in the initial render; animate from a short offset only after enhancement activates. Respect `prefers-reduced-motion`, avoid scroll hijacking, and stop infinite decoration under reduced motion. Do not require pointer hover to discover essential content.

## Responsive and accessibility proposal

Mobile behavior below is a proposed implementation, not an observed source capture:

- Use a compact header and accessible expandable menu; do not expose tiny metadata as primary navigation.
- Keep hero identity readable with `clamp()` and a portrait size appropriate to the available height. Avoid clipping the actual name or hiding the primary action behind the image.
- Stack project panels and about content vertically, retaining generous but shorter section spacing.
- Maintain 44px touch targets, visible focus, semantic headings, adequate text contrast, and clear link names. Offwhite/lime surfaces use dark text; lime text on offwhite should be avoided for paragraph content.
- Prevent horizontal page overflow; decorative letterforms/linework may be contained inside their section. Provide reduced-motion and no-JavaScript usable content.

## Remaining evidence gaps

- Animated hero finished state, exact scroll choreography and mobile layout were not directly inspected.
- Reference screenshots contain blank WebGL/scroll intervals; they are not faithful captures of every final state.
- Extracted image URLs are evidence, not a complete asset inventory or reuse authorization.
- Ravi implementation is an original interpretation of the high-level palette, typographic hierarchy, editorial rhythm, and motion restraint. It should not reproduce the source's logos, racing narrative, signatures, or branded illustrations.
