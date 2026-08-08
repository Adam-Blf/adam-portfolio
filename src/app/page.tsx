import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InteractiveDemos from "@/components/InteractiveDemos";
import FeaturedWork from "@/components/FeaturedWork";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F3EF] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-[#F5F3EF] relative">
      <Navbar />
      <Hero />
      {/*
        Deux sections retirees le 2026-08-08 avec leurs composants. La premiere
        affichait dix marques partenaires inventees, la seconde annoncait quatre
        publications qui n'existaient pas. Toutes deux venaient du theme
        commercial d'origine. La preuve sociale se reconstruit avec des chiffres
        verifiables, pas avec des logos empruntes.

        Les chaines exactes ne sont volontairement PAS recopiees ici : la garde
        tools/check_no_fake_content.mjs les interdit dans tout src/, y compris
        dans les commentaires, et une garde qui s'exempte sur le texte qui
        explique le piege devient aveugle exactement la ou il fallait regarder.
      */}
      <InteractiveDemos />
      <FeaturedWork />
      <ExperienceTimeline />
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
