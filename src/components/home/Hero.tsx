import { getTranslations } from "next-intl/server";
import { Panel } from "@/components/ui/Panel";
import { PageCta, PlainCta } from "@/components/ui/Cta";
import { tracePath } from "@/lib/motion/trace";

export async function Hero() {
  const t = await getTranslations("home.hero");
  const site = await getTranslations("site");
  return (
    <Panel id="identite" num="01" title={t("title")} reveal={false} titleId="h-identite">
      <div className="hero">
        <div>
          <h1 data-rise>Adam Beloucif</h1>
          <p className="role" data-rise>
            {site("role")}
          </p>
          <p className="lead" data-rise>
            {t("lead")}
          </p>
          <div className="cta" data-rise>
            <PlainCta href="#projets" variant="primary" icon="down">
              {t("ctaProjects")}
            </PlainCta>
            <PageCta href="/cv">{t("ctaCv")}</PageCta>
          </div>
        </div>
        <figure className="scope" aria-hidden="true">
          <svg viewBox="0 0 600 220" preserveAspectRatio="none">
            <g>
              {[55, 110, 165].map((y) => (
                <line key={y} className="gl" x1="0" y1={y} x2="600" y2={y} />
              ))}
              {[150, 300, 450].map((x) => (
                <line key={x} className="gl" x1={x} y1="0" x2={x} y2="220" />
              ))}
            </g>
            <path data-trace d={tracePath(0.25, 0)} />
          </svg>
          <figcaption>{t("signal")}</figcaption>
        </figure>
      </div>
    </Panel>
  );
}
