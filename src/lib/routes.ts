/**
 * Source unique des routes publiques du site.
 *
 * Pourquoi ce fichier existe : jusqu'au 2026-08-08, le sitemap et le robots.txt
 * etaient ecrits a la main, chacun de son cote. Resultat, le sitemap declarait
 * cinq routes qui n'existaient pas (/projects, /skills, /timeline, /formation,
 * /contact) et oubliait les quatre vraies, pendant que le robots.txt interdisait
 * l'indexation de /projets, /competences et /frise. Le site se desindexait
 * lui-meme.
 *
 * Toute route publique se declare ICI et nulle part ailleurs. `sitemap.ts`,
 * `robots.ts` et la garde `tools/check_routes.mjs` en derivent. Ajouter une page
 * sans l'ajouter ici fait echouer la garde.
 */

export const SITE_URL = "https://adam.beloucif.com";

export type PublicRoute = {
  /** Chemin servi, tel qu'il apparait dans l'URL. */
  path: string;
  /** Fichier App Router qui rend cette route, relatif a src/app. */
  file: string;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
};

export const PUBLIC_ROUTES: PublicRoute[] = [
  { path: "/", file: "page.tsx", changeFrequency: "weekly", priority: 1.0 },
  { path: "/projets", file: "projets/page.tsx", changeFrequency: "weekly", priority: 0.9 },
  { path: "/parcours", file: "parcours/page.tsx", changeFrequency: "monthly", priority: 0.8 },
  { path: "/competences", file: "competences/page.tsx", changeFrequency: "monthly", priority: 0.8 },
  { path: "/cv", file: "cv/page.tsx", changeFrequency: "monthly", priority: 0.9 },
  { path: "/mentions-legales", file: "mentions-legales/page.tsx", changeFrequency: "yearly", priority: 0.2 },
  { path: "/confidentialite", file: "confidentialite/page.tsx", changeFrequency: "yearly", priority: 0.2 },
];

/**
 * Chemins interdits aux robots. Uniquement de l'infrastructure, jamais une page
 * de contenu. Si un jour une entree d'ici recouvre une entree de PUBLIC_ROUTES,
 * `tools/check_routes.mjs` echoue.
 */
export const DISALLOWED_PATHS: string[] = ["/api/", "/_next/"];

export const absoluteUrl = (path: string): string =>
  path === "/" ? SITE_URL : `${SITE_URL}${path}`;
