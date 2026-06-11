/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import ScrollReveal from '@/components/ScrollReveal';
import { BOOKING_URL, IMG } from '@/lib/site';
import './home.css';

export const metadata = {
  title: 'Lean Dirt: Add 2–5 Net Margin Points in 12 Months',
  description:
    'Business performance coaching for $5M–$30M horizontal contractors. Book a free 30-minute Operations Review.',
};

export default function Home() {
  return (
    <div className="ld-home">
      <ScrollReveal />
      <SiteNav />

      {/* HERO */}
      <section
        className="hero"
        style={{
          backgroundImage: `url('${IMG.heroField}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 60%',
        }}
      >
        <div className="container">
          <p className="hero-eyebrow fade-up">For $5M–$30M Horizontal Contractors</p>
          <h1 className="fade-up">
            Add 2–5 Net<br />Margin Points<br />in <em>12 Months</em>.
          </h1>
          <p className="hero-sub fade-up">
            If you're doing $5M–$30M in horizontal work and every job still runs through you,
            you're not broken. <strong>Your business has grown faster than your systems.</strong>{' '}
            We coach you through installing the structure, so the business hits its profit targets
            without you holding it together by hand.
          </p>
          <div className="cta-block fade-up">
            <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn-primary">
              Book Your Free Operations Review →
            </a>
            <span className="cta-note">
              30 minutes with Zack. Your numbers, straight talk, and a first project to act on.
            </span>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="stats" aria-label="Lean Dirt at a glance">
        <div className="container-wide">
          <div className="stats-grid">
            <div className="stat" data-reveal>
              <span className="stat-num">2–5</span>
              <span className="stat-label">Net margin points added</span>
            </div>
            <div className="stat" data-reveal>
              <span className="stat-num">12</span>
              <span className="stat-label">Month engagement</span>
            </div>
            <div className="stat" data-reveal>
              <span className="stat-num">$5–30M</span>
              <span className="stat-label">Contractor sweet spot</span>
            </div>
            <div className="stat" data-reveal>
              <span className="stat-num">100%</span>
              <span className="stat-label">Dirt world. Nothing else.</span>
            </div>
          </div>
        </div>
      </section>

      {/* DIAGNOSIS */}
      <section className="diagnosis">
        <div className="container">
          <p className="section-label" data-reveal>Sound Familiar?</p>
          <h2 data-reveal>You're Working Hard.<br />The Business Isn't.</h2>
          <p className="diagnosis-intro" data-reveal>
            Contractors in the $5M–$30M range describe the same pattern: top line is healthy, but
            net margin sits at 2–4% and feels fragile. The revenue is there. The profit is not. And
            most days feel like firefighting instead of building.
          </p>
          <div className="field-photo" data-reveal>
            <img src={IMG.crewPlans} alt="Field crew reviewing plans on site" loading="lazy" />
          </div>
          <div className="symptoms-grid">
            <div className="symptom" data-reveal>
              <p>
                You're the answer to every question on every job. Nothing moves without you, and
                every hour you spend in the field is an hour nobody is running the business.
              </p>
            </div>
            <div className="symptom" data-reveal>
              <p>
                Equipment goes down and nobody knows what to do, or what broke it in the first
                place. Downtime is eating your margin and nobody is tracking it.
              </p>
            </div>
            <div className="symptom" data-reveal>
              <p>
                You know money is leaking somewhere: rework, schedule slip, idle time. You just
                can't put your finger on exactly where, or how much.
              </p>
            </div>
            <div className="symptom" data-reveal>
              <p>
                Rework and variation are treated as "part of the business." But every callback and
                redo is a direct hit to your net margin.
              </p>
            </div>
            <div className="symptom" data-reveal>
              <p>
                You've tried to get more organized. It works for a week, then the job takes over
                again and the profit you meant to protect slips away.
              </p>
            </div>
            <div className="symptom" data-reveal>
              <p>
                You can't honestly tell someone exactly how work is supposed to get done around
                here. Which means you can't fix what's costing you.
              </p>
            </div>
          </div>
          <p className="diagnosis-closer" data-reveal>
            If three or more of those hit, and you're between $5M and $30M, this call was built for
            you.
          </p>
        </div>
      </section>

      {/* ROOT CAUSE */}
      <section className="root-cause">
        <div className="container">
          <p className="section-label" data-reveal>The Actual Problem</p>
          <h2 data-reveal>
            Industry Average<br /><em>Sucks</em>.
          </h2>
          <div className="root-body" data-reveal>
            <p>
              Most horizontal contractors assume the margin squeeze is just the nature of the work.
              It isn't. It's the natural outcome of a business that has grown{' '}
              <strong>faster than its systems.</strong>
            </p>
            <p>
              The gap isn't effort. You already work hard. The gap is{' '}
              <strong>a specific, learnable skillset</strong>: seeing your operation as a set of
              repeatable processes, finding where friction and cost live, and building the structure
              that turns top-line revenue into bottom-line margin.
            </p>
            <p>
              Learnable is the key word. Skills get built through coaching and practice. Which is
              exactly what this is.
            </p>
          </div>
        </div>
      </section>

      {/* COACHING POSITIONING */}
      <section className="coach">
        <div className="container">
          <p className="section-label" data-reveal>What We Do</p>
          <h2 data-reveal>
            Professionals<br />Have <em>Coaches</em>.
          </h2>
          <div className="root-body" data-reveal>
            <p>
              In athletics, a coach builds specific skillsets that improve an athlete's
              performance. In business, a coach builds specific skillsets that improve a company's
              performance. Same job, different arena. And the same divide exists in both: amateurs
              practice when they feel like it. <strong>Professionals train on purpose.</strong>
            </p>
            <p>
              Lean Dirt is performance coaching for owners of horizontal construction businesses.
              Civil, paving, crushing, grading, hauling. Heavy equipment, heavy labor, field
              operations. If you run one and you want it to perform better, this is for you.
            </p>
          </div>
          <div className="who-cols coach-cols">
            <div data-reveal>
              <p className="who-col-label yes">What we coach</p>
              <ul className="who-list yes">
                <li>Gross margin: knowing it by job and business line, growing it, defending it</li>
                <li>Production: real rates, real targets, and the discipline to hit them</li>
                <li>Downtime: measuring what it actually costs you, then cutting it</li>
                <li>Standardization: one written way to do the work, so results stop depending on who showed up</li>
                <li>Organizational development: clear roles, real accountability, an office that keeps pace with the field</li>
                <li>Performance at every level: individual, team, and business</li>
              </ul>
            </div>
            <div data-reveal>
              <p className="who-col-label no">What we refuse to do</p>
              <ul className="who-list no">
                <li>Vision-statement workshops</li>
                <li>Personality tests and culture decks</li>
                <li>Motivational talk that evaporates by Monday</li>
                <li>Vague "leadership journeys" with no number attached</li>
                <li>Anything we can't measure in inputs and outputs</li>
              </ul>
            </div>
          </div>
          <div className="coach-promise" data-reveal>
            <p className="coach-promise-label">The Commitment (And the Challenge)</p>
            <p>
              Every hour we spend together stays on the parts of your business that tangibly move
              the needle. Inputs and outputs. If we can't name the number a piece of work moves, we
              don't do that work. And to be clear: this is not "equipment utilization" coaching
              with a new name. It's the field <strong>and</strong> the office. The business in its
              entirety.
            </p>
          </div>
        </div>
      </section>

      {/* OFFER: THE OPERATIONS REVIEW */}
      <section className="offer" id="operations-review">
        <div className="container">
          <p className="section-label" data-reveal>Start Here. Free.</p>
          <h2 data-reveal>The 30-Minute<br />Operations Review</h2>
          <p className="offer-subtitle" data-reveal>
            One call with Zack. We look at your numbers together, map where margin is leaking, and
            lay out what has to change over the next 12 months to add 2–5 net points. You leave
            with three things:
          </p>
          <div className="offer-items">
            <div className="offer-item" data-reveal>
              <span className="offer-num">01</span>
              <div>
                <p className="offer-item-title">
                  Your Current Net Margin Snapshot and a Clear 12-Month Target
                </p>
                <p className="offer-item-desc">
                  We benchmark where you are today and define what a realistic 2–5 point improvement
                  looks like for your specific business: your revenue range, your cost structure,
                  your mix of work.
                </p>
              </div>
            </div>
            <div className="offer-item" data-reveal>
              <span className="offer-num">02</span>
              <div>
                <p className="offer-item-title">Plain-English Language for Why Your Profit Is Stuck</p>
                <p className="offer-item-desc">
                  Most owners know the numbers are off but can't name the cause precisely. You'll
                  get the framework to understand it and to explain it clearly to your team.
                </p>
              </div>
            </div>
            <div className="offer-item" data-reveal>
              <span className="offer-num">03</span>
              <div>
                <p className="offer-item-title">
                  A Concrete First Project to Start Closing the Gap This Month
                </p>
                <p className="offer-item-desc">
                  Whether you hire us or not, you leave with one specific thing to act on. A real
                  starting point toward that 2–5 point improvement, not vague advice.
                </p>
              </div>
            </div>
          </div>
          <div className="offer-cta" data-reveal>
            <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn-primary">
              Book Your Free Operations Review →
            </a>
            <span className="cta-note">Pick a time that works. No prep required, just your P&L.</span>
          </div>
          <div className="offer-guarantee" data-reveal>
            <p className="offer-guarantee-label">What Happens After</p>
            <p>
              The Operations Review is the first step of a 12-month engagement, not a standalone
              freebie. If we find a real 2–5 point margin opportunity (we usually do), we'll show
              you exactly what the full program looks like: what the work is, how long it takes,
              and what it costs. No pressure. But we will be direct about what we see.
            </p>
          </div>
        </div>
      </section>

      {/* THE PROGRAM */}
      <section className="program">
        <div className="container">
          <p className="section-label" data-reveal>If We're a Fit</p>
          <h2 data-reveal>The 12-Month<br />Program</h2>
          <p className="program-subtitle" data-reveal>
            This is not a course or a binder of templates. It's a year of building real operating
            systems into your business, shoulder to shoulder.
          </p>
          <div className="program-steps">
            <div className="program-step" data-reveal>
              <span className="program-step-num">1</span>
              <div>
                <p className="program-step-title">3-Day Onsite</p>
                <p className="program-step-desc">
                  We come to you. We walk your jobs, your shop, and your office, map how work
                  actually flows, and find exactly where margin is leaking. You get a prioritized
                  12-month roadmap before we leave.
                </p>
              </div>
            </div>
            <div className="program-step" data-reveal>
              <span className="program-step-num">2</span>
              <div>
                <p className="program-step-title">Two Coaching Calls a Month</p>
                <p className="program-step-desc">
                  Structured working sessions to install each system: process standards, downtime
                  tracking, rework elimination, planning rhythms. We build it with you and your
                  team, not for you.
                </p>
              </div>
            </div>
            <div className="program-step" data-reveal>
              <span className="program-step-num">3</span>
              <div>
                <p className="program-step-title">Daily WhatsApp Access</p>
                <p className="program-step-desc">
                  Real problems don't wait for the next call. When something breaks, you message
                  Zack directly. Momentum is the whole game, and this is how we keep it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="who">
        <div className="container">
          <p className="section-label" data-reveal>Right Fit</p>
          <h2 data-reveal>Who This Is For<br />And Who It Isn't</h2>
          <div className="who-cols">
            <div data-reveal>
              <p className="who-col-label yes">This is for you if</p>
              <ul className="who-list yes">
                <li>You're a horizontal contractor doing $5M–$30M in annual revenue (typically under ~50 people)</li>
                <li>You're the owner in an overhead role, not running a crew every day</li>
                <li>Revenue is healthy but net margin is stuck, fragile, or hard to explain</li>
                <li>You're willing to look honestly at how work actually gets done</li>
                <li>You want a business that runs without you in every conversation</li>
              </ul>
            </div>
            <div data-reveal>
              <p className="who-col-label no">Skip this if</p>
              <ul className="who-list no">
                <li>You're under $5M in revenue or still in the field full-time</li>
                <li>You only want more bids, not a better-run business</li>
                <li>You want a consultant to come in and do it for you</li>
                <li>You think the problems are entirely your team's fault</li>
                <li>You're looking for a quick fix with no follow-through</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <div className="container">
          <p className="section-label" data-reveal>Who You're Talking To</p>
          <h2 data-reveal>Why Lean Dirt</h2>
          <div className="about-photo" data-reveal>
            <img src={IMG.zackSpeaking} alt="Zack Estes speaking at Dirt World Summit" loading="lazy" />
            <span className="about-photo-caption">Zack Estes, Dirt World Summit</span>
          </div>
          <div className="about-body" data-reveal>
            <p>
              Lean Dirt helps $5M–$30M horizontal contractors add 2–5 net margin points in 12
              months. Business performance coaching has never been built for the dirt world. Most
              frameworks are written for manufacturers, tech companies, or corporate ops teams.{' '}
              <strong>None of it translates cleanly to a field-based business.</strong>
            </p>
            <p>
              We work exclusively with horizontal contractors: civil, paving, crushing, grading,
              hauling. The methods we use (lean methodology, systems thinking, continuous
              improvement) are adapted for how this work actually runs: variable sites, production
              that depends on equipment and labor, and owners who have grown past the field while
              the business hasn't caught up.
            </p>
            <p>
              <strong>
                The Operations Review is where we decide, together, whether there's a real 2–5
                point margin opportunity and whether we're the right partner to chase it.
              </strong>{' '}
              If the answer is yes on both sides, we get to work.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container">
          <p className="section-label" data-reveal>Ready?</p>
          <h2 data-reveal>
            One Call.<br /><em>Straight Talk</em>.<br />Real Numbers.
          </h2>
          <p className="final-cta-sub" data-reveal>
            Book your free 30-minute Operations Review. We'll map where your margin is going and
            what it takes to close the gap. If there's a real opportunity, we'll both know by the
            end of the call.
          </p>
          <div className="cta-block" data-reveal>
            <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn-primary">
              Book Your Free Operations Review →
            </a>
            <span className="cta-note">
              Built for $5M–$30M horizontal contractors: civil, paving, crushing, grading, hauling.
            </span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
