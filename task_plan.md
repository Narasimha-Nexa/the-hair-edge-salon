# Task Plan: Ultra-Premium Salon Website Transformation

## Goal
Transform the Hair Edge Unisex Salon website into an ultra-premium, accessible, conversion-focused, fully functional luxury editorial website that drives bookings via WhatsApp.

## Project Context
- **Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Swiper.js
- **Current State**: Functional but template-like with placeholder images, basic accessibility gaps, minimal trust signals
- **Target**: Editorial luxury layout with real images, premium UX, full accessibility, launch-ready

---

## Phase 1: Foundation & Critical Fixes (P0 - Must Ship)

### 1.1 Connect Real Service Images
- [ ] Map 35 images in `public/images/services` to service config
- [ ] Update `salon.config.ts` with correct image paths
- [ ] Remove `isPlaceholder: true` from all services
- [ ] Add hero background image
- [ ] Add salon menu image

### 1.2 Business Hours Configuration
- [ ] Update `salon.config.ts` hours: Daily 08:00-22:00
- [ ] Enable `features.hours: true`
- [ ] Verify display in Contact section and Footer

### 1.3 Accessibility: Modal Focus Management
- [ ] Implement focus trapping in `Modal.tsx`
- [ ] Add focus restoration on close
- [ ] Keyboard-safe backdrop handling (Escape only, not click)
- [ ] Add `focus-visible` styles globally

### 1.4 Accessibility: BookingModal Enhancements
- [ ] Add `name`, `autocomplete`, `inputMode` to all inputs
- [ ] Implement live error announcements (ARIA live region)
- [ ] Move focus to first invalid input on submit
- [ ] Replace `focus:outline-none` with `focus-visible` rings
- [ ] Add proper labels and descriptions

### 1.5 Accessibility: Menu Keyboard Support
- [ ] Convert clickable `div` to `<button>` in `Menu.tsx`
- [ ] Add proper ARIA attributes

### 1.6 globals.css Critical Updates
- [ ] Add `color-scheme: dark`
- [ ] Add `touch-action: manipulation` for mobile tap behavior
- [ ] Add `scroll-padding-top` for anchor offset (navbar height)
- [ ] Enhanced reduced-motion handling for all animations

---

## Phase 2: Premium Visual & Content (P0 - Visual Impact)

### 2.1 Hero Section Transformation
- [ ] Replace placeholder with real hero image/video
- [ ] Add trust badges strip (rating, clients, experience, hygiene)
- [ ] Editorial typography hierarchy
- [ ] Subtle parallax/fade entrance animation

### 2.2 Services Section - Editorial Layout
- [ ] Featured services carousel (Swiper) - 3-4 hero cards
- [ ] Asymmetrical featured card layout
- [ ] "From ₹..." price + duration display
- [ ] Category filter with swipeable cards on mobile
- [ ] "Book this service" → opens modal with service pre-selected
- [ ] Gender/occasion filter tags (config-driven)

### 2.3 Visual Story Sections
- [ ] Salon interior/exterior gallery (lightbox)
- [ ] Before/After transformations carousel
- [ ] Stylist team cards with specialties
- [ ] Product brands strip (if approved)

### 2.4 Trust Signals Integration
- [ ] Google rating/review count near first CTA
- [ ] "Near Hitech City, Madhapur" location badge
- [ ] Years experience badge
- [ ] Certified stylists badge
- [ ] Product brands used strip

---

## Phase 3: Conversion-Optimized Booking (P1 - Revenue Impact)

### 3.1 Smart Booking Form
- [ ] Date picker: disable past dates, min=today
- [ ] Time slots dropdown (config-driven: 08:00-22:00, 30min intervals)
- [ ] WhatsApp message includes: service, date, time, source page
- [ ] Clear expectation: "We'll confirm availability on WhatsApp"
- [ ] Optional callback request checkbox
- [ ] Pre-fill from browser autofill

### 3.2 Booking Flow UX
- [ ] Stepper: Service → Details → Confirm
- [ ] Service pre-selection from cards
- [ ] Success state with clear next steps
- [ ] "Book another" / "Call instead" options

---

## Phase 4: Config-Driven Flexibility (P1 - Maintainability)

### 4.1 Enhanced Type System
- [ ] Extend `Service` with: price, duration, featured, gender, occasion, availability
- [ ] Extend `ServiceCategory` with: accent color, featured status, description
- [ ] Add `ContentBlock` types for gallery, team, offers, testimonials
- [ ] Add `TrustSignal` type for badges

### 4.2 CSS Variables from Config
- [ ] Generate `:root` CSS variables from `salonConfig.branding`
- [ ] Tailwind tokens reference CSS variables
- [ ] Category accent colors as CSS variables

### 4.3 Feature Flags for Content Blocks
- [ ] `features.gallery`, `features.team`, `features.offers`, `features.transformations`
- [ ] Toggle sections on/off via config
- [ ] Reusable content block components

---

## Phase 5: Launch Essentials (P1 - Production Ready)

### 5.1 SEO & Metadata
- [ ] Canonical URLs
- [ ] Dynamic sitemap.xml generation
- [ ] robots.txt
- [ ] Open Graph image (1200x630)
- [ ] Twitter Card image
- [ ] JSON-LD enhancements (Service, PriceRange, OpeningHours)

### 5.2 Legal Pages
- [ ] Privacy Policy page (`/privacy`)
- [ ] Terms of Service page (`/terms`)
- [ ] Cookie Policy (if needed)
- [ ] Link from Footer

### 5.3 Analytics & Tracking
- [ ] Google Analytics 4 / Plausible integration
- [ ] WhatsApp click event tracking
- [ ] Booking form submission tracking
- [ ] Scroll depth tracking

### 5.4 Error Pages
- [ ] 404 page with search/navigation
- [ ] 500 error page
- [ ] Offline page (PWA)

### 5.5 Environment & Deployment
- [ ] Complete `.env.example` with all required vars
- [ ] Vercel deployment config
- [ ] Domain configuration notes

---

## Phase 6: Polish & Performance (P2 - Excellence)

### 6.1 Performance Optimization
- [ ] Image optimization (AVIF/WebP, proper sizes)
- [ ] Font optimization (preload, display: swap)
- [ ] Code splitting verification
- [ ] Lighthouse CI integration

### 6.2 Micro-interactions & Polish
- [ ] Staggered entrance animations
- [ ] Hover/tap feedback on all interactive elements
- [ ] Loading skeletons for async content
- [ ] Smooth scroll behavior

### 6.3 Multi-language Support (Future)
- [ ] i18n structure (EN/HI/TE)
- [ ] Language switcher
- [ ] RTL support preparation

---

## Phase 7: Testing & Verification (Continuous)

### 7.1 Accessibility Audit
- [ ] WCAG 2.1 AA compliance check
- [ ] Keyboard navigation full test
- [ ] Screen reader test (NVDA/VoiceOver)
- [ ] Color contrast verification

### 7.2 Cross-browser/device Testing
- [ ] Chrome, Firefox, Safari, Edge
- [ ] iOS Safari, Chrome Android
- [ ] Tablet breakpoints

### 7.3 Conversion Testing
- [ ] Booking flow end-to-end
- [ ] WhatsApp deep link verification
- [ ] Form validation edge cases

---

## Progress Tracking

| Phase | Status | Started | Completed |
|-------|--------|---------|-----------|
| 1: Foundation & Critical Fixes | pending | - | - |
| 2: Premium Visual & Content | pending | - | - |
| 3: Conversion-Optimized Booking | pending | - | - |
| 4: Config-Driven Flexibility | pending | - | - |
| 5: Launch Essentials | pending | - | - |
| 6: Polish & Performance | pending | - | - |
| 7: Testing & Verification | pending | - | - |

---

## Next Step
Start Phase 1.1: Connect real service images to config