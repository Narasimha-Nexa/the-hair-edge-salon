"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { salonConfig } from "@/config/salon.config";
import { generateCallUrl } from "@/lib/utils";
import BookingModal from "@/components/services/BookingModal";

export default function Hero() {
  const [place, setPlace] = useState<{ rating: number; ratingCount: number } | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    fetch("/api/google-place")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (typeof data?.rating === "number" && typeof data?.ratingCount === "number") {
          setPlace({ rating: data.rating, ratingCount: data.ratingCount });
        }
      })
      .catch(() => {});
  }, []);

  const rating = place ? place.rating.toFixed(1) : "4.6";
  const reviewCount = place
    ? `${place.ratingCount.toLocaleString("en-IN")}+`
    : "1,100+";

  const trustBadges = [
    { icon: "★", value: rating, label: "Google Rating" },
    { icon: "👥", value: reviewCount, label: "Google Reviews" },
    { icon: "🗓", value: "7 Days", label: "Open Weekly" },
    { icon: "📍", value: "Madhapur", label: "Hyderabad" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-24"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0" aria-hidden="true">
        {salonConfig.assets.hero ? (
          <Image
            src={salonConfig.assets.hero}
            alt=""
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-salon-surface" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-salon-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.08)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 px-4 max-w-6xl mx-auto">
        <div className="text-center animate-fade-in-up">
          <p className="text-salon-gold tracking-[0.3em] text-sm md:text-base mb-6">
            {salonConfig.business.tagline}
          </p>
          <h1 id="hero-title" className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-salon-white mb-6 leading-[1.08] tracking-tight">
            THE HAIR EDGE
            <br />
            <span className="text-salon-gold">UNISEX SALON</span>
          </h1>
          <p className="text-salon-muted text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {salonConfig.address.city}, {salonConfig.address.state}
          </p>
          <div className="w-20 h-0.5 bg-salon-gold mx-auto mb-10" />

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-12" role="group" aria-label="Primary actions">
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="group inline-flex items-center justify-center gap-3 bg-salon-gold text-salon-primary px-8 py-4 rounded-lg font-medium tracking-wider hover:bg-salon-gold-light transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,162,39,0.3)] focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>Book Appointment</span>
              <span className="text-xs opacity-80 hidden sm:inline">Takes 15 seconds</span>
            </button>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 border-2 border-salon-gold text-salon-gold px-8 py-4 rounded-lg font-medium tracking-wider hover:bg-salon-gold hover:text-salon-primary transition-all duration-300 focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
            >
              View Services
            </a>
            <a
              href={generateCallUrl()}
              className="inline-flex items-center justify-center gap-2 text-salon-gold font-medium hover:text-salon-gold-light transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary rounded-lg px-4 py-3"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden sm:inline">Call: {salonConfig.contact.phone.replace(/\+91/, "").replace(/(\d{5})(\d{5})/, "$1 $2")}</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-center" role="list" aria-label="Trust signals">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center gap-1 animate-fade-in-up delay-200" role="listitem">
                <div className="flex items-center gap-1.5 text-salon-gold text-xl md:text-2xl" aria-hidden="true">
                  <span>{badge.icon}</span>
                  <span className="font-heading font-bold text-salon-white">{badge.value}</span>
                </div>
                <span className="text-salon-muted text-xs md:text-sm">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
          <svg className="w-6 h-6 text-salon-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div> */}
      </div>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}