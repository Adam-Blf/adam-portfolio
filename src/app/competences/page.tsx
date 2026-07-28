"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { skillsData } from "@/data/skillsData";
import { Database, Layout, Server, Cpu, CheckCircle2, Terminal, Code2, ShieldCheck, Zap } from "lucide-react";

export default function CompetencesPage() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Database":
        return <Database className="w-6 h-6 text-[#0A0A0A]" />;
      case "Layout":
        return <Layout className="w-6 h-6 text-[#0A0A0A]" />;
      case "Server":
        return <Server className="w-6 h-6 text-[#0A0A0A]" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-[#0A0A0A]" />;
      default:
        return <Code2 className="w-6 h-6 text-[#0A0A0A]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#0A0A0A]">
      <Navbar />

      <main className="pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="border-b border-[#0A0A0A]/10 pb-12 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E]">
              STACK TECHNIQUE & COMPETENCES - ADAM BELOUCIF
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
            <span className="text-xs font-mono text-[#8E8E8E]">
              EXPERTISES CERTIFIÉES
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#0A0A0A] mb-6">
            Compétences & Stack
          </h1>
          <p className="text-base md:text-lg text-[#0A0A0A]/70 max-w-2xl font-medium leading-relaxed">
            De la manipulation distribuée de données sous Python, Apache Spark et SQL jusqu&apos;à la création d&apos;interfaces WebGL réactives et d&apos;APIs C# .NET 8 / FastAPI d&apos;entreprise.
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className="space-y-16 mb-24">
          {skillsData.map((cat, idx) => (
            <div
              key={idx}
              className="bg-[#F5F3EF] border border-[#0A0A0A]/15 rounded-3xl p-8 md:p-10 shadow-sm hover:border-[#0A0A0A] transition-all"
            >
              <div className="flex items-start gap-4 mb-8 pb-6 border-b border-[#0A0A0A]/10">
                <div className="p-3 bg-[#0A0A0A]/5 rounded-2xl border border-[#0A0A0A]/10">
                  {getIcon(cat.iconName)}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#8E8E8E] uppercase tracking-widest">
                    PÔLE 0{idx + 1}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0A0A0A]">
                    {cat.title}
                  </h2>
                  <p className="text-xs font-mono text-[#0A0A0A]/70 mt-1 font-semibold">
                    {cat.subtitle}
                  </p>
                </div>
              </div>

              {/* Skills Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-[#F5F3EF] border border-[#0A0A0A]/10 rounded-2xl p-5 hover:bg-[#0A0A0A]/5 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-base font-black uppercase tracking-tight text-[#0A0A0A]">
                          {skill.name}
                        </h3>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#0A0A0A] text-[#F5F3EF] uppercase">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-[#0A0A0A]/70 font-medium leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    {skill.featured && (
                      <div className="mt-4 pt-3 border-t border-[#0A0A0A]/5 flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#0A0A0A] uppercase">
                        <Zap className="w-3 h-3 text-[#0A0A0A]" />
                        COMPÉTENCE CLÉ EN PRODUCTION
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Operating Rules & Engineering Principles */}
        <section className="bg-[#0A0A0A] text-[#F5F3EF] rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-5 h-5 text-[#F5F3EF]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E]">
              STANDARDS DE DÉVELOPPEMENT - CLAUDE & GIT
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-[#F5F3EF] mb-8">
            Mes Principes d&apos;Ingénierie
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-mono">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5F3EF] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase text-[#F5F3EF] block mb-1">TypeScript Strict & TDD</span>
                  <p className="text-[#8E8E8E] leading-relaxed">
                    Typage strict systématique sur toute la codebase frontend et backend, tests unitaires xUnit/.NET et PyTest sur la logique métier critique.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5F3EF] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase text-[#F5F3EF] block mb-1">Sécurité Hospitalière HDS & RGPD</span>
                  <p className="text-[#8E8E8E] leading-relaxed">
                    Anonymisation stricte des données patient (k-anonymat k&gt;=5), exécution 100% locale sans fuite cloud pour Sovereign OS DIM.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5F3EF] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase text-[#F5F3EF] block mb-1">Qualité UI/UX & Motion Native</span>
                  <p className="text-[#8E8E8E] leading-relaxed">
                    Design fluide Apple-inspired avec Framer Motion, micro-interactions 60 FPS et respect strict des règles d&apos;accessibilité WCAG.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5F3EF] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase text-[#F5F3EF] block mb-1">Workflow Git Granulaire</span>
                  <p className="text-[#8E8E8E] leading-relaxed">
                    Commits atomiques en anglais impératif (`feat: ...`, `fix: ...`), versionning semver et pipeline CI/CD automatisé sur Vercel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
