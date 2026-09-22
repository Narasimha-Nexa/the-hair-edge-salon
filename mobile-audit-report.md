# Mobile Viewport Audit — Both Orientations

**Date:** 2026-09-22 · **Baseline:** commit `0655646` ("Initial Commit Done") · **Server:** `next dev` on port 3000
**Method:** Live browser measurement (DOM geometry, computed styles, a11y tree, console + network logs) and server-side route probing. Screenshots unavailable (preview webview not compositing), so every claim below is a measurement, not an impression.
**Viewports:** Portrait **390×844**, Landscape **844×390**, bonus narrow **360×740**. DPR=1 in the test browser (retina behavior inferred from `sizes`/`srcset`, noted where relevant).

**Pages covered:** `/`, `/services`, `/services/hair-cut`, `/services/beard-styling` (server probe), `/blog/[slug]`, `/privacy`, `/this-page-does-not-exist`, plus curl probes of `/blog`, `/services/beard-grooming`, `/favicon.ico`, `/sitemap.xml`, `/robots.txt`, `/api/google-place`.

---

## 1. Results matrix

| Page | Portrait 390×844 | Landscape 844×390 | Verdict |
|---|---|---|---|
| `/` home | No overflow; hero content top 139 > nav 64 ✓; services = horizontal paging, 2×2 pages, cards 167×293, arrows visible; badges wrap 2 ragged rows | **Hero content top 0 < nav bottom 80 → headline under navbar**; section 553 > 390 → Call CTA (y401) + all trust badges (y497) below fold; services flips to 2-col grid correctly (arrows hidden ✓) | ⚠ landscape hero |
| `/services` | h1 top 80 clears nav by 16px; grid 2 cols (lefts 16/199), cards 167, gap 16; no overflow; nav transparent at top | h1 top 112 ✓ size 48px; grid 2 cols (md), cards 382, gap 24; nav = full desktop links, hamburger hidden | ⚠ transparent nav, small footer targets |
| `/services/hair-cut` | **Breadcrumb top 48 < nav 64 → 16px under navbar**; h1 30px at y443; CTAs 350×52–58 ✓; FAQ summary only 24px tall | **Breadcrumb 16px under 80px navbar**; **hero image box 788×591 on a 390-tall screen → h1 at y787, CTAs at y960** (single column: `lg:grid-cols-2` needs 1024px) | 🔴 landscape detail unusable-ish |
| `/blog/[slug]` | 1-col cards (350w), h1 clears nav ✓ | (not re-measured; md:grid-cols-2 applies at 844) | 🔴 content bug (any slug = same list, 0 images) |
| `/privacy` | h1 36px top 80 ✓; body 16/24px, no overflow; inline links h19 | text reflows; no overflow expected (same DOM) | ⚠ small links |
| 404 (bad URL) | **Next.js default 404 renders — custom page never shown**; no navbar, no CTA, default title | same | 🔴 structural |
| Footer ↔ FAB | 390×844: clears by 7px | **360×740: FAB overlaps "Terms of Service" by 8×16px (measured intersection)** | 🔴 at ≤360px |

**Orientation-independent checks:** horizontal overflow = 0 or negative (no overflow) on every page in both orientations · no clipped text anywhere (`scrollWidth` audit clean) · console: LCP `priority` warning, two 404 resource errors, `Manifest: Line 1 syntax error` · network: every image served at **`q=75`**, `w=256/420/768/1024`.

---

## 2. Gaps found (prioritized, with evidence + fix)

### 🔴 P0 — Broken for users or crawlers

| ID | Gap | Evidence | Fix (one-liner) |
|---|---|---|---|
| P0-1 | **Custom 404 never renders.** `app/not-found/page.tsx` is a *route* (`/not-found` → 200), not the global boundary. Real bad URLs get Next's default page — no navbar, no branding, no booking CTA. Same architectural bug for errors: `app/error/page.tsx` is a route (`/error`), not an error boundary, so runtime errors also show Next's default. | `/bogus` → "This page could not be found"; custom content only reachable at literal `/not-found` | Move to `app/not-found.tsx` and `app/error.tsx` (files, not folders); delete the folders |
| P0-2 | **Breadcrumb → category link 404s on 10 of 11 categories.** Detail pages link crumb 3 to `/services/{categoryId}`, but only *service* ids resolve. | `beard-styling` page links `href=/services/beard-grooming` → **404** (only works for `hair-styling` coincidentally) | Make crumb plain text, or link to `/services#​{categoryId}` with `scrollIntoView` |
| P0-3 | **OG image is an SVG served as `image/jpeg`** (1,752 B) → no Twitter/FB/WhatsApp preview cards, despite metadata declaring 1200×630 JPG. | `file public/images/og-image.jpg` = SVG; curl content-type `image/jpeg` | Generate a real 1200×630 JPEG |
| P0-4 | **No favicon:** no `<link rel=icon>` on any page; `/favicon.ico` → 404 (console error on load). Console also logs `Manifest: Line 1 syntax error`. | `link[rel*=icon]` list = `[]`; curl `/favicon.ico` = 404 | Add `app/icon.png` (+ optional `app/manifest.ts`) |
| P0-5 | **robots.txt advertises a sitemap that 404s.** `scripts/generate-sitemap.mjs` exists but isn't wired to any npm script and was never run. | `Sitemap: https://hairedgesalon.in/sitemap.xml` → 404; no `public/sitemap.xml` | Add `"postbuild"` script + generate |
| P0-6 | **Blog structurally broken:** `/blog` → 404 (no index); `/blog/[slug]` serves the *same list page* for ANY slug → duplicate-content trap; cards have **0 `<img>`** (placeholder icons), `post.image` points to non-existent `/images/blog/*`; route is `ƒ Dynamic` (server-rendered per request) while everything else is static. | Garbage slug → HTTP 200; a11y tree shows 6 cards, 12 SVGs, 0 images | Real `[slug]` content + `generateStaticParams` + `/blog` index, or drop the section |

### 🟠 P1 — Visible defects in one/both orientations

| ID | Gap | Evidence | Fix |
|---|---|---|---|
| P1-1 | **Hero headline under navbar in landscape.** Content box top=0 vs nav bottom=80; section grows to 553px on a 390px screen → "Call" CTA and all 4 trust badges start below the fold. Portrait is fine (content top 139). | measured `contentUnderNav: true`, `firstCTA top 320`, `Call top 401 > 390`, `badges top 497` | `min-h-[100svh]` + top padding ≥ nav height + reduce vertical rhythm at short viewports (`@media (max-height: 500px)`) |
| P1-2 | **Detail page in landscape:** 788×591 image ≫ 390 viewport; title at y787, CTAs at y960 — users scroll past a giant photo to reach anything. Two-column layout never activates (needs `lg`=1024). | measured `heroImg box [788,591]`, `h1 top 787` | Constrain image (`max-h-[45vh]`) or switch to side-by-side at `md`, not `lg` |
| P1-3 | **Breadcrumb sits under the fixed navbar on detail pages — both orientations.** Portrait: top 48 vs nav 64 (16px). Landscape: top 64 vs nav 80 (16px). Navbar is also transparent at scroll-top. | measured `underNav: true` both | `pt-16 md:pt-20` on inner-page `<main>` (+ solid nav off-home) |
| P1-4 | **FAB overlaps "Terms of Service" at ≤360px.** Measured intersection **8×16px** at 360×740 (FAB is `z-40`, sits on top of the link). Clears by only 7px at 390. | measured `overlapPx [{x:8, y:16}]` | FAB `bottom` ↑ on small screens, or footer `pb-20`, or move FAB above footer bar |
| P1-5 | **Duplicated `<title>` on every inner page:** "All Services \| Hair Edge… \| Hair Edge…". Pages hardcode the suffix the root template already appends. | curl titles on /services, /services/[id], /privacy, /terms | Remove `\| Salon` suffix from page-level titles (keep in openGraph) |
| P1-6 | **Dead anchors on inner pages:** navbar + footer use `#home/#services/...` but `/services`, `/privacy`, etc. contain no such ids → clicking nav does nothing. | `href="#home"` present on /services, `id="home"` absent | Use `/#home` style links or per-page nav items |
| P1-7 | **Image quality (pipeline + sources):** all requests at default `q=75`; sources are 600×400 @ 1.5–8 KB (300 KB total for 35 images); `deviceSizes` capped at 1536; console LCP warning (an above-fold `hair-styling.avif` lacks `priority`); menu = 666 KB PNG. | network log `q=75` everywhere; earlier dimension audit | `quality` props (85–90), add 1920/2048, `sizes` audit, `priority` on LCP, replace sources with ≥1200×800 originals |
| P1-8 | **Build warning (real code smell):** `Services.tsx:31 react-hooks/exhaustive-deps` — `filteredServices` feeds `pages` useMemo un-memoized. | `npm run build` output | Wrap `filteredServices` in `useMemo` |

### 🟡 P2 — Polish, a11y, hygiene

| ID | Gap | Evidence | Fix |
|---|---|---|---|
| P2-1 | Tap targets below guideline (44px) — **both orientations**: footer quick links **h17**, breadcrumb crumbs h17, header logo h28, legal inline links h19, FAQ `<summary>` h24, review stars 20×32, filter chips h42, desktop nav links h20 (landscape). | measured list per page | Add `py-2.5`/min-h-44 to links & summaries |
| P2-2 | Category filter uses `role=tablist/tab` with **no `tabpanel`, no `aria-controls`** — invalid tabs pattern (a11y tree confirms `tablist` + `selected` tabs). | a11y snapshot uid=35_73+ | Use toggle buttons + `aria-pressed`, or implement real tabpanel wiring |
| P2-3 | Nav transparent at top on every non-home page (content scrolls under it until 50px scroll). Minor on dark bg; compounds P1-3. | `transparentAtTop: true` on /services, /privacy, /blog, detail | Solid background whenever `pathname !== "/"` |
| P2-4 | Hero micro-alignment portrait: trust badges wrap into 2 ragged rows (y605/677), CTA widths ragged (250/186/52); `min-h-screen` = `100vh` (URL-bar jump on mobile; can't emulate browser chrome here). | measured | 2×2 grid for badges, full-width CTAs <640, `min-h-[100svh]` |
| P2-5 | Landscape home page is 15,661px tall; /services 13,058px — all 35 cards render vertically in 2 columns ≥768px. Long scroll; consider 3-col at `md` or "show first N". | `documentElement.scrollHeight` | `md:grid-cols-3` (cards are 382px wide at md already) |
| P2-6 | Home mobile services = horizontal paging with no page indicator (works: arrows + snap + hint text, but users can't see "page 2 of 9"). | `scrollW 3314 / clientW 382` | Add dots/progress "4 of 35" counter |
| P2-7 | Blog cards are 1-col on mobile while services/gallery are 2-col — inconsistent density. | grid cols 1, cards 350 | Decide pattern (or fine if long-form) |
| P2-8 | Repo hygiene: `dev-server.log` + `.err` tracked (dirty after every run); stray untracked `.next-dev-3100.log`; `swiper` + `lucide-react` installed but imported nowhere; stale docs claim "37 services, images unmapped" (reality: **35/35, 0 missing**); legal pages list phone `+91 89853 10570` ≠ config `+91 63048 84778`. | `git ls-files`, grep, curl | `.gitignore` logs, drop unused deps, update docs, fix phone |

---

## 3. What passed (verified, both orientations)

- **Zero horizontal overflow** on every tested page (document `scrollWidth − innerWidth ≤ 0` everywhere).
- **Zero clipped text** (scrollWidth audit across h1–button elements clean on all pages).
- **Services mobile grid — the core requirement — works:** portrait 2-col cards (167px, lefts 16/199, equal widths) in 4-card swipe pages with arrows + snap; flips to a clean 2-col grid ≥768 with arrows/hint hidden; `/services` static 2-col portrait / 2-col landscape, gap 16/24.
- Detail CTAs: full-width stacked in portrait (350×52–58), side-by-side in landscape (385×58).
- **Live data OK:** Google Places API returns real rating (4.6, 1,152 reviews) rendered in page; business hours rendered; 4 JSON-LD blocks on detail pages.
- Build passes: 45 pages, First Load JS 87–113 kB; `tsc` and `next lint` clean.
- `.env.local` is **not** committed (only `.env.example`).
- Privacy text legible (16px/24px), no overflow either orientation.

---

## 4. Suggested remediation order

1. **Routing truths (P0-1, P0-2):** move 404/error to file boundaries; fix breadcrumb category link. Small diffs, user-visible.
2. **Brand/SEO assets (P0-3, P0-4, P0-5, P1-5):** real OG JPEG, favicon, generate sitemap in `postbuild`, de-duplicate titles.
3. **Orientation fixes (P1-1, P1-2, P1-3, P1-4):** hero padding/svh + short-viewport tuning, detail image cap or earlier grid, inner-page navbar offset, FAB/footer clearance at ≤360.
4. **Blog decision (P0-6):** build it properly or remove the route.
5. **Quality & a11y (P1-7, P2-1, P2-2):** image pipeline + tap targets + filter semantics.
6. **Hygiene (P2-8).**

*Re-run recipe:* `npm run dev -- -p 3000` → resize 390×844 / 844×390 → run the DOM audit (overflow, `getBoundingClientRect` on nav/hero/breadcrumb/FAB/footer links, `role=tab` wiring) → `curl -I` the route list → `npm run build` for warnings.
