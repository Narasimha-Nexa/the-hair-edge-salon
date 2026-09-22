"use client";

import { salonConfig } from "@/config/salon.config";
import { generateWhatsAppUrl, generateCallUrl } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <main className="min-h-screen bg-salon-primary flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md mx-auto animate-fade-in-up">
          <div className="w-24 h-24 mx-auto mb-8 bg-red-500/10 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="font-heading text-4xl text-salon-white mb-4">
            Something Went Wrong
          </h1>
          <p className="text-salon-muted mb-8 leading-relaxed">
            We&apos;re sorry, but an unexpected error occurred. Please try
            again — if it persists, our team is one message away.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={reset}
              className="bg-salon-gold text-salon-primary px-8 py-3.5 rounded-lg font-medium tracking-wider hover:bg-salon-gold-light transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
            >
              Try Again
            </button>
            <a
              href={generateWhatsAppUrl(
                `Hello ${salonConfig.business.name}, I encountered an error on your website.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-salon-gold text-salon-gold px-8 py-3.5 rounded-lg font-medium tracking-wider hover:bg-salon-gold hover:text-salon-primary transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary"
            >
              Report Issue
            </a>
          </div>
          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="text-salon-muted text-sm mb-4">
              Or contact us directly:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
              <a
                href={generateCallUrl()}
                className="text-salon-muted hover:text-salon-gold transition-colors py-2"
              >
                Call: {salonConfig.contact.phoneDisplay}
              </a>
              <span className="text-salon-muted/30">·</span>
              <a
                href={generateWhatsAppUrl(
                  `Hello ${salonConfig.business.name}, I need assistance.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-salon-muted hover:text-salon-gold transition-colors py-2"
              >
                WhatsApp
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
