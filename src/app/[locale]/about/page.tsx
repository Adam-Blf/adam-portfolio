import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Panel } from "@/components/ui/Panel";
import { Journal } from "@/components/ui/Journal";
import { PageCta } from "@/components/ui/Cta";
import { AppLink as Link } from "@/components/ui/AppLink";
import { identity, loadProjects, loadTimeline, skills } from "@/lib/content/load";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/schemas/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return buildMetadata({ locale, ref: { pathname: "/about" }, title: t("title"), description: t("description") });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const titles = new Map(loadProjects(locale).map((p) => [p.meta.slug, p.front.title]));
  const bio = t.raw("bio") as string[];
  const engagement = t.raw("engagement.items") as { title: string; text: string }[];
  const offscreen = t.raw("offscreen.items") as { title: string; text: string }[];

  return (
    <>
      <Panel id="presentation" num="01" title={t("title")} reveal={false} titleId="h-presentation">
        <div className="about-grid">
          <figure className="portrait">
            <picture>
              <source type="image/avif" srcSet="/images/adam-240.avif 240w, /images/adam-480.avif 480w" sizes="256px" />
              <source type="image/webp" srcSet="/images/adam-240.webp 240w, /images/adam-480.webp 480w" sizes="256px" />
              <img src="/images/adam-480.webp" width={480} height={640} alt={t("photoAlt")} fetchPriority="high" decoding="async" />
            </picture>
          </figure>
          <div className="bio">
            <h1 data-rise>{identity.name}</h1>
            {bio.map((p) => (
              <p key={p.slice(0, 32)} data-rise>
                {p}
              </p>
            ))}
            <dl className="facts">
              <dt>{t("facts.place")}</dt>
              <dd>{identity.place}</dd>
              <dt>{t("facts.languages")}</dt>
              <dd>{t("facts.languagesValue")}</dd>
            </dl>
          </div>
        </div>
      </Panel>

      <Panel id="journal" num="02" title={t("journal")} titleId="h-journal">
        <Journal entries={loadTimeline()} />
      </Panel>

      <Panel id="stack" num="03" title={t("stack.title")} titleId="h-stack">
        <p className="lead" style={{ marginBottom: "1.2rem" }}>
          {t("stack.lead")}
        </p>
        <div className="skills">
          {skills.map((fam) => (
            <div key={fam.family}>
              <h3>{t(`stack.families.${fam.family}`)}</h3>
              <ul>
                {fam.items.map((it) => (
                  <li key={it.name}>
                    <b>{it.name}</b>
                    <span className="proofs">
                      {it.proofs.map((slug, i) => (
                        <span key={slug}>
                          {i > 0 && ", "}
                          {slug === "alternance" ? (
                            t("stack.alternance")
                          ) : (
                            <Link href={{ pathname: "/projects/[slug]", params: { slug } }}>{titles.get(slug) ?? slug}</Link>
                          )}
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>

      <Panel id="engagement" num="04" title={t("engagement.title")} titleId="h-engagement">
        <div className="cols">
          <div>
            <h3>{t("engagement.heading")}</h3>
            <ul>
              {engagement.map((e) => (
                <li key={e.title}>
                  <b>{e.title}</b>. {e.text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{t("offscreen.heading")}</h3>
            <ul>
              {offscreen.map((e) => (
                <li key={e.title}>
                  <b>{e.title}</b>. {e.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="panel-foot">
          <PageCta href="/projects" icon="out">
            {t("ctaProjects")}
          </PageCta>
        </p>
      </Panel>
    </>
  );
}
