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

// Domaines reellement pratiques, adosses a l'alternance DIM, a 404 Monkey et au
// mastere EFREI. Pas de promesse d'agence : ce sont des competences exercees.
const services: Service[] = [
  {
    id: "data-engineering",
    num: "01",
    title: "Data Engineering hospitalier",
    category: "INFOCENTRE & PIPELINES",
    description:
      "Modélisation et développement de la base Oracle de l'infocentre du GHT Psy Sud Paris, pipelines ETL et ELT en SQL et PL/SQL, industrialisation Docker et CI/CD.",
    highlights: [
      "Base Oracle de l'infocentre, performance et optimisation",
      "Pipelines ETL et ELT en SQL et PL/SQL",
      "Monitoring qualité des données et conformité RGPD",
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bi-pmsi",
    num: "02",
    title: "BI et pilotage PMSI",
    category: "ANALYSE & DÉCISIONNEL",
    description:
      "Exploitation des données SIH, DxCare et CPage pour le suivi de l'activité stratégique, médico-économique et de recherche, avec des tableaux de bord utilisés par les directions et les équipes cliniques.",
    highlights: [
      "Tableaux de bord Business Objects, PMSI-Pilot et BIQuery",
      "Rapports d'activité et indicateurs médico-économiques",
      "Études spécifiques à la demande des services cliniques",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ia-appliquee",
    num: "03",
    title: "IA appliquée et modèles prédictifs",
    category: "PYTHON & MACHINE LEARNING",
    description:
      "Modèles Python et machine learning pour anticiper les pics d'admission, détecter les anomalies de données et outiller la décision, du prototype au déploiement.",
    highlights: [
      "Prévision des pics d'admission hospitaliers",
      "Détection d'anomalies et contrôle qualité des données",
      "NLP, RAG et fine-tuning de modèles de langage",
    ],
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "produits-web",
    num: "04",
    title: "Produits web et mobiles",
    category: "FULLSTACK TYPESCRIPT",
    description:
      "Conception et mise en production d'applications Next.js et React Native chez 404 Monkey, de la base de données au déploiement, paiement Stripe inclus.",
    highlights: [
      "Next.js, React Native, TypeScript strict",
      "Supabase, RLS et authentification",
      "Paiement Stripe et facturation en production",
    ],
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
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
            01 / CE QUE JE FAIS
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0A0A0A]">
            MES EXPERTISES
          </h2>
        </div>
        <p className="max-w-md text-sm text-[#8E8E8E] leading-relaxed font-medium">
          Quatre domaines que je pratique au quotidien, entre l&apos;infocentre d&apos;un
          groupement hospitalier public et les produits web que je mets en production.
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
