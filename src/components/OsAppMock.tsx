/* A static, cleaned-up picture of what a real company OS home screen looks
 * like: sidebar, top bar, "the company, right now" KPIs, a production chart
 * and the time-card roll-up. Sample company and numbers, no client data. */

const NAV: { group?: string; items: { label: string; on?: boolean; badge?: string }[] }[] = [
  { items: [{ label: 'Home', on: true }, { label: 'Inbox', badge: '3' }, { label: 'Tasks' }, { label: 'Schedule' }] },
  { group: 'Field', items: [{ label: 'Time cards' }, { label: 'Daily reports' }, { label: 'Fleet' }] },
  { group: 'Sales', items: [{ label: 'Opportunities' }, { label: 'Estimates' }] },
  { group: 'Jobs', items: [{ label: 'Jobs' }, { label: 'Budgets' }] },
  { group: 'Money', items: [{ label: 'Cash flow' }] },
];

const KPIS = [
  { k: 'Active jobs', v: '9', s: '$12.4M signed' },
  { k: 'Backlog', v: '$4.2M', s: '31 phases left' },
  { k: 'Equipment', v: '28/30', s: '2 in the shop' },
  { k: 'Crew today', v: '36', s: '4 sites' },
];

const WEEKS = [62, 74, 58, 81, 77, 88, 70, 92];

const CARDS = [
  { no: 'J-214', job: 'Hwy 43 Retail Pad', labor: '96.5h', qty: '1,340 CY', ok: true },
  { no: 'J-209', job: 'Oak Ridge Sewer', labor: '72.0h', qty: '420 LF', ok: true },
  { no: 'J-217', job: 'Mill Creek Grading', labor: '58.5h', qty: '2,110 CY', ok: false },
];

export default function OsAppMock() {
  return (
    <div className="appmock" aria-hidden="true">
      <div className="am-chrome">
        <i /><i /><i />
        <span className="am-url">app.yourco.com</span>
      </div>
      <div className="am-body">
        <aside className="am-side">
          <div className="am-brand"><span className="am-logo">YC</span><span>YourCo</span></div>
          {NAV.map((g, gi) => (
            <div key={gi} className="am-group">
              {g.group && <span className="am-group-label">{g.group}</span>}
              {g.items.map((it) => (
                <span key={it.label} className={`am-nav${it.on ? ' on' : ''}`}>
                  <b className="am-dot" />
                  {it.label}
                  {it.badge && <em className="am-badge">{it.badge}</em>}
                </span>
              ))}
            </div>
          ))}
        </aside>
        <div className="am-main">
          <div className="am-top">
            <span className="am-search">Search<kbd>⌘K</kbd></span>
            <span className="am-btn dark">+ New task</span>
            <span className="am-btn">+ Touchpoint</span>
          </div>
          <div className="am-content">
            <div className="am-title">The company, right now</div>
            <div className="am-sub">Wednesday · every number opens the record behind it</div>
            <div className="am-kpis">
              {KPIS.map((x) => (
                <div key={x.k} className="am-card am-kpi">
                  <span className="am-k">{x.k}</span>
                  <span className="am-v">{x.v}</span>
                  <span className="am-s">{x.s}</span>
                </div>
              ))}
            </div>
            <div className="am-card am-prod">
              <div className="am-row">
                <span className="am-h">Production &amp; cost</span>
                <span className="am-seg"><span>Day</span><span className="on">Week</span><span>Month</span></span>
              </div>
              <div className="am-prod-body">
                <div className="am-mini">
                  <div><span className="am-k">Labor hours</span><span className="am-v sm">512h</span><span className="am-up">▲ 8%</span></div>
                  <div><span className="am-k">Earned</span><span className="am-v sm">$148K</span><span className="am-up">▲ 12%</span></div>
                  <div><span className="am-k">Margin</span><span className="am-v sm">21%</span><span className="am-up">▲ 3 pts</span></div>
                </div>
                <div className="am-bars">
                  {WEEKS.map((h, i) => (
                    <span key={i} className={i === WEEKS.length - 1 ? 'now' : ''} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="am-card am-tc">
              <div className="am-row">
                <span className="am-h">Time cards · yesterday</span>
                <span className="am-link">All cards →</span>
              </div>
              <div className="am-tr am-th"><span>Job</span><span>Labor</span><span>Qty</span><span /></div>
              {CARDS.map((c) => (
                <div key={c.no} className="am-tr">
                  <span><em>{c.no}</em> {c.job}</span>
                  <span>{c.labor}</span>
                  <span>{c.qty}</span>
                  <span className={c.ok ? 'am-ok' : 'am-warn'}>{c.ok ? '✓ Confirmed' : '1 missing'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
