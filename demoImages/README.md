# Hair Edge Unisex Salon — Demo Screenshots

Current build captured on 22 Sep 2026 (full-project refresh) · all shots at **2× (Retina) quality** · dev server `localhost:3100`

## Desktop — 1440×900 (rendered 2880×1800)

| File | What it shows |
|---|---|
| `01-desktop-home.png` | Home hero — branding, Book/View Services/Call CTAs, Google trust badges (4.6★ · 1,152+ reviews) |
| `02-desktop-services.png` | Full services catalog with category filters and duration labels |
| `03-desktop-gallery.png` | Gallery section |
| `04-desktop-reviews.png` | Live Google reviews section with rating, review cards and review form |
| `05-desktop-service-detail.png` | Service detail page — media + content layout, price near CTA, FAQs |
| `06-desktop-booking-modal.png` | Booking modal — service preselect, preferred date/time, WhatsApp submit |
| `07-desktop-blog.png` | Blog index |

## Mobile portrait — 390×844 (rendered 780×1688)

| File | What it shows |
|---|---|
| `08-mobile-portrait-home.png` | Home hero, 2×2 trust badges, compact CTAs |
| `09-mobile-portrait-services.png` | 2-column service grid, swipeable filters, price chips |
| `10-mobile-portrait-service-detail.png` | Detail page mobile layout — breadcrumb, price, stacked CTAs |
| `11-mobile-portrait-booking-modal.png` | Full-screen-friendly booking modal on a phone |
| `12-mobile-portrait-reviews.png` | Reviews + trust proof on mobile |

## Mobile landscape — 844×390 (rendered 1688×780)

| File | What it shows |
|---|---|
| `13-mobile-landscape-home.png` | Short-viewport hero — content clears the navbar, CTAs above the fold |
| `14-mobile-landscape-services.png` | Services grid in landscape |
| `15-mobile-landscape-service-detail.png` | Detail page in landscape (compact media, two-column layout) |

---

### Browse all shots at once

Double-click `_contact-sheet.html` — it lays out all 15 screenshots in a grid.

### Regenerate

```bash
npm run dev            # server must run on :3000
node scripts/capture-demo.mjs
```

The script drives headless Edge over CDP (zero dependencies) and rewrites all 15 shots.
