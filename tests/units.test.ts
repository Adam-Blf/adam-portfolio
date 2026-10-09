import { describe, expect, it } from "vitest";
import { ContactInput, MAX_AGE_MS, MIN_AGE_MS, checkToken, issueToken, oneLine } from "@/lib/contact";
import { deepTypo, typo } from "@/lib/typo";
import { tracePath } from "@/lib/motion/trace";
import { buildPath, switchPath, toTable, type RouteTable } from "@/lib/langswitch";
import { routing } from "@/i18n/routing";
import { formatPeriod } from "@/lib/format";
import { ProjectMeta, Visibility } from "@/lib/schemas/content";
import { measureAll } from "../tools/lib/contrast.mjs";

describe("jeton du formulaire", () => {
  const secret = "secret-de-test";
  it("refuse un jeton trop rapide, périmé, falsifié ou mal formé", () => {
    const t = issueToken(secret, 1_000_000_000_000);
    expect(checkToken(secret, t, 1_000_000_000_000 + 500)).toBe("too-fast");
    expect(checkToken(secret, t, 1_000_000_000_000 + MIN_AGE_MS + 1)).toBe("ok");
    expect(checkToken(secret, t, 1_000_000_000_000 + MAX_AGE_MS + 1)).toBe("expired");
    expect(checkToken("autre-secret", t, 1_000_000_000_000 + MIN_AGE_MS + 1)).toBe("forged");
    expect(checkToken(secret, "n-importe-quoi", Date.now())).toBe("malformed");
  });
  it("valide les longueurs et neutralise les retours à la ligne", () => {
    const ok = { name: "Ada", email: "ada@example.org", message: "Un message assez long.", token: "x".repeat(20) };
    expect(ContactInput.safeParse(ok).success).toBe(true);
    expect(ContactInput.safeParse({ ...ok, message: "court" }).success).toBe(false);
    expect(ContactInput.safeParse({ ...ok, email: "pas-un-mail" }).success).toBe(false);
    expect(oneLine("a\r\nBcc: x@y.z")).toBe("a Bcc: x@y.z");
  });
});

describe("typographie du rendu", () => {
  it("place des espaces insécables en français seulement", () => {
    expect(typo("Voir : ceci ! Vraiment ?", "fr")).toBe("Voir : ceci ! Vraiment ?");
    expect(typo("See: this!", "en")).toBe("See: this!");
    expect(typo("l'article", "en")).toBe("l’article");
    expect(typo("BLF Lab's", "fr")).toBe("BLF Lab's");
    expect(deepTypo({ a: ["24 042 lignes"] }, "fr").a[0]).toBe("24 042 lignes");
  });
});

describe("tracé, périodes", () => {
  it("produit un chemin déterministe", () => {
    expect(tracePath(0.25, 0)).toBe(tracePath(0.25, 0));
    expect(tracePath(0, 0).startsWith("M0 ")).toBe(true);
  });
  it("formate les périodes", () => {
    const since = (d: string) => `Depuis ${d}`;
    expect(formatPeriod({ start: "2020-09", end: "2021-07", precision: "year" }, "fr", since)).toBe("2020-2021");
    expect(formatPeriod({ start: "2026-08", end: null, precision: "month" }, "fr", since)).toBe("Depuis août 2026");
  });
});

describe("schémas d'autorisation", () => {
  const base = {
    slug: "x",
    kind: "hospital",
    status: "shipped",
    period: { start: null, end: null },
    stack: ["Python"],
    links: { repo: null, demo: null },
    coAuthors: [],
    featured: false,
    order: 1,
    visibility: { publish: true, anonymized: false, approvals: { employer: null, client: null, coAuthors: [] }, reviewedBy: null, reviewedOn: null },
    provenance: { vaultId: "vault:abc", checkedOn: "2026-10-09" },
  };
  it("refuse un projet hospitalier publié sans anonymisation ni accord", () => {
    expect(ProjectMeta.safeParse(base).success).toBe(false);
    expect(ProjectMeta.safeParse({ ...base, visibility: { ...base.visibility, anonymized: true } }).success).toBe(true);
  });
  it("refuse un co-auteur sans accord", () => {
    expect(ProjectMeta.safeParse({ ...base, kind: "school", coAuthors: ["emilien-morice"] }).success).toBe(false);
  });
  it("ne publie jamais par défaut", () => {
    expect(Visibility.parse({ approvals: { employer: null, client: null, coAuthors: [] }, reviewedBy: null, reviewedOn: null }).publish).toBe(false);
  });
});

describe("contrastes mesurés (WCAG 2.2)", () => {
  it("tient les seuils dans les deux thèmes", () => {
    const rows = measureAll(process.cwd());
    const bad = rows.filter((r) => !r.ok).map((r) => `${r.theme} ${r.name} ${r.ratio}:1`);
    expect(bad).toEqual([]);
  });
});

describe("selecteur de langue", () => {
  const table = toTable(routing.pathnames, routing.locales) as RouteTable;
  it("traduit le chemin courant dans l'autre langue", () => {
    expect(switchPath("/a-propos", "fr", "en", table)).toBe("/en/about");
    expect(switchPath("/en/about", "en", "es", table)).toBe("/es/sobre-mi");
    expect(switchPath("/es/proyectos/vigie", "es", "fr", table)).toBe("/projets/vigie");
    expect(switchPath("/", "fr", "es", table)).toBe("/es");
    expect(switchPath("/en", "en", "fr", table)).toBe("/");
    expect(switchPath("/mentions-legales/", "fr", "en", table)).toBe("/en/legal-notice");
  });
  it("renvoie vers l'accueil de la langue quand la page est inconnue", () => {
    expect(switchPath("/introuvable", "fr", "en", table)).toBe("/en");
  });
});

describe("chemins publics", () => {
  const table = toTable(routing.pathnames, routing.locales) as RouteTable;
  it("construit les chemins traduits, avec ou sans préfixe", () => {
    expect(buildPath("/", "fr", table)).toBe("/");
    expect(buildPath("/", "en", table)).toBe("/en");
    expect(buildPath("/about", "es", table)).toBe("/es/sobre-mi");
    expect(buildPath("/projects/[slug]", "fr", table, { slug: "vigie" })).toBe("/projets/vigie");
    expect(buildPath("/cv", "es", table)).toBe("/es/cv");
    expect(() => buildPath("/nope", "fr", table)).toThrow(/inconnue/);
  });
});
