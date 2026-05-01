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

type Step = 0 | 1 | 2 | 'gate' | 5;

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

function NumInput({ label, value, onChange, prefix, suffix, placeholder }: {
  label: string; value: number; onChange: (v: number) => void;
  prefix?: string; suffix?: string; placeholder?: string;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-amber-500">
        {prefix && <span className="px-3 py-2 bg-gray-50 text-gray-500 border-r border-gray-300">{prefix}</span>}
        <input id={id} type="number" min={0} value={value || ''} placeholder={placeholder ?? '0'}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="flex-1 px-3 py-2 outline-none text-gray-900 bg-white" />
        {suffix && <span className="px-3 py-2 bg-gray-50 text-gray-500 border-l border-gray-300">{suffix}</span>}
      </div>
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
      <input id={id} type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-amber-500 text-gray-900" />
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

function SliderInput({ label, value, onChange, min, max, step, format }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; format: (v: number) => string;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-lg font-bold text-amber-600">{format(value)}</span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500" />
      <div className="flex justify-between text-xs text-gray-400">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

export default function DiagnosticWizard() {
  const [step, setStep] = useState<Step>(0);
  const [lines, setLines] = useState<LineOfBusiness[]>([EMPTY_LINE()]);
  const [overhead, setOverhead] = useState(0);
  const [target, setTarget] = useState<TargetInputs>(DEFAULT_TARGET);
  const [revenuePerUnitOverrides, setRevenuePerUnitOverrides] = useState<Record<string, number>>({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const companyMetrics = calcCompanyMetrics(lines, overhead);
  const targetMetrics = calcTargetMetrics(lines, target, revenuePerUnitOverrides);

  const gmMin = Math.max(1, Math.floor(companyMetrics.blendedGrossMarginPct));
  const gmMax = Math.min(80, gmMin + 20);
  const ohMin = Math.round(overhead * 0.5 / 1000) * 1000;
  const ohMax = Math.round(overhead * 2.5 / 1000) * 1000 || 1000000;

  const updateLine = (id: string, patch: Partial<LineOfBusiness>) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const addLine = () => setLines((prev) => [...prev, EMPTY_LINE()]);
  const removeLine = (id: string) => setLines((prev) => prev.filter((l) => l.id !== id));

  const step1Complete = lines.every((l) => l.name && l.revenue && l.directExpenses && l.units && l.unitName) && overhead > 0;

  const enterStep2 = () => {
    setTarget((t) => ({
      ...t,
      grossMarginGoalPct: t.grossMarginGoalPct || parseFloat((companyMetrics.blendedGrossMarginPct + 2).toFixed(1)),
      overheadGuardrail: t.overheadGuardrail || overhead,
    }));
    setStep(2);
  };

  const showGap = target.netProfitGoal > 0 && target.grossMarginGoalPct > 0 && target.overheadGuardrail > 0 && !!target.targetDate;

  const handleSaveLead = async () => {
    if (!email) return;
    setSaving(true);
    setSaveError('');
    try {
      const res = await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, company, diagnosticData: { lines, overhead, companyMetrics, target, targetMetrics } }),
      });
      if (!res.ok) throw new Error();
      setStep(5);
    } catch {
      setSaveError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const progress = step === 0 ? 0 : step === 1 ? 30 : step === 2 ? 70 : step === 'gate' ? 88 : 100;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/wordmark.png" alt="Lean Dirt" className="h-7 w-auto" />
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 text-sm">Business Diagnostic</span>
          </div>
          <div className="text-sm text-gray-500">
            {step === 0 && 'Free Diagnostic'}
            {step === 1 && 'Step 1 of 2'}
            {step === 2 && 'Step 2 of 2'}
            {step === 'gate' && 'Almost there…'}
            {step === 5 && "What's next"}
          </div>
        </div>
        <div className="h-1 bg-gray-100">
          <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">

        {/* ── INTRO ── */}
        {step === 0 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">Find out exactly what your business needs to hit your profit goal.</h1>
              <p className="text-gray-600 mt-3 text-lg">Built for $5M–$30M civil contractors. This diagnostic takes about 10 minutes and uses your real numbers — not estimates — to show you the gap between where you are and where you need to be, line by line.</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4">
              <h2 className="font-semibold text-amber-900 text-lg">Before you start — grab your P&L</h2>
              <p className="text-amber-800 text-sm">You&apos;ll need the last 12 months of actuals. No estimates. Pull your profit &amp; loss statement and have it open.</p>
              <div className="space-y-2">
                {[
                  'Revenue by line of business',
                  'Direct expenses by line of business',
                  'Units of output produced (tons crushed, hours rented, CY moved, etc.)',
                  'Total overhead (office, admin, owner salary — shared costs)',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-amber-800">
                    <span className="text-amber-500 mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: '📊', label: '10 minutes', sub: 'to complete' },
                { icon: '🔒', label: 'Private', sub: 'your numbers stay yours' },
                { icon: '🎯', label: 'Line by line', sub: 'not just company totals' },
              ].map((item) => (
                <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.sub}</div>
                </div>
              ))}
            </div>

            <button onClick={() => setStep(1)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-5 rounded-xl transition-colors text-xl">
              I have my P&L — let&apos;s go →
            </button>
            <p className="text-center text-xs text-gray-400">Built for $5M–$30M civil contractors: crushing, hauling, asphalt, grading</p>
          </div>
        )}

        {/* ── STEP 1: BASELINE ── */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Where does the business stand today?</h1>
              <p className="text-gray-600 mt-2">Enter your actual numbers from the last 12 months. Pull your P&L — no estimates.</p>
            </div>

            {lines.map((line, idx) => {
              const m = calcLineMetrics(line);
              const showMetrics = line.revenue > 0 && line.directExpenses > 0 && line.units > 0;
              return (
                <div key={line.id} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800">
                      {lines.length > 1 ? `Line of Business ${idx + 1}` : 'Your Line of Business'}
                    </h2>
                    {lines.length > 1 && (
                      <button onClick={() => removeLine(line.id)} className="text-red-400 hover:text-red-600 text-sm">Remove</button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <TextInput label="Name of this line" value={line.name} onChange={(v) => updateLine(line.id, { name: v })} placeholder="e.g. Crushing, Hauling, Equipment Rental" />
                    <TextInput label="Unit of output" value={line.unitName} onChange={(v) => updateLine(line.id, { unitName: v })} placeholder="e.g. tons, hours, CY" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <NumInput label="Revenue (12 mo)" value={line.revenue} onChange={(v) => updateLine(line.id, { revenue: v })} prefix="$" />
                    <NumInput label="Direct Expenses (12 mo)" value={line.directExpenses} onChange={(v) => updateLine(line.id, { directExpenses: v })} prefix="$" />
                    <NumInput label="Units Produced" value={line.units} onChange={(v) => updateLine(line.id, { units: v })} suffix={line.unitName || 'units'} />
                  </div>
                  {showMetrics && (
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

            <button onClick={addLine} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-amber-400 hover:text-amber-600 transition-colors text-sm font-medium">
              + Add another line of business
            </button>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-800 mb-1">Company Overhead (annual)</h2>
              <p className="text-sm text-gray-500 mb-4">Shared costs not tied to any single line — office, admin, owner salary, etc.</p>
              <NumInput label="Total Annual Overhead" value={overhead} onChange={setOverhead} prefix="$" />
              {companyMetrics.totalRevenue > 0 && overhead > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 pt-4 border-t border-gray-100">
                  <MetricBadge label="Total Revenue" value={fmt$0(companyMetrics.totalRevenue)} />
                  <MetricBadge label="Total Gross Profit" value={fmt$0(companyMetrics.totalGrossProfit)} />
                  <MetricBadge label="Blended GM%" value={fmtPct(companyMetrics.blendedGrossMarginPct)} highlight />
                  <MetricBadge label="Net Profit" value={fmt$0(companyMetrics.netProfit)} highlight={companyMetrics.netProfit > 0} />
                </div>
              )}
            </div>

            {!step1Complete && (
              <p className="text-sm text-amber-700 text-center">Complete all fields for each line and enter your overhead to continue.</p>
            )}
            <button onClick={enterStep2} disabled={!step1Complete}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-4 rounded-xl transition-colors text-lg">
              Set your target and see the gap →
            </button>
          </div>
        )}

        {/* ── STEP 2: TARGET + GAP ── */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Where do you want to be — and what does it take?</h1>
              <p className="text-gray-600 mt-2">Set your goal, adjust the levers, and watch the gap update in real time.</p>
            </div>

            {/* Goals + sliders */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <TextInput label="Target date" value={target.targetDate} onChange={(v) => setTarget((t) => ({ ...t, targetDate: v }))} placeholder="e.g. December 2027" />
                <NumInput label="Net profit goal (annual)" value={target.netProfitGoal} onChange={(v) => setTarget((t) => ({ ...t, netProfitGoal: v }))} prefix="$" />
              </div>
              <hr className="border-gray-100" />
              <SliderInput
                label="Gross margin goal"
                value={target.grossMarginGoalPct}
                onChange={(v) => setTarget((t) => ({ ...t, grossMarginGoalPct: v }))}
                min={gmMin} max={gmMax} step={0.1}
                format={(v) => fmtPct(v)}
              />
              {target.grossMarginGoalPct > 0 && target.grossMarginGoalPct <= companyMetrics.blendedGrossMarginPct && (
                <p className="text-amber-700 text-sm bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  ⚠️ GM goal ({fmtPct(target.grossMarginGoalPct)}) is at or below last year&apos;s actual ({fmtPct(companyMetrics.blendedGrossMarginPct)}). It should improve.
                </p>
              )}
              <SliderInput
                label="Overhead guardrail (max you'll allow)"
                value={target.overheadGuardrail}
                onChange={(v) => setTarget((t) => ({ ...t, overheadGuardrail: v }))}
                min={ohMin} max={ohMax} step={10000}
                format={(v) => `${fmt$0(v)}  (${companyMetrics.totalRevenue > 0 ? fmtPct(v / companyMetrics.totalRevenue * 100) : '—'} of rev)`}
              />
              <p className="text-xs text-gray-400">Current overhead: {fmt$0(overhead)} ({companyMetrics.totalRevenue > 0 ? fmtPct(overhead / companyMetrics.totalRevenue * 100) : '—'} of revenue)</p>
            </div>

            {/* Live required revenue */}
            {showGap && (
              <div className="bg-amber-500 text-white rounded-2xl p-6">
                <div className="text-amber-100 text-sm uppercase tracking-widest mb-1">Required revenue to hit your goals</div>
                <div className="text-5xl font-black">{fmt$0(targetMetrics.requiredRevenue)}</div>
                <div className="text-amber-100 mt-2 text-sm">
                  vs. current {fmt$0(companyMetrics.totalRevenue)} — a {fmt$0(Math.abs(targetMetrics.requiredRevenue - companyMetrics.totalRevenue))} {targetMetrics.requiredRevenue > companyMetrics.totalRevenue ? 'increase needed' : 'surplus'}
                </div>
              </div>
            )}

            {/* Per-line comparison tables — visible once goal is set */}
            {showGap && lines.map((line) => {
              const cur = calcLineMetrics(line);
              const reqRev = targetMetrics.requiredRevenueByLine[line.id] ?? 0;
              const reqOut = targetMetrics.requiredOutputByLine[line.id] ?? 0;
              const maxCost = targetMetrics.maxCostPerUnitByLine[line.id] ?? 0;
              const targetRpu = targetMetrics.targetRevenuePerUnit[line.id] ?? cur.revenuePerUnit;
              const targetGP = reqRev * (target.grossMarginGoalPct / 100);
              const targetDE = reqRev - targetGP;
              return (
                <div key={line.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-semibold text-gray-800">{line.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Target rev / {line.unitName}:</span>
                      <input
                        type="number" min={0}
                        placeholder={cur.revenuePerUnit.toFixed(2)}
                        value={revenuePerUnitOverrides[line.id] ?? ''}
                        onChange={(e) => setRevenuePerUnitOverrides((prev) => ({
                          ...prev,
                          [line.id]: parseFloat(e.target.value) || cur.revenuePerUnit,
                        }))}
                        className="border border-gray-300 rounded px-2 py-1 text-sm w-24 text-center focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                      <span className="text-gray-400">(now: {fmt$(cur.revenuePerUnit)})</span>
                    </div>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="px-6 py-3 text-left text-gray-500 font-medium">Metric</th>
                        <th className="px-6 py-3 text-right text-gray-500 font-medium">Today</th>
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
            {showGap && (
              <div className="bg-gray-900 text-white rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700"><h2 className="font-semibold">Company Total</h2></div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-6 py-3 text-left text-gray-400 font-medium">Metric</th>
                      <th className="px-6 py-3 text-right text-gray-400 font-medium">Today</th>
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
                      <tr key={row.label} className={(row as { isKey?: boolean }).isKey ? 'bg-amber-900/30' : ''}>
                        <td className={`px-6 py-3 font-medium ${(row as { isKey?: boolean }).isKey ? 'text-amber-300' : 'text-gray-300'}`}>{row.label}</td>
                        <td className="px-6 py-3 text-right text-gray-400">{row.cur}</td>
                        <td className={`px-6 py-3 text-right font-bold ${(row as { isKey?: boolean }).isKey ? 'text-amber-400 text-lg' : 'text-white'}`}>{row.tgt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* CTA */}
            {showGap && (
              <div className="bg-gray-900 text-white rounded-2xl p-6 space-y-3">
                <h2 className="text-xl font-bold">Ready to work through what this means?</h2>
                <p className="text-gray-300 text-sm">The gap is in your numbers. What comes next is identifying the one constraint keeping you from closing it — and that&apos;s a conversation, not a worksheet.</p>
                <a href="https://leandirt.co/TYWjkBF"
                  className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-white font-bold py-4 rounded-xl transition-colors text-lg">
                  Book a free review call with Zack →
                </a>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">← Back</button>
              {showGap && (
                <button onClick={() => setStep('gate')}
                  className="flex-1 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition-colors">
                  Save a copy of my results →
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── EMAIL GATE ── */}
        {step === 'gate' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-5xl mb-4">📊</div>
              <h1 className="text-3xl font-bold text-gray-900">Save your results</h1>
              <p className="text-gray-600 mt-2 max-w-md mx-auto">We&apos;ll send you a copy so you have it for reference.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <TextInput label="Your name" value={name} onChange={setName} placeholder="First Last" />
              <TextInput label="Company name" value={company} onChange={setCompany} placeholder="Your business name" />
              <TextInput label="Email address" value={email} onChange={setEmail} placeholder="you@company.com" type="email" />
              <p className="text-xs text-gray-400">No spam. Your numbers stay private.</p>
              {saveError && <p className="text-red-500 text-sm">{saveError}</p>}
              <button onClick={handleSaveLead} disabled={!email || saving}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-4 rounded-xl transition-colors">
                {saving ? 'Saving…' : 'Save my results →'}
              </button>
            </div>
            <button onClick={() => setStep(2)} className="w-full text-gray-400 text-sm hover:text-gray-600">← Go back</button>
          </div>
        )}

        {/* ── CONFIRMATION ── */}
        {step === 5 && (
          <div className="space-y-8">
            <div className="bg-amber-500 rounded-2xl p-8 text-white">
              <div className="text-amber-100 text-sm font-semibold uppercase tracking-widest mb-2">You just did something most owners never do.</div>
              <h1 className="text-3xl font-bold leading-tight">You ran your numbers all the way to the constraint.</h1>
              <p className="mt-3 text-amber-100">The gap is visible. The next step is identifying what&apos;s actually in the way — and that&apos;s a conversation.</p>
            </div>
            <div className="bg-gray-900 text-white rounded-2xl p-8 space-y-4">
              <h2 className="text-2xl font-bold">This is what 12 months looks like.</h2>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✓ Identify the binding constraint — not the loudest one</li>
                <li>✓ 2x monthly coaching calls to work the constraint</li>
                <li>✓ Daily visibility on the governing metric</li>
                <li>✓ Standardize every gain, train the team, move to the next constraint</li>
                <li>✓ Built for $5M–$30M civil contractors: crushing, hauling, asphalt, grading</li>
              </ul>
              <a href="https://leandirt.co/TYWjkBF"
                className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-white font-bold py-4 rounded-xl transition-colors text-lg mt-2">
                Book a call with Zack →
              </a>
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
