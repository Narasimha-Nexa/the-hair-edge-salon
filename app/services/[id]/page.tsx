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

  return {
    title: `${service.name} | Hair Edge Unisex Salon Madhapur`,
    description: `${service.description} ${service.duration ? `Duration: ${service.duration}.` : ""} Book appointment via WhatsApp at Hair Edge Salon Madhapur, Hyderabad.`,
    openGraph: {
      title: `${service.name} | Hair Edge Unisex Salon Madhapur`,
      description: service.description,
      images: service.image ? [{ url: service.image, alt: service.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} | Hair Edge Unisex Salon Madhapur`,
      description: service.description,
      images: service.image ? [service.image] : [],
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
    <main className="min-h-screen bg-salon-primary">
      <Navbar />
      <ServiceDetail service={service} category={category} />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}