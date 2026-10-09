import { getTranslations } from "next-intl/server";
import { AppLink as Link } from "@/components/ui/AppLink";
import { ArrowUpRight } from "@/components/ui/Icon";
import type { Project } from "@/lib/content/load";

type Props = { projects: Project[]; headingLevel?: 2 | 3 };

/** Tableau de projets : reference, resume, categorie, indicateur. Le libelle du lien annonce ce que la page montre. */
export async function ProjectRows({ projects, headingLevel = 3 }: Props) {
  const t = await getTranslations();
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <div className="plist">
      <div className="phead" aria-hidden="true">
        <span>{t("projectsList.colRef")}</span>
        <span>{t("projectsList.colProject")}</span>
        <span>{t("projectsList.colKind")}</span>
        <span>{t("projectsList.colMetric")}</span>
      </div>
      <ul data-stagger>
        {projects.map((p, i) => {
          const first = p.front.results[0];
          const cta = first?.metric
            ? t("projectsList.ctaResults", { title: p.front.title })
            : t("projectsList.ctaBuild", { title: p.front.title });
          return (
            <li className="prow" key={p.meta.slug} data-kind={p.meta.kind}>
              <span className="ref mono">{`P-${String(i + 1).padStart(2, "0")}`}</span>
              <div>
                <H>{p.front.title}</H>
                <p>{p.front.summary}</p>
                <ul className="stack" aria-label={t("projectsList.stack")}>
                  {p.meta.stack.slice(0, 5).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <Link className="more" href={{ pathname: "/projects/[slug]", params: { slug: p.meta.slug } }}>
                  {cta}
                  <ArrowUpRight className="ic" aria-hidden="true" />
                </Link>
              </div>
              <span className="kind">{t(`kinds.${p.meta.kind}`)}</span>
              <span className="met">{first?.text ?? ""}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
