export interface Project {
  id: string;
  number: string;
  title: string;
  category: "Hospitalier & Data Engineering" | "Applications Web & PWA" | "IA, Vision & Algo" | "Utilitaires & Jeux" | "Hospitalier & Web PWA";
  summary: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  impact: string;
  highlights: string[];
  image: string;
  featured: boolean;
}

export const projectsData: Project[] = [
  {
    id: "sovereign-os-dim",
    number: "01",
    title: "Sovereign OS DIM",
    category: "Hospitalier & Data Engineering",
    summary: "Station PMSI hospitalière d'excellence pour le DIM PSY (Fondation Vallée / GHT Sud Paris). Moteur de parsing, contrôle de gestion et audit de conformité pour 23 formats ATIH.",
    description: "Sovereign OS DIM est une solution d'ingénierie décisionnelle conçue pour le Département d'Information Médicale (DIM) en pédopsychiatrie. Il automatise l'analyse des fichiers FICHSUP-PSY, RUM, RHS et DMI avec un contrôle de conformité strict, des prédictions XGBoost sur l'activité et un respect strict du k-anonymat (k>=5).",
    tags: [".NET 8", "Python", "FastAPI", "XGBoost", "ATIH / PMSI", "pywebview"],
    githubUrl: "https://github.com/Adam-Blf/sovereign_os_dim",
    liveUrl: "https://adam.beloucif.com",
    impact: "Traitement sub-seconde des 23 formats ATIH et fiabilisation du contrôle de gestion hospitalier.",
    highlights: [
      "Parsing haute performance de 23 formats de données ATIH",
      "Module ML XGBoost pour la détection d'anomalies de cotation",
      "Génération automatique de tableaux de bord et rapports PDF HDS",
      "Architecture desktop hybride .NET 8 / Python zéro dépendance cloud"
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "pgvplaning",
    number: "02",
    title: "PGVPLANING — Planning Soignants",
    category: "Hospitalier & Web PWA",
    summary: "Plateforme PWA temps réel de gestion intelligente des plannings et des roulements pour les équipes soignantes en psychiatrie.",
    description: "PGVPLANING résout la complexité de l'organisation des roulements de gardes hospitalières. L'application intègre la validation automatique des contraintes légales, le suivi des heures d'équivalences et une synchronisation multi-support offline-first via Firebase & Supabase.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Supabase", "PWA"],
    githubUrl: "https://github.com/Adam-Blf/pgvplaning",
    liveUrl: "https://planning.beloucif.com",
    impact: "Déployé et utilisé en production pour optimiser l'emploi du temps des soignants.",
    highlights: [
      "Vérification temps réel des règles de repos et gardes",
      "Calcul des récupérations et compte d'heures automatique",
      "Architecture PWA réactive avec notifications push",
      "Export direct aux formats standardisés RH"
    ],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "blackout-apero",
    number: "03",
    title: "Blackout Apéro — Engine PWA",
    category: "Applications Web & PWA",
    summary: "Application web événementielle et moteur de jeu d'ambiance multijoueur temps réel avec cartes dynamiques et votes interactifs.",
    description: "Plateforme web festive qui anime les soirées grâce à des tirages de cartes interactifs, des jauges de difficulté adaptatives et des mécaniques de vote en direct entre participants.",
    tags: ["Next.js", "React", "TypeScript", "Framer Motion", "PWA", "Zustand"],
    githubUrl: "https://github.com/Adam-Blf/black-out",
    liveUrl: "https://blackout.beloucif.com",
    impact: "Utilisé par des milliers de joueurs uniques lors d'événements et soirées.",
    highlights: [
      "Générateur dynamique de cartes et défis paramétrables",
      "Système de vote rapide et timers d'animation 60 FPS",
      "Progressive Web App installable instantanément",
      "Design sombre haut de gamme avec micro-interactions"
    ],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "projet-dataeng-m1",
    number: "04",
    title: "Data Lake Médaillon Spark / Kafka",
    category: "Hospitalier & Data Engineering",
    summary: "Architecture Data Engineering d'entreprise basée sur le modèle Médaillon (Bronze, Silver, Gold) avec PySpark, Kafka et Hive.",
    description: "Projet d'ingénierie de données massives simulant une plateforme e-commerce multi-flux. Le système assure le streaming en continu via Kafka, la transformation distribuée sous Apache Spark et l'agrégation décisionnelle dans Hive et BigQuery.",
    tags: ["PySpark", "Apache Spark", "Kafka", "Hadoop", "Hive", "FastAPI", "Streamlit"],
    githubUrl: "https://github.com/Adam-Blf/projet-bdf-m1-olist",
    liveUrl: "https://github.com/Adam-Blf/projet-bdf-m1-olist",
    impact: "Validation de l'architecture Big Data d'entreprise dans le cadre du Mastère M1 EFREI.",
    highlights: [
      "Ingestion multi-sources streaming Kafka & batch Hive",
      "Pipeline de nettoyage et déduplication Silver PySpark",
      "Calcul des KPIs métier dans la couche Gold analytique",
      "Dashboard interactif Streamlit pour la visualisation"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "langue-des-signes",
    number: "05",
    title: "LSF Vision — Sign Language AI",
    category: "IA, Vision & Algo",
    summary: "Système de Computer Vision en temps réel d'interprétation de la Langue des Signes (7 langues) basé sur MediaPipe et réseaux LSTM.",
    description: "Application d'IA visuelle qui capture 21 points d'articulation de la main et de la posture corporelle via la webcam pour traduire instantanément les signes en texte.",
    tags: ["Python", "MediaPipe", "OpenCV", "Scikit-learn", "LSTM", "TensorFlow"],
    githubUrl: "https://github.com/Adam-Blf/Langue-des-signes",
    liveUrl: "https://github.com/Adam-Blf/Langue-des-signes",
    impact: "Précision de reconnaissance spatio-temporelle supérieure à 94%.",
    highlights: [
      "Tracking squelettique des mains et du visage via MediaPipe",
      "Modèle séquentiel LSTM pour les gestes dynamiques",
      "Support multi-dictionnaires de langues des signes",
      "Interface utilisateur fluide à 60 images par seconde"
    ],
    image: "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "let-me-cook",
    number: "06",
    title: "Let Me Cook — AI Culinary Assistant",
    category: "Applications Web & PWA",
    summary: "Assistant culinaire PWA et générateur de recettes sur-mesure selon le contenu du frigo, avec suivi nutritionnel et paiements Stripe.",
    description: "Solution SaaS pour éviter le gaspillage alimentaire. L'IA génère des recettes équilibrées basées sur les ingrédients disponibles et calcule les valeurs nutritionnelles exactes.",
    tags: ["Next.js 15", "Supabase", "Stripe", "Tailwind CSS", "OpenAI API", "PWA"],
    githubUrl: "https://github.com/Adam-Blf/Let-Me-Cook-V1",
    liveUrl: "https://genius-pwa.vercel.app",
    impact: "Produit SaaS fonctionnel avec authentification et abonnements récurrents.",
    highlights: [
      "Algorithme intelligent d'optimisation d'ingrédients",
      "Génération de fiches recettes enrichies et structurées",
      "Intégration Stripe Checkout pour les abonnements Pro",
      "Interface PWA responsive avec gestion des favoris"
    ],
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "taskmate",
    number: "07",
    title: "Taskmate — ML Productivity",
    category: "Applications Web & PWA",
    summary: "Application MERN de gestion de tâches intégrant un algorithme de Machine Learning pour la priorisation dynamique des priorités.",
    description: "Outil de gestion du travail calculant un score de priorité prédictif en fonction de la complexité, de la charge restante et de la proximité de l'échéance.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Scikit-learn", "Python"],
    githubUrl: "https://github.com/Adam-Blf/Taskmate",
    liveUrl: "https://taskmate-mauve.vercel.app",
    impact: "Gain de temps estimé à 20% sur la planification quotidienne des projets.",
    highlights: [
      "Scoring ML de priorité automatique",
      "Tableau Kanban interactif en React",
      "API RESTful robuste sous Node.js & MongoDB",
      "Alertes d'échéances et statistiques de productivité"
    ],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
  {
    id: "chess-ai",
    number: "08",
    title: "ChessAI Self-Learning Web",
    category: "IA, Vision & Algo",
    summary: "Moteur d'échecs autonome en TypeScript & WebAssembly utilisant l'algorithme Minimax avec élagage Alpha-Beta.",
    description: "Moteur de jeu d'échecs auto-apprenant s'exécutant à 100% dans le navigateur web, capable d'évaluer des milliers de positions par seconde.",
    tags: ["TypeScript", "WebAssembly", "Chess.js", "Framer Motion", "Algorithms"],
    githubUrl: "https://github.com/Adam-Blf/ChessAI-SelfLearning-Web",
    liveUrl: "https://github.com/Adam-Blf/ChessAI-SelfLearning-Web",
    impact: "Profondeur de calcul jusqu'à 6 demi-coups en temps réel côté client.",
    highlights: [
      "Algorithme Minimax optimisé avec élagage Alpha-Beta",
      "Tables de transposition pour mémoriser les positions récurrentes",
      "Interface graphique d'échiquier 3D tactile",
      "Mode analyse de partie coup par coup"
    ],
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
  {
    id: "doctis-ai",
    number: "09",
    title: "Doctis AI — Medical RAG",
    category: "IA, Vision & Algo",
    summary: "Assistant de recherche médicale RAG basé sur des modèles de langage et la vectorisation de la documentation scientifique.",
    description: "Solution RAG (Retrieval-Augmented Generation) permettant aux praticiens de consulter de vastes bases de connaissances médicales avec vérification stricte des sources.",
    tags: ["Python", "FastAPI", "Sentence-Transformers", "RAG", "Vector DB", "Next.js"],
    githubUrl: "https://github.com/Adam-Blf/Projet-IA-Generative-Doctis-AI-mo",
    liveUrl: "https://doctis-ai-mo.vercel.app",
    impact: "Suppression des risques d'hallucinations grâce au ciblage vectoriel exact des textes originaux.",
    highlights: [
      "Indexation sémantique d'articles et recommandations médicales",
      "Moteur de recherche hybride dense + lexical",
      "Citation exacte des sources pour chaque réponse",
      "Interface praticien claire et sécurisée"
    ],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
  {
    id: "abel-cli",
    number: "10",
    title: "A.B.E.L — Terminal Assistant",
    category: "Utilitaires & Jeux",
    summary: "Agent CLI d'automatisation système et assistant de développement personnel en Python et TypeScript.",
    description: "CLI système centralisé assurant l'automatisation des tâches récurrentes, la gestion des hooks Git, les audits de sécurité locaux et les interactions avec les LLMs.",
    tags: ["Python", "TypeScript", "CLI", "Shell", "Automation", "Git Hooks"],
    githubUrl: "https://github.com/Adam-Blf/A.B.E.L",
    liveUrl: "https://github.com/Adam-Blf/A.B.E.L",
    impact: "Automatisation quotidienne du workflow d'ingénierie d'Adam Beloucif.",
    highlights: [
      "Commandes d'automatisation système ultra-rapides",
      "Intégration d'agents LLM pour l'analyse de diffs Git",
      "Vérification pré-push automatique et formatage",
      "Architecture modulaire extensible"
    ],
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
  {
    id: "skyjo-multiplayer",
    number: "11",
    title: "Skyjo Multiplayer PWA",
    category: "Utilitaires & Jeux",
    summary: "Jeu de cartes Skyjo multijoueur peer-to-peer WebRTC fonctionnant sans serveur central.",
    description: "Version web réactive du jeu de cartes Skyjo permettant à des joueurs de se connecter directement en P2P grâce à PeerJS et WebRTC.",
    tags: ["React", "TypeScript", "PeerJS", "WebRTC", "Zustand", "PWA"],
    githubUrl: "https://github.com/Adam-Blf/skyjo-multiplayer",
    liveUrl: "https://skyjo-multiplayer.vercel.app",
    impact: "Expérience multijoueur temps réel fluide à 0€ de coût d'infrastructure.",
    highlights: [
      "Connexion Peer-to-Peer directe sans latence serveur",
      "Animations de distribution de cartes fluides",
      "Mode offline et sauvegarde de score",
      "Compatibilité mobile et tablette PWA"
    ],
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
  {
    id: "urban-data-explorer",
    number: "12",
    title: "Urban Data Explorer",
    category: "Hospitalier & Data Engineering",
    summary: "Pipeline de données géospatiales et traitement de flux de mobilité urbaine sous Polars, Kafka et Cassandra.",
    description: "Plateforme d'analyse et de visualisation de données de transport et de mobilité urbaine massives exploitant la vitesse de Polars et la scalabilité de Cassandra.",
    tags: ["Polars", "Kafka", "Cassandra", "PostgreSQL", "FastAPI", "React"],
    githubUrl: "https://github.com/Adam-Blf/urban-data-explorer",
    liveUrl: "https://github.com/Adam-Blf/urban-data-explorer",
    impact: "Traitement analytique 10x plus rapide qu'avec la stack Pandas standard.",
    highlights: [
      "Indexation spatio-temporelle sous Cassandra",
      "Inférence et agrégation rapide via Polars",
      "API RESTful asynchrone sous FastAPI",
      "Visualisation cartographique interactive"
    ],
    image: "https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  }
];
