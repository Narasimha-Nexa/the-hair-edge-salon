import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Team from "@/components/sections/Team";
import Transformations from "@/components/sections/Transformations";
import Brands from "@/components/sections/Brands";
import Menu from "@/components/sections/Menu";
import Reviews from "@/components/sections/Reviews";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main id="main-content">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Team />
      <Transformations />
      <Brands />
      <Menu />
      <Reviews />
      <Faq />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}