'use client';

import { useEffect, useState, type FormEvent } from 'react';

const CAL_LINK = 'leandirt/company-os-demo';
const CAL_URL = `https://cal.com/${CAL_LINK}`;
const CAL_NS = 'company-os-demo';
const CAL_EL = 'cal-inline-company-os-demo';

type CalApi = ((...args: unknown[]) => void) & { q?: unknown[][]; ns?: Record<string, CalApi>; loaded?: boolean };

/** Loads Cal.com's embed script once and renders the booking calendar inline,
 *  prefilled with the name and email they just typed. Mirrors Cal's own snippet. */
function CalBooking({ name, email }: { name: string; email: string }) {
  useEffect(() => {
    const w = window as unknown as { Cal?: CalApi };
    if (!w.Cal) {
      const push = (api: CalApi, args: unknown[]) => { (api.q = api.q || []).push(args); };
      const cal = function (...args: unknown[]) {
        const self = w.Cal as CalApi;
        if (!self.loaded) {
          self.ns = {};
          self.q = self.q || [];
          const sc = document.createElement('script');
          sc.src = 'https://app.cal.com/embed/embed.js';
          document.head.appendChild(sc);
          self.loaded = true;
        }
        if (args[0] === 'init') {
          const api = function (...a: unknown[]) { push(api as CalApi, a); } as CalApi;
          const namespace = args[1];
          if (typeof namespace === 'string') {
            self.ns = self.ns || {};
            self.ns[namespace] = self.ns[namespace] || api;
            push(self.ns[namespace], args);
            push(self, ['initNamespace', namespace]);
          } else push(self, args);
          return;
        }
        push(self, args);
      } as CalApi;
      w.Cal = cal;
    }
    const Cal = w.Cal as CalApi;
    Cal('init', CAL_NS, { origin: 'https://app.cal.com' });
    const ns = (Cal.ns ?? {})[CAL_NS];
    if (!ns) return;
    ns('inline', {
      elementOrSelector: `#${CAL_EL}`,
      calLink: CAL_LINK,
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true', name, email, theme: 'dark' },
    });
    ns('ui', {
      theme: 'dark',
      hideEventTypeDetails: false,
      layout: 'month_view',
      cssVarsPerTheme: { dark: { 'cal-brand': '#e8b400' }, light: { 'cal-brand': '#c9961a' } },
    });
  }, [name, email]);

  return <div id={CAL_EL} className="cal-inline" />;
}

type State = 'idle' | 'sending' | 'done' | 'error';

/** Request-a-demo form on /os. Posts to this site's /api/waitlist, which forwards
 *  the signup to Obeya (CRM lead + inbox ping). */
export default function OsWaitlistForm() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState<string | null>(null);
  const [who, setWho] = useState<{ name: string; email: string }>({ name: '', email: '' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState('sending');
    setError(null);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error ?? 'Something went wrong. Please try again.');
        setState('error');
        return;
      }
      setWho({ name: String(data.name ?? ''), email: String(data.email ?? '') });
      setState('done');
    } catch {
      setError('Something went wrong. Please try again.');
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="form-done" role="status">
        <span className="cd" style={{ fontSize: 13, color: 'var(--gold-light)' }}>Step 2 of 2</span>
        <h3 className="bb" style={{ fontSize: 44 }}>Pick a time for your demo.</h3>
        <p className="muted">
          A 60-minute live walkthrough with me, built around the answers you just gave.
        </p>
        <CalBooking name={who.name} email={who.email} />
        <p className="muted" style={{ fontSize: 15 }}>
          Calendar not loading? <a href={CAL_URL} target="_blank" rel="noopener" style={{ color: 'var(--gold-light)' }}>Book here instead</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} aria-label="Request a demo">
      <div className="pair" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
        <label><span className="cd">Name</span><input className="fld" type="text" name="name" autoComplete="name" required /></label>
        <label><span className="cd">Company</span><input className="fld" type="text" name="company" autoComplete="organization" required /></label>
      </div>
      <div className="pair" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
        <label><span className="cd">Email</span><input className="fld" type="email" name="email" autoComplete="email" required pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="A full email address, like you@company.com" /></label>
        <label><span className="cd">Phone</span><input className="fld" type="tel" name="phone" autoComplete="tel" /></label>
      </div>
      <div className="pair" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
        <label>
          <span className="cd">Trade</span>
          <select className="fld" name="trade" defaultValue="Excavation / site work">
            <option>Excavation / site work</option>
            <option>Grading</option>
            <option>Utility</option>
            <option>Paving</option>
            <option>Concrete</option>
            <option>Demolition</option>
            <option>Crushing</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          <span className="cd">Employees</span>
          <select className="fld" name="employees" defaultValue="Under 25">
            <option>Under 25</option>
            <option>25 to 50</option>
            <option>50 to 100</option>
            <option>Over 100</option>
          </select>
        </label>
      </div>
      <label>
        <span className="cd">What question do you answer ten times a day?</span>
        <textarea className="fld" name="question" rows={3} />
      </label>
      {/* Honeypot: real people never see or fill this. */}
      <div className="hp" aria-hidden="true">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {state === 'error' && error && (
        <p className="form-msg" role="alert" style={{ color: '#f0a07a' }}>{error}</p>
      )}
      <button className="btn" type="submit" disabled={state === 'sending'} style={{ marginTop: 6 }}>
        {state === 'sending' ? 'Sending…' : 'Request a demo'}
      </button>
    </form>
  );
}
