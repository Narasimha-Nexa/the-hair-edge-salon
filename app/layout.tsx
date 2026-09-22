import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { salonConfig } from "@/config/salon.config";
import { serializeJsonLd } from "@/lib/jsonld";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hairedgesalon.in";

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hair Edge Unisex Salon Madhapur | Best Hair Salon in Hyderabad | Book via WhatsApp",        template: `%s | Hair Edge Salon Madhapur`,
  },
  description: "Hair Edge Unisex Salon in Madhapur, Hyderabad - Premium hair, beauty & grooming services. Hair cut, colour, keratin, beard grooming, waxing, facial, bridal makeup. Book appointment via WhatsApp. Open daily till 11:30 PM. 4.6★ Google rating.",
  keywords: [
    "Hair Edge Unisex Salon",
    "Hair Edge Madhapur",
    "Unisex Salon Madhapur",
    "Salon Madhapur Hyderabad",
    "Hair Salon Madhapur",
    "Best Salon in Madhapur",
    "Hair Cut Madhapur",
    "Hair Colour Madhapur",
    "Keratin Treatment Hyderabad",
    "Beard Grooming Madhapur",
    "Bridal Makeup Hyderabad",
    "Facial Madhapur",
    "Waxing Salon Hyderabad",
    "Hair Spa Madhapur",
    "Hair Rebonding Hyderabad",
    "Hair Straightening Madhapur",
    "Unisex Salon near Hitech City",
    "Salon near Me Madhapur",
    "Hair Styling Hyderabad",
    "Beauty Salon Madhapur",
  ],
  authors: [{ name: salonConfig.business.name }],
  creator: salonConfig.business.name,
  publisher: salonConfig.business.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: salonConfig.business.name,
    title: "Hair Edge Unisex Salon Madhapur | Best Hair Salon in Hyderabad",
    description: "Premium hair, beauty & grooming services in Madhapur, Hyderabad. Hair cut, colour, keratin, beard grooming, waxing, facial, bridal makeup. Book via WhatsApp. 4.6★ rating.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hair Edge Unisex Salon Madhapur - Premium Hair & Beauty Salon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hair Edge Unisex Salon Madhapur | Best Hair Salon in Hyderabad",
    description: "Premium hair, beauty & grooming services in Madhapur, Hyderabad. Book via WhatsApp. 4.6★ rating.",
    images: ["/images/og-image.jpg"],
    creator: "@hairedgesalon",
  },
  // Canonical URLs are declared per page (every page links to itself).
  // hreflang is intentionally omitted until localized (/hi, /te) pages exist.
  other: {
    "geo.region": "IN-TG",
    "geo.placename": "Madhapur, Hyderabad",
    "geo.position": "17.4440901;78.3880971",
    "ICBM": "17.4440901, 78.3880971",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: salonConfig.business.name,
    alternateName: "Hair Edge Salon Madhapur",
    description: "Premium unisex salon in Madhapur, Hyderabad offering hair cut, colour, keratin treatment, beard grooming, waxing, facial, bridal makeup, hair spa and more. Book appointments via WhatsApp.",
    telephone: salonConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1-98/14, Bank of India line, opp. Hitech Theater Lane, beside Adi Restaurant, Arunodaya Colony, Sri Sai Nagar",
      addressLocality: "Madhapur",
      addressRegion: "Telangana",
      postalCode: salonConfig.address.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: salonConfig.address.latitude,
      longitude: salonConfig.address.longitude,
    },
    url: siteUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: salonConfig.hoursSpec.opens,
        closes: salonConfig.hoursSpec.closes,
      },
    ],
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, UPI, Debit Card, Net Banking",
    areaServed: [
      {
        "@type": "City",
        name: "Hyderabad",
      },
      {
        "@type": "City",
        name: "Madhapur",
      },
      {
        "@type": "City",
        name: "Hitech City",
      },
      {
        "@type": "City",
        name: "Gachibowli",
      },
      {
        "@type": "City",
        name: "Kondapur",
      },
    ],
    hasMap: salonConfig.google.mapsUrl,
    sameAs: [
      ...(salonConfig.social.instagram ? [salonConfig.social.instagram] : []),
      salonConfig.google.mapsUrl,
      `https://wa.me/${salonConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`,
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      reviewCount: "1152",
      bestRating: "5",
      worstRating: "1",
    },
    knowsAbout: [
      "Hair Cutting",
      "Hair Coloring",
      "Keratin Treatment",
      "Hair Rebonding",
      "Hair Straightening",
      "Beard Grooming",
      "Waxing",
      "Facial",
      "Bridal Makeup",
      "Hair Spa",
      "Hair Styling",
      "Threading",
      "Manicure",
      "Pedicure",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Salon Services in Madhapur, Hyderabad",
      itemListElement: salonConfig.services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.name,
          url: `${siteUrl}/services/${service.id}`,
        },
      })),
    },
    serviceType: [
      "Hair Salon",
      "Beauty Salon",
      "Barber Shop",
      "Bridal Makeup Artist",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where is Hair Edge Unisex Salon located in Madhapur?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hair Edge Unisex Salon is located at 1-98/14, Bank of India line, opp. Hitech Theater Lane, beside Adi Restaurant, Arunodaya Colony, Sri Sai Nagar, Madhapur, Hyderabad, Telangana 500081. Near Hitech City Metro Station.",
        },
      },
      {
        "@type": "Question",
        name: "What are the opening hours of Hair Edge Salon Madhapur?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Hair Edge Unisex Salon Madhapur is open daily from ${salonConfig.hoursSpec.opensLabel} to ${salonConfig.hoursSpec.closesLabel}, including weekends and public holidays.`,
        },
      },
      {
        "@type": "Question",
        name: "How to book an appointment at Hair Edge Unisex Salon?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can book an appointment via WhatsApp by clicking the 'Book Appointment' button on our website or calling ${salonConfig.contact.phoneDisplay}. We confirm availability and send confirmation via WhatsApp.`,
        },
      },
      {
        "@type": "Question",
        name: "What services does Hair Edge Salon Madhapur offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer hair cut, hair colour, keratin treatment, hair rebonding, hair straightening, beard grooming, waxing (full body, face, legs, arms), facial, bridal makeup, hair spa, hair styling, threading, manicure, pedicure, and head massage.",
        },
      },
      {
        "@type": "Question",
        name: "Does Hair Edge Salon offer bridal makeup packages?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer premium bridal makeup packages including pre-bridal packages, engagement makeup, reception makeup, and complete bridal trousseau styling. Book a consultation via WhatsApp.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a hair cut cost at Hair Edge Salon Madhapur?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hair cut pricing depends on hair length, style complexity, and stylist level. The exact cost is confirmed with you on WhatsApp before the service begins.",
        },
      },
      {
        "@type": "Question",
        name: "Is parking available at Hair Edge Salon Madhapur?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, two-wheeler and four-wheeler parking is available near the salon. Located opposite Hitech Theater Lane with easy access from main road.",
        },
      },
      {
        "@type": "Question",
        name: "Which areas does Hair Edge Salon serve in Hyderabad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We serve clients from Madhapur, Hitech City, Gachibowli, Kondapur, Jubilee Hills, Banjara Hills, Kukatpally, Miyapur, and surrounding areas in Hyderabad.",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
        />
        <link rel="sitemap" href="/sitemap.xml" />
        <link rel="robots" href="/robots.txt" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(process.env.NEXT_PUBLIC_GA_ID)});`,
              }}
            />
          </>
        )}
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}