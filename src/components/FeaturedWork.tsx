"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, X, Activity, CheckCircle2 } from "lucide-react";
import { projectsData, Project } from "@/data/projectsData";

const featuredProjects = projectsData.filter((project) => project.featured);

export default function FeaturedWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="work" ref={containerRef} className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#0A0A0A]/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6 border-b border-[#0A0A0A]/10 pb-8">
        <div>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#8E8E8E] block mb-2">
            02 / PROJETS SÉLECTIONNÉS
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0A0A0A]">
            PROJETS RELEVANTS & CASE STUDIES
          </h2>
        </div>
        <p className="max-w-md text-sm text-[#8E8E8E] leading-relaxed font-medium">
          Découvrez nos réalisations phares en Data Engineering, IA Médicale, Applications PWA et Computer Vision.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {featuredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group cursor-pointer rounded-[2.5rem] bg-[#EAE7E1] border border-[#0A0A0A]/10 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
          >
            {/* Project Image */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden bg-[#0A0A0A]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[#0A0A0A]/80 backdrop-blur-md text-[#F5F3EF] text-xs font-mono font-bold">
                PROJET N{"°"}{project.number}
              </div>
              {project.liveUrl && (
                <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-[#10B981] text-[#F5F3EF] text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Activity className="w-3 h-3" /> EN DIRECT
                </div>
              )}
            </div>

            {/* Info Container */}
            <div className="p-8 flex flex-col justify-between flex-1">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8E8E8E] block mb-2">
                  {project.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0A0A0A] group-hover:translate-x-1 transition-transform">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-[#0A0A0A]/80 font-medium leading-relaxed mt-3">
                  {project.summary}
                </p>
              </div>

              {/* Tags & Action */}
              <div className="mt-8 pt-6 border-t border-[#0A0A0A]/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-[#0A0A0A] bg-[#F5F3EF] px-2.5 py-1 rounded-md border border-[#0A0A0A]/10 font-bold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="w-10 h-10 rounded-full border border-[#0A0A0A]/20 flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:text-[#F5F3EF] transition-all">
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F5F3EF] text-[#0A0A0A] rounded-[2.5rem] p-6 md:p-12 shadow-2xl border border-[#0A0A0A]/20"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-[#0A0A0A] text-[#F5F3EF] hover:bg-[#8E8E8E] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono font-bold text-[#8E8E8E] uppercase tracking-widest block mb-2">
                ÉTUDE DE CAS DU PROJET // {selectedProject.number}
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#0A0A0A] mb-4">
                {selectedProject.title}
              </h2>
              <p className="text-sm md:text-base font-medium text-[#0A0A0A]/90 leading-relaxed mb-8">
                {selectedProject.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 p-6 rounded-2xl bg-[#EAE7E1] border border-[#0A0A0A]/10">
                {selectedProject.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-[#0A0A0A]">{h}</span>
                  </div>
                ))}
              </div>

              {/* External Action Links */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-[#0A0A0A]/10">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-[#0A0A0A] text-[#F5F3EF] text-xs font-bold tracking-widest uppercase hover:bg-[#8E8E8E] transition-all flex items-center gap-2"
                  >
                    ACCÉDER AU SITE EN DIRECT <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-[#EAE7E1] text-[#0A0A0A] text-xs font-bold tracking-widest uppercase border border-[#0A0A0A]/20 hover:bg-[#0A0A0A] hover:text-[#F5F3EF] transition-all flex items-center gap-2"
                  >
                    VOIR CODE REPO GITHUB <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
