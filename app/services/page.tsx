import { Metadata } from "next";
import Link from "next/link";
import { salonConfig } from "@/config/salon.config";
import { serializeJsonLd } from "@/lib/jsonld";
import { getSiteFaqs } from "@/lib/faqs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import ServicesCatalog from "@/components/services/ServicesCatalog";

const totalCategories = salonConfig.categories.length;
const totalServices = salonConfig.categories.reduce(
  (acc, cat) => acc + cat.services.length,
  0
);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hair-edge-unisex-salon.netlify.app";
const faqs = getSiteFaqs();

export const metadata: Metadata = {
  title: "Salon Services",
  description: `Explore all ${totalServices} salon services in Madhapur, Hyderabad - hair cut, colour, keratin, rebonding, beard grooming, waxing, facial, bridal makeup and more. Book via WhatsApp at Hair Edge Unisex Salon.`,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Salon Services in Madhapur | ${salonConfig.business.name}`,
    url: "/services",
    description: `Explore all ${totalServices} salon services in Madhapur, Hyderabad. Hair cut, colour, keratin, beard grooming, waxing, facial, bridal makeup and more.`,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Salon Services in Madhapur, Hyderabad",
  numberOfItems: totalServices,
  itemListElement: salonConfig.services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.name,
    url: `${siteUrl}/services/${service.id}`,
  })),
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

export default function ServicesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-salon-primary">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />
      <section className="py-20 md:py-28 bg-salon-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-salon-white mb-6">
              Our Complete <span className="text-salon-gold">Service Menu</span>
            </h1>
            <p className="text-salon-muted text-lg md:text-xl max-w-2xl mx-auto">
              {totalServices} professional salon services across {totalCategories} categories. Expert stylists, premium products, thoughtful care.
            </p>
          </div>
          <ServicesCatalog categories={salonConfig.categories} />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-salon-primary" aria-labelledby="services-faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="services-faq-heading" className="font-heading text-2xl md:text-3xl text-salon-white mb-6">
            Salon services FAQ — Madhapur, Hyderabad
          </h2>
          <div className="space-y-4 mb-10">
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
          <div className="flex flex-wrap gap-3">
            <Link
              href="/areas/madhapur"
              className="text-salon-gold hover:text-salon-gold-light text-sm"
            >
              Salon in Madhapur →
            </Link>
            <Link
              href="/areas/hitech-city"
              className="text-salon-gold hover:text-salon-gold-light text-sm"
            >
              Salon near Hitech City →
            </Link>
            <Link
              href="/about"
              className="text-salon-gold hover:text-salon-gold-light text-sm"
            >
              About us →
            </Link>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
