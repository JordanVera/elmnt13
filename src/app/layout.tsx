import './globals.css';
import localFont from 'next/font/local';
import { Bebas_Neue, Playfair_Display } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { SiteShell } from '@/components/site-shell';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-playfair',
});

const centuryGothic = localFont({
  src: [
    {
      path: './fonts/centurygothic.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/centurygothic_bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-century-gothic',
});

export const metadata: Metadata = {
  title: {
    default: 'ELMNT13 — We See the Vision. We Handle the Details.',
    template: '%s — ELMNT13',
  },
  description:
    'ELMNT13 is a creative marketing and management company. Experiential marketing, event management, and weddings — since 2012.',
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${playfair.variable} ${centuryGothic.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <div className="grain" aria-hidden="true" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
