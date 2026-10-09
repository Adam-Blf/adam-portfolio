import { NextResponse } from "next/server";
import { ContactInput, checkToken, issueToken, oneLine } from "@/lib/contact";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };
const MAX_BODY = 12_000;

function env() {
  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM, FORM_HMAC_SECRET } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM || !FORM_HMAC_SECRET) return null;
  return { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM, FORM_HMAC_SECRET };
}

/** Jeton horodate, a recuperer avant d'envoyer le formulaire. */
export async function GET() {
  const e = env();
  if (!e) return NextResponse.json({ error: "unavailable" }, { status: 503, headers: NO_STORE });
  return NextResponse.json({ token: issueToken(e.FORM_HMAC_SECRET) }, { headers: NO_STORE });
}

export async function POST(req: Request) {
  const e = env();
  if (!e) return NextResponse.json({ error: "unavailable" }, { status: 503, headers: NO_STORE });

  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) {
    return NextResponse.json({ error: "forbidden" }, { status: 403, headers: NO_STORE });
  }

  const raw = await req.text();
  if (raw.length === 0 || raw.length > MAX_BODY) return NextResponse.json({ error: "invalid" }, { status: 400, headers: NO_STORE });

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400, headers: NO_STORE });
  }
  const parsed = ContactInput.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400, headers: NO_STORE });
  const input = parsed.data;

  // Pot de miel : un robot qui remplit le champ cache recoit un succes, rien ne part.
  if (input.website) return NextResponse.json({ ok: true }, { headers: NO_STORE });

  if (checkToken(e.FORM_HMAC_SECRET, input.token) !== "ok") {
    return NextResponse.json({ error: "invalid" }, { status: 400, headers: NO_STORE });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${e.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: e.CONTACT_FROM,
      to: [e.CONTACT_TO],
      reply_to: input.email,
      subject: `Portfolio : message de ${oneLine(input.name)}`.slice(0, 150),
      text: `${input.message}\n\n-- \n${oneLine(input.name)} <${input.email}>`,
    }),
  }).catch(() => null);

  if (!res || !res.ok) return NextResponse.json({ error: "send" }, { status: 502, headers: NO_STORE });
  return NextResponse.json({ ok: true }, { headers: NO_STORE });
}
