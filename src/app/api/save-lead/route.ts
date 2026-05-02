import { NextRequest, NextResponse } from 'next/server';
import { sendDiagnosticEmail } from '@/lib/email';

const NOTION_KEY = process.env.NOTION_API_KEY;
const CONTACTS_DB = process.env.NOTION_CONTACTS_DB_ID;
const OPPORTUNITIES_DB = process.env.NOTION_OPPORTUNITIES_DB_ID;

type RichText = { text: { content: string } };
type Block = Record<string, unknown>;

const rt = (content: string): RichText[] => [{ text: { content } }];

const h2 = (content: string): Block => ({
  object: 'block', type: 'heading_2',
  heading_2: { rich_text: rt(content) },
});

const h3 = (content: string): Block => ({
  object: 'block', type: 'heading_3',
  heading_3: { rich_text: rt(content) },
});

const bullet = (content: string, bold = false): Block => ({
  object: 'block', type: 'bulleted_list_item',
  bulleted_list_item: {
    rich_text: [{ text: { content }, annotations: { bold } }],
  },
});

const divider = (): Block => ({ object: 'block', type: 'divider', divider: {} });

const callout = (content: string, emoji: string): Block => ({
  object: 'block', type: 'callout',
  callout: {
    rich_text: rt(content),
    icon: { type: 'emoji', emoji },
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, company, diagnosticData } = body;

    if (!NOTION_KEY || !CONTACTS_DB || !OPPORTUNITIES_DB) {
      console.error('Missing Notion env vars');
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    const headers = {
      Authorization: `Bearer ${NOTION_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    };

    // Create contact if email provided
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

    const dealName = `${company || name || email || 'Anonymous'} — Diagnostic Lead`;
    const blocks = buildNotionBlocks(diagnosticData);

    await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        parent: { database_id: OPPORTUNITIES_DB },
        properties: {
          'Deal Name': { title: [{ text: { content: dealName } }] },
          ...(contactId ? { Contact: { relation: [{ id: contactId }] } } : {}),
        },
        children: blocks,
      }),
    });

    // Send email
    if (email) {
      await sendDiagnosticEmail({ to: email, name: name || '', company: company || '', diagnosticData });
    } else {
      await sendDiagnosticEmail({ to: 'zack.estes@leandirt.com', name: name || 'Unknown', company: company || 'Unknown', diagnosticData });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

function buildNotionBlocks(data: Record<string, unknown>): Block[] {
  const d = data as {
    lines: Array<{ id: string; name: string; revenue: number; directExpenses: number; units: number; unitName: string }>;
    overhead: number;
    companyMetrics: { totalRevenue: number; totalGrossProfit: number; blendedGrossMarginPct: number; netProfit: number };
    target: { targetDate: string; netProfitGoal: number; grossMarginGoalPct: number; overheadGuardrail: number };
    targetMetrics: {
      requiredRevenue: number;
      requiredRevenueByLine: Record<string, number>;
      requiredOutputByLine: Record<string, number>;
      maxCostPerUnitByLine: Record<string, number>;
      targetRevenuePerUnit: Record<string, number>;
    };
  };

  const fmt$0 = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const fmt$ = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtPct = (n: number) => n.toFixed(1) + '%';
  const fmtNum = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

  const blocks: Block[] = [];

  // ── COMPANY SNAPSHOT ──
  blocks.push(h2('📊 Company Snapshot'));
  blocks.push(bullet(`Total Revenue: ${fmt$0(d.companyMetrics.totalRevenue)}`));
  blocks.push(bullet(`Total Gross Profit: ${fmt$0(d.companyMetrics.totalGrossProfit)}`));
  blocks.push(bullet(`Blended Gross Margin: ${fmtPct(d.companyMetrics.blendedGrossMarginPct)}`));
  blocks.push(bullet(`Overhead: ${fmt$0(d.overhead)}`));
  blocks.push(bullet(`Net Profit (Today): ${fmt$0(d.companyMetrics.netProfit)}`));
  blocks.push(divider());

  // ── LINES OF BUSINESS ──
  blocks.push(h2('🏗️ Lines of Business'));

  for (const line of d.lines) {
    const gp = line.revenue - line.directExpenses;
    const gm = line.revenue > 0 ? (gp / line.revenue) * 100 : 0;
    const revUnit = line.units > 0 ? line.revenue / line.units : 0;
    const costUnit = line.units > 0 ? line.directExpenses / line.units : 0;

    const reqRev = d.targetMetrics.requiredRevenueByLine[line.id] ?? 0;
    const reqOut = d.targetMetrics.requiredOutputByLine[line.id] ?? 0;
    const maxCost = d.targetMetrics.maxCostPerUnitByLine[line.id] ?? 0;
    const targetRpu = d.targetMetrics.targetRevenuePerUnit[line.id] ?? revUnit;
    const targetGP = reqRev * (d.target.grossMarginGoalPct / 100);
    const targetDE = reqRev - targetGP;

    blocks.push(h3(line.name));
    blocks.push(bullet(`Revenue: ${fmt$0(line.revenue)}  →  Target: ${fmt$0(reqRev)}`));
    blocks.push(bullet(`Direct Expenses: ${fmt$0(line.directExpenses)}  →  Target: ${fmt$0(targetDE)}`));
    blocks.push(bullet(`Gross Profit: ${fmt$0(gp)}  →  Target: ${fmt$0(targetGP)}`));
    blocks.push(bullet(`Gross Margin %: ${fmtPct(gm)}  →  Target: ${fmtPct(d.target.grossMarginGoalPct)}`));
    blocks.push(bullet(`Output (${line.unitName}): ${fmtNum(line.units)}  →  Target: ${fmtNum(reqOut)}`));
    blocks.push(bullet(`Rev / ${line.unitName}: ${fmt$(revUnit)}  →  Target: ${fmt$(targetRpu)}`));
    blocks.push(callout(`⭐ Max Cost / ${line.unitName}: ${fmt$(costUnit)} today  →  Must hit ${fmt$(maxCost)}`, '🎯'));
  }

  blocks.push(divider());

  // ── TARGET & GAP ──
  blocks.push(h2('🎯 Profit Target & Gap'));
  blocks.push(bullet(`Target Date: ${d.target.targetDate || 'Not set'}`));
  blocks.push(bullet(`Net Profit Goal: ${fmt$0(d.target.netProfitGoal)}`));
  blocks.push(bullet(`Gross Margin Goal: ${fmtPct(d.target.grossMarginGoalPct)}`));
  blocks.push(bullet(`Overhead Guardrail: ${fmt$0(d.target.overheadGuardrail)}`));
  blocks.push(bullet(`Required Revenue: ${fmt$0(d.targetMetrics.requiredRevenue)}`));

  const gap = d.target.netProfitGoal - d.companyMetrics.netProfit;
  const gapPct = d.companyMetrics.totalRevenue > 0
    ? ((gap / d.companyMetrics.totalRevenue) * 100).toFixed(1)
    : '—';
  blocks.push(callout(
    `Gap to close: ${fmt$0(gap)} net profit (${gapPct} points on current revenue)`,
    gap > 0 ? '🔴' : '✅'
  ));

  return blocks;
}
