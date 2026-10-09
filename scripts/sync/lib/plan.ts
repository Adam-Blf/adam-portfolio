/**
 * Plan de synchro : de la liste des notes du vault a la liste des fichiers a proposer.
 * Fonctions pures (aucune E/S), donc testables. Le script ne remplit JAMAIS approvals,
 * reviewedBy ni reviewedOn, et ne met jamais publish a true : seul Adam le fait, dans la PR.
 */
import { parseNote, stripWikilinks, type PortfolioBlock } from "./frontmatter.ts";
import { redactAll, scan, type Violation } from "./scan.ts";

export type VaultNote = { path: string; name: string; text: string };
export type SyncState = { fingerprints: Record<string, string> };

export type Proposal = {
  id: string;
  kind: "project" | "note";
  slug: string;
  files: Record<string, string>;
  fingerprint: string;
  needsApproval: string[];
};
/** reason est sans danger pour une PR ; detail ne reste que dans le rapport local (.sync/report.json, ignore par git). */
export type Ignored = { path: string; reason: string; detail?: string };
export type Plan = { proposals: Proposal[]; ignored: Ignored[] };

export async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Identifiant opaque d'une note : le chemin du vault ne sort jamais dans le depot. */
export async function vaultId(path: string): Promise<string> {
  return `vault:${(await sha256(path)).slice(0, 10)}`;
}

const SLUG = /^[a-z0-9-]+$/;
const q = (s: string) => JSON.stringify(s);

function summaryOf(body: string): string {
  const para = body.split(/\n\s*\n/).map((p) => p.replace(/^#+\s.*$/gm, "").replace(/\s+/g, " ").trim()).find((p) => p.length >= 20) ?? "";
  return para.length <= 160 ? para : `${para.slice(0, 157).trimEnd()}...`;
}

function categories(v: Violation[]): string {
  return [...new Set(v.map((x) => x.category))].join(", ");
}

export async function planNote(note: VaultNote, state: SyncState, today: string): Promise<Proposal | Ignored | null> {
  const parsed = parseNote(note.text, note.name);
  const p: PortfolioBlock | null = parsed.portfolio;
  if (!p || !p.publish) return null; // pas d'opt-in : jamais, et rien a signaler
  if (p.kind === "timeline") return { path: note.path, reason: "timeline : a saisir a la main (identite visuelle et dates a valider)" };
  if (p.kind === "inconnu") return { path: note.path, reason: "portfolio.kind absent ou inconnu (project, note ou timeline)" };
  if (!SLUG.test(p.slug)) return { path: note.path, reason: "portfolio.slug absent ou invalide (minuscules, chiffres, tirets)" };

  const body = redactAll(stripWikilinks(parsed.body).trim(), p.redact);
  const title = redactAll(p.title ?? parsed.title, p.redact);
  const violations = scan(`${title}\n${body}`, "fr");
  if (violations.length) {
    const id = await vaultId(note.path);
    return { path: note.path, reason: `source ${id} refusee par l'assainissement (${categories(violations)})`, detail: violations.map((x) => `${x.category} : ${x.detail}`).join(" ; ") };
  }
  const summary = summaryOf(body);
  if (summary.length < 20) return { path: note.path, reason: "corps trop court pour un resume de 20 caracteres" };

  const fingerprint = await sha256(`${p.slug}\n${title}\n${body}`);
  const id = await vaultId(note.path);
  if (state.fingerprints[id] === fingerprint) return null; // idempotent : deja propose, rien n'a change

  const needsApproval: string[] = [];
  const files: Record<string, string> = {};
  if (p.kind === "project") {
    const kind = ["hospital", "school", "studio", "client", "personal"].includes(p.projectKind ?? "") ? (p.projectKind as string) : "personal";
    if (kind === "hospital") needsApproval.push("accord de l'etablissement ou anonymisation confirmee, aucun lien de code");
    if (kind === "client") needsApproval.push("accord ecrit du client");
    files[`content/projects/${p.slug}/meta.json`] = `${JSON.stringify(
      {
        slug: p.slug,
        kind,
        status: "wip",
        period: { start: null, end: null },
        stack: p.stack.length ? p.stack : ["a-completer"],
        links: { repo: null, demo: null },
        coAuthors: [],
        featured: false,
        order: 99,
        visibility: { publish: false, anonymized: false, approvals: { employer: null, client: null, coAuthors: [] }, reviewedBy: null, reviewedOn: null },
        provenance: { vaultId: id, checkedOn: today },
      },
      null,
      2,
    )}\n`;
    files[`content/projects/${p.slug}/fr.mdx`] = [
      "---",
      `title: ${q(title)}`,
      `tagline: ${q(summary)}`,
      `role: ${q("A completer")}`,
      `summary: ${q(summary)}`,
      "results: []",
      "limits: []",
      "status: draft",
      "reviewedOn: null",
      "---",
      "",
      body,
      "",
    ].join("\n");
  } else {
    files[`content/notes/${p.slug}/fr.mdx`] = [
      "---",
      `title: ${q(title)}`,
      `date: ${q(today)}`,
      "updated: null",
      `summary: ${q(summary)}`,
      "topics: []",
      "status: draft",
      "reviewedOn: null",
      `source: { vaultId: ${q(id)}, checkedOn: ${q(today)} }`,
      "---",
      "",
      body,
      "",
    ].join("\n");
  }
  return { id, kind: p.kind, slug: p.slug, files, fingerprint, needsApproval };
}

export async function planAll(notes: VaultNote[], state: SyncState, today: string): Promise<Plan> {
  const plan: Plan = { proposals: [], ignored: [] };
  for (const n of notes) {
    const r = await planNote(n, state, today);
    if (!r) continue;
    if ("reason" in r) plan.ignored.push(r);
    else plan.proposals.push(r);
  }
  return plan;
}
