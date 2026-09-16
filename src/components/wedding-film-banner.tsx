'use client';

import { useEffect, useRef, useState } from 'react';

const VIDEO_SRC = '/weddings/MrandMrsBettsWeddingTeaserwithoutNelly.mp4';

export function WeddingFilmBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !active) return;

    void video.play().catch(() => {});
  }, [active]);

  return (
    <div
      ref={ref}
      className="relative aspect-video min-h-70 w-full overflow-hidden bg-ink text-paper md:aspect-21/9"
    >
      {active ? (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none absolute top-1/2 left-1/2 aspect-video h-[56.25vw] min-h-[180%] w-[177.78vh] min-w-[180%] -translate-x-1/2 -translate-y-1/2 object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/40 to-ink/25" />
      <p className="absolute inset-x-0 bottom-0 z-10 px-6 py-8 font-serif text-3xl text-white italic md:px-12 md:py-12 md:text-5xl">
        Film and stills, composed as one memory.
      </p>
    </div>
  );
}
