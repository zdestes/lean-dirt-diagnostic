/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import OsCalculator from '@/components/OsCalculator';
import OsAppMock from '@/components/OsAppMock';
import OsWaitlistForm from '@/components/OsWaitlistForm';
import ScrollReveal from '@/components/ScrollReveal';
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
  ['Field', 'Time cards & payroll', "Punch clock on every phone, cost codes, per diem, time off and a payroll export the office doesn't have to retype."],
  ['Field', 'Daily reports', "Built around your forms: production, downtime, equipment hours, photos. The office sees today's job today, not Friday."],
  ['Field', 'Schedule', "Crews, machines and jobs on one board, by day or by week. Everybody knows where they're going tomorrow."],
  ['Sales', 'Estimates, bids & COs', 'Bid builder, branded proposals, change orders the customer signs on a phone. A won bid becomes a job automatically.'],
  ['Operations', 'Jobs', 'Customer, contract, plans, crew, costs, billing and tasks. Everything about a job is on the job, one click away.'],
  ['Operations', 'Fleet & maintenance', 'Every machine, its hours, its services and its problems. Code reds get to the mechanic before they get expensive.'],
  ['Money', 'AR, AP & cash flow', 'Who owes you, what you owe, and what the bank account looks like in eight weeks. Budget against actual, by job.'],
  ['Standards', 'SOPs & tasks', 'How we do things here, written down once, versioned, and turned into real tasks with an owner and a due date.'],
  ['Everyone', 'On every phone', 'Installs to the home screen like an app, with push notifications. Built for a foreman with gloves on, not a desk.'],
];

const USUAL = [
  "4 to 7 apps that don't talk to each other",
  'Per seat, per month, per app',
  'Pay forever just to keep using it',
  'You change how you work to fit it',
  'Your data sits in their system',
  'Their name on everything',
];

const YOURS = [
  'One system for the whole company',
  'Pay once. Put the whole crew on it.',
  'Only pay when you want it fine-tuned',
  'Built around how you already work',
  'Your own private database',
  'Your name, your logo, your domain',
];

const STEPS = [
  ['01', 'See it running', "A live walkthrough with me on the real platform. If it isn't a fit, you'll know in 30 minutes and so will I."],
  ['02', 'Map your flow', 'We walk through how a job moves from bid to final pay app, and where the information gets stuck today.'],
  ['03', 'Build & stand up', 'Your app, your name, your domain, your people and your data loaded in. Starting from a platform already proven in your trade.'],
  ['04', '30 days of fine-tuning', "Your team runs on it for real, and I tune it to how they actually work. After that it's yours, and you only pay when you want it improved."],
];

const INCLUDED = [
  'Your own app, built for your trade',
  'Your name, logo and web address',
  'Your own private database',
  'People, jobs and equipment loaded in',
  'Modules switched on to fit how you work',
  'Team rollout and training',
  '30 days of hands-on fine-tuning',
];

const TRADES = ['Excavation', 'Grading', 'Site work', 'Utility', 'Paving', 'Concrete', 'Demolition', 'Crushing'];

const FAQ = [
  ['Is this software or coaching?', "It's the system you'd get in my coaching program, without having to sign up for the program. You get your company's brain built and 30 days of fine-tuning while your team puts it to work. The program is for owners who want the whole operating system installed: the standards, the habits and the scoreboard, too."],
  ['Will my guys actually use it?', "It's built for the field first: big buttons, a punch clock and a daily report that take less time than the texts they send now. And because there are no per-seat fees, nobody gets left off to save money."],
  ['Who owns the data?', "You do. Your company gets its own database, not a row in someone else's."],
  ['Does it replace QuickBooks?', 'No. Keep your accounting where it is. This runs the operation around it and hands your bookkeeper clean payroll and billing exports instead of shoeboxes.'],
  ['What happens after the first month?', "It keeps running for $50 a month, which covers hosting and backups. You don't pay to use it. When your business changes and you want the system to change with it, you pay for that fine-tuning, and only that."],
  ['We have more than 100 people. Does it still work?', "Yes. It's the same system with a longer rollout, built out discipline by discipline and team by team. Request a demo and we'll map out what that looks like for you."],
];

export default function CompanyOsPage() {
  return (
    <div className="ld-os">
      <ScrollReveal />
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
            <div className="hero-ctas">
              <a className="btn" href="#demo">Request a demo</a>
              <a className="ghost" href="#pricing">See pricing</a>
            </div>
            <div className="hero-stats">
              <div><span className="bb" style={{ fontSize: 44, color: 'var(--gold-light)' }}>7</span><span className="cd gray" style={{ fontSize: 12 }}>Contractors running it</span></div>
              <div><span className="bb" style={{ fontSize: 44, color: 'var(--gold-light)' }}>1x</span><span className="cd gray" style={{ fontSize: 12 }}>Build fee, paid once</span></div>
              <div><span className="bb" style={{ fontSize: 44, color: 'var(--gold-light)' }}>$0</span><span className="cd gray" style={{ fontSize: 12 }}>Per-seat fees, ever</span></div>
            </div>
          </div>

          <OsAppMock />
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="band">
        <div className="wrap">
          <div className="head" data-reveal>
            <div className="lbl">The problem</div>
            <h2 className="bb">Where does your company's information <em>live right now?</em></h2>
          </div>
          <div className="g3" style={{ gap: 24 }} data-reveal>
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
          <div className="head" data-reveal>
            <div className="lbl">What you get</div>
            <h2 className="bb">One system of record. <em>Your name on the door.</em></h2>
            <p className="muted" style={{ maxWidth: 640 }}>
              You get your own app, on your own web address, named after your company. Here is what comes in the
              box, switched on or off to fit how you work.
            </p>
          </div>
          <div className="g3" data-reveal>
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
        <div className="wrap">
          <div className="head" data-reveal>
            <div className="lbl">Why not just buy software?</div>
            <h2 className="bb">Off-the-shelf makes you fit it. <em>This is built to fit you.</em></h2>
            <p className="muted" style={{ maxWidth: 720 }}>
              I'm a process engineer, not a software salesman. I map how information actually moves through your
              company first, then shape the system around it. The software is the tool. The standards and habits
              your team builds with it are the real operating system.
            </p>
          </div>
          <div className="vs" data-reveal>
            <div className="vs-card vs-them">
              <span className="cd vs-title">The usual software stack</span>
              <ul>
                {USUAL.map((t) => (
                  <li key={t}>
                    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="vs-card vs-us">
              <span className="cd vs-title">Your company OS</span>
              <ul>
                {YOURS.map((t) => (
                  <li key={t}>
                    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" /></svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="band">
        <div className="wrap">
          <div className="head" data-reveal>
            <div className="lbl">How it works</div>
            <h2 className="bb">From first call to <em>running your company.</em></h2>
          </div>
          <div className="g4" data-reveal>
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
          <div className="head" data-reveal>
            <div className="lbl">Pricing</div>
            <h2 className="bb">One build. <em>Then it's just yours.</em></h2>
            <p className="muted" style={{ maxWidth: 720 }}>
              Every company runs differently, so every company gets its own custom brain. Not a login to someone
              else's software, but a system built around how your company works, and tuned as it changes.
            </p>
          </div>
          <div className="price-grid" data-reveal>
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
                <a className="btn" href="#demo" style={{ marginTop: 6 }}>Request a demo</a>
              </div>
              <ul>
                {INCLUDED.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          </div>
          <div className="price-extras" data-reveal>
            <div className="card stack">
              <span className="cd gray" style={{ fontSize: 13 }}>After the build</span>
              <h3 className="bb">Only pay for improvements</h3>
              <p className="muted">
                This isn't a support plan. Your brain keeps getting sharper as your company grows: a new module, a
                new report, a change to how payroll works. You don't pay to use it. You only pay when you want it
                fine-tuned.
              </p>
            </div>
            <div className="card stack">
              <span className="cd gray" style={{ fontSize: 13 }}>Over 100 employees?</span>
              <h3 className="bb">Let's schedule a call</h3>
              <p className="muted">
                Same system, longer rollout. We build it out discipline by discipline and team by team so every part
                of the company is covered before we call it done.
              </p>
              <a className="cd link" href={BOOKING_URL} target="_blank" rel="noopener">Schedule a call →</a>
            </div>
            <div className="card stack">
              <span className="cd gray" style={{ fontSize: 13 }}>Want more than software?</span>
              <h3 className="bb">Or go all in</h3>
              <p className="muted">
                The OS comes included in the 12-month Lean Dirt program, where we install the process, the standards
                and the scoreboard with it.
              </p>
              <Link className="cd link" href="/">About the program →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR (testimonial hidden until real quotes come in) */}
      <section className="band">
        <div className="wrap g2 who">
          <div className="stack" data-reveal>
            <div className="lbl">Who it's for</div>
            <h2 className="bb">Built in the dirt, <em>for the dirt.</em></h2>
            <p className="muted">
              Civil contractors doing $5M to $50M a year, where the owner is still the answer to too many questions.
            </p>
          </div>
          <ul className="trades" data-reveal>
            {TRADES.map((t) => <li key={t} className="cd">{t}</li>)}
          </ul>
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
            {FAQ.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary><h3 className="bb">{q}</h3><span className="plus" aria-hidden="true" /></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* REQUEST A DEMO */}
      <section id="demo" className="band" style={{ borderBottom: 0 }}>
        <div className="wrap g2" style={{ alignItems: 'start' }}>
          <div className="stack" style={{ gap: 24 }} data-reveal>
            <div className="lbl">Request a demo</div>
            <h2 className="bb" style={{ fontSize: 'clamp(52px, 6vw, 92px)' }}>Stop being the <em>company's search engine.</em></h2>
            <p className="muted" style={{ fontSize: 19 }}>
              Tell me a little about your company and I'll reach out personally to set up a live walkthrough.
            </p>
            <ol className="next-steps">
              <li><span className="num">1</span><span><strong>You tell me</strong> about your company and the question you answer ten times a day.</span></li>
              <li><span className="num">2</span><span><strong>We do a live walkthrough</strong> of the real platform, about 30 minutes.</span></li>
              <li><span className="num">3</span><span><strong>If it fits,</strong> I map out your build. Over 100 people? We plan the rollout together.</span></li>
            </ol>
          </div>
          <div data-reveal>
            <OsWaitlistForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
