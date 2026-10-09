import { getLocale, getTranslations } from "next-intl/server";
import { hrefFor } from "@/components/ui/AppLink";
import { Panel } from "@/components/ui/Panel";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { ContactForm, type FormLabels } from "@/components/contact/ContactForm";

export async function ContactPanel({ num = "06", id = "contact" }: { num?: string; id?: string }) {
  const t = await getTranslations("home.contact");
  const f = await getTranslations("form");
  const locale = await getLocale();
  const labels = Object.fromEntries(["name", "email", "message", "trap", "notice", "noticeLink", "submit", "sending", "sent", "error", "invalid"].map((k) => [k, f(k as never)])) as FormLabels;
  return (
    <Panel id={id} num={num} title={t("title")} titleId={`h-${id}`}>
      <div className="contact-grid">
        <div>
          <h3>{t("heading")}</h3>
          <p className="lead">{t("text")}</p>
          <ContactLinks />
          <p className="off">
            <b>{t("offTitle")}</b>
            <span>{t("offText")}</span>
          </p>
        </div>
        <ContactForm idPrefix={id} labels={labels} privacyHref={hrefFor("/privacy", locale)} />
      </div>
    </Panel>
  );
}
