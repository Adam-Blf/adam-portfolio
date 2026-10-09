/**
 * SESSIONS.md est un SIGNAL d'activite, jamais une source de texte : l'index contient des sujets sensibles
 * (candidatures, clients, hopital). On ne garde que des comptes par projet et par date. Aucun titre,
 * aucun identifiant de session, aucun chemin ne sort de cette fonction.
 */

export type SessionSignals = {
  total: number;
  byProject: Record<string, { sessions: number; lastDate: string | null }>;
};

const MONTHS: Record<string, string> = {
  janvier: "01", fevrier: "02", mars: "03", avril: "04", mai: "05", juin: "06",
  juillet: "07", aout: "08", septembre: "09", octobre: "10", novembre: "11", decembre: "12",
};

export function parseSessions(text: string): SessionSignals {
  const out: SessionSignals = { total: 0, byProject: {} };
  let date: string | null = null;
  for (const line of text.split(/\r?\n/)) {
    const h = /^##\s+(\d{1,2})\s+(\p{L}+)\s+(\d{4})/u.exec(line);
    if (h) {
      const month = MONTHS[(h[2] ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()];
      date = month ? `${h[3]}-${month}-${(h[1] ?? "").padStart(2, "0")}` : null;
      continue;
    }
    if (!line.startsWith("- **")) continue;
    // Le projet est le premier jeton entre accents graves apres le titre ; le titre n'est jamais lu.
    const tail = line.slice(line.lastIndexOf("**") + 2);
    const project = /`([^`]+)`/.exec(tail)?.[1];
    if (!project) continue;
    out.total++;
    const entry = (out.byProject[project] ??= { sessions: 0, lastDate: null });
    entry.sessions++;
    if (date && (!entry.lastDate || date > entry.lastDate)) entry.lastDate = date;
  }
  return out;
}
