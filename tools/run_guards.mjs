#!/usr/bin/env node
/** Lance les gardes de source (avant build). Echec dur : une seule garde rouge arrete la CI. */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const GUARDS = ["check_no_fake_content", "check_typography", "check_pii", "check_icons", "check_i18n", "check_content", "check_routes", "check_fonts"];

let failed = 0;
for (const g of GUARDS) {
  const r = spawnSync(process.execPath, [join(here, `${g}.mjs`)], { stdio: "inherit", cwd: process.cwd() });
  if (r.status !== 0) failed++;
}
if (failed) {
  console.error(`${failed} garde(s) rouge(s)`);
  process.exit(1);
}
console.log("toutes les gardes sont vertes");
