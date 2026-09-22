"use client";

import Link from "next/link";
import { useState } from "react";
import { salonConfig } from "@/config/salon.config";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/services/ServiceCard";
import BookingModal from "@/components/services/BookingModal";

export default function Services() {
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    service: string;
  }>({ isOpen: false, service: "" });
  const featuredServices = salonConfig.categories
    .flatMap((category) => category.services)
    .filter((service) => service.featured)
    .slice(0, 6);

  const handleBookService = (serviceName: string) => {
    setBookingModal({ isOpen: true, service: serviceName });
  };

  if (!salonConfig.features.services) return null;

  return (
    <section id="services" className="py-20 md:py-28 bg-salon-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Services"
          subtitle="A considered selection of our most-requested salon experiences"
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={handleBookService}
              featured
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 border border-salon-gold px-7 py-3.5 text-sm font-medium tracking-wide text-salon-gold transition-colors hover:bg-salon-gold hover:text-salon-primary focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-surface"
          >
            Explore All 35 Services
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {featuredServices.length === 0 && (
          <div className="text-center py-12 animate-fade-in-up">
            <p className="text-salon-muted">
              Our service menu is being updated. Please contact us for availability.
            </p>
          </div>
        )}
      </div>

      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal({ isOpen: false, service: "" })}
        preselectedService={bookingModal.service}
      />
    </section>
  );
}
