import type { ReactNode } from "react";
import { AppLink as Link } from "@/components/ui/AppLink";
import type { AppPathname } from "@/i18n/routing";
import { ArrowUpRight, ArrowDown } from "./Icon";

type Common = { children: ReactNode; variant?: "primary" | "ghost"; icon?: "out" | "down" | ReactNode };

function Icon({ icon }: { icon: Common["icon"] }) {
  if (icon === "out") return <ArrowUpRight className="ic" aria-hidden="true" />;
  if (icon === "down") return <ArrowDown className="ic" aria-hidden="true" />;
  return <>{icon}</>;
}

const cls = (v: Common["variant"]) => `btn${v === "primary" ? " primary" : ""}`;

/** Lien interne vers une page du site (chemin traduit par next-intl). */
export function PageCta({ href, params, hash, variant, icon, children }: Common & { href: AppPathname; params?: { slug: string }; hash?: string }) {
  const target = (params || hash ? { pathname: href, params, hash } : href) as never;
  return (
    <Link className={cls(variant)} href={target}>
      {children}
      <Icon icon={icon} />
    </Link>
  );
}

/** Ancre de la meme page, ou lien externe. */
export function PlainCta({ href, variant, icon, children, external }: Common & { href: string; external?: boolean }) {
  return (
    <a className={cls(variant)} href={href} {...(external ? { rel: "noopener noreferrer", target: "_blank" } : {})}>
      {children}
      <Icon icon={icon} />
    </a>
  );
}
