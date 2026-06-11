import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://leandirt.com'),
  title: 'Lean Dirt — Add 2–5 Net Margin Points in 12 Months',
  description:
    'Operational excellence coaching built exclusively for $5M–$30M horizontal contractors. Book a free 30-minute Operations Review.',
  openGraph: {
    title: 'Lean Dirt — Add 2–5 Net Margin Points in 12 Months',
    description:
      'Operational excellence coaching built exclusively for $5M–$30M horizontal contractors. Book a free 30-minute Operations Review.',
    siteName: 'Lean Dirt',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
