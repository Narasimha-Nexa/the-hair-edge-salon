import { Metadata } from "next";
import { notFound } from "next/navigation";
import { salonConfig } from "@/config/salon.config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import ServiceDetail from "@/components/sections/ServiceDetail";

interface ServicePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const serviceId = resolvedParams.id;
  
  const service = salonConfig.categories
    .flatMap((cat) => cat.services)
    .find((s) => s.id === serviceId);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const category = salonConfig.categories.find((cat) =>
    cat.services.some((s) => s.id === serviceId)
  );

  const pagePath = `/services/${serviceId}`;

  return {
    title: `${service.name} in Madhapur, Hyderabad`,
    description: `${service.description}${service.duration ? ` Duration: ${service.duration}.` : ""} Book ${service.name} at Hair Edge Unisex Salon, Madhapur, Hyderabad - 4.6★ rated, open daily till 11:30 PM. Instant confirmation via WhatsApp.`,
    alternates: { canonical: pagePath },
    openGraph: {
      title: `${service.name} in Madhapur, Hyderabad | ${salonConfig.business.name}`,
      description: service.description,
      url: pagePath,
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${service.name} at ${salonConfig.business.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} in Madhapur, Hyderabad`,
      description: service.description,
      images: ["/images/og-image.jpg"],
    },
    other: {
      "geo.region": "IN-TG",
      "geo.placename": "Madhapur, Hyderabad",
    },
  };
}

export async function generateStaticParams() {
  const serviceIds = salonConfig.categories.flatMap((cat) => cat.services.map((s) => s.id));
  return serviceIds.map((id) => ({ id }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  const serviceId = resolvedParams.id;

  const service = salonConfig.categories
    .flatMap((cat) => cat.services)
    .find((s) => s.id === serviceId);

  if (!service) {
    notFound();
  }

  const category = salonConfig.categories.find((cat) =>
    cat.services.some((s) => s.id === serviceId)
  );

  return (
    <main id="main-content" className="min-h-screen bg-salon-primary pt-16 md:pt-20">
      <Navbar />
      <ServiceDetail service={service} category={category} />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}