/**
 * Chemin equivalent d'une page dans une autre langue, calcule dans le navigateur a partir de la table des
 * chemins traduits (src/i18n/routing.ts). Pas de composant de navigation next-intl cote client : le site
 * est une suite de pages statiques, et cette fonction pese quelques octets.
 */

export type RouteTable = Record<string, Record<string, string>>;

function template(route: Record<string, string>, locale: string): string {
  return route[locale] ?? "/";
}

function prefix(locale: string, defaultLocale: string): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

export function switchPath(current: string, from: string, to: string, table: RouteTable, defaultLocale = "fr"): string {
  const base = prefix(from, defaultLocale);
  let path = current;
  if (base && (path === base || path.startsWith(`${base}/`))) path = path.slice(base.length) || "/";
  if (path.length > 1) path = path.replace(/\/$/, "");
  const target = prefix(to, defaultLocale);

  for (const route of Object.values(table)) {
    const tpl = template(route, from);
    const pattern = new RegExp(`^${tpl.replace(/\[(\w+)\]/g, "(?<$1>[^/]+)")}$`);
    const m = pattern.exec(path);
    if (!m) continue;
    const out = template(route, to).replace(/\[(\w+)\]/g, (_x, name: string) => m.groups?.[name] ?? "");
    return out === "/" ? target || "/" : `${target}${out}`;
  }
  return target || "/";
}

/** Table serialisable depuis la configuration de routage : une entree "/x" simple devient la meme valeur pour toutes les langues. */
export function toTable(pathnames: Record<string, string | Record<string, string>>, locales: readonly string[]): RouteTable {
  return Object.fromEntries(
    Object.entries(pathnames).map(([key, value]) => [key, typeof value === "string" ? Object.fromEntries(locales.map((l) => [l, value])) : value]),
  );
}

/** Chemin public d'une route interne dans une langue : "/projects/[slug]" + es + { slug: "vigie" } donne "/es/proyectos/vigie". */
export function buildPath(route: string, locale: string, table: RouteTable, params?: Record<string, string>, defaultLocale = "fr"): string {
  const entry = table[route];
  if (!entry) throw new Error(`Route inconnue : ${route}`);
  const out = template(entry, locale).replace(/\[(\w+)\]/g, (_x, name: string) => params?.[name] ?? "");
  const head = prefix(locale, defaultLocale);
  return out === "/" ? head || "/" : `${head}${out}`;
}
