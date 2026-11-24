import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import TopHeader from "@/components/common/TopHeader";
import AboutUs from "@/components/sections/AboutSection";
import Contact from "@/components/sections/ContactSection";
import FAQ from "@/components/sections/FaqSecion";
import Gallery from "@/components/sections/GallerySection";
import HeroSection from "@/components/sections/HeroSection";
import Services from "@/components/sections/ServicesSection";
import Testimonials from "@/components/sections/Testimonials";
import WhatWeDo from "@/components/sections/WhatDoSection";

async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Home() {
  const year = await copyrightYear();
  return (
    <div>

      <TopHeader />

        <Header />

        <main className="[&>section~section]:mt-16 lg:[&>section~section]:mt-18">

          <HeroSection />

          <AboutUs />

          <Services />

          <WhatWeDo />

          <Gallery />

          <Testimonials />

          <FAQ />

          <Contact />

        </main>

        <Footer year={year} />
    </div>
  );
}
