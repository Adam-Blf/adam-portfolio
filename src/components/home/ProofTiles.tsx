import { getLocale, getTranslations } from "next-intl/server";
import { Panel } from "@/components/ui/Panel";
import { AppLink as Link } from "@/components/ui/AppLink";
import { ArrowUpRight } from "@/components/ui/Icon";
import { metric } from "@/lib/content/load";

type Tile = { key: "urban" | "vigie" | "station" | "bde"; metric: string; target: { pathname: "/projects/[slug]"; params: { slug: string } } | { pathname: "/about"; hash: string } };

const TILES: Tile[] = [
  { key: "urban", metric: "urban_sources", target: { pathname: "/projects/[slug]", params: { slug: "urban-data-explorer" } } },
  { key: "vigie", metric: "attacks_replayed", target: { pathname: "/projects/[slug]", params: { slug: "vigie" } } },
  { key: "station", metric: "atih_formats", target: { pathname: "/projects/[slug]", params: { slug: "station-pmsi" } } },
  { key: "bde", metric: "bde_students", target: { pathname: "/about", hash: "#engagement" } },
];

export async function ProofTiles() {
  const t = await getTranslations("home.proofs");
  const locale = await getLocale();
  return (
    <Panel id="preuves" num="02" title={t("title")} titleId="h-preuves">
      <ul className="tiles">
        {TILES.map((tile) => {
          const value = metric(tile.metric);
          return (
            <li className="tile" key={tile.key}>
              <b className="mono" data-count={value}>
                {value.toLocaleString(locale)}
              </b>
              <span>{t(`${tile.key}.label`)}</span>
              <Link href={tile.target as never}>
                {t(`${tile.key}.cta`)}
                <ArrowUpRight className="ic" aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
