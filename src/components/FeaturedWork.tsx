"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, X, Sparkles, ExternalLink, Calendar, Tag } from "lucide-react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  summary: string;
  fullDescription: string;
  metrics: { label: string; value: string }[];
  image: string;
  gallery: string[];
}

const projects: Project[] = [
  {
    id: "sovereign-os",
    title: "SOVEREIGN OS DIM",
    subtitle: "Enterprise Clinical Data Engine",
    category: "AI & HEALTHCARE",
    year: "2026",
    client: "Fondation Vallée / GHT Sud Paris",
    summary: "High-performance medical billing and coding engine processing 23 ATIH formats with sub-second validation.",
    fullDescription:
      "Sovereign OS DIM revolutionizes hospital information processing by transforming raw PMSI activity streams into actionable analytics. Built with C# .NET 8 and Python, the system validates 23 distinct ATIH formats, automates FICHSUP-PSY reporting, and guarantees zero-latency clinical insights under strict hospital security constraints.",
    metrics: [
      { label: "ATIH Formats", value: "23 Formats" },
      { label: "Processing Speed", value: "< 250ms" },
      { label: "Compliance", value: "100% RGPD" },
    ],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "blackout",
    title: "BLACKOUT APÉRO",
    subtitle: "Interactive Realtime Gaming PWA",
    category: "WEB APPLICATION",
    year: "2026",
    client: "Consumer Digital",
    summary: "Viral multiplayer party game PWA featuring dynamic rules, real-time sync, and fluid micro-animations.",
    fullDescription:
      "Blackout is a modern Progressive Web Application engineered for social gaming. Powered by Next.js 15, Supabase Realtime, and Tailwind CSS, it offers smooth zero-latency turn-based gameplay, offline-first execution, and vibrant Dark Mode aesthetics.",
    metrics: [
      { label: "Active Players", value: "50,000+" },
      { label: "Lighthouse Score", value: "100/100" },
      { label: "Architecture", value: "Serverless PWA" },
    ],
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "pgv-planing",
    title: "PGVPLANING",
    subtitle: "Intelligent Healthcare Roster Engine",
    category: "SaaS PLATFORM",
    year: "2025",
    client: "GHT Sud Paris",
    summary: "Automated medical shift scheduler balancing compliance, staff preferences, and real-time coverage constraints.",
    fullDescription:
      "PGVPlaning automates complex caretaking duty schedules for hospital units. Featuring constraint-satisfaction algorithms, Firebase/Supabase synchronization, and intuitive drag-and-drop calendars, it cuts administrative scheduling overhead by 80%.",
    metrics: [
      { label: "Time Saved", value: "80% Monthly" },
      { label: "Staff Managed", value: "500+ Nurses" },
      { label: "Sync Latency", value: "< 50ms" },
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

export default function FeaturedWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" ref={containerRef} className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#0A0A0A]/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-[#0A0A0A]/10 pb-8">
        <div>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#8E8E8E] block mb-2">
            02 / SELECTED CASE STUDIES
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0A0A0A]">
            FEATURED WORK
          </h2>
        </div>
        <div className="text-xs font-mono tracking-wider text-[#8E8E8E] uppercase">
          PROJECT REPOSITORY [2025-2026]
        </div>
      </div>

      {/* Sticky Stacking Deck of Cards */}
      <div className="relative flex flex-col gap-16 md:gap-24">
        {projects.map((project, index) => {
          return (
            <CardItem
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              scrollYProgress={scrollYProgress}
              onOpenModal={() => setSelectedProject(project)}
            />
          );
        })}
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md flex items-center justify-center p-4 md:p-10 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#F5F3EF] border border-[#0A0A0A]/20 rounded-[2rem] p-6 md:p-12 my-8 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-[#0A0A0A] text-[#F5F3EF] hover:bg-[#8E8E8E] transition-colors"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Metadata */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#0A0A0A] text-[#F5F3EF] text-[10px] font-bold tracking-widest uppercase">
                  {selectedProject.category}
                </span>
                <span className="text-xs font-mono text-[#8E8E8E] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {selectedProject.year}
                </span>
                <span className="text-xs font-mono text-[#8E8E8E] flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> Client: {selectedProject.client}
                </span>
              </div>

              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#0A0A0A] mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-sm md:text-base font-bold tracking-wider text-[#8E8E8E] uppercase mb-6">
                {selectedProject.subtitle}
              </p>

              {/* Full Bleed Image */}
              <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden border border-[#0A0A0A]/10 mb-8">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description & Impact Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                <div className="md:col-span-8">
                  <h4 className="text-xs font-bold tracking-widest text-[#8E8E8E] uppercase mb-2">
                    PROJECT ARCHITECTURE & OVERVIEW
                  </h4>
                  <p className="text-sm md:text-base text-[#0A0A0A]/90 leading-relaxed font-medium">
                    {selectedProject.fullDescription}
                  </p>
                </div>
                <div className="md:col-span-4 flex flex-col gap-4 border-l border-[#0A0A0A]/10 pl-6">
                  <h4 className="text-xs font-bold tracking-widest text-[#8E8E8E] uppercase mb-1">
                    KEY METRICS
                  </h4>
                  {selectedProject.metrics.map((metric, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-2xl font-black text-[#0A0A0A]">{metric.value}</span>
                      <span className="text-xs text-[#8E8E8E] font-medium">{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#0A0A0A]/10">
                {selectedProject.gallery.map((img, idx) => (
                  <div key={idx} className="h-40 rounded-xl overflow-hidden border border-[#0A0A0A]/10">
                    <img src={img} alt="Gallery view" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CardItem({
  project,
  index,
  total,
  scrollYProgress,
  onOpenModal,
}: {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: any;
  onOpenModal: () => void;
}) {
  const targetScale = 1 - (total - index - 1) * 0.04;
  const scale = useTransform(scrollYProgress, [index / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-28 w-full flex justify-center">
      <motion.div
        style={{ scale }}
        className="w-full rounded-[2.5rem] bg-[#EAE7E1] border border-[#0A0A0A]/15 p-6 md:p-12 shadow-xl overflow-hidden transition-all duration-300"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full border border-[#0A0A0A] text-[10px] font-bold tracking-widest uppercase text-[#0A0A0A]">
                  {project.category}
                </span>
                <span className="text-xs font-mono font-bold text-[#8E8E8E]">
                  {project.year}
                </span>
              </div>

              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#0A0A0A] mb-2">
                {project.title}
              </h3>
              <p className="text-xs md:text-sm font-bold tracking-wider text-[#8E8E8E] uppercase mb-6">
                {project.subtitle}
              </p>
              <p className="text-sm md:text-base text-[#0A0A0A]/80 font-medium leading-relaxed mb-8">
                {project.summary}
              </p>
            </div>

            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#0A0A0A] text-[#F5F3EF] text-xs font-bold tracking-widest uppercase hover:bg-[#8E8E8E] transition-all duration-300 w-fit group"
            >
              VIEW CASE STUDY
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Right Full Bleed Card Image (7 cols) */}
          <div className="lg:col-span-7 relative h-72 md:h-[420px] rounded-2xl overflow-hidden border border-[#0A0A0A]/10 group cursor-pointer" onClick={onOpenModal}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-[#0A0A0A]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-5 py-2.5 rounded-full bg-[#F5F3EF] text-[#0A0A0A] text-xs font-bold tracking-widest uppercase shadow-lg">
                EXPLORE CASE
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
