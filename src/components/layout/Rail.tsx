import { getLocale, getTranslations } from "next-intl/server";
import { AppLink as Link, hrefFor } from "@/components/ui/AppLink";
import { routing } from "@/i18n/routing";
import { toTable } from "@/lib/langswitch";
import { RailShell } from "./RailShell";
import { Nav, type NavItem } from "./Nav";
import { ScrollGauge } from "./ScrollGauge";
import { LangSwitch } from "./LangSwitch";
import { ThemeToggle } from "./ThemeToggle";

export async function Rail() {
  const t = await getTranslations();
  const locale = await getLocale();
  const items: NavItem[] = [
    { href: hrefFor("/", locale), label: t("nav.home"), root: true },
    { href: hrefFor("/about", locale), label: t("nav.about") },
    { href: hrefFor("/projects", locale), label: t("nav.projects") },
    { href: hrefFor("/notes", locale), label: t("nav.notes") },
    { href: hrefFor("/contact", locale), label: t("nav.contact") },
    { href: hrefFor("/cv", locale), label: t("nav.cv") },
  ];
  const brand = (
    <Link className="brand" href="/">
      <span className="mark" aria-hidden="true">
        AB
      </span>
      <span>
        <b>Adam Beloucif</b>
        <small>{t("site.role")}</small>
      </span>
    </Link>
  );
  return (
    <RailShell brand={brand} openLabel={t("a11y.menuOpen")} closeLabel={t("a11y.menuClose")}>
      <Nav items={items} label={t("a11y.mainNav")} />
      <ScrollGauge label={t("a11y.scroll")} />
      <div className="ctrl">
        <LangSwitch label={t("a11y.lang")} locale={locale} locales={[...routing.locales]} defaultLocale={routing.defaultLocale} table={toTable(routing.pathnames, routing.locales)} />
        <ThemeToggle label={t("a11y.theme")} />
      </div>
    </RailShell>
  );
}
