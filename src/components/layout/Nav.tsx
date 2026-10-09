"use client";

import { useBrowserPath } from "@/lib/useBrowserPath";

export type NavItem = { href: string; label: string; root?: boolean };

function isActive(current: string, item: NavItem): boolean {
  const path = current.length > 1 ? current.replace(/\/$/, "") : current;
  if (item.root) return path === item.href;
  return path === item.href || path.startsWith(`${item.href}/`);
}

/** Navigation du rail. La page courante est reperee apres l'hydratation (le rail est partage par toutes les pages). */
export function Nav({ items, label }: { items: NavItem[]; label: string }) {
  const path = useBrowserPath();
  return (
    <nav className="chap" aria-label={label}>
      {items.map((item, i) => (
        <a key={item.href} href={item.href} aria-current={path !== null && isActive(path, item) ? "page" : undefined}>
          <span className="mono">{String(i + 1).padStart(2, "0")}</span>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
