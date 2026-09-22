import Link from "next/link";
import { salonConfig } from "@/config/salon.config";
import { generateWhatsAppUrl, generateCallUrl } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-salon-primary">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-28 md:py-32">
        <div className="text-center max-w-md mx-auto animate-fade-in-up">
          <div className="w-24 h-24 mx-auto mb-8 bg-salon-gold/10 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-salon-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="font-heading text-6xl text-salon-white mb-2">404</h1>
          <h2 className="font-heading text-2xl text-salon-white mb-4">
            Page Not Found
          </h2>
          <p className="text-salon-muted mb-8 leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved or doesn&apos;t exist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="bg-salon-gold text-salon-primary px-8 py-3.5 rounded-lg font-medium tracking-wider hover:bg-salon-gold-light transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
            >
              Back to Home
            </Link>
            <a
              href={generateWhatsAppUrl(
                `Hello ${salonConfig.business.name}, I couldn't find what I was looking for on your website.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-salon-gold text-salon-gold px-8 py-3.5 rounded-lg font-medium tracking-wider hover:bg-salon-gold hover:text-salon-primary transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
            >
              Contact Us
            </a>
          </div>
          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-salon-muted text-sm mb-4">
              Or explore our main sections:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
              <Link
                href="/#services"
                className="text-salon-muted hover:text-salon-gold transition-colors py-2"
              >
                Services
              </Link>
              <span className="text-salon-muted/30">·</span>
              <Link
                href="/services"
                className="text-salon-muted hover:text-salon-gold transition-colors py-2"
              >
                All Services
              </Link>
              <span className="text-salon-muted/30">·</span>
              <Link
                href="/#menu"
                className="text-salon-muted hover:text-salon-gold transition-colors py-2"
              >
                Menu
              </Link>
              <span className="text-salon-muted/30">·</span>
              <Link
                href="/#contact"
                className="text-salon-muted hover:text-salon-gold transition-colors py-2"
              >
                Contact
              </Link>
              <span className="text-salon-muted/30">·</span>
              <a
                href={generateCallUrl()}
                className="text-salon-muted hover:text-salon-gold transition-colors py-2"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
