import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Panel } from "@/components/ui/Panel";
import { ProjectRows } from "@/components/project/ProjectRows";
import { Filterable } from "@/components/project/Filterable";
import { loadProjects } from "@/lib/content/load";
import { PROJECT_KINDS, type Locale } from "@/lib/schemas/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.projects" });
  return buildMetadata({ locale, ref: { pathname: "/projects" }, title: t("title"), description: t("description") });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  const f = await getTranslations({ locale, namespace: "filters" });
  const projects = loadProjects(locale);
  const kinds = PROJECT_KINDS.filter((k) => projects.some((p) => p.meta.kind === k));
  return (
    <Panel id="projets" num="01" title={t("title")} reveal={false} titleId="h-projets">
      <div className="page-head">
        <h1 data-rise>{t("heading")}</h1>
        <p className="lead" data-rise>
          {t("lead")}
        </p>
      </div>
      <Filterable kinds={kinds} groupLabel={f("label")} labels={Object.fromEntries(["all", ...kinds].map((k) => [k, f(k as never)]))}>
        <ProjectRows projects={projects} headingLevel={2} />
      </Filterable>
    </Panel>
  );
}
