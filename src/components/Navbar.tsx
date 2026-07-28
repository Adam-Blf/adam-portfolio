"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";

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
          ? "bg-[#F5F3EF]/90 backdrop-blur-md border-b border-[#0A0A0A]/10 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#0A0A0A] flex items-center justify-center text-[#F5F3EF] font-black text-xs tracking-tighter group-hover:scale-105 transition-transform shadow-md">
            AB
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight uppercase text-[#0A0A0A] leading-none">
              ADAM BELOUCIF
            </span>
            <span className="text-[10px] font-mono text-[#8E8E8E] uppercase tracking-widest leading-tight">
              DATA ENGINEER & FULLSTACK
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link
            href="/"
            className="relative text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors py-1 group"
          >
            ACCUEIL
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0A0A0A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </Link>
          <Link
            href="/projets"
            className="relative text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors py-1 group"
          >
            PROJETS
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0A0A0A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </Link>
          <Link
            href="/parcours"
            className="relative text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors py-1 group"
          >
            PARCOURS
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0A0A0A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </Link>
          <Link
            href="/competences"
            className="relative text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors py-1 group"
          >
            COMPÉTENCES
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0A0A0A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </Link>
          <Link
            href="/cv"
            className="relative text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors py-1 group flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#0A0A0A]" />
            CV
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0A0A0A] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </Link>
        </nav>

        {/* CTA Contact Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/#contact"
            className="group px-6 py-2.5 rounded-full bg-[#0A0A0A] text-[#F5F3EF] text-xs font-bold tracking-widest uppercase hover:bg-[#8E8E8E] transition-all flex items-center gap-2 shadow-md"
          >
            ME CONTACTER
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#0A0A0A] hover:opacity-70 transition-opacity"
          aria-label="Basculer le menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F5F3EF]/95 backdrop-blur-lg flex flex-col items-center justify-center gap-10 lg:hidden">
          <nav className="flex flex-col items-center gap-8">
            <a href="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black uppercase text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors">
              ACCUEIL
            </a>
            <a href="/projets" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black uppercase text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors">
              PROJETS
            </a>
            <a href="/parcours" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black uppercase text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors">
              PARCOURS
            </a>
            <a href="/competences" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black uppercase text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors">
              COMPÉTENCES
            </a>
            <a href="/cv" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black uppercase text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors">
              CV
            </a>
          </nav>

          <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="px-8 py-4 rounded-full bg-[#0A0A0A] text-[#F5F3EF] text-sm font-bold tracking-widest uppercase hover:bg-[#8E8E8E] transition-all">
            ME CONTACTER
          </a>
        </div>
      )}
    </header>
  );
}
