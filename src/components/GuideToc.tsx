'use client';

import { useEffect, useState } from 'react';

export type TocItem = { id: string; label: string };

/**
 * Reading progress bar + scrollspy table of contents for the guide.
 */
export default function GuideToc({ items }: { items: TocItem[] }) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);

      // scrollspy: last section whose top has passed the viewport's upper third
      let current = items[0]?.id ?? '';
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.34) {
          current = item.id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  return (
    <>
      <div className="guide-progress" aria-hidden="true">
        <div className="guide-progress__bar" style={{ width: `${progress}%` }} />
      </div>
      <nav className="guide-toc" aria-label="Guide chapters">
        <p className="guide-toc__title">Contents</p>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={active === item.id ? 'is-active' : ''}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
