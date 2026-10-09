import { getTranslations } from "next-intl/server";
import { identity } from "@/lib/content/load";
import { Envelope } from "@/components/ui/Icon";
import { GithubLogo, LinkedinLogo } from "@/components/ui/BrandLogos";
import { PageCta } from "@/components/ui/Cta";

/** Coordonnees publiques : e-mail, LinkedIn, GitHub, CV. Aucun telephone. */
export async function ContactLinks() {
  const t = await getTranslations("contactLinks");
  return (
    <div className="links">
      <a className="btn primary" href={`mailto:${identity.email}`}>
        <Envelope className="ic" aria-hidden="true" />
        <span>
          <span className="vh">{t("mailLabel")} </span>
          {identity.email}
        </span>
      </a>
      <a className="btn" href={identity.linkedin} rel="noopener noreferrer" target="_blank">
        <LinkedinLogo className="ic" />
        {t("linkedin")}
      </a>
      <a className="btn" href={identity.github} rel="noopener noreferrer" target="_blank">
        <GithubLogo className="ic" />
        {t("github")}
      </a>
      <PageCta href="/cv">{t("cv")}</PageCta>
    </div>
  );
}
