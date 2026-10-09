#!/usr/bin/env node
/**
 * Garde : aucune donnee personnelle ni identifiant d'etablissement dans content/, messages/ et src/.
 * Telephones (sauf celui de l'hebergeur), NIR, IBAN, SIRET, e-mails autres que l'adresse publique,
 * noms qui identifieraient l'etablissement hospitalier ou ses outils.
 */
import { ALLOWED_PHONES, EMAIL, HOSPITAL_IDENTIFIERS, IBAN, NIR, PHONE, PUBLIC_EMAIL, SIRET, normalise, read, rel, runCli, walk } from "./lib/rules.mjs";
import { join } from "node:path";

export function check(root) {
  const problems = [];
  for (const dir of ["content", "messages", "src"]) {
    for (const file of walk(join(root, dir))) {
      const raw = read(file);
      const where = rel(root, file);
      for (const m of raw.matchAll(PHONE)) {
        const digits = m[0].replace(/[^\d+]/g, "");
        if (!ALLOWED_PHONES.some((p) => p.replace(/[^\d+]/g, "") === digits)) problems.push(`${where} : telephone "${m[0]}"`);
      }
      for (const [re, name] of [[NIR, "NIR"], [IBAN, "IBAN"], [SIRET, "SIRET"]]) {
        for (const m of raw.matchAll(re)) problems.push(`${where} : ${name} "${m[0]}"`);
      }
      for (const m of raw.matchAll(EMAIL)) {
        if (m[0].toLowerCase() !== PUBLIC_EMAIL) problems.push(`${where} : adresse e-mail "${m[0]}"`);
      }
      const text = normalise(raw);
      for (const re of HOSPITAL_IDENTIFIERS) {
        const m = re.exec(text);
        if (m) problems.push(`${where} : identifiant d'etablissement ou d'outil hospitalier "${m[0]}"`);
      }
    }
  }
  return problems;
}

await runCli("pii", check, import.meta.url);
