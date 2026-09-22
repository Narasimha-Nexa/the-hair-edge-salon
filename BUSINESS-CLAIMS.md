# Business Claims — Owner Verification Checklist

Every claim below currently appears in live page copy, blog articles, FAQ
schema, or metadata. Each one must be confirmed by the salon owner before
launch; anything untrue must be struck from the source listed so the site,
blog and structured data stay honest (Google rewards consistency, and
unsupported claims are both a trust and a rich-result risk).

| # | Claim | Where it appears | Verified |
|---|-------|------------------|----------|
| 1 | Opening hours 8:00 AM – 11:30 PM daily | `config/salon.config.ts` (hoursSpec), JSON-LD, booking hint, ServiceDetail "Daily:" line | ☐ (currently mirrors Google Business Profile) |
| 2 | Call number +91 89853 10570 | config `contact.phone`, footer, legal pages, JSON-LD `telephone` | ☐ (matches Google Business Profile) |
| 3 | WhatsApp booking number +91 63048 84778 | config `contact.whatsapp`, all wa.me links | ☐ (confirm both numbers are salon-owned and intentional) |
| 4 | "8+ years of expertise in Madhapur" | ServiceDetail "Why Choose" grid, blog | ☐ |
| 5 | "Certified stylists with international training" (L'Oréal, Wella) | ServiceDetail, blog "best salon" article | ☐ |
| 6 | Product brands: L'Oréal Professionnel, Wella, Schwarzkopf, Olaplex, Kérastase | Brands section, ServiceDetail, blog, FAQ | ☐ |
| 7 | "Strict hygiene & sterilization protocols" (UV chambers — blog) | ServiceDetail, blog, Terms §6 | ☐ |
| 8 | "Two-wheeler and four-wheeler parking is available" | **FAQ JSON-LD** (home schema), ServiceDetail "Ample parking" | ☐ |
| 9 | "Near Hitech City Metro Station" | FAQ JSON-LD, blog | ☐ |
| 10 | Service "From ₹" prices and durations (35 items) | `config/salon.config.ts` categories, cards, detail pages | ☐ |
| 11 | Bridal package prices ₹15,000 / ₹25,000 / ₹35,000 | blog bridal article | ☐ |
| 12 | "Bridal specialist with 10+ years experience" | blog bridal article | ☐ |
| 13 | 4.6★ rating / 1,152 reviews (live Google data) | JSON-LD `aggregateRating`, Hero badge, Reviews section | ☐ (auto-mirrors the Places API; recheck if the GBP rating shifts) |
| 14 | Team names & experience (Priya Sharma, Rahul Kumar, Anita Reddy, Vikram Singh) | `config/salon.config.ts` team (hidden while `features.team = false`) | ☐ before enabling the Team section |
| 15 | "Opposite Hitech Theater Lane, beside Adi Restaurant…" address | config address, all pages, legal — must match GBP exactly | ☐ |

## Photography to supply (premium-imagery gap)

The current image set is generic service photography. Replace with original
assets — same file names, no code changes needed:

1. `public/images/services/hair-rebonding.avif` — **hero**: signature salon
   interior or stylist-at-work shot (min 2048px wide), not a treatment close-up.
2. Category/service photos: real stylist-at-work and client-transformation
   shots for the most-visible services (hair-cut, hair-colour, keratin,
   beard-styling, facial, make-up) — min 1200px wide.
3. Gallery images (6 slots in `config.gallery`): interiors, team at work,
   before/after transformations (with client consent — see Terms §7).

## Copy to confirm before launch

- Booking model is **WhatsApp-only**: the site captures a *preferred* date
  and time; availability is confirmed on WhatsApp. The old "callback within
  30 minutes" promise was removed — do not reintroduce callback/call-center
  language without a real callback system behind it.
