import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactPanel } from "@/components/home/ContactPanel";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/schemas/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return buildMetadata({ locale, ref: { pathname: "/contact" }, title: t("title"), description: t("description") });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactPanel num="01" id="contact" />;
}
