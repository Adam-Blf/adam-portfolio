import { getLocale, getTranslations } from "next-intl/server";
import { formatPeriod } from "@/lib/format";
import { timelineText } from "@/lib/content/load";
import type { Locale, TimelineEntry } from "@/lib/schemas/content";

/** Journal de parcours : une ligne par etape, etiquette de type en chasse fixe. */
export async function Journal({ entries }: { entries: TimelineEntry[] }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("journal");
  return (
    <ol className="log" data-stagger>
      {entries.map((e) => {
        const text = timelineText(e, locale);
        return (
          <li key={e.id}>
            <time className="mono">{formatPeriod(e, locale, (d) => t("since", { date: d }))}</time>
            <span className="lvl" aria-hidden="true">
              {e.tag}
            </span>
            <div>
              <b>{text.role}</b>
              <span className="d">{text.summary}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
