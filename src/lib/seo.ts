import type { Metadata } from "next";
import { routing, type AppPathname } from "@/i18n/routing";
import { buildPath, toTable } from "@/lib/langswitch";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Locale } from "@/lib/schemas/content";

type Href = AppPathname extends infer P ? (P extends "/projects/[slug]" | "/notes/[slug]" ? never : P) : never;
export type PageRef =
  | { pathname: Href }
  | { pathname: "/projects/[slug]" | "/notes/[slug]"; params: { slug: string } };

const TABLE = toTable(routing.pathnames, routing.locales);
const OG_LOCALE: Record<Locale, string> = { fr: "fr_FR", en: "en_GB", es: "es_ES" };

export function urlFor(ref: PageRef, locale: Locale): string {
  const path = buildPath(ref.pathname, locale, TABLE, "params" in ref ? ref.params : undefined, routing.defaultLocale);
  return `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;
}

export function buildMetadata(args: {
  locale: Locale;
  ref: PageRef;
  title: string;
  description: string;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const { locale, ref, title, description, type = "website", noindex } = args;
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = urlFor(ref, l);
  languages["x-default"] = urlFor(ref, routing.defaultLocale);
  const url = urlFor(ref, locale);
  const full = ref.pathname === "/" ? title : `${title} | ${SITE_NAME}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: full,
    description,
    alternates: { canonical: url, languages },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title: full,
      description,
      locale: OG_LOCALE[locale],
      images: [{ url: `${SITE_URL}/og/og-${locale}.png`, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: { card: "summary_large_image", title: full, description, images: [`${SITE_URL}/og/og-${locale}.png`] },
  };
}
