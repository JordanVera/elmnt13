'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { AdjacentProject } from '@/lib/projects';
import { cn } from '@/lib/cn';

export function ProjectAdjacentNav({
  prev,
  next,
  variant,
}: {
  prev: AdjacentProject | null;
  next: AdjacentProject | null;
  variant: 'page' | 'overlay';
}) {
  const router = useRouter();

  useEffect(() => {
    if (!prev && !next) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft' && prev) {
        router.push(`/work/${prev.slug}`);
      }

      if (event.key === 'ArrowRight' && next) {
        router.push(`/work/${next.slug}`);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [prev, next, router]);

  if (!prev && !next) return null;

  const buttonClass = cn(
    'fixed bg-gold text-black top-1/2 z-100 -translate-y-1/2 cursor-pointer px-4 py-3 text-[11px] tracking-[0.28em] uppercase transition-colors',
    variant === 'page'
      ? 'hover:border-gold hover:text-white'
      : 'text-ink hover:border-ink hover:bg-ink hover:text-gold',
  );

  return (
    <>
      {prev ? (
        <Link
          href={`/work/${prev.slug}`}
          aria-label={`Previous project: ${prev.title}`}
          className={cn(buttonClass, 'left-4 md:left-8')}
        >
          Prev
        </Link>
      ) : null}
      {next ? (
        <Link
          href={`/work/${next.slug}`}
          aria-label={`Next project: ${next.title}`}
          className={cn(buttonClass, 'right-4 md:right-8')}
        >
          Next
        </Link>
      ) : null}
    </>
  );
}
