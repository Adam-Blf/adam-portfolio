import "server-only";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import {
  Identity,
  LOCALES,
  Metrics,
  NoteFront,
  ProjectFront,
  ProjectMeta,
  Skills,
  TimelineEntry,
  type Locale,
} from "@/lib/schemas/content";
import { deepTypo, typo } from "@/lib/typo";

const ROOT = join(process.cwd(), "content");

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf8"));
}

function dirs(path: string): string[] {
  return existsSync(path) ? readdirSync(path, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name) : [];
}

export const identity = Identity.parse(readJson(join(ROOT, "profile", "identity.json")));
export const metrics = Metrics.parse(readJson(join(ROOT, "metrics.json")));
export const skills = Skills.parse(readJson(join(ROOT, "skills.json")));

export type Project = {
  meta: ProjectMeta;
  front: ProjectFront;
  body: string;
};

export function loadProjects(locale: Locale): Project[] {
  const out: Project[] = [];
  for (const slug of dirs(join(ROOT, "projects"))) {
    const base = join(ROOT, "projects", slug);
    const meta = ProjectMeta.parse(readJson(join(base, "meta.json")));
    if (!meta.visibility.publish) continue;
    const file = join(base, `${locale}.mdx`);
    if (!existsSync(file)) continue;
    const parsed = matter(readFileSync(file, "utf8"));
    const raw = ProjectFront.parse(parsed.data);
    if (raw.status !== "published") continue;
    out.push({ meta, front: deepTypo(raw, locale), body: typo(parsed.content, locale) });
  }
  return out.sort((a, b) => a.meta.order - b.meta.order);
}

export function loadProject(slug: string, locale: Locale): Project | undefined {
  return loadProjects(locale).find((p) => p.meta.slug === slug);
}

export function projectSlugs(): string[] {
  return loadProjects("fr").map((p) => p.meta.slug);
}

export type Note = { slug: string; front: NoteFront; body: string };

export function loadNotes(locale: Locale): Note[] {
  const out: Note[] = [];
  for (const slug of dirs(join(ROOT, "notes"))) {
    const file = join(ROOT, "notes", slug, `${locale}.mdx`);
    if (!existsSync(file)) continue;
    const parsed = matter(readFileSync(file, "utf8"));
    const raw = NoteFront.parse(parsed.data);
    if (raw.status !== "published") continue;
    out.push({ slug, front: deepTypo(raw, locale), body: typo(parsed.content, locale) });
  }
  return out.sort((a, b) => b.front.date.localeCompare(a.front.date));
}

export function noteSlugs(): string[] {
  return loadNotes("fr").map((n) => n.slug);
}

export function loadTimeline(): TimelineEntry[] {
  const dir = join(ROOT, "timeline");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => TimelineEntry.parse(readJson(join(dir, f))))
    .sort((a, b) => a.start.localeCompare(b.start));
}

export function metric(id: string): number {
  const m = metrics[id];
  if (!m) throw new Error(`Chiffre inconnu : ${id}`);
  return m.value;
}

export { LOCALES };

export function timelineText(entry: TimelineEntry, locale: Locale): { role: string; summary: string } {
  return deepTypo(entry.i18n[locale], locale);
}
