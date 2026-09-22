"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { salonConfig } from "@/config/salon.config";
import BookingModal from "@/components/services/BookingModal";
import { track } from "@/lib/analytics";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Menu", href: "/#menu" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const pathname = usePathname();
  // Solid bar on inner routes (page content starts below the fixed navbar)
  // and after the first scroll; a dark scrim on the home hero keeps links
  // readable over the photo.
  const showBackground = scrolled || pathname !== "/";

  const handleBookClick = () => {
    setIsOpen(false);
    track("booking_modal_open", { location: "navbar" });
    setBookingOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        showBackground
          ? "bg-salon-primary/95 backdrop-blur-sm border-b border-white/10 shadow-lg"
          : "bg-gradient-to-b from-black/75 via-black/45 to-transparent"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-salon-gold focus:text-salon-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:rounded focus:outline-none"
      >
        Skip to content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/#home" className="flex items-center gap-2 shrink-0">
            <span className="font-heading text-xl md:text-2xl text-salon-white whitespace-nowrap">
              THE HAIR EDGE
            </span>
          </a>

          <div className="hidden md:flex items-center gap-5 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm tracking-wider text-salon-muted hover:text-salon-gold transition-colors py-3"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleBookClick}
              className="whitespace-nowrap bg-salon-gold text-salon-primary px-4 lg:px-5 py-2 text-sm font-medium tracking-wider hover:bg-salon-gold-light transition-colors"
            >
              {salonConfig.cta.primary}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-salon-white p-2.5"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-salon-surface border-t border-white/10">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="block px-3 py-3 text-salon-muted hover:text-salon-gold hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={handleBookClick}
                className="block w-[calc(100%-1.5rem)] mx-3 mt-4 bg-salon-gold text-salon-primary px-5 py-3 text-center text-sm font-medium tracking-wider hover:bg-salon-gold-light transition-colors"
              >
                {salonConfig.cta.primary}
              </button>
            </div>
          </div>
        )}
      </div>
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </nav>
  );
}
