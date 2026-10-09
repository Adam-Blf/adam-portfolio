#!/usr/bin/env node
/**
 * Garde : schemas Zod du contenu et coherences croisees (chiffres sources, preuves de competences,
 * hospitalier sans lien de code, publication sans accord requis).
 */
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { read, runCli } from "./lib/rules.mjs";
import { Identity, Metrics, NoteFront, ProjectFront, ProjectMeta, Skills, TimelineEntry } from "../src/lib/schemas/content.ts";

const LOCALES = ["fr", "en", "es"];
const json = (p) => JSON.parse(read(p));

function parse(schema, value, where, problems) {
  const r = schema.safeParse(value);
  if (!r.success) {
    for (const i of r.error.issues) problems.push(`${where} : ${i.path.join(".") || "(racine)"} ${i.message}`);
    return null;
  }
  return r.data;
}

export function check(root) {
  const problems = [];
  const c = (p) => join(root, "content", p);
  parse(Identity, json(c("profile/identity.json")), "profile/identity.json", problems);
  const metrics = parse(Metrics, json(c("metrics.json")), "metrics.json", problems) ?? {};
  const skills = parse(Skills, json(c("skills.json")), "skills.json", problems) ?? [];
  const slugs = new Set();

  const pdir = c("projects");
  for (const slug of existsSync(pdir) ? readdirSync(pdir) : []) {
    const meta = parse(ProjectMeta, json(join(pdir, slug, "meta.json")), `projects/${slug}/meta.json`, problems);
    if (!meta) continue;
    if (meta.slug !== slug) problems.push(`projects/${slug} : slug du meta (${meta.slug}) different du dossier`);
    slugs.add(slug);
    for (const l of LOCALES) {
      const file = join(pdir, slug, `${l}.mdx`);
      if (!existsSync(file)) continue;
      const front = parse(ProjectFront, matter(read(file)).data, `projects/${slug}/${l}.mdx`, problems);
      if (!front) continue;
      for (const r of front.results) {
        if (r.metric && !metrics[r.metric]) problems.push(`projects/${slug}/${l}.mdx : chiffre "${r.metric}" absent de metrics.json`);
      }
    }
  }
  for (const fam of skills) {
    for (const it of fam.items) {
      for (const p of it.proofs) {
        if (p !== "alternance" && !slugs.has(p)) problems.push(`skills.json : "${it.name}" cite le projet inconnu "${p}"`);
      }
    }
  }
  for (const [id, m] of Object.entries(metrics)) {
    if (m.source !== "bde-isit" && !slugs.has(m.source)) problems.push(`metrics.json : "${id}" cite la source inconnue "${m.source}"`);
  }
  const tl = c("timeline");
  for (const f of existsSync(tl) ? readdirSync(tl) : []) parse(TimelineEntry, json(join(tl, f)), `timeline/${f}`, problems);
  const ndir = c("notes");
  for (const slug of existsSync(ndir) ? readdirSync(ndir) : []) {
    for (const l of LOCALES) {
      const file = join(ndir, slug, `${l}.mdx`);
      if (existsSync(file)) parse(NoteFront, matter(read(file)).data, `notes/${slug}/${l}.mdx`, problems);
    }
  }
  return problems;
}

await runCli("content", check, import.meta.url);
