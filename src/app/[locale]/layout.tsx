import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Rail } from "@/components/layout/Rail";
import { Footer } from "@/components/layout/Footer";
import { Motion } from "@/components/motion/Motion";
import { SITE_URL } from "@/lib/site";
import "@/styles/fonts.css";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/shell.css";
import "@/styles/panels.css";
import "@/styles/pages.css";
import "@/styles/print.css";

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0D0C" },
    { media: "(prefers-color-scheme: light)", color: "#ECEEE7" },
  ],
};

export const metadata: Metadata = { metadataBase: new URL(SITE_URL) };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const THEME_INIT =
  "try{var t=localStorage.getItem('ab-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}";

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("a11y");

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <link rel="preload" href="/fonts/funnel-display-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/funnel-sans-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
          <a className="skip" href="#main">
            {t("skip")}
          </a>
          <div className="shell">
            <Rail />
            <div>
              <main id="main" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </div>
          </div>
          <Motion />
      </body>
    </html>
  );
}
