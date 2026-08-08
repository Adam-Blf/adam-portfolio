"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Printer, Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink } from "lucide-react";

export default function CvPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#0A0A0A]">
      {/* Hide Navbar on print */}
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="pt-32 print:pt-0 pb-24 print:pb-0 px-4 md:px-12 max-w-5xl mx-auto">
        {/* Printable Control Actions Bar */}
        <div className="print:hidden border-b border-[#0A0A0A]/10 pb-8 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E]">
              FORMAT SYNTHÉTIQUE RECRUTEUR - ADAM BELOUCIF
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tight text-[#0A0A0A] mt-1">
              Curriculum Vitae Officiel
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-full bg-[#0A0A0A] text-[#F5F3EF] text-xs font-bold uppercase tracking-wider hover:bg-[#8E8E8E] transition-all flex items-center gap-2 shadow-md"
            >
              <Printer className="w-4 h-4" />
              IMPRIMER / ENREGISTRER EN PDF
            </button>
          </div>
        </div>

        {/* CV Document Paper Container */}
        <div className="bg-[#F5F3EF] print:bg-white border border-[#0A0A0A]/20 print:border-none rounded-3xl print:rounded-none p-8 md:p-12 shadow-xl print:shadow-none space-y-10">
          {/* Header Identity */}
          <div className="border-b-2 border-[#0A0A0A] pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#8E8E8E] block mb-2">
                DATA ENGINEER & DÉVELOPPEUR FULLSTACK
              </span>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#0A0A0A]">
                ADAM BELOUCIF
              </h1>
              <p className="text-xs font-mono text-[#0A0A0A]/80 mt-2 max-w-xl font-bold">
                Je construis des systèmes data qui transforment les chiffres en décisions, et des interfaces qu&apos;on a envie d&apos;ouvrir.
              </p>
            </div>

            {/* Direct Contact List */}
            <div className="text-xs font-mono space-y-1.5 text-[#0A0A0A]/90 shrink-0">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <a href="mailto:adam.beloucif@efrei.net" className="hover:underline">
                  adam.beloucif@efrei.net
                </a>
              </div>
              {/*
                L'adresse employeur (psysudparis.fr) a ete retiree le 2026-08-08.
                Une boite professionnelle d'etablissement public n'a pas a etre
                publiee sur un site personnel : elle expose l'employeur au spam et
                melange correspondance de service et candidature personnelle.
                Le contact public est l'adresse academique.
              */}
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                <span>+33 7 86 46 68 34</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Paris / Chevilly-Larue (94)</span>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5" />
                <a href="https://github.com/Adam-Blf" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  github.com/Adam-Blf
                </a>
              </div>
            </div>
          </div>

          {/* Section: Expériences Professionnelles */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#0A0A0A] bg-[#0A0A0A]/5 px-3 py-1.5 inline-block mb-6 border border-[#0A0A0A]/10 rounded-md">
              01 / EXPÉRIENCE PROFESSIONNELLE
            </h2>

            <div className="space-y-6">
              <div className="border-l-2 border-[#0A0A0A] pl-4">
                <div className="flex justify-between items-baseline flex-wrap gap-2">
                  <h3 className="text-base font-bold uppercase text-[#0A0A0A]">
                    Ingénieur PMSI / Data Engineer DIM PSY
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#8E8E8E]">SEPT 2025 - PRÉSENT</span>
                </div>
                <p className="text-xs font-mono text-[#8E8E8E] font-bold">
                  Fondation Vallée / GHT Sud Paris - Chevilly-Larue (94)
                </p>
                <ul className="mt-3 text-xs text-[#0A0A0A]/80 space-y-1.5 list-disc list-inside">
                  <li>Conception & déploiement de <strong>Sovereign OS DIM</strong> (.NET 8 & Python) pour le parsing sub-seconde de 23 formats ATIH.</li>
                  <li>Fiabilisation du contrôle de gestion hospitalier et prédictions XGBoost sur les anomalies de cotation.</li>
                  <li>Gestion de la conformité RGPD & HDS avec anonymisation stricte des données de santé (k-anonymat k&gt;=5).</li>
                  <li>Développement de la plateforme PWA <strong>PGVPLANING</strong> pour la gestion des roulements soignants.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section: Formation & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#0A0A0A] bg-[#0A0A0A]/5 px-3 py-1.5 inline-block mb-6 border border-[#0A0A0A]/10 rounded-md">
                02 / DIPLÔMES & FORMATIONS
              </h2>
              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-bold text-[#0A0A0A] block uppercase">
                    Mastère Data Engineering & IA (M1 / M2)
                  </span>
                  <span className="font-mono text-[#8E8E8E] block">
                    EFREI Paris x Université Panthéon-Assas - 2025 - 2027
                  </span>
                  <p className="text-[#0A0A0A]/70 mt-1">
                    Architectures Data Lake Médaillon (Spark, Kafka, Hive), RAG & LLMs. RNCP 40875.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-[#0A0A0A] block uppercase">
                    Bachelor International Communication & Tech
                  </span>
                  <span className="font-mono text-[#8E8E8E] block">
                    EFREI Paris x ISIT (Double Diplôme) - 2022 - 2025
                  </span>
                  <p className="text-[#0A0A0A]/70 mt-1">
                    Développement web fullstack, Computer Vision, réseaux. RNCP 35541.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#0A0A0A] bg-[#0A0A0A]/5 px-3 py-1.5 inline-block mb-6 border border-[#0A0A0A]/10 rounded-md">
                03 / CERTIFICATIONS & MILITAIRE
              </h2>
              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-bold text-[#0A0A0A] block uppercase">
                    Microsoft Azure AZ-900 & AI-900
                  </span>
                  <span className="font-mono text-[#8E8E8E] block">
                    Certifications officielles en préparation (Avril 2026)
                  </span>
                </div>
                <div>
                  <span className="font-bold text-[#0A0A0A] block uppercase">
                    Préparation Militaire Marine (PMM Kieffer)
                  </span>
                  <span className="font-mono text-[#8E8E8E] block">
                    Marine Nationale - Diplôme Mention Assez Bien (2020 - 2021)
                  </span>
                </div>
                <div>
                  <span className="font-bold text-[#0A0A0A] block uppercase">
                    Vice-Président BDE ISIT (2 Mandats)
                  </span>
                  <span className="font-mono text-[#8E8E8E] block">
                    Direction associative de 700 étudiants, 40 nationalités, 9 langues
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Compétences Clés & Langues */}
          <div className="border-t border-[#0A0A0A]/10 pt-8">
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#0A0A0A] bg-[#0A0A0A]/5 px-3 py-1.5 inline-block mb-6 border border-[#0A0A0A]/10 rounded-md">
              04 / COMPÉTENCES TECH & LANGUES
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div>
                <span className="font-mono font-bold text-[#8E8E8E] uppercase block mb-2">DATA & IA</span>
                <p className="text-[#0A0A0A] leading-relaxed">
                  Python, PySpark, Kafka, Hadoop, Hive, BigQuery, PostgreSQL, Supabase, MediaPipe, OpenCV, Scikit-learn, XGBoost, RAG.
                </p>
              </div>

              <div>
                <span className="font-mono font-bold text-[#8E8E8E] uppercase block mb-2">FULLSTACK & DEV</span>
                <p className="text-[#0A0A0A] leading-relaxed">
                  Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion, C# .NET 8, FastAPI, Docker, Vercel, pywebview.
                </p>
              </div>

              <div>
                <span className="font-mono font-bold text-[#8E8E8E] uppercase block mb-2">LANGUES PARLÉES</span>
                <ul className="space-y-1 text-[#0A0A0A]">
                  <li><strong>Français :</strong> Langue maternelle</li>
                  <li><strong>Anglais :</strong> C1 Full Professional</li>
                  <li><strong>Espagnol :</strong> C1 Full Professional</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
