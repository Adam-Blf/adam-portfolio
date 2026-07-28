"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

// Roles reels, pas des slogans : ce sont les trois casquettes que porte Adam
// aujourd'hui (alternance DIM, 404 Monkey, mastere EFREI).
const phrases: string[] = [
  "Data Engineer",
  "Développeur Fullstack",
  "Fondateur de 404 Monkey",
];

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = phrases[textIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.slice(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.slice(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex]);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-36 pb-12 px-6 md:px-12 overflow-hidden border-b border-[#0A0A0A]/10">
      {/* Background Animated Video Mesh & Halftone Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-[0.85] mix-blend-luminosity filter contrast-125"
        >
          <source
            src="https://cdn.pixabay.com/video/2020/05/25/40149-424075249_large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Halftone Dot Pattern */}
        <div className="absolute inset-0 halftone-overlay opacity-30 mix-blend-multiply" />
        {/* Soft Radial Fade */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#F5F3EF]/60 to-[#F5F3EF]" />
      </div>

      {/* Hero Header Eyebrow */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#0A0A0A]/10 pb-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#0A0A0A]/20 bg-[#F5F3EF]/60 backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#0A0A0A]" />
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#0A0A0A]">
            DISPONIBLE EN ALTERNANCE - SEPT. 2026
          </span>
        </div>
        <div className="text-xs font-mono tracking-wider text-[#8E8E8E] uppercase">
          ÎLE-DE-FRANCE, CHEVILLY-LARUE (94)
        </div>
      </div>

      {/* Hero Center Massive Typography */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 flex flex-col items-center text-center">
        <div className="mb-4">
          <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-[#8E8E8E] block mb-2">
            DATA ENGINEERING, IA APPLIQUÉE & FULLSTACK TYPESCRIPT
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[108px] font-black uppercase tracking-tight leading-[0.95] text-[#0A0A0A] max-w-6xl">
          TRANSFORMER LA DONNÉE
          <br />
          EN{" "}
          <span className="underline decoration-[#0A0A0A]/20 decoration-2 underline-offset-8">
            DÉCISION
          </span>
        </h1>

        {/* Dynamic Typing Effect Row */}
        <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-x-3 min-h-[48px] md:min-h-[72px]">
          <span className="text-xl sm:text-3xl md:text-5xl font-extrabold tracking-widest text-[#8E8E8E] uppercase">
            ADAM BELOUCIF,
          </span>
          <span className="flex items-center">
            <span className="text-xl sm:text-3xl md:text-5xl font-extrabold tracking-widest text-[#0A0A0A] uppercase">
              {currentText}
            </span>
            <span className="w-1 md:w-1.5 h-6 md:h-10 bg-[#0A0A0A] ml-2 animate-pulse" />
          </span>
        </div>

        <p className="mt-8 max-w-2xl text-sm md:text-base text-[#8E8E8E] font-medium leading-relaxed tracking-wide">
          Ingénieur data au DIM du GHT Psy Sud Paris, je conçois les pipelines Oracle
          et PL/SQL, les tableaux de bord PMSI et les modèles prédictifs qui pilotent
          l&apos;activité hospitalière. En parallèle, je construis des produits web et
          mobiles chez 404 Monkey.
        </p>
      </div>

      {/* Hero Bottom Bouncing Chevron */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-center pt-6 border-t border-[#0A0A0A]/10">
        <a
          href="#demos"
          className="group flex flex-col items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#8E8E8E] hover:text-[#0A0A0A] transition-colors"
        >
          <span>DÉCOUVRIR L'UNIVERS</span>
          <div className="w-8 h-8 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center group-hover:border-[#0A0A0A] transition-colors">
            <ChevronDown className="w-4 h-4 text-[#0A0A0A] animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
