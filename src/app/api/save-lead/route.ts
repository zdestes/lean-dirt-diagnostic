import { NextRequest, NextResponse } from 'next/server';
import { sendDiagnosticEmail } from '@/lib/email';

const NOTION_KEY = process.env.NOTION_API_KEY;
const CONTACTS_DB = process.env.NOTION_CONTACTS_DB_ID;
const OPPORTUNITIES_DB = process.env.NOTION_OPPORTUNITIES_DB_ID;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, company, diagnosticData } = body;

    // Always save to Notion regardless of email
    if (!NOTION_KEY || !CONTACTS_DB || !OPPORTUNITIES_DB) {
      console.error('Missing Notion env vars');
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    const headers = {
      Authorization: `Bearer ${NOTION_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    };

    // Create contact (only if email provided)
    let contactId: string | null = null;
    if (email) {
      const contactRes = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          parent: { database_id: CONTACTS_DB },
          properties: {
            Name: { title: [{ text: { content: name || email } }] },
            Email: { email },
          },
        }),
      });
      const contact = await contactRes.json();
      contactId = contact.id || null;
    }

    // Build readable summary
    const summary = buildSummary(diagnosticData);
    const dealName = `${company || name || email || 'Anonymous'} - Diagnostic Lead`;

    await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        parent: { database_id: OPPORTUNITIES_DB },
        properties: {
          'Deal Name': {
            title: [{ text: { content: dealName } }],
          },
          ...(contactId ? { Contact: { relation: [{ id: contactId }] } } : {}),
        },
        children: [
          {
            object: 'block',
            type: 'heading_2',
            heading_2: { rich_text: [{ text: { content: 'Diagnostic Results' } }] },
          },
          {
            object: 'block',
            type: 'code',
            code: {
              language: 'plain text',
              rich_text: [{ text: { content: summary } }],
            },
          },
        ],
      }),
    });

    // Send results email to user if address provided, always BCC Zack
    if (email) {
      await sendDiagnosticEmail({ to: email, name: name || '', company: company || '', diagnosticData });
    } else {
      // No user email (book-call path) — still notify Zack directly
      await sendDiagnosticEmail({ to: 'zack.estes@leandirt.com', name: name || 'Unknown', company: company || 'Unknown', diagnosticData });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

function buildSummary(data: Record<string, unknown>): string {
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
}
