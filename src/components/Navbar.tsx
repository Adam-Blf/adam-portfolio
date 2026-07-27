"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F5F3EF]/85 backdrop-blur-md border-b border-[#0A0A0A]/10 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="group flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter uppercase text-[#0A0A0A] group-hover:opacity-80 transition-opacity">
            PIXZEN
          </span>
          <span className="w-2 h-2 rounded-full bg-[#0A0A0A] group-hover:scale-125 transition-transform" />
          <span className="hidden sm:inline-block text-[10px] font-mono text-[#8E8E8E] uppercase tracking-widest ml-1 border-l border-[#0A0A0A]/15 pl-2">
            STUDIO & PORTFOLIO IA
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="#demos"
            className="relative text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors py-1 group"
          >
            LAB DEMOS
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0A0A0A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>
          <a
            href="#work"
            className="relative text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors py-1 group"
          >
            PROJETS
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0A0A0A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>
          <a
            href="#timeline"
            className="relative text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors py-1 group"
          >
            PARCOURS
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0A0A0A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>
          <a
            href="#services"
            className="relative text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors py-1 group"
          >
            EXPERTISES
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0A0A0A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>
          <a
            href="#about"
            className="relative text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors py-1 group"
          >
            À PROPOS
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0A0A0A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </a>
        </nav>

        {/* CTA Contact Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#contact"
            className="group px-6 py-2.5 rounded-full bg-[#0A0A0A] text-[#F5F3EF] text-xs font-bold tracking-widest uppercase hover:bg-[#8E8E8E] transition-all flex items-center gap-2 shadow-md"
          >
            START A PROJECT
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#0A0A0A] hover:opacity-70 transition-opacity"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Modal */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[70px] bg-[#F5F3EF] z-40 p-8 flex flex-col justify-between border-t border-[#0A0A0A]/10">
          <nav className="flex flex-col gap-6">
            <a
              href="#demos"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black uppercase text-[#0A0A0A]"
            >
              01. LAB DEMOS LIVE
            </a>
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black uppercase text-[#0A0A0A]"
            >
              02. PROJETS & CASE STUDIES
            </a>
            <a
              href="#timeline"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black uppercase text-[#0A0A0A]"
            >
              03. PARCOURS & EXPÉRIENCE
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black uppercase text-[#0A0A0A]"
            >
              04. EXPERTISES TECH
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black uppercase text-[#0A0A0A]"
            >
              05. À PROPOS & VISION
            </a>
          </nav>

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-4 rounded-full bg-[#0A0A0A] text-[#F5F3EF] text-sm font-bold tracking-widest uppercase"
          >
            START A PROJECT NOW
          </a>
        </div>
      )}
    </header>
  );
}
