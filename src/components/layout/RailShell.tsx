"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Menu, X } from "@/components/ui/Icon";

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])';

type Props = { brand: ReactNode; children: ReactNode; openLabel: string; closeLabel: string };

/** Rail : barre laterale sur grand ecran, barre haute et menu sur mobile (Echap, piege de focus). */
export function RailShell({ brand, children, openLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const bodyId = useId();

  const close = useCallback((restore: boolean) => {
    setOpen(false);
    if (restore) btn.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    body.current?.querySelector<HTMLElement>("a[href]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
        return;
      }
      if (e.key !== "Tab") return;
      const items = [btn.current, ...Array.from(body.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])].filter(
        (el): el is HTMLElement => !!el,
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <aside className="rail">
      {brand}
      <button
        ref={btn}
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls={bodyId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="ic" aria-hidden="true" /> : <Menu className="ic" aria-hidden="true" />}
      </button>
      <div ref={body} id={bodyId} className="rail-body" data-open={open}>
        {children}
      </div>
      <div className="gauge-bar" aria-hidden="true">
        <i />
      </div>
    </aside>
  );
}
