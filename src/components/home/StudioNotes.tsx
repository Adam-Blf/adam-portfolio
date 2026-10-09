import { getLocale, getTranslations } from "next-intl/server";
import { Panel } from "@/components/ui/Panel";
import { PageCta, PlainCta } from "@/components/ui/Cta";
import { AppLink as Link } from "@/components/ui/AppLink";
import { identity, loadNotes } from "@/lib/content/load";
import type { Locale } from "@/lib/schemas/content";

export async function StudioNotes() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;
  const notes = loadNotes(locale).slice(0, 3);
  return (
    <div className="two" id="studio">
      <section className="panel studio" data-reveal aria-labelledby="h-studio">
        <header className="ph">
          <b>[05]</b>
          <h2 id="h-studio">{t("studio.title")}</h2>
          <i aria-hidden="true" />
        </header>
        <h3>BLF Lab&apos;s</h3>
        <p>{t("studio.text")}</p>
        <PlainCta href={identity.studio} variant="primary" icon="out" external>
          {t("studio.cta")}
        </PlainCta>
      </section>
      <Panel num="05" title={t("notes.title")} className="notes" titleId="h-notes">
        {notes.length > 0 ? (
          <ul>
            {notes.map((n) => (
              <li key={n.slug}>
                <Link href={{ pathname: "/notes/[slug]", params: { slug: n.slug } }}>
                  <time className="mono" dateTime={n.front.date}>
                    {n.front.date}
                  </time>
                  <div>
                    <h3>{n.front.title}</h3>
                    <p>{n.front.summary}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <b>{t("notes.emptyTitle")}</b>
            <span>{t("notes.emptyText")}</span>
          </div>
        )}
        {notes.length > 0 && (
          <p className="panel-foot">
            <PageCta href="/notes" icon="out">
              {t("notes.cta")}
            </PageCta>
          </p>
        )}
      </Panel>
    </div>
  );
}
