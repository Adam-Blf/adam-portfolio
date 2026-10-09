// Regles partagees par les gardes de tools/ et par le script de synchro (scripts/sync).
// Une seule liste : deux listes divergent au premier ajout.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

/** Minuscules, sans accents, apostrophes typographiques ramenees a l'apostrophe droite. */
export function normalise(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[‘’]/g, "'")
    .toLowerCase();
}

/** Termes interdits partout dans le contenu public (decisions d'Adam, CLAUDE.md sections 1 et 10). */
export const FORBIDDEN_TERMS = [
  { re: /\baz-?900\b/, why: "certification Azure interdite" },
  { re: /\bai-?900\b/, why: "certification Azure interdite" },
  { re: /\bclaude\b/, why: "produit d'IA commercial" },
  { re: /\banthropic\b/, why: "produit d'IA commercial" },
  { re: /\bllms?\b/, why: "terme interdit (dire modeles de langage, NLP, agents)" },
  { re: /\bgroq\b/, why: "produit d'IA commercial" },
  { re: /\bllama\b/, why: "produit d'IA commercial" },
  { re: /sentence[- ]transformers/, why: "produit d'IA commercial" },
  { re: /\baerogligli\b/, why: "aviation hors candidature" },
  { re: /president bde efrei/, why: "intitule interdit" },
  { re: /secretaire general bda/, why: "intitule interdit" },
  { re: /professeur de danse rock efreestyle/, why: "intitule interdit" },
  { re: /fondateur douille/, why: "intitule interdit" },
  { re: /chevilly-?larue/, why: "commune de residence, ne jamais afficher" },
  { re: /great movements/, why: "reference sans accord" },
  { re: /neuraldynamics|quantum ai|synapse corp|aegis labs|hyperstack|cybernexus|vectorhub|cortex ai|deepvision|datagrid/, why: "marque inventee" },
];

/** Le sigle BIA se teste sur le texte d'origine (la casse distingue le sigle du mot espagnol). */
export const FORBIDDEN_CASED = [{ re: /\bBIA\b/, why: "brevet aeronautique hors candidature" }];

/** Formules de recherche d'emploi : la recherche reste discrete (decision du 23/09/2026). Texte normalise. */
export const SEARCH_PHRASES = [
  /\bdisponibles?\b/,
  /open to work/,
  /\ben recherche\b/,
  /a la recherche/,
  /available for/,
  /disponible para/,
  /looking for (a|an) (internship|work-study|apprentice)/,
  /buscando (una )?(alternancia|practicas)/,
  /recherche d'alternance/,
  /alternance (de |en )?sept/,
  /recruiter|recruteur|reclutador/,
];

/** Pronoms d'agence : ce site parle a la premiere personne du singulier. Par langue, texte normalise. */
export const AGENCY_PRONOUNS = {
  fr: /\b(nous|notre|nos)\b/,
  en: /\b(we|our|ours)\b/,
  es: /\b(nosotros|nuestr[oa]s?)\b/,
};

/** Noms qui identifieraient l'etablissement ou un outil hospitalier. Texte normalise. */
export const HOSPITAL_IDENTIFIERS = [
  /paul guiraud/,
  /fondation vallee/,
  /\bght\b/,
  /psysudparis/,
  /\bdxcare\b/,
  /\bcpage\b/,
  /sovereign[ _-]?os/,
  /pgvplaning/,
  /absencia/,
  /\bpinel\b/,
  /dimmoulinette/,
  /pmsi_tools/,
];

export const PHONE = /(?<![\dA-Za-z.\-/])(?:\+\d{1,3}[ .-]?\d{1,4}(?:[ .-]?\d{2,4}){2,4}|0\d(?:[ .-]?\d{2}){4})(?![\d])/g;
export const NIR = /\b[12][ ]?\d{2}[ ]?(?:0[1-9]|1[0-2])[ ]?\d{2}[ ]?\d{3}[ ]?\d{3}(?:[ ]?\d{2})?\b/g;
export const IBAN = /\b[A-Z]{2}\d{2}(?:[ ]?[A-Z0-9]{4}){3,7}\b/g;
export const SIRET = /\b\d{3}[ ]?\d{3}[ ]?\d{3}[ ]?\d{5}\b/g;
export const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;


/** Chaines de secret : cles API, jetons, cles privees. */
export const SECRET_PATTERNS = [
  /\bgh[pousr]_[A-Za-z0-9]{20,}/,
  /\bsbp_[A-Za-z0-9]{20,}/,
  /\bsk[-_](live|test|proj)?[-_]?[A-Za-z0-9]{20,}/,
  /\bre_[A-Za-z0-9]{20,}/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{10,}/,
];

export const PUBLIC_EMAIL = "adam.beloucif@efrei.net";
/** Telephone de l'hebergeur, seul numero admis dans le depot. */
export const ALLOWED_PHONES = ["+1 559 288 7060"];

/** Caracteres interdits : tiret long, demi-cadratin, mediopoint, invisibles. Codes, jamais litteraux. */
export const BAD_CHARS = [
  [0x2014, "tiret long"],
  [0x2013, "demi-cadratin"],
  [0x00b7, "mediopoint"],
  [0x00ad, "trait d'union conditionnel"],
  [0x200b, "espace de largeur nulle"],
  [0x200c, "antiliant de largeur nulle"],
  [0x200d, "liant de largeur nulle"],
  [0x200e, "marque gauche-droite"],
  [0x200f, "marque droite-gauche"],
  [0x2060, "liant de mots"],
  [0xfeff, "BOM ou espace insecable de largeur nulle"],
];
const BAD_RANGES = [
  [0x202a, 0x202e, "controle bidirectionnel"],
  [0x2066, 0x2069, "isolat bidirectionnel"],
  [0xe0000, 0xe007f, "caractere tag"],
];

/** Retourne la description du caractere interdit, ou null. */
export function badChar(cp) {
  for (const [code, name] of BAD_CHARS) if (cp === code) return name;
  for (const [a, b, name] of BAD_RANGES) if (cp >= a && cp <= b) return name;
  return null;
}

export const TEXT_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".json", ".md", ".mdx", ".html", ".txt", ".svg"]);

/** Parcours recursif, retourne des chemins absolus. */
export function walk(dir, exts = TEXT_EXT, skip = ["node_modules", ".next", ".git"]) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    if (skip.includes(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full, exts, skip));
    else if ([...exts].some((e) => name.endsWith(e))) out.push(full);
  }
  return out;
}

export function rel(root, file) {
  return relative(root, file).split(sep).join("/");
}

export function read(file) {
  return readFileSync(file, "utf8");
}

/** Langue d'un fichier de contenu ou de messages, d'apres son nom. */
export function localeOf(path) {
  const m = /(?:^|[\\/])(fr|en|es)\.(?:mdx|json)$/.exec(path);
  return m ? m[1] : null;
}

/** Cree une garde executable en ligne de commande a partir de sa fonction check(root). */
export async function runCli(name, check, importMetaUrl) {
  const { pathToFileURL } = await import("node:url");
  if (process.argv[1] && pathToFileURL(process.argv[1]).href === importMetaUrl) {
    const problems = check(process.cwd());
    if (problems.length) {
      console.error(`[${name}] ${problems.length} probleme(s)`);
      for (const p of problems) console.error(`  - ${p}`);
      process.exit(1);
    }
    console.log(`[${name}] ok`);
  }
}
