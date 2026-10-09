#!/usr/bin/env node
/**
 * Garde : parite des langues. Memes cles dans messages/fr|en|es.json, et chaque
 * projet, note et ligne de parcours publie existe dans les trois langues
 * (une langue manquante ne se traduit pas a la volee : la page n'existe pas).
 */
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { read, runCli } from "./lib/rules.mjs";

const LOCALES = ["fr", "en", "es"];

function keys(value, prefix = "") {
  if (Array.isArray(value)) return [`${prefix}[${value.length}]`, ...value.flatMap((v, i) => keys(v, `${prefix}[${i}]`))];
  if (value && typeof value === "object") return Object.entries(value).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
  return [prefix];
}

function status(file) {
  const m = /^status:\s*(\w+)/m.exec(read(file));
  return m ? m[1] : "?";
}

export function check(root) {
  const problems = [];
  const sets = Object.fromEntries(LOCALES.map((l) => [l, new Set(keys(JSON.parse(read(join(root, "messages", `${l}.json`)))))]));
  for (const l of ["en", "es"]) {
    for (const k of sets.fr) if (!sets[l].has(k)) problems.push(`messages/${l}.json : cle manquante ${k}`);
    for (const k of sets[l]) if (!sets.fr.has(k)) problems.push(`messages/${l}.json : cle en trop ${k}`);
  }
  for (const group of ["projects", "notes"]) {
    const dir = join(root, "content", group);
    if (!existsSync(dir)) continue;
    for (const slug of readdirSync(dir)) {
      const states = LOCALES.map((l) => {
        const f = join(dir, slug, `${l}.mdx`);
        return existsSync(f) ? status(f) : "absent";
      });
      if (new Set(states).size > 1) problems.push(`content/${group}/${slug} : langues desalignees (fr, en, es) = ${states.join(", ")}`);
    }
  }
  const tl = join(root, "content", "timeline");
  if (existsSync(tl)) {
    for (const f of readdirSync(tl)) {
      const e = JSON.parse(read(join(tl, f)));
      for (const l of LOCALES) if (!e.i18n?.[l]?.role) problems.push(`content/timeline/${f} : ${l} manquant`);
    }
  }
  return problems;
}

await runCli("i18n", check, import.meta.url);
