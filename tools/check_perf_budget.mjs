#!/usr/bin/env node
/**
 * Garde (apres build) : budgets de poids de l'accueil.
 * Mesure le JS initial (balises script de la page, gzip), le chunk GSAP differe, le CSS, les polices et les images.
 * Les budgets de temps (LCP, CLS, TBT) se prouvent avec Lighthouse, pas ici.
 */
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { readFileSync } from "node:fs";
import { rel, runCli, walk } from "./lib/rules.mjs";

export const BUDGET = {
  initialJsKb: 170,
  gsapChunkKb: 45,
  cssKb: 25,
  fontsKb: 110,
  imageKb: 60,
  homeTransferKb: 350,
};

const gz = (file) => gzipSync(readFileSync(file)).length;
const kb = (n) => n / 1024;

export function measure(root) {
  const build = join(root, ".next");
  const html = join(build, "server", "app", "fr.html");
  if (!existsSync(html)) return null;
  const page = readFileSync(html, "utf8");
  // Les scripts nomodule (polyfills) ne sont pas telecharges par un navigateur moderne : exclus.
  const scripts = [...new Set([...page.matchAll(/<script([^>]+)>/g)].filter((m) => !/noModule|nomodule/.test(m[1])).map((m) => /src="(\/_next\/static\/[^"]+\.js)"/.exec(m[1])?.[1]).filter(Boolean))];
  const sheets = [...new Set([...page.matchAll(/<link[^>]+href="(\/_next\/static\/[^"]+\.css)"/g)].map((m) => m[1]))];
  const abs = (u) => join(build, u.replace("/_next/", ""));
  const initialJs = scripts.reduce((s, u) => s + gz(abs(u)), 0);
  const css = sheets.reduce((s, u) => s + gz(abs(u)), 0);
  const chunks = walk(join(build, "static", "chunks"), new Set([".js"]));
  const gsapChunks = chunks.filter((f) => /ScrollTrigger/.test(readFileSync(f, "utf8")) && !scripts.some((u) => abs(u) === f));
  const gsap = gsapChunks.reduce((s, f) => s + gz(f), 0);
  const fonts = walk(join(root, "public", "fonts"), new Set([".woff2"])).reduce((s, f) => s + statSync(f).size, 0);
  const images = walk(join(root, "public", "images"), new Set([".avif", ".webp"])).map((f) => ({ f, size: statSync(f).size }));
  const htmlGz = gzipSync(Buffer.from(page)).length;
  const preloaded = 2 * 18 * 1024;
  return { initialJs, css, gsap, fonts, images, transfer: htmlGz + initialJs + css + preloaded };
}

export function check(root) {
  const m = measure(root);
  if (!m) return [".next/server/app/fr.html absent : lancer next build avant cette garde"];
  const problems = [];
  if (kb(m.initialJs) > BUDGET.initialJsKb) problems.push(`JS initial ${kb(m.initialJs).toFixed(1)} Ko gzip > ${BUDGET.initialJsKb}`);
  if (kb(m.gsap) > BUDGET.gsapChunkKb) problems.push(`chunk GSAP ${kb(m.gsap).toFixed(1)} Ko gzip > ${BUDGET.gsapChunkKb}`);
  if (kb(m.css) > BUDGET.cssKb) problems.push(`CSS ${kb(m.css).toFixed(1)} Ko gzip > ${BUDGET.cssKb}`);
  if (kb(m.fonts) > BUDGET.fontsKb) problems.push(`polices ${kb(m.fonts).toFixed(1)} Ko > ${BUDGET.fontsKb}`);
  for (const i of m.images) if (kb(i.size) > BUDGET.imageKb) problems.push(`${rel(root, i.f)} ${kb(i.size).toFixed(1)} Ko > ${BUDGET.imageKb}`);
  if (kb(m.transfer) > BUDGET.homeTransferKb) problems.push(`transfert de l'accueil ${kb(m.transfer).toFixed(1)} Ko > ${BUDGET.homeTransferKb}`);
  return problems;
}

await runCli("perf_budget", check, import.meta.url);
