"use client";

import { Briefcase, GraduationCap, Award, Shield, Users } from "lucide-react";

interface TimelineItem {
  year: string;
  role: string;
  organization: string;
  type: "EXPERIENCE" | "EDUCATION" | "LEADERSHIP" | "MILITARY";
  description: string;
  tags: string[];
}

const timelineData: TimelineItem[] = [
  {
    year: "2025 — PRESENT",
    role: "INGÉNIEUR PMSI & DATA ENGINEER DIM PSY",
    organization: "Fondation Vallée / GHT Sud Paris",
    type: "EXPERIENCE",
    description:
      "Ingénierie de données hospitalières et PMSI pédopsychiatrique. Développement du moteur Sovereign OS DIM (.NET 8 & Python) pour le parsing, le contrôle de gestion et la conformité des 23 formats ATIH / FICHSUP-PSY.",
    tags: ["Python", ".NET 8", "PMSI / ATIH", "Data Engineering", "Pédopsychiatrie"],
  },
  {
    year: "2025 — 2027",
    role: "MASTÈRE DATA ENGINEERING & IA (M1)",
    organization: "EFREI Paris x Université Paris-Panthéon-Assas",
    type: "EDUCATION",
    description:
      "Formation d'excellence RNCP 40875. Architectures Médaillon, Data Lakes, Hadoop, Spark, Kafka, LLM Fine-Tuning, Agents Autonomes et Préparation Certifications Azure (AZ-900 / AI-900).",
    tags: ["Data Lake", "Spark", "LLM Fine-Tuning", "BigQuery", "Azure"],
  },
  {
    year: "2024 — 2025",
    role: "VICE-PRÉSIDENT BDE ISIT (2 MANDATS)",
    organization: "ISIT Paris",
    type: "LEADERSHIP",
    description:
      "Gestion associative d'envergure. Direction de la communication, du design et des partenariats pour 700 étudiants représentant 40 nationalités et 9 langues de travail.",
    tags: ["Leadership", "Management", "Direction Design", "Communication"],
  },
  {
    year: "2022 — 2025",
    role: "BACHELOR ICT & INTERNATIONAL COMMUNICATION",
    organization: "EFREI Paris x ISIT (Double Diplôme)",
    type: "EDUCATION",
    description:
      "Double compétence ingénierie logicielle et communication multilingue interculturelle. Titre RNCP 35541.",
    tags: ["Fullstack TS", "Python", "UX/UI", "Multilingue FR/EN/ES"],
  },
  {
    year: "2020 — 2021",
    role: "PRÉPARATION MILITAIRE MARINE (PMM KIEFFER)",
    organization: "Marine Nationale",
    type: "MILITARY",
    description:
      "Diplôme militaire mention Assez Bien. Discipline opérationnelle, leadership de crise, esprit de corps et formation maritime.",
    tags: ["Marine Nationale", "Discipline", "Leadership", "Esprit de corps"],
  },
];

export default function ExperienceTimeline() {
  const getTypeIcon = (type: TimelineItem["type"]) => {
    switch (type) {
      case "EXPERIENCE":
        return <Briefcase className="w-4 h-4 text-[#0A0A0A]" />;
      case "EDUCATION":
        return <GraduationCap className="w-4 h-4 text-[#0A0A0A]" />;
      case "LEADERSHIP":
        return <Users className="w-4 h-4 text-[#0A0A0A]" />;
      case "MILITARY":
        return <Shield className="w-4 h-4 text-[#0A0A0A]" />;
    }
  };

  return (
    <section id="timeline" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#0A0A0A]/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-[#0A0A0A]/10 pb-8">
        <div>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#8E8E8E] block mb-2">
            CAREER & FORMATION
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0A0A0A]">
            PARCOURS & ENGAGEMENTS
          </h2>
        </div>
        <p className="max-w-md text-sm text-[#8E8E8E] leading-relaxed font-medium">
          Expérience en Ingénierie PMSI hospitalière, leadership associatif et formation de haut niveau EFREI / Panthéon-Assas.
        </p>
      </div>

      {/* Timeline List */}
      <div className="flex flex-col relative border-l border-[#0A0A0A]/20 ml-4 md:ml-8 pl-6 md:pl-12 gap-12">
        {timelineData.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Node Icon */}
            <div className="absolute -left-[31px] md:-left-[55px] top-0 w-8 h-8 rounded-full bg-[#EAE7E1] border-2 border-[#0A0A0A] flex items-center justify-center shadow-md group-hover:bg-[#0A0A0A] group-hover:text-[#F5F3EF] transition-colors">
              {getTypeIcon(item.type)}
            </div>

            {/* Content Box */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-bold text-[#8E8E8E] bg-[#0A0A0A]/5 px-3 py-1 rounded-full border border-[#0A0A0A]/10">
                  {item.year}
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase bg-[#0A0A0A] text-[#F5F3EF] px-2.5 py-0.5 rounded-full">
                  {item.type}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#0A0A0A] mt-1">
                {item.role}
              </h3>
              <h4 className="text-sm font-bold text-[#8E8E8E] uppercase tracking-wide">
                {item.organization}
              </h4>

              <p className="text-sm text-[#0A0A0A]/80 leading-relaxed font-medium max-w-3xl mt-1">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono text-[#0A0A0A] bg-[#EAE7E1] px-2.5 py-1 rounded-md border border-[#0A0A0A]/10 font-bold"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
