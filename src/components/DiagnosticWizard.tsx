'use client';

import { useState, useId } from 'react';
import {
  LineOfBusiness,
  TargetInputs,
  calcLineMetrics,
  calcCompanyMetrics,
  calcTargetMetrics,
  fmt$,
  fmt$0,
  fmtPct,
  fmtNum,
} from '@/lib/calculations';

type Phase = 1 | 2 | 3 | 'gate' | 4 | 5;

const EMPTY_LINE = (): LineOfBusiness => ({
  id: Math.random().toString(36).slice(2),
  name: '',
  revenue: 0,
  directExpenses: 0,
  units: 0,
  unitName: '',
});

const DEFAULT_TARGET: TargetInputs = {
  targetDate: '',
  netProfitGoal: 0,
  grossMarginGoalPct: 0,
  overheadGuardrail: 0,
};

function NumInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  placeholder,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-amber-500">
        {prefix && <span className="px-3 py-2 bg-gray-50 text-gray-500 border-r border-gray-300">{prefix}</span>}
        <input
          id={id}
          type="number"
          min={0}
          value={value || ''}
          placeholder={placeholder ?? '0'}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="flex-1 px-3 py-2 outline-none text-gray-900 bg-white"
        />
        {suffix && <span className="px-3 py-2 bg-gray-50 text-gray-500 border-l border-gray-300">{suffix}</span>}
      </div>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
      />
    </div>
  );
}

function MetricBadge({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg p-3 ${highlight ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50 border border-gray-200'}`}>
      <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
      <div className={`text-lg font-bold mt-0.5 ${highlight ? 'text-amber-700' : 'text-gray-900'}`}>{value}</div>
    </div>
  );
}

export default function DiagnosticWizard() {
  const [phase, setPhase] = useState<Phase>(1);
  const [lines, setLines] = useState<LineOfBusiness[]>([EMPTY_LINE()]);
  const [overhead, setOverhead] = useState(0);
  const [target, setTarget] = useState<TargetInputs>(DEFAULT_TARGET);
  const [revenuePerUnitOverrides, setRevenuePerUnitOverrides] = useState<Record<string, number>>({});
  const [assumptionAnswer, setAssumptionAnswer] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const companyMetrics = calcCompanyMetrics(lines, overhead);
  const targetMetrics = calcTargetMetrics(lines, target, revenuePerUnitOverrides);

  const updateLine = (id: string, patch: Partial<LineOfBusiness>) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  const addLine = () => setLines((prev) => [...prev, EMPTY_LINE()]);
  const removeLine = (id: string) => setLines((prev) => prev.filter((l) => l.id !== id));

  const handleSaveLead = async () => {
    if (!email) return;
    setSaving(true);
    setSaveError('');
    try {
      const res = await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          company,
          diagnosticData: {
            lines,
            overhead,
            companyMetrics,
            target,
            targetMetrics,
          },
        }),
      });
      if (!res.ok) throw new Error('Save failed');
      setPhase(4);
    } catch {
      setSaveError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const progress = phase === 1 ? 20 : phase === 2 ? 40 : phase === 3 ? 60 : phase === 'gate' ? 70 : phase === 4 ? 85 : 100;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-900 text-lg">Lean Dirt</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 text-sm">Business Diagnostic</span>
          </div>
          <div className="text-sm text-gray-500">
            {phase === 1 && 'Phase 1 of 4'}
            {phase === 2 && 'Phase 2 of 4'}
            {phase === 3 && 'Phase 3 of 4'}
            {phase === 'gate' && 'Saving your results…'}
            {phase === 4 && 'Phase 4 of 4'}
            {phase === 5 && 'Next steps'}
          </div>
        </div>
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-amber-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">

        {/* ── PHASE 1 ── */}
        {phase === 1 && (
          <div className="space-y-8">
            <div>
              <div className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-1">Phase 1</div>
              <h1 className="text-3xl font-bold text-gray-900">Establish the Baseline</h1>
              <p className="text-gray-600 mt-2">
                Enter your actual numbers from the last 12 months. No estimates — pull your P&L.
              </p>
            </div>

            {lines.map((line, idx) => {
              const m = calcLineMetrics(line);
              return (
                <div key={line.id} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800">
                      {lines.length > 1 ? `Line of Business ${idx + 1}` : 'Your Line of Business'}
                    </h2>
                    {lines.length > 1 && (
                      <button onClick={() => removeLine(line.id)} className="text-red-400 hover:text-red-600 text-sm">
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <TextInput
                      label="Name of this line"
                      value={line.name}
                      onChange={(v) => updateLine(line.id, { name: v })}
                      placeholder="e.g. Crushing, Hauling, Equipment Rental"
                    />
                    <TextInput
                      label="Unit of output"
                      value={line.unitName}
                      onChange={(v) => updateLine(line.id, { unitName: v })}
                      placeholder="e.g. tons, hours, CY"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <NumInput label="Revenue (12 mo)" value={line.revenue} onChange={(v) => updateLine(line.id, { revenue: v })} prefix="$" />
                    <NumInput label="Direct Expenses (12 mo)" value={line.directExpenses} onChange={(v) => updateLine(line.id, { directExpenses: v })} prefix="$" />
                    <NumInput label={`Units Produced (${line.unitName || 'units'})`} value={line.units} onChange={(v) => updateLine(line.id, { units: v })} />
                  </div>

                  {line.revenue > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-gray-100">
                      <MetricBadge label="Gross Profit" value={fmt$0(m.grossProfit)} />
                      <MetricBadge label="Gross Margin" value={fmtPct(m.grossMarginPct)} highlight />
                      <MetricBadge label={`Rev / ${line.unitName || 'unit'}`} value={fmt$(m.revenuePerUnit)} />
                      <MetricBadge label={`Cost / ${line.unitName || 'unit'}`} value={fmt$(m.costPerUnit)} highlight />
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={addLine}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-amber-400 hover:text-amber-600 transition-colors text-sm font-medium"
            >
              + Add another line of business
            </button>

            {/* Overhead */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-800 mb-4">Company Overhead (annual)</h2>
              <p className="text-sm text-gray-500 mb-4">Shared costs not tied to any single line — office, admin, owner salary, etc.</p>
              <NumInput label="Total Annual Overhead" value={overhead} onChange={setOverhead} prefix="$" />

              {companyMetrics.totalRevenue > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 pt-4 border-t border-gray-100">
                  <MetricBadge label="Total Revenue" value={fmt$0(companyMetrics.totalRevenue)} />
                  <MetricBadge label="Total Gross Profit" value={fmt$0(companyMetrics.totalGrossProfit)} />
                  <MetricBadge label="Blended GM%" value={fmtPct(companyMetrics.blendedGrossMarginPct)} highlight />
                  <MetricBadge label="Net Profit" value={fmt$0(companyMetrics.netProfit)} highlight={companyMetrics.netProfit > 0} />
                </div>
              )}
            </div>

            {(lines.some((l) => !l.name || !l.revenue || !l.directExpenses || !l.units || !l.unitName) || overhead <= 0) && (
              <p className="text-sm text-amber-700 text-center">
                Complete all fields for each line of business and enter your overhead to continue.
              </p>
            )}
            <button
              onClick={() => setPhase(2)}
              disabled={lines.some((l) => !l.name || !l.revenue || !l.directExpenses || !l.units || !l.unitName) || overhead <= 0}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-4 rounded-xl transition-colors text-lg"
            >
              Continue to Phase 2: Set the Target →
            </button>
          </div>
        )}

        {/* ── PHASE 2 ── */}
        {phase === 2 && (
          <div className="space-y-8">
            <div>
              <div className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-1">Phase 2</div>
              <h1 className="text-3xl font-bold text-gray-900">Set the Target</h1>
              <p className="text-gray-600 mt-2">
                Where do you want the business to be, and by when? Be specific.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
              <TextInput
                label="Target date (month and year)"
                value={target.targetDate}
                onChange={(v) => setTarget((t) => ({ ...t, targetDate: v }))}
                placeholder="e.g. December 2026"
              />
              <NumInput
                label="Annual net profit goal ($)"
                value={target.netProfitGoal}
                onChange={(v) => setTarget((t) => ({ ...t, netProfitGoal: v }))}
                prefix="$"
                placeholder="e.g. 500000"
              />
              <NumInput
                label="Gross margin goal (%)"
                value={target.grossMarginGoalPct}
                onChange={(v) => setTarget((t) => ({ ...t, grossMarginGoalPct: v }))}
                suffix="%"
                placeholder={`Last year: ${fmtPct(companyMetrics.blendedGrossMarginPct)}`}
              />
              {target.grossMarginGoalPct > 0 && target.grossMarginGoalPct <= companyMetrics.blendedGrossMarginPct && (
                <p className="text-amber-700 text-sm bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  ⚠️ Your GM goal ({fmtPct(target.grossMarginGoalPct)}) is at or below last year&apos;s actual ({fmtPct(companyMetrics.blendedGrossMarginPct)}). The goal should be better than last year.
                </p>
              )}
              <NumInput
                label="Overhead guardrail — max overhead you'll allow ($)"
                value={target.overheadGuardrail}
                onChange={(v) => setTarget((t) => ({ ...t, overheadGuardrail: v }))}
                prefix="$"
                placeholder={`Current overhead: ${fmt$(overhead)}`}
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setPhase(1)} className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">
                ← Back
              </button>
              <button
                onClick={() => setPhase(3)}
                disabled={!target.targetDate || !target.netProfitGoal || !target.grossMarginGoalPct || !target.overheadGuardrail}
                className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Continue to Phase 3: Back Into the Numbers →
              </button>
            </div>
          </div>
        )}

        {/* ── PHASE 3 ── */}
        {phase === 3 && (
          <div className="space-y-8">
            <div>
              <div className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-1">Phase 3</div>
              <h1 className="text-3xl font-bold text-gray-900">Back Into the Numbers</h1>
              <p className="text-gray-600 mt-2">
                Given your goals, here&apos;s what the business has to produce — and what each line has to cost.
              </p>
            </div>

            {/* Required revenue reveal */}
            <div className="bg-amber-500 text-white rounded-2xl p-6">
              <div className="text-amber-100 text-sm uppercase tracking-widest mb-1">Required Revenue to Hit Your Goals</div>
              <div className="text-5xl font-black">{fmt$(targetMetrics.requiredRevenue)}</div>
              <div className="text-amber-100 mt-2 text-sm">
                vs. current {fmt$0(companyMetrics.totalRevenue)} — a {fmt$0(targetMetrics.requiredRevenue - companyMetrics.totalRevenue)} gap
              </div>
            </div>

            {/* Feasibility check */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <h2 className="font-semibold text-gray-800">Is that revenue achievable in your market by {target.targetDate}?</h2>
              <p className="text-sm text-gray-500">If not, which lever do you want to revisit: net profit goal, gross margin goal, or overhead guardrail? You can go back and adjust.</p>
              <div className="flex gap-3">
                <button onClick={() => setPhase(2)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                  ← Revisit targets
                </button>
                <span className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 font-medium">
                  ✓ Achievable — continue
                </span>
              </div>
            </div>

            {/* Per-line breakdown */}
            {lines.map((line) => {
              const current = calcLineMetrics(line);
              const overrideRpu = revenuePerUnitOverrides[line.id];
              return (
                <div key={line.id} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                  <h2 className="font-semibold text-gray-800">{line.name || `Line ${line.id.slice(0, 4)}`}</h2>
                  <div className="grid grid-cols-3 gap-3">
                    <MetricBadge label="Required Revenue" value={fmt$0(targetMetrics.requiredRevenueByLine[line.id] ?? 0)} highlight />
                    <MetricBadge label={`Required Output (${line.unitName})`} value={fmtNum(targetMetrics.requiredOutputByLine[line.id] ?? 0)} highlight />
                    <MetricBadge label={`Max Cost / ${line.unitName}`} value={fmt$(targetMetrics.maxCostPerUnitByLine[line.id] ?? 0)} highlight />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Will revenue per {line.unitName} go flat, up, or down? Set your target:
                    </label>
                    <div className="flex gap-3 items-center">
                      <span className="text-sm text-gray-500">Current: {fmt$(current.revenuePerUnit)} / {line.unitName}</span>
                      <input
                        type="number"
                        min={0}
                        placeholder={`${current.revenuePerUnit.toFixed(2)}`}
                        value={overrideRpu ?? ''}
                        onChange={(e) => setRevenuePerUnitOverrides((prev) => ({
                          ...prev,
                          [line.id]: parseFloat(e.target.value) || current.revenuePerUnit,
                        }))}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-36 focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex gap-3">
              <button onClick={() => setPhase(2)} className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">
                ← Back
              </button>
              <button
                onClick={() => setPhase('gate')}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Continue to Phase 4: Make It Visible →
              </button>
            </div>
          </div>
        )}

        {/* ── EMAIL GATE ── */}
        {phase === 'gate' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-5xl mb-4">📊</div>
              <h1 className="text-3xl font-bold text-gray-900">Save your diagnostic</h1>
              <p className="text-gray-600 mt-2 max-w-md mx-auto">
                Phase 4 shows your current state vs. target side by side — every metric, every line, the gap in plain sight. Enter your info to save it and continue.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <TextInput label="Your name" value={name} onChange={setName} placeholder="First Last" />
              <TextInput label="Company name" value={company} onChange={setCompany} placeholder="Your business name" />
              <TextInput label="Email address" value={email} onChange={setEmail} placeholder="you@company.com" type="email" />
              <p className="text-xs text-gray-400">No spam. Your numbers stay private. We use this to send you a copy of your results.</p>
              {saveError && <p className="text-red-500 text-sm">{saveError}</p>}
              <button
                onClick={handleSaveLead}
                disabled={!email || saving}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-4 rounded-xl transition-colors"
              >
                {saving ? 'Saving…' : 'Show me Phase 4 →'}
              </button>
            </div>

            <button onClick={() => setPhase(3)} className="w-full text-gray-400 text-sm hover:text-gray-600">
              ← Go back
            </button>
          </div>
        )}

        {/* ── PHASE 4 ── */}
        {phase === 4 && (
          <div className="space-y-8">
            <div>
              <div className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-1">Phase 4</div>
              <h1 className="text-3xl font-bold text-gray-900">Make It Visible</h1>
              <p className="text-gray-600 mt-2">
                Current state vs. target state — your numbers, no story.
              </p>
            </div>

            {lines.map((line) => {
              const cur = calcLineMetrics(line);
              const reqRev = targetMetrics.requiredRevenueByLine[line.id] ?? 0;
              const reqOut = targetMetrics.requiredOutputByLine[line.id] ?? 0;
              const maxCost = targetMetrics.maxCostPerUnitByLine[line.id] ?? 0;
              const targetRpu = targetMetrics.targetRevenuePerUnit[line.id] ?? cur.revenuePerUnit;
              const targetGP = reqRev * (target.grossMarginGoalPct / 100);
              const targetDE = reqRev - targetGP;
              return (
                <div key={line.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h2 className="font-semibold text-gray-800">{line.name}</h2>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="px-6 py-3 text-left text-gray-500 font-medium">Metric</th>
                        <th className="px-6 py-3 text-right text-gray-500 font-medium">Current</th>
                        <th className="px-6 py-3 text-right text-amber-600 font-medium">Target</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        { label: 'Revenue', cur: fmt$0(line.revenue), tgt: fmt$0(reqRev) },
                        { label: 'Direct Expenses', cur: fmt$0(line.directExpenses), tgt: fmt$0(targetDE) },
                        { label: 'Gross Profit', cur: fmt$0(cur.grossProfit), tgt: fmt$0(targetGP) },
                        { label: 'Gross Margin %', cur: fmtPct(cur.grossMarginPct), tgt: fmtPct(target.grossMarginGoalPct) },
                        { label: `Output (${line.unitName})`, cur: fmtNum(line.units), tgt: fmtNum(reqOut) },
                        { label: `Rev / ${line.unitName}`, cur: fmt$(cur.revenuePerUnit), tgt: fmt$(targetRpu) },
                        { label: `Cost / ${line.unitName}`, cur: fmt$(cur.costPerUnit), tgt: fmt$(maxCost), isKey: true },
                      ].map((row) => (
                        <tr key={row.label} className={row.isKey ? 'bg-amber-50' : ''}>
                          <td className={`px-6 py-3 font-medium ${row.isKey ? 'text-amber-800' : 'text-gray-700'}`}>{row.label}{row.isKey && ' ⭐'}</td>
                          <td className="px-6 py-3 text-right text-gray-600">{row.cur}</td>
                          <td className={`px-6 py-3 text-right font-semibold ${row.isKey ? 'text-amber-700' : 'text-gray-900'}`}>{row.tgt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}

            {/* Company total */}
            <div className="bg-gray-900 text-white rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="font-semibold">Company Total</h2>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-6 py-3 text-left text-gray-400 font-medium">Metric</th>
                    <th className="px-6 py-3 text-right text-gray-400 font-medium">Current</th>
                    <th className="px-6 py-3 text-right text-amber-400 font-medium">Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {[
                    { label: 'Total Revenue', cur: fmt$0(companyMetrics.totalRevenue), tgt: fmt$0(targetMetrics.requiredRevenue) },
                    { label: 'Total Gross Profit', cur: fmt$0(companyMetrics.totalGrossProfit), tgt: fmt$0(targetMetrics.requiredRevenue * (target.grossMarginGoalPct / 100)) },
                    { label: 'Blended GM%', cur: fmtPct(companyMetrics.blendedGrossMarginPct), tgt: fmtPct(target.grossMarginGoalPct) },
                    { label: 'Overhead', cur: fmt$0(overhead), tgt: fmt$0(target.overheadGuardrail) },
                    { label: 'Net Profit', cur: fmt$0(companyMetrics.netProfit), tgt: fmt$0(target.netProfitGoal), isKey: true },
                  ].map((row) => (
                    <tr key={row.label} className={row.isKey ? 'bg-amber-900/30' : ''}>
                      <td className={`px-6 py-3 font-medium ${row.isKey ? 'text-amber-300' : 'text-gray-300'}`}>{row.label}</td>
                      <td className="px-6 py-3 text-right text-gray-400">{row.cur}</td>
                      <td className={`px-6 py-3 text-right font-bold ${row.isKey ? 'text-amber-400 text-lg' : 'text-white'}`}>{row.tgt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Gap questions */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <h2 className="font-semibold text-gray-800">Where is the biggest gap — and what story doesn&apos;t survive these numbers?</h2>
              <p className="text-sm text-gray-500">
                Look at the table above. Pick the line and metric where current is furthest from target. Then answer honestly:
              </p>
              <textarea
                value={assumptionAnswer}
                onChange={(e) => setAssumptionAnswer(e.target.value)}
                placeholder="The assumption I've been carrying that doesn't survive these numbers is..."
                className="w-full border border-gray-300 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-amber-500 resize-none h-28"
              />
            </div>

            <button
              onClick={() => setPhase(5)}
              disabled={!assumptionAnswer.trim()}
              className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-4 rounded-xl transition-colors text-lg"
            >
              I&apos;ve named it. What&apos;s next? →
            </button>
          </div>
        )}

        {/* ── PHASE 5 (PITCH) ── */}
        {phase === 5 && (
          <div className="space-y-8">
            <div className="bg-amber-500 rounded-2xl p-8 text-white">
              <div className="text-amber-100 text-sm font-semibold uppercase tracking-widest mb-2">You just did something most owners never do.</div>
              <h1 className="text-3xl font-bold leading-tight">
                You typed &ldquo;{assumptionAnswer.slice(0, 80)}{assumptionAnswer.length > 80 ? '…' : ''}&rdquo;
              </h1>
              <p className="mt-3 text-amber-100">
                That&apos;s the gap. It&apos;s in your own words, in your own numbers. What happens next is Phase 5.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <div className="text-amber-600 text-sm font-semibold uppercase tracking-widest">Phase 5: Attack the Constraint</div>
              <h2 className="text-xl font-bold text-gray-900">Pick the priority line. Identify the binding constraint. Build a 30-day initiative. Own it.</h2>
              <p className="text-gray-600 text-sm">
                This is where the diagnostic becomes execution. Phases 1–4 tell you what the gap is. Phase 5 is twelve months of disciplined work to close it — identifying the real constraint (not the loudest one), assigning ownership, setting leading indicators, reviewing weekly, and standardizing every gain.
              </p>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 opacity-60">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">🔒 Phase 5 Questions (preview)</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Which line of business is the priority focus right now?</li>
                  <li>What is the single biggest reason it can&apos;t hit target today?</li>
                  <li>What is the highest-leverage initiative you can action in the next 30 days?</li>
                  <li>Who owns it? By when? What&apos;s the leading indicator?</li>
                  <li className="text-gray-400 italic">…and 9 more questions that drive 12 months of execution.</li>
                </ul>
              </div>

              <p className="text-gray-700 font-medium">
                The highest-stakes call in Phase 5 is picking the right constraint. Contractors who pick the loudest problem instead of the binding one spend 90 days on the wrong fight. That&apos;s the call I help dirt contractors get right.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gray-900 text-white rounded-2xl p-8 space-y-4">
              <h2 className="text-2xl font-bold">This is what 12 months looks like.</h2>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✓ Identify the binding constraint — not the loudest one</li>
                <li>✓ 2x monthly coaching calls to work the constraint</li>
                <li>✓ Daily visibility on the governing metric</li>
                <li>✓ Standardize every gain, train the team, move to the next constraint</li>
                <li>✓ Built for horizontal contractors: crushing, hauling, civil, asphalt</li>
              </ul>
              <a
                href="https://leandirt.com/contact"
                className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-white font-bold py-4 rounded-xl transition-colors text-lg mt-2"
              >
                Let&apos;s talk — book a call with Zack →
              </a>
              <p className="text-gray-500 text-xs text-center">
                You already did the diagnostic. The call is 20 minutes. We look at Phase 5 together.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-3xl mx-auto px-4 py-8 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} Lean Dirt · <a href="https://leandirt.com" className="hover:text-gray-600">leandirt.com</a>
      </footer>
    </div>
  );
}
