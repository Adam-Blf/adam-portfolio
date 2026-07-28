"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projectsData, Project } from "@/data/projectsData";
import { ArrowUpRight, Github, ExternalLink, Filter, Layers, CheckCircle2, X } from "lucide-react";

export default function ProjetsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("TOUS");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    "TOUS",
    "Data Engineering & Big Data",
    "Data Science & Machine Learning",
    "Hospitalier & Santé",
    "Applications Web & PWA",
    "Utilitaires & Jeux",
  ];

  const filteredProjects =
    selectedCategory === "TOUS"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#0A0A0A]">
      <Navbar />

      <main className="pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="border-b border-[#0A0A0A]/10 pb-12 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8E8E8E]">
              CATALOGUE OFFICIEL - ADAM-BLF
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
            <span className="text-xs font-mono text-[#8E8E8E]">
              {projectsData.length} PROJETS RÉPERTORIÉS
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[#0A0A0A] mb-6">
            Projets & Réalisations
          </h1>
          <p className="text-base md:text-lg text-[#0A0A0A]/70 max-w-2xl font-medium leading-relaxed">
            De la station d&apos;ingénierie hospitalière PMSI aux architectures Data Lake distribuées et aux moteurs d&apos;IA temps réel. Découvrez l&apos;ensemble de mes repos et prototypes de production.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <div className="flex items-center gap-2 mr-2 text-xs font-mono font-bold uppercase text-[#8E8E8E]">
            <Filter className="w-3.5 h-3.5" />
            FILTRER :
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                selectedCategory === cat
                  ? "bg-[#0A0A0A] text-[#F5F3EF] border-[#0A0A0A] shadow-md"
                  : "bg-transparent text-[#0A0A0A] border-[#0A0A0A]/15 hover:border-[#0A0A0A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-[#F5F3EF] border border-[#0A0A0A]/15 rounded-3xl overflow-hidden hover:border-[#0A0A0A] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden bg-[#0A0A0A]/5 border-b border-[#0A0A0A]/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#0A0A0A] text-[#F5F3EF] text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {project.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-[#F5F3EF] text-[#0A0A0A] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-[#0A0A0A]/20">
                    #{project.number}
                  </div>
                </div>

                {/* Project Body */}
                <div className="p-6">
                  <h2 className="text-xl font-black uppercase tracking-tight text-[#0A0A0A] mb-3 group-hover:text-[#8E8E8E] transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-xs text-[#0A0A0A]/70 leading-relaxed font-medium mb-6 line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono bg-[#0A0A0A]/5 text-[#0A0A0A] px-2.5 py-1 rounded-md border border-[#0A0A0A]/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-[#0A0A0A]/5 mt-auto">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A] hover:text-[#8E8E8E] transition-colors flex items-center gap-1"
                >
                  Étude de cas
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-[#0A0A0A]/15 text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F5F3EF] transition-all"
                      title="Voir le dépôt GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-[#0A0A0A]/15 text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F5F3EF] transition-all"
                      title="Ouvrir le site live"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Case Study Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
          <div className="bg-[#F5F3EF] border border-[#0A0A0A] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#0A0A0A]/10 flex items-center justify-between bg-[#F5F3EF] sticky top-0 z-10">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E8E8E]">
                  ÉTUDE DE CAS - {activeModalProject.category}
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-[#0A0A0A]">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-full border border-[#0A0A0A]/20 hover:bg-[#0A0A0A] hover:text-[#F5F3EF] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Scrollable */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="w-full aspect-video object-cover rounded-2xl border border-[#0A0A0A]/15"
              />

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8E8E8E] mb-2">
                  DESCRIPTION DU PROJET
                </h4>
                <p className="text-sm text-[#0A0A0A] leading-relaxed font-medium">
                  {activeModalProject.description}
                </p>
              </div>

              <div className="bg-[#0A0A0A]/5 border border-[#0A0A0A]/10 rounded-2xl p-5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A] mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  IMPACT & PERFORMANCE
                </h4>
                <p className="text-xs font-mono text-[#0A0A0A]/80 font-bold">
                  {activeModalProject.impact}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8E8E8E] mb-3">
                  FONCTIONNALITÉS CLÉS & ARCHITECTURE
                </h4>
                <ul className="space-y-2">
                  {activeModalProject.highlights.map((h, i) => (
                    <li key={i} className="text-xs font-medium text-[#0A0A0A] flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8E8E8E] mb-2">
                  TECHNOLOGIES UTILISÉES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono bg-[#0A0A0A] text-[#F5F3EF] px-3 py-1 rounded-full font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 border-t border-[#0A0A0A]/10 flex items-center justify-end gap-4 bg-[#F5F3EF]">
              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-[#0A0A0A] text-[#0A0A0A] text-xs font-bold uppercase tracking-wider hover:bg-[#0A0A0A] hover:text-[#F5F3EF] transition-all flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  REPO GITHUB
                </a>
              )}
              {activeModalProject.liveUrl && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#0A0A0A] text-[#F5F3EF] text-xs font-bold uppercase tracking-wider hover:bg-[#8E8E8E] transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  VOIR LE SITE LIVE
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
