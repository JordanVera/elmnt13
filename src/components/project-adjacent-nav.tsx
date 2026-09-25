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
    'fixed top-1/2 z-100 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center bg-gold text-black transition-colors md:size-11',
    variant === 'page'
      ? 'hover:bg-gold/85 hover:text-white'
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
          <ArrowLeftIcon />
        </Link>
      ) : null}
      {next ? (
        <Link
          href={`/work/${next.slug}`}
          aria-label={`Next project: ${next.title}`}
          className={cn(buttonClass, 'right-4 md:right-8')}
        >
          <ArrowRightIcon />
        </Link>
      ) : null}
    </>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M10 3.5L5.5 8 10 12.5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M6 3.5L10.5 8 6 12.5" />
    </svg>
  );
}
