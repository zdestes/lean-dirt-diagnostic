/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import ScrollReveal from '@/components/ScrollReveal';
import { BOOKING_URL, IMG } from '@/lib/site';
import './home.css';

export const metadata = {
  title: 'Lean Dirt: Add 2–5 Net Margin Points in 12 Months',
  description:
    'Operational excellence coaching for $5M–$30M civil contractors. Book a free 30-minute Operations Review.',
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
          <p className="hero-eyebrow fade-up">For $5M–$30M Civil Contractors</p>
          <span className="hero-rule"></span>
          <h1 className="fade-up">
            Add 2–5 Net<br />Margin Points<br />in <em>12 Months</em>.
          </h1>
          <p className="hero-sub fade-up">
            If you're doing $5M–$30M in civil and still feel like every job runs through you, you're
            not broken. <strong>You've just grown faster than your systems.</strong> We install the
            structure so your business hits its profit targets without you holding it together by
            hand.
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
            Contractors in the $5M–$30M range all describe the same pattern: top line is healthy,
            but net margin feels stuck at 2–4% and fragile. Revenue is there, but it feels like
            you're constantly putting out fires instead of building something.
          </p>
          <div className="field-photo" data-reveal>
            <img src={IMG.crewPlans} alt="Field crew reviewing plans on site" loading="lazy" />
          </div>
          <div className="symptoms-grid">
            <div className="symptom" data-reveal>
              <p>
                You're the answer to every question on every job. Nothing moves without you, and
                every hour you spend there is an hour you're not running the business.
              </p>
            </div>
            <div className="symptom" data-reveal>
              <p>
                Equipment goes down and nobody knows what to do, or what broke it in the first
                place. Downtime is eating your margin and nobody's tracking it.
              </p>
            </div>
            <div className="symptom" data-reveal>
              <p>
                You know money is leaking somewhere: rework, schedule slip, idle time. You just
                can't put your finger on exactly where or how much.
              </p>
            </div>
            <div className="symptom" data-reveal>
              <p>
                Rework and variation are just "part of the business." You've accepted it. But every
                callback and redo is a direct hit to your net margin.
              </p>
            </div>
            <div className="symptom" data-reveal>
              <p>
                You've tried to get more organized. It works for a week, then the job takes over
                again and the profit you thought you'd protect slips away.
              </p>
            </div>
            <div className="symptom" data-reveal>
              <p>
                You can't honestly tell someone exactly how work is supposed to get done around
                here, which means you can't fix what's costing you.
              </p>
            </div>
          </div>
          <p className="diagnosis-closer" data-reveal>
            If three or more of those hit and you're between $5M and $30M, this call was built for you.
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
              Most civil contractors assume the margin squeeze is just the nature of the work. It's
              not. It's the natural outcome of a business that has grown{' '}
              <strong>faster than its systems.</strong>
            </p>
            <p>
              The real gap isn't effort. You're already working hard. The gap is{' '}
              <strong>systems thinking</strong>: the ability to see your operation as a set of
              repeatable processes, identify where friction and cost live, and build the structure
              that turns top-line revenue into bottom-line margin.
            </p>
            <p>
              That's a learnable skillset. And it changes everything: how you make decisions, how
              your team operates, how work actually gets done in the field, and how many of those
              dollars you actually keep.
            </p>
          </div>
        </div>
      </section>

      {/* OFFER — THE OPERATIONS REVIEW */}
      <section className="offer" id="operations-review">
        <div className="container">
          <p className="section-label" data-reveal>Start Here — Free</p>
          <h2 data-reveal>The 30-Minute<br />Operations Review</h2>
          <p className="offer-subtitle" data-reveal>
            One call with Zack. We'll look at your numbers together, map where margin is leaking,
            and lay out what has to change over the next 12 months to add 2–5 net points. You leave
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
                  looks like for your specific business: revenue range, cost structure, and all.
                </p>
              </div>
            </div>
            <div className="offer-item" data-reveal>
              <span className="offer-num">02</span>
              <div>
                <p className="offer-item-title">Plain-English Language for Why Your Profit Is Stuck</p>
                <p className="offer-item-desc">
                  Most owners know the numbers are off but can't name the cause precisely. We'll give
                  you the framework to understand it and explain it clearly to your team.
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
                  Whether you work with us or not, you leave with one specific thing to act on: a
                  real starting point toward that 2–5 point margin improvement, not vague advice.
                </p>
              </div>
            </div>
          </div>
          <div className="offer-cta" data-reveal>
            <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn-primary">
              Book Your Free Operations Review →
            </a>
            <span className="cta-note">Pick a time that works. No prep required — just your P&L.</span>
          </div>
          <div className="offer-guarantee" data-reveal>
            <p className="offer-guarantee-label">What Happens After</p>
            <p>
              The Operations Review is the first step of a larger 12-month engagement, not a
              standalone freebie. If we find a real 2–5 point margin opportunity (and we usually do),
              we'll show you exactly what the full program looks like: what the work is, how long it
              takes, and what it costs. No pressure, but we're going to be direct about what we see.
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
            This isn't a course or a binder of templates. It's a year of building real operating
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
                <li>You're a civil contractor doing $5M–$30M in annual revenue (typically under ~50 people)</li>
                <li>You're the owner in an overhead role, not running a crew every day</li>
                <li>Revenue is healthy but net margin feels stuck, fragile, or hard to explain</li>
                <li>You're willing to look honestly at how work actually gets done</li>
                <li>You want to build something that runs without you in every conversation</li>
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
            <span className="about-photo-caption">Zack Estes — Dirt World Summit</span>
          </div>
          <div className="about-body" data-reveal>
            <p>
              Lean Dirt helps $5M–$30M civil contractors add 2–5 net margin points in 12 months.
              Operational excellence coaching has never been built for the dirt world. Most
              frameworks are written for manufacturers, tech companies, or corporate ops teams.{' '}
              <strong>None of it translates cleanly to a field-based business.</strong>
            </p>
            <p>
              We work exclusively with civil contractors: crushing, hauling, asphalt, grading. The
              frameworks we use (lean methodology, systems thinking, continuous improvement) are
              adapted for how this work actually runs: variable sites, equipment and labor-dependent
              production, and owners who have grown past the field but whose business hasn't caught
              up.
            </p>
            <p>
              <strong>
                The Operations Review is where we decide if there's a real 2–5 point margin
                opportunity and whether we're the right partner to chase it.
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
              Built for $5M–$30M civil contractors: crushing, hauling, asphalt, grading.
            </span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
