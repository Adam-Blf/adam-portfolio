"use client";

import { Moon, Sun } from "@/components/ui/Icon";

const KEY = "ab-theme";

export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ?? (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* stockage indisponible : le choix reste valable pour la page */
    }
  };
  return (
    <button type="button" className="theme-toggle" aria-label={label} onClick={toggle}>
      <Sun className="ic sun" aria-hidden="true" />
      <Moon className="ic moon" aria-hidden="true" />
    </button>
  );
}
