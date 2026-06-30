/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import ScrollReveal from '@/components/ScrollReveal';
import { BOOKING_URL, IMG } from '@/lib/site';
import './home.css';

export const metadata = {
  title: 'Lean Dirt | Get Your Business Out of Your Head and Into a Playbook',
  description:
    'You got here on gut. The next level runs on a playbook. Operating systems and the skill to run them, built for $5M to $30M horizontal contractors. Book a free 30-minute Operations Review.',
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
          <p className="hero-eyebrow fade-up">For $5M to $30M Horizontal Contractors</p>
          <h1 className="fade-up">
            You Got Here<br />on Gut.<br />
            The Next Level<br />Runs on a <em>Playbook</em>.
          </h1>
          <p className="hero-sub fade-up">
            Right now the way your business runs lives in one place: your head. We spend 12 months
            getting it out of your head and into a playbook the whole company can run.{' '}
            <strong>So the business runs on something you can see, not something you have to be.</strong>
          </p>
          <div className="cta-block fade-up">
            <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn-primary">
              Book Your Free Operations Review →
            </a>
            <span className="cta-note">
              30 minutes with Zack. Your numbers, straight talk, and a clear read on your biggest constraint.
            </span>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="stats" aria-label="Lean Dirt at a glance">
        <div className="container-wide">
          <div className="stats-grid">
            <div className="stat" data-reveal>
              <span className="stat-num">Gut</span>
              <span className="stat-label">What it runs on now</span>
            </div>
            <div className="stat" data-reveal>
              <span className="stat-num">12</span>
              <span className="stat-label">Months to a real playbook</span>
            </div>
            <div className="stat" data-reveal>
              <span className="stat-num">$5M–$30M</span>
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
          <h2 data-reveal>It's All<br />in Your Head.</h2>
          <p className="diagnosis-intro" data-reveal>
            Contractors in the $5M to $30M range describe the same pattern. The top line is healthy.
            The profit is thinner than it should be and feels fragile. And the only reason the whole
            thing holds together is that you are personally holding it together, one decision at a time.
          </p>
          <div className="field-photo" data-reveal>
            <img src={IMG.crewPlans} alt="Field crew reviewing plans on site" loading="lazy" />
          </div>
          <div className="symptoms-grid">
            <div className="symptom" data-reveal>
              <p>
                You're the answer to every question on every job. Nothing moves without you, and every
                hour you spend in the field is an hour nobody is running the business.
              </p>
            </div>
            <div className="symptom" data-reveal>
              <p>
                The way the work is supposed to get done lives in your head, not on paper. So it gets
                done your way only when you're standing there.
              </p>
            </div>
            <div className="symptom" data-reveal>
              <p>
                Equipment goes down and nobody knows what to do, or what broke it in the first place.
                Downtime is eating your margin and nobody is tracking it.
              </p>
            </div>
            <div className="symptom" data-reveal>
              <p>
                You know money is leaking somewhere: rework, schedule slip, idle time. You just can't
                put your finger on exactly where, or how much.
              </p>
            </div>
            <div className="symptom" data-reveal>
              <p>
                You've tried to get organized. It works for a week, then the job takes over again and
                the profit you meant to protect slips away.
              </p>
            </div>
            <div className="symptom" data-reveal>
              <p>
                If you stepped away for a month, you're not confident the business would run the way you
                need it to. That's not a people problem. It's a playbook problem.
              </p>
            </div>
          </div>
          <p className="diagnosis-closer" data-reveal>
            If three or more of those hit, and you're between $5M and $30M, this call was built for you.
          </p>
        </div>
      </section>

      {/* ROOT CAUSE */}
      <section className="root-cause">
        <div className="container">
          <p className="section-label" data-reveal>The Actual Problem</p>
          <h2 data-reveal>
            Gut Got You Here.<br />It <em>Won't</em> Get You There.
          </h2>
          <div className="root-body" data-reveal>
            <p>
              The instinct that built this business is real. You can walk a job and feel what's off.
              You can price work in your head and be right. That gut is an asset, and it got you to
              where you are.
            </p>
            <p>
              But gut has a ceiling, and you've hit it. It doesn't scale past your own two feet. It
              can't be handed to a foreman or an estimator. And it can't be improved on purpose,
              because nobody can see it, including you.{' '}
              <strong>The way out is to get what's in your head into the open.</strong>
            </p>
            <p>
              A playbook is the opposite of gut. It's visible. It's teachable. It belongs to the whole
              company instead of one person. And once it's written down, it can finally be sharpened
              quarter after quarter, instead of starting over every time the job gets busy.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="approach">
        <div className="container">
          <p className="section-label" data-reveal>What We Do</p>
          <h2 data-reveal>
            We Build the Playbook<br />and the <em>Skill</em> to Run It.
          </h2>
          <div className="root-body" data-reveal>
            <p>
              Most help for owners stops at one half of the problem. Consultants hand you systems and
              leave, so the systems die the day they walk out. Coaches work on you and never touch the
              actual operation, so nothing in the business changes. Neither one makes you better at
              running the place.
            </p>
            <p>
              We do both halves, on purpose. We build the first operating systems with you so they're
              real and running. And we teach you the skill underneath them, so you can find the next
              leak, fix it, and keep the playbook sharp long after we're gone.{' '}
              <strong>You don't end up dependent on us. You end up capable.</strong>
            </p>
          </div>
          <div className="who-cols approach-cols">
            <div data-reveal>
              <p className="who-col-label yes">What goes in the playbook</p>
              <ul className="who-list yes">
                <li>Gross margin: knowing it by job and business line, growing it, defending it</li>
                <li>Production: real rates, real targets, and the discipline to hit them</li>
                <li>Downtime: measuring what it actually costs you, then cutting it</li>
                <li>Standardization: one written way to do the work, so results stop depending on who showed up</li>
                <li>Roles and accountability: who owns what, so the answer isn't always you</li>
                <li>The skill to read your own business and find the next constraint, systematically, not by gut</li>
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
          <div className="approach-promise" data-reveal>
            <p className="approach-promise-label">The Commitment (And the Challenge)</p>
            <p>
              Every hour we spend together stays on the parts of your business that tangibly move the
              needle. Inputs and outputs. If we can't name the number a piece of work moves, we don't
              do that work. This is the field <strong>and</strong> the office. The business in its
              entirety, written down where everyone can see it.
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
            One call with Zack. We look at your numbers together and find the single biggest thing
            holding your margin back. By the end, you'll know what it is, why it keeps happening, and
            whether we're the right ones to help you fix it.
          </p>
          <div className="offer-items">
            <div className="offer-item" data-reveal>
              <span className="offer-num">01</span>
              <div>
                <p className="offer-item-title">Your #1 Constraint, Named</p>
                <p className="offer-item-desc">
                  We find the single biggest thing holding your margin back. Not a list of ten
                  problems. The one bottleneck costing you the most right now, said plainly.
                </p>
              </div>
            </div>
            <div className="offer-item" data-reveal>
              <span className="offer-num">02</span>
              <div>
                <p className="offer-item-title">Why It's There, and Why It Keeps Coming Back</p>
                <p className="offer-item-desc">
                  You'll understand the actual cause, not the symptom. Most owners have been fighting
                  the same fire for years without seeing what's feeding it. You'll see it.
                </p>
              </div>
            </div>
            <div className="offer-item" data-reveal>
              <span className="offer-num">03</span>
              <div>
                <p className="offer-item-title">A Straight Answer on Whether We Can Help</p>
                <p className="offer-item-desc">
                  No pitch, no pressure. If there's a real opportunity and we're the right ones to
                  build it with you, we'll tell you what that looks like. If there isn't, we'll tell
                  you that too.
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
              freebie. If we find a real margin opportunity, and we usually do, we'll show you exactly
              what the work looks like: what we build, how long it takes, and what it costs. No
              pressure. But we will be direct about what we see.
            </p>
          </div>
        </div>
      </section>

      {/* THE ENGAGEMENT */}
      <section className="program">
        <div className="container">
          <p className="section-label" data-reveal>If We're a Fit</p>
          <h2 data-reveal>Inside the<br />12 Months</h2>
          <p className="program-subtitle" data-reveal>
            This is not a course or a binder of templates. It's a year of building the playbook into
            your business, shoulder to shoulder, and building your skill to run it without us.
          </p>
          <div className="program-steps">
            <div className="program-step" data-reveal>
              <span className="program-step-num">1</span>
              <div>
                <p className="program-step-title">3-Day Onsite</p>
                <p className="program-step-desc">
                  We come to you. We walk your jobs, your shop, and your office, map how work actually
                  flows, and find exactly where margin is leaking. You get a prioritized 12-month
                  roadmap before we leave.
                </p>
              </div>
            </div>
            <div className="program-step" data-reveal>
              <span className="program-step-num">2</span>
              <div>
                <p className="program-step-title">Two Working Sessions a Month</p>
                <p className="program-step-desc">
                  Structured sessions where we write the playbook one piece at a time: production
                  standards, downtime tracking, rework elimination, planning rhythms. We build it with
                  you and your team, not for you, so it sticks when we're gone.
                </p>
              </div>
            </div>
            <div className="program-step" data-reveal>
              <span className="program-step-num">3</span>
              <div>
                <p className="program-step-title">Daily WhatsApp Access</p>
                <p className="program-step-desc">
                  Real problems don't wait for the next session. When something breaks, you message Zack
                  directly. Momentum is the whole game, and this is how we keep it.
                </p>
              </div>
            </div>
            <div className="program-step" data-reveal>
              <span className="program-step-num">4</span>
              <div>
                <p className="program-step-title">The Skill That Outlasts Us</p>
                <p className="program-step-desc">
                  Through all of it, we teach you to find the next constraint on your own,
                  systematically instead of by gut, and to keep sharpening the playbook every quarter.
                  When the year ends, the capability stays with you.
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
                <li>You're a horizontal contractor doing $5M to $30M in annual revenue (typically under ~50 people)</li>
                <li>You're the owner in an overhead role, not running a crew every day</li>
                <li>Revenue is healthy but the business still runs on you and your gut</li>
                <li>You're willing to look honestly at how work actually gets done</li>
                <li>You want a business that runs on a playbook, not on you being in every conversation</li>
              </ul>
            </div>
            <div data-reveal>
              <p className="who-col-label no">Skip this if</p>
              <ul className="who-list no">
                <li>You're under $5M in revenue or still in the field full-time</li>
                <li>You only want more bids, not a better-run business</li>
                <li>You want a consultant to come in and do it for you and leave</li>
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
              Lean Dirt helps $5M to $30M horizontal contractors get the business out of their head
              and into a playbook. Business performance methods have never been built for the dirt
              world. Most frameworks are written for manufacturers, tech companies, or corporate ops
              teams. <strong>None of it translates cleanly to a field-based business.</strong>
            </p>
            <p>
              We work exclusively with horizontal contractors: civil, paving, crushing, grading,
              hauling. The methods we use (lean thinking, systems thinking, continuous improvement) are
              adapted for how this work actually runs: variable sites, production that depends on
              equipment and labor, and owners who have grown past the field while the business hasn't
              caught up.
            </p>
            <p>
              <strong>
                The Operations Review is where we decide, together, whether there's a real opportunity
                here and whether we're the right partner to build it with you.
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
            Get It Out<br />of Your <em>Head</em>.
          </h2>
          <p className="final-cta-sub" data-reveal>
            Book your free 30-minute Operations Review. We'll find where your margin is going and map
            what it takes to put the business on a playbook. If there's a real opportunity, we'll both
            know by the end of the call.
          </p>
          <div className="cta-block" data-reveal>
            <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn-primary">
              Book Your Free Operations Review →
            </a>
            <span className="cta-note">
              Built for $5M to $30M horizontal contractors: civil, paving, crushing, grading, hauling.
            </span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
