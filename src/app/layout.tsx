import './globals.css';
import { Inter, Lora } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

const inter = Inter({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
});

const lora = Lora({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-lora',
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
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <div className="grain" aria-hidden="true" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div id="main" className="flex min-h-full flex-col">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
