import type { Metadata, Viewport } from 'next';
import { Archivo, Cormorant_Garamond, Outfit } from 'next/font/google';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
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
      className={`${outfit.variable} ${archivo.variable} ${cormorant.variable} h-full antialiased`}
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
