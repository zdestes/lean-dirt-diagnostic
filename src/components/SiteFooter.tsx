import { BOOKING_URL, IMG } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span className="site-footer__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.wordmarkCream} alt="Lean Dirt" />
        </span>
        <span className="site-footer__copy">
          © {new Date().getFullYear()} Lean Dirt. Operational Excellence for Contractors. ·{' '}
          <a href={BOOKING_URL} target="_blank" rel="noopener">Book a Free Operations Review</a>
        </span>
      </div>
    </footer>
  );
}
