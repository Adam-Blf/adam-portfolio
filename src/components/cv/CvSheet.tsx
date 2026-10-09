import { getTranslations } from "next-intl/server";
import { formatPeriod } from "@/lib/format";
import { identity, loadProjects, loadTimeline, skills, timelineText } from "@/lib/content/load";
import type { Locale, TimelineEntry } from "@/lib/schemas/content";

type Row = { title: string; where: string; when: string; sub?: string };

/** CV public, format Harvard : formation en tete, serif, une page, noir et blanc, dates a droite. */
function Section({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <section>
      <h2>{title}</h2>
      {rows.map((r) => (
        <div className="row" key={r.title + r.when}>
          <span>
            <b>{r.title}</b>
            {r.where ? `, ${r.where}` : ""}
          </span>
          <span className="when">{r.when}</span>
          {r.sub && <p className="sub">{r.sub}</p>}
        </div>
      ))}
    </section>
  );
}

export async function CvSheet({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "cv" });
  const jt = await getTranslations({ locale, namespace: "journal" });
  const since = (d: string) => jt("since", { date: d });
  const desc = (list: TimelineEntry[]) => [...list].sort((a, b) => b.start.localeCompare(a.start));
  const toRow = (e: TimelineEntry): Row => {
    const x = timelineText(e, locale);
    // L'organisme n'est repete que s'il n'apparait ni dans l'intitule ni dans le detail.
    const norm = (v: string) => v.toLowerCase();
    const known = norm(x.role).includes(norm(e.org)) || norm(x.summary).includes(norm(e.org));
    return { title: x.role, where: known ? "" : e.org, when: formatPeriod(e, locale, since), sub: x.summary };
  };
  const all = loadTimeline().filter((e) => e.cv);
  const education = desc(all.filter((e) => e.kind === "education" || e.kind === "service")).map(toRow);
  const work = desc(all.filter((e) => e.kind === "work")).map(toRow);
  const leadership = desc(all.filter((e) => e.kind === "leadership")).map(toRow);
  const extra = t.raw("engagement") as Row[];
  const featured = loadProjects(locale).filter((p) => ["vigie", "urban-data-explorer", "station-pmsi", "404-monkey"].includes(p.meta.slug));
  const labels = t.raw("skillFamilies") as Record<string, string>;

  return (
    <article className="cv-sheet" lang={locale} aria-label={t("title")}>
      <h1>{identity.name}</h1>
      <p className="contact">
        {identity.place} | {identity.email} | linkedin.com/in/adambeloucif | github.com/Adam-Blf
      </p>
      <Section title={t("education")} rows={education} />
      <Section title={t("experience")} rows={work} />
      <Section title={t("leadership")} rows={[...leadership, ...extra]} />
      <section>
        <h2>{t("projects")}</h2>
        {featured.map((p) => (
          <p key={p.meta.slug}>
            <b>{p.front.title}</b>. {p.front.results[0]?.text}. {p.meta.stack.slice(0, 5).join(", ")}.
          </p>
        ))}
      </section>
      <section>
        <h2>{t("skills")}</h2>
        {skills.map((f) => (
          <p key={f.family}>
            <b>{t("labelled", { label: labels[f.family] ?? f.family })}</b> {f.items.map((i) => i.name).join(", ")}
          </p>
        ))}
        <p>
          <b>{t("labelled", { label: t("languagesLabel") })}</b> {t("languages")}
        </p>
        <p>
          <b>{t("labelled", { label: t("interestsLabel") })}</b> {t("interests")}
        </p>
      </section>
    </article>
  );
}
