'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import type { Project } from '@/lib/projects';

const SPRING = { stiffness: 100, damping: 30, restDelta: 0.001 };
const CARD_HEIGHT = '48vh'; // Smaller, more elegant cards

export function WorkHero({ items }: { items: Project[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [scrollHeight, setScrollHeight] = useState(3000);
  const [maxScroll, setMaxScroll] = useState(1000);

  const introPieces = useMemo(() => {
    const featured = items.filter((project) => project.featured);
    return (featured.length ? featured : items).slice(0, 4);
  }, [items]);

  const slides = useMemo(() => {
    return items;
  }, [items]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, SPRING);

  // Calculate dimensions
  useEffect(() => {
    if (reduceMotion) return;

    const updateDimensions = () => {
      const track = trackRef.current;
      if (!track) return;

      const vh = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Animation phases - smooth continuous motion
      const titleDistance = vh * 0.08; // Very quick title split
      const cardPopDistance = vh * 0.2; // Cards pop in quickly
      const carouselWidth = track.scrollWidth - viewportWidth;
      const carouselDistance = carouselWidth * 0.6; // Comfortable scroll speed

      const totalHeight =
        vh + titleDistance + cardPopDistance + Math.max(carouselDistance, vh);
      setScrollHeight(totalHeight);
      setMaxScroll(Math.max(0, carouselWidth));
    };

    const timeoutId = setTimeout(updateDimensions, 100);

    const observer = new ResizeObserver(updateDimensions);
    const track = trackRef.current;

    if (track) observer.observe(track);
    window.addEventListener('resize', updateDimensions);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [reduceMotion, slides.length]);

  // Animation breakpoints - smooth continuous motion
  const titleEnd = 0.05; // Title splits very quickly
  const cardsStart = 0.08; // Cards start appearing
  const cardsVisible = 0.18; // All 4 intro cards visible
  const carouselStart = 0.2; // Carousel motion begins smoothly

  // Title animation
  const leftX = useTransform(smoothProgress, [0, titleEnd], ['0vw', '-18vw']);
  const rightX = useTransform(smoothProgress, [0, titleEnd], ['0vw', '18vw']);
  const titleOpacity = useTransform(
    smoothProgress,
    [0, titleEnd, carouselStart, 1],
    [1, 1, 0.25, 0.1],
  );

  // Carousel moves continuously - no separate intro/carousel phases
  const carouselProgress = useTransform(
    smoothProgress,
    [carouselStart, 1],
    [0, 1],
  );

  const carouselX = useTransform(
    carouselProgress,
    [0, 1],
    [0, -maxScroll * 0.6],
  );

  // UI elements
  const hintOpacity = useTransform(smoothProgress, [0, titleEnd], [0.8, 0]);
  const counterOpacity = useTransform(
    smoothProgress,
    [cardsStart, cardsVisible],
    [0, 1],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = carouselProgress.on('change', (p) => {
      const normalized = Math.max(0, Math.min(1, p));
      const index = Math.round(normalized * (slides.length - 1));
      setActiveIndex(index);
    });
    return unsubscribe;
  }, [carouselProgress, slides.length]);

  if (reduceMotion) {
    return (
      <section className="relative min-h-dvh bg-ink">
        <div className="flex min-h-dvh items-center justify-center px-6">
          <div className="w-full max-w-6xl">
            <h1 className="font-display mb-12 text-center text-[16vw] leading-none tracking-tight text-paper uppercase md:text-[11vw]">
              Our Work
            </h1>
            <div className="no-scrollbar flex gap-3 overflow-x-auto pb-8 snap-x snap-mandatory md:gap-4">
              {slides.map((project, index) => {
                const hash = project.slug
                  .split('')
                  .reduce((acc, char) => acc + char.charCodeAt(0), 0);
                const rotation = ((hash % 30) - 15) / 5;
                return (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    className="group relative aspect-3/4 shrink-0 overflow-hidden bg-mist snap-center"
                    style={{
                      height: CARD_HEIGHT,
                      width: 'auto',
                      transform: `rotate(${rotation}deg)`,
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="70vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/12 to-transparent opacity-90" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-left md:p-5">
                      <p className="text-[10px] tracking-[0.28em] text-gold uppercase">
                        {project.service}
                      </p>
                      <p className="mt-1.5 font-display text-base text-paper uppercase md:text-lg">
                        {project.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-ink"
      style={{ height: `${scrollHeight}px` }}
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        {/* Progress bar */}
        <motion.div
          className="absolute top-0 left-0 z-50 h-px w-full origin-left bg-gold"
          style={{ scaleX: smoothProgress }}
        />

        {/* Main content */}
        <div className="relative flex h-full w-full items-center justify-center">
          {/* Animated title */}
          <h1 className="font-display pointer-events-none absolute z-10 flex w-full max-w-6xl items-center justify-center gap-[0.18em] px-6 text-[16vw] leading-none tracking-tight text-paper uppercase md:text-[11vw]">
            <motion.span style={{ x: leftX, opacity: titleOpacity }}>
              Our
            </motion.span>
            <motion.span style={{ x: rightX, opacity: titleOpacity }}>
              Work
            </motion.span>
          </h1>

          {/* Continuous carousel - cards pop in, then slide */}
          <div className="absolute inset-0 z-20 flex items-center overflow-hidden">
            <motion.div
              ref={trackRef}
              className="flex w-max gap-3 px-6 will-change-transform md:gap-4 lg:gap-5 lg:px-10"
              style={{ x: carouselX }}
            >
              {slides.map((project, index) => (
                <WorkCard
                  key={project.slug}
                  project={project}
                  index={index}
                  progress={smoothProgress}
                  cardsStart={cardsStart}
                  cardsVisible={cardsVisible}
                  preload={index < 4}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.p
          className="pointer-events-none absolute bottom-8 left-1/2 z-40 -translate-x-1/2 text-[11px] tracking-[0.36em] text-gold uppercase"
          style={{ opacity: hintOpacity }}
        >
          Scroll
        </motion.p>

        {/* Counter */}
        <motion.p
          className="pointer-events-none absolute right-6 bottom-8 z-40 text-[11px] tracking-[0.28em] text-paper/45 uppercase md:right-10"
          style={{ opacity: counterOpacity }}
        >
          {String(activeIndex + 1).padStart(2, '0')} /{' '}
          {String(slides.length).padStart(2, '0')}
        </motion.p>
      </div>
    </section>
  );
}

function WorkCard({
  project,
  index,
  progress,
  cardsStart,
  cardsVisible,
  preload,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  cardsStart: number;
  cardsVisible: number;
  preload: boolean;
}) {
  // Cards pop in sequentially
  const popStart = cardsStart + (cardsVisible - cardsStart) * (index * 0.12);
  const popDuration = 0.025;

  // Pop effect with scale
  const scale = useTransform(
    progress,
    [popStart, popStart + popDuration],
    [0.6, 1],
  );
  const opacity = useTransform(
    progress,
    [popStart, popStart + popDuration / 2],
    [0, 1],
  );

  // Consistent rotation based on project slug for dynamic look
  const rotation = useMemo(() => {
    const hash = project.slug
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((hash % 30) - 15) / 5; // -3 to 3 degrees
  }, [project.slug]);

  return (
    <motion.div
      className="relative aspect-3/4 shrink-0 overflow-hidden bg-mist"
      style={{
        scale,
        opacity,
        rotate: rotation,
        height: CARD_HEIGHT,
        width: 'auto',
      }}
    >
      <Link href={`/work/${project.slug}`} className="group absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 70vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={preload}
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/12 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-left md:p-5">
          <p className="text-[10px] tracking-[0.28em] text-gold uppercase">
            {project.service}
          </p>
          <p className="mt-1.5 font-display text-base text-paper uppercase md:text-lg">
            {project.title}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
