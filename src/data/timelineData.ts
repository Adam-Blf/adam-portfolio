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

// Source de verite : profil LinkedIn d'Adam (linkedin.com/in/adambeloucif),
// section Experience. Toute modification ici doit rester alignee sur le profil
// public, un ecart entre le portfolio et LinkedIn se voit en entretien.
export const timelineData: TimelineItem[] = [
  {
    period: "SEPT. 2025 - AUJOURD'HUI",
    role: "Ingénieur PMSI / Data Engineer",
    organization: "Groupe Hospitalier Fondation Vallée - Paul Guiraud",
    location: "Villejuif (94), alternance",
    type: "EXPERTISE PRO",
    description:
      "Ingénieur data au DIM du GHT Psy Sud Paris, spécialisé en psychiatrie et pédopsychiatrie. Transformation des données hospitalières brutes en analyses décisionnelles actionnables pour les directions et les services cliniques.",
    deliverables: [
      "Exploitation des données SIH, DxCare et CPage pour le suivi de l'activité stratégique, médico-économique et de recherche",
      "Conception et maintenance de tableaux de bord interactifs et de rapports d'activité (Business Objects, PMSI-Pilot, BIQuery)",
      "Modélisation et développement de la base Oracle de l'infocentre, performance et optimisation",
      "API PHP pour l'interopérabilité sécurisée entre systèmes hospitaliers (DxCare, CPage)",
      "Pipelines ETL et ELT en SQL et PL/SQL, industrialisation Docker et CI/CD",
      "Modèles prédictifs Python pour anticiper les pics d'admission, monitoring qualité des données et conformité RGPD",
    ],
    skills: [
      "PHP",
      "Oracle",
      "SQL / PL-SQL",
      "Python",
      "Docker",
      "Git",
      "Business Objects",
      "PMSI-Pilot",
      "BIQuery",
    ],
  },
  {
    period: "JANV. 2025 - AUJOURD'HUI",
    role: "Fondateur & PDG",
    organization: "404 Monkey",
    location: "Indépendant, à distance",
    type: "EXPERTISE PRO",
    description:
      "Agence spécialisée dans le développement d'applications événementielles, les systèmes de facturation et les solutions numériques sur mesure.",
    deliverables: [
      "Développement d'applications web et mobiles pour l'événementiel",
      "Conception de systèmes de facturation et d'outils de gestion financière",
      "Production digitale : sites vitrines, plateformes de gestion, solutions sur mesure",
      "Produit phare : facturation.beloucif.com, plateforme de gestion financière pour freelances et associations loi 1901",
    ],
    skills: ["Next.js", "React Native", "TypeScript", "Supabase", "Stripe"],
    link: "https://facturation.beloucif.com",
  },
  {
    period: "2025 - 2027",
    role: "Mastère Data Engineering & IA (M1 / M2)",
    organization: "EFREI Paris x Université Paris-Panthéon-Assas",
    location: "Villejuif (94)",
    type: "FORMATION",
    description:
      "Formation en ingénierie de données massives, architectures décisionnelles distribuées et intelligence artificielle appliquée. Titre RNCP niveau 7 (40875).",
    deliverables: [
      "Conception d'une architecture Data Lake en médaillon (Apache Spark, Kafka, Hadoop)",
      "Développement d'un assistant médical RAG avec embeddings vectoriels et LLM",
      "Projets machine learning supervisé et prédiction de séries temporelles",
      "Préparation des certifications Azure AZ-900 et AI-900 (avril 2026)",
    ],
    skills: ["PySpark", "Kafka", "Hadoop", "SQL", "Scikit-Learn", "RAG", "Azure"],
  },
  {
    period: "DÉC. 2024 - SEPT. 2025",
    role: "Chargé de communication digitale, psychiatrie et santé mentale",
    organization: "EPSM Lille-Métropole - GHT Psy NPdC",
    location: "Armentières (59), alternance",
    type: "EXPERTISE PRO",
    description:
      "Alternance en communication digitale au sein d'un groupement hospitalier spécialisé en psychiatrie et santé mentale dans les Hauts-de-France.",
    deliverables: [
      "Refonte et optimisation de l'écosystème digital du groupement : site institutionnel, intranet, réseaux sociaux",
      "Analyse fonctionnelle et rédaction des spécifications techniques des projets digitaux",
      "Création de KPI et de tableaux de bord pour le pilotage des performances de communication",
      "Gestion de projets digitaux en autonomie : cadrage, suivi, itérations, livraisons",
    ],
    skills: [
      "Stratégie digitale",
      "Visualisation de données",
      "Figma",
      "Google Analytics",
      "Gestion de projet",
    ],
  },
  {
    period: "FÉV. 2024 - SEPT. 2025",
    role: "Vice-Président du BDE (deux mandats)",
    organization: "Bureau des Élèves ISIT - Paris-Panthéon-Assas",
    location: "Paris",
    type: "LEADERSHIP",
    description:
      "Direction exécutive du Bureau des Élèves pour une communauté internationale de 700 étudiants, 40 nationalités et 9 langues de travail.",
    deliverables: [
      "Gestion du budget annuel de l'association et négociation des partenariats",
      "Organisation d'événements d'envergure, gala annuel et intégration des étudiants internationaux",
      "Supervision des pôles communication, design et logistique",
      "Animation de cours de danse bénévoles chaque week-end",
    ],
    skills: [
      "Leadership",
      "Gestion de projet",
      "Négociation",
      "Communication trilingue",
      "Événementiel",
    ],
  },
  {
    period: "MAI - JUIL. 2024",
    role: "Stagiaire communication",
    organization: "De Nouvel Architect pour Communication",
    location: "Paris, hybride",
    type: "EXPERTISE PRO",
    description:
      "Stage de communication pour une agence d'architecture parisienne spécialisée dans les projets haut de gamme.",
    deliverables: [
      "Création de contenus visuels et storytelling pour valoriser les projets architecturaux",
      "Conception de la stratégie de communication digitale : planning éditorial, identité visuelle",
      "Gestion de la présence digitale et des supports de présentation",
    ],
    skills: ["Adobe Suite", "Figma", "Canva", "Design d'interface", "Storytelling"],
  },
  {
    period: "2022 - 2025",
    role: "Bachelor International Communication & Technology",
    organization: "EFREI Paris x ISIT, double diplôme",
    location: "Villejuif / Paris",
    type: "FORMATION",
    description:
      "Parcours bilingue combinant développement logiciel, réseaux, gestion de données et communication interculturelle. Titre RNCP niveau 6 (35541).",
    deliverables: [
      "Reconnaissance de la langue des signes par computer vision (MediaPipe, 7 langues)",
      "Jeux web canvas et PWA interactives : Blackout, Skyjo multijoueur, Taskmate",
      "Maîtrise des standards web modernes : React, Next.js, TypeScript, Tailwind CSS",
      "Pratique courante de trois langues : français natif, anglais C1, espagnol C1",
    ],
    skills: ["React", "TypeScript", "Python", "MediaPipe", "OpenCV", "Tailwind CSS"],
  },
  {
    period: "MAI - JUIL. 2023",
    role: "Assistant Scrum Master",
    organization: "BNP Paribas",
    location: "Montreuil (93), hybride",
    type: "EXPERTISE PRO",
    description:
      "Stage au sein d'une équipe projet bancaire en transition vers Agile et Scrum, 8 personnes, en cadre bancaire régulé.",
    deliverables: [
      "Animation des cérémonies Scrum : daily, sprint planning, review, rétrospective",
      "Interface entre Product Owner, équipe de développement et parties prenantes IT, métier et conformité",
      "Création et priorisation des User Stories, suivi de la vélocité et des burndown charts",
      "Identification et escalade des blocages, documentation des bonnes pratiques",
    ],
    skills: ["Scrum", "Gestion de projet agile", "Backlog", "Documentation"],
  },
  {
    period: "AOÛT 2023",
    role: "Agent d'entretien",
    organization: "Groupe Hospitalier Paul Guiraud",
    location: "Villejuif (94)",
    type: "ENGAGEMENT",
    description:
      "Job d'été dans l'établissement qui deviendra celui de mon alternance en 2025. Première immersion dans l'environnement hospitalier public et ses protocoles sanitaires en psychiatrie.",
    deliverables: [
      "Entretien et hygiène des espaces de soins : chambres, couloirs, bureaux",
      "Respect strict des protocoles sanitaires en milieu psychiatrique",
    ],
    skills: ["Rigueur", "Milieu hospitalier", "Protocoles sanitaires"],
  },
  {
    period: "SEPT. 2020 - JUIL. 2021",
    role: "Préparation Militaire Marine Kieffer",
    organization: "Marine Nationale",
    location: "Villeneuve-Saint-Georges (94)",
    type: "ENGAGEMENT",
    description:
      "Formation militaire intensive au sein de la Marine Nationale. Diplôme obtenu avec mention Assez Bien.",
    deliverables: [
      "Formation aux valeurs militaires : discipline, rigueur, prise de décision sous pression",
      "Entraînements physiques intensifs et exercices collectifs en environnement exigeant",
      "Notions de signalisation navale, défense maritime et protocoles de sécurité",
    ],
    skills: ["Discipline", "Gestion du stress", "Travail en équipe", "Esprit de défense"],
  },
];
