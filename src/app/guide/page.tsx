/* eslint-disable react/no-unescaped-entities */
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import GuideToc, { type TocItem } from '@/components/GuideToc';
import { LtvCacCalc, RunwayCalc, DriverTreeCalc, PriceRaiseCalc } from '@/components/GuideCalculators';
import { BOOKING_URL } from '@/lib/site';
import './guide.css';

export const metadata = {
  title: 'How a Business Actually Works — The Lean Dirt Field Guide',
  description:
    'A plain-English field guide to the machine underneath every business: the four jobs, the driver tree, the bottleneck, pricing, and the numbers that decide whether you live or die. With live calculators.',
};

const TOC: TocItem[] = [
  { id: 'read-first', label: 'Read this first' },
  { id: 'part-1', label: '1 · What a business is' },
  { id: 'part-2', label: '2 · The machine' },
  { id: 'part-3', label: '3 · The four jobs' },
  { id: 'part-4', label: '4 · The money' },
  { id: 'part-5', label: '5 · The driver tree' },
  { id: 'part-6', label: '6 · The bottleneck' },
  { id: 'part-7', label: '7 · The seven skills' },
  { id: 'part-8', label: '8 · Why people buy' },
  { id: 'part-9', label: '9 · Charge more' },
  { id: 'part-10', label: '10 · Fewer customers' },
  { id: 'part-11', label: "11 · The owner's real job" },
  { id: 'part-12', label: '12 · Order of operations' },
  { id: 'part-13', label: '13 · The lies' },
  { id: 'part-14', label: '14 · The scoreboard' },
  { id: 'part-15', label: '15 · Ray, start to finish' },
  { id: 'napkin', label: 'The napkin' },
];

function BookCta({ line, sub }: { line: string; sub: string }) {
  return (
    <div className="guide-cta">
      <p className="guide-cta__line">{line}</p>
      <p className="guide-cta__sub">{sub}</p>
      <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn-primary">
        Book Your Free Operations Review →
      </a>
    </div>
  );
}

export default function GuidePage() {
  return (
    <div className="ld-guide">
      <SiteNav />

      <header className="guide-hero">
        <div className="guide-wrap">
          <p className="guide-eyebrow">The Lean Dirt Field Guide</p>
          <h1>
            How a Business<br />
            <em>Actually</em> Works
          </h1>
          <p className="guide-tagline">
            A field guide for people who own one, want to own one, or want to fix the one they've
            got.
          </p>
          <div className="guide-meta">
            <span>16 parts</span>
            <span>≈ 40 min read</span>
            <span>4 live calculators</span>
            <span>Free. No email wall.</span>
          </div>
        </div>
      </header>

      <div className="guide-wrap">
        <div className="guide-layout">
          <GuideToc items={TOC} />

          <article className="guide-article">
            {/* ── READ THIS FIRST ── */}
            <section id="read-first">
              <p className="guide-part-label">Read this first</p>
              <p className="guide-lede">
                Most people who own a business don't actually know what a business is. Not in a way
                they could write on a napkin. They know their trade — how to cut hair, pour
                concrete, write code, bake bread. But the trade is not the business.{' '}
                <strong>The trade is the thing the business sells.</strong>
              </p>
              <p>
                This is the whole problem. A person becomes excellent at the work, assumes that
                makes them good at business, then is confused when they're the best plumber in town
                and still broke.
              </p>
              <p>
                So let's fix the root. By the end of this you should be able to look at any business
                — yours, your friend's, a stranger's — and see the machine underneath. The same
                machine is under all of them. A landscaping company, a law firm, a SaaS startup, and
                a taco truck are the same machine wearing different clothes.
              </p>
              <p>Three promises about how this is written:</p>
              <ul>
                <li>
                  <strong>Every term gets defined the first time it appears.</strong> If a word
                  could mean ten things, I'll tell you the one thing I mean. If you catch me being
                  vague, I've failed.
                </li>
                <li>
                  <strong>Everything connects by cause and effect.</strong> Business is linear: if
                  this number moves, then that number moves, in a direction you can predict. Change
                  a price, and you'll know exactly which downstream numbers move and which don't.
                </li>
                <li>
                  <strong>One real business gets traced through everything.</strong> His name is
                  Ray, he runs a mobile rock-crushing service, and in Part 15 his entire business
                  runs through every idea here, with real arithmetic. The scattered examples along
                  the way are warm-ups. Ray is the proof.
                </li>
              </ul>
              <p>
                One scope note: this covers how the machine works — not legal structure, taxes in
                detail, licenses, or insurance. Those vary by location; ask a local accountant.
                What's here is true everywhere.
              </p>
            </section>

            {/* ── PART 1 ── */}
            <section id="part-1">
              <p className="guide-part-label">Part 1</p>
              <h2>What a business is, in one sentence</h2>
              <div className="guide-eq">
                <p>
                  A business is a system that solves a problem for a group of people, at a cost
                  lower than what they'll pay you to solve it, over and over again.
                </p>
              </div>
              <p>Read it again. Every word is load-bearing.</p>
              <p>
                <strong>"Solves a problem."</strong> Nobody pays you for effort. They pay you to
                make a problem go away. The dentist doesn't sell drilling; he sells "the pain stops"
                and "I'm not embarrassed to smile." Even lawyers billing by the hour aren't selling
                hours — the client pays for the contract reviewed or the lawsuit survived, and
                tolerates hourly billing as the meter. The moment the hours stop producing the
                outcome, they stop being paid for. Forget this and you'll spend your life talking
                about your process to people who only care about their outcome.
              </p>
              <p>
                <strong>"For a group of people."</strong> Not one person. A group big enough and
                reachable enough that you can keep finding more of them. A problem only one weird
                person has is a hobby. Note the precise claim: the <em>group</em> must be big. Your{' '}
                <em>slice</em> can be small — Part 10 shows the number of customers you personally
                need is almost always smaller than you fear. Big pond, small catch, good living.
              </p>
              <p>
                <strong>"At a cost lower than what they'll pay you."</strong> This gap is the entire
                point. It's called <strong>margin</strong>, measured precisely in Part 4. Costs you
                $40 to solve, they pay $100: you made $60 of value that didn't exist before. Not
                theft, not luck — the reward for solving the problem cheaper than they could solve
                it themselves. Business is the act of manufacturing that gap and keeping it.
              </p>
              <p>
                <strong>"Over and over again."</strong> A single sale is a transaction. A business
                is a <em>repeatable</em> transaction. Anyone can sell their couch once. And
                "repeatable" has a concrete test:{' '}
                <strong>
                  you can name, in advance, where the next ten customers will come from, and be
                  roughly right.
                </strong>{' '}
                If every sale is a surprise, you have a streak, not a business.
              </p>
              <p>
                Missing any one of the four? You have a job, a hobby, a one-time hustle, or a
                charity. All fine things. Just not businesses, and they won't behave like one.
              </p>
            </section>

            {/* ── PART 2 ── */}
            <section id="part-2">
              <p className="guide-part-label">Part 2</p>
              <h2>The machine, start to finish</h2>
              <p>The whole machine in one line. Memorize it.</p>
              <div className="guide-eq">
                <p>
                  Get attention → make an offer → deliver the result → get paid more than it cost
                  you → use some of that money to get more attention.
                </p>
              </div>
              <p>That loop is the business. Everything else is detail.</p>
              <p>
                <strong>Get attention.</strong> Before anyone can buy, they have to know you exist.
                Attention comes three ways: <strong>rent it</strong> (ads — stops when you stop
                paying), <strong>earn it</strong> (referrals, reviews, reputation — slow to build,
                cheap to keep), or <strong>own it</strong> (a list of people who already know you:
                phone numbers, emails, followers — the most valuable asset most small businesses
                never bother to build). No attention, no business. A perfect product nobody hears
                about makes exactly zero dollars.
              </p>
              <p>
                <strong>Make an offer.</strong> An <strong>offer</strong> is a specific promise:
                "Give me this much money, and I'll solve this specific problem, by this time, like
                this." "We do marketing" is not an offer. "We'll get your dental practice 20 new
                patients in 60 days or you don't pay" is an offer. The clearer the promise, the
                easier everything downstream.
              </p>
              <p>
                <strong>Deliver the result.</strong> Make the problem go away. The <em>result</em>,
                not the <em>work</em> — activity is not delivery. The customer doesn't care that you
                were busy. They care that the problem is gone. (Skill 2 in Part 7 is the tool for
                telling the difference.)
              </p>
              <p>
                <strong>Get paid more than it cost you.</strong> All of it has to clear: materials,
                labor, ads, rent, <em>and your own wage</em> — the detail most owners get wrong,
                fixed in Part 4. If the loop costs more than it collects, you have an expensive way
                to lose money with extra steps.
              </p>
              <p>
                <strong>Reinvest in attention.</strong> Once Part 4's math proves each customer is
                profitable, reinvest a fixed percentage of revenue — healthy small businesses often
                run 5–10% — and treat it like rent: paid every month, not "when we can afford it." A
                business that profitably turns $1 of attention into $3 of customer doesn't have a
                growth problem. It has a "how fast can I pour in dollars" problem — the only good
                problem in business.
              </p>
              <p>
                When a business is broken, it's broken at one of those five steps. Your job is to
                find which one. Not all of them. One. (Part 6 is the procedure.)
              </p>
            </section>

            {/* ── PART 3 ── */}
            <section id="part-3">
              <p className="guide-part-label">Part 3</p>
              <h2>The four jobs every business has</h2>
              <p>
                Zoom in and every business — no exceptions — is four jobs running at once. "Running
                a business is overwhelming" means the four jobs were never separated, so they feel
                like one giant blob. Separate them and the blob becomes four manageable things, each
                with its own number.
              </p>
              <p>
                <strong>Job 1 — Get leads.</strong> A <strong>lead</strong> is a person who raised
                their hand: a call, a form, a "how much do you charge?" Not a sale — a hand in the
                air. The output is <strong>leads per week</strong>. If it's zero, nothing else
                matters.
              </p>
              <p>
                <strong>Job 2 — Turn leads into customers.</strong> Sales. The outputs are{' '}
                <strong>conversion rate</strong> (fraction of leads who buy — 10 leads, 3 buy: 30%)
                and <strong>average sale size</strong>. A business can double revenue without a
                single new lead just by getting better at this job. Most owners never realize that.
              </p>
              <p>
                <strong>Job 3 — Deliver the result.</strong> The output is a customer whose problem
                is actually gone. Done well, it feeds the other three jobs free, through referrals
                and repeats. Done badly, it poisons everything upstream — you cannot outmarket a
                product that doesn't deliver.
              </p>
              <p>
                <strong>Job 4 — Keep them and sell them again.</strong> The first sale to any person
                is the hardest and most expensive you'll ever make to them. The second is cheap. The
                output is <strong>lifetime value</strong> — what a customer is worth across the
                whole relationship, defined in Part 4. The most profitable job in business, and the
                one small businesses neglect most.
              </p>
              <p>
                The map to Part 2: Job 1 is "get attention," Job 2 runs "make an offer" through "get
                paid," Job 3 is "deliver," Job 4 makes "over and over again" true. Same machine, two
                zoom levels.
              </p>
              <p>
                Write the four down. Which is your business worst at right now? That's your
                constraint — Part 6's subject.
              </p>
            </section>

            {/* ── PART 4 ── */}
            <section id="part-4">
              <p className="guide-part-label">Part 4</p>
              <h2>The money, said plainly</h2>
              <p>
                People avoid this part because it has numbers. Don't. The numbers are simple, and
                not knowing them is why most businesses die.
              </p>
              <p>
                <strong>Revenue</strong> is what you collect. Revenue is not profit, and confusing
                the two has bankrupted more owners than any competitor. "We did a million in sales"
                says nothing about whether anyone made money.
              </p>
              <p>
                <strong>Cost of delivering</strong> is what it costs to fulfill <em>one</em> sale —
                the materials, the labor for that job, the fuel to get there. The test:{' '}
                <em>if the sale doesn't happen, does the cost disappear?</em> Yes → cost of
                delivering. No → fixed cost.
              </p>
              <p>
                <strong>Gross margin</strong> is what's left. Sell a $100 haircut, pay the barber
                $40: gross margin is $60, or 60%. Both forms matter.{' '}
                <strong>Margin dollars</strong> ($60) say how much fuel each sale adds.{' '}
                <strong>Margin percent</strong> (60%) says how efficiently revenue becomes fuel, and
                survives price changes for comparison. This is why two businesses with identical
                revenue live in different universes: one keeps $60 per sale, the other $10.
              </p>
              <p>
                <strong>Fixed costs</strong> get paid whether you sell anything or not — rent,
                software, insurance, salaries. They show up every month with their hand out.
              </p>
              <p>
                <strong>Your own wage is a fixed cost.</strong> This sentence is missing from most
                business advice, and its absence ruins people. Decide what you'd pay a stranger to
                do your job in the business — the market wage for the operator role — and count it
                as a fixed cost <em>before</em> calculating profit. A business that only "makes
                money" because the owner works free isn't profitable; it's a badly paying job with
                extra risk. Can't afford to pay yourself yet? Fine — early businesses often can't.
                But write the unpaid wage down as the real number it is, and aim the machine at
                closing the gap. Don't let "we're profitable!" mean "I paid everyone but me."
              </p>
              <p>
                <strong>Profit</strong> is gross margin from all sales minus all fixed costs, wage
                included. $20,000 of margin this month, $15,000 of fixed costs: $5,000 profit. (One
                more honesty check: that's pre-tax. Set aside a percentage every month — your
                accountant knows the right one — so April isn't a heart attack.)
              </p>
              <p>Now the two ratios that decide whether you live or die.</p>
              <p>
                <strong>CAC — cost to acquire a customer.</strong> Everything spent getting
                attention and converting it over a period — ads, the salesperson's time, the
                software — divided by new customers that period. Spent $1,000, got 10: CAC is $100.
                Customers have a price. Know it the way you know the price of gas.
              </p>
              <p>
                One precision most guides skip: there are two CACs. <strong>Paid CAC</strong> counts
                only customers from paid channels, against what you paid.{' '}
                <strong>Blended CAC</strong> divides total spend by <em>all</em> new customers,
                referrals and walk-ins included. Mostly word-of-mouth customers make blended CAC
                look beautifully low — and say nothing about whether your ads work. Paid CAC judges
                a channel. Blended CAC judges the business.
              </p>
              <p>
                <strong>LTV — lifetime value.</strong> What one customer is worth in{' '}
                <em>gross margin</em> — not revenue — across the whole relationship. Gym member pays
                $50/month, stays 20 months, 80% margin: LTV = 50 × 20 × 0.8 ={' '}
                <strong>$800</strong>. Margin, not revenue, because you'll compare it to CAC, and
                acquisition costs are paid out of margin. Notice the ingredients: price × frequency
                × <em>how long they stay</em>. That last term is <strong>churn</strong> — the rate
                customers leave — the silent killer inside every LTV. Halve how long customers stay
                and you halve LTV without touching price or cost.
              </p>
              <div className="guide-eq">
                <p>
                  The rule: LTV should be at least <em>3×</em> CAC.
                </p>
              </div>
              <p>
                Pay $100 for a customer worth $800: a machine — pour money in. Pay $100 for a
                customer worth $90: a shredder, and more sales kill you faster. Most owners who
                "can't figure out why growth isn't helping" are running a shredder and don't know
                it.
              </p>

              <LtvCacCalc />

              <p>
                Two adjustments so the rule fits <em>every</em> business:
              </p>
              <p>
                <em>Customers buy once</em> (roofing, wedding photography)? There's no repeat
                "lifetime," so the rule collapses to:{' '}
                <strong>margin on the single sale ≥ 3× CAC.</strong> Referrals become your whole Job
                4 — the repeat purchase you're owed is the customer's brother-in-law.
              </p>
              <p>
                <em>Money comes in slowly</em> ($800 over 20 months)? Also track{' '}
                <strong>payback period</strong>: months until a customer's accumulated margin covers
                their CAC. CAC $100, margin $40/month: payback 2.5 months. Shorter is safer, because
                of what's next.
              </p>
              <p>
                <strong>Cash.</strong> Profit is a number on a page. Cash is what's in the bank
                today. You can be profitable on paper and die anyway — paid for materials in March,
                customer paid you in June, payroll was due in April. A business doesn't die when it
                stops being profitable. It dies when it runs out of cash. Those are not the same
                day.
              </p>
              <p>
                Measure cash as <strong>runway</strong>: bank balance ÷ monthly fixed costs = months
                you'd survive if sales stopped. Three months is a floor; six is comfortable. And
                know the three levers that move cash without touching profit:{' '}
                <strong>collect sooner</strong> (deposits, invoice the day the job finishes, card on
                file, shorter terms), <strong>pay later</strong> (ask suppliers for terms — many say
                yes if asked), <strong>hold less stock</strong> (inventory is cash sleeping on a
                shelf in a costume). Watch the bank balance like a heart monitor, because that's
                what it is.
              </p>

              <RunwayCalc />
            </section>

            {/* ── PART 5 ── */}
            <section id="part-5">
              <p className="guide-part-label">Part 5</p>
              <h2>The driver tree — business as one multiplication problem</h2>
              <p>
                This is the shortest part and maybe the most useful page in the guide. Parts 1–4
                compress into two equations. Write them for your own business and every problem
                becomes traceable: a symptom in one number is <em>caused</em> by a number upstream,
                and you can follow the chain backward like a plumber following a pipe.
              </p>
              <div className="guide-eq">
                <p>Revenue = Leads × Conversion rate × Average sale × Purchases per year</p>
                <p>Profit = (Revenue × Gross margin %) − Fixed costs</p>
              </div>
              <p>
                The entire business in two lines. Five numbers to grow (leads, conversion, average
                sale, frequency, margin percent), one to shrink (fixed costs). Every tactic ever
                invented — every ad, script, upsell, loyalty program, price change — is an attempt
                to move one of those six. When someone pitches you anything, ask:{' '}
                <em>which number does this move?</em> If they can't answer, neither can the tactic.
              </p>

              <DriverTreeCalc />

              <p>Three consequences fall out, each an if-then you can take to the bank:</p>
              <p>
                <strong>If the numbers multiply, then small improvements stack violently.</strong>{' '}
                Improve leads 10%, conversion 10%, average sale 10% — three modest wins — and
                revenue grows 1.1 × 1.1 × 1.1 = <strong>33%</strong>, not 30%. The reverse is how
                businesses quietly rot: three numbers each slip 10%, revenue drops 27%, and every
                individual slip looked too small to panic about.
              </p>
              <p>
                <strong>If a number is multiplied by zero, then everything is zero.</strong> Perfect
                conversion times zero leads is zero customers. The world's best product times zero
                attention is zero revenue. Find your zero before polishing anything else.
              </p>
              <p>
                <strong>
                  If profit is margin minus fixed costs, then growth fixes nothing when margin per
                  sale is negative.
                </strong>{' '}
                More units of a money-losing sale dig the hole faster. Check margin <em>before</em>{' '}
                pouring in leads. (Part 12's whole argument, previewed.)
              </p>
              <p>
                Trace one chain to see the linearity: <em>Ray raises his price per ton 10%.</em>{' '}
                Average sale rises 10% → revenue rises ~10% (if customers stay — Part 9 gives the
                exact breakeven) → cost of delivering doesn't move, so margin dollars rise{' '}
                <em>more</em> than 10% → profit rises more still, because fixed costs didn't move
                either. One input, four predictable downstream effects. That's what "knowing how
                business works" means: not vibes — arithmetic.
              </p>
              <p>
                Write your two equations today, with real numbers. Any of the six you can't fill in
                is <em>itself a finding</em> — go measure it this week.
              </p>
            </section>

            {/* ── PART 6 ── */}
            <section id="part-6">
              <p className="guide-part-label">Part 6</p>
              <h2>The bottleneck — fix one thing, and here's how to find it</h2>
              <p>
                The most common owner mistake: improving everything at once and therefore improving
                nothing.
              </p>
              <p>
                At any moment, a business has one <strong>constraint</strong> — the single narrowest
                point holding back the whole machine. Picture a pipe with sections of different
                widths: money flows only as fast as the narrowest section allows. Widening any{' '}
                <em>other</em> section does nothing. Find the narrow part, widen it, and a different
                section becomes narrowest — move there. One at a time. Forever. That's what "running
                a business" actually is, day to day.
              </p>
              <p>
                The original sin of most business advice is saying "find your bottleneck" and
                walking away. Here's the actual procedure. Under an hour.
              </p>
              <p>
                <strong>Step 1 — Fill in your six driver-tree numbers</strong> (Part 5) for the last
                90 days.
              </p>
              <p>
                <strong>Step 2 — Look where work piles up or runs dry.</strong> Constraints are
                visible:
              </p>
              <ul>
                <li>
                  Empty calendar, phone silent → <strong>leads</strong> (Job 1).
                </li>
                <li>
                  Plenty of inquiries, few buyers — quotes unanswered, "let me think about it" →{' '}
                  <strong>conversion</strong> (Job 2).
                </li>
                <li>
                  Calendar full, working flat out, little profit → <strong>price or margin</strong>{' '}
                  (busy because underpriced — Part 9) or <strong>waste</strong> (paying for minutes
                  the customer isn't — Skill 2).
                </li>
                <li>
                  Selling fine, but refunds, callbacks, bad reviews → <strong>delivery</strong> (Job
                  3).
                </li>
                <li>
                  Happy customers who buy once and vanish → <strong>retention</strong> (Job 4).
                </li>
                <li>
                  Every number fine, bank account still scared → <strong>cash timing</strong> (Part
                  4's levers) or <strong>fixed costs</strong>.
                </li>
              </ul>
              <p>
                <strong>
                  Step 3 — Put every spare hour and dollar on that one constraint until it's no
                  longer the narrowest point.
                </strong>{' '}
                Then re-run the procedure. The constraint <em>moves</em> when you fix it — that's
                success, not failure.
              </p>
              <div className="guide-callout">
                <p>
                  One override outranks everything:{' '}
                  <strong>runway under two months means cash is the constraint, full stop.</strong>{' '}
                  Don't optimize conversion while drowning. Collect receivables, take deposits, cut
                  costs, survive — then return to the procedure. Survival beats optimization every
                  time they conflict.
                </p>
              </div>
              <p>
                The discipline: improving anything <em>other</em> than the constraint is wasted
                effort, even when the improvement is real. A better logo while leads go unanswered
                is a nicer paint job on a car with no engine.
              </p>
            </section>

            {/* ── PART 7 ── */}
            <section id="part-7">
              <p className="guide-part-label">Part 7</p>
              <h2>The seven skills — how to actually see a business</h2>
              <p>
                Everything so far is knowledge. This part is <em>skill</em> — trained ways of seeing
                that let you walk into any business, including yours, and find what's broken. None
                requires a degree. Each has an exercise you can do this week.
              </p>

              <h3>
                <span>Skill 1</span> — Draw the machine (process mapping, or "SIPOC")
              </h3>
              <p>
                You can't fix a machine you can't draw. <strong>SIPOC</strong> is a borrowed
                manufacturing tool; the name is the five columns you write:{' '}
                <strong>S</strong>uppliers, <strong>I</strong>nputs, <strong>P</strong>rocess,{' '}
                <strong>O</strong>utputs, <strong>C</strong>ustomers.
              </p>
              <ul>
                <li>
                  <strong>Suppliers</strong> — who provides what you need (vendors, ad platform,
                  subcontractors, landlord).
                </li>
                <li>
                  <strong>Inputs</strong> — what they provide (materials, leads, labor, the space).
                </li>
                <li>
                  <strong>Process</strong> — the 5–7 steps that turn a stranger into a paying
                  customer with a solved problem. Not 30 steps. The height at which you'd explain it
                  to a new employee on day one.
                </li>
                <li>
                  <strong>Outputs</strong> — what comes out (solved problem, invoice, review,
                  referral).
                </li>
                <li>
                  <strong>Customers</strong> — who receives each output.
                </li>
              </ul>
              <p>
                <strong>Exercise (15 minutes, one sheet):</strong> Write your process row:{' '}
                <em>
                  stranger hears of us → contacts us → gets a quote → says yes → we deliver → we get
                  paid → we follow up.
                </em>{' '}
                Then for each step, write <strong>who does it</strong> and{' '}
                <strong>what number proves it's working</strong> (step one's number is leads per
                week; the quote step's is conversion rate; and so on).
              </p>
              <p>
                Why it matters: every step is a place the machine can leak, and now each leak has a
                name, an owner, and a gauge. You stop saying "business is slow" — a feeling — and
                start saying "step 3 converts at 15%, down from 30%" — a fact with an address.
              </p>

              <h3>
                <span>Skill 2</span> — Tell value from waste
              </h3>
              <p>
                <strong>Value</strong> is any minute of work or dollar of cost that moves the
                customer's problem closer to solved — something they'd willingly pay for if they saw
                it itemized. <strong>Waste</strong> is every other minute and dollar. The skill is
                seeing the difference in your own day, which is hard, because waste feels like work.
                Being busy is the most virtuous-feeling thing in business.
              </p>
              <p>
                <strong>The test:</strong> imagine your invoice listed everything you actually did.{' '}
                <em>
                  "Crushing your rock to spec: 9 hours. Sitting idle waiting for blasted rock
                  because the pit plan changed: 2 hours. Re-screening a stockpile we crushed to the
                  wrong spec: 3 hours. Second trip to the site because the spare jaw dies were left
                  at the yard: half a day."
                </em>{' '}
                The customer gladly pays for line one. Every other line is waste — cost you carry
                that creates nothing they'd pay for.
              </p>
              <p>
                The classic wastes, in small-business English: <strong>waiting</strong> (the lead
                that sat in your inbox two days and went cold — the most expensive waste in small
                business and the least visible), <strong>rework</strong> (anything done twice
                because it wasn't right once: callbacks, refunds, redos),{' '}
                <strong>extra motion</strong> (bad routing, three trips to the supplier),{' '}
                <strong>over-doing</strong> (polish the customer never asked for and won't notice,
                while underdelivering what they did ask for), <strong>idle stock</strong> (cash
                sleeping on shelves — or iron sleeping in the yard), and{' '}
                <strong>wrong person on the task</strong> (the owner — the most expensive hour in
                the company — doing $15/hour data entry; Part 11 is about this one).
              </p>
              <p>
                Why it matters: cutting cost by "working faster" makes people frantic and quality
                worse. Deleting waste minutes makes the same people produce more value in the same
                hours. When Part 6 says your constraint is margin, this is usually the fix: don't
                hurry — stop paying for minutes nobody would buy.
              </p>

              <h3>
                <span>Skill 3</span> — Napkin math
              </h3>
              <p>
                The ability to compute by hand, in minutes: margin per sale, monthly profit, CAC,
                LTV, runway, and the two driver-tree equations. Sixth-grade arithmetic. The skill
                isn't difficulty — it's the <em>habit</em> of reaching for the napkin before
                reaching for an opinion. "Should I run ads?" isn't a debate; it's CAC versus LTV.
                "Can I afford a hire?" isn't a feeling; it's margin × added sales versus wage.{' '}
                <strong>Exercise:</strong> compute all eight scoreboard numbers (Part 14) this week.
                Any you can't compute, go measure.
              </p>

              <h3>
                <span>Skill 4</span> — Find the constraint
              </h3>
              <p>
                Part 6 in one line: locate the narrowest point, widen only that, repeat. Listed here
                because it belongs in the set you drill. <strong>Exercise:</strong> run Part 6's
                procedure quarterly, on the calendar, like a dentist appointment for the business.
              </p>

              <h3>
                <span>Skill 5</span> — Ask "why" five times
              </h3>
              <p>
                Symptoms are loud; causes are quiet. Refuse to fix the symptom until you've followed
                the chain to the cause — ask why, then ask why about the answer, about five times,
                until you hit something you can permanently change.
              </p>
              <p>
                <em>Customers aren't coming back.</em> Why? Jobs keep running past schedule. Why?
                The crusher breaks down mid-job. Why? Wear parts get changed when they fail, never
                before. Why? There's no maintenance schedule — everything is reactive.{' '}
                <strong>There.</strong> Fix "no maintenance schedule" and the whole chain above it
                heals. Fix the symptom instead — a discount to win the unhappy contractor's next job
                — and you'll pay forever for a problem that's still there.
              </p>

              <h3>
                <span>Skill 6</span> — Change one thing, then measure
              </h3>
              <p>
                The scientific method, kitchen version:{' '}
                <strong>
                  pick the number you're moving → change exactly one thing → wait for real signal →
                  compare → keep it or put it back.
                </strong>{' '}
                Two changes at once teach you nothing — you raised the price <em>and</em> redesigned
                the website, revenue moved, and now you're guessing again, just with more
                confidence. One at a time feels slow and is the fastest route there is, because
                every change produces a <em>fact</em>. A year of this is 20–30 facts about what
                moves your numbers. Your competitors will have a year of vibes.
              </p>

              <h3>
                <span>Skill 7</span> — Write it down (what a "system" literally is)
              </h3>
              <p>
                Every business guide says "build systems." Almost none says what a system physically{' '}
                <em>is</em>, which lets owners nod along for years without building one. The literal
                definition:
              </p>
              <div className="guide-eq">
                <p>A system = a written checklist + a named owner + a number that proves it worked.</p>
              </div>
              <p>
                That's all. Not software, not a binder with a logo. "How we mobilize the crushing
                spread" as nine written steps, owned by the crew lead, proven by{' '}
                <em>crushing within 24 hours of hitting the site.</em> A task that lives only in
                someone's head isn't a system — it's a memory, and it leaves in the parking lot
                every night at 5pm. <strong>Exercise:</strong> take the one task you'd least like to
                re-explain to a new hire and write the checklist <em>while doing it</em> (during,
                not after — after is how steps get forgotten). Your business now contains one
                system. Part 11 shows why this unglamorous skill is the exit door from owning a job.
              </p>
              <p>
                These seven are the toolbox. The next two parts are the most powerful things to
                point them at: what customers value, and what you charge.
              </p>
            </section>

            {/* ── PART 8 ── */}
            <section id="part-8">
              <p className="guide-part-label">Part 8</p>
              <h2>Why people actually buy (the value equation)</h2>
              <p>
                You can't make a good offer without knowing what "value" means to a buyer. People
                think value means cheap. It doesn't. Value is what someone gets versus what it costs
                them to get it — and "cost" is much more than money. Four levers: two to push up,
                two to push down.
              </p>
              <p>
                <strong>1. The dream outcome (up).</strong> Not the product — the result. People
                don't want a mattress; they want to wake up rested. Sell the rested. The bigger and
                more vivid the result you can <em>credibly</em> promise, the more value.
              </p>
              <p>
                <strong>2. Perceived likelihood of success (up).</strong> Do they believe it will
                work <em>for them</em>? Promise the moon, and if they don't believe you, value
                collapses to zero. Guarantees, reviews, before-and-afters, case studies — all exist
                to push this lever. "Will this actually work for me?" is the question every buyer
                silently asks and most sellers never answer.
              </p>
              <p>
                <strong>3. Time delay (down).</strong> Sooner is worth more — much more. The same
                outcome in a week is worth multiples of the same outcome in a year. Even a quick
                early win ("we'll fix the worst room today") raises the value of the whole
                engagement.
              </p>
              <p>
                <strong>4. Effort and sacrifice (down).</strong> How much work, hassle, and risk
                does the customer carry? "Done for you" beats "done with you" beats "do it yourself"
                — and commands a higher price at each step — because you took effort off their side
                of the scale. People pay enormous sums to not have to do something.
              </p>
              <p>
                A big outcome they believe is likely, delivered fast, with little effort on their
                part: maximize the top two, minimize the bottom two, and you can charge a lot,
                because you're worth a lot. Most cheap businesses never tried to move these levers —
                price was the only dial they knew existed. Move the levers and price stops being the
                conversation.
              </p>
              <p>
                (These levers ARE the if-then chain: each one raises what customers will pay or how
                many say yes — moving <em>average sale</em> or <em>conversion rate</em> in Part 5.
                Nothing in this guide floats free of the driver tree.)
              </p>
            </section>

            {/* ── PART 9 ── */}
            <section id="part-9">
              <p className="guide-part-label">Part 9</p>
              <h2>Charge more (yes, more — here's the math and the method)</h2>
              <p>
                Most small business owners undercharge. Not a little — a lot. They price off fear
                ("nobody will pay more") instead of value. Raising price is usually the fastest fix
                for a struggling business, and unlike every other improvement it needs no new skill,
                staff, or spend.
              </p>
              <p>
                <strong>The asymmetry.</strong> Sell at $100 with $40 delivery cost: keep $60. Raise
                30% to $130: cost is still $40, keep $90. Price up 30%; profit per sale up{' '}
                <strong>50%</strong>. Every dollar of a price increase falls straight to the bottom
                line, because cost doesn't move. No other lever in the driver tree does this.
              </p>
              <p>
                <strong>
                  The breakeven formula — so you can stop fearing lost customers.
                </strong>{' '}
                A raise may cost you some. Here's exactly how many you can afford to lose:
              </p>
              <div className="guide-eq">
                <p>Breakeven retention = old margin per sale ÷ new margin per sale</p>
              </div>
              <p>
                Here: $60 ÷ $90 = 67%. Keep two-thirds of your customers and the raise pays for
                itself; keep more and you're ahead — <em>with fewer customers and less work</em>. A
                30% raise that loses 15% of customers: 100 × $60 = $6,000 of margin before; 85 × $90
                = <strong>$7,650</strong> after. More money, fewer headaches. The customers who
                leave over a fair increase are disproportionately your most demanding, lowest-margin
                ones. (Not always — occasionally a price-savvy <em>good</em> one walks, which is why
                you test instead of leap.)
              </p>

              <PriceRaiseCalc />

              <p>
                <strong>How to raise prices without betting the company</strong> — Skill 6, one
                change, measured:
              </p>
              <ol>
                <li>
                  <strong>Set the floor and ceiling.</strong> Floor: cost of delivering plus your
                  share of fixed costs — below it every sale loses money, and no volume fixes that.
                  Ceiling: what the value equation says the <em>result</em> is worth to the
                  customer. Your price lives between them — for most undercharging owners, far
                  closer to the ceiling than they think.
                </li>
                <li>
                  <strong>Quote the new price to new customers only.</strong> Existing customers
                  notice nothing; new quotes are the experiment.
                </li>
                <li>
                  <strong>Watch conversion for 4–6 weeks.</strong> If it barely drops, your old
                  price was a donation. (A useful shock: if <em>nobody ever</em> balks at your
                  price, you are definitively underpriced. A healthy price gets some no's.)
                </li>
                <li>
                  <strong>Then migrate existing customers</strong> with notice, a reason, and
                  grandfathered timing — or keep your best ones at the old price on purpose, as a
                  loyalty decision rather than a fear you obeyed.
                </li>
              </ol>
              <p>
                <strong>Why higher prices compound.</strong> Price is a signal — people partly infer
                quality from it — and higher margin <em>funds</em> better delivery: better
                materials, more time per job, faster response. That makes the higher price honest,
                which makes referrals likelier, which lowers CAC. Cheap traps you in the opposite
                loop: thin margin → can't deliver well → unimpressed customers → no referrals →
                clawing for every cold lead → small and exhausted.
              </p>
              <p>
                <strong>The caveat, said clearly:</strong> raising price without raising value is
                just greed, and it won't hold. Do both. Make it worth more (Part 8), then charge
                what it's worth.
              </p>
              <p>
                <strong>The honest boundary:</strong> a minority of businesses are true{' '}
                <strong>price-takers</strong> — selling a commodity where the market sets the price
                and customers genuinely choose on price alone (raw materials, some retail, gas
                stations). If that's you, "charge more" is spelled differently:{' '}
                <em>change what you sell</em> until it's not a commodity. Bundle service, add speed
                or convenience or a guarantee — move a Part 8 lever — so there's something to charge
                for. Nobody escapes commodity pricing by being a slightly nicer commodity.
              </p>

              <BookCta
                line="Want a second set of eyes on your numbers?"
                sub="A 30-minute Operations Review walks your real P&L through exactly this math — margin, pricing, and where the leaks are."
              />
            </section>

            {/* ── PART 10 ── */}
            <section id="part-10">
              <p className="guide-part-label">Part 10</p>
              <h2>You need fewer customers than you think</h2>
              <p>
                A reframe that calms people down. Most owners imagine they need a flood of
                customers. Usually they need a trickle. Do the arithmetic on your actual life.
              </p>
              <p>
                Want $120,000 a year in profit, with $1,000 of profit per customer? You need 120
                customers a year. Ten a month. <strong>One every three days.</strong> The goal isn't
                "go viral" or "beat the whole market" — it's "find one customer every three days," a
                completely different, completely doable problem.
              </p>
              <p>
                Connect it to Part 9: raise price and margin so each customer is worth $2,000, and
                you need 60 a year. <strong>About one a week.</strong> The business got easier and
                you make the same money.
              </p>
              <p>
                "Charge more" and "fewer customers" are joined at the hip, and they run as a loop:
                higher value per customer → fewer needed → more attention for each → better delivery
                → more referrals → even fewer cold leads to chase. The high-volume, low-price game
                grinds owners into dust; this loop is the refusal to play it.
              </p>
              <p>
                (Reconciling with Part 1's "group big enough": the <em>market</em> must be large
                enough that one customer every three days is easy to find. Your share stays tiny.
                You don't need to win the ocean — you need a reliable fishing spot.)
              </p>
              <p>
                Your number is target profit ÷ profit per customer ÷ 12. It's almost always smaller
                and more human than the panic in your head.
              </p>
            </section>

            {/* ── PART 11 ── */}
            <section id="part-11">
              <p className="guide-part-label">Part 11</p>
              <h2>The owner's real job</h2>
              <p>
                The hardest shift, and the one that separates owning a job from owning a business:
              </p>
              <div className="guide-eq">
                <p>
                  Your job is not to do the work. Your job is to build the machine that does the
                  work.
                </p>
              </div>
              <p>
                At the start, you <em>are</em> the machine — leads, sales, delivery, books. Normal,
                correct, unavoidable. The trap isn't being the machine at the start; it's never
                beginning the climb out. Never climb out and you own a job you can't quit, can't
                sell, and that collapses the day you get sick — because the business <em>is</em>{' '}
                you.
              </p>
              <p>
                The distinction worth tattooing somewhere:{' '}
                <strong>
                  working <em>in</em> the business
                </strong>{' '}
                (doing the trade) versus{' '}
                <strong>
                  working <em>on</em> it
                </strong>{' '}
                (building systems, hiring, improving the offer, fixing the constraint). An hour
                worked <em>in</em> earns once and is gone. An hour worked <em>on</em> compounds —
                the system keeps producing after you've gone home. This is <strong>leverage</strong>
                : more output from the same input. The richest, freest owners aren't the hardest
                workers; they built machines that produce whether or not they touched anything
                today.
              </p>
              <p>
                <strong>The hand-off procedure.</strong> "Just delegate" is the "just find your
                bottleneck" of hiring advice — true and useless. The actual method, one task at a
                time:
              </p>
              <ol>
                <li>
                  <strong>Pick the task</strong> by the wrong-person test (Skill 2): the thing you
                  do regularly that someone could be paid least to do well. Shed $15/hour tasks
                  before $50/hour tasks.
                </li>
                <li>
                  <strong>Write the checklist while doing the task yourself</strong> (Skill 7).
                  During, not after.
                </li>
                <li>
                  <strong>Show them once</strong> — they watch you run it.
                </li>
                <li>
                  <strong>Watch them once</strong> — and wherever they stumble, fix the{' '}
                  <em>checklist</em>, not just the person. A stumble means a step was missing or
                  unclear.
                </li>
                <li>
                  <strong>Hand it off with its number</strong> — the measure that proves it's done
                  right (from your SIPOC map).
                </li>
                <li>
                  <strong>Check the number, not the person.</strong> Spot-check weekly, then
                  monthly. Number's healthy? Stay out of the kitchen.
                </li>
              </ol>
              <p>
                Each pass permanently buys back hours of your week — and your hours are the
                scarcest, most expensive resource in the company. Spend the recovered ones only on
                things that compound: the constraint, the offer, the systems, the key hires.
              </p>
              <p>
                <strong>When can you afford to hire?</strong> Napkin math, not vibes: a hire pays
                for themselves if margin per sale × additional sales they enable exceeds their
                monthly cost — <em>or</em> if they free enough of your hours to generate the same. A
                $4,000/month employee who frees you to close $8,000/month of new margin isn't a
                cost. Staying solo to "save money" is often the most expensive decision an owner
                makes; the bill arrives quietly, as growth that never happened.
              </p>
              <p>
                <strong>The test:</strong> one month of vacation, no phone — does the business
                survive? Every system written and task handed off moves the answer toward yes. "Yes"
                is what makes a business sellable, restable, survivable. (And per Part 12, this is
                the <em>fifth</em> step of building a business, not the first. Pre-profit, you're
                supposed to still be the machine. No guilt. Just don't retire there.)
              </p>
            </section>

            {/* ── PART 12 ── */}
            <section id="part-12">
              <p className="guide-part-label">Part 12</p>
              <h2>The order of operations</h2>
              <p>
                When everything feels broken, people freeze. Here's the order to fix things in. Each
                step assumes the one before it. Skipping ahead doesn't make you fast; it multiplies
                a broken machine.
              </p>
              <p>
                <strong>First — prove people will pay.</strong> Can you get strangers — not friends,
                not "great idea!", strangers — to hand you actual money? If not, no marketing or
                system will save you: you don't have a problem worth solving yet, or you're offering
                it to the wrong group. Fix the offer or the audience.
              </p>
              <p>
                And give this step a deadline, because "still validating" can hide a corpse for
                years. The kill criterion:{' '}
                <strong>
                  if 90 days of real attempts — real offers, real strangers, real price — can't
                  produce a handful of paying customers, stop. Change the offer, the audience, or
                  the idea.
                </strong>{' '}
                Not the logo. Killing a dead idea in 90 days isn't failure; it's the cheapest
                education you'll ever buy.
              </p>
              <p>
                <strong>Second — make one sale profitable.</strong> A single sale that makes money
                after <em>all</em> its real costs, including your time at a real wage. Lose money on
                one and you'll lose more on a hundred. This is the step everyone skips, and why "we
                grew and went broke" is such a common story.
              </p>
              <p>
                <strong>Third — make it repeatable.</strong> Can the profitable sale happen again{' '}
                <em>on purpose</em>? One channel that reliably produces leads, one approach that
                reliably converts. Predictability, not volume: the Part 1 test — name where the next
                ten customers come from, be roughly right.
              </p>
              <p>
                <strong>Fourth — now pour fuel.</strong> Only now: more ad spend, more people, more
                capacity. Scaling before this point multiplies a broken machine; after it, a working
                one. Same action, opposite result. The only difference is the order.
              </p>
              <p>
                <strong>Fifth — build the machine that runs without you</strong> (Part 11). The work
                of years, not weeks.
              </p>
              <p>
                Most stuck businesses are attempting step four without finishing step two. Find
                which step you're actually on. Be honest. Do that step.
              </p>
            </section>

            {/* ── PART 13 ── */}
            <section id="part-13">
              <p className="guide-part-label">Part 13</p>
              <h2>The lies small business owners believe</h2>
              <p>Comforting ideas that quietly keep people broke. Check your own head.</p>
              <p>
                <strong>"If I just work harder, it'll work."</strong> Effort anywhere but the
                constraint produces nothing but exhaustion. Hard work <em>at the bottleneck</em> is
                gold. Everywhere else, it's a hamster wheel with better intentions.
              </p>
              <p>
                <strong>"I can't raise prices — my customers are price sensitive."</strong> Some
                are. Your best ones usually aren't, and you've been letting your cheapest, most
                demanding customers set the price for everyone. Run the breakeven formula before you
                run the fear.
              </p>
              <p>
                <strong>"I don't need marketing; my work speaks for itself."</strong> Your work
                cannot speak. It has no mouth. The best product nobody hears about loses to the
                mediocre product everybody hears about, every time. Attention is a job, not a reward
                good work earns automatically.
              </p>
              <p>
                <strong>"More revenue will fix it."</strong> If each sale loses money, more revenue
                digs faster. Margin first, then volume. Revenue hides profit problems right up until
                it can't.
              </p>
              <p>
                <strong>"I'll hire when I can afford it."</strong> Often backwards. The right hire —
                one who frees your hours or directly adds sales — is <em>how</em> you get to where
                you can afford more. Staying solo to save money can be the most expensive choice you
                make.
              </p>
              <p>
                <strong>"Being busy means it's working."</strong> Busy is not profitable; motion is
                not progress. Run the invoice test: how many of your busy minutes would a customer
                pay for? You can be slammed every day and going broke — that's the most common way
                to go broke.
              </p>
              <p>
                <strong>"We're profitable" (while paying yourself nothing).</strong> If profit only
                exists because the owner works free, the business is losing money and the owner is
                donating the difference. Put your wage in the fixed costs and look at the real
                number. It might hurt. It's still the real number.
              </p>
              <p>
                <strong>"Great month — the business is working."</strong> One month is weather. The
                driver tree run quarterly is climate. Judge the machine, not the month.
              </p>
            </section>

            {/* ── PART 14 ── */}
            <section id="part-14">
              <p className="guide-part-label">Part 14</p>
              <h2>The scoreboard</h2>
              <p>
                You can't run what you don't measure, and you'll drown measuring everything. Eight
                numbers. Weekly. That's the whole discipline — and where each comes from is listed,
                so "I don't have that data" lasts exactly one week:
              </p>
              <ol>
                <li>
                  <strong>Leads per week</strong> — count every hand-raise: calls, forms, DMs,
                  walk-ins. A paper tally works. <em>(Job 1)</em>
                </li>
                <li>
                  <strong>Conversion rate</strong> — leads that became customers ÷ total leads, same
                  tally. <em>(Job 2)</em>
                </li>
                <li>
                  <strong>Average sale size</strong> — revenue ÷ number of sales. <em>(Job 2)</em>
                </li>
                <li>
                  <strong>Gross margin per sale</strong> — price minus cost of delivering, dollars
                  and percent. <em>(Job 3's economics)</em>
                </li>
                <li>
                  <strong>CAC</strong> — attention-and-sales spend ÷ new customers, paid and
                  blended. <em>(Jobs 1–2)</em>
                </li>
                <li>
                  <strong>LTV</strong> — margin per purchase × lifetime purchases. And the ratio:{' '}
                  <strong>LTV ≥ 3× CAC?</strong> <em>(Job 4)</em>
                </li>
                <li>
                  <strong>Monthly profit</strong> — total margin minus all fixed costs,{' '}
                  <em>your wage included.</em>
                </li>
                <li>
                  <strong>Cash runway</strong> — bank balance ÷ monthly fixed costs, in months. The
                  heart monitor.
                </li>
              </ol>
              <p>
                When one goes ugly, it points at exactly one place in the machine. The full
                if-this-then-that:
              </p>
              <div className="guide-table-scroll">
                <table className="guide-table">
                  <thead>
                    <tr>
                      <th>If this number is ugly…</th>
                      <th>…the constraint is</th>
                      <th>First things to try</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Leads per week</td>
                      <td>Attention (Job 1)</td>
                      <td>
                        Pick ONE channel and work it weekly; ask every happy customer for a referral
                        by name; build the owned list (Part 2)
                      </td>
                    </tr>
                    <tr>
                      <td>Conversion rate</td>
                      <td>Sales (Job 2)</td>
                      <td>
                        Answer leads within 15 minutes (waiting kills silently); sharpen the offer
                        to one specific promise; add a guarantee (Part 8, lever 2)
                      </td>
                    </tr>
                    <tr>
                      <td>Average sale size</td>
                      <td>Pricing/offer</td>
                      <td>
                        Raise price with the breakeven formula (Part 9); bundle; add a premium tier
                      </td>
                    </tr>
                    <tr>
                      <td>Gross margin</td>
                      <td>Pricing or waste</td>
                      <td>
                        Raise price; run the invoice test and delete waste minutes (Skill 2);
                        renegotiate supplier costs
                      </td>
                    </tr>
                    <tr>
                      <td>CAC</td>
                      <td>Channel or conversion</td>
                      <td>
                        Fix conversion first — cheaper than buying leads; kill the worst channel,
                        double the best
                      </td>
                    </tr>
                    <tr>
                      <td>LTV</td>
                      <td>Retention/delivery (Jobs 3–4)</td>
                      <td>
                        Five-whys why customers leave (Skill 5); write delivery checklists (Skill
                        7); rebook before leaving; follow up after delivery
                      </td>
                    </tr>
                    <tr>
                      <td>Monthly profit (margin healthy)</td>
                      <td>Fixed costs</td>
                      <td>
                        List every fixed cost; cancel what nobody would miss; grow volume over the
                        same fixed base
                      </td>
                    </tr>
                    <tr>
                      <td>Cash runway (despite profit)</td>
                      <td>Cash timing</td>
                      <td>
                        Deposits up front; invoice same-day; card on file; supplier terms (Part 4)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Eight numbers weekly, plus this table: you always know which job is the bottleneck
                and what to try first. Not bureaucracy — the instrument panel. You wouldn't fly a
                plane without one.
              </p>
            </section>

            {/* ── PART 15 ── */}
            <section id="part-15">
              <p className="guide-part-label">Part 15</p>
              <h2>The whole machine, once, with real numbers</h2>
              <p>
                Meet <strong>Ray</strong>. He runs a mobile rock-crushing service: he hauls a
                crushing spread — jaw crusher, screen plant, excavator, loader — onto a contractor's
                site and turns blasted rock and demolition concrete into road base, at $6.00 a ton.
                Heavy civil. Heavy iron. Heavy fixed costs. Let's run his whole business through
                this guide.
              </p>
              <p>
                <strong>The driver tree (Part 5, Skill 3).</strong> Cost of delivering one ton: fuel
                $1.20, wear parts and maintenance $0.90, operator labor $0.90, mobilization
                amortized $0.60 = <strong>$3.60</strong>. Gross margin:{' '}
                <strong>$2.40 a ton</strong> (40%). The spread crushes about 1,250 tons a day and
                last quarter averaged 16 crushing days a month → 20,000 tons → revenue{' '}
                <strong>$120,000 a month</strong>, gross margin <strong>$48,000</strong>. Fixed
                costs: equipment finance $33,000 (the iron gets paid whether it crushes or sleeps),
                insurance, shop, and office $5,000, and Ray's operator wage $10,000 (in fixed costs,
                where it belongs — Part 4). Total: <strong>$48,000</strong>. Profit: $48,000 −
                $48,000 = <strong>zero</strong>. A $1.4-million-a-year company earning nothing — and
                Ray <em>feels</em> profitable, because his wage masks it. Part 4's honest arithmetic
                just earned its keep.
              </p>
              <p>
                <strong>Acquisition.</strong> About $3,000 a month of business development —
                association dues, site visits, nights spent estimating — brings 10 bid invitations;
                he wins 20%: 2 jobs a month, roughly one from a new contractor. CAC ≈{' '}
                <strong>$3,000</strong>. A contractor historically gives him 3 jobs (~12,500 tons
                each) before drifting away, so LTV = 37,500 tons × $2.40 ={' '}
                <strong>$90,000</strong> of margin. LTV:CAC is 30-to-1, ten times the rule. By the
                ratio, he should buy more attention. Right?
              </p>
              <p>
                <strong>Wrong — run the procedure (Part 6).</strong> Step 2: where does the machine
                leak? The calendar. The spread sits idle 6 days a month between jobs, while fixed
                costs tick at $48,000 ÷ 22 available days ≈ <strong>$2,200 a day</strong>, crushing
                or rusting. More bid invitations wouldn't help — the leak is downstream of leads.
                Five whys (Skill 5): <em>the spread sits idle.</em> Why? The next job isn't lined up
                when the current one ends. Why? Quotes go out a week late. Why? Ray prices every bid
                himself, at night, after running a loader all day. Why? There's no rate sheet —
                every quote is built from scratch.{' '}
                <strong>Bottom found: the constraint is quote turnaround</strong>, wearing a
                utilization costume.
              </p>
              <p>
                <strong>The fix is a system (Skill 7).</strong> A standard rate sheet — tonnage
                bands, material types, mobilization zones — owned by his office manager, proven by a
                number: <em>every bid out within 24 hours.</em> Cost: one weekend. Result, measured
                over a quarter (Skill 6): win rate climbs from 20% to 30% (contractors often take
                the first credible number), the gaps fill, idle days drop from 6 to 2. Four
                reclaimed crushing days × 1,250 tons × $2.40 ={' '}
                <strong>$12,000 a month of new margin</strong> at zero new fixed cost. Profit goes
                from $0 to $12,000 a month. Same iron, same crew. Arithmetic.
              </p>
              <p>
                <strong>The constraint moves — re-run the procedure.</strong> Next leak: contractors
                do 3 jobs and drift. Why? Nobody calls them after demobilization, so their next
                project gets crushed by whoever shows up asking. Fix — another system: a post-job
                report (tonnage, gradation specs, photos) plus a tracked call when each contractor's
                next project breaks ground. Average relationship grows from 3 jobs to 5: LTV rises
                from $90,000 to <strong>$150,000</strong>. A kept contractor costs a phone call; a
                replaced one costs $3,000 and a bid cycle.
              </p>
              <p>
                <strong>Then price (Part 9).</strong> He tests{' '}
                <strong>$6.50 a ton on new bids only</strong>. Margin per ton: $2.40 → $2.90 — up
                21% on an 8% price move (the asymmetry). Breakeven retention: $2.40 ÷ $2.90 = 83%,
                so he can lose 17% of his wins before the raise hurts. Win rate barely moves,
                because he now wins on 24-hour quotes and reliability, not price. Each job is now
                worth 12,500 × $2.90 = <strong>$36,250</strong> of margin.
              </p>
              <p>
                <strong>Then capacity (Part 11).</strong> Backlog stretches to 8 weeks — the
                constraint moves to capacity. Napkin math: a second spread adds ~20,000 tons a month
                × $2.90 ≈ $58,000 of margin against roughly $38,000 of new fixed costs: about{' '}
                <strong>$20,000 a month</strong>. And it pencils <em>only because</em> the rate
                sheet, the follow-up system, and the maintenance schedule already exist. Note the
                order: buying more iron <em>before</em> fixing idle days would have doubled the
                idle-day problem at twice the finance payment — step four before step two, the
                classic grave (Part 12). He staffs it with the six-step hand-off: checklist, show
                once, watch once, hand off with its number, check the number. He's now working{' '}
                <em>on</em> the machine — the vacation test gets closer to "yes" every quarter.
              </p>
              <p>
                Same iron, same rock, same town. The difference between the break-even version and
                the compounding one was never effort — Ray was working nights either way. It was
                seeing the machine: drawing it, reading its eight numbers, finding the one narrowest
                point, fixing that, repeating. Every move was arithmetic before it was action.
              </p>
            </section>

            {/* ── NAPKIN ── */}
            <section id="napkin">
              <p className="guide-part-label">The whole thing on a napkin</p>
              <h2>If you forget everything else, keep this</h2>
              <p>
                A business solves a problem for a group of people, at a profit, repeatably. It runs
                as a loop — get attention, make an offer, deliver the result, get paid more than it
                cost, reinvest in attention — and inside the loop are four jobs: get leads, convert
                them, deliver, keep them. The whole machine is two equations:{' '}
                <strong>Revenue = Leads × Conversion × Average sale × Purchases per year</strong>,
                and <strong>Profit = Revenue × Margin% − Fixed costs (your wage included)</strong>.
                At any moment exactly one point in that machine is the bottleneck; your job is to
                find it with the numbers, widen it, and move to the next — using seven learnable
                skills: draw the machine, tell value from waste, do napkin math, find the
                constraint, ask why five times, change one thing at a time, and write systems down
                as checklist + owner + number. Keep LTV at 3× CAC, keep months of cash in the bank,
                charge more than you're comfortable with by being worth more than you're comfortable
                with, and remember you need fewer customers than you fear. The end goal is a machine
                that runs without you — because that's the difference between owning a business and
                owning a job.
              </p>
              <p>
                That's it. That's the whole thing. It's not complicated. It's just not easy.{' '}
                <strong>Now go find your bottleneck.</strong>
              </p>

              <BookCta
                line="Want help finding yours?"
                sub="Book a free 30-minute Operations Review — we'll run your real numbers through the scoreboard and walk out with your constraint named and a first project to attack it."
              />
            </section>
          </article>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
