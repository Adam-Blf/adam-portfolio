/**
 * Lecture minimale du frontmatter d'une note du vault. Seul le bloc `portfolio:` compte :
 * son absence signifie "jamais publier". Pas de bibliotheque : un script a permissions
 * minimales n'a ni reseau ni node_modules.
 */

export type PortfolioBlock = {
  publish: boolean;
  kind: "project" | "note" | "timeline" | "inconnu";
  slug: string;
  locales: string[];
  redact: string[];
  title?: string;
  projectKind?: string;
  stack: string[];
};

export type ParsedNote = { portfolio: PortfolioBlock | null; body: string; title: string };

function list(value: string): string[] {
  const inner = value.trim().replace(/^\[/, "").replace(/\]$/, "");
  if (!inner.trim()) return [];
  return inner.split(",").map((x) => x.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
}

export function parseNote(text: string, fileName: string): ParsedNote {
  const title = fileName.replace(/\.md$/i, "");
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text);
  if (!m) return { portfolio: null, body: text, title };
  const front = m[1] ?? "";
  const body = m[2] ?? "";
  const lines = front.split(/\r?\n/);
  const start = lines.findIndex((l) => /^portfolio:\s*$/.test(l));
  if (start < 0) return { portfolio: null, body, title };
  const block: Record<string, string> = {};
  for (const line of lines.slice(start + 1)) {
    if (!/^\s+\S/.test(line)) break;
    const kv = /^\s+([A-Za-z]+):\s*(.*)$/.exec(line);
    if (kv && kv[1]) block[kv[1]] = (kv[2] ?? "").trim();
  }
  const kind = block.kind ?? "";
  return {
    title,
    body,
    portfolio: {
      publish: block.publish === "true",
      kind: kind === "project" || kind === "note" || kind === "timeline" ? kind : "inconnu",
      slug: (block.slug ?? "").replace(/^["']|["']$/g, ""),
      locales: list(block.locales ?? "[fr]"),
      redact: list(block.redact ?? "[]"),
      title: block.title ? block.title.replace(/^["']|["']$/g, "") : undefined,
      projectKind: block.projectKind,
      stack: list(block.stack ?? "[]"),
    },
  };
}

/** Wikiliens Obsidian vers texte simple : [[A|B]] devient B, [[A]] devient A. */
export function stripWikilinks(text: string): string {
  return text.replace(/!?\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, a: string, b?: string) => b ?? a);
}
