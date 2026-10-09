// Contraste WCAG 2.2 calcule sur les jetons de src/styles/tokens.css (les memes que ceux servis).

import { readFileSync } from "node:fs";
import { join } from "node:path";

export function parseHex(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function channel(v) {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function luminance([r, g, b]) {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Superpose une couleur rgba sur un fond opaque. */
export function over([r, g, b], alpha, [br, bg, bb]) {
  return [r, g, b].map((v, i) => Math.round(v * alpha + [br, bg, bb][i] * (1 - alpha)));
}

/** Lit les jetons d'un theme. Les blocs sont ceux de tokens.css : :root (sombre) et [data-theme="light"]. */
export function readTokens(root) {
  const css = readFileSync(join(root, "src/styles/tokens.css"), "utf8");
  const grab = (block) => Object.fromEntries([...block.matchAll(/--([\w-]+):(#[0-9A-Fa-f]{6})/g)].map((m) => [m[1], parseHex(m[2])]));
  const dark = css.slice(css.indexOf(":root{"), css.indexOf('[data-theme="light"]{'));
  const light = css.slice(css.indexOf('[data-theme="light"]{'), css.indexOf("@media"));
  return { dark: grab(dark), light: grab(light) };
}

/** Paires mesurees : [nom, premier plan, fond, seuil]. Texte 4,5 ; bordure ou fond de bouton 3. */
export function pairs(t) {
  // Survol d'un bouton secondaire : --grid est l'encre a 6 % d'opacite.
  const grid = (bg) => over(t.ink, 0.06, bg);
  const lvlInk = parseHex("#101412");
  return [
    ["texte principal sur la page", t.ink, t.bg, 4.5],
    ["texte principal sur un panneau", t.ink, t.panel, 4.5],
    ["texte secondaire sur la page", t.muted, t.bg, 4.5],
    ["texte secondaire sur un panneau", t.muted, t.panel, 4.5],
    ["lien et etiquette ambre sur un panneau", t["amber-ink"], t.panel, 4.5],
    ["lien et etiquette ambre sur la page", t["amber-ink"], t.bg, 4.5],
    ["bouton principal : texte sur son fond", t["btn-ink"], t["btn-bg"], 4.5],
    ["bouton principal : fond contre la page", t["btn-bg"], t.bg, 3],
    ["bouton principal : fond contre un panneau", t["btn-bg"], t.panel, 3],
    ["bouton secondaire : bordure contre la page", t.edge, t.bg, 3],
    ["bouton secondaire : bordure contre un panneau", t.edge, t.panel, 3],
    ["bouton secondaire au survol : texte", t.ink, grid(t.panel), 4.5],
    ["anneau de focus contre la page", t.focus, t.bg, 3],
    ["anneau de focus contre un panneau", t.focus, t.panel, 3],
    ["etiquette de journal : texte sombre sur ambre", lvlInk, t.amber, 4.5],
    ["message d'erreur sur un panneau", t.err, t.panel, 4.5],
    ["jauge ambre contre la page", t.amber, t.bg, 3],
    ["reperes d'angle ambre contre un panneau", t.amber, t.panel, 3],
  ];
}

export function measureAll(root) {
  const tokens = readTokens(root);
  const out = [];
  for (const theme of ["dark", "light"]) {
    for (const [name, fg, bg, min] of pairs(tokens[theme])) {
      const r = ratio(fg, bg);
      out.push({ theme, name, ratio: Math.round(r * 100) / 100, min, ok: r >= min });
    }
  }
  return out;
}
