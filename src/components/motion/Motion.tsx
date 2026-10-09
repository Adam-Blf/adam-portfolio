"use client";

import { useEffect } from "react";

const FIRST_INTERACTION = ["scroll", "pointerdown", "keydown", "touchstart"] as const;
const FALLBACK_MS = 6000;

/**
 * Charge GSAP et ScrollTrigger apres la premiere interaction (defilement, clic, touche, toucher)
 * ou, a defaut, 6 s apres l'hydratation : jamais avant le LCP, jamais dans la fenetre de blocage
 * du chargement. Sans JavaScript ou sous prefers-reduced-motion, la page reste complete et lisible.
 */
export function Motion() {
  useEffect(() => {
    let stop: (() => void) | undefined;
    let cancelled = false;
    let started = false;
    const start = () => {
      if (started || cancelled) return;
      started = true;
      cleanupListeners();
      void import("@/lib/motion/init").then(async ({ initMotion }) => {
        const dispose = await initMotion();
        if (cancelled) dispose();
        else stop = dispose;
      });
    };
    const timer = window.setTimeout(start, FALLBACK_MS);
    for (const type of FIRST_INTERACTION) window.addEventListener(type, start, { once: true, passive: true });
    function cleanupListeners() {
      window.clearTimeout(timer);
      for (const type of FIRST_INTERACTION) window.removeEventListener(type, start);
    }
    return () => {
      cancelled = true;
      cleanupListeners();
      stop?.();
    };
  }, []);
  return null;
}
