import { getTranslations } from "next-intl/server";
import { AppLink as Link } from "@/components/ui/AppLink";

export async function Footer() {
  const t = await getTranslations("foot");
  return (
    <footer className="site-foot">
      <span>{t("line")}</span>
      <nav aria-label={t("label")}>
        <Link href="/legal">{t("legal")}</Link>
        <Link href="/privacy">{t("privacy")}</Link>
      </nav>
    </footer>
  );
}
