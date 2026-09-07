'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const VIDEO_ID = 'Mf7s-b8-KS4';
const POSTER = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
const EMBED_SRC = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&loop=1&playlist=${VIDEO_ID}&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&start=6`;

export function WeddingFilmBanner() {
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
      className="relative aspect-video min-h-70 overflow-hidden bg-ink text-paper md:aspect-21/9"
    >
      <Image src={POSTER} alt="" fill sizes="100vw" className="object-cover " />
      {active ? (
        <iframe
          src={EMBED_SRC}
          title="Cinematic wedding film background"
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          className=" pointer-events-none absolute top-1/2 left-1/2 aspect-video h-[56.25vw] min-h-[180%] w-[177.78vh] min-w-[180%] -translate-x-1/2 -translate-y-1/2 border-0"
        />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/40 to-ink/25" />
      <p className="absolute inset-x-0 bottom-0 z-10 px-6 py-8 font-serif text-3xl italic md:px-12 md:py-12 md:text-5xl">
        Film and stills, composed as one memory.
      </p>
    </div>
  );
}
