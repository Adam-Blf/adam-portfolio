/**
 * Corps de la PR de synchro. Genere, puis verifie contre la liste noire avant d'etre utilise :
 * une PR ne cite jamais un outil, une marque d'IA, un chemin du poste ou un titre de session.
 */
import { scan } from "./scan.ts";
import type { Plan } from "./plan.ts";
import type { SessionSignals } from "./sessions.ts";

export function buildPrBody(plan: Plan, signals: SessionSignals | null, today: string): string {
  const lines: string[] = [`Synchro du ${today}. Brouillons a relire, rien n'est publie.`, ""];
  lines.push("## Provenance", "", "| Fichier | Identifiant de source | Type |", "|---|---|---|");
  for (const p of plan.proposals) {
    for (const f of Object.keys(p.files)) lines.push(`| \`${f}\` | \`${p.id}\` | ${p.kind} |`);
  }
  if (!plan.proposals.length) lines.push("| (aucune) | | |");
  const gated = plan.proposals.filter((p) => p.needsApproval.length);
  if (gated.length) {
    lines.push("", "## Accords requis avant publication", "");
    for (const p of gated) lines.push(`- \`${p.slug}\` : ${p.needsApproval.join(" ; ")}`);
  }
  lines.push("", "## Checklist de relecture", "", "- [ ] Reecrire dans ma voix, sans tournure de texte genere");
  lines.push("- [ ] Renseigner moi-meme `approvals`, `reviewedBy` et `reviewedOn`");
  lines.push("- [ ] Traduire en EN et ES apres relecture du FR", "- [ ] Passer `publish` a `true` seulement si tout est valide");
  if (plan.ignored.length) {
    lines.push("", "## Notes ignorees", "");
    for (const i of plan.ignored) lines.push(`- ${i.reason}`);
  }
  if (signals) {
    lines.push("", "## Activite recente (comptes seulement)", "", `${signals.total} sessions indexees, sur ${Object.keys(signals.byProject).length} projets.`);
  }
  const body = lines.join("\n");
  const bad = scan(body, "fr").filter((v) => v.category === "liste noire" || v.category === "secret" || v.category === "donnee personnelle");
  if (bad.length) throw new Error(`Corps de PR refuse par l'assainissement : ${bad.map((b) => b.category).join(", ")}`);
  return body;
}
