'use client';

import { useState } from 'react';

/* ── helpers ── */

const fmtMoney = (n: number) =>
  isFinite(n)
    ? n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
    : '—';

const fmtMoneyCents = (n: number) =>
  isFinite(n)
    ? n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
    : '—';

const fmtPct = (n: number) => (isFinite(n) ? `${(n * 100).toFixed(0)}%` : '—');

function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
}) {
  return (
    <label className="calc-field">
      <span className="calc-field__label">{label}</span>
      <span className="calc-field__input">
        {prefix && <span className="calc-field__affix">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          value={Number.isNaN(value) ? '' : value}
          step={step}
          min={0}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
        {suffix && <span className="calc-field__affix">{suffix}</span>}
      </span>
    </label>
  );
}

function Out({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`calc-out${accent ? ' calc-out--accent' : ''}`}>
      <span className="calc-out__label">{label}</span>
      <span className="calc-out__value">{value}</span>
    </div>
  );
}

/* ── 1. LTV vs CAC (Part 4) ── */

export function LtvCacCalc() {
  const [sale, setSale] = useState(100);
  const [margin, setMargin] = useState(60);
  const [purchases, setPurchases] = useState(8);
  const [cac, setCac] = useState(100);

  const ltv = sale * (margin / 100) * purchases;
  const ratio = cac > 0 ? ltv / cac : NaN;
  const verdict = !isFinite(ratio)
    ? ''
    : ratio >= 3
      ? `A machine. Every customer returns ${ratio.toFixed(1)}× what they cost. Pour money in.`
      : ratio >= 1
        ? `Workable but thin (${ratio.toFixed(1)}×). Raise LTV (retention, price) or cut CAC before scaling.`
        : `A shredder. Customers cost more than they're worth — more sales kill you faster.`;

  return (
    <div className="calc" data-reveal>
      <p className="calc__title">Try your numbers: LTV vs CAC</p>
      <div className="calc__grid">
        <Field label="Average sale" value={sale} onChange={setSale} prefix="$" />
        <Field label="Gross margin" value={margin} onChange={setMargin} suffix="%" />
        <Field label="Purchases per customer (lifetime)" value={purchases} onChange={setPurchases} />
        <Field label="Cost to acquire a customer (CAC)" value={cac} onChange={setCac} prefix="$" />
      </div>
      <div className="calc__outs">
        <Out label="Lifetime value (margin)" value={fmtMoney(ltv)} />
        <Out label="LTV : CAC" value={isFinite(ratio) ? `${ratio.toFixed(1)} : 1` : '—'} accent />
      </div>
      {verdict && <p className={`calc__verdict${ratio < 1 ? ' is-bad' : ratio >= 3 ? ' is-good' : ''}`}>{verdict}</p>}
    </div>
  );
}

/* ── 2. Runway (Part 4) ── */

export function RunwayCalc() {
  const [bank, setBank] = useState(30000);
  const [fixed, setFixed] = useState(10000);

  const months = fixed > 0 ? bank / fixed : NaN;
  const verdict = !isFinite(months)
    ? ''
    : months < 2
      ? 'Under two months: cash is your constraint, full stop. Collect, cut, survive — then optimize.'
      : months < 3
        ? 'Below the three-month floor. Pull the cash levers: collect sooner, pay later, hold less stock.'
        : months < 6
          ? 'Above the floor, below comfortable. Keep building toward six months.'
          : 'Comfortable. The heart monitor is steady.';

  return (
    <div className="calc" data-reveal>
      <p className="calc__title">Try your numbers: cash runway</p>
      <div className="calc__grid">
        <Field label="Bank balance today" value={bank} onChange={setBank} prefix="$" />
        <Field label="Monthly fixed costs (your wage included)" value={fixed} onChange={setFixed} prefix="$" />
      </div>
      <div className="calc__outs">
        <Out label="Runway" value={isFinite(months) ? `${months.toFixed(1)} months` : '—'} accent />
      </div>
      {verdict && (
        <p className={`calc__verdict${months < 2 ? ' is-bad' : months >= 6 ? ' is-good' : ''}`}>{verdict}</p>
      )}
    </div>
  );
}

/* ── 3. Driver tree (Part 5) ── */

export function DriverTreeCalc() {
  const [leads, setLeads] = useState(40);
  const [conv, setConv] = useState(25);
  const [sale, setSale] = useState(500);
  const [freq, setFreq] = useState(2);
  const [margin, setMargin] = useState(50);
  const [fixed, setFixed] = useState(8000);

  const newCustomersYr = leads * 12 * (conv / 100);
  const revenue = newCustomersYr * sale * freq;
  const grossMargin = revenue * (margin / 100);
  const profit = grossMargin - fixed * 12;

  // the compounding demo: +10% on three growth drivers
  const revenueBoosted = revenue * 1.1 * 1.1 * 1.1;
  const profitBoosted = revenueBoosted * (margin / 100) - fixed * 12;

  return (
    <div className="calc" data-reveal>
      <p className="calc__title">Try your numbers: the driver tree</p>
      <div className="calc__grid calc__grid--3">
        <Field label="Leads per month" value={leads} onChange={setLeads} />
        <Field label="Conversion rate" value={conv} onChange={setConv} suffix="%" />
        <Field label="Average sale" value={sale} onChange={setSale} prefix="$" />
        <Field label="Purchases per customer / year" value={freq} onChange={setFreq} step={0.5} />
        <Field label="Gross margin" value={margin} onChange={setMargin} suffix="%" />
        <Field label="Fixed costs / month (wage included)" value={fixed} onChange={setFixed} prefix="$" />
      </div>
      <div className="calc__outs">
        <Out label="Annual revenue" value={fmtMoney(revenue)} />
        <Out label="Annual profit" value={fmtMoney(profit)} accent />
      </div>
      <p className="calc__verdict">
        Now stack three modest wins — leads, conversion, and average sale each up 10% — and annual
        profit goes from {fmtMoney(profit)} to <strong>{fmtMoney(profitBoosted)}</strong>. That&apos;s
        the multiplication doing the work.
      </p>
    </div>
  );
}

/* ── 4. Price raise breakeven (Part 9) ── */

export function PriceRaiseCalc() {
  const [price, setPrice] = useState(100);
  const [cost, setCost] = useState(40);
  const [raise, setRaise] = useState(20);

  const oldMargin = price - cost;
  const newPrice = price * (1 + raise / 100);
  const newMargin = newPrice - cost;
  const profitJump = oldMargin > 0 ? newMargin / oldMargin - 1 : NaN;
  const breakeven = newMargin > 0 ? oldMargin / newMargin : NaN;

  return (
    <div className="calc" data-reveal>
      <p className="calc__title">Try your numbers: what a price raise really does</p>
      <div className="calc__grid calc__grid--3">
        <Field label="Current price" value={price} onChange={setPrice} prefix="$" />
        <Field label="Cost to deliver one sale" value={cost} onChange={setCost} prefix="$" />
        <Field label="Price increase" value={raise} onChange={setRaise} suffix="%" />
      </div>
      <div className="calc__outs">
        <Out label="Margin per sale, before" value={fmtMoneyCents(oldMargin)} />
        <Out label="Margin per sale, after" value={fmtMoneyCents(newMargin)} />
        <Out
          label="Profit per sale jumps"
          value={isFinite(profitJump) ? `+${(profitJump * 100).toFixed(0)}%` : '—'}
          accent
        />
        <Out label="Breakeven retention" value={fmtPct(breakeven)} accent />
      </div>
      {isFinite(breakeven) && breakeven > 0 && breakeven < 1 && (
        <p className="calc__verdict is-good">
          Keep just {fmtPct(breakeven)} of your customers and the raise pays for itself. Lose fewer
          than {fmtPct(1 - breakeven)} and you make more money with less work.
        </p>
      )}
    </div>
  );
}
