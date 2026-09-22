"use client";

import { salonConfig } from "@/config/salon.config";
import {
  generateCallUrl,
  generateWhatsAppUrl,
  generateDirectionsUrl,
} from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Contact() {
  if (!salonConfig.features.contact) return null;

  const mapsCidEmbedSrc = `https://www.google.com/maps?cid=${salonConfig.google.cid ?? ""}&hl=en&z=17&output=embed`;

  const hasHours = salonConfig.features.hours && Object.values(salonConfig.hours).some((h) => h);

  return (
    <section id="contact" className="py-20 md:py-28 bg-salon-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Find Us"
          subtitle="Visit us or get in touch"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-2xl text-salon-white mb-4">
                {salonConfig.business.name}
              </h3>
              <p className="text-salon-muted leading-relaxed">
                {salonConfig.address.full}
              </p>
            </div>

            {salonConfig.contact.phone && (
              <div>
                <p className="text-salon-muted text-sm mb-1">Phone</p>
                <a
                  href={generateCallUrl()}
                  className="text-salon-white hover:text-salon-gold transition-colors text-lg"
                >
                  {salonConfig.contact.phone}
                </a>
              </div>
            )}

            {salonConfig.contact.whatsapp && (
              <div>
                <p className="text-salon-muted text-sm mb-1">WhatsApp</p>
                <a
                  href={generateWhatsAppUrl(
                    `Hello ${salonConfig.business.name}, I would like to inquire about your services.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-salon-white hover:text-salon-gold transition-colors text-lg"
                >
                  {salonConfig.contact.whatsapp}
                </a>
              </div>
            )}

            {salonConfig.social.instagram && (
              <div>
                <p className="text-salon-muted text-sm mb-1">Instagram</p>
                <a
                  href={salonConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-salon-white hover:text-salon-gold transition-colors text-lg inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  @hairedgeunisex
                </a>
              </div>
            )}

            {hasHours && (
              <div>
                <p className="text-salon-muted text-sm mb-3">Business Hours</p>
                <div className="space-y-1">
                  {Object.entries(salonConfig.hours).map(([day, hours]) => {
                    if (!hours) return null;
                    return (
                      <div key={day} className="flex justify-between text-sm">
                        <span className="text-salon-white capitalize">{day}</span>
                        <span className="text-salon-muted">{hours}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {salonConfig.contact.phone && (
                <a
                  href={generateCallUrl()}
                  className="bg-salon-gold text-salon-primary px-8 py-3 text-sm font-medium tracking-wider text-center hover:bg-salon-gold-light transition-colors"
                >
                  CALL NOW
                </a>
              )}
              <a
                href={generateDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-salon-gold text-salon-gold px-8 py-3 text-sm tracking-wider text-center hover:bg-salon-gold hover:text-salon-primary transition-colors"
              >
                {salonConfig.cta.directions.toUpperCase()}
              </a>
              {salonConfig.contact.whatsapp && (
                <a
                  href={generateWhatsAppUrl(
                    `Hello ${salonConfig.business.name}, I would like to book an appointment.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-salon-gold text-salon-gold px-8 py-3 text-sm tracking-wider text-center hover:bg-salon-gold hover:text-salon-primary transition-colors"
                >
                  {salonConfig.cta.primary.toUpperCase()}
                </a>
              )}
            </div>
          </div>

          <div className="bg-salon-surface border border-white/10 overflow-hidden">
            <iframe
              src={mapsCidEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hair Edge Unisex Salon Madhapur location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
