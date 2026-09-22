import { Metadata } from "next";
import { salonConfig } from "@/config/salon.config";
import { generateCallUrl } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Hair Edge Unisex Salon Madhapur, Hyderabad. Learn how we collect, use, and protect your personal information when you book via WhatsApp.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  const lastUpdated = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-salon-primary">
      <Navbar />
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-12 animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl text-salon-white mb-4">Privacy Policy</h1>
            <p className="text-salon-muted">Last updated: {lastUpdated}</p>
          </header>

          <div className="bg-salon-surface border border-white/10 rounded-2xl p-8 md:p-12 space-y-10 animate-fade-in-up delay-100">
            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">1. Information We Collect</h2>
              <p className="text-salon-muted leading-relaxed mb-4">
                We collect minimal personal information when you use our website to book appointments or contact us:
              </p>
              <ul className="space-y-3 text-salon-muted leading-relaxed list-disc list-inside">
                <li>Name and phone number (via booking forms)</li>
                <li>Preferred service, date, and time</li>
                <li>Callback request preference (optional)</li>
                <li>Usage data (pages visited, time spent, referrer) via analytics</li>
              </ul>
              <p className="text-salon-muted leading-relaxed mt-4">
                We do <strong>not</strong> store any personal data on our servers. All booking requests are sent directly to our WhatsApp business account.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">2. How We Use Your Information</h2>
              <ul className="space-y-3 text-salon-muted leading-relaxed list-disc list-inside">
                <li>To process and confirm your booking requests via WhatsApp</li>
                <li>To contact you regarding appointment scheduling</li>
                <li>To improve our website and services (analytics)</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">3. Data Sharing & Third Parties</h2>
              <p className="text-salon-muted leading-relaxed mb-4">
                We share your booking information <strong>only</strong> with:
              </p>
              <ul className="space-y-3 text-salon-muted leading-relaxed list-disc list-inside">
                <li>WhatsApp Business API (Meta Platforms) - for booking communication</li>
                <li>Google Analytics / Plausible - for anonymous website analytics</li>
              </ul>
              <p className="text-salon-muted leading-relaxed mt-4">
                We do not sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">4. Data Retention</h2>
              <p className="text-salon-muted leading-relaxed">
                Booking data sent via WhatsApp is retained by WhatsApp according to their data retention policies. We do not maintain a separate database of customer information on our website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">5. Your Rights</h2>
              <p className="text-salon-muted leading-relaxed mb-4">
                Under applicable data protection laws, you may have the right to:
              </p>
              <ul className="space-y-3 text-salon-muted leading-relaxed list-disc list-inside">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
              </ul>
              <p className="text-salon-muted leading-relaxed mt-4">
                To exercise these rights, contact us at <a href={salonConfig.contact.whatsapp ? `https://wa.me/${salonConfig.contact.whatsapp.replace(/[^0-9]/g, "")}` : "#"} className="text-salon-gold hover:text-salon-gold-light">WhatsApp</a> or call <a href={generateCallUrl()} className="text-salon-gold hover:text-salon-gold-light">{salonConfig.contact.phoneDisplay}</a>.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">6. Cookies & Tracking</h2>
              <p className="text-salon-muted leading-relaxed mb-4">
                Our website uses essential cookies for functionality and optional analytics cookies:
              </p>
              <ul className="space-y-3 text-salon-muted leading-relaxed list-disc list-inside">
                <li><strong>Essential:</strong> Session management, form state</li>
                <li><strong>Analytics:</strong> Google Analytics / Plausible (anonymized IP)</li>
              </ul>
              <p className="text-salon-muted leading-relaxed mt-4">
                You can disable non-essential cookies in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">7. External Links</h2>
              <p className="text-salon-muted leading-relaxed">
                Our website contains links to Google Maps, WhatsApp, and Google Reviews. We are not responsible for the privacy practices of these external services. Please review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">8. Children&apos;s Privacy</h2>
              <p className="text-salon-muted leading-relaxed">
                Our services are not directed to children under 18. We do not knowingly collect personal information from minors without parental consent.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">9. Changes to This Policy</h2>
              <p className="text-salon-muted leading-relaxed">
                We may update this Privacy Policy from time to time. The updated version will be posted on this page with a new &ldquo;Last updated&rdquo; date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-salon-white mb-4">10. Contact Us</h2>
              <p className="text-salon-muted leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please contact us:
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