import type { AnchorHTMLAttributes } from "react";
import { getLocale } from "next-intl/server";
import { routing, type AppPathname } from "@/i18n/routing";
import { buildPath, toTable } from "@/lib/langswitch";

const TABLE = toTable(routing.pathnames, routing.locales);

export type AppHref = AppPathname | { pathname: AppPathname; params?: { slug: string }; hash?: string };

/** Chemin traduit pour une langue, avec ancre eventuelle. */
export function hrefFor(href: AppHref, locale: string): string {
  const obj = typeof href === "string" ? { pathname: href } : href;
  const { hash, ...rest } = obj as { pathname: AppPathname; params?: { slug: string }; hash?: string };
  return `${buildPath(rest.pathname, locale, TABLE, rest.params, routing.defaultLocale)}${hash ?? ""}`;
}

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: AppHref };

/**
 * Lien interne rendu en simple ancre, sans composant client : le site est statique, chaque page se
 * charge depuis le CDN, et aucun JavaScript n'est livre pour la navigation.
 */
export async function AppLink({ href, ...rest }: Props) {
  const locale = await getLocale();
  return <a href={hrefFor(href, locale)} {...rest} />;
}
