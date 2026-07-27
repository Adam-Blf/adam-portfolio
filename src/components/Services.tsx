"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface Service {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  image: string;
}

const services: Service[] = [
  {
    id: "ai-agents",
    num: "01",
    title: "Agents IA Autonomes",
    category: "ARCHITECTURE SYSTÈME",
    description:
      "Conception de frameworks multi-agents auto-réparateurs, de pipelines LLM sur-mesure et de flux de travail cognitifs conçus pour l'automatisation d'entreprise.",
    highlights: [
      "Orchestration d'Essaims Multi-Agents",
      "RAG & Graphes de Connaissances Vectoriels",
      "Pipelines d'Inférence Inférieurs à 100ms",
    ],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "brand-strategy",
    num: "02",
    title: "Stratégie de Marque Futuriste",
    category: "IDENTITÉ & DESIGN",
    description:
      "Création de langages visuels monochromes à haut contraste, de systèmes typographiques et d'identités imposant une présence absolue sur le marché.",
    highlights: [
      "Systèmes de Design Éditoriaux",
      "Actifs de Marque Génératifs IA",
      "Chartes Mouvement & Directives Visuelles",
    ],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "web-experience",
    num: "03",
    title: "Apps Web Haute Performance",
    category: "INGÉNIERIE FRONTEND",
    description:
      "Développement d'applications Next.js 15 d'une fluidité parfaite avec animations GSAP ScrollTrigger, graphiques WebGL et défilement fluide Lenis à 100/100 Lighthouse.",
    highlights: [
      "Next.js 15 App Router & Server Actions",
      "Canvas Interactif GSAP & WebGL",
      "Accessibilité & Conformité WCAG AA",
    ],
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "data-engineering",
    num: "04",
    title: "Pipelines Data Prédictifs",
    category: "DATA ENGINEERING",
    description:
      "Construction de Data Lakes Médaillon résilients, d'architectures de streaming en temps réel et de modèles de machine learning prédictifs.",
    highlights: [
      "ETL Batch Apache Spark & Polars",
      "Lakehouses Snowflake & BigQuery",
      "MLOps & Surveillance des Modèles",
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState<Service>(services[0]);

  return (
    <section id="expertise" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#0A0A0A]/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-[#0A0A0A]/10 pb-8">
        <div>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#8E8E8E] block mb-2">
            01 / NOS CAPACITÉS
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0A0A0A]">
            NOS EXPERTISES
          </h2>
        </div>
        <p className="max-w-md text-sm text-[#8E8E8E] leading-relaxed font-medium">
          Nous combinons l'intelligence artificielle de pointe avec une esthétique éditoriale de luxe pour créer des produits transformateurs.
        </p>
      </div>

      {/* 12-Column Grid Layout (5/7 Split) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Interactive Services List (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col divide-y divide-[#0A0A0A]/10">
          {services.map((service) => {
            const isSelected = activeService.id === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveService(service)}
                onClick={() => setActiveService(service)}
                className={`py-8 cursor-pointer group transition-all duration-300 ${
                  isSelected ? "pl-4 border-l-2 border-[#0A0A0A]" : "hover:pl-2"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#8E8E8E]">
                    {service.num}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#8E8E8E] px-2 py-0.5 rounded-full border border-[#0A0A0A]/10">
                    {service.category}
                  </span>
                </div>
                <h3
                  className={`text-xl md:text-2xl font-black uppercase tracking-tight transition-colors duration-200 flex items-center justify-between ${
                    isSelected ? "text-[#0A0A0A]" : "text-[#0A0A0A]/60 group-hover:text-[#0A0A0A]"
                  }`}
                >
                  {service.title}
                  <ArrowRight
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isSelected
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                    }`}
                  />
                </h3>
              </div>
            );
          })}
        </div>

        {/* Right Column: Sticky Media & Content Reveal (7 Columns) */}
        <div className="lg:col-span-7 sticky top-28">
          <div className="relative rounded-[2rem] overflow-hidden border border-[#0A0A0A]/15 bg-[#EAE7E1] p-6 md:p-8 shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col gap-6"
              >
                {/* Media Image Container */}
                <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden border border-[#0A0A0A]/10">
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover filter contrast-105 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#0A0A0A]/80 backdrop-blur-md text-[#F5F3EF] px-3 py-1 rounded-full text-xs font-mono font-bold">
                    {activeService.num} / 04
                  </div>
                </div>

                {/* Service Details */}
                <div>
                  <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0A0A0A] mb-3">
                    {activeService.title}
                  </h4>
                  <p className="text-sm md:text-base text-[#0A0A0A]/80 leading-relaxed font-medium mb-6">
                    {activeService.description}
                  </p>

                  {/* Feature Highlights List */}
                  <div className="flex flex-col gap-2.5 pt-4 border-t border-[#0A0A0A]/10">
                    <span className="text-[11px] font-bold tracking-widest text-[#8E8E8E] uppercase mb-1">
                      LIVRABLES & CAPACITÉS CLÉS
                    </span>
                    {activeService.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs md:text-sm font-bold text-[#0A0A0A]">
                        <CheckCircle2 className="w-4 h-4 text-[#0A0A0A]" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
