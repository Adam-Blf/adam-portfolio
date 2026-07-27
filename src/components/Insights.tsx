"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ArrowUpRight, BookOpen } from "lucide-react";

interface Article {
  id: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
}

const articles: Article[] = [
  {
    id: "art-1",
    category: "RECHERCHE & IA",
    title: "L'ARCHITECTURE DE L'ORCHESTRATION MULTI-AGENTS EN 2026",
    date: "JUILLET 2026",
    readTime: "6 MIN DE LECTURE",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "art-2",
    category: "DESIGN SYSTEMS",
    title: "POURQUOI L'ESTHÉTIQUE ÉDITORIALE MONOCHROME DOMINE LES SAAS HAUT DE GAMME",
    date: "JUIN 2026",
    readTime: "4 MIN DE LECTURE",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "art-3",
    category: "INGÉNIERIE DE DONNÉES",
    title: "VALIDATION DE DONNÉES CLINIQUES ATIH À GRANDE ÉCHELLE (.NET 8 & PYTHON)",
    date: "MAI 2026",
    readTime: "8 MIN DE LECTURE",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "art-4",
    category: "PERFORMANCE WEB",
    title: "OBTENIR DU 60FPS FLUIDE AVEC GSAP SCROLLTRIGGER & LENIS SUR NEXT.JS 15",
    date: "AVRIL 2026",
    readTime: "5 MIN DE LECTURE",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Insights() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Follow Mouse Position with GSAP
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && activeImage) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.35,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [activeImage]);

  return (
    <section id="insights" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#0A0A0A]/10">
      {/* Floating Cursor Image Reveal Thumbnail */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2 ${
          activeImage ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <div className="w-56 h-36 md:w-64 md:h-40 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#F5F3EF] bg-[#0A0A0A]">
          {activeImage && (
            <img
              src={activeImage}
              alt="Article Preview"
              className="w-full h-full object-cover filter contrast-110"
            />
          )}
        </div>
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-[#0A0A0A]/10 pb-8">
        <div>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#8E8E8E] block mb-2">
            05 / PUBLICATIONS & ANALYSES
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0A0A0A]">
            PUBLICATIONS & ARTICLES
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#8E8E8E]">
          <BookOpen className="w-4 h-4" /> 4 ARTICLES PUBLIÉS
        </div>
      </div>

      {/* Table-style Editorial Rows */}
      <div className="flex flex-col divide-y divide-[#0A0A0A]/10 border-t border-b border-[#0A0A0A]/10">
        {articles.map((article) => (
          <div
            key={article.id}
            onMouseEnter={() => setActiveImage(article.image)}
            onMouseLeave={() => setActiveImage(null)}
            className="group py-8 px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer hover:bg-[#EAE7E1]/50 transition-colors duration-300"
          >
            {/* Category & Title */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 max-w-3xl">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#8E8E8E] w-36 shrink-0">
                {article.category}
              </span>
              <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-[#0A0A0A] group-hover:translate-x-2 transition-transform duration-300">
                {article.title}
              </h3>
            </div>

            {/* Date & Action */}
            <div className="flex items-center gap-6 self-end md:self-auto">
              <div className="flex flex-col text-right">
                <span className="text-xs font-mono font-bold text-[#0A0A0A]">
                  {article.date}
                </span>
                <span className="text-[10px] font-mono text-[#8E8E8E]">
                  {article.readTime}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:text-[#F5F3EF] group-hover:border-[#0A0A0A] transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
