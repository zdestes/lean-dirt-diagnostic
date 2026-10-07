/* A demo-polished picture of a company OS home screen: enough to show the
 * direction (one place, live numbers, the field feeding the office), not a
 * screenshot of a real build. Sample company and numbers, no client data. */

const NAV = [
  { label: 'Home', on: true },
  { label: 'Inbox', badge: '3' },
  { label: 'Jobs' },
  { label: 'Schedule' },
  { label: 'Time cards' },
  { label: 'Daily reports' },
  { label: 'Fleet' },
  { label: 'Money' },
];

const KPIS = [
  { k: 'Active jobs', v: '9', d: '$12.4M signed' },
  { k: 'Margin this week', v: '21%', d: '▲ 3 pts', up: true },
  { k: 'Crew today', v: '36', d: 'on 4 sites' },
];

const WEEKS = [52, 64, 50, 71, 68, 79, 66, 88];

const FEED = [
  { t: 'Daily report in', s: 'Hwy 43 Retail Pad · 1,340 CY moved', tone: 'ok' },
  { t: 'Change order signed', s: 'Oak Ridge · CO-3 · $18,400', tone: 'ok' },
  { t: 'Needs a look', s: 'Mill Creek · 1 time card missing', tone: 'warn' },
];

export default function OsAppMock() {
  return (
    <div className="appmock-wrap" aria-hidden="true">
      <div className="appmock">
        <div className="am-chrome">
          <i /><i /><i />
          <span className="am-url">app.yourco.com</span>
        </div>
        <div className="am-body">
          <aside className="am-side">
            <div className="am-brand"><span className="am-logo">YC</span>YourCo</div>
            {NAV.map((n) => (
              <span key={n.label} className={`am-nav${n.on ? ' on' : ''}`}>
                {n.label}
                {n.badge && <em className="am-badge">{n.badge}</em>}
              </span>
            ))}
          </aside>
          <div className="am-main">
            <div className="am-head">
              <div>
                <div className="am-title">Good morning</div>
                <div className="am-sub">Here&rsquo;s the company, right now.</div>
              </div>
              <span className="am-btn">+ New</span>
            </div>
            <div className="am-kpis">
              {KPIS.map((x) => (
                <div key={x.k} className="am-card am-kpi">
                  <span className="am-k">{x.k}</span>
                  <span className="am-v">{x.v}</span>
                  <span className={x.up ? 'am-d up' : 'am-d'}>{x.d}</span>
                </div>
              ))}
            </div>
            <div className="am-card am-chart">
              <div className="am-chart-head">
                <span className="am-h">Production</span>
                <span className="am-pill">Last 8 weeks</span>
              </div>
              <div className="am-bars">
                {WEEKS.map((h, i) => (
                  <span key={i} className={i === WEEKS.length - 1 ? 'now' : ''} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div className="am-card am-feed">
              {FEED.map((f) => (
                <div key={f.t} className="am-feed-row">
                  <b className={`am-tone ${f.tone}`} />
                  <span className="am-feed-t">{f.t}</span>
                  <span className="am-feed-s">{f.s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="am-phone">
        <div className="am-notch" />
        <div className="am-ph-top">
          <span className="am-logo">YC</span>
          <span className="am-ph-plus">+</span>
        </div>
        <div className="am-ph-body">
          <span className="am-ph-title">Today</span>
          <span className="am-ph-sub">Hwy 43 Retail Pad</span>
          <div className="am-ph-card">
            <b className="am-tone ok" />
            <div>
              <span className="am-ph-strong">Clocked in 6:52</span>
              <span className="am-ph-mute">Crew 2 · 6 people</span>
            </div>
          </div>
          <div className="am-ph-tiles">
            <div><span className="am-ph-mute">Loads</span><span className="am-ph-num">42</span></div>
            <div><span className="am-ph-mute">CY moved</span><span className="am-ph-num">1,340</span></div>
          </div>
          <span className="am-ph-cta">Submit daily report</span>
          <div className="am-ph-note">
            <b className="am-tone ok" />
            <span>Office sees it the minute you hit send</span>
          </div>
        </div>
      </div>
    </div>
  );
}
