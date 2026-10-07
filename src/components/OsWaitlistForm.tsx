'use client';

import { useState, type FormEvent } from 'react';

type State = 'idle' | 'sending' | 'done' | 'error';

/** Waitlist form on /os. Posts to this site's /api/waitlist, which forwards
 *  the signup to Obeya (CRM lead + inbox ping). */
export default function OsWaitlistForm() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState<string | null>(null);

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
      setState('done');
    } catch {
      setError('Something went wrong. Please try again.');
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="form-done" role="status">
        <span className="cd" style={{ fontSize: 13, color: 'var(--gold-light)' }}>You&rsquo;re on the list</span>
        <h3 className="bb" style={{ fontSize: 44 }}>Thanks. I&rsquo;ll be in touch.</h3>
        <p className="muted">
          I&rsquo;ll reach out personally to walk you through the platform and what your version would look like.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} aria-label="Join the waitlist">
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
          <select className="fld" name="trade" defaultValue="Excavation / grading / site work">
            <option>Excavation / grading / site work</option>
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
            <option>Over 100 (let&apos;s schedule a call)</option>
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
        {state === 'sending' ? 'Sending…' : 'Put me on the waitlist'}
      </button>
    </form>
  );
}
