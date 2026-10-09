"use client";

import { useState, type ReactNode } from "react";

type Props = { kinds: string[]; labels: Record<string, string>; groupLabel: string; children: ReactNode };

/** Filtre par categorie : tout reste rendu cote serveur, seul un attribut change. */
export function Filterable({ kinds, labels, groupLabel, children }: Props) {
  const [kind, setKind] = useState("all");
  return (
    <div className="filterable" data-filter={kind}>
      <div className="filters" role="group" aria-label={groupLabel}>
        {["all", ...kinds].map((k) => (
          <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}>
            {labels[k]}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
