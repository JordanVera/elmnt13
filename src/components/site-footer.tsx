import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Reveal } from '@/components/reveal';
import { footerLinks, socialLinks } from '@/lib/site';

function SocialIcon({ label }: { label: string }) {
  const className = 'size-6';

  switch (label) {
    case 'Instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className={className}
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.5"
            r="0.75"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case 'Facebook':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M13.5 22v-8.5h2.8l.4-3.3h-3.2V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3.3h2.8V22h3.2z" />
        </svg>
      );
    case 'TikTok':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M16.6 5.8c1.1 1.2 2.6 2 4.4 2.1v3.2c-1.6 0-3.1-.5-4.4-1.3v6.8c0 4.1-3.3 7.4-7.4 7.4S2.2 20.7 2.2 16.6s3.3-7.4 7.4-7.4c.4 0 .8 0 1.2.1v3.4a4 4 0 0 0-1.2-.2 4.1 4.1 0 1 0 4.1 4.1V2.2h3.1c.2 1.3.8 2.5 1.8 3.6z" />
        </svg>
      );
    case 'YouTube':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C17.8 5 12 5 12 5s-5.8 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 9.2 2 12 2 12s0 2.8.4 4.8a2.5 2.5 0 0 0 1.8 1.8c2 .4 7.8.4 7.8.4s5.8 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-2 .4-4.8.4-4.8s0-2.8-.4-4.8zM10 15.5V8.5l6 3.5-6 3.5z" />
        </svg>
      );
    case 'LinkedIn':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.25 6.5 1.75 1.75 0 0 1 6.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.65 1.65 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h3v1.76a3.28 3.28 0 0 1 3-1.68c1.88 0 3.24 1.18 3.24 3.83V19z" />
        </svg>
      );
    default:
      return null;
  }
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-8 py-12 md:grid-cols-3 md:items-center md:gap-6 md:py-14">
        <Reveal>
          <nav aria-label="Footer">
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm tracking-[0.18em] text-paper uppercase transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        <Reveal delay={80}>
          <div className="flex flex-col items-center text-center">
            <Logo inverted className="[&_img]:h-12 md:[&_img]:h-20" />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="flex justify-start md:justify-end">
            <ul className="flex flex-col items-start gap-4 md:items-end">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="text-paper transition-colors hover:text-gold"
                  >
                    <SocialIcon label={link.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="border-t border-white/10 px-6 py-3.5 text-center text-[11px] tracking-[0.22em] text-stone uppercase">
        <p>© {new Date().getFullYear()} ELMNT13 · Marketing & Management</p>
        <p className="mt-2">
          Site by{' '}
          <a
            href="https://webmarketingsolutionstx.com"
            target="_blank"
            rel="noreferrer"
            className="text-stone transition-colors hover:text-gold"
          >
            Web Marketing Solutions
          </a>
        </p>
      </div>
    </footer>
  );
}
