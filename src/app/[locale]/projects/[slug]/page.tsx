import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Panel } from "@/components/ui/Panel";
import { PageCta, PlainCta } from "@/components/ui/Cta";
import { AppLink as Link } from "@/components/ui/AppLink";
import { ArrowLeft } from "@/components/ui/Icon";
import { loadProject, loadProjects } from "@/lib/content/load";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/schemas/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => loadProjects(locale).map((p) => ({ locale, slug: p.meta.slug })));
}

type Params = Promise<{ locale: Locale; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = loadProject(slug, locale);
  if (!p) return {};
  return buildMetadata({
    locale,
    ref: { pathname: "/projects/[slug]", params: { slug } },
    title: p.front.title,
    description: p.front.summary,
    type: "article",
  });
}

function formatPeriod(start: string | null, end: string | null, locale: Locale): string | null {
  const f = (v: string) => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${v}-01T00:00:00Z`));
  if (start && end) return start === end ? f(start) : `${f(start)} - ${f(end)}`;
  if (start) return f(start);
  return end ? f(end) : null;
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const p = loadProject(slug, locale);
  if (!p) notFound();
  const t = await getTranslations({ locale, namespace: "project" });
  const k = await getTranslations({ locale, namespace: "kinds" });
  const period = formatPeriod(p.meta.period.start, p.meta.period.end, locale);
  const { repo, demo } = p.meta.links;

  return (
    <>
      <Panel id="fiche" num="01" title={t("sheet")} reveal={false} titleId="h-fiche">
        <Link className="crumb" href="/projects">
          <ArrowLeft className="ic" aria-hidden="true" />
          {t("back")}
        </Link>
        <div className="page-head">
          <h1 data-rise>{p.front.title}</h1>
          <p className="lead" data-rise>
            {p.front.tagline}
          </p>
        </div>
        <dl className="case-meta">
          <div>
            <dt>{t("role")}</dt>
            <dd>{p.front.role}</dd>
          </div>
          <div>
            <dt>{t("kind")}</dt>
            <dd>{k(p.meta.kind)}</dd>
          </div>
          {period && (
            <div>
              <dt>{t("period")}</dt>
              <dd>{period}</dd>
            </div>
          )}
          {(p.meta.status === "live" || p.meta.status === "wip") && (
            <div>
              <dt>{t("status")}</dt>
              <dd>{t(`statuses.${p.meta.status}`)}</dd>
            </div>
          )}
          <div>
            <dt>{t("stack")}</dt>
            <dd>{p.meta.stack.join(", ")}</dd>
          </div>
        </dl>
        {(repo || demo) && (
          <div className="cta">
            {demo && (
              <PlainCta href={demo} variant="primary" icon="out" external>
                {t("ctaDemo")}
              </PlainCta>
            )}
            {repo && (
              <PlainCta href={repo} icon="out" external>
                {t("ctaCode")}
              </PlainCta>
            )}
          </div>
        )}
      </Panel>

      <Panel id="resultats" num="02" title={t("results")} titleId="h-resultats">
        <ul className="results">
          {p.front.results.map((r) => (
            <li key={r.text}>{r.text}</li>
          ))}
        </ul>
      </Panel>

      <Panel id="detail" num="03" title={t("detail")} titleId="h-detail">
        <div className="prose">
          <MDXRemote source={p.body} />
        </div>
      </Panel>

      {p.front.limits.length > 0 && (
        <Panel id="limites" num="04" title={t("limits")} titleId="h-limites">
          <ul className="limits">
            {p.front.limits.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </Panel>
      )}

      <Panel id="suite" num={p.front.limits.length > 0 ? "05" : "04"} title={t("next")} titleId="h-suite">
        <p className="lead" style={{ marginBottom: "1.2rem" }}>
          {t("nextLead")}
        </p>
        <div className="cta">
          <PageCta href="/contact" variant="primary">
            {t("ctaDiscuss")}
          </PageCta>
          <PageCta href="/projects" icon="out">
            {t("ctaOthers")}
          </PageCta>
        </div>
      </Panel>
    </>
  );
}
