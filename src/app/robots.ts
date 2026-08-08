import { MetadataRoute } from "next";
import { DISALLOWED_PATHS, SITE_URL } from "@/lib/routes";

/**
 * Remplace l'ancien `public/robots.txt`, qui interdisait l'indexation de
 * /projets, /competences, /frise et /contact, et trainait des chemins d'un
 * projet Pokedex sans rapport (/pokedex, /evolution, /centre-pokemon, /types).
 *
 * Les seuls Disallow autorises sont ceux de `DISALLOWED_PATHS`, qui ne
 * contient que de l'infrastructure. La garde `tools/check_routes.mjs` echoue si
 * un Disallow recouvre une route publique.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: DISALLOWED_PATHS,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
