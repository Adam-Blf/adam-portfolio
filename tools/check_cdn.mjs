#!/usr/bin/env node
/**
 * Garde (apres build) : aucun CDN, aucune ressource tierce dans le HTML, le CSS et le JS construits.
 *  - HTML : toute balise link, script, img, source, iframe, video ou audio vers un hote absolu autre que le site
 *    (les liens a, qui sont des liens sortants et non des ressources chargees, sont ignores) ;
 *  - CSS : url() ou @import absolu ;
 *  - JS : noms d'hotes de CDN connus ;
 *  - next.config.ts : aucun remotePatterns.
 */
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { read, rel, runCli, walk } from "./lib/rules.mjs";

const SELF = /^https?:\/\/(localhost|127\.0\.0\.1|adam\.beloucif\.com)(:\d+)?/;
const CDN_HOSTS = /fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|unpkg\.com|googletagmanager\.com|google-analytics\.com|cdn\.tailwindcss\.com|use\.typekit\.net|api\.fontshare\.com|cdn\.pixabay\.com|images\.unsplash\.com/;

export function check(root) {
  const problems = [];
  const cfg = join(root, "next.config.ts");
  if (existsSync(cfg) && /remotePatterns/.test(read(cfg))) problems.push("next.config.ts : remotePatterns doit rester vide (aucune image distante)");

  const build = join(root, ".next");
  if (!existsSync(build)) return [...problems, ".next absent : lancer next build avant cette garde"];

  const htmlFiles = walk(join(build, "server", "app"), new Set([".html"]));
  for (const file of htmlFiles) {
    const html = read(file).replace(/<a\s[^>]*>/gi, "");
    for (const m of html.matchAll(/<(link|script|img|source|iframe|video|audio)\b[^>]*?\b(?:src|href|srcset|data-src)=["']([^"']+)["']/gi)) {
      const url = m[2];
      if (/^(https?:)?\/\//.test(url) && !SELF.test(url)) problems.push(`${rel(root, file)} : <${m[1]}> charge ${url}`);
    }
  }
  const staticDir = join(build, "static");
  for (const file of walk(staticDir, new Set([".css"]))) {
    const css = read(file);
    for (const m of css.matchAll(/(?:url\(\s*["']?|@import\s+["'])(https?:\/\/[^"')\s]+)/g)) problems.push(`${rel(root, file)} : CSS charge ${m[1]}`);
  }
  for (const file of walk(staticDir, new Set([".js"]))) {
    const m = CDN_HOSTS.exec(read(file));
    if (m) problems.push(`${rel(root, file)} : hote de CDN "${m[0]}"`);
  }
  return problems;
}

await runCli("cdn", check, import.meta.url);
