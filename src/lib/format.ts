import type { Locale, TimelineEntry } from "@/lib/schemas/content";

function month(value: string, locale: Locale): string {
  const [y, m] = value.split("-").map(Number);
  const text = new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y ?? 2000, (m ?? 1) - 1, 1)),
  );
  return text.replace(/ /g, " ");
}

/** Periode d'une ligne de parcours. since = libelle "Depuis {date}" de la langue. */
export function formatPeriod(e: Pick<TimelineEntry, "start" | "end" | "precision">, locale: Locale, since: (date: string) => string): string {
  if (e.precision === "year") {
    const a = e.start.slice(0, 4);
    const b = e.end?.slice(0, 4);
    if (!b) return since(a);
    return a === b ? a : `${a}-${b}`;
  }
  if (!e.end) return since(month(e.start, locale));
  return `${month(e.start, locale)} - ${month(e.end, locale)}`;
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}
