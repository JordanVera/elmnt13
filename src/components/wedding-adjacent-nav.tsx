'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/cn';
import {
  WeddingArrowLeftIcon,
  WeddingArrowRightIcon,
  weddingNavArrowButtonClass,
  weddingNavArrowPosition,
} from '@/components/wedding-nav-arrows';

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
    weddingNavArrowButtonClass,
    'fixed top-1/2 z-100 -translate-y-1/2',
  );

  return (
    <>
      {prev ? (
        <button
          type="button"
          onClick={() => onNavigate(prev.slug)}
          aria-label={`Previous wedding: ${prev.title}`}
          className={cn(buttonClass, weddingNavArrowPosition.prev)}
        >
          <WeddingArrowLeftIcon />
        </button>
      ) : null}
      {next ? (
        <button
          type="button"
          onClick={() => onNavigate(next.slug)}
          aria-label={`Next wedding: ${next.title}`}
          className={cn(buttonClass, weddingNavArrowPosition.next)}
        >
          <WeddingArrowRightIcon />
        </button>
      ) : null}
    </>
  );
}
