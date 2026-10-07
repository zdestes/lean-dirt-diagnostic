/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import OsCalculator from '@/components/OsCalculator';
import OsWaitlistForm from '@/components/OsWaitlistForm';
import { BOOKING_URL } from '@/lib/site';
import './os.css';

export const metadata = {
  title: 'Company OS | Lean Dirt',
  description:
    'One system that holds every job, crew, machine, dollar and SOP in your company. Built for civil contractors doing $5M to $50M. $20,000 once, then you only pay for improvements.',
  openGraph: {
    title: 'Company OS | Lean Dirt',
    description:
      'Your business needs a brain, not another quick call. One system of record for civil contractors, built to fit how you work.',
    siteName: 'Lean Dirt',
    type: 'website',
  },
};

const PROBLEMS = [
  ['01', "In someone's notes", "The legal pad in the truck. The spreadsheet on the office manager's desktop. Good information, in a place only one person can open."],
  ['02', "In someone's phone", 'Texts, photos, voicemails and group chats. The field knows what happened today. The office finds out when somebody remembers to call.'],
  ['03', "In someone's head", 'How we bid it. Where the utilities really are. What the customer actually agreed to. If that person is on vacation, the company waits.'],
];

const MODULES = [
  ['Field', 'Time cards & payroll', "GPS punch clock on every phone, cost codes, per diem, time off and a payroll export the office doesn't have to retype."],
  ['Field', 'Daily reports', "Built around your forms: production, downtime, equipment hours, photos. The office sees today's job today, not Friday."],
  ['Field', 'Schedule', "Crews, machines and jobs on one board, by day or by week. Everybody knows where they're going tomorrow."],
  ['Sales', 'Estimates, bids & COs', 'Bid builder, branded proposals, change orders the customer signs on a phone. A won bid becomes a job automatically.'],
  ['Operations', 'Jobs', 'Customer, contract, plans, crew, costs, billing and tasks. Everything about a job is on the job, one click away.'],
  ['Operations', 'Fleet & maintenance', 'Every machine, its hours, its services and its problems. Code reds get to the mechanic before they get expensive.'],
  ['Money', 'AR, AP & cash flow', 'Who owes you, what you owe, and what the bank account looks like in eight weeks. Budget against actual, by job.'],
  ['Standards', 'SOPs & tasks', 'How we do things here, written down once, versioned, and turned into real tasks with an owner and a due date.'],
  ['Everyone', 'On every phone', 'Installs to the home screen like an app, with push notifications. Built for a foreman with gloves on, not a desk.'],
];

const COMPARE = [
  ['Apps', "4 to 7 that don't talk", 'One'],
  ['Pricing', 'Per seat, per month, per app', 'Pay once. Add the whole crew.'],
  ['After launch', 'Keep paying to keep using it', 'Only pay for improvements'],
  ['Fits your process', 'You change to match it', 'Built around how you work'],
  ['Your data', 'Shared with every customer', 'Your own database'],
  ['Your brand', 'Theirs', 'Yours, on your domain'],
];

const STEPS = [
  ['01', 'See it running', "A live walkthrough with me on the real platform. If it isn't a fit, you'll know in 30 minutes and so will I."],
  ['02', 'Map your flow', 'We walk through how a job moves from bid to final pay app, and where the information gets stuck today.'],
  ['03', 'Build & stand up', 'Your app, your name, your domain, your people and your data loaded in. Starting from a platform already proven in your trade.'],
  ['04', '30 days of support', "Your team uses it for real. Whatever they hit, I fix. After that it's yours, and you only pay when you want something improved."],
];

const INCLUDED = [
  'Your own app, built for your trade',
  'Your name, logo and web address',
  'Your own private database',
  'People, jobs and equipment loaded in',
  'Modules switched on to fit how you work',
  'Team rollout and training',
  'One month of hands-on support',
];

const TRADES = ['Excavation', 'Grading', 'Site work', 'Utility', 'Paving', 'Concrete', 'Demolition', 'Crushing'];

const FAQ = [
  ['Is this software or coaching?', "It's the system you'd get in my coaching program, without having to sign up for the program. You get the tool built and a month of help putting it to work. The program is for owners who want the whole operating system installed: the standards, the habits and the scoreboard, too."],
  ['Will my guys actually use it?', "It's built for the field first: big buttons, a punch clock and a daily report that take less time than the texts they send now. And because there are no per-seat fees, nobody gets left off to save money."],
  ['Who owns the data?', "You do. Your company gets its own database, not a row in someone else's."],
  ['Does it replace QuickBooks?', 'No. Keep your accounting where it is. This runs the operation around it and hands your bookkeeper clean payroll and billing exports instead of shoeboxes.'],
  ['What happens after the first month?', "It keeps running for $50 a month, which covers hosting and backups. You don't pay to use it. You only pay when you want something improved."],
  ['We have more than 100 people. Does it still work?', "Yes. It's the same system with a longer rollout, built out discipline by discipline and team by team. Schedule a call and we'll map out what that looks like for you."],
];

export default function CompanyOsPage() {
  return (
    <div className="ld-os">
      <SiteNav />

      {/* HERO */}
      <section className="hero">
        <div className="wrap g2">
          <div className="stack" style={{ gap: 28 }}>
            <div className="lbl">For civil contractors · $5M to $50M</div>
            <h1 className="bb">Your business needs a brain. <em>Not another quick call.</em></h1>
            <p className="muted" style={{ fontSize: 20, lineHeight: 1.55, maxWidth: 580 }}>
              One system that holds every job, crew, machine, dollar and SOP in your company, so anyone who
              needs an answer can find it without chasing the one person who has it in their phone or their head.
            </p>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <a className="btn" href="#waitlist">Get on the waitlist</a>
              <a className="ghost" href="#pricing">See pricing</a>
            </div>
            <div className="hero-stats">
              <div><span className="bb" style={{ fontSize: 44, color: 'var(--gold-light)' }}>7</span><span className="cd gray" style={{ fontSize: 12 }}>Contractors running it</span></div>
              <div><span className="bb" style={{ fontSize: 44, color: 'var(--gold-light)' }}>1x</span><span className="cd gray" style={{ fontSize: 12 }}>Build fee, paid once</span></div>
              <div><span className="bb" style={{ fontSize: 44, color: 'var(--gold-light)' }}>$0</span><span className="cd gray" style={{ fontSize: 12 }}>Per-seat fees, ever</span></div>
            </div>
          </div>

          <div className="mock" aria-hidden="true">
            <div className="mock-bar">
              <i /><i /><i />
              <span className="cd gray" style={{ marginLeft: 12, fontSize: 12, letterSpacing: '.12em' }}>yourcompanyos.com / jobs / 24-118</span>
            </div>
            <div className="mock-body">
              <div className="mock-side">
                <div className="bb" style={{ fontSize: 22, padding: '0 18px 14px' }}>YOURCO<span style={{ color: 'var(--gold-light)' }}>OS</span></div>
                {['Home', 'Jobs', 'Schedule', 'Time cards', 'Daily reports', 'Estimates', 'Fleet', 'Money', 'SOPs'].map((l) => (
                  <span key={l} className={`cd${l === 'Jobs' ? ' on' : ''}`}>{l}</span>
                ))}
              </div>
              <div className="mock-main">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
                  <div className="stack" style={{ gap: 4 }}>
                    <span className="cd gray" style={{ fontSize: 11 }}>Job 24-118 · Site prep</span>
                    <span className="bb" style={{ fontSize: 32 }}>Hwy 43 Retail Pad</span>
                  </div>
                  <span className="cd" style={{ fontSize: 11, color: 'var(--black)', background: 'var(--gold-light)', padding: '5px 10px' }}>In progress</span>
                </div>
                <div className="g3" style={{ gap: 10 }}>
                  <div className="tile"><span className="cd gray" style={{ fontSize: 10 }}>Budget used</span><span className="bb" style={{ fontSize: 28 }}>62%</span><span style={{ height: 4, background: 'var(--border)', display: 'block' }}><span style={{ width: '62%', height: 4, background: 'var(--gold-light)', display: 'block' }} /></span></div>
                  <div className="tile"><span className="cd gray" style={{ fontSize: 10 }}>Cost per yd³</span><span className="bb" style={{ fontSize: 28 }}>$4.18</span><span className="muted" style={{ fontSize: 12 }}>Target $4.40</span></div>
                  <div className="tile"><span className="cd gray" style={{ fontSize: 10 }}>Billed / owed</span><span className="bb" style={{ fontSize: 28 }}>$184K</span><span className="muted" style={{ fontSize: 12 }}>$41K past due</span></div>
                </div>
                <div className="g2" style={{ gap: 10, alignItems: 'stretch' }}>
                  <div className="tile"><span className="cd" style={{ fontSize: 10, color: 'var(--gold-light)' }}>On site today</span><span>Crew 2 · 6 people · clocked in 6:52</span><span>CAT 336 · D6 dozer · 2 trucks</span></div>
                  <div className="tile"><span className="cd" style={{ fontSize: 10, color: 'var(--gold-light)' }}>Yesterday's daily report</span><span>1,340 yd³ moved · 2 hr rain delay</span><span>Photos (14) · Foreman signed</span></div>
                  <div className="tile"><span className="cd" style={{ fontSize: 10, color: 'var(--gold-light)' }}>Change orders</span><span>CO-3 · Undercut, T&amp;M · signed</span><span>CO-4 · Extra drainage · pending</span></div>
                  <div className="tile"><span className="cd" style={{ fontSize: 10, color: 'var(--gold-light)' }}>Open tasks</span><span>Order silt fence · Tue</span><span>Send pay app 3 · Fri</span></div>
                </div>
                <div className="gray" style={{ fontSize: 12, borderTop: '1px solid var(--border)', paddingTop: 10 }}>Plans rev C · Contract · Customer contact · Bid · all one click from this page</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="band">
        <div className="wrap">
          <div className="head">
            <div className="lbl">The problem</div>
            <h2 className="bb">Where does your company's information <em>live right now?</em></h2>
          </div>
          <div className="g3" style={{ gap: 24 }}>
            {PROBLEMS.map(([n, t, d]) => (
              <div key={n} className="card stack" style={{ padding: 34, gap: 16 }}>
                <span className="num" style={{ fontSize: 72 }}>{n}</span>
                <h3 className="bb" style={{ fontSize: 38 }}>{t}</h3>
                <p className="muted" style={{ fontSize: 17 }}>{d}</p>
              </div>
            ))}
          </div>
          <p className="bb" style={{ fontSize: 'clamp(30px, 3.4vw, 44px)', maxWidth: 1100, marginTop: 48 }}>
            Every "quick call" and every status meeting is a tax on the business. <em>You pay it every single day.</em>
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="quick-call-tax">
        <div className="wrap">
          <OsCalculator />
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section id="what" className="band">
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 48, flexWrap: 'wrap', marginBottom: 48 }}>
            <div className="stack" style={{ gap: 20, maxWidth: 820 }}>
              <div className="lbl">What you get</div>
              <h2 className="bb">One system of record. <em>Your name on the door.</em></h2>
            </div>
            <p className="muted" style={{ maxWidth: 440 }}>
              You get your own app, on your own web address, named after your company. Here is what comes in the
              box, switched on or off to fit how you work.
            </p>
          </div>
          <div className="g3">
            {MODULES.map(([tag, t, d]) => (
              <div key={t} className="card stack" style={{ padding: 30, gap: 12 }}>
                <span className="cd" style={{ fontSize: 12, color: 'var(--gold-light)' }}>{tag}</span>
                <h3 className="bb" style={{ fontSize: 34 }}>{t}</h3>
                <p className="muted" style={{ fontSize: 16 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENCE */}
      <section>
        <div className="wrap g2" style={{ alignItems: 'start' }}>
          <div className="stack">
            <div className="lbl">Why not just buy software?</div>
            <h2 className="bb" style={{ fontSize: 'clamp(44px, 5vw, 72px)' }}>Off-the-shelf makes you fit it. <em>This is built to fit you.</em></h2>
            <p className="muted">
              I'm a process engineer, not a software salesman. I map how information actually moves through your
              company first, then shape the system around it. The software is the tool. The standards and habits
              your team builds with it are the real operating system.
            </p>
          </div>
          <div className="cmp">
            <div className="th">
              <span />
              <span className="cd gray" style={{ fontSize: 12 }}>The usual stack</span>
              <span className="cd" style={{ fontSize: 12, color: 'var(--gold-light)' }}>Your company OS</span>
            </div>
            {COMPARE.map(([k, a, b]) => (
              <div key={k}>
                <span className="cd muted" style={{ fontSize: 13 }}>{k}</span>
                <span className="gray">{a}</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="band">
        <div className="wrap">
          <div className="head">
            <div className="lbl">How it works</div>
            <h2 className="bb">From first call to <em>running your company.</em></h2>
          </div>
          <div className="g4">
            {STEPS.map(([n, t, d]) => (
              <div key={n} className="step">
                <span className="num" style={{ fontSize: 64 }}>{n}</span>
                <h3 className="bb" style={{ fontSize: 32 }}>{t}</h3>
                <p className="muted" style={{ fontSize: 16 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing">
        <div className="wrap">
          <div className="head">
            <div className="lbl">Pricing</div>
            <h2 className="bb">One build. <em>Then it's just yours.</em></h2>
          </div>
          <div className="price-grid">
            <div className="price-main">
              <div className="stack" style={{ gap: 18 }}>
                <span className="cd" style={{ fontSize: 13, color: 'var(--gold-light)' }}>The build</span>
                <span className="cd muted" style={{ fontSize: 12 }}>Up to 100 employees</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <span className="bb" style={{ fontSize: 'clamp(64px, 7vw, 96px)' }}>$20,000</span>
                  <span className="cd gray" style={{ fontSize: 13 }}>once</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, paddingTop: 18, borderTop: '1px solid var(--border)' }}>
                  <span className="bb" style={{ fontSize: 56, color: 'var(--gold-light)' }}>$50</span>
                  <span className="cd gray" style={{ fontSize: 13 }}>per month after</span>
                </div>
                <p className="muted" style={{ fontSize: 16 }}>
                  The monthly covers hosting, your database and backups. Hard costs, not a markup. No per-user fees,
                  so put the whole crew on it.
                </p>
                <a className="btn" href="#waitlist" style={{ marginTop: 6 }}>Get on the waitlist</a>
              </div>
              <ul>
                {INCLUDED.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div className="card stack" style={{ padding: 40, gap: 18 }}>
              <span className="cd gray" style={{ fontSize: 13 }}>After the build</span>
              <h3 className="bb" style={{ fontSize: 40 }}>Only pay for improvements</h3>
              <p className="muted" style={{ fontSize: 16 }}>
                You're not paying to use it. You only pay when you want something improved: a new module, a new
                report, a change to how payroll works.
              </p>
              <div className="rule" />
              <span className="cd gray" style={{ fontSize: 13 }}>Over 100 employees?</span>
              <h3 className="bb" style={{ fontSize: 40 }}>Let's schedule a call</h3>
              <p className="muted" style={{ fontSize: 16 }}>
                Same system, longer rollout. We build it out discipline by discipline and team by team so every part
                of the company is covered before we call it done.
              </p>
              <a className="cd link" href={BOOKING_URL} target="_blank" rel="noopener">Schedule a call →</a>
              <div className="rule" />
              <h3 className="bb" style={{ fontSize: 40 }}>Or go all in</h3>
              <p className="muted" style={{ fontSize: 16 }}>
                The OS comes included in the 12-month Lean Dirt program, where we install the process, the standards
                and the scoreboard with it.
              </p>
              <Link className="cd link" href="/" style={{ marginTop: 'auto' }}>About the program →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR (testimonial hidden until real quotes come in) */}
      <section className="band">
        <div className="wrap stack" style={{ maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="lbl">Who it's for</div>
          <h2 className="bb" style={{ fontSize: 'clamp(44px, 5vw, 64px)' }}>Built in the dirt, <em>for the dirt.</em></h2>
          <p className="muted">Civil contractors doing $5M to $50M a year, where the owner is still the answer to too many questions.</p>
          <div className="chips">
            {TRADES.map((t) => <span key={t} className="cd">{t}</span>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="wrap faq">
          <div className="stack" style={{ gap: 20 }}>
            <div className="lbl">Straight answers</div>
            <h2 className="bb" style={{ fontSize: 'clamp(44px, 5vw, 72px)' }}>Questions owners ask.</h2>
          </div>
          <div className="faq-list">
            {FAQ.map(([q, a]) => (
              <div key={q}>
                <h3 className="bb">{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="band" style={{ borderBottom: 0 }}>
        <div className="wrap g2" style={{ alignItems: 'start' }}>
          <div className="stack" style={{ gap: 24 }}>
            <div className="lbl">Waitlist</div>
            <h2 className="bb" style={{ fontSize: 'clamp(52px, 6vw, 92px)' }}>Stop being the <em>company's search engine.</em></h2>
            <p className="muted" style={{ fontSize: 19 }}>
              Get on the list and I'll reach out to walk you through the platform and what your version would look
              like. Over 100 people? Say so below and we'll set up a call.
            </p>
          </div>
          <OsWaitlistForm />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
