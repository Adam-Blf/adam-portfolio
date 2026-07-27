"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const manifestoText =
  "L'INTELLIGENCE ARTIFICIELLE N'EST PAS SEULEMENT UN OUTIL, C'EST UN CHANGEMENT DE PARADIGME ARCHITECTURAL. NOUS CONCEVONS DES AGENTS AUTONOMES D'EXCELLENCE, DES PIPELINES NEURAUX À HAUTE PERFORMANCE ET DES EXPÉRIENCES NUMÉRIQUES MONOCHROMES HAUT DE GAMME QUI REDÉFINISENT LES STANDARDS.";

const marqueeItems = [
  "INTELLIGENCE ARTIFICIELLE",
  "STRATÉGIE & ARCHITECTURE",
  "INGÉNIERIE DATA & IA",
  "AGENTS AUTONOMES",
  "RÉSEAUX DE NEURONES",
  "DÉVELOPPEMENT FULLSTACK",
  "DATA LAKES MÉDAILLON",
];

export default function About() {
  const manifestoRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!manifestoRef.current) return;

    const words = manifestoRef.current.querySelectorAll(".manifesto-word");

    gsap.fromTo(
      words,
      { opacity: 0.15, color: "#8E8E8E" },
      {
        opacity: 1,
        color: "#0A0A0A",
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: "top 75%",
          end: "bottom 35%",
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const wordsArray = manifestoText.split(" ");

  return (
    <section id="about" className="relative py-28 w-full border-b border-[#0A0A0A]/10 bg-[#F5F3EF]">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="w-4 h-4 text-[#0A0A0A]" />
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#8E8E8E]">
            04 / MANIFESTE & VISION
          </span>
        </div>

        {/* Scroll Reveal Word-by-Word Manifesto Text */}
        <p
          ref={manifestoRef}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.15] max-w-5xl"
        >
          {wordsArray.map((word, idx) => (
            <span key={idx} className="manifesto-word inline-block mr-3 transition-colors">
              {word}
            </span>
          ))}
        </p>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-[#0A0A0A]/10">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold text-[#8E8E8E]">01 // OBJECTIF</span>
            <h4 className="text-lg font-black uppercase text-[#0A0A0A]">PRÉCISION DE L'INGÉNIERIE</h4>
            <p className="text-xs md:text-sm text-[#8E8E8E] leading-relaxed font-medium">
              Temps de réponse sub-seconde, sécurité de typage strict et maîtrise de la dette technique.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold text-[#8E8E8E]">02 // ESTHÉTIQUE</span>
            <h4 className="text-lg font-black uppercase text-[#0A0A0A]">LUXE MONOCHROME</h4>
            <p className="text-xs md:text-sm text-[#8E8E8E] leading-relaxed font-medium">
              Typographie à fort contraste, micro-interactions tactiles et style éditorial intemporel.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold text-[#8E8E8E]">03 // FIABILITÉ</span>
            <h4 className="text-lg font-black uppercase text-[#0A0A0A]">SCALABILITÉ AUTONOME</h4>
            <p className="text-xs md:text-sm text-[#8E8E8E] leading-relaxed font-medium">
              Systèmes multi-agents conçus pour opérer en totale autonomie à grande échelle.
            </p>
          </div>
        </div>
      </div>

      {/* Pure CSS Infinite Marquee Below */}
      <div className="relative py-8 bg-[#0A0A0A] text-[#F5F3EF] overflow-hidden">
        <div className="animate-marquee-left flex items-center gap-12 whitespace-nowrap">
          {/* Loop 1 */}
          {marqueeItems.map((item, idx) => (
            <div key={`m1-${idx}`} className="flex items-center gap-12">
              <span className="text-2xl md:text-4xl font-black tracking-widest uppercase">
                {item}
              </span>
              <span className="w-3 h-3 rounded-full bg-[#F5F3EF]/40" />
            </div>
          ))}
          {/* Loop 2 */}
          {marqueeItems.map((item, idx) => (
            <div key={`m2-${idx}`} className="flex items-center gap-12">
              <span className="text-2xl md:text-4xl font-black tracking-widest uppercase">
                {item}
              </span>
              <span className="w-3 h-3 rounded-full bg-[#F5F3EF]/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
