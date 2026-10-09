/**
 * Synchro vault vers PR : PROPOSER, JAMAIS PUBLIER.
 *
 *   deno task sync:dry     lit le vault, calcule le plan, ecrit .sync/report.json, ne touche a rien d'autre
 *   deno task sync:apply   cree la branche sync/AAAA-MM-JJ, ecrit content/, committe, ouvre une PR en brouillon
 *
 * Ne publie pas, ne fusionne pas, ne pousse jamais sur main, n'ecrit ni approvals ni reviewedBy ni reviewedOn,
 * ne lit ni .env ni 00_Sensible, ne copie aucun titre de session. Permissions : voir deno.json.
 */
import { planAll, type SyncState, type VaultNote } from "./lib/plan.ts";
import { parseSessions } from "./lib/sessions.ts";
import { buildPrBody } from "./lib/pr.ts";

const VAULT_DIRS = ["1-Projects", "2-Areas/Career", "3-Resources"];
const IDENTITY = ["-c", "user.name=Adam Beloucif", "-c", "user.email=adam.beloucif@efrei.net"];

function arg(name: string, fallback: string): string {
  const hit = Deno.args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
}

async function* walk(dir: string): AsyncGenerator<string> {
  try {
    for await (const e of Deno.readDir(dir)) {
      const full = `${dir}/${e.name}`;
      if (e.isDirectory) yield* walk(full);
      else if (e.isFile && e.name.endsWith(".md")) yield full;
    }
  } catch {
    // dossier absent : on passe
  }
}

async function run(cmd: string, args: string[], cwd: string): Promise<string> {
  const out = await new Deno.Command(cmd, { args, cwd, stdout: "piped", stderr: "piped" }).output();
  if (!out.success) throw new Error(`${cmd} ${args.slice(0, 3).join(" ")} a echoue : ${new TextDecoder().decode(out.stderr).slice(0, 300)}`);
  return new TextDecoder().decode(out.stdout).trim();
}

async function readState(repo: string): Promise<SyncState> {
  try {
    return JSON.parse(await Deno.readTextFile(`${repo}/content/.sync-state.json`)) as SyncState;
  } catch {
    return { fingerprints: {} };
  }
}

const apply = Deno.args.includes("--apply");
const repo = arg("repo", Deno.cwd().replaceAll("\\", "/"));
const vault = arg("vault", "C:/Users/adamb/Documents/Obsidian/Claude");
const sessionsFile = arg("sessions", "C:/Users/adamb/.claude/SESSIONS.md");
const today = new Date().toISOString().slice(0, 10);

const notes: VaultNote[] = [];
for (const d of VAULT_DIRS) {
  for await (const file of walk(`${vault}/${d}`)) {
    const name = file.split("/").pop() ?? file;
    notes.push({ path: file.slice(vault.length + 1), name, text: await Deno.readTextFile(file) });
  }
}

const state = await readState(repo);
const plan = await planAll(notes, state, today);
let signals = null;
try {
  signals = parseSessions(await Deno.readTextFile(sessionsFile));
} catch {
  signals = null;
}

await Deno.mkdir(`${repo}/.sync`, { recursive: true });
const report = {
  date: today,
  mode: apply ? "apply" : "dry-run",
  notesScanned: notes.length,
  proposals: plan.proposals.map((p) => ({ id: p.id, kind: p.kind, slug: p.slug, files: Object.keys(p.files), needsApproval: p.needsApproval })),
  ignored: plan.ignored.map((i) => ({ reason: i.reason, detail: i.detail ?? null })),
  sessions: signals,
};
await Deno.writeTextFile(`${repo}/.sync/report.json`, JSON.stringify(report, null, 2));
await Deno.writeTextFile(`${repo}/.sync/sync.log`, `${new Date().toISOString()} ${report.mode} notes=${notes.length} propositions=${plan.proposals.length} ignorees=${plan.ignored.length}\n`, { append: true });

console.log(`Notes lues : ${notes.length} (dossiers : ${VAULT_DIRS.join(", ")})`);
console.log(`Propositions : ${plan.proposals.length}, ignorees : ${plan.ignored.length}`);
for (const p of plan.proposals) console.log(`  + ${p.kind} ${p.slug} (${Object.keys(p.files).length} fichiers)${p.needsApproval.length ? " [accord requis]" : ""}`);
for (const i of plan.ignored) console.log(`  - ${i.reason}`);
if (signals) console.log(`Activite : ${signals.total} sessions, ${Object.keys(signals.byProject).length} projets (comptes seulement)`);

if (!apply) {
  console.log("Dry-run : aucun fichier de content/ ecrit, aucune branche, aucune PR.");
  Deno.exit(0);
}
if (!plan.proposals.length) {
  console.log("Rien a proposer : aucune branche, aucune PR (idempotent).");
  Deno.exit(0);
}

if ((await run("git", ["status", "--porcelain"], repo)) !== "") throw new Error("Arbre de travail sale : committer ou ranger avant la synchro.");
const branch = `sync/${today}`;
await run("git", ["checkout", "-b", branch], repo);
for (const p of plan.proposals) {
  for (const [path, text] of Object.entries(p.files)) {
    await Deno.mkdir(`${repo}/${path.split("/").slice(0, -1).join("/")}`, { recursive: true });
    await Deno.writeTextFile(`${repo}/${path}`, text);
  }
  state.fingerprints[p.id] = p.fingerprint;
  await Deno.writeTextFile(`${repo}/content/.sync-state.json`, `${JSON.stringify(state, null, 2)}\n`);
  await run("git", ["add", "content"], repo);
  await run("git", [...IDENTITY, "commit", "-m", `Add draft ${p.kind} ${p.slug} from the vault`], repo);
}
await run("node", ["tools/run_guards.mjs"], repo);
try {
  await run("gitleaks", ["detect", "--no-git", "--source", "content", "--no-banner"], repo);
} catch (e) {
  if (!(e instanceof Deno.errors.NotFound)) throw e;
  console.log("gitleaks absent : seul l'assainissement interne a verifie les secrets.");
}
if (await run("git", ["rev-parse", "--abbrev-ref", "HEAD"], repo) === "main") throw new Error("Refus : jamais de PR depuis main.");
await run("git", ["push", "-u", "origin", branch], repo);
const body = buildPrBody(plan, signals, today);
console.log(await run("gh", ["pr", "create", "--draft", "--base", "main", "--head", branch, "--title", `Sync: draft content from the vault (${today})`, "--body", body, "--label", "needs-review"], repo));
