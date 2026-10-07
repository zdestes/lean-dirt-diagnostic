'use client';

import { useState } from 'react';

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

/** The quick-call tax calculator on /os. */
export default function OsCalculator() {
  const [people, setPeople] = useState(12);
  const [calls, setCalls] = useState(4);
  const [mins, setMins] = useState(10);
  const [rate, setRate] = useState(45);

  const hrs = (people * calls * mins) / 60 * 250;
  const dollars = hrs * rate;

  const slider = (
    label: string,
    value: number,
    set: (n: number) => void,
    min: number,
    max: number,
    step: number,
    prefix = ''
  ) => (
    <label>
      <span className="row">
        <span className="cd muted" style={{ fontSize: 13 }}>{label}</span>
        <span className="bb" style={{ fontSize: 26, color: 'var(--gold-light)' }}>{prefix}{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
      />
    </label>
  );

  return (
    <div className="g2 calc">
      <div className="stack">
        <div className="lbl">The quick-call tax</div>
        <h2 className="bb" style={{ fontSize: 'clamp(44px, 5vw, 68px)' }}>Run your own numbers.</h2>
        <p className="muted">
          Count the people who get pulled into &ldquo;hey, real quick&rdquo; calls to find out where a crew is,
          what got billed, or how something is supposed to be done. Be honest.
        </p>
        <div className="stack" style={{ paddingTop: 8 }}>
          {slider('People asking or answering', people, setPeople, 2, 60, 1)}
          {slider('Quick calls each, per day', calls, setCalls, 1, 15, 1)}
          {slider('Minutes lost per call (incl. getting back on task)', mins, setMins, 3, 30, 1)}
          {slider('Average loaded cost per hour', rate, setRate, 20, 120, 5, '$')}
        </div>
      </div>
      <div className="calc-out">
        <span className="cd gray" style={{ fontSize: 13 }}>What it costs you a year</span>
        <span className="bb" style={{ fontSize: 'clamp(72px, 9vw, 132px)', color: 'var(--gold-light)' }}>${fmt(dollars)}</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16, borderTop: '1px solid var(--border)', paddingTop: 24 }}>
          <div className="stack" style={{ gap: 4 }}>
            <span className="bb" style={{ fontSize: 40 }}>{fmt(hrs)}</span>
            <span className="cd gray" style={{ fontSize: 12 }}>Hours a year</span>
          </div>
          <div className="stack" style={{ gap: 4 }}>
            <span className="bb" style={{ fontSize: 40 }}>{fmt(hrs / 40)}</span>
            <span className="cd gray" style={{ fontSize: 12 }}>Full-time weeks</span>
          </div>
        </div>
        <p className="muted" style={{ fontSize: 15, lineHeight: 1.55 }}>
          Based on 250 working days. It does not count the bad decisions made on stale information, which usually cost more.
        </p>
      </div>
    </div>
  );
}
