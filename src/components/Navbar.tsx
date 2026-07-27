"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "EXPERTISE", href: "#expertise" },
  { label: "WORK", href: "#work" },
  { label: "MANIFESTO", href: "#about" },
  { label: "INSIGHTS", href: "#insights" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-md bg-[#F5F3EF]/80 border-b border-[#0A0A0A]/10 py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-xl md:text-2xl font-black tracking-[0.2em] uppercase text-[#0A0A0A] group flex items-center gap-1"
          >
            PIXZEN
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] group-hover:scale-150 transition-transform duration-300" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative text-xs font-bold tracking-widest text-[#0A0A0A]/80 hover:text-[#0A0A0A] py-1 transition-colors duration-200"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0A0A0A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </nav>

          {/* Action & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0A0A0A] text-xs font-bold tracking-widest text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F5F3EF] transition-all duration-300 shadow-xs"
            >
              LET'S TALK
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full border border-[#0A0A0A]/20 text-[#0A0A0A] hover:bg-[#0A0A0A]/5 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 bg-[#F5F3EF] flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                  className="text-3xl font-black tracking-widest text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="pt-8 border-t border-[#0A0A0A]/10 flex flex-col gap-4">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-4 rounded-full bg-[#0A0A0A] text-[#F5F3EF] text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2"
              >
                LET'S TALK
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-[#8E8E8E] text-center tracking-wider">
                hello@pixzen.ai — Tokyo · London · New York
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
