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

  const targetGPByLine: Record<string, number> = {};
  const targetDEByLine: Record<string, number> = {};
  const maxCostPerUnitByLine: Record<string, number> = {};

  for (const line of lines) {
    const gm = (target.grossMarginGoalByLine[line.id] ?? 0) / 100;
    const targetGP = line.revenue * gm;
    const targetDE = line.revenue * (1 - gm);
    targetGPByLine[line.id] = targetGP;
    targetDEByLine[line.id] = targetDE;
    maxCostPerUnitByLine[line.id] = line.units > 0 ? targetDE / line.units : 0;
  }

  const totalGPAtTarget = Object.values(targetGPByLine).reduce((s, v) => s + v, 0);
  const blendedGMAtTarget = totalRevenue > 0 ? (totalGPAtTarget / totalRevenue) * 100 : 0;
  const netProfitAtTarget = totalGPAtTarget - target.overheadGuardrail;

  const requiredRevenueByLine: Record<string, number> = {};
  const requiredOutputByLine: Record<string, number> = {};
  let requiredRevenue = totalRevenue;

  if (target.netProfitGoal > 0 && totalGPAtTarget > 0) {
    const requiredTotalGP = target.netProfitGoal + target.overheadGuardrail;
    const gpScaleFactor = requiredTotalGP / totalGPAtTarget;
    requiredRevenue = 0;

    for (const line of lines) {
      const gm = (target.grossMarginGoalByLine[line.id] ?? 0) / 100;
      const lineReqGP = targetGPByLine[line.id] * gpScaleFactor;
      const lineReqRev = gm > 0 ? lineReqGP / gm : line.revenue;
      const revPerUnit = line.units > 0 ? line.revenue / line.units : 0;
      requiredRevenueByLine[line.id] = lineReqRev;
      requiredOutputByLine[line.id] = revPerUnit > 0 ? lineReqRev / revPerUnit : 0;
      requiredRevenue += lineReqRev;
    }
  } else {
    for (const line of lines) {
      requiredRevenueByLine[line.id] = line.revenue;
      const revPerUnit = line.units > 0 ? line.revenue / line.units : 0;
      requiredOutputByLine[line.id] = line.units;
      void revPerUnit; // suppress unused warning
    }
    requiredRevenue = totalRevenue;
  }

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
