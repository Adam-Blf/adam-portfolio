#!/usr/bin/env node
/**
 * Garde : aucun contenu mensonger ni interdit dans content/, messages/ et src/.
 * Termes interdits (produits d'IA, certifications, intitules), formules de
 * recherche d'emploi (recherche discrete), pronoms d'agence (Adam est seul).
 * Lit chaque fichier en entier : un motif sur deux lignes serait manque ligne a ligne.
 */
import { AGENCY_PRONOUNS, FORBIDDEN_CASED, FORBIDDEN_TERMS, SEARCH_PHRASES, localeOf, normalise, read, rel, runCli, walk } from "./lib/rules.mjs";
import { join } from "node:path";

export function check(root) {
  const problems = [];
  const files = ["content", "messages", "src"].flatMap((d) => walk(join(root, d)));
  for (const file of files) {
    const raw = read(file);
    const text = normalise(raw);
    const where = rel(root, file);
    for (const { re, why } of FORBIDDEN_TERMS) {
      const m = re.exec(text);
      if (m) problems.push(`${where} : "${m[0]}" (${why})`);
    }
    for (const { re, why } of FORBIDDEN_CASED) {
      const m = re.exec(raw);
      if (m) problems.push(`${where} : "${m[0]}" (${why})`);
    }
    for (const re of SEARCH_PHRASES) {
      const m = re.exec(text);
      if (m) problems.push(`${where} : "${m[0]}" (formule de recherche d'emploi)`);
    }
    const loc = localeOf(file);
    if (loc && !where.startsWith("src/")) {
      const m = AGENCY_PRONOUNS[loc].exec(text);
      if (m) problems.push(`${where} : pronom d'agence "${m[0]}"`);
    }
  }
  return problems;
}

await runCli("no_fake_content", check, import.meta.url);
