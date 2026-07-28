"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { timelineData } from "@/data/timelineData";
import { Award, Briefcase, GraduationCap, Users, ShieldCheck, Download, Mail, CheckCircle } from "lucide-react";

export default function ParcoursPage() {
  const testimonials = [
    {
      quote: "Adam fait preuve d'une autonomie exceptionnelle, d'une grande rigueur dans le traitement des données de santé complexes et d'une capacité remarquable à transformer des besoins métier en outils décisionnels performants.",
      author: "Tuteur de Stage & Alternance",
      role: "Responsable DIM PSY",
      org: "Fondation Vallée / GHT Sud Paris",
    },
    {
      quote: "Leader naturel au sein de l'école, Adam a su piloter la vie étudiante de 700 élèves avec sang-froid, esprit d'initiative et une excellente vision stratégique.",
      author: "Conseil de Direction",
      role: "Administration BDE ISIT",
      org: "ISIT x Université Panthéon-Assas",
    },
    {
      quote: "Une double compétence rare : une vraie sensibilité UX/UI pour concevoir des produits modernes, doublée d'une maîtrise technique irréprochable sur l'infrastructure.",
      author: "Client & Collaborateur Freelance",
      role: "Fondateur Startup Digital",
      org: "Projets Indépendants",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#0A0A0A]">
      <Navbar />

      <main className="pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="border-b border-[#0A0A0A]/10 pb-12 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E]">
              PARCOURS & EXPÉRIENCE - ADAM BELOUCIF
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
            <span className="text-xs font-mono text-[#8E8E8E]">
              PARIS / CHEVILLY-LARUE (94)
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#0A0A0A] mb-6">
            Mon Parcours & Rôles
          </h1>
          <p className="text-base md:text-lg text-[#0A0A0A]/70 max-w-2xl font-medium leading-relaxed">
            Ingénieur PMSI en pédopsychiatrie, étudiant en Mastère Data Engineering à l&apos;EFREI x Assas, et ancien Vice-Président BDE. Retour sur un parcours alliant rigueur technique, leadership et engagement.
          </p>
        </div>

        {/* Career Timeline Section */}
        <section className="mb-24">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E] mb-12 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#0A0A0A]" />
            CHRONOLOGIE D&apos;INGÉNIERIE & DE FORMATION
          </h2>

          <div className="relative border-l-2 border-[#0A0A0A]/15 ml-4 md:ml-8 pl-6 md:pl-12 space-y-16">
            {timelineData.map((item, index) => (
              <div key={index} className="relative group">
                {/* Timeline Dot Icon */}
                <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-8 h-8 rounded-full bg-[#0A0A0A] text-[#F5F3EF] flex items-center justify-center border-4 border-[#F5F3EF] shadow-md group-hover:scale-110 transition-transform">
                  {item.type === "EXPERTISE PRO" && <Briefcase className="w-3.5 h-3.5" />}
                  {item.type === "FORMATION" && <GraduationCap className="w-3.5 h-3.5" />}
                  {item.type === "LEADERSHIP" && <Users className="w-3.5 h-3.5" />}
                  {item.type === "ENGAGEMENT" && <ShieldCheck className="w-3.5 h-3.5" />}
                </div>

                {/* Card Container */}
                <div className="bg-[#F5F3EF] border border-[#0A0A0A]/15 rounded-3xl p-6 md:p-8 hover:border-[#0A0A0A] hover:shadow-xl transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-[#0A0A0A]/10">
                    <div>
                      <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#0A0A0A] text-[#F5F3EF] uppercase tracking-wider">
                        {item.type}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#0A0A0A] mt-2">
                        {item.role}
                      </h3>
                      <p className="text-xs font-mono font-bold text-[#8E8E8E] uppercase mt-1">
                        {item.organization} - {item.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold tracking-widest text-[#0A0A0A] bg-[#0A0A0A]/5 px-3 py-1.5 rounded-full border border-[#0A0A0A]/10">
                        {item.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-[#0A0A0A]/80 font-medium leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8E8E8E] mb-3">
                      LIVRABLES & RÉALISATIONS :
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {item.deliverables.map((d, i) => (
                        <li key={i} className="text-xs text-[#0A0A0A] font-medium flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#0A0A0A]/5">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono bg-[#0A0A0A]/5 text-[#0A0A0A] px-2.5 py-1 rounded-md border border-[#0A0A0A]/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications & Distinctions */}
        <section className="mb-24 bg-[#0A0A0A] text-[#F5F3EF] rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-5 h-5 text-[#F5F3EF]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E]">
              CERTIFICATIONS & ENGAGEMENTS
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-[#F5F3EF] mb-8">
            Reconnaissance & Diplômes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F5F3EF]/10 border border-[#F5F3EF]/15 rounded-2xl p-6 hover:bg-[#F5F3EF]/15 transition-all">
              <span className="text-[10px] font-mono text-[#8E8E8E] uppercase tracking-widest">MICROSOFT AZURE</span>
              <h3 className="text-lg font-bold uppercase mt-1 mb-2">AZ-900 & AI-900</h3>
              <p className="text-xs text-[#8E8E8E] leading-relaxed">
                Certifications Microsoft Azure Fundamentals & AI Fundamentals en préparation finale pour avril 2026.
              </p>
            </div>

            <div className="bg-[#F5F3EF]/10 border border-[#F5F3EF]/15 rounded-2xl p-6 hover:bg-[#F5F3EF]/15 transition-all">
              <span className="text-[10px] font-mono text-[#8E8E8E] uppercase tracking-widest">MARINE NATIONALE</span>
              <h3 className="text-lg font-bold uppercase mt-1 mb-2">PMM Kieffer (Mention AB)</h3>
              <p className="text-xs text-[#8E8E8E] leading-relaxed">
                Préparation Militaire Marine. Formation aux opérations de défense, secourisme et leadership de crise.
              </p>
            </div>

            <div className="bg-[#F5F3EF]/10 border border-[#F5F3EF]/15 rounded-2xl p-6 hover:bg-[#F5F3EF]/15 transition-all">
              <span className="text-[10px] font-mono text-[#8E8E8E] uppercase tracking-widest">DOUBLE DIPLÔME</span>
              <h3 className="text-lg font-bold uppercase mt-1 mb-2">EFREI x ISIT x Assas</h3>
              <p className="text-xs text-[#8E8E8E] leading-relaxed">
                Bachelor ICT & Mastère Data Engineering sous le grand établissement Université Panthéon-Assas.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E] mb-12">
            RECOMMANDATIONS & RETOURS TERRAIN
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-[#F5F3EF] border border-[#0A0A0A]/15 rounded-3xl p-8 flex flex-col justify-between hover:border-[#0A0A0A] hover:shadow-lg transition-all"
              >
                <p className="text-xs md:text-sm text-[#0A0A0A]/80 italic leading-relaxed mb-6 font-medium">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-[#0A0A0A]/10">
                  <span className="text-sm font-black uppercase text-[#0A0A0A] block">
                    {t.author}
                  </span>
                  <span className="text-xs font-mono text-[#8E8E8E] block mt-0.5">
                    {t.role} - {t.org}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
