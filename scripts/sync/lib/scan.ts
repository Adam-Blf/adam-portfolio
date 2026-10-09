/**
 * Assainissement : echec dur, pas d'avertissement. Un brouillon qui contient un motif de la liste noire,
 * une donnee personnelle, un caractere invisible ou une chaine de secret n'est jamais propose.
 * Les listes viennent de tools/lib/rules.mjs, la meme source que les gardes du depot.
 */
// @ts-ignore module JavaScript, types inferes par Deno et absents pour tsc
import * as rules from "../../../tools/lib/rules.mjs";

export type Violation = { category: string; detail: string };

const SENSITIVE = new Set(["secret", "donnee personnelle", "sante"]);

function add(out: Violation[], category: string, detail: string) {
  out.push({ category, detail: SENSITIVE.has(category) ? "(valeur non reproduite)" : detail });
}

export function scan(raw: string, locale = "fr"): Violation[] {
  const out: Violation[] = [];
  const text: string = rules.normalise(raw);
  for (const { re, why } of rules.FORBIDDEN_TERMS as { re: RegExp; why: string }[]) {
    const m = re.exec(text);
    if (m) add(out, "liste noire", `"${m[0]}" (${why})`);
  }
  for (const { re, why } of rules.FORBIDDEN_CASED as { re: RegExp; why: string }[]) {
    const m = re.exec(raw);
    if (m) add(out, "liste noire", `"${m[0]}" (${why})`);
  }
  for (const re of rules.SEARCH_PHRASES as RegExp[]) {
    const m = re.exec(text);
    if (m) add(out, "recherche discrete", `"${m[0]}"`);
  }
  const pron = (rules.AGENCY_PRONOUNS as Record<string, RegExp>)[locale];
  const p = pron?.exec(text);
  if (p) add(out, "voix", `pronom d'agence "${p[0]}"`);
  for (const re of rules.HOSPITAL_IDENTIFIERS as RegExp[]) {
    const m = re.exec(text);
    if (m) add(out, "etablissement", `"${m[0]}"`);
  }
  for (const re of rules.SECRET_PATTERNS as RegExp[]) if (re.test(raw)) add(out, "secret", "motif de cle ou de jeton");
  for (const re of [rules.PHONE, rules.NIR, rules.IBAN, rules.SIRET] as RegExp[]) {
    for (const m of raw.matchAll(re)) {
      const digits = m[0].replace(/[^\d+]/g, "");
      const allowed = (rules.ALLOWED_PHONES as string[]).some((a) => a.replace(/[^\d+]/g, "") === digits);
      if (!allowed) add(out, "donnee personnelle", "telephone ou identifiant");
    }
  }
  for (const m of raw.matchAll(rules.EMAIL as RegExp)) {
    if (m[0].toLowerCase() !== rules.PUBLIC_EMAIL) add(out, "donnee personnelle", "adresse e-mail");
  }
  if (/\b(patient|patiente|ipp|iep)\b/i.test(raw) && /\b[A-Z]{2,}\s+[A-Z][a-z]+\b/.test(raw)) {
    add(out, "sante", "mention de patient avec un nom possible");
  }
  for (const ch of raw) {
    const why = rules.badChar(ch.codePointAt(0)) as string | null;
    if (why) add(out, "typographie", why);
  }
  return out;
}

/** Masque les chaines demandees par la note (`redact`), avant toute autre etape. */
export function redactAll(text: string, redact: string[]): string {
  let out = text;
  for (const r of redact) if (r) out = out.split(r).join("[masque]");
  return out;
}
