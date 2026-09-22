"use client";

import { useState, useRef, useMemo } from "react";
import { salonConfig } from "@/config/salon.config";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryFilter from "@/components/services/CategoryFilter";
import ServiceCard from "@/components/services/ServiceCard";
import BookingModal from "@/components/services/BookingModal";
import type { Service } from "@/types/salon";

const MOBILE_PAGE_SIZE = 4;

function chunkServices(services: Service[], size: number): Service[][] {
  const pages: Service[][] = [];
  for (let i = 0; i < services.length; i += size) {
    pages.push(services.slice(i, i + size));
  }
  return pages;
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    service: string;
  }>({ isOpen: false, service: "" });
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = salonConfig.categories;

  const filteredServices: Service[] =
    activeCategory === "all"
      ? categories.flatMap((cat) => cat.services)
      : categories.find((cat) => cat.id === activeCategory)?.services || [];

  const pages = useMemo(
    () => chunkServices(filteredServices, MOBILE_PAGE_SIZE),
    [filteredServices]
  );

  const handleBookService = (serviceName: string) => {
    setBookingModal({ isOpen: true, service: serviceName });
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  };

  const scrollByPage = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  if (!salonConfig.features.services) return null;

  return (
    <section id="services" className="py-20 md:py-28 bg-salon-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Services"
          subtitle="Explore our range of professional salon services"
        />

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-4 px-4 scrollbar-hide scroll-smooth md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible md:snap-none md:pb-0"
            aria-label="All services"
          >
            {pages.map((page, pageIndex) => (
              <div
                key={`${activeCategory}-${pageIndex}`}
                className="grid grid-cols-2 gap-4 w-full shrink-0 snap-start content-start md:contents"
              >
                {page.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onBook={handleBookService}
                  />
                ))}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-salon-primary/80 backdrop-blur border border-white/10 text-salon-gold p-2 rounded-full shadow-lg hover:bg-salon-primary focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-surface"
            aria-label="Previous services"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-salon-primary/80 backdrop-blur border border-white/10 text-salon-gold p-2 rounded-full shadow-lg hover:bg-salon-primary focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-surface"
            aria-label="Next services"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-salon-surface to-transparent md:hidden" aria-hidden="true" />
        </div>

        <p className="md:hidden text-center text-salon-muted text-xs mt-4">
          Swipe to browse all {filteredServices.length} services
        </p>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 animate-fade-in-up">
            <p className="text-salon-muted">
              No services found in this category.
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