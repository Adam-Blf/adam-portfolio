#!/usr/bin/env node
/**
 * Garde : aucun tiret long, demi-cadratin, mediopoint ni caractere invisible
 * dans content/, messages/ et src/. Les invisibles cassent en silence un grep,
 * un lien ou un identifiant CSS.
 */
import { badChar, read, rel, runCli, walk } from "./lib/rules.mjs";
import { join } from "node:path";

export function check(root) {
  const problems = [];
  for (const dir of ["content", "messages", "src", "scripts", "docs"]) {
    for (const file of walk(join(root, dir))) {
      const text = read(file);
      let line = 1;
      for (const ch of text) {
        if (ch === "\n") line++;
        const why = badChar(ch.codePointAt(0));
        if (why) problems.push(`${rel(root, file)}:${line} : ${why} (U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")})`);
      }
    }
  }
  return problems;
}

await runCli("typography", check, import.meta.url);
