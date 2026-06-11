import Link from 'next/link';
import { BOOKING_URL, IMG } from '@/lib/site';

export default function SiteNav() {
  return (
    <nav className="site-nav">
      <Link href="/" className="site-nav__logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.wordmarkCream} alt="Lean Dirt" />
      </Link>
      <div className="site-nav__links">
        <Link href="/guide" className="site-nav__link">
          Free Guide
        </Link>
        <a href={BOOKING_URL} target="_blank" rel="noopener" className="site-nav__cta">
          <span className="site-nav__cta-full">Book a Free Operations Review</span>
          <span className="site-nav__cta-short">Book a Call</span>
        </a>
      </div>
    </nav>
  );
}
