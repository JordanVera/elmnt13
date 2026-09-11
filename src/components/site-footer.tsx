import Link from 'next/link';
import { Logo } from '@/components/logo';
import { footerLinks, site, socialLinks } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 md:grid-cols-4 md:py-16">
        <div className="space-y-6">
          <Logo inverted />
          {/* <Logo variant="weddings" href="/weddings" inverted /> */}
        </div>

        <div>
          <p className="text-[11px] font-bebas font-bold  text-gold uppercase">
            Menu
          </p>
          <ul className="mt-4 space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-paper/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-bebas font-bold  text-gold uppercase">
            Social
          </p>
          <ul className="mt-4 space-y-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-paper/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:text-right">
          <p className="font-serif text-2xl italic text-gold">
            Vision, then details.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block text-sm tracking-wide text-paper/80 hover:text-gold"
          >
            {site.email}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-[11px] tracking-[0.22em] text-paper/40 uppercase">
        <p>© {new Date().getFullYear()} ELMNT13 · Marketing & Management</p>
        <p className="mt-2">
          Site by{' '}
          <a
            href="https://webmarketingsolutionstx.com"
            target="_blank"
            rel="noreferrer"
            className="text-paper/55 transition-colors hover:text-gold"
          >
            Web Marketing Solutions
          </a>
        </p>
      </div>
    </footer>
  );
}
