// /os waitlist → Obeya. The browser posts here; this server route forwards
// to Obeya's intake endpoint with the private INTAKE_KEY, so the key never
// reaches a visitor. Obeya turns the signup into a CRM lead and an Inbox ping.
//
// Env (Vercel → lean-dirt-diagnostic → Settings → Environment Variables):
//   OBEYA_INTAKE_URL  https://obeya.leandirt.com/api/intake/waitlist
//   INTAKE_KEY        same value as INTAKE_KEY on the obeya project

export const dynamic = 'force-dynamic';

const FIELDS = ['name', 'company', 'email', 'phone', 'trade', 'employees', 'question'] as const;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 400 });
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 400 });
  }

  // Honeypot filled = a bot. Pretend it worked, send nothing.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return Response.json({ ok: true });
  }

  const payload: Record<string, string> = {};
  for (const f of FIELDS) {
    const v = body[f];
    if (typeof v === 'string') payload[f] = v.slice(0, 2000);
  }
  if (!payload.name?.trim() || !payload.company?.trim() || !payload.email?.trim()) {
    return Response.json({ ok: false, error: 'Name, company and email are required.' }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email.trim())) {
    return Response.json({ ok: false, error: 'Please enter a full email address (like you@company.com).' }, { status: 400 });
  }

  const url = process.env.OBEYA_INTAKE_URL;
  const key = process.env.INTAKE_KEY;
  if (!url || !key) {
    console.error('[waitlist] OBEYA_INTAKE_URL or INTAKE_KEY is not set');
    return Response.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-intake-key': key },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('[waitlist] obeya responded', res.status, await res.text().catch(() => ''));
      return Response.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error('[waitlist] forward failed:', err);
    return Response.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 502 });
  }
}
