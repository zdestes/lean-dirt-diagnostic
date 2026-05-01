import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder');

interface DiagnosticEmailData {
  to: string;
  name: string;
  company: string;
  diagnosticData: Record<string, unknown>;
}

export async function sendDiagnosticEmail({ to, name, company, diagnosticData }: DiagnosticEmailData) {
  const d = diagnosticData as {
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

  const fmt$ = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt$0 = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const fmtPct = (n: number) => n.toFixed(1) + '%';
  const fmtNum = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

  const row = (label: string, cur: string, tgt: string, isKey = false) => `
    <tr style="border-bottom:1px solid #f0f0f0;${isKey ? 'background:#fff8ed;' : ''}">
      <td style="padding:9px 12px;font-weight:${isKey ? '600' : '400'};color:${isKey ? '#92400e' : '#444'};font-size:13px;">${label}${isKey ? ' ⭐' : ''}</td>
      <td style="padding:9px 12px;text-align:right;color:#777;font-size:13px;">${cur}</td>
      <td style="padding:9px 12px;text-align:right;font-weight:600;color:${isKey ? '#b45309' : '#111'};font-size:13px;">${tgt}</td>
    </tr>`;

  const lineBlocks = d.lines.map((line) => {
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

    return `
    <div style="margin:0 0 24px;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
      <div style="background:#f9fafb;padding:10px 16px;font-weight:600;color:#111;font-size:14px;border-bottom:1px solid #e5e7eb;">${line.name}</div>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#f5f5f5;">
            <th style="padding:8px 12px;text-align:left;color:#888;font-size:11px;font-weight:600;text-transform:uppercase;">Metric</th>
            <th style="padding:8px 12px;text-align:right;color:#888;font-size:11px;font-weight:600;text-transform:uppercase;">Today</th>
            <th style="padding:8px 12px;text-align:right;color:#b45309;font-size:11px;font-weight:600;text-transform:uppercase;">Target</th>
          </tr>
        </thead>
        <tbody>
          ${row('Revenue', fmt$0(line.revenue), fmt$0(reqRev))}
          ${row('Direct Expenses', fmt$0(line.directExpenses), fmt$0(targetDE))}
          ${row('Gross Profit', fmt$0(gp), fmt$0(targetGP))}
          ${row('Gross Margin %', fmtPct(gm), fmtPct(d.target.grossMarginGoalPct))}
          ${row(`Output (${line.unitName})`, fmtNum(line.units), fmtNum(reqOut))}
          ${row(`Rev / ${line.unitName}`, fmt$(revUnit), fmt$(targetRpu))}
          ${row(`Cost / ${line.unitName}`, fmt$(costUnit), fmt$(maxCost), true)}
        </tbody>
      </table>
    </div>`;
  }).join('');

  const targetGPTotal = d.targetMetrics.requiredRevenue * (d.target.grossMarginGoalPct / 100);

  const companyTable = `
    <div style="margin:0 0 32px;border-radius:10px;overflow:hidden;background:#111;">
      <div style="padding:12px 16px;font-weight:600;color:#fff;font-size:14px;border-bottom:1px solid #333;">Company Total</div>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="padding:8px 12px;text-align:left;color:#888;font-size:11px;font-weight:600;text-transform:uppercase;">Metric</th>
            <th style="padding:8px 12px;text-align:right;color:#666;font-size:11px;font-weight:600;text-transform:uppercase;">Today</th>
            <th style="padding:8px 12px;text-align:right;color:#f59e0b;font-size:11px;font-weight:600;text-transform:uppercase;">Target</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid #222;"><td style="padding:9px 12px;color:#ccc;font-size:13px;">Total Revenue</td><td style="padding:9px 12px;text-align:right;color:#888;font-size:13px;">${fmt$0(d.companyMetrics.totalRevenue)}</td><td style="padding:9px 12px;text-align:right;color:#fff;font-weight:600;font-size:13px;">${fmt$0(d.targetMetrics.requiredRevenue)}</td></tr>
          <tr style="border-bottom:1px solid #222;"><td style="padding:9px 12px;color:#ccc;font-size:13px;">Total Gross Profit</td><td style="padding:9px 12px;text-align:right;color:#888;font-size:13px;">${fmt$0(d.companyMetrics.totalGrossProfit)}</td><td style="padding:9px 12px;text-align:right;color:#fff;font-weight:600;font-size:13px;">${fmt$0(targetGPTotal)}</td></tr>
          <tr style="border-bottom:1px solid #222;"><td style="padding:9px 12px;color:#ccc;font-size:13px;">Blended GM%</td><td style="padding:9px 12px;text-align:right;color:#888;font-size:13px;">${fmtPct(d.companyMetrics.blendedGrossMarginPct)}</td><td style="padding:9px 12px;text-align:right;color:#fff;font-weight:600;font-size:13px;">${fmtPct(d.target.grossMarginGoalPct)}</td></tr>
          <tr style="border-bottom:1px solid #222;"><td style="padding:9px 12px;color:#ccc;font-size:13px;">Overhead</td><td style="padding:9px 12px;text-align:right;color:#888;font-size:13px;">${fmt$0(d.overhead)}</td><td style="padding:9px 12px;text-align:right;color:#fff;font-weight:600;font-size:13px;">${fmt$0(d.target.overheadGuardrail)}</td></tr>
          <tr style="background:#2d1f00;"><td style="padding:10px 12px;color:#fbbf24;font-weight:700;font-size:13px;">Net Profit</td><td style="padding:10px 12px;text-align:right;color:#888;font-size:13px;">${fmt$0(d.companyMetrics.netProfit)}</td><td style="padding:10px 12px;text-align:right;color:#f59e0b;font-weight:800;font-size:16px;">${fmt$0(d.target.netProfitGoal)}</td></tr>
        </tbody>
      </table>
    </div>`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9f6f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

    <div style="background:#111;padding:28px 32px;">
      <img src="https://diagnostic.leandirt.com/wordmark.png" alt="Lean Dirt" style="height:28px;width:auto;" />
    </div>

    <div style="padding:32px 32px 24px;">
      <h1 style="margin:0 0 8px;font-size:22px;color:#111;">Your diagnostic results${name ? ', ' + name.split(' ')[0] : ''}.</h1>
      <p style="margin:0 0 28px;color:#555;font-size:15px;line-height:1.6;">Here's what you built. The starred metric on each line is the cost per unit ceiling — that's the number that drives every operational decision from here.</p>

      ${lineBlocks}
      ${companyTable}
    </div>

    <div style="margin:0 32px 40px;background:#111;border-radius:12px;padding:28px 24px;text-align:center;">
      <p style="margin:0 0 6px;color:#fff;font-size:18px;font-weight:700;">Ready to close the gap?</p>
      <p style="margin:0 0 20px;color:#aaa;font-size:14px;">The next step is identifying the constraint keeping you from hitting these numbers. That's a 20-minute conversation.</p>
      <a href="https://leandirt.co/TYWjkBF" style="display:inline-block;background:#f59e0b;color:#fff;font-weight:700;font-size:16px;padding:14px 32px;border-radius:10px;text-decoration:none;">Book a call with Zack</a>
    </div>

    <div style="padding:20px 32px;border-top:1px solid #f0f0f0;text-align:center;">
      <p style="margin:0;font-size:12px;color:#bbb;">Lean Dirt · leandirt.com · You're receiving this because you completed the business diagnostic.</p>
    </div>

  </div>
</body>
</html>`;

  return resend.emails.send({
    from: 'Lean Dirt <noreply@leandirt.com>',
    to,
    subject: `Your Lean Dirt diagnostic results${company ? ' — ' + company : ''}`,
    html,
  });
}
