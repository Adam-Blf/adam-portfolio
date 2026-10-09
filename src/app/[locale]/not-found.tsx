import { getTranslations } from "next-intl/server";
import { Panel } from "@/components/ui/Panel";
import { PageCta } from "@/components/ui/Cta";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <Panel num="404" title={t("title")} reveal={false}>
      <div className="nf">
        <p className="code" aria-hidden="true">
          404
        </p>
        <h1>{t("heading")}</h1>
        <p className="lead">{t("text")}</p>
        <div className="cta">
          <PageCta href="/" variant="primary">
            {t("cta")}
          </PageCta>
        </div>
      </div>
    </Panel>
  );
}
