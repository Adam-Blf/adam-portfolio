"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Sparkles, X, Activity } from "lucide-react";

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  image: string;
  gallery: string[];
  liveUrl?: string;
  githubUrl?: string;
  accent: string;
}

export const projects: Project[] = [
  {
    id: "sovereign-os",
    number: "01",
    title: "SOVEREIGN OS DIM",
    category: "DATA ENGINEERING & HOSPITALIER",
    year: "2026",
    summary: "Moteur PMSI hospitalier d'analyse et de conformité des 23 formats ATIH / FICHSUP-PSY.",
    description:
      "Architecture distribuée .NET 8 et Python pour la Fondation Vallée (GHT Sud Paris). Traitement à très basse latence des données PMSI pédopsychiatriques, anonymisation stricte, calculs d'indicateurs de séjour et validation automatisée des formats ATIH.",
    metrics: [
      { label: "Formats ATIH", value: "23 Formats" },
      { label: "Latence Parsing", value: "< 150ms" },
      { label: "Tests Unitaires", value: "34 Tests OK" },
    ],
    tags: [".NET 8", "Python", "PMSI / ATIH", "FICHSUP-PSY", "xUnit"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
    ],
    githubUrl: "https://github.com/Adam-Blf/sovereign_os_dim",
    accent: "#0A0A0A",
  },
  {
    id: "pgvplaning",
    number: "02",
    title: "PGVPLANING",
    category: "HEALTHCARE ROSTER PWA",
    year: "2026",
    summary: "Plateforme de gestion et planification des plannings soignants en milieu hospitalier.",
    description:
      "Plateforme web réactive construite avec Next.js App Router, Supabase et Firebase. Permet la gestion intelligente des gardes, le respect des contraintes horaires hospitalières, l'export PDF/ICS et la synchronisation en temps réel.",
    metrics: [
      { label: "Synchro Temps Réel", value: "Supabase Realtime" },
      { label: "Déploiement", value: "Vercel PWA" },
      { label: "Disponibilité", value: "99.99%" },
    ],
    tags: ["Next.js 15", "TypeScript", "Supabase", "Firebase", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    ],
    liveUrl: "https://planning.beloucif.com",
    githubUrl: "https://github.com/Adam-Blf/pgvplaning",
    accent: "#0A0A0A",
  },
  {
    id: "blackout-apero",
    number: "03",
    title: "BLACKOUT APÉRO",
    category: "SOCIAL GAMING PWA",
    year: "2026",
    summary: "Application web PWA de jeu d'ambiance festif multijoueur avec défis interactifs.",
    description:
      "Jeu festif PWA haute performance déployé sur blackout.beloucif.com. Génération dynamique de cartes, mécaniques de votes en direct, modes de jeu personnalisés, animations micro-interactives et mode offline PWA.",
    metrics: [
      { label: "Utilisateurs Actifs", value: "1 200+ Actifs" },
      { label: "Mode Hors Ligne", value: "Service Worker" },
      { label: "Score UX", value: "100/100 Lighthouse" },
    ],
    tags: ["Next.js 15", "PWA", "Framer Motion", "Tailwind CSS", "Vercel"],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    ],
    liveUrl: "https://blackout.beloucif.com",
    githubUrl: "https://github.com/Adam-Blf/black-out",
    accent: "#0A0A0A",
  },
  {
    id: "medallion-lake",
    number: "04",
    title: "MÉDAILLON DATA LAKE",
    category: "BIG DATA ENGINE",
    year: "2025",
    summary: "Pipeline de données Big Data Médaillon (Bronze, Silver, Gold) avec Apache Spark & Kafka.",
    description:
      "Projet majeur Master Data Engineering EFREI. Ingestion streaming via Apache Kafka, transformations distribuées Apache Spark, stockage Delta Lake et requêtage analytique BigQuery.",
    metrics: [
      { label: "Volume Streaming", value: "100k msg/sec" },
      { label: "Architecture Data", value: "Bronze → Gold" },
      { label: "Moteur Data", value: "PySpark & Delta" },
    ],
    tags: ["Apache Spark", "Apache Kafka", "Delta Lake", "Python", "BigQuery"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    ],
    githubUrl: "https://github.com/Adam-Blf/projet-dataeng-m1",
    accent: "#0A0A0A",
  },
  {
    id: "sign-language",
    number: "05",
    title: "LANGUE DES SIGNES CV",
    category: "COMPUTER VISION & AI",
    year: "2025",
    summary: "Système de reconnaissance de la langue des signes en temps réel avec MediaPipe (7 langues).",
    description:
      "Modèle de Computer Vision basé sur MediaPipe et Python OpenCV. Tracking des points clés des mains en temps réel, classification par réseau de neurones et support multilingue.",
    metrics: [
      { label: "Précision Modèle", value: "96.8%" },
      { label: "Langues des Signes", value: "7 Langues" },
      { label: "FPS Inférence", value: "60 FPS Temps Réel" },
    ],
    tags: ["Computer Vision", "MediaPipe", "Python", "OpenCV", "TensorFlow"],
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    ],
    githubUrl: "https://github.com/Adam-Blf/Langue-des-signes",
    accent: "#0A0A0A",
  },
  {
    id: "chess-ai",
    number: "06",
    title: "CHESS AI SELF-LEARNING",
    category: "REINFORCEMENT LEARNING",
    year: "2025",
    summary: "Moteur de jeu d'échecs autonome auto-apprenant fonctionnant directement dans le navigateur.",
    description:
      "Algorithme Minimax optimisé avec élagage Alpha-Beta et évaluation positionnelle auto-apprenante. Interface Web canvas interactive.",
    metrics: [
      { label: "Profondeur Minimax", value: "6-8 Plies" },
      { label: "Temps / Coup", value: "< 200ms" },
      { label: "Architecture Execution", value: "Pure JS / WebWorker" },
    ],
    tags: ["JavaScript", "Alpha-Beta", "WebWorkers", "Canvas API"],
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=800&q=80",
    ],
    githubUrl: "https://github.com/Adam-Blf/ChessAI-SelfLearning-Web",
    accent: "#0A0A0A",
  },
];

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
        {projects.map((project) => (
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
                {project.number} // {project.year}
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

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-6 rounded-2xl bg-[#EAE7E1] border border-[#0A0A0A]/10">
                {selectedProject.metrics.map((m, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[10px] font-mono text-[#8E8E8E] uppercase">{m.label}</span>
                    <span className="text-xl md:text-2xl font-black text-[#0A0A0A]">{m.value}</span>
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
