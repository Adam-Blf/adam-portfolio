export interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  type: "EXPERTISE PRO" | "FORMATION" | "LEADERSHIP" | "ENGAGEMENT";
  description: string;
  deliverables: string[];
  skills: string[];
  link?: string;
}

export const timelineData: TimelineItem[] = [
  {
    period: "SEPT 2025 — PRÉSENT",
    role: "Ingénieur PMSI / Data Engineer DIM PSY",
    organization: "Fondation Vallée / GHT Sud Paris",
    location: "Chevilly-Larue / Paris (94)",
    type: "EXPERTISE PRO",
    description:
      "Ingénierie de données décisionnelles hospitalières et pilotage des flux d'information médicale pour le DIM PSY. Conception et déploiement de Sovereign OS DIM pour le traitement automatisé des formats ATIH.",
    deliverables: [
      "Développement de Sovereign OS DIM (.NET 8 & Python) pour l'analyse sub-seconde des 23 formats ATIH",
      "Calcul des indicateurs d'activité hospitalière en temps réel et fiabilisation des données de cotation",
      "Anonymisation stricte des données de santé (k-anonymat k>=5) et préparation aux audits HDS",
      "Déploiement de PGVPLANING pour l'optimisation des roulements et plannings soignants"
    ],
    skills: ["Python", ".NET 8", "FastAPI", "XGBoost", "ATIH", "PMSI", "PostgreSQL", "Supabase"],
  },
  {
    period: "2025 — 2027",
    role: "Mastère Data Engineering & IA (M1 / M2)",
    organization: "EFREI Paris x Université Panthéon-Assas",
    location: "Villejuif / Paris",
    type: "FORMATION",
    description:
      "Formation d'excellence en ingénierie de données massives, architectures décisionnelles distribuées et intelligence artificielle appliquée. RNCP Niveau 7 (40875).",
    deliverables: [
      "Conception d'une architecture Data Lake Médaillon distribuée (Apache Spark, Kafka, Hive)",
      "Développement d'un assistant médical RAG (Doctis AI) avec embedding vectoriel et LLM",
      "Projet Machine Learning Wine Quality & prédictions de séries temporelles sous XGBoost",
      "Préparation aux certifications Azure AZ-900 & AI-900 (avril 2026)"
    ],
    skills: ["PySpark", "Kafka", "Hadoop", "BigQuery", "SQL", "Scikit-Learn", "RAG", "Azure"],
  },
  {
    period: "FEV 2024 — SEPT 2025",
    role: "Vice-Président BDE ISIT (Deux Mandats)",
    organization: "Bureau des Élèves ISIT — Assas",
    location: "Paris / Villejuif",
    type: "LEADERSHIP",
    description:
      "Direction exécutive du Bureau des Élèves pour une communauté internationale de 700 étudiants représentant 40 nationalités et 9 langues de travail.",
    deliverables: [
      "Gestion d'un budget annuel associatif et négociation de partenariats commerciaux majeurs",
      "Organisation d'événements d'envergure, gala annuel et intégrations d'étudiants internationaux",
      "Supervision des pôles communication, design visuel et logistique terrain",
      "Animation de cours de danse bénévoles hebdomadaires"
    ],
    skills: ["Leadership", "Gestion de projet", "Négociation", "Communication trilingue", "Événementiel"],
  },
  {
    period: "2022 — 2025",
    role: "Bachelor International Communication & Technology",
    organization: "EFREI Paris x ISIT (Double Diplôme)",
    location: "Villejuif / Paris",
    type: "FORMATION",
    description:
      "Parcours bilingue et technologique combinant le développement logiciel, les réseaux, la gestion de données et la communication interculturelle. RNCP Niveau 6 (35541).",
    deliverables: [
      "Création du projet LSF Vision (reconnaissance de la langue des signes par Computer Vision)",
      "Développement de jeux web canvas et PWA interactives (Blackout Apéro, Skyjo, Taskmate)",
      "Maîtrise des standards web moderne (React, Next.js, TypeScript, Tailwind CSS)",
      "Pratique courante des 3 langues (Français natif, Anglais C1, Espagnol C1)"
    ],
    skills: ["React", "TypeScript", "Python", "MediaPipe", "OpenCV", "Tailwind CSS", "UX/UI"],
  },
  {
    period: "2020 — 2021",
    role: "Préparation Militaire Marine (PMM Kieffer)",
    organization: "Marine Nationale",
    location: "France",
    type: "ENGAGEMENT",
    description:
      "Formation militaire, maritime et de défense dispensée par la Marine Nationale. Diplômé avec la mention Assez Bien.",
    deliverables: [
      "Acquisition d'une discipline rigoureuse, du sens de l'engagement et de la cohésion d'équipe",
      "Formation à la sécurité incendie, au secourisme et aux manœuvres de défense maritime",
      "Valeurs de leadership, de sang-froid sous pression et de devoir de réserve"
    ],
    skills: ["Discipline", "Gestion du stress", "Travail en équipe", "Esprit de défense"],
  }
];
