"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileCode2,
  Calendar,
  Sparkles,
  Zap,
  Users,
  Utensils,
  Dices,
} from "lucide-react";

// --- DEMO 1: BLACKOUT PARTY GAME ---
const blackoutCards = [
  { id: 1, title: "DÉFI NEURAL OU VÉRITÉ", text: "Pointez la personne la plus susceptible de pusher en prod sans tester. Prenez 2 gorgées si on vous pointe !", category: "CHALLENGE" },
  { id: 2, title: "VITESSE SYNAPTIQUE", text: "Citez 3 algorithmes de Machine Learning en 5 secondes. En cas d'échec, buvez 3 gorgées !", category: "VITESSE" },
  { id: 3, title: "CHASSE AUX BUGS", text: "La dernière personne à se toucher le nez doit raconter une anecdote embarrassante sur son code ou son travail !", category: "RÉFLEXE" },
  { id: 4, title: "VOTE DE L'AGENT", text: "Tout le monde vote : Qui est la personne la plus ordonnée du groupe ? Le gagnant crée une nouvelle règle !", category: "VOTE" },
  { id: 5, title: "BINÔME QUANTIQUE", text: "Choisissez un binôme. À chaque fois que vous buvez durant les 3 prochains tours, votre binôme doit boire aussi !", category: "BINÔME" },
];

function BlackoutDemo() {
  const [cardIndex, setCardIndex] = useState(0);
  const [score, setScore] = useState(0);

  const drawCard = () => {
    setCardIndex((prev) => (prev + 1) % blackoutCards.length);
    setScore((prev) => prev + 1);
  };

  const currentCard = blackoutCards[cardIndex];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-black uppercase tracking-tight text-[#0A0A0A]">
            SIMULATEUR BLACKOUT APÉRO
          </h4>
          <p className="text-xs text-[#8E8E8E] font-medium">
            Moteur interactif de jeu d'ambiance en direct (Disponible sur blackout.beloucif.com)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-[#0A0A0A] bg-[#0A0A0A]/5 px-3 py-1 rounded-full border border-[#0A0A0A]/10">
            CARTES TIRÉES : {score}
          </span>
          <a
            href="https://blackout.beloucif.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#0A0A0A] underline hover:text-[#8E8E8E]"
          >
            Lancer l'Application PWA ↗
          </a>
        </div>
      </div>

      {/* Card Arena */}
      <div className="relative h-64 md:h-72 w-full rounded-2xl bg-[#0A0A0A] text-[#F5F3EF] p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl border border-[#0A0A0A]/20">
        <div className="flex justify-between items-center z-10">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-[#F5F3EF]/10 px-3 py-1 rounded-full text-[#F5F3EF]">
            {currentCard.category}
          </span>
          <span className="text-xs font-mono text-[#8E8E8E]">CARTE N°{currentCard.id} / 5</span>
        </div>

        <div className="z-10 my-auto">
          <h5 className="text-xl md:text-2xl font-black uppercase text-[#F5F3EF] mb-2">
            {currentCard.title}
          </h5>
          <p className="text-sm md:text-base text-[#F5F3EF]/90 font-medium leading-relaxed">
            "{currentCard.text}"
          </p>
        </div>

        <div className="flex justify-between items-center z-10 pt-4 border-t border-[#F5F3EF]/10">
          <span className="text-xs text-[#8E8E8E] font-mono">STATUT : SESSION DE JEU ACTIVE</span>
          <button
            onClick={drawCard}
            className="px-6 py-2.5 rounded-full bg-[#F5F3EF] text-[#0A0A0A] text-xs font-black tracking-widest uppercase hover:bg-[#EAE7E1] transition-all flex items-center gap-2 shadow-md hover:scale-105"
          >
            <Dices className="w-4 h-4" /> TIRER UNE NOUVELLE CARTE
          </button>
        </div>
      </div>
    </div>
  );
}

// --- DEMO 2: SOVEREIGN OS DIM ATIH VALIDATOR ---
const sampleAtihSnippets = [
  {
    name: "Échantillon RPSA (Pédopsychiatrie)",
    code: "RPSA;750100012;2026;001294;F;20120415;20260301;F90.0;Z65.8;12;OK",
    status: "VALIDE",
    format: "ATIH RPSA v2026",
    errors: 0,
    fichsup: "FICHSUP-PSY Conforme",
  },
  {
    name: "Échantillon RPSB (Hospitalisation de jour)",
    code: "RPSB;750100012;2026;008471;M;20150920;20260302;F84.0;;01;ERR_MISSING_DIAG",
    status: "INVALIDE",
    format: "ATIH RPSB v2026",
    errors: 1,
    fichsup: "Diagnostic associé manquant",
  },
];

function SovereignValidatorDemo() {
  const [selectedSnippet, setSelectedSnippet] = useState(sampleAtihSnippets[0]);
  const [customInput, setCustomInput] = useState(sampleAtihSnippets[0].code);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(sampleAtihSnippets[0]);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      const isErr = customInput.includes("ERR") || customInput.length < 20;
      setResult({
        name: "Charge Personnalisée",
        code: customInput,
        status: isErr ? "INVALIDE" : "VALIDE",
        format: "ATIH Standard Parser v2026",
        errors: isErr ? 2 : 0,
        fichsup: isErr ? "Erreur de syntaxe colonne 8" : "Conformité FICHSUP-PSY Vérifiée",
      });
    }, 400);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-black uppercase tracking-tight text-[#0A0A0A]">
            SOVEREIGN OS DIM — VALIDATEUR CLINIQUE ATIH
          </h4>
          <p className="text-xs text-[#8E8E8E] font-medium">
            Moteur de données PMSI &lt; 250ms (Architecture .NET 8 & Python au GHT Sud Paris)
          </p>
        </div>
        <div className="flex items-center gap-2">
          {sampleAtihSnippets.map((snippet, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedSnippet(snippet);
                setCustomInput(snippet.code);
                setResult(snippet);
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono border ${
                selectedSnippet.name === snippet.name
                  ? "bg-[#0A0A0A] text-[#F5F3EF] border-[#0A0A0A]"
                  : "bg-transparent text-[#0A0A0A] border-[#0A0A0A]/20"
              }`}
            >
              Exemple {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 flex flex-col gap-3">
          <label className="text-xs font-mono font-bold text-[#8E8E8E] uppercase">
            DONNÉES BRUTES ATIH / PMSI
          </label>
          <textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            rows={4}
            className="w-full p-4 rounded-xl font-mono text-xs bg-[#0A0A0A] text-[#F5F3EF] border border-[#0A0A0A]/20 focus:outline-none focus:border-[#0A0A0A]"
          />
          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="px-6 py-3 rounded-full bg-[#0A0A0A] text-[#F5F3EF] text-xs font-bold tracking-widest uppercase hover:bg-[#8E8E8E] transition-all flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <Zap className="w-4 h-4 animate-spin text-[#F5F3EF]" />
            ) : (
              <FileCode2 className="w-4 h-4 text-[#F5F3EF]" />
            )}
            {isAnalyzing ? "ANALYSE ATIH EN COURS..." : "LANCER LE MOTEUR DE VALIDATION"}
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 rounded-xl bg-[#EAE7E1] border border-[#0A0A0A]/15 p-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#8E8E8E] uppercase block mb-3">
              RAPPORT DE VALIDATION
            </span>
            <div className="flex items-center gap-3 mb-4">
              {result.status === "VALIDE" ? (
                <div className="px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 text-xs font-black flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> FORMAT ATIH VALIDE
                </div>
              ) : (
                <div className="px-3 py-1 rounded-full bg-[#E11D48]/10 text-[#E11D48] border border-[#E11D48]/30 text-xs font-black flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> ERREUR DE FORMAT
                </div>
              )}
              <span className="text-xs font-mono text-[#0A0A0A] font-bold">
                {result.format}
              </span>
            </div>

            <div className="flex flex-col gap-2 text-xs font-medium text-[#0A0A0A]">
              <div className="flex justify-between border-b border-[#0A0A0A]/10 pb-1.5">
                <span className="text-[#8E8E8E]">Latence de Parsing :</span>
                <span className="font-mono font-bold">&lt; 145ms</span>
              </div>
              <div className="flex justify-between border-b border-[#0A0A0A]/10 pb-1.5">
                <span className="text-[#8E8E8E]">Nombre d'Erreurs :</span>
                <span className="font-mono font-bold">{result.errors} Anom.</span>
              </div>
              <div className="flex justify-between pb-1.5">
                <span className="text-[#8E8E8E]">Diagnostic FICHSUP :</span>
                <span className="font-mono font-bold">{result.fichsup}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#8E8E8E] font-mono mt-4 pt-3 border-t border-[#0A0A0A]/10">
            Validé selon le référentiel officiel ATIH 2026 Pédopsychiatrie.
          </p>
        </div>
      </div>
    </div>
  );
}

// --- DEMO 3: PGVPLANING SHIFT SCHEDULER ---
const initialNurses = [
  { name: "Infirmière Sarah M.", shift: "MATIN", unit: "Pédopsychiatrie A" },
  { name: "Infirmier Thomas L.", shift: "SOIR", unit: "Hospitalisation Jour" },
  { name: "Infirmière Julie B.", shift: "NUIT", unit: "Urgences PSY" },
  { name: "Infirmier Marc K.", shift: "REPOS", unit: "Consultations Externe" },
];

function PGVPlaningDemo() {
  const [nurses, setNurses] = useState(initialNurses);

  const toggleShift = (index: number) => {
    const shifts = ["MATIN", "SOIR", "NUIT", "REPOS"];
    setNurses((prev) =>
      prev.map((n, i) => {
        if (i === index) {
          const nextShift = shifts[(shifts.indexOf(n.shift) + 1) % shifts.length];
          return { ...n, shift: nextShift };
        }
        return n;
      })
    );
  };

  const getShiftBadgeClass = (shift: string) => {
    switch (shift) {
      case "MATIN":
        return "bg-[#0A0A0A] text-[#F5F3EF]";
      case "SOIR":
        return "bg-[#8E8E8E] text-[#F5F3EF]";
      case "NUIT":
        return "bg-[#0A0A0A]/80 text-[#F5F3EF]";
      default:
        return "bg-[#0A0A0A]/10 text-[#0A0A0A]";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-black uppercase tracking-tight text-[#0A0A0A]">
            PGVPLANING — PLANIFICATEUR DE SOINS HOSPITALIERS
          </h4>
          <p className="text-xs text-[#8E8E8E] font-medium">
            Planificateur intelligent des gardes (En direct sur planning.beloucif.com)
          </p>
        </div>
        <a
          href="https://planning.beloucif.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-[#0A0A0A] underline hover:text-[#8E8E8E]"
        >
          Accéder à l'App ↗
        </a>
      </div>

      <div className="rounded-2xl bg-[#EAE7E1] border border-[#0A0A0A]/15 p-6 divide-y divide-[#0A0A0A]/10">
        {nurses.map((nurse, idx) => (
          <div key={idx} className="py-3 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-[#0A0A0A] block">{nurse.name}</span>
              <span className="text-xs text-[#8E8E8E] font-medium">{nurse.unit}</span>
            </div>
            <button
              onClick={() => toggleShift(idx)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all shadow-xs ${getShiftBadgeClass(
                nurse.shift
              )}`}
            >
              {nurse.shift} (CHANGER)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- DEMO 4: FRIDGE AI RECIPE PREDICTOR ---
const availableIngredients = ["Œufs", "Saumon", "Avocat", "Tomates", "Riz", "Fromage", "Épinards"];

function RecipeAIDemo() {
  const [selected, setSelected] = useState<string[]>(["Œufs", "Avocat"]);
  const [recipe, setRecipe] = useState("Bol Avocat-Œuf Poché & Tomates Cerises");

  const toggleIngredient = (item: string) => {
    const updated = selected.includes(item)
      ? selected.filter((i) => i !== item)
      : [...selected, item];
    setSelected(updated);

    if (updated.includes("Saumon")) {
      setRecipe("Pavé de Saumon poêlé sur lit de Riz & Salade d'Avocat");
    } else if (updated.includes("Fromage")) {
      setRecipe("Omelette Fondante au Fromage & Tomates Fraîches");
    } else {
      setRecipe("Bol Avocat-Œuf Poché & Tomates Cerises");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-xl font-black uppercase tracking-tight text-[#0A0A0A]">
          RECIPE RECO FRIGO — PRÉDICTIONS D'INGRÉDIENTS IA
        </h4>
        <p className="text-xs text-[#8E8E8E] font-medium">
          Moteur de recommandation de recettes par LSTM & NLP Sentence-Transformers
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {availableIngredients.map((item) => {
          const isSel = selected.includes(item);
          return (
            <button
              key={item}
              onClick={() => toggleIngredient(item)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                isSel
                  ? "bg-[#0A0A0A] text-[#F5F3EF]"
                  : "bg-[#EAE7E1] text-[#0A0A0A] border border-[#0A0A0A]/10 hover:border-[#0A0A0A]"
              }`}
            >
              {isSel ? "✓ " : "+ "} {item}
            </button>
          );
        })}
      </div>

      <div className="p-6 rounded-2xl bg-[#0A0A0A] text-[#F5F3EF] flex flex-col gap-2">
        <span className="text-[10px] font-mono font-bold text-[#8E8E8E] uppercase">
          RECOMMANDATION IA (CONFIANCE 98.4%)
        </span>
        <h5 className="text-lg font-black text-[#F5F3EF]">{recipe}</h5>
        <p className="text-xs text-[#8E8E8E]">
          Ingrédients Sélectionnés : {selected.join(", ") || "Aucun"}
        </p>
      </div>
    </div>
  );
}

export default function InteractiveDemos() {
  const [activeTab, setActiveTab] = useState<"blackout" | "sovereign" | "pgv" | "recipe">("blackout");

  return (
    <section id="demos" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#0A0A0A]/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-[#0A0A0A]/10 pb-8">
        <div>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#8E8E8E] block mb-2">
            LABORATOIRE INTERACTIF // DÉMOS EN DIRECT
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0A0A0A]">
            TESTEZ NOS PROJETS EN DIRECT
          </h2>
        </div>
        <p className="max-w-md text-sm text-[#8E8E8E] leading-relaxed font-medium">
          Interagissez directement avec des simulateurs fonctionnels de nos applications déployées, au cœur de votre navigateur.
        </p>
      </div>

      {/* Tabs Header */}
      <div className="flex flex-wrap gap-3 mb-10 pb-4 border-b border-[#0A0A0A]/10">
        <button
          onClick={() => setActiveTab("blackout")}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === "blackout"
              ? "bg-[#0A0A0A] text-[#F5F3EF]"
              : "bg-[#EAE7E1] text-[#0A0A0A] hover:bg-[#0A0A0A]/10"
          }`}
        >
          🎮 JEU BLACKOUT
        </button>
        <button
          onClick={() => setActiveTab("sovereign")}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === "sovereign"
              ? "bg-[#0A0A0A] text-[#F5F3EF]"
              : "bg-[#EAE7E1] text-[#0A0A0A] hover:bg-[#0A0A0A]/10"
          }`}
        >
          🏥 VALIDATEUR ATIH
        </button>
        <button
          onClick={() => setActiveTab("pgv")}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === "pgv"
              ? "bg-[#0A0A0A] text-[#F5F3EF]"
              : "bg-[#EAE7E1] text-[#0A0A0A] hover:bg-[#0A0A0A]/10"
          }`}
        >
          📅 PLANNING PGV
        </button>
        <button
          onClick={() => setActiveTab("recipe")}
          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === "recipe"
              ? "bg-[#0A0A0A] text-[#F5F3EF]"
              : "bg-[#EAE7E1] text-[#0A0A0A] hover:bg-[#0A0A0A]/10"
          }`}
        >
          🍳 RECETTES FRIGO IA
        </button>
      </div>

      {/* Active Tab Panel */}
      <div className="p-6 md:p-10 rounded-[2.5rem] bg-[#F5F3EF] border border-[#0A0A0A]/15 shadow-xl">
        {activeTab === "blackout" && <BlackoutDemo />}
        {activeTab === "sovereign" && <SovereignValidatorDemo />}
        {activeTab === "pgv" && <PGVPlaningDemo />}
        {activeTab === "recipe" && <RecipeAIDemo />}
      </div>
    </section>
  );
}
