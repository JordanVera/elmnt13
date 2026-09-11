'use client';

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

const EASE_LUXE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const ENTRANCE_DURATION = 1.12;

export function SlideLine({
  children,
  from,
  delay,
  skip,
  active,
  className,
}: {
  children: ReactNode;
  from: 'left' | 'right';
  delay: number;
  skip: boolean;
  active: boolean;
  className?: string;
}) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const [enterX, setEnterX] = useState<number | null>(() => (skip ? 0 : null));
  const ready = skip || enterX !== null;

  useLayoutEffect(() => {
    if (skip) return;

    const measure = () => {
      const el = lineRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      setEnterX(
        from === 'right'
          ? window.innerWidth - rect.left
          : -(rect.left + rect.width),
      );
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [from, skip]);

  return (
    <span className={cn('block overflow-hidden', !ready && 'invisible')}>
      <motion.span
        key={ready ? 'ready' : 'pending'}
        ref={!ready ? lineRef : undefined}
        className={cn('block', className)}
        initial={skip || enterX === null ? false : { x: enterX }}
        animate={
          skip || active
            ? { x: 0 }
            : enterX !== null
              ? { x: enterX }
              : undefined
        }
        transition={{
          duration: skip ? 0 : ENTRANCE_DURATION,
          delay: skip ? 0 : active ? delay : 0,
          ease: EASE_LUXE,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
