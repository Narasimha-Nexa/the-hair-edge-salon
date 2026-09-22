# Findings: Hair Edge Salon Website Transformation

## Project Analysis Date: 2026-09-21

## Current State Assessment

### Strengths
- Clean Next.js 14 App Router architecture
- TypeScript throughout with good type definitions
- Centralized config (`salon.config.ts`) - excellent for maintainability
- WhatsApp booking flow works (no backend needed)
- Google Places API integration for reviews
- Tailwind CSS with custom design tokens
- Component structure is modular and reusable

### Critical Gaps (P0)
1. **All 37 services use placeholder images** - 35 real images exist in `public/images/services` but aren't mapped
2. **Hero uses SVG placeholder** - No real salon photography
3. **Business hours empty** - Config has empty strings, feature disabled
4. **Modal accessibility broken** - No focus trapping, focus restoration, or keyboard-safe backdrop
5. **Booking form accessibility gaps** - Missing autocomplete, inputMode, live errors, focus management
6. **Focus styles removed** - `focus:outline-none` without `focus-visible` replacement
7. **Menu not keyboard accessible** - Clickable div instead of button
8. **Legal pages are placeholder links** - Privacy/Terms don't exist
9. **No SEO essentials** - No sitemap, robots, OG image, canonical URLs
10. **No analytics/tracking** - Can't measure conversion

### Image Inventory
**Real images available in `public/images/services/` (35 files):**
- beard-shaving.jpg, beard-styling.jpg, beard-trimming.jpg
- cheek-threading.jpg, chin-threading.jpg, eye-brow-threading.jpg
- face-bleach.jpg, face-clean-up.jpg, face-d-tan.jpg, face-waxing.jpg, facial.jpg
- full-arm-waxing.jpg, full-body-waxing.jpg, full-face-threading.jpg, full-leg-waxing.jpg
- half-arm-waxing.jpg, half-leg-waxing.jpg
- hair-blow-dry.jpg, hair-colour.jpg, hair-curling.jpg, hair-cut.jpg, hair-keratin.jpg, hair-rebonding.jpg, hair-spa.jpg, hair-straightening.jpg, hair-styling.jpg, hair-wash.jpg
- head-massage.jpg
- lip-threading.jpg
- make-up.jpg
- manicure.jpg, pedicure.jpg
- sideburn-threading.jpg
- underarms-waxing.jpg

**Missing from config (2 services):**
- hair-keratin (has image)
- make-up (has image)

**All 37 services have corresponding images!**

### Config Structure Analysis
`salon.config.ts` has:
- 11 categories with 37 services
- All services have `id`, `name`, `description`, `image` (placeholder), `isPlaceholder: true`
- Branding colors defined but not as CSS variables
- Features object controls section visibility
- SEO config present

### Accessibility Issues Found
| Component | Issue | WCAG Impact |
|-----------|-------|-------------|
| Modal | No focus trap, closes on backdrop click | 2.4.3, 2.1.1 |
| BookingModal | No autocomplete, inputMode, live errors | 1.3.5, 3.3.2 |
| BookingModal | focus:outline-none without focus-visible | 2.4.7 |
| Menu | Div used as button | 2.1.1, 4.1.2 |
| Globals | No color-scheme, no scroll-padding | 1.4.10, 2.4.7 |

### Conversion Optimization Opportunities
1. **No trust signals near CTAs** - Rating, location, experience badges missing
2. **Services grid overwhelms** - 37 services at once, no featured hierarchy
3. **Booking form too open** - Free text time, past dates allowed, no confirmation expectation
4. **No callback option** - Some customers prefer call back
5. **No sticky mobile CTA** - Floating WhatsApp only, no "Book Now" bar

### Technical Debt
- Swiper installed but unused
- `scrollbar-hide` class used but not in Tailwind config
- No image optimization config for AVIF/WebP
- No PWA/offline support
- Hardcoded whitespace-nowrap in FloatingWhatsApp tooltip

---

## Decisions Made

### Design Direction: Editorial Luxury
- Large image-led sections with breathing room
- Restrained gold accents (not everywhere)
- Asymmetrical featured cards
- Purposeful animations only (entrance, hover, tap)
- Playfair Display for display, Inter for body
- Dark theme with warm gold accent

### Config-Driven Approach
- All content controllable via `salon.config.ts`
- CSS variables generated from branding config
- Feature flags for every content block
- Category-level customization (accent, featured, etc.)

### Booking Philosophy
- Zero database - WhatsApp only
- Progressive disclosure (stepper)
- Smart defaults (tomorrow, 10:00, 30min slots)
- Clear expectation setting
- Fallback chain: WhatsApp → SMS → Email → Call

---

## Research Needed

- [ ] Verify Google Place ID is correct for this salon
- [ ] Confirm product brands used (for trust strip)
- [ ] Get approved hero image/video from client
- [ ] Get salon interior/exterior photos
- [ ] Get stylist photos and bios
- [ ] Get before/after transformation photos (with client consent)
- [ ] Confirm pricing for "From ₹..." display
- [ ] Confirm duration for each service
- [ ] Legal review for Privacy Policy / Terms content

---

## External Dependencies

| Dependency | Status | Notes |
|------------|--------|-------|
| Google Places API Key | Not configured | Need `GOOGLE_PLACES_API_KEY` |
| Google Maps Embed API Key | Not configured | Need `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY` |
| Google Place ID | Configured | `ChIJVVVVKV6RyzsR82Zy8PIOmmA` |
| Hero image | Missing | Need real salon photography |
| Service images | 35/37 present | All mapped in next phase |
| Menu image | Missing | Need photographed menu |
| Logo | Missing | Need logo files |
| OG image | Missing | Need 1200x630 branded image |