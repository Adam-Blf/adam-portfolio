#!/usr/bin/env node
/** Imprime la table des contrastes mesures (utilisee pour le rapport et la preuve). */
import { measureAll } from "./lib/contrast.mjs";

const rows = measureAll(process.cwd());
for (const r of rows) console.log(`${r.ok ? "ok  " : "ECHEC"} ${r.theme.padEnd(5)} ${String(r.ratio).padStart(6)}:1 (min ${r.min})  ${r.name}`);
if (rows.some((r) => !r.ok)) process.exit(1);
