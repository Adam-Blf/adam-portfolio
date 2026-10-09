#!/usr/bin/env node
/** Garde : icones Reicon uniquement. Aucune autre bibliotheque d'icones, aucun emoji dans le code. */
import { read, rel, runCli, walk } from "./lib/rules.mjs";
import { join } from "node:path";

const BANNED = /from\s+["'](lucide-react|@phosphor-icons\/[^"']+|@heroicons\/[^"']+|heroicons[^"']*|react-icons[^"']*|@radix-ui\/react-icons|@tabler\/icons-react|phosphor-react)["']/;
const EMOJI = /\p{Extended_Pictographic}/u;

export function check(root) {
  const problems = [];
  for (const file of walk(join(root, "src"), new Set([".ts", ".tsx"]))) {
    const text = read(file);
    const where = rel(root, file);
    const m = BANNED.exec(text);
    if (m) problems.push(`${where} : import interdit "${m[1]}"`);
    const e = EMOJI.exec(text);
    if (e) problems.push(`${where} : emoji "${e[0]}"`);
  }
  return problems;
}

await runCli("icons", check, import.meta.url);
