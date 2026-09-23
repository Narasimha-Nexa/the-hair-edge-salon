import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { salonConfig } from "@/config/salon.config";
import { areas, getArea } from "@/lib/areas";
import { serializeJsonLd } from "@/lib/jsonld";
import { generateWhatsAppUrl, generateCallUrl } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hair-edge-unisex-salon.netlify.app";

interface AreaPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const area = getArea(params.slug);
  if (!area) return { title: "Area Not Found" };

  const canonical = `/areas/${area.slug}`;

  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: `${area.metaTitle} | ${salonConfig.business.name}`,
      description: area.metaDescription,
      url: canonical,
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${salonConfig.business.name} — salon serving ${area.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: area.metaTitle,
      description: area.metaDescription,
      images: ["/images/og-image.jpg"],
    },
    other: {
      "geo.region": "IN-TG",
      "geo.placename": `${area.name}, Hyderabad`,
    },
  };
}

export default function AreaPage({ params }: AreaPageProps) {
  const area = getArea(params.slug);
  if (!area) notFound();

  const canonicalUrl = `${siteUrl}/areas/${area.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${siteUrl}/areas/madhapur` },
      { "@type": "ListItem", position: 3, name: area.name, item: canonicalUrl },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: salonConfig.business.name,
    description: area.metaDescription,
    url: canonicalUrl,
    telephone: salonConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "1-98/14, Bank of India line, opp. Hitech Theater Lane, beside Adi Restaurant, Arunodaya Colony, Sri Sai Nagar",
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
    areaServed: {
      "@type": "City",
      name: area.name,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: salonConfig.hoursSpec.opens,
        closes: salonConfig.hoursSpec.closes,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      reviewCount: "1152",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const popularServices = salonConfig.services.slice(0, 8);
  const otherAreas = areas.filter((a) => a.slug !== area.slug);

  return (
    <main id="main-content" className="min-h-screen bg-salon-primary pt-16 md:pt-20">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd) }}
      />

      <section className="py-12 md:py-16 bg-salon-surface border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-salon-muted">
              <li>
                <Link href="/" className="hover:text-salon-gold transition-colors py-1">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-salon-muted/50">
                /
              </li>
              <li>
                <Link href="/areas/madhapur" className="hover:text-salon-gold transition-colors py-1">
                  Service Areas
                </Link>
              </li>
              <li aria-hidden="true" className="text-salon-muted/50">
                /
              </li>
              <li className="text-salon-white font-medium" aria-current="page">
                {area.name}
              </li>
            </ol>
          </nav>

          <p className="text-salon-gold tracking-[0.3em] text-sm mb-4">
            {salonConfig.address.city} · Hyderabad
          </p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-salon-white mb-6 leading-tight">
            {area.h1a}
            <br />
            <span className="text-salon-gold">{area.h1b}</span>
          </h1>
          <p className="text-salon-muted text-lg leading-relaxed mb-6">{area.intro}</p>
          <p className="text-salon-muted leading-relaxed mb-4">{area.nearby}</p>
          <p className="text-salon-muted leading-relaxed mb-8">{area.travel}</p>

          <ul className="grid sm:grid-cols-2 gap-3 mb-10">
            {area.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 p-4 bg-salon-primary border border-white/10 rounded-xl text-salon-white text-sm"
              >
                <svg
                  className="w-5 h-5 text-salon-gold shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={generateWhatsAppUrl(
                `Hello ${salonConfig.business.name}, I'm from ${area.name} and would like to book an appointment.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-salon-gold text-salon-primary py-3.5 px-6 rounded-lg font-medium tracking-wider text-center hover:bg-salon-gold-light transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
            >
              Book from {area.name} via WhatsApp
            </a>
            <a
              href={generateCallUrl()}
              className="border border-salon-gold text-salon-gold py-3.5 px-6 rounded-lg font-medium tracking-wider text-center hover:bg-salon-gold hover:text-salon-primary transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
            >
              Call {salonConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-salon-primary" aria-labelledby="popular-services-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="popular-services-heading" className="font-heading text-2xl md:text-3xl text-salon-white mb-6">
            Popular services for {area.name} clients
          </h2>
          <div className="flex flex-wrap gap-3 mb-10">
            {popularServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="border border-white/15 text-salon-muted hover:border-salon-gold hover:text-salon-gold text-sm px-4 py-2 rounded-full transition-colors"
              >
                {service.name} in {area.name}
              </Link>
            ))}
            <Link
              href="/services"
              className="border border-salon-gold/50 text-salon-gold hover:bg-salon-gold hover:text-salon-primary text-sm px-4 py-2 rounded-full transition-colors"
            >
              View all services →
            </Link>
          </div>

          <h2 className="font-heading text-2xl md:text-3xl text-salon-white mb-4">
            Why {area.name} chooses Hair Edge
          </h2>
          <p className="text-salon-muted leading-relaxed mb-4">
            {salonConfig.business.name} holds a <strong className="text-salon-white">4.6★ Google rating</strong>{" "}
            across 1,100+ reviews. Clients from {area.name} book us for hair colour, keratin treatment,
            hair rebonding, beard grooming, full-body waxing, facials, and bridal makeup — with every
            price confirmed on WhatsApp before we start.
          </p>
          <p className="text-salon-muted leading-relaxed mb-8">
            Address: {salonConfig.address.full}. Daily hours: {salonConfig.hoursSpec.opensLabel} –{" "}
            {salonConfig.hoursSpec.closesLabel}.
          </p>

          <h2 className="font-heading text-2xl md:text-3xl text-salon-white mb-4">
            Other areas we serve
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherAreas.map((other) => (
              <Link
                key={other.slug}
                href={`/areas/${other.slug}`}
                className="text-salon-gold hover:text-salon-gold-light text-sm py-1"
              >
                Salon in {other.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
