'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/cn';

export type AdjacentWedding = {
  slug: string;
  title: string;
};

export function WeddingAdjacentNav({
  prev,
  next,
  onNavigate,
}: {
  prev: AdjacentWedding | null;
  next: AdjacentWedding | null;
  onNavigate: (slug: string) => void;
}) {
  useEffect(() => {
    if (!prev && !next) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft' && prev) {
        onNavigate(prev.slug);
      }

      if (event.key === 'ArrowRight' && next) {
        onNavigate(next.slug);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [prev, next, onNavigate]);

  if (!prev && !next) return null;

  const buttonClass = cn(
    'fixed top-1/2 z-100 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center bg-gold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-gold md:size-11',
  );

  return (
    <>
      {prev ? (
        <button
          type="button"
          onClick={() => onNavigate(prev.slug)}
          aria-label={`Previous wedding: ${prev.title}`}
          className={cn(buttonClass, 'left-4 md:left-8')}
        >
          <ArrowLeftIcon />
        </button>
      ) : null}
      {next ? (
        <button
          type="button"
          onClick={() => onNavigate(next.slug)}
          aria-label={`Next wedding: ${next.title}`}
          className={cn(buttonClass, 'right-4 md:right-8')}
        >
          <ArrowRightIcon />
        </button>
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
