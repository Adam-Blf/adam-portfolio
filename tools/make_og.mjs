#!/usr/bin/env node
/**
 * Regenere public/og/og-<langue>.png (1200 x 630) depuis tools/og-card.html, avec les polices locales.
 * Usage : node tools/make_og.mjs   (necessite Chrome installe, via playwright-core)
 */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const card = pathToFileURL(join(root, "tools", "og-card.html")).href;
mkdirSync(join(root, "public", "og"), { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const lang of ["fr", "en", "es"]) {
  await page.goto(`${card}?lang=${lang}`, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(root, "public", "og", `og-${lang}.png`) });
  console.log(`og-${lang}.png`);
}
await browser.close();
