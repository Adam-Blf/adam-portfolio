import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { ProofTiles } from "@/components/home/ProofTiles";
import { StudioNotes } from "@/components/home/StudioNotes";
import { ContactPanel } from "@/components/home/ContactPanel";
import { ProjectRows } from "@/components/project/ProjectRows";
import { Journal } from "@/components/ui/Journal";
import { Panel } from "@/components/ui/Panel";
import { PageCta } from "@/components/ui/Cta";
import { JsonLd } from "@/components/ui/JsonLd";
import { identity, loadProjects, loadTimeline } from "@/lib/content/load";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import type { Locale } from "@/lib/schemas/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return buildMetadata({ locale, ref: { pathname: "/" }, title: t("title"), description: t("description") });
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const site = await getTranslations({ locale, namespace: "site" });
  const featured = loadProjects(locale).filter((p) => p.meta.featured);
  const timeline = loadTimeline().filter((e) => e.featured);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: identity.name,
          jobTitle: site("role"),
          url: SITE_URL,
          sameAs: [identity.linkedin, identity.github],
          alumniOf: { "@type": "CollegeOrUniversity", name: "EFREI Paris" },
          knowsLanguage: ["fr", "en", "es"],
        }}
      />
      <Hero />
      <ProofTiles />
      <Panel id="projets" num="03" title={t("projects.title")} titleId="h-projets">
        <ProjectRows projects={featured} />
        <p className="panel-foot">
          <PageCta href="/projects" icon="out">
            {t("projects.all")}
          </PageCta>
        </p>
      </Panel>
      <Panel id="journal" num="04" title={t("log.title")} titleId="h-journal">
        <Journal entries={timeline} />
        <p className="panel-foot">
          <PageCta href="/about" hash="#journal" icon="out">
            {t("log.more")}
          </PageCta>
        </p>
      </Panel>
      <StudioNotes />
      <ContactPanel />
    </>
  );
}
