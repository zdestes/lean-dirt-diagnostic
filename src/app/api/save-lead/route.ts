import { NextRequest, NextResponse } from 'next/server';

const NOTION_KEY = process.env.NOTION_API_KEY;
const CONTACTS_DB = process.env.NOTION_CONTACTS_DB_ID; // External Contacts
const OPPORTUNITIES_DB = process.env.NOTION_OPPORTUNITIES_DB_ID; // Opportunities

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, company, diagnosticData } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    if (!NOTION_KEY || !CONTACTS_DB || !OPPORTUNITIES_DB) {
      console.error('Missing Notion env vars');
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    const headers = {
      Authorization: `Bearer ${NOTION_KEY}`,
      'Notion-Version': '2025-09-03',
      'Content-Type': 'application/json',
    };

    // Create contact
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
    const contactId = contact.id;

    // Create opportunity
    const summary = buildSummary(diagnosticData);
    await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        parent: { database_id: OPPORTUNITIES_DB },
        properties: {
          Name: {
            title: [{ text: { content: `${company || name || email} — Diagnostic Lead` } }],
          },
          ...(contactId
            ? { Contact: { relation: [{ id: contactId }] } }
            : {}),
        },
        children: [
          {
            object: 'block',
            type: 'heading_2',
            heading_2: { rich_text: [{ text: { content: 'Diagnostic Results (Phases 1–4)' } }] },
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
