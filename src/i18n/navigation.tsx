import type { ComponentProps } from "react";
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

const nav = createNavigation(routing);

export const { usePathname, getPathname } = nav;

/**
 * Lien interne : prefetch coupe. Les pages sont statiques et servies par le CDN, alors que le
 * prechargement de chaque lien visible ajoutait une vingtaine de requetes au chargement.
 */
export function Link(props: ComponentProps<typeof nav.Link>) {
  return <nav.Link prefetch={false} {...props} />;
}
