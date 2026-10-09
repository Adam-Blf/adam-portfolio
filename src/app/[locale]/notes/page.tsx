import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Panel } from "@/components/ui/Panel";
import { PageCta } from "@/components/ui/Cta";
import { AppLink as Link } from "@/components/ui/AppLink";
import { loadNotes } from "@/lib/content/load";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/schemas/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.notes" });
  return buildMetadata({ locale, ref: { pathname: "/notes" }, title: t("title"), description: t("description") });
}

export default async function NotesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "notesPage" });
  const notes = loadNotes(locale);
  return (
    <Panel id="notes" num="01" title={t("title")} reveal={false} className="notes" titleId="h-notes">
      <div className="page-head">
        <h1 data-rise>{t("heading")}</h1>
        <p className="lead" data-rise>
          {t("lead")}
        </p>
      </div>
      {notes.length > 0 ? (
        <ul>
          {notes.map((n) => (
            <li key={n.slug}>
              <Link href={{ pathname: "/notes/[slug]", params: { slug: n.slug } }}>
                <time className="mono" dateTime={n.front.date}>
                  {n.front.date}
                </time>
                <div>
                  <h2>{n.front.title}</h2>
                  <p>{n.front.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">
          <b>{t("emptyTitle")}</b>
          <span>{t("emptyText")}</span>
          <div className="cta">
            <PageCta href="/projects" variant="primary" icon="out">
              {t("emptyCta")}
            </PageCta>
          </div>
        </div>
      )}
    </Panel>
  );
}
