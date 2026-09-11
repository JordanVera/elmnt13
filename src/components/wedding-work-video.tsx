'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';

const VIDEO_ID = 'Mf7s-b8-KS4';
const POSTER = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
const EMBED_SRC = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&loop=1&playlist=${VIDEO_ID}&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&start=6`;

export function WeddingWorkVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden bg-ink', className)}
    >
      <Image
        src={POSTER}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover"
      />
      {active ? (
        <iframe
          src={EMBED_SRC}
          title="Cinematic wedding film"
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          className="pointer-events-none absolute top-1/2 left-1/2 aspect-video h-[56.25vw] min-h-[180%] w-[177.78vh] min-w-[180%] -translate-x-1/2 -translate-y-1/2 border-0"
        />
      ) : null}
    </div>
  );
}
