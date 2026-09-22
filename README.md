# Hair Edge Unisex Salon - Website

Premium, modern, mobile-first website for Hair Edge Unisex Salon Madhapur, Hyderabad.

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Carousel**: Swiper.js
- **Maps**: Google Maps Embed API
- **Reviews**: Google Places API (New)
- **Booking**: WhatsApp Deep Link

## Installation

```bash
cd hair-edge-salon
npm install
```

## Environment Variables

Create `.env.local` file:

```env
# Google Places API (New) - Server-side only
GOOGLE_PLACES_API_KEY=your_places_api_key

# Google Maps Embed API - Browser-side
GOOGLE_MAPS_EMBED_API_KEY=your_maps_embed_api_key

# Google Place ID
GOOGLE_PLACE_ID=ChIJVVVVKV6RyzsR82Zy8PIOmmA
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production Build

```bash
npm run build
npm run start
```

## Google Cloud Setup

### 1. Create/Select Project
- Go to [Google Cloud Console](https://console.cloud.google.com)
- Create new project or select existing

### 2. Enable APIs
- Enable **Places API (New)**
- Enable **Maps Embed API**

### 3. Create API Keys
- Go to Credentials → Create Credentials → API Key
- Create two keys:
  1. **Places API Key** (server-side) - Restrict to Places API only
  2. **Maps Embed Key** (browser) - Restrict to Maps Embed API + HTTP referrer

### 4. Restrict API Keys
- Places Key: API restriction → Places API only
- Maps Key: HTTP referrer restriction → Add your domain

## Where to Change Salon Information

Edit `config/salon.config.ts`:

```typescript
export const salonConfig = {
  business: { name, tagline, description },
  contact: { phone, whatsapp, email },
  address: { full, latitude, longitude },
  google: { placeId, mapsUrl },
  services: [...],
  // ... all business data
};
```

## Where to Replace Images

Place images in `public/images/`:

- `logo/` - Salon logo
- `hero/` - Hero section background
- `services/` - Service photos
- `menu/` - Physical menu photo
- `salon/` - General salon photos

Update paths in `config/salon.config.ts` → `assets` section.

## How WhatsApp Booking Works

1. Customer fills booking form (name, phone, service)
2. Form validates input
3. Generates formatted WhatsApp message
4. Opens `wa.me/916304884778?text=...` in new tab
5. Customer sends message in WhatsApp
6. Salon receives booking request

No data is stored on the website.

## How Google Reviews Work

1. Frontend calls `/api/google-place`
2. Server fetches from Google Places API (New)
3. Returns rating, review count, and reviews
4. Frontend displays with Google attribution
5. Links to Google Maps for full reviews

Requires valid `GOOGLE_PLACES_API_KEY`.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

```bash
npm run build
```

Deploy the `.next` folder with Node.js runtime.

## Project Structure

```
hair-edge-salon/
├── app/
│   ├── api/google-place/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/ (Navbar, Footer, FloatingWhatsApp)
│   ├── sections/ (Hero, About, Services, Menu, Reviews, Contact)
│   ├── booking/ (BookingForm)
│   └── ui/ (Button, Modal, SectionHeading, etc.)
├── config/
│   └── salon.config.ts (Central configuration)
├── lib/
│   └── utils.ts (Utility functions)
├── types/
│   └── salon.ts (TypeScript types)
└── public/images/ (Static assets)
```

## License

Private - Hair Edge Unisex Salon Madhapur
