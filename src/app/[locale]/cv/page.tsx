import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Panel } from "@/components/ui/Panel";
import { CvSheet } from "@/components/cv/CvSheet";
import { PrintButton } from "@/components/cv/PrintButton";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/schemas/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.cv" });
  return buildMetadata({ locale, ref: { pathname: "/cv" }, title: t("title"), description: t("description") });
}

export default async function CvPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "cv" });
  return (
    <>
      <Panel id="cv" num="01" title={t("title")} reveal={false} titleId="h-cv" className="cv-bar-panel">
        <div className="cv-bar">
          <p>{t("lead")}</p>
          <PrintButton label={t("print")} />
        </div>
      </Panel>
      <CvSheet locale={locale} />
    </>
  );
}
