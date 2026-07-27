export interface SkillCategory {
  title: string;
  subtitle: string;
  iconName: string;
  skills: {
    name: string;
    level: string;
    description: string;
    featured: boolean;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "DATA ENGINEERING & INFRA",
    subtitle: "Pipelines massifs, architectures Médaillon & stockage distribué",
    iconName: "Database",
    skills: [
      { name: "Python", level: "Expert", description: "Pandas, Polars, PySpark, FastAPI, Scikit-learn, XGBoost", featured: true },
      { name: "Apache Spark", level: "Avancé", description: "PySpark, streaming en temps réel, optimisations shuffle & caching", featured: true },
      { name: "Apache Kafka", level: "Avancé", description: "Streams temps réel, pub/sub, intégration pipelines Big Data", featured: true },
      { name: "SQL & Relational DB", level: "Expert", description: "PostgreSQL, Supabase, Oracle, PL/SQL, requêtes complexes", featured: true },
      { name: "NoSQL & Data Lakes", level: "Avancé", description: "Cassandra, MongoDB, Hive, Hadoop HDFS, BigQuery", featured: false },
      { name: "Cloud & DevSecOps", level: "Avancé", description: "Vercel, Docker, GitHub Actions CI/CD, Azure (Prép AZ-900 / AI-900)", featured: false }
    ]
  },
  {
    title: "DEVELOPPEMENT FULLSTACK & WEB",
    subtitle: "Interfaces ultra-réactives, PWA & architectures modernes",
    iconName: "Layout",
    skills: [
      { name: "Next.js 15", level: "Expert", description: "App Router, Server Components, SSR/SSG, optimisations Vercel", featured: true },
      { name: "React 19 & TypeScript", level: "Expert", description: "Typage strict, hooks sur-mesure, Zustand, TanStack Query", featured: true },
      { name: "Tailwind CSS v4", level: "Expert", description: "Tokens de design, responsive mobile-first, layouts d'exception", featured: true },
      { name: "Three.js & Motion", level: "Avancé", description: "Scenes 3D WebGL, Framer Motion, GSAP ScrollTrigger, Lenis", featured: true },
      { name: "Node.js & Express", level: "Expert", description: "APIs RESTful, middleware d'auth, microservices, WebSockets", featured: false },
      { name: "Progressive Web Apps", level: "Expert", description: "Offline-first, service workers, manifestes, notifications push", featured: false }
    ]
  },
  {
    title: "BACKEND & SYSTEME",
    subtitle: "Services robustes, C# .NET 8 & applications hybrides",
    iconName: "Server",
    skills: [
      { name: "C# .NET 8", level: "Avancé", description: "ASP.NET Core, EF Core, xUnit, applications desktop performantes", featured: true },
      { name: "FastAPI", level: "Expert", description: "APIs asynchrones Python, validation Pydantic v2, Swagger docs", featured: true },
      { name: "pywebview & Qt5", level: "Avancé", description: "Applications desktop légères avec interface web native", featured: false },
      { name: "C / C++", level: "Intermédiaire", description: "Bases solides, gestion mémoire, algorithmes & structures de données", featured: false }
    ]
  },
  {
    title: "IA & COMPUTER VISION",
    subtitle: "Vision par ordinateur, RAG & réseaux de neurones",
    iconName: "Cpu",
    skills: [
      { name: "MediaPipe & OpenCV", level: "Expert", description: "Tracking 3D des mains, visage et pose pour interprétation de signes", featured: true },
      { name: "RAG & LLM Integration", level: "Avancé", description: "Sentence-Transformers, vector DBs, pipelines RAG sans hallucination", featured: true },
      { name: "Scikit-Learn & XGBoost", level: "Avancé", description: "Classification, régression, arbres de décision & scoring prédictif", featured: false },
      { name: "Deep Learning", level: "Intermédiaire", description: "Réseaux LSTM, RNN, PyTorch pour séries temporelles et audio", featured: false }
    ]
  }
];
