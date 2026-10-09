import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Panel } from "@/components/ui/Panel";
import { LegalDoc } from "@/components/ui/LegalDoc";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/schemas/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return buildMetadata({ locale, ref: { pathname: "/privacy" }, title: t("title"), description: t("description") });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });
  return (
    <Panel id="privacy" num="01" title={t("title")} reveal={false} titleId="h-privacy">
      <LegalDoc ns="privacy" />
    </Panel>
  );
}
