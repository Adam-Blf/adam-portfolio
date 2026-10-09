#!/usr/bin/env node
/**
 * Garde : coherence des routes, du sitemap et du robots.
 * Cause de la desindexation d'aout 2026 : un sitemap ecrit a la main, des routes inexistantes
 * declarees et des pages reelles oubliees. Ici, tout derive de src/i18n/routing.ts.
 *   1. Chaque page.tsx de src/app/[locale] est une route declaree dans routing.ts.
 *   2. Chaque route declaree a sa page.
 *   3. Chaque route statique est dans le sitemap, et les routes dynamiques sont generees.
 *   4. Le robots n'interdit que /api/.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { read, rel, runCli, walk } from "./lib/rules.mjs";

export function check(root) {
  const problems = [];
  const routing = read(join(root, "src/i18n/routing.ts"));
  const block = routing.slice(routing.indexOf("pathnames"));
  const declared = [...block.matchAll(/^\s{4}"(\/[^"]*)":/gm)].map((m) => m[1]);
  const appDir = join(root, "src/app/[locale]");
  const pages = walk(appDir, new Set(["page.tsx"])).map((f) => {
    const r = rel(appDir, f).replace(/\/?page\.tsx$/, "");
    return r === "" ? "/" : `/${r}`;
  });
  for (const p of pages) {
    if (p.includes("[...")) continue;
    if (!declared.includes(p)) problems.push(`page ${p} absente de routing.ts`);
  }
  for (const d of declared) if (!pages.includes(d)) problems.push(`route ${d} declaree sans page`);

  const sitemap = read(join(root, "src/app/sitemap.ts"));
  for (const d of declared) {
    if (d.includes("[")) {
      if (!sitemap.includes(`"${d}"`)) problems.push(`route dynamique ${d} non generee dans sitemap.ts`);
    } else if (!sitemap.includes(`pathname: "${d}"`)) problems.push(`route ${d} absente de sitemap.ts`);
  }
  const robotsFile = join(root, "src/app/robots.ts");
  if (!existsSync(robotsFile)) problems.push("src/app/robots.ts absent");
  else {
    const disallow = /disallow:\s*\[([^\]]*)\]/.exec(read(robotsFile));
    const list = disallow ? [...disallow[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]) : [];
    for (const item of list) if (item !== "/api/") problems.push(`robots.ts interdit ${item} (seul /api/ est admis)`);
  }
  return problems;
}

await runCli("routes", check, import.meta.url);
