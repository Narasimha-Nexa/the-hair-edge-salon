import { salonConfig } from "@/config/salon.config";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  if (!salonConfig.features.about) return null;

  return (
    <section id="about" className="py-20 md:py-28 bg-salon-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Hair Edge Unisex Salon Madhapur"
          subtitle={
            salonConfig.business.description ||
            "Certified stylists, premium products and strict hygiene in Madhapur, Hyderabad."
          }
        />

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-salon-muted leading-relaxed mb-4">
            Located opposite Hitech Theater Lane in Madhapur, Hair Edge serves clients from Hitech
            City, Gachibowli, Kondapur and across Hyderabad. We combine international training with
            everyday reliability — sterilised tools, transparent pricing, and WhatsApp booking that
            confirms your slot before you leave home.
          </p>
          <p className="text-salon-muted leading-relaxed mb-8">
            Open daily {salonConfig.hoursSpec.opensLabel} – {salonConfig.hoursSpec.closesLabel}.
            Rated <span className="text-salon-gold font-medium">4.6★</span> on Google by 1,100+
            clients.{" "}
            <a href="/about" className="text-salon-gold hover:text-salon-gold-light underline underline-offset-4">
              Learn more about us
            </a>
            .
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6">
              <div className="w-12 h-12 border border-salon-gold flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-salon-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-salon-white mb-2">
                Premium Quality
              </h3>
              <p className="text-salon-muted text-sm">
                Professional services using premium products
              </p>
            </div>

            <div className="p-6">
              <div className="w-12 h-12 border border-salon-gold flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-salon-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-salon-white mb-2">
                Expert Stylists
              </h3>
              <p className="text-salon-muted text-sm">
                Skilled professionals dedicated to your look
              </p>
            </div>

            <div className="p-6">
              <div className="w-12 h-12 border border-salon-gold flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-salon-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-salon-white mb-2">
                Client Satisfaction
              </h3>
              <p className="text-salon-muted text-sm">
                Your satisfaction is our top priority
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
