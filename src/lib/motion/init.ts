import { tracePath } from "./trace";

/**
 * Mouvement de la page. Charge apres l'hydratation et hors du chemin du LCP
 * (voir components/motion/Motion.tsx). Regles :
 *  - texte du premier ecran toujours visible : decalage de transform seulement ;
 *  - revelation limitee aux elements sous la ligne de flottaison ;
 *  - transform et opacity uniquement ;
 *  - rien du tout sous prefers-reduced-motion.
 */
export async function initMotion(): Promise<() => void> {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const lang = document.documentElement.lang || "fr";

    const rise = gsap.utils.toArray<HTMLElement>("[data-rise]");
    if (rise.length) gsap.from(rise, { y: 24, duration: 0.85, stagger: 0.09, ease: "power3.out", clearProps: "transform" });

    const sig = document.querySelector<SVGPathElement>("[data-trace]");
    if (sig) {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => sig.setAttribute("d", tracePath(self.progress, self.progress * 22)),
      });
    }

    for (const el of gsap.utils.toArray<HTMLElement>("[data-reveal]")) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) continue;
      gsap.from(el, {
        y: 36,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }

    for (const group of gsap.utils.toArray<HTMLElement>("[data-stagger]")) {
      if (group.getBoundingClientRect().top < window.innerHeight * 0.9) continue;
      gsap.from(group.children, {
        x: -20,
        autoAlpha: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: group, start: "top 85%", once: true },
      });
    }

    for (const el of gsap.utils.toArray<HTMLElement>("[data-count]")) {
      const to = Number(el.dataset.count);
      if (!Number.isFinite(to)) continue;
      const state = { v: 0 };
      gsap.to(state, {
        v: to,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onStart: () => {
          el.textContent = "0";
        },
        onUpdate: () => {
          el.textContent = Math.round(state.v).toLocaleString(lang);
        },
        onComplete: () => {
          el.textContent = to.toLocaleString(lang);
        },
      });
    }
  });

  void document.fonts?.ready.then(() => ScrollTrigger.refresh());
  return () => mm.revert();
}
