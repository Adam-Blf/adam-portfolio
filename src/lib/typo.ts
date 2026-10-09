/**
 * Typographie appliquee au rendu, pour que les fichiers de contenu restent en
 * texte simple : espace insecable avant : ; ? ! et autour des guillemets
 * francais, apostrophe typographique. Les URL et adresses ne sont jamais
 * touchees (aucune espace avant leur deux-points).
 */

const NBSP = " ";
const NNBSP = " ";

export function typo(text: string, locale: string): string {
  let out = text.replace(/(\p{L})'(\p{L})/gu, "$1’$2");
  // Nom de marque : l'apostrophe de BLF Lab's reste droite, comme sur la raison sociale.
  out = out.replace(/BLF Lab’s/g, "BLF Lab's");
  if (locale === "fr") {
    out = out
      .replace(/[  ]+([;?!])/g, `${NNBSP}$1`)
      .replace(/[  ]+:/g, `${NBSP}:`)
      .replace(/«[  ]*/g, `«${NBSP}`)
      .replace(/[  ]*»/g, `${NBSP}»`)
      .replace(/(\d) (%|€|h\b)/g, `$1${NBSP}$2`)
      .replace(/(\d) (\d{3})(?!\d)/g, `$1${NBSP}$2`);
  }
  return out;
}

export function deepTypo<T>(value: T, locale: string): T {
  if (typeof value === "string") return typo(value, locale) as T;
  if (Array.isArray(value)) return value.map((v) => deepTypo(v, locale)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, deepTypo(v, locale)])) as T;
  }
  return value;
}
