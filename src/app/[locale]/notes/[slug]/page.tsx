import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Panel } from "@/components/ui/Panel";
import { AppLink as Link } from "@/components/ui/AppLink";
import { ArrowLeft } from "@/components/ui/Icon";
import { loadNotes } from "@/lib/content/load";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/lib/schemas/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => loadNotes(locale).map((n) => ({ locale, slug: n.slug })));
}

type Params = Promise<{ locale: Locale; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const n = loadNotes(locale).find((x) => x.slug === slug);
  if (!n) return {};
  return buildMetadata({ locale, ref: { pathname: "/notes/[slug]", params: { slug } }, title: n.front.title, description: n.front.summary, type: "article" });
}

export default async function NotePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const n = loadNotes(locale).find((x) => x.slug === slug);
  if (!n) notFound();
  const t = await getTranslations({ locale, namespace: "notesPage" });
  return (
    <Panel id="note" num="01" title={t("noteLabel")} reveal={false} titleId="h-note">
      <Link className="crumb" href="/notes">
        <ArrowLeft className="ic" aria-hidden="true" />
        {t("back")}
      </Link>
      <article>
        <div className="page-head">
          <h1 data-rise>{n.front.title}</h1>
          <p className="lead mono" data-rise>
            <time dateTime={n.front.date}>{formatDate(n.front.date, locale)}</time>
          </p>
        </div>
        <div className="prose">
          <MDXRemote source={n.body} />
        </div>
      </article>
    </Panel>
  );
}
