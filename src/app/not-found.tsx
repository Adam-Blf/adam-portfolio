import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page introuvable - Adam Beloucif",
  description: "Cette page n'existe pas ou a été déplacée.",
  robots: { index: false, follow: true },
};

// Raccourcis proposes plutot qu'un cul-de-sac : un visiteur perdu est le plus
// souvent un recruteur, on le remet sur les pages qui comptent.
const shortcuts = [
  { href: "/projets", label: "Projets", hint: "Ce que j'ai construit et mis en production" },
  { href: "/parcours", label: "Parcours", hint: "Expériences, formation et engagements" },
  { href: "/competences", label: "Compétences", hint: "Stack technique détaillée" },
  { href: "/cv", label: "CV", hint: "Format synthétique recruteur" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F5F3EF] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-[#F5F3EF] relative flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center px-6 md:px-12 pt-36 pb-24">
        <div className="max-w-7xl mx-auto w-full">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#8E8E8E] block mb-6">
            ERREUR 404
          </span>

          <h1 className="text-[22vw] sm:text-[18vw] md:text-[15vw] font-black uppercase tracking-tighter leading-[0.8] text-[#0A0A0A]">
            404
          </h1>

          <div className="mt-10 pt-10 border-t border-[#0A0A0A]/10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight">
                Cette page n&apos;existe pas.
              </h2>
              <p className="mt-4 text-sm md:text-base text-[#8E8E8E] font-medium leading-relaxed max-w-md">
                Le lien est peut-être obsolète, ou la page a été déplacée lors d&apos;une
                refonte. Rien de grave, voici où aller.
              </p>

              <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#0A0A0A] text-[#F5F3EF] text-xs font-black tracking-[0.2em] uppercase hover:bg-[#8E8E8E] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                RETOUR À L&apos;ACCUEIL
              </Link>
            </div>

            <nav className="lg:col-span-7 lg:col-start-6" aria-label="Raccourcis">
              <ul className="border-t border-[#0A0A0A]/10">
                {shortcuts.map((item) => (
                  <li key={item.href} className="border-b border-[#0A0A0A]/10">
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between gap-6 py-6 min-h-[44px]"
                    >
                      <span className="flex flex-col gap-1">
                        <span className="text-lg md:text-2xl font-black uppercase tracking-tight text-[#0A0A0A] group-hover:text-[#8E8E8E] transition-colors">
                          {item.label}
                        </span>
                        <span className="text-xs text-[#8E8E8E] font-medium">
                          {item.hint}
                        </span>
                      </span>
                      <ArrowUpRight className="w-5 h-5 shrink-0 text-[#8E8E8E] group-hover:text-[#0A0A0A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
