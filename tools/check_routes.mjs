#!/usr/bin/env node
/**
 * Garde - coherence des routes, du sitemap et du robots.
 *
 * POURQUOI. Jusqu'au 2026-08-08, le sitemap et le robots.txt etaient ecrits a la
 * main, chacun de son cote. Le sitemap declarait cinq routes inexistantes et en
 * oubliait quatre reelles, pendant que le robots.txt interdisait l'indexation de
 * /projets, /competences et /frise. Le site se desindexait lui-meme, et personne
 * ne s'en est apercu pendant des mois parce que rien ne le verifiait.
 *
 * CE QU'ELLE VOIT.
 *   1. Chaque route declaree dans src/lib/routes.ts a bien son fichier de page.
 *   2. Chaque page.tsx de src/app est bien declaree comme route (sauf celles
 *      explicitement admises comme non indexables).
 *   3. Aucun chemin interdit aux robots ne recouvre une route publique.
 *   4. sitemap.ts et robots.ts derivent bien de routes.ts, au lieu de
 *      redeclarer leurs propres listes en dur.
 *
 * CE QU'ELLE NE VOIT PAS.
 *   - Le contenu reellement servi en production. Elle lit le code source, pas
 *     le sitemap.xml genere. Une regle de reecriture dans next.config.js ou dans
 *     vercel.json pourrait encore desindexer une page sans qu'elle le sache.
 *     La verification finale reste un curl sur la production.
 *   - Les routes dynamiques a segment ([slug]), qui n'existent pas encore.
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const ROUTES_FILE = join(ROOT, "src", "lib", "routes.ts");
const APP_DIR = join(ROOT, "src", "app");

/**
 * Pages qui existent volontairement sans etre au sitemap. Toute entree ici doit
 * porter sa raison : c'est la seule facon d'eviter que cette liste devienne le
 * tapis sous lequel on pousse les oublis.
 */
const INTENTIONALLY_UNLISTED = {
  "not-found.tsx": "page 404, jamais indexable",
  "global-error.tsx": "page d'erreur, jamais indexable",
};

const failures = [];

if (!existsSync(ROUTES_FILE)) {
  console.error("Garde routes - ECHEC\n\n  src/lib/routes.ts est introuvable.");
  process.exit(1);
}

const routesSource = readFileSync(ROUTES_FILE, "utf8");

// Lecture par expression reguliere plutot que par import : ce fichier est du
// TypeScript, et la garde doit tourner sous node nu, sans etape de compilation.
const declared = [...routesSource.matchAll(/\{\s*path:\s*"([^"]+)",\s*file:\s*"([^"]+)"/g)].map(
  ([, path, file]) => ({ path, file }),
);

if (declared.length === 0) {
  failures.push("src/lib/routes.ts - aucune route lue. Le format attendu est { path: \"...\", file: \"...\" }.");
}

// 1. Chaque route declaree a son fichier.
for (const route of declared) {
  if (!existsSync(join(APP_DIR, route.file))) {
    failures.push(`src/lib/routes.ts - la route "${route.path}" declare src/app/${route.file}, qui n'existe pas.`);
  }
}

// 2. Chaque page de src/app est declaree.
function collectPages(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      collectPages(full, acc);
    } else if (entry === "page.tsx") {
      acc.push(relative(APP_DIR, full).split(sep).join("/"));
    }
  }
  return acc;
}

const declaredFiles = new Set(declared.map((route) => route.file));
for (const page of collectPages(APP_DIR)) {
  if (!declaredFiles.has(page) && !INTENTIONALLY_UNLISTED[page]) {
    failures.push(
      `src/app/${page} - page existante mais non declaree dans src/lib/routes.ts, elle ne sera donc jamais au sitemap.`,
    );
  }
}

// 3. Aucun Disallow ne recouvre une route publique.
const disallowBlock = routesSource.match(/DISALLOWED_PATHS[^=]*=\s*\[([^\]]*)\]/s);
const disallowed = disallowBlock
  ? [...disallowBlock[1].matchAll(/"([^"]+)"/g)].map(([, value]) => value)
  : [];

for (const blocked of disallowed) {
  for (const route of declared) {
    const covers = route.path === blocked || route.path.startsWith(blocked) || blocked === "/";
    if (covers) {
      failures.push(
        `src/lib/routes.ts - le chemin interdit aux robots "${blocked}" recouvre la route publique "${route.path}". C'est exactement le bug de l'ancien robots.txt.`,
      );
    }
  }
}

// 4. sitemap.ts et robots.ts derivent bien de routes.ts.
for (const [file, expected] of [
  ["src/app/sitemap.ts", "PUBLIC_ROUTES"],
  ["src/app/robots.ts", "DISALLOWED_PATHS"],
]) {
  const full = join(ROOT, file);
  if (!existsSync(full)) {
    failures.push(`${file} - fichier manquant.`);
    continue;
  }
  const source = readFileSync(full, "utf8");
  if (!source.includes("@/lib/routes")) {
    failures.push(`${file} - ne lit pas @/lib/routes. Il redeclare donc sa propre liste, ce qui a deja casse le SEO une fois.`);
  } else if (!source.includes(expected)) {
    failures.push(`${file} - importe @/lib/routes mais n'utilise pas ${expected}.`);
  }
}

if (failures.length > 0) {
  console.error("Garde routes - ECHEC\n");
  for (const failure of failures) console.error(`  ${failure}`);
  console.error(`\n${failures.length} probleme(s).`);
  process.exit(1);
}

console.log(`Garde routes - OK (${declared.length} routes declarees, coherentes avec src/app)`);
process.exit(0);
