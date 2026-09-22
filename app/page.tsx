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
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

export default function Home() {
  return (
    <main>
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
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}