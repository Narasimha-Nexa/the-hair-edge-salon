import { Metadata } from "next";
import { salonConfig } from "@/config/salon.config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import ServiceCategoryList from "@/components/sections/ServiceCategoryList";

const totalCategories = salonConfig.categories.length;
const totalServices = salonConfig.categories.reduce(
  (acc, cat) => acc + cat.services.length,
  0
);

export const metadata: Metadata = {
  title: "All Services | Hair Edge Unisex Salon Madhapur",
  description: `Explore all ${totalServices} professional salon services at Hair Edge Unisex Salon Madhapur. Hair cut, colour, keratin, beard grooming, waxing, facial, bridal makeup & more. Book via WhatsApp.`,
  openGraph: {
    title: "All Services | Hair Edge Unisex Salon Madhapur",
    description: `Explore all ${totalServices} professional salon services at Hair Edge Unisex Salon Madhapur. Book via WhatsApp.`,
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-salon-primary">
      <Navbar />
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