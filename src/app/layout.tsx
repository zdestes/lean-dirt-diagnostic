import type { Metadata } from 'next';
import { Bebas_Neue, Barlow, Barlow_Condensed } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const barlow = Barlow({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow-cond',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://leandirt.com'),
  title: 'Lean Dirt | Get Your Business Out of Your Head and Into a Playbook',
  description:
    'You got here on gut. The next level runs on a playbook. Operating systems and the skill to run them, built exclusively for $5M to $30M horizontal contractors. Book a free 30-minute Operations Review.',
  openGraph: {
    title: 'Lean Dirt | Get Your Business Out of Your Head and Into a Playbook',
    description:
      'You got here on gut. The next level runs on a playbook. Operating systems and the skill to run them, built exclusively for $5M to $30M horizontal contractors. Book a free 30-minute Operations Review.',
    siteName: 'Lean Dirt',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
