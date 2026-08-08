#!/usr/bin/env node
/**
 * Garde - aucun contenu mensonger dans le site.
 *
 * POURQUOI. Le site est parti d'un theme commercial dont le contenu de
 * demonstration a survecu au rebranding : un mur de marques partenaires
 * inventees, quatre publications fictives, et trois recommandations attribuees
 * nommement a des organisations reelles. Sur un site qui propose des
 * prestations, ce sont des allegations fausses sur les qualites du
 * professionnel (article L121-2 du code de la consommation).
 *
 * CE QU'ELLE VOIT. Trois familles de defauts, sur le contenu de src/ et public/
 * lu FICHIER ENTIER, jamais ligne a ligne - un motif qui s'ecrit sur deux
 * lignes doit etre attrape.
 *   1. Chaines interdites, comparaison insensible a la casse et aux accents.
 *   2. Objet ressemblant a une citation (champ `quote:`) sans champ `source:`.
 *   3. Pronoms d'agence, ce site parle a la premiere personne du singulier.
 *
 * CE QU'ELLE NE VOIT PAS, angles morts assumes et documentes.
 *   - Une fausse affirmation formulee autrement que par les chaines listees.
 *     Aucune liste ne remplace la relecture humaine.
 *   - Une variante orthographique non listee, par exemple un nom coupe par un
 *     espace ou un tiret. Verifie au sabotage, echec accepte.
 *   - Le contenu de tools/, exclu par CHEMIN et non par contenu, parce que ce
 *     fichier contient forcement la liste. Rien de tools/ n'est servi au
 *     visiteur. L'exclusion ne porte jamais sur des commentaires : une chaine
 *     interdite ecrite dans un commentaire de src/ fait echouer la garde, et
 *     c'est voulu.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const SCANNED_DIRS = ["src", "public"];
const SCANNED_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".json", ".html", ".txt", ".md"];

/** Marques partenaires inventees, heritees du contenu de demonstration. */
const FAKE_BRANDS = [
  "NEURALDYNAMICS",
  "QUANTUM AI",
  "SYNAPSE CORP",
  "AEGIS LABS",
  "HYPERSTACK",
  "CYBERNEXUS",
  "VECTORHUB",
  "CORTEX AI",
  "DEEPVISION",
  "DATAGRID",
];

/** Accroches de preuve sociale ou de production editoriale non averees. */
const FAKE_CLAIMS = [
  "FAIT CONFIANCE PAR",
  "ARTICLES PUBLIES",
  "RECOMMANDATIONS & RETOURS TERRAIN",
];

/** Signataires des recommandations inventees. */
const FAKE_AUTHORS = [
  "TUTEUR DE STAGE & ALTERNANCE",
  "CONSEIL DE DIRECTION",
  "CLIENT & COLLABORATEUR FREELANCE",
];

/** Le site parle a la premiere personne du singulier, pas au nom d'une agence. */
const AGENCY_PRONOUNS = [
  "NOS REALISATIONS",
  "NOTRE EQUIPE",
  "NOUS CONCEVONS",
  "NOTRE STUDIO",
  "NOS CLIENTS",
];

const DENYLIST = [
  ...FAKE_BRANDS.map((v) => ({ value: v, why: "marque partenaire inventee" })),
  ...FAKE_CLAIMS.map((v) => ({ value: v, why: "preuve sociale non averee" })),
  ...FAKE_AUTHORS.map((v) => ({ value: v, why: "signataire de recommandation inventee" })),
  ...AGENCY_PRONOUNS.map((v) => ({ value: v, why: "ton agence, le site parle au singulier" })),
];

/**
 * Normalise pour la comparaison, et garde la trace de l'origine de chaque
 * caractere afin que le numero de ligne rapporte reste exact.
 *
 * Trois transformations, chacune pour un mode d'evasion constate au sabotage :
 *   - accents retires, pour que "PUBLIÉS" et "PUBLIES" se comparent ;
 *   - majuscules, pour ignorer la casse ;
 *   - toute suite d'espaces, de tabulations ou de retours a la ligne reduite a
 *     UN espace, pour qu'une chaine coupee en deux par le formatage JSX reste
 *     detectee. C'est le defaut qui avait rendu une garde precedente aveugle.
 */
function normalizeWithMap(text) {
  let out = "";
  const map = [];
  let previousWasSpace = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (/\s/.test(char)) {
      if (!previousWasSpace) {
        out += " ";
        map.push(i);
        previousWasSpace = true;
      }
      continue;
    }
    previousWasSpace = false;
    const folded = char.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
    for (const piece of folded) {
      out += piece;
      map.push(i);
    }
  }
  return { text: out, map };
}

const normalizePattern = (value) => normalizeWithMap(value).text;

function collectFiles(dir, acc = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return acc;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
      collectFiles(full, acc);
    } else if (SCANNED_EXTENSIONS.some((ext) => entry.endsWith(ext))) {
      acc.push(full);
    }
  }
  return acc;
}

/**
 * Localise une correspondance pour l'afficher. La recherche porte sur le
 * contenu entier ; ce calcul ne sert qu'au message d'erreur.
 */
function lineOf(haystack, index) {
  return haystack.slice(0, index).split("\n").length;
}

const failures = [];

for (const dir of SCANNED_DIRS) {
  for (const file of collectFiles(join(ROOT, dir))) {
    const rel = relative(ROOT, file).split(sep).join("/");
    // Exclusion par CHEMIN, jamais par contenu.
    if (rel.startsWith("tools/")) continue;

    const raw = readFileSync(file, "utf8");
    const { text: haystack, map } = normalizeWithMap(raw);

    for (const { value, why } of DENYLIST) {
      const needle = normalizePattern(value);
      const at = haystack.indexOf(needle);
      if (at !== -1) {
        // map[at] ramene a l'index reel dans le fichier d'origine, donc la
        // ligne rapportee reste juste malgre la normalisation.
        failures.push(`${rel}:${lineOf(raw, map[at])} - chaine interdite "${value}" (${why})`);
      }
    }

    // Regle structurelle : une citation doit porter sa source.
    // On decoupe sur les accolades ouvrantes pour isoler chaque litteral d'objet,
    // en travaillant sur le texte complet et non sur des lignes isolees.
    const objectChunks = raw.split("{");
    for (const chunk of objectChunks) {
      const body = chunk.split("}")[0];
      if (/\bquote\s*:/.test(body) && !/\bsource\s*:/.test(body)) {
        const at = raw.indexOf(body);
        failures.push(
          `${rel}:${lineOf(raw, at)} - citation sans champ "source". Une recommandation ne se publie qu'avec une source verifiable et l'accord de son auteur.`,
        );
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Garde contenu mensonger - ECHEC\n");
  for (const failure of failures) console.error(`  ${failure}`);
  console.error(`\n${failures.length} probleme(s). Voir l'en-tete de tools/check_no_fake_content.mjs.`);
  process.exit(1);
}

console.log("Garde contenu mensonger - OK");
process.exit(0);
