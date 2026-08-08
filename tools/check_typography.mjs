#!/usr/bin/env node
/**
 * Garde - typographie.
 *
 * POURQUOI. Le tiret cadratin, le demi-cadratin et le mediopoint sont proscrits
 * de tout contenu publie. Ils reviennent sans arret par copier-coller depuis un
 * traitement de texte ou depuis du contenu genere. Le titre servi en production
 * en portait encore un le 2026-08-08.
 *
 * CE QU'ELLE VOIT. Les trois caracteres, partout dans les fichiers scannes,
 * y compris dans les commentaires et les messages de commit versionnes.
 *
 * CE QU'ELLE NE VOIT PAS.
 *   - Un cadratin ecrit sous forme d'entite HTML (&mdash;) ou d'echappement
 *     unicode (—). Verifie au sabotage, echec assume : ces formes
 *     n'apparaissent pas dans la pratique et les interdire ferait echouer ce
 *     fichier-ci, qui doit bien nommer les caracteres qu'il traque.
 *   - Les fichiers binaires et node_modules, exclus par chemin.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const SCANNED_DIRS = ["src", "tools"];
const SCANNED_ROOT_FILES = ["README.md", "CHANGELOG.md", "package.json"];
const SCANNED_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".json", ".md", ".html"];

const BANNED = [
  { char: "—", name: "tiret cadratin (em dash)" },
  { char: "–", name: "demi-cadratin (en dash)" },
  { char: "·", name: "mediopoint (middle dot)" },
];

function collectFiles(dir, acc = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return acc;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
      collectFiles(full, acc);
    } else if (SCANNED_EXTENSIONS.some((ext) => entry.endsWith(ext))) {
      acc.push(full);
    }
  }
  return acc;
}

const files = [
  ...SCANNED_DIRS.flatMap((dir) => collectFiles(join(ROOT, dir))),
  ...SCANNED_ROOT_FILES.map((name) => join(ROOT, name)),
];

const failures = [];

for (const file of files) {
  const rel = relative(ROOT, file).split(sep).join("/");
  // Ce fichier nomme forcement les caracteres qu'il interdit. Exclusion par
  // CHEMIN, jamais par contenu, et il est le seul a en beneficier.
  if (rel === "tools/check_typography.mjs") continue;

  let raw;
  try {
    raw = readFileSync(file, "utf8");
  } catch {
    continue;
  }

  const lines = raw.split("\n");
  lines.forEach((line, index) => {
    for (const { char, name } of BANNED) {
      if (line.includes(char)) {
        failures.push(`${rel}:${index + 1} - ${name} interdit. Utiliser "-", "," ou ".".`);
      }
    }
  });
}

if (failures.length > 0) {
  console.error("Garde typographie - ECHEC\n");
  for (const failure of failures) console.error(`  ${failure}`);
  console.error(`\n${failures.length} probleme(s).`);
  process.exit(1);
}

console.log("Garde typographie - OK");
process.exit(0);
