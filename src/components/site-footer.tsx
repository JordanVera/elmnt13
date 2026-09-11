import Link from 'next/link';
import { Logo } from '@/components/logo';
import { footerLinks, site, socialLinks } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 md:grid-cols-[1fr_auto_1.25fr] md:py-16">
        <div className="space-y-6">
          <Logo inverted className="[&_img]:h-12 md:[&_img]:h-14" />
          {/* <Logo variant="weddings" href="/weddings" inverted /> */}
        </div>

        <div className="flex gap-10 md:gap-12">
          <div>
            <p className="text-[11px] font-bebas font-bold  text-gold uppercase">
              Menu
            </p>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone transition-colors hover:text-gold"
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
                    className="text-sm text-stone transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:text-right">
          <h2 className="flex w-full flex-col items-start text-5xl leading-[0.8] tracking-tight text-paper uppercase md:items-end md:text-5xl">
            <span className=" font-sans text-[0.5em] mr-14 leading-none tracking-tighter uppercase">
              Taking your
            </span>
            <span className="font-bebas font-bold mr-12">Vision</span>
            <span className=" font-serif normal-case text-gold">further</span>
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block text-sm tracking-wide text-stone hover:text-gold"
          >
            {site.email}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-[11px] tracking-[0.22em] text-stone uppercase">
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
