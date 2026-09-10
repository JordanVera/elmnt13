'use client';

import { usePathname } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith('/studio')) {
    return children;
  }

  return (
    <>
      <SiteHeader />
      <div id="main" className="flex min-h-full flex-col">
        {children}
      </div>
      <SiteFooter />
    </>
  );
}
