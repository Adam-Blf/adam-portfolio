#!/usr/bin/env node
/**
 * Garde : polices. Seules les familles du projet (et les replis systeme) sont declarees, les fichiers
 * woff2 existent, aucune police bannie, et si le registre d'Adam est present, la paire y est inscrite.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { read, rel, runCli, walk } from "./lib/rules.mjs";

const OWN = ["Funnel Display", "Funnel Sans", "B612 Mono", "Funnel Display Repli", "Funnel Sans Repli", "B612 Mono Repli"];
const GENERIC = new Set(["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Consolas", "sans-serif", "serif", "monospace", "ui-monospace", "Georgia", "Times New Roman", "Courier New", "inherit", "initial"]);
const BANNED = ["Inter", "Arial", "Roboto", "Helvetica", "JetBrains Mono", "IBM Plex Mono", "Satoshi", "Space Grotesk", "Sora"];

export function check(root) {
  const problems = [];
  for (const file of walk(join(root, "src"), new Set([".css", ".tsx", ".ts"]))) {
    const text = read(file);
    for (const m of text.matchAll(/font-family\s*:\s*([^;}]+)/g)) {
      for (let fam of m[1].split(",")) {
        fam = fam.trim().replace(/^["']|["']$/g, "");
        if (fam.startsWith("var(")) continue;
        if (BANNED.includes(fam)) problems.push(`${rel(root, file)} : police bannie "${fam}"`);
        else if (!OWN.includes(fam) && !GENERIC.has(fam)) problems.push(`${rel(root, file)} : famille non declaree "${fam}"`);
      }
    }
    for (const m of text.matchAll(/url\((\/fonts\/[^)]+)\)/g)) {
      if (!existsSync(join(root, "public", m[1]))) problems.push(`${rel(root, file)} : fichier de police absent ${m[1]}`);
    }
  }
  const registry = join(homedir(), ".claude", "design", "fonts-registry.json");
  if (existsSync(registry)) {
    const reg = JSON.parse(read(registry)).polices ?? {};
    for (const f of ["Funnel Display", "Funnel Sans", "B612 Mono"]) {
      if (!reg[f]?.projets?.includes("adam-portfolio")) problems.push(`registre des polices : ${f} non inscrite au nom de adam-portfolio`);
    }
  }
  return problems;
}

await runCli("fonts", check, import.meta.url);
