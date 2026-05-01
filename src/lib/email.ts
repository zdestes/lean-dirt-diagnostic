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
    lines: Array<{ name: string; revenue: number; directExpenses: number; units: number; unitName: string }>;
    overhead: number;
    companyMetrics: { totalRevenue: number; totalGrossProfit: number; blendedGrossMarginPct: number; netProfit: number };
    target: { targetDate: string; netProfitGoal: number; grossMarginGoalPct: number; overheadGuardrail: number };
    targetMetrics: { requiredRevenue: number; maxCostPerUnitByLine: Record<string, number> };
  };

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const fmtPct = (n: number) => n.toFixed(1) + '%';

  const lineRows = d.lines.map((line, i) => {
    const gp = line.revenue - line.directExpenses;
    const gm = line.revenue > 0 ? (gp / line.revenue) * 100 : 0;
    const revUnit = line.units > 0 ? line.revenue / line.units : 0;
    const costUnit = line.units > 0 ? line.directExpenses / line.units : 0;
    const maxCost = Object.values(d.targetMetrics.maxCostPerUnitByLine)[i] ?? 0;
    return `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;font-weight:600;">${line.name}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;">${fmt(line.revenue)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;">${fmtPct(gm)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;">${fmt(revUnit)}/${line.unitName}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;color:#b45309;font-weight:600;">${fmt(costUnit)} → ${fmt(maxCost)}</td>
      </tr>`;
  }).join('');

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f9f6f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#111;padding:28px 32px;">
      <img src="https://diagnostic.leandirt.com/wordmark.png" alt="Lean Dirt" style="height:28px;width:auto;" />
    </div>

    <!-- Intro -->
    <div style="padding:32px 32px 0;">
      <h1 style="margin:0 0 8px;font-size:22px;color:#111;">Your diagnostic results, ${name ? name.split(' ')[0] : 'here'}.</h1>
      <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.6;">
        Here's what you built. The number to keep your eye on is the cost per unit ceiling for each line — that's the governing metric that drives every operational decision from here.
      </p>
    </div>

    <!-- Company snapshot -->
    <div style="margin:0 32px 24px;background:#fafafa;border:1px solid #ebebeb;border-radius:12px;padding:20px 24px;">
      <p style="margin:0 0 12px;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.06em;">Where you are today</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div><div style="font-size:11px;color:#888;text-transform:uppercase;">Revenue</div><div style="font-size:18px;font-weight:700;color:#111;">${fmt(d.companyMetrics.totalRevenue)}</div></div>
        <div><div style="font-size:11px;color:#888;text-transform:uppercase;">Gross Margin</div><div style="font-size:18px;font-weight:700;color:#111;">${fmtPct(d.companyMetrics.blendedGrossMarginPct)}</div></div>
        <div><div style="font-size:11px;color:#888;text-transform:uppercase;">Net Profit</div><div style="font-size:18px;font-weight:700;color:#111;">${fmt(d.companyMetrics.netProfit)}</div></div>
        <div><div style="font-size:11px;color:#888;text-transform:uppercase;">Overhead</div><div style="font-size:18px;font-weight:700;color:#111;">${fmt(d.overhead)}</div></div>
      </div>
    </div>

    <!-- Target -->
    <div style="margin:0 32px 24px;background:#fff8ed;border:1px solid #fde68a;border-radius:12px;padding:20px 24px;">
      <p style="margin:0 0 12px;font-size:12px;font-weight:600;color:#92400e;text-transform:uppercase;letter-spacing:.06em;">Your target — ${d.target.targetDate}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div><div style="font-size:11px;color:#92400e;text-transform:uppercase;">Required Revenue</div><div style="font-size:22px;font-weight:800;color:#92400e;">${fmt(d.targetMetrics.requiredRevenue)}</div></div>
        <div><div style="font-size:11px;color:#92400e;text-transform:uppercase;">Net Profit Goal</div><div style="font-size:22px;font-weight:800;color:#92400e;">${fmt(d.target.netProfitGoal)}</div></div>
        <div><div style="font-size:11px;color:#92400e;text-transform:uppercase;">GM Goal</div><div style="font-size:18px;font-weight:700;color:#111;">${fmtPct(d.target.grossMarginGoalPct)}</div></div>
        <div><div style="font-size:11px;color:#92400e;text-transform:uppercase;">Overhead Guardrail</div><div style="font-size:18px;font-weight:700;color:#111;">${fmt(d.target.overheadGuardrail)}</div></div>
      </div>
    </div>

    <!-- Per-line table -->
    <div style="margin:0 32px 32px;">
      <p style="margin:0 0 12px;font-size:12px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.06em;">By line of business</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="background:#f5f5f5;">
            <th style="padding:10px 12px;text-align:left;color:#666;font-weight:600;">Line</th>
            <th style="padding:10px 12px;text-align:left;color:#666;font-weight:600;">Revenue</th>
            <th style="padding:10px 12px;text-align:left;color:#666;font-weight:600;">GM%</th>
            <th style="padding:10px 12px;text-align:left;color:#666;font-weight:600;">Rev/Unit</th>
            <th style="padding:10px 12px;text-align:left;color:#b45309;font-weight:600;">Cost/Unit (now → target)</th>
          </tr>
        </thead>
        <tbody>${lineRows}</tbody>
      </table>
    </div>

    <!-- CTA -->
    <div style="margin:0 32px 40px;background:#111;border-radius:12px;padding:28px 24px;text-align:center;">
      <p style="margin:0 0 6px;color:#fff;font-size:18px;font-weight:700;">Ready to close the gap?</p>
      <p style="margin:0 0 20px;color:#aaa;font-size:14px;">The next step is identifying the constraint keeping you from hitting these numbers. That's a 20-minute conversation.</p>
      <a href="https://leandirt.co/TYWjkBF" style="display:inline-block;background:#f59e0b;color:#fff;font-weight:700;font-size:16px;padding:14px 32px;border-radius:10px;text-decoration:none;">Book a call with Zack</a>
    </div>

    <!-- Footer -->
    <div style="padding:20px 32px;border-top:1px solid #f0f0f0;text-align:center;">
      <p style="margin:0;font-size:12px;color:#bbb;">Lean Dirt · leandirt.com · You're receiving this because you completed the business diagnostic.</p>
    </div>

  </div>
</body>
</html>`;

  return resend.emails.send({
    from: 'Lean Dirt <noreply@leandirt.com>',
    to,
    subject: `Your Lean Dirt diagnostic results${company ? ` — ${company}` : ''}`,
    html,
  });
}
