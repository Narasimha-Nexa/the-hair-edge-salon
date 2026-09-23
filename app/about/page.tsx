import type { Metadata } from "next";
import Link from "next/link";
import { salonConfig } from "@/config/salon.config";
import { getSiteFaqs } from "@/lib/faqs";
import { serializeJsonLd } from "@/lib/jsonld";
import { generateWhatsAppUrl, generateCallUrl } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hair-edge-unisex-salon.netlify.app";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Hair Edge Unisex Salon Madhapur — 8+ years, certified stylists, 4.6★ rated. Our story, hygiene standards, products and team serving Hyderabad.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${salonConfig.business.name}`,
    description:
      "Certified stylists, premium products and strict hygiene — learn why Madhapur trusts Hair Edge Unisex Salon.",
    url: "/about",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `About ${salonConfig.business.name}`,
      },
    ],
  },
};

const faqs = getSiteFaqs();

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
    ],
  };

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${salonConfig.business.name}`,
    url: `${siteUrl}/about`,
    mainEntity: {
      "@type": "BeautySalon",
      name: salonConfig.business.name,
      description:
        "Premium unisex salon in Madhapur, Hyderabad offering hair, beauty and grooming services with certified stylists and international products.",
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
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.6",
        reviewCount: "1152",
        bestRating: "5",
      },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <main id="main-content" className="min-h-screen bg-salon-primary pt-16 md:pt-20">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(aboutJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />

      <section className="py-16 md:py-24 bg-salon-surface border-b border-white/10">
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
              <li className="text-salon-white font-medium" aria-current="page">
                About
              </li>
            </ol>
          </nav>

          <p className="text-salon-gold tracking-[0.3em] text-sm mb-4">Our Story</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-salon-white mb-6 leading-tight">
            About Hair Edge{" "}
            <span className="text-salon-gold">Unisex Salon Madhapur</span>
          </h1>
          <p className="text-salon-muted text-lg leading-relaxed mb-6">
            For 8+ years, Hair Edge Unisex Salon has been a trusted hair and beauty destination in
            Madhapur, Hyderabad. Clients from Hitech City, Gachibowli, Kondapur and across the city
            visit us for certified expertise, transparent pricing, and results that last.
          </p>
          <p className="text-salon-muted leading-relaxed">
            {salonConfig.business.description} Open daily from {salonConfig.hoursSpec.opensLabel} to{" "}
            {salonConfig.hoursSpec.closesLabel}, including weekends.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-salon-primary" aria-labelledby="standards-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="standards-heading" className="font-heading text-2xl md:text-3xl text-salon-white mb-6">
            Why clients trust us
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              "4.6★ Google rating with 1,100+ reviews",
              "Certified stylists with international training",
              "UV-sterilised tools & sanitised stations every client",
              "L’Oréal Professionnel, Wella, Olaplex, Kérastase",
              "Clear quotes confirmed on WhatsApp before we begin",
              "Hair, skin, nails & bridal under one roof",
              "Convenient Madhapur location near Hitech City Metro",
              "Open 7 days a week till 11:30 PM",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-4 bg-salon-surface border border-white/10 rounded-xl"
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
                <p className="text-salon-white text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <h2 className="font-heading text-2xl md:text-3xl text-salon-white mb-4">Visit us</h2>
          <p className="text-salon-muted leading-relaxed mb-2">{salonConfig.address.full}</p>
          <p className="text-salon-muted leading-relaxed mb-6">
            Phone:{" "}
            <a href={generateCallUrl()} className="text-salon-gold hover:text-salon-gold-light">
              {salonConfig.contact.phoneDisplay}
            </a>{" "}
            · Daily {salonConfig.hoursSpec.opensLabel} – {salonConfig.hoursSpec.closesLabel}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <a
              href={generateWhatsAppUrl(
                `Hello ${salonConfig.business.name}, I'd like to book an appointment.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-salon-gold text-salon-primary py-3.5 px-6 rounded-lg font-medium tracking-wider text-center hover:bg-salon-gold-light transition-colors"
            >
              Book via WhatsApp
            </a>
            <Link
              href="/services"
              className="border border-salon-gold text-salon-gold py-3.5 px-6 rounded-lg font-medium tracking-wider text-center hover:bg-salon-gold hover:text-salon-primary transition-colors"
            >
              Explore Services
            </Link>
          </div>

          <h2 className="font-heading text-2xl md:text-3xl text-salon-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-salon-surface border border-white/10 rounded-xl p-5"
              >
                <summary className="flex items-center justify-between cursor-pointer text-salon-white font-medium list-none py-2.5">
                  {faq.q}
                  <svg
                    className="w-5 h-5 text-salon-gold transition-transform group-open:rotate-180 shrink-0 ml-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="mt-4 text-salon-muted leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
