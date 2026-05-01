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
  grossMarginGoalPct: number;
  overheadGuardrail: number;
}

export interface TargetMetrics {
  requiredRevenue: number;
  requiredRevenueByLine: Record<string, number>;
  requiredOutputByLine: Record<string, number>;
  maxCostPerUnitByLine: Record<string, number>;
  targetRevenuePerUnit: Record<string, number>;
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
  revenuePerUnitOverrides: Record<string, number>
): TargetMetrics {
  const gmDecimal = target.grossMarginGoalPct / 100;
  const requiredRevenue =
    gmDecimal > 0 ? (target.netProfitGoal + target.overheadGuardrail) / gmDecimal : 0;

  const totalCurrentRevenue = lines.reduce((s, l) => s + l.revenue, 0);

  const requiredRevenueByLine: Record<string, number> = {};
  const requiredOutputByLine: Record<string, number> = {};
  const maxCostPerUnitByLine: Record<string, number> = {};
  const targetRevenuePerUnit: Record<string, number> = {};

  for (const line of lines) {
    const share = totalCurrentRevenue > 0 ? line.revenue / totalCurrentRevenue : 1 / lines.length;
    const lineRequiredRevenue = requiredRevenue * share;
    requiredRevenueByLine[line.id] = lineRequiredRevenue;

    const revPerUnit = revenuePerUnitOverrides[line.id] ?? calcLineMetrics(line).revenuePerUnit;
    targetRevenuePerUnit[line.id] = revPerUnit;

    requiredOutputByLine[line.id] = revPerUnit > 0 ? lineRequiredRevenue / revPerUnit : 0;
    maxCostPerUnitByLine[line.id] = revPerUnit * (1 - gmDecimal);
  }

  return {
    requiredRevenue,
    requiredRevenueByLine,
    requiredOutputByLine,
    maxCostPerUnitByLine,
    targetRevenuePerUnit,
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
