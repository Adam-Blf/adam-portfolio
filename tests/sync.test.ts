import { describe, expect, it } from "vitest";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { planAll, planNote, type VaultNote } from "../scripts/sync/lib/plan";
import { parseSessions } from "../scripts/sync/lib/sessions";
import { buildPrBody } from "../scripts/sync/lib/pr";
import { scan } from "../scripts/sync/lib/scan";
import { parseNote } from "../scripts/sync/lib/frontmatter";

const REPO = process.cwd();
const FIX = join(REPO, "scripts/sync/fixtures");
const WHITELIST = ["1-Projects", "2-Areas/Career", "3-Resources"];

function readVault(): VaultNote[] {
  const out: VaultNote[] = [];
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.endsWith(".md")) out.push({ path: full.slice(join(FIX, "vault").length + 1).replaceAll("\\", "/"), name: e.name, text: readFileSync(full, "utf8") });
    }
  };
  for (const d of WHITELIST) {
    try {
      walk(join(FIX, "vault", d));
    } catch {
      /* dossier absent */
    }
  }
  return out;
}

const TODAY = "2026-10-09";
const EMPTY = { fingerprints: {} };

describe("script de synchro : gardes vues rouges, puis vertes", () => {
  it("ignore une note sans opt-in et ne lit pas un dossier hors liste blanche", async () => {
    const notes = readVault();
    expect(notes.some((n) => n.path.startsWith("00_Sensible"))).toBe(false);
    const plan = await planAll(notes, EMPTY, TODAY);
    expect(plan.proposals.map((p) => p.slug).sort()).toEqual(["fixture-hopital", "fixture-note", "fixture-ok", "fixture-redact"]);
    expect(JSON.stringify(plan)).not.toContain("Candidature secrete");
  });

  it("refuse une note avec une certification interdite ou un telephone, sans reproduire la valeur dans la raison", async () => {
    const plan = await planAll(readVault(), EMPTY, TODAY);
    expect(plan.ignored).toHaveLength(2);
    for (const i of plan.ignored) {
      expect(i.reason).toMatch(/refusee par l'assainissement/);
      expect(i.reason).not.toMatch(/az-?900|06 12/i);
    }
  });

  it("refuse une chaine de secret construite a l'execution", async () => {
    const token = ["ghp", "_", "a".repeat(36)].join("");
    const note: VaultNote = { path: "1-Projects/x.md", name: "x.md", text: `---\nportfolio:\n  publish: true\n  kind: note\n  slug: secret-test\n---\nUne note de test qui contient ${token} par erreur, ce qui doit l'arreter.` };
    const r = await planNote(note, EMPTY, TODAY);
    expect(r && "reason" in r && r.reason).toMatch(/assainissement \(secret\)/);
  });

  it("garde un projet hospitalier en brouillon, sans accord ni publication", async () => {
    const plan = await planAll(readVault(), EMPTY, TODAY);
    const h = plan.proposals.find((p) => p.slug === "fixture-hopital")!;
    expect(h.needsApproval.length).toBeGreaterThan(0);
    const meta = JSON.parse(h.files["content/projects/fixture-hopital/meta.json"]!);
    expect(meta.visibility.publish).toBe(false);
    expect(meta.visibility.reviewedBy).toBeNull();
    expect(meta.visibility.reviewedOn).toBeNull();
    expect(meta.visibility.approvals).toEqual({ employer: null, client: null, coAuthors: [] });
    expect(meta.links.repo).toBeNull();
    expect(h.files["content/projects/fixture-hopital/fr.mdx"]).toMatch(/status: draft/);
  });

  it("masque les chaines `redact` et n'embarque aucun chemin du vault", async () => {
    const plan = await planAll(readVault(), EMPTY, TODAY);
    const r = plan.proposals.find((p) => p.slug === "fixture-redact")!;
    const text = Object.values(r.files).join("\n");
    expect(text).not.toContain("Oracle Cloud");
    expect(text).toContain("[masque]");
    for (const p of plan.proposals) expect(Object.values(p.files).join("\n")).not.toMatch(/1-Projects|3-Resources|Obsidian/);
  });

  it("est idempotent : relancer sans changement ne propose rien", async () => {
    const first = await planAll(readVault(), EMPTY, TODAY);
    const state = { fingerprints: Object.fromEntries(first.proposals.map((p) => [p.id, p.fingerprint])) };
    const second = await planAll(readVault(), state, TODAY);
    expect(second.proposals).toHaveLength(0);
  });

  it("produit des brouillons qui passent les schemas et les gardes du depot", async () => {
    const plan = await planAll(readVault(), EMPTY, TODAY);
    const tmp = mkdtempSync(join(tmpdir(), "sync-"));
    try {
      cpSync(join(REPO, "content"), join(tmp, "content"), { recursive: true });
      for (const p of plan.proposals) {
        for (const [path, text] of Object.entries(p.files)) {
          mkdirSync(dirname(join(tmp, path)), { recursive: true });
          writeFileSync(join(tmp, path), text);
        }
      }
      const { check } = await import("../tools/check_content.mjs");
      expect(check(tmp)).toEqual([]);
      const { check: noFake } = await import("../tools/check_no_fake_content.mjs");
      expect(noFake(tmp)).toEqual([]);
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });
});

describe("SESSIONS.md est un signal, pas une source", () => {
  const text = readFileSync(join(FIX, "SESSIONS.md"), "utf8");
  it("ne garde que des comptes", () => {
    const s = parseSessions(text);
    expect(s.total).toBe(3);
    expect(s.byProject["projet-a"]).toEqual({ sessions: 2, lastDate: "2026-10-08" });
    const dump = JSON.stringify(s);
    expect(dump).not.toMatch(/ACME|Candidature|sensible|1111/i);
  });
  it("n'apparait ni dans le rapport ni dans le corps de la PR", async () => {
    const plan = await planAll(readVault(), EMPTY, TODAY);
    const body = buildPrBody(plan, parseSessions(text), TODAY);
    expect(body).not.toMatch(/ACME|Candidature secrete|11111111/);
  });
});

describe("corps de PR", () => {
  it("ne cite ni Claude ni Anthropic, et refuse un corps qui le ferait", async () => {
    const plan = await planAll(readVault(), EMPTY, TODAY);
    const body = buildPrBody(plan, null, TODAY);
    expect(body.toLowerCase()).not.toMatch(/claude|anthropic|generated with/);
    const hostile = { proposals: [], ignored: [{ path: "x", reason: ["Genere par ", "Claude"].join("") }] };
    expect(() => buildPrBody(hostile, null, TODAY)).toThrow(/refuse/);
  });
});

describe("assainissement et frontmatter", () => {
  it("detecte un caractere invisible et lit le bloc portfolio", () => {
    expect(scan(`texte${String.fromCharCode(0x200b)}`).some((v) => v.category === "typographie")).toBe(true);
    const n = parseNote("---\nportfolio:\n  publish: true\n  kind: note\n  slug: a-b\n  locales: [fr, en]\n---\ncorps", "n.md");
    expect(n.portfolio).toMatchObject({ publish: true, kind: "note", slug: "a-b", locales: ["fr", "en"] });
    expect(parseNote("---\ntitle: x\n---\ncorps", "n.md").portfolio).toBeNull();
  });
});

const hasDeno = spawnSync("deno", ["--version"]).status === 0;
describe.skipIf(!hasDeno)("execution Deno aux permissions minimales", () => {
  it("lit la fixture sans reseau, sans environnement, sans sous-processus", () => {
    const r = spawnSync("deno", ["task", "sync:fixture"], { cwd: REPO, encoding: "utf8" });
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/Notes lues : 7/);
    expect(r.stdout).toMatch(/Dry-run/);
    expect(r.stdout).not.toMatch(/ACME|Candidature/);
  });
});
