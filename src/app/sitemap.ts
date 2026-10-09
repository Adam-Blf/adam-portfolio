import type { MetadataRoute } from "next";
import { loadNotes, loadProjects } from "@/lib/content/load";
import { routing } from "@/i18n/routing";
import { urlFor, type PageRef } from "@/lib/seo";
import type { Locale } from "@/lib/schemas/content";

const STATIC: PageRef[] = [
  { pathname: "/" },
  { pathname: "/about" },
  { pathname: "/projects" },
  { pathname: "/notes" },
  { pathname: "/contact" },
  { pathname: "/cv" },
  { pathname: "/legal" },
  { pathname: "/privacy" },
];

/** Le sitemap derive des memes sources que les pages : une route ajoutee y entre, une route retiree en sort. */
export default function sitemap(): MetadataRoute.Sitemap {
  const refs: PageRef[] = [
    ...STATIC,
    ...loadProjects("fr").map((p): PageRef => ({ pathname: "/projects/[slug]", params: { slug: p.meta.slug } })),
    ...loadNotes("fr").map((n): PageRef => ({ pathname: "/notes/[slug]", params: { slug: n.slug } })),
  ];
  return refs.flatMap((ref) =>
    routing.locales.map((locale: Locale) => ({
      url: urlFor(ref, locale),
      alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, urlFor(ref, l)])) },
    })),
  );
}
