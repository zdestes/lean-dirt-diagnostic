export interface LineOfBusiness {
  id: string;
  name: string;
  revenue: number;
  directExpenses: number;
  units: number;
  unitName: string;
}

export interface LineMetrics {
  grossProfit: number;
  grossMarginPct: number;
  revenuePerUnit: number;
  costPerUnit: number;
}

export interface CompanyMetrics {
  totalRevenue: number;
  totalGrossProfit: number;
  blendedGrossMarginPct: number;
  netProfit: number;
}

export interface TargetInputs {
  targetDate: string;
  netProfitGoal: number;
  overheadGuardrail: number;
  grossMarginGoalByLine: Record<string, number>; // line.id → GM% as 0-100
}

export interface TargetMetrics {
  requiredRevenue: number;
  requiredRevenueByLine: Record<string, number>;
  requiredOutputByLine: Record<string, number>;
  maxCostPerUnitByLine: Record<string, number>;
  targetGPByLine: Record<string, number>;
  targetDEByLine: Record<string, number>;
  blendedGMAtTarget: number;
  netProfitAtTarget: number;
}

export function calcLineMetrics(line: LineOfBusiness): LineMetrics {
  const grossProfit = line.revenue - line.directExpenses;
  const grossMarginPct = line.revenue > 0 ? (grossProfit / line.revenue) * 100 : 0;
  const revenuePerUnit = line.units > 0 ? line.revenue / line.units : 0;
  const costPerUnit = line.units > 0 ? line.directExpenses / line.units : 0;
  return { grossProfit, grossMarginPct, revenuePerUnit, costPerUnit };
}

export function calcCompanyMetrics(lines: LineOfBusiness[], overhead: number): CompanyMetrics {
  const totalRevenue = lines.reduce((s, l) => s + l.revenue, 0);
  const totalDirectExp = lines.reduce((s, l) => s + l.directExpenses, 0);
  const totalGrossProfit = totalRevenue - totalDirectExp;
  const blendedGrossMarginPct = totalRevenue > 0 ? (totalGrossProfit / totalRevenue) * 100 : 0;
  const netProfit = totalGrossProfit - overhead;
  return { totalRevenue, totalGrossProfit, blendedGrossMarginPct, netProfit };
}

export function calcTargetMetrics(
  lines: LineOfBusiness[],
  target: TargetInputs,
): TargetMetrics {
  const totalRevenue = lines.reduce((s, l) => s + l.revenue, 0);

  // First pass: compute required revenue per line (scaled to hit profit goal)
  const requiredRevenueByLine: Record<string, number> = {};
  const requiredOutputByLine: Record<string, number> = {};
  let requiredRevenue = totalRevenue;

  // Calculate GP at current revenue with target margins (to get scale factor)
  const baseGPByLine: Record<string, number> = {};
  for (const line of lines) {
    const gm = (target.grossMarginGoalByLine[line.id] ?? 0) / 100;
    baseGPByLine[line.id] = line.revenue * gm;
  }
  const totalBaseGP = Object.values(baseGPByLine).reduce((s, v) => s + v, 0);

  if (target.netProfitGoal > 0 && totalBaseGP > 0) {
    const requiredTotalGP = target.netProfitGoal + target.overheadGuardrail;
    const gpScaleFactor = requiredTotalGP / totalBaseGP;
    requiredRevenue = 0;
    for (const line of lines) {
      const gm = (target.grossMarginGoalByLine[line.id] ?? 0) / 100;
      const lineReqGP = baseGPByLine[line.id] * gpScaleFactor;
      const lineReqRev = gm > 0 ? lineReqGP / gm : line.revenue;
      const revPerUnit = line.units > 0 ? line.revenue / line.units : 0;
      requiredRevenueByLine[line.id] = lineReqRev;
      requiredOutputByLine[line.id] = revPerUnit > 0 ? lineReqRev / revPerUnit : 0;
      requiredRevenue += lineReqRev;
    }
  } else {
    for (const line of lines) {
      requiredRevenueByLine[line.id] = line.revenue;
      requiredOutputByLine[line.id] = line.units;
    }
    requiredRevenue = totalRevenue;
  }

  // Second pass: compute target GP/DE/cost using required revenue (so they're consistent)
  const targetGPByLine: Record<string, number> = {};
  const targetDEByLine: Record<string, number> = {};
  const maxCostPerUnitByLine: Record<string, number> = {};

  for (const line of lines) {
    const gm = (target.grossMarginGoalByLine[line.id] ?? 0) / 100;
    const reqRev = requiredRevenueByLine[line.id];
    const targetGP = reqRev * gm;
    const targetDE = reqRev * (1 - gm);
    targetGPByLine[line.id] = targetGP;
    targetDEByLine[line.id] = targetDE;
    maxCostPerUnitByLine[line.id] = line.units > 0 ? targetDE / requiredOutputByLine[line.id] : 0;
  }

  const totalGPAtTarget = Object.values(targetGPByLine).reduce((s, v) => s + v, 0);
  const blendedGMAtTarget = requiredRevenue > 0 ? (totalGPAtTarget / requiredRevenue) * 100 : 0;
  const netProfitAtTarget = totalGPAtTarget - target.overheadGuardrail;

  return {
    requiredRevenue,
    requiredRevenueByLine,
    requiredOutputByLine,
    maxCostPerUnitByLine,
    targetGPByLine,
    targetDEByLine,
    blendedGMAtTarget,
    netProfitAtTarget,
  };
}

export function fmt$(n: number, decimals = 2): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** For large summary values where cents aren't meaningful */
export function fmt$0(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

export function fmtPct(n: number): string {
  return n.toFixed(1) + '%';
}

export function fmtNum(n: number, decimals = 0): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: decimals });
}
