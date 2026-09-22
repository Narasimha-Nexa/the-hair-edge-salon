import { Metadata } from "next";
import { salonConfig } from "@/config/salon.config";
import { generateCallUrl } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Hair Edge Unisex Salon Madhapur, Hyderabad. Please read these terms carefully before using our website and booking services.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsOfService() {
  const lastUpdated = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main id="main-content" className="min-h-screen bg-salon-primary">
      <Navbar />
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-12 animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl text-salon-white mb-4">Terms of Service</h1>
            <p className="text-salon-muted">Last updated: {lastUpdated}</p>
          </header>

          <div className="bg-salon-surface border border-white/10 rounded-2xl p-8 md:p-12 space-y-10 animate-fade-in-up delay-100">
            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-salon-muted leading-relaxed">
                By accessing and using the <strong>{salonConfig.business.name}</strong> website (&ldquo;Website&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree with any part of these Terms, please do not use our Website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">2. Booking & Appointments</h2>
              <ul className="space-y-3 text-salon-muted leading-relaxed list-disc list-inside">
                <li>Booking requests submitted via our Website are sent directly to our WhatsApp business account.</li>
                <li>Submitting a booking request does <strong>not</strong> guarantee an appointment. All appointments are confirmed by our salon staff via WhatsApp or phone.</li>
                <li>We will confirm availability for your requested date and time within business hours (8:00 AM – 11:30 PM daily).</li>
                <li>Please provide accurate contact information so we can reach you for confirmation.</li>
                <li>Walk-in customers may be accommodated based on availability, but appointments are recommended.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">3. Payments</h2>
              <ul className="space-y-3 text-salon-muted leading-relaxed list-disc list-inside">
                <li>Cost is confirmed by your stylist before the service begins, based on your specific needs.</li>
                <li>Payment is accepted at the salon via cash, UPI, card, or other methods available at the time of service.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">4. Cancellation & Rescheduling</h2>
              <ul className="space-y-3 text-salon-muted leading-relaxed list-disc list-inside">
                <li>We appreciate at least 2 hours&apos; notice for cancellations or rescheduling.</li>
                <li>Late cancellations or no-shows may affect future booking priority.</li>
                <li>To cancel or reschedule, please reply to the WhatsApp confirmation or call us directly.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">5. Service Quality & Satisfaction</h2>
              <ul className="space-y-3 text-salon-muted leading-relaxed list-disc list-inside">
                <li>Our stylists are certified professionals committed to delivering quality service.</li>
                <li>If you are not satisfied with your service, please inform us within 24 hours so we can address your concerns.</li>
                <li>We use premium professional products (L&apos;Oréal Professionnel, Wella, Schwarzkopf, Olaplex, Kérastase) unless otherwise requested.</li>
                <li>Patch tests for color services are available upon request and recommended for first-time clients.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">6. Health & Safety</h2>
              <ul className="space-y-3 text-salon-muted leading-relaxed list-disc list-inside">
                <li>Please inform us of any allergies, skin sensitivities, or medical conditions before service.</li>
                <li>We maintain strict hygiene standards: sterilized tools, fresh towels, and sanitized stations for each client.</li>
                <li>Pregnant clients should consult their physician before chemical services (color, keratin, rebonding).</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">7. Intellectual Property</h2>
              <p className="text-salon-muted leading-relaxed mb-4">
                All content on this Website (text, images, logos, branding, code) is the property of <strong>{salonConfig.business.name}</strong> or used with permission.
              </p>
              <ul className="space-y-3 text-salon-muted leading-relaxed list-disc list-inside">
                <li>You may not reproduce, distribute, or create derivative works without written permission.</li>
                <li>Service images are for illustrative purposes; actual results may vary.</li>
                <li>Before/after photos are shared with client consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">8. User Conduct</h2>
              <p className="text-salon-muted leading-relaxed">
                You agree not to misuse the Website. Prohibited activities include:
              </p>
              <ul className="space-y-3 text-salon-muted leading-relaxed list-disc list-inside">
                <li>Automated scraping, booking bots, or spam submissions</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Posting false, misleading, or defamatory content</li>
                <li>Using the Website for any unlawful purpose</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-salon-muted leading-relaxed">
                The Website is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, express or implied. We do not warrant that the Website will be uninterrupted, error-free, or free from viruses. Service results vary based on individual hair/skin condition and cannot be guaranteed.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">10. Limitation of Liability</h2>
              <p className="text-salon-muted leading-relaxed">
                To the maximum extent permitted by law, <strong>{salonConfig.business.name}</strong> shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of the Website or services.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">11. Indemnification</h2>
              <p className="text-salon-muted leading-relaxed">
                You agree to indemnify and hold harmless {salonConfig.business.name}, its staff, and affiliates from any claims, damages, or expenses (including legal fees) arising from your use of the Website or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">12. Governing Law & Jurisdiction</h2>
              <p className="text-salon-muted leading-relaxed">
                These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Hyderabad, Telangana.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">13. Changes to Terms</h2>
              <p className="text-salon-muted leading-relaxed">
                We may modify these Terms at any time. Updated Terms will be posted on this page with a new &ldquo;Last updated&rdquo; date. Continued use of the Website constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">14. Contact Information</h2>
              <p className="text-salon-muted leading-relaxed">
                For questions about these Terms, please contact us:
              </p>
              <address className="not-italic text-salon-muted leading-relaxed mt-4 space-y-2">
                <p><strong>{salonConfig.business.name}</strong></p>
                <p>{salonConfig.address.full}</p>
                <p>Phone: <a href={generateCallUrl()} className="text-salon-gold hover:text-salon-gold-light">{salonConfig.contact.phoneDisplay}</a></p>
                <p>WhatsApp: <a href={salonConfig.contact.whatsapp ? `https://wa.me/${salonConfig.contact.whatsapp.replace(/[^0-9]/g, "")}` : "#"} className="text-salon-gold hover:text-salon-gold-light">{salonConfig.contact.whatsappDisplay}</a></p>
              </address>
            </section>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}