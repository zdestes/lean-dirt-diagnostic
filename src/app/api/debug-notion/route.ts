import { NextResponse } from 'next/server';

export async function GET() {
  const NOTION_KEY = process.env.NOTION_API_KEY;
  const OPP_DB = process.env.NOTION_OPPORTUNITIES_DB_ID;

  if (!NOTION_KEY || !OPP_DB) {
    return NextResponse.json({ error: 'Missing env vars', hasKey: !!NOTION_KEY, hasDb: !!OPP_DB });
  }

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${NOTION_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: OPP_DB },
      properties: {
        'Deal Name': { title: [{ text: { content: 'DEBUG TEST — delete me' } }] },
        'Source': { multi_select: [{ name: 'Diagnostic' }] },
      },
    }),
  });

  const body = await res.json();
  return NextResponse.json({ status: res.status, keyPrefix: NOTION_KEY.slice(0, 12) + '...', body });
}
