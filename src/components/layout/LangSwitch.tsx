"use client";

import { useBrowserPath } from "@/lib/useBrowserPath";
import { switchPath, type RouteTable } from "@/lib/langswitch";

const NAMES: Record<string, string> = { fr: "Français", en: "English", es: "Español" };

type Props = { label: string; locale: string; locales: string[]; table: RouteTable; defaultLocale: string };

/**
 * Selecteur de langue. Rendu serveur : les liens vont a l'accueil de chaque langue. Apres l'hydratation,
 * ils pointent vers la meme page dans l'autre langue.
 */
export function LangSwitch({ label, locale, locales, table, defaultLocale }: Props) {
  const path = useBrowserPath();
  return (
    <div className="lang" role="group" aria-label={label}>
      {locales.map((l) => (
        <a
          key={l}
          href={path ? switchPath(path, locale, l, table, defaultLocale) + (l === locale ? window.location.hash : "") : l === defaultLocale ? "/" : `/${l}`}
          hrefLang={l}
          lang={l}
          aria-label={`${l.toUpperCase()} ${NAMES[l]}`}
          aria-current={l === locale ? "true" : undefined}
        >
          {l.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
