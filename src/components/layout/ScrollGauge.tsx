"use client";

import { useEffect, useRef } from "react";

/** Jauge reelle : progression de defilement de la page, sans GSAP (toujours active). */
export function ScrollGauge({ label }: { label: string }) {
  const out = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = root.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty("--p", p.toFixed(3));
      if (out.current) out.current.textContent = `${Math.round(p * 100)} %`;
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="gauge" aria-hidden="true">
      <div className="track">
        <div className="fill" />
      </div>
      <div>
        <span className="lab">{label}</span>
        <span className="val" ref={out}>
          0 %
        </span>
      </div>
    </div>
  );
}
