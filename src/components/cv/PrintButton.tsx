"use client";

import { Printer } from "@/components/ui/Icon";

export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" className="btn primary" onClick={() => window.print()}>
      <Printer className="ic" aria-hidden="true" />
      {label}
    </button>
  );
}
