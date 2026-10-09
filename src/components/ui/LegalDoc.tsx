import { getTranslations } from "next-intl/server";

type Section = { h: string; p?: string[]; list?: string[] };

/** Rend un document juridique decrit dans messages/<langue>.json (intro, mise a jour, sections). */
export async function LegalDoc({ ns }: { ns: "legal" | "privacy" }) {
  const t = await getTranslations(ns);
  const sections = t.raw("sections") as Section[];
  return (
    <div className="legal">
      <h1>{t("heading")}</h1>
      <p className="upd">{t("updated")}</p>
      <p>{t("intro")}</p>
      {sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          {s.p?.map((x) => (
            <p key={x.slice(0, 40)}>{x}</p>
          ))}
          {s.list && (
            <ul>
              {s.list.map((x) => (
                <li key={x.slice(0, 40)}>{x}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
