import type { ReactNode } from "react";

type Props = { id?: string; num: string; title: string; children: ReactNode; className?: string; reveal?: boolean; titleId?: string };

/** Panneau a reperes d'angle, entete en chasse fixe. */
export function Panel({ id, num, title, children, className, reveal = true, titleId }: Props) {
  return (
    <section className={`panel${className ? ` ${className}` : ""}`} id={id} aria-labelledby={titleId} data-reveal={reveal ? "" : undefined}>
      <header className="ph">
        <b>[{num}]</b>
        <h2 id={titleId}>{title}</h2>
        <i aria-hidden="true" />
      </header>
      {children}
    </section>
  );
}
