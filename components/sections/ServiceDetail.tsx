"use client";

import Image from "next/image";
import { salonConfig } from "@/config/salon.config";
import { generateWhatsAppUrl, generateCallUrl } from "@/lib/utils";
import { serializeJsonLd } from "@/lib/jsonld";
import BookingModal from "@/components/services/BookingModal";
import { useState } from "react";
import type { Service, ServiceCategory } from "@/types/salon";

interface ServiceDetailProps {
  service: Service;
  category?: ServiceCategory;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hairedgesalon.in";

export default function ServiceDetail({ service, category }: ServiceDetailProps) {
  const [bookingModal, setBookingModal] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  const handleBook = () => {
    setBookingModal(true);
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${siteUrl}/services/${service.id}`,
    image: `${siteUrl}${service.image}`,
    provider: {
      "@type": "BeautySalon",
      name: salonConfig.business.name,
      telephone: salonConfig.contact.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "1-98/14, Bank of India line, opp. Hitech Theater Lane, beside Adi Restaurant, Arunodaya Colony, Sri Sai Nagar",
        addressLocality: "Madhapur",
        addressRegion: "Telangana",
        postalCode: salonConfig.address.postalCode,
        addressCountry: "IN",
      },
    },
    areaServed: "Hyderabad, Telangana, India",
    duration: service.duration,
    category: category?.name,
  };

  const faqs = [
    {
      q: `How long does ${service.name.toLowerCase()} take?`,
      a: service.duration ? `${service.name} typically takes ${service.duration}. Duration may vary based on hair length and condition.` : `Duration varies based on your specific needs. Our stylist will provide an estimate during consultation.`,
    },
    {
      q: `How much does ${service.name.toLowerCase()} cost?`,
      a: `Pricing for ${service.name} depends on hair length, thickness, and product choice. Contact us on WhatsApp for a personalized quote — exact cost is confirmed before we begin.`,
    },
    {
      q: `Do I need to book in advance for ${service.name.toLowerCase()}?`,
      a: `Yes, we recommend booking at least 2-3 hours in advance via WhatsApp. Walk-ins are welcome based on availability.`,
    },
    {
      q: `What products do you use for ${service.name.toLowerCase()}?`,
      a: `We use premium professional brands including L'Oréal Professionnel, Wella, Schwarzkopf, Olaplex, and Kérastase. Specific products depend on the service and your hair type.`,
    },
    {
      q: `Is ${service.name.toLowerCase()} suitable for all hair types?`,
      a: `Our expert stylists assess your hair type and condition before recommending the best approach. We customize every service for your unique needs.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
              { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
              ...(category
                ? [
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: category.name,
                      item: `${siteUrl}/services#${category.id}`,
                    },
                  ]
                : []),
              {
                "@type": "ListItem",
                position: category ? 4 : 3,
                name: service.name,
                item: `${siteUrl}/services/${service.id}`,
              },
            ],
          }),
        }}
      />

      <section className="py-12 md:py-16 bg-salon-surface border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-salon-muted">
              <li><a href="/" className="hover:text-salon-gold transition-colors">Home</a></li>
              <li className="text-salon-muted/50">/</li>
              <li><a href="/services" className="hover:text-salon-gold transition-colors">Services</a></li>
              <li className="text-salon-muted/50">/</li>
              <li><a href={`/services#${category?.id}`} className="hover:text-salon-gold transition-colors">{category?.name}</a></li>
              <li className="text-salon-muted/50">/</li>
              <li className="text-salon-white font-medium" aria-current="page">{service.name}</li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {service.featured && (
                <div className="absolute top-4 left-4 bg-salon-gold text-salon-primary text-sm font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-salon-gold text-sm font-medium tracking-wider uppercase">
                  {category?.name}
                </span>
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-salon-white mt-2 mb-4">
                  {service.name}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-salon-muted">
                  {service.duration && (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{service.duration}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="prose prose-invert max-w-none text-salon-muted leading-relaxed">
                <p className="text-lg mb-4">{service.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={handleBook}
                  className="flex-1 bg-salon-gold text-salon-primary py-4 px-6 rounded-lg font-medium tracking-wider hover:bg-salon-gold-light transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Book {service.name} via WhatsApp
                </button>
                <a
                  href={generateCallUrl()}
                  className="flex-1 border border-salon-gold text-salon-gold py-4 px-6 rounded-lg font-medium tracking-wider hover:bg-salon-gold hover:text-salon-primary transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call to Book
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-salon-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl text-salon-white mb-6 flex items-center gap-3">
                  <svg className="w-8 h-8 text-salon-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  What to Expect
                </h2>
                <div className="space-y-4 text-salon-muted leading-relaxed">
                  <p>At Hair Edge Unisex Salon, your {service.name.toLowerCase()} experience includes:</p>
                  <ul className="space-y-3 list-disc list-inside">
                    <li><strong>Free Consultation:</strong> Our expert stylist analyzes your hair/skin type and discusses your goals</li>
                    <li><strong>Premium Products:</strong> We use L&apos;Oréal Professionnel, Wella, Schwarzkopf, Olaplex, Kérastase</li>
                    <li><strong>Customized Approach:</strong> Every service tailored to your unique needs and preferences</li>
                    <li><strong>Hygiene First:</strong> Sterilized tools, fresh towels, sanitized stations for each client</li>
                    <li><strong>Aftercare Guidance:</strong> Professional tips to maintain your look at home</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl md:text-3xl text-salon-white mb-6 flex items-center gap-3">
                  <svg className="w-8 h-8 text-salon-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4" id="faq-section">
                  {faqs.map((faq, index) => (
                    <details key={index} className="group bg-salon-surface border border-white/10 rounded-xl p-5">
                      <summary className="flex items-center justify-between cursor-pointer text-salon-white font-medium list-none py-1.5">
                        {faq.q}
                        <svg className="w-5 h-5 text-salon-gold transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="mt-4 text-salon-muted leading-relaxed animate-fade-in-up">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl md:text-3xl text-salon-white mb-6 flex items-center gap-3">
                  <svg className="w-8 h-8 text-salon-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Why Choose Hair Edge Salon Madhapur?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "4.6★ Google rating with 1,150+ reviews",
                    "8+ years of expertise in Madhapur",
                    "Certified stylists with international training",
                    "Premium products: L'Oréal, Wella, Olaplex, Kérastase",
                    "Strict hygiene & sterilization protocols",
                    "Transparent pricing - no hidden charges",
                    "Convenient WhatsApp booking & confirmation",
                    "Located near Hitech City Metro Station",
                    "Ample parking available",
                    "Open daily till 11:30 PM, including weekends",
                  ].map((reason, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-salon-surface border border-white/10 rounded-xl">
                      <div className="w-8 h-8 bg-salon-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-salon-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-salon-white">{reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-salon-surface border border-white/10 rounded-2xl p-6">
                  <h3 className="font-heading text-xl text-salon-white mb-4">Book Your Appointment</h3>
                  <p className="text-salon-muted mb-6">Choose your preferred booking method</p>
                  <div className="space-y-3">
                    <button
                      onClick={handleBook}
                      className="w-full bg-salon-gold text-salon-primary py-3.5 px-4 rounded-lg font-medium tracking-wider hover:bg-salon-gold-light transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Book via WhatsApp
                    </button>
                    <a
                      href={generateCallUrl()}
                      className="w-full border border-salon-gold text-salon-gold py-3.5 px-4 rounded-lg font-medium tracking-wider hover:bg-salon-gold hover:text-salon-primary transition-colors focus-visible:ring-2 focus-visible:ring-salon-gold focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call: {salonConfig.contact.phone.replace(/\+91/, "").replace(/(\d{5})(\d{5})/, "$1 $2")}
                    </a>
                    <a
                      href={generateWhatsAppUrl(`Hello ${salonConfig.business.name}, I want to book ${service.name}. Please confirm availability.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] text-white py-3.5 px-4 rounded-lg font-medium tracking-wider hover:bg-[#20BD5A] transition-colors focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-salon-primary flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Quick WhatsApp Booking
                    </a>
                  </div>
                </div>

                <div className="bg-salon-surface border border-white/10 rounded-2xl p-6">
                  <h3 className="font-heading text-xl text-salon-white mb-4">Visit Us</h3>
                  <address className="not-italic text-salon-muted space-y-3">
                    <p className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-salon-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{salonConfig.address.full}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-salon-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Daily: 8:00 AM - 11:30 PM</span>
                    </p>
                    <a
                      href={salonConfig.google.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-salon-gold hover:text-salon-gold-light transition-colors mt-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      Get Directions on Google Maps
                    </a>
                  </address>
                </div>

                <div className="bg-salon-primary border border-salon-gold/30 rounded-2xl p-6">
                  <h3 className="font-heading text-xl text-salon-white mb-4">Serving Areas</h3>
                  <ul className="space-y-2 text-salon-muted">
                    {["Madhapur", "Hitech City", "Gachibowli", "Kondapur", "Jubilee Hills", "Banjara Hills", "Kukatpally", "Miyapur", "Hyderabad"].map((area) => (
                      <li key={area} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-salon-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={bookingModal}
        onClose={() => setBookingModal(false)}
        preselectedService={service.name}
      />
    </>
  );
}