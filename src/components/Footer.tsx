"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] text-[#8E8E8E] pt-16 pb-12 px-6 md:px-12 border-t border-[#F5F3EF]/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[#F5F3EF]/10">
        {/* Col 1: Brand & Tagline */}
        <div className="flex flex-col gap-4">
          <span className="text-xl font-black tracking-[0.2em] uppercase text-[#F5F3EF]">
            PIXZEN
          </span>
          <p className="text-xs text-[#8E8E8E] leading-relaxed max-w-xs font-medium">
            Elite futuristic AI agency & studio engineering next-generation autonomous systems and luxury digital experiences.
          </p>
        </div>

        {/* Col 2: Navigation Directory */}
        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#F5F3EF] mb-1">
            DIRECTORY
          </span>
          <a href="#expertise" className="text-xs hover:text-[#F5F3EF] transition-colors">
            01 / Expertise
          </a>
          <a href="#work" className="text-xs hover:text-[#F5F3EF] transition-colors">
            02 / Selected Work
          </a>
          <a href="#about" className="text-xs hover:text-[#F5F3EF] transition-colors">
            03 / Manifesto
          </a>
          <a href="#insights" className="text-xs hover:text-[#F5F3EF] transition-colors">
            04 / Insights
          </a>
        </div>

        {/* Col 3: Social & Network */}
        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#F5F3EF] mb-1">
            NETWORK
          </span>
          <a
            href="https://github.com/Adam-Blf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:text-[#F5F3EF] transition-colors"
          >
            GitHub (@Adam-Blf)
          </a>
          <a
            href="https://www.linkedin.com/in/adambeloucif/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:text-[#F5F3EF] transition-colors"
          >
            LinkedIn (Adam Beloucif)
          </a>
          <a
            href="https://adam.beloucif.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:text-[#F5F3EF] transition-colors"
          >
            adam.beloucif.com
          </a>
        </div>

        {/* Col 4: Studio Locations */}
        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#F5F3EF] mb-1">
            STUDIOS
          </span>
          <p className="text-xs leading-relaxed">
            TOKYO · Minato-ku, Roppongi 6-10-1
          </p>
          <p className="text-xs leading-relaxed">
            LONDON · Shoreditch High St 142
          </p>
          <p className="text-xs leading-relaxed">
            PARIS / CHEVILLY · GHT Sud Paris
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <span>© {new Date().getFullYear()} PIXZEN AI AGENCY. ALL RIGHTS RESERVED.</span>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs text-[#F5F3EF] hover:text-[#8E8E8E] transition-colors group cursor-pointer"
        >
          BACK TO TOP
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
