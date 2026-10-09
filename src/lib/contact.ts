import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";

export const MIN_AGE_MS = 2_000;
export const MAX_AGE_MS = 2 * 60 * 60 * 1000;

export const ContactInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(200).optional().default(""),
  token: z.string().min(10).max(200),
});
export type ContactInput = z.infer<typeof ContactInput>;

function mac(secret: string, ts: string): string {
  return createHmac("sha256", secret).update(ts).digest("base64url");
}

/** Jeton horodate signe : "<ms>.<hmac>". Emis par GET, exige par POST. */
export function issueToken(secret: string, now = Date.now()): string {
  const ts = String(now);
  return `${ts}.${mac(secret, ts)}`;
}

export type TokenCheck = "ok" | "malformed" | "forged" | "too-fast" | "expired";

export function checkToken(secret: string, token: string, now = Date.now()): TokenCheck {
  const [ts, sig] = token.split(".");
  if (!ts || !sig || !/^\d{10,16}$/.test(ts)) return "malformed";
  const expected = Buffer.from(mac(secret, ts));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return "forged";
  const age = now - Number(ts);
  if (age < MIN_AGE_MS) return "too-fast";
  if (age > MAX_AGE_MS) return "expired";
  return "ok";
}

/** Retire les retours a la ligne pour qu'une valeur ne puisse jamais injecter un en-tete. */
export function oneLine(value: string): string {
  return value.replace(/[\r\n\u2028\u2029]+/g, " ").trim();
}
