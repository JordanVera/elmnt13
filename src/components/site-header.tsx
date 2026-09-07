'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/site';
import { cn } from '@/lib/cn';

const links = [{ href: '/', label: 'Home' }, ...navLinks] as const;

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-90 flex justify-center px-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
    >
      <ul className="pointer-events-auto flex w-full max-w-[calc(100vw-1.5rem)] items-center justify-between gap-2 rounded-2xl  bg-black/65 px-4 py-3  backdrop-blur-xl backdrop-saturate-150 sm:w-auto sm:justify-center sm:gap-7 sm:px-8 sm:py-3.5">
        {links.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'font-display text-[9px] tracking-[0.12em] uppercase transition-colors sm:text-[10px] sm:tracking-wideset font-bold',
                  active ? 'text-gold' : 'text-white hover:text-gold',
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
