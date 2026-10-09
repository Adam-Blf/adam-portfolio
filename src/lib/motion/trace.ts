/**
 * Trace d'oscilloscope du hero. Decoratif : il ne represente aucune mesure.
 * La meme fonction rend le chemin initial cote serveur et le met a jour au defilement.
 */
export function tracePath(progress: number, phase: number): string {
  const amp = 14 + progress * 62;
  let d = "";
  for (let x = 0; x <= 600; x += 5) {
    const env = 0.35 + 0.65 * Math.sin((Math.PI * x) / 600);
    const y = 110 + env * amp * Math.sin(x * 0.045 + phase) + env * amp * 0.35 * Math.sin(x * 0.13 - phase * 1.7);
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)} `;
  }
  return d.trim();
}
