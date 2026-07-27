"use client";

import {
  Cpu,
  Globe,
  Zap,
  Shield,
  Layers,
  Terminal,
  Activity,
  Box,
  Compass,
  Database,
} from "lucide-react";

interface Brand {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const brands: Brand[] = [
  { name: "NEURALDYNAMICS", icon: Cpu },
  { name: "QUANTUM AI", icon: Zap },
  { name: "SYNAPSE CORP", icon: Globe },
  { name: "AEGIS LABS", icon: Shield },
  { name: "HYPERSTACK", icon: Layers },
  { name: "CYBERNEXUS", icon: Terminal },
  { name: "VECTORHUB", icon: Activity },
  { name: "CORTEX AI", icon: Box },
  { name: "DEEPVISION", icon: Compass },
  { name: "DATAGRID", icon: Database },
];

export default function TrustedBrands() {
  return (
    <section className="relative py-12 w-full overflow-hidden bg-[#EAE7E1]/50 border-b border-[#0A0A0A]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-6 flex justify-between items-center">
        <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#8E8E8E]">
          FAIT CONFIANCE PAR DES INNOVATEURS & ENTREPRISES GLOBALES
        </span>
        <span className="text-[11px] font-mono text-[#8E8E8E]">10+ PARTENAIRES INDUSTRIELS</span>
      </div>

      {/* Marquee Wrapper with Gradient Fades */}
      <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-24 before:bg-gradient-to-r before:from-[#EAE7E1] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-24 after:bg-gradient-to-l after:from-[#EAE7E1] after:to-transparent after:z-10">
        <div className="animate-marquee-left pause-hover flex items-center gap-12 sm:gap-16 pr-12 sm:pr-16">
          {/* First Loop */}
          {brands.map((brand, idx) => {
            const IconComponent = brand.icon;
            return (
              <div
                key={`b1-${idx}`}
                className="flex items-center gap-3 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-pointer group"
              >
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#0A0A0A] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs sm:text-sm font-black tracking-[0.2em] text-[#0A0A0A] whitespace-nowrap">
                  {brand.name}
                </span>
              </div>
            );
          })}

          {/* Duplicated Loop for Seamless Continuous Scroll */}
          {brands.map((brand, idx) => {
            const IconComponent = brand.icon;
            return (
              <div
                key={`b2-${idx}`}
                className="flex items-center gap-3 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-pointer group"
              >
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#0A0A0A] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs sm:text-sm font-black tracking-[0.2em] text-[#0A0A0A] whitespace-nowrap">
                  {brand.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
