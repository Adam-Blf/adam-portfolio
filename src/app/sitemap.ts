import { MetadataRoute } from "next";
import { PUBLIC_ROUTES, absoluteUrl } from "@/lib/routes";

/**
 * Genere depuis `src/lib/routes.ts`, jamais ecrit a la main. La version
 * precedente listait cinq routes inexistantes et omettait les quatre reelles.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Date de build plutot qu'une constante figee : l'ancien sitemap annoncait
  // encore le 2026-02-09 six mois plus tard.
  const lastModified = new Date();

  return PUBLIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
