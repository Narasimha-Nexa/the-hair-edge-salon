import { Metadata } from "next";
import { salonConfig } from "@/config/salon.config";
import { serializeJsonLd } from "@/lib/jsonld";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import ServiceCategoryList from "@/components/sections/ServiceCategoryList";

const totalCategories = salonConfig.categories.length;
const totalServices = salonConfig.categories.reduce(
  (acc, cat) => acc + cat.services.length,
  0
);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hairedgesalon.in";

export const metadata: Metadata = {
  title: "Salon Services & Prices",
  description: `Explore all ${totalServices} salon services & prices in Madhapur, Hyderabad - hair cut, colour, keratin, rebonding, beard grooming, waxing, facial, bridal makeup and more. Book via WhatsApp at Hair Edge Unisex Salon.`,
  alternates: { canonical: "/services" },
  openGraph: {
    url: "/services",
    description: `Explore all ${totalServices} salon services & prices in Madhapur, Hyderabad. Hair cut, colour, keratin, beard grooming, waxing, facial, bridal makeup and more.`,
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

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-salon-primary">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <section className="py-20 md:py-28 bg-salon-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-salon-white mb-6">
              Our Complete <span className="text-salon-gold">Service Menu</span>
            </h1>
            <p className="text-salon-muted text-lg md:text-xl max-w-2xl mx-auto">
              {totalServices} professional salon services across {totalCategories} categories. Transparent pricing, expert stylists, premium products.
            </p>
          </div>
          <ServiceCategoryList categories={salonConfig.categories} />
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}