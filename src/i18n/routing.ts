import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en", "es"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  // Pas de detection automatique : URLs stables, cache CDN intact, hreflang propre.
  localeDetection: false,
  // Aucun cookie : la langue vient de l'URL, rien n'est memorise.
  localeCookie: false,
  pathnames: {
    "/": "/",
    "/about": { fr: "/a-propos", en: "/about", es: "/sobre-mi" },
    "/projects": { fr: "/projets", en: "/projects", es: "/proyectos" },
    "/projects/[slug]": { fr: "/projets/[slug]", en: "/projects/[slug]", es: "/proyectos/[slug]" },
    "/notes": { fr: "/notes", en: "/notes", es: "/notas" },
    "/notes/[slug]": { fr: "/notes/[slug]", en: "/notes/[slug]", es: "/notas/[slug]" },
    "/contact": { fr: "/contact", en: "/contact", es: "/contacto" },
    "/cv": "/cv",
    "/legal": { fr: "/mentions-legales", en: "/legal-notice", es: "/aviso-legal" },
    "/privacy": { fr: "/confidentialite", en: "/privacy", es: "/privacidad" },
  },
});

export type AppPathname = keyof typeof routing.pathnames;
