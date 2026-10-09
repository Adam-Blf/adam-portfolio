import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Chaque garde est vue ROUGE sur un cas saboté, puis verte sur le dépôt réel.
// Les cas sabotés sont construits ici (jamais committés) : un caractère interdit
// écrit dans un fichier du dépôt ferait échouer la garde elle-même.

const REPO = process.cwd();
const dash = String.fromCharCode(0x2014);
const zeroWidth = String.fromCharCode(0x200b);
const bannedIconLib = ["lucide", "react"].join("-");
const bannedFont = ["In", "ter"].join("");

async function guard(name: string): Promise<(root: string) => string[]> {
  const mod = await import(`../tools/${name}.mjs`);
  return mod.check;
}

let tmp = "";
beforeEach(() => {
  tmp = mkdtempSync(join(tmpdir(), "guard-"));
  for (const d of ["content", "messages", "src"]) mkdirSync(join(tmp, d), { recursive: true });
});
afterEach(() => rmSync(tmp, { recursive: true, force: true }));

function put(path: string, text: string) {
  const full = join(tmp, path);
  mkdirSync(join(full, ".."), { recursive: true });
  writeFileSync(full, text);
}

describe("check_no_fake_content", () => {
  it("est rouge sur une formule de recherche d'emploi", async () => {
    put("content/projects/x/fr.mdx", "Disponible en alternance dès septembre.");
    expect((await guard("check_no_fake_content"))(tmp).join("\n")).toMatch(/disponible/);
  });
  it("est rouge sur une certification Azure et un produit d'IA", async () => {
    put("content/a.md", "AZ-900 en préparation, avec Claude et un LLM.");
    const out = (await guard("check_no_fake_content"))(tmp).join("\n");
    expect(out).toMatch(/az-900/);
    expect(out).toMatch(/claude/);
    expect(out).toMatch(/llm/);
  });
  it("est rouge sur un pronom d'agence en français", async () => {
    put("content/projects/x/fr.mdx", "Nous livrons votre site.");
    expect((await guard("check_no_fake_content"))(tmp).join("\n")).toMatch(/pronom d'agence/);
  });
  it("est rouge sur la commune de résidence", async () => {
    put("messages/fr.json", '{"a":"Chevilly-Larue"}');
    expect((await guard("check_no_fake_content"))(tmp).join("\n")).toMatch(/residence/);
  });
  it("est verte sur le dépôt", async () => {
    expect((await guard("check_no_fake_content"))(REPO)).toEqual([]);
  });
});

describe("check_typography", () => {
  it("est rouge sur un tiret long et un caractère invisible", async () => {
    put("content/a.md", `Titre ${dash} suite${zeroWidth}`);
    const out = (await guard("check_typography"))(tmp).join("\n");
    expect(out).toMatch(/tiret long/);
    expect(out).toMatch(/largeur nulle/);
  });
  it("est verte sur le dépôt", async () => {
    expect((await guard("check_typography"))(REPO)).toEqual([]);
  });
});

describe("check_pii", () => {
  it("est rouge sur un téléphone, une adresse e-mail tierce et un nom d'établissement", async () => {
    put("content/a.md", "Appelez le 06 12 34 56 78, ecrivez a quelqu@exemple.fr, Paul Guiraud.");
    const out = (await guard("check_pii"))(tmp).join("\n");
    expect(out).toMatch(/telephone/);
    expect(out).toMatch(/e-mail/);
    expect(out).toMatch(/etablissement/);
  });
  it("admet le téléphone de l'hébergeur et l'adresse publique", async () => {
    put("messages/fr.json", '{"a":"Tel : +1 559 288 7060, adam.beloucif@efrei.net"}');
    expect((await guard("check_pii"))(tmp)).toEqual([]);
  });
  it("est verte sur le dépôt", async () => {
    expect((await guard("check_pii"))(REPO)).toEqual([]);
  });
});

describe("check_icons", () => {
  it("est rouge sur une bibliothèque d'icônes bannie et sur un emoji", async () => {
    put("src/a.tsx", `import { Mail } from "${bannedIconLib}";\nexport const A = () => <p>ok \u{1F680}</p>;`);
    const out = (await guard("check_icons"))(tmp).join("\n");
    expect(out).toMatch(/import interdit/);
    expect(out).toMatch(/emoji/);
  });
  it("est verte sur le dépôt", async () => {
    expect((await guard("check_icons"))(REPO)).toEqual([]);
  });
});

describe("check_i18n", () => {
  it("est rouge quand une clé manque dans es.json", async () => {
    put("messages/fr.json", '{"a":1,"b":2}');
    put("messages/en.json", '{"a":1,"b":2}');
    put("messages/es.json", '{"a":1}');
    expect((await guard("check_i18n"))(tmp).join("\n")).toMatch(/cle manquante b/);
  });
  it("est rouge quand une langue de projet manque", async () => {
    for (const l of ["fr", "en", "es"]) put(`messages/${l}.json`, "{}");
    put("content/projects/x/fr.mdx", "---\nstatus: published\n---\n");
    put("content/projects/x/en.mdx", "---\nstatus: published\n---\n");
    expect((await guard("check_i18n"))(tmp).join("\n")).toMatch(/desalignees/);
  });
  it("est verte sur le dépôt", async () => {
    expect((await guard("check_i18n"))(REPO)).toEqual([]);
  });
});

describe("check_content", () => {
  function seed() {
    cpSync(join(REPO, "content"), join(tmp, "content"), { recursive: true });
  }
  it("est rouge sur un projet hospitalier avec lien de dépôt", async () => {
    seed();
    const p = join(tmp, "content/projects/station-pmsi/meta.json");
    const meta = JSON.parse(readFileSync(p, "utf8"));
    meta.links.repo = "https://github.com/Adam-Blf/exemple";
    writeFileSync(p, JSON.stringify(meta));
    expect((await guard("check_content"))(tmp).join("\n")).toMatch(/aucun lien vers le code/);
  });
  it("est rouge sur un projet client publié sans accord", async () => {
    seed();
    const p = join(tmp, "content/projects/ohypnozen/meta.json");
    const meta = JSON.parse(readFileSync(p, "utf8"));
    meta.visibility.approvals.client = null;
    writeFileSync(p, JSON.stringify(meta));
    expect((await guard("check_content"))(tmp).join("\n")).toMatch(/accord du client requis/);
  });
  it("est rouge sur un chiffre sans source", async () => {
    seed();
    const p = join(tmp, "content/metrics.json");
    const m = JSON.parse(readFileSync(p, "utf8"));
    delete m.attacks_replayed;
    writeFileSync(p, JSON.stringify(m));
    expect((await guard("check_content"))(tmp).join("\n")).toMatch(/absent de metrics\.json/);
  });
  it("est rouge sur une compétence sans projet qui la prouve", async () => {
    seed();
    const p = join(tmp, "content/skills.json");
    const s = JSON.parse(readFileSync(p, "utf8"));
    s[0].items[0].proofs = ["projet-fantome"];
    writeFileSync(p, JSON.stringify(s));
    expect((await guard("check_content"))(tmp).join("\n")).toMatch(/projet inconnu/);
  });
  it("est verte sur le dépôt", async () => {
    expect((await guard("check_content"))(REPO)).toEqual([]);
  });
});

describe("check_routes", () => {
  function seed() {
    mkdirSync(join(tmp, "src/i18n"), { recursive: true });
    mkdirSync(join(tmp, "src/app/[locale]/about"), { recursive: true });
    mkdirSync(join(tmp, "src/app/[locale]/extra"), { recursive: true });
    cpSync(join(REPO, "src/i18n/routing.ts"), join(tmp, "src/i18n/routing.ts"));
    cpSync(join(REPO, "src/app/sitemap.ts"), join(tmp, "src/app/sitemap.ts"));
    cpSync(join(REPO, "src/app/robots.ts"), join(tmp, "src/app/robots.ts"));
  }
  it("est rouge quand une page n'est pas déclarée", async () => {
    seed();
    writeFileSync(join(tmp, "src/app/[locale]/extra/page.tsx"), "export default () => null;");
    expect((await guard("check_routes"))(tmp).join("\n")).toMatch(/page \/extra absente de routing\.ts/);
  });
  it("est rouge quand le robots interdit une route publique", async () => {
    seed();
    const p = join(tmp, "src/app/robots.ts");
    writeFileSync(p, readFileSync(p, "utf8").replace('disallow: ["/api/"]', 'disallow: ["/api/", "/projets"]'));
    expect((await guard("check_routes"))(tmp).join("\n")).toMatch(/robots\.ts interdit \/projets/);
  });
  it("est verte sur le dépôt", async () => {
    expect((await guard("check_routes"))(REPO)).toEqual([]);
  });
});

describe("check_fonts", () => {
  it("est rouge sur une police bannie et sur une famille non déclarée", async () => {
    put("src/a.css", `body{font-family:${bannedFont},sans-serif} h1{font-family:Papyrus}`);
    const out = (await guard("check_fonts"))(tmp).join("\n");
    expect(out).toMatch(/bannie/);
    expect(out).toMatch(/non declaree "Papyrus"/);
  });
  it("est verte sur le dépôt", async () => {
    expect((await guard("check_fonts"))(REPO)).toEqual([]);
  });
});
