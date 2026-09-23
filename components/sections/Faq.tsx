import { getSiteFaqs } from "@/lib/faqs";
import { serializeJsonLd } from "@/lib/jsonld";

const siteFaqs = getSiteFaqs();

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: siteFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function Faq() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-salon-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <p className="text-salon-gold tracking-[0.3em] text-sm mb-4">FAQ</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-salon-white mb-4">
            Frequently Asked <span className="text-salon-gold">Questions</span>
          </h2>
          <p className="text-salon-muted text-lg max-w-2xl mx-auto">
            Quick answers about Hair Edge Unisex Salon Madhapur — location, hours, booking, and services.
          </p>
        </div>

        <div className="space-y-4">
          {siteFaqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-salon-primary border border-white/10 rounded-xl p-5 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <summary className="flex items-center justify-between cursor-pointer text-salon-white font-medium list-none py-2.5">
                {faq.q}
                <svg
                  className="w-5 h-5 text-salon-gold transition-transform group-open:rotate-180 shrink-0 ml-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 text-salon-muted leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
