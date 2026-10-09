"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Chemin reel du navigateur. Null pendant le rendu serveur et l'hydratation, puis la valeur courante :
 * le rail est partage par toutes les pages, il ne connait pas la page qu'il entoure avant d'etre dans le navigateur.
 */
export function useBrowserPath(): string | null {
  return useSyncExternalStore(subscribe, () => window.location.pathname, () => null);
}
