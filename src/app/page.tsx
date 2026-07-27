import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import InteractiveDemos from "@/components/InteractiveDemos";
import FeaturedWork from "@/components/FeaturedWork";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Services from "@/components/Services";
import About from "@/components/About";
import Insights from "@/components/Insights";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F3EF] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-[#F5F3EF] relative">
      <Navbar />
      <Hero />
      <TrustedBrands />
      <InteractiveDemos />
      <FeaturedWork />
      <ExperienceTimeline />
      <Services />
      <About />
      <Insights />
      <Contact />
      <Footer />
    </main>
  );
}
