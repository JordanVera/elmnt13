'use client';

import { memo, useEffect, useMemo, useRef, useState } from 'react';
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

// svh rather than vh so collapsing mobile browser chrome never resizes the track.
// The mobile size keeps the track short enough to scroll through in one sitting.
const CARD_CLASS =
  'relative aspect-3/4 h-[36svh] w-auto shrink-0 overflow-hidden bg-mist md:h-[48svh]';
const CARD_ASPECT = 3 / 4;
const MOBILE_CARD_VH = 0.36;
const DESKTOP_CARD_VH = 0.48;

// Must match the `md:` breakpoint the card height switches on.
const MOBILE_BREAKPOINT = 768;

// Cards that pop into the parted title before the track starts sliding.
const INTRO_CARDS = 4;
// Upper bound on cards that can be on screen during the intro, and so need a reveal.
const REVEAL_CARDS = 16;

// Card travel in px per px of page scroll, once the intro is complete.
const SLIDE_SPEED = { mobile: 0.7, desktop: 1.15 };

const SPRING = {
  mobile: { stiffness: 130, damping: 26, mass: 0.6, restDelta: 0.0005 },
  desktop: { stiffness: 90, damping: 28, mass: 0.9, restDelta: 0.0005 },
};

type Metrics = {
  isMobile: boolean;
  scrollHeight: number;
  travel: number;
  introOffset: number;
  step: number;
  cardWidth: number;
  padLeft: number;
  viewportWidth: number;
  /** Scroll progress breakpoints, derived from pixel distances. */
  cardsStart: number;
  titleEnd: number;
  carouselStart: number;
  cardsEnd: number;
};

const INITIAL_METRICS: Metrics = {
  isMobile: false,
  scrollHeight: 3000,
  travel: 0,
  introOffset: 0,
  step: 1,
  cardWidth: 0,
  padLeft: 0,
  viewportWidth: 1,
  cardsStart: 0.04,
  titleEnd: 0.08,
  carouselStart: 0.18,
  cardsEnd: 0.22,
};

function rotationFor(slug: string) {
  const hash = slug
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return ((hash % 30) - 15) / 5; // -3 to 3 degrees
}

export function WorkHero({ items }: { items: Project[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [metrics, setMetrics] = useState<Metrics>(INITIAL_METRICS);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = items;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(
    scrollYProgress,
    metrics.isMobile ? SPRING.mobile : SPRING.desktop,
  );

  const viewportRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (reduceMotion) return;

    const measure = (): Metrics | null => {
      const track = trackRef.current;
      if (!track) return null;

      const viewportWidth = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = viewportWidth < MOBILE_BREAKPOINT;

      const styles = getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap) || 0;
      const padLeft = Number.parseFloat(styles.paddingLeft) || 0;
      const firstCard = track.firstElementChild as HTMLElement | null;
      const cardWidth =
        firstCard?.offsetWidth ||
        vh * (isMobile ? MOBILE_CARD_VH : DESKTOP_CARD_VH) * CARD_ASPECT;
      const step = cardWidth + gap;
      const travel = Math.max(0, track.scrollWidth - viewportWidth);

      // Centre as many of the opening cards as the viewport can actually hold,
      // so they land in the gap the title opens up.
      const fits = Math.max(
        1,
        Math.floor((viewportWidth - padLeft * 2 + gap) / step),
      );
      const clusterWidth = Math.min(INTRO_CARDS, fits) * step - gap;
      const introOffset = Math.max(
        0,
        (viewportWidth - clusterWidth) / 2 - padLeft,
      );

      const titleDistance = vh * (isMobile ? 0.45 : 0.38);
      const popDistance = vh * (isMobile ? 0.8 : 0.66);
      const slideDistance =
        (travel + introOffset) /
        (isMobile ? SLIDE_SPEED.mobile : SLIDE_SPEED.desktop);
      const total = Math.max(vh, titleDistance + popDistance + slideDistance);

      return {
        isMobile,
        scrollHeight: vh + total,
        travel,
        introOffset,
        step,
        cardWidth,
        padLeft,
        viewportWidth,
        cardsStart: (titleDistance * 0.5) / total,
        titleEnd: titleDistance / total,
        carouselStart: (titleDistance + popDistance * 0.7) / total,
        cardsEnd: (titleDistance + popDistance) / total,
      };
    };

    let frameId = 0;

    const update = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const last = viewportRef.current;
      // Mobile browser chrome hides and shows mid-scroll, which reports as a
      // resize. Re-measuring there would jump the track under the finger.
      if (
        width < MOBILE_BREAKPOINT &&
        last.width === width &&
        Math.abs(last.height - height) < 160
      ) {
        return;
      }
      viewportRef.current = { width, height };

      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const next = measure();
        if (next) setMetrics(next);
      });
    };

    const observer = new ResizeObserver(update);
    const track = trackRef.current;
    if (track) observer.observe(track);
    window.addEventListener('resize', update);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [reduceMotion, slides.length]);

  const { cardsStart, titleEnd, carouselStart, cardsEnd, introOffset, travel } =
    metrics;

  const leftX = useTransform(smoothProgress, [0, titleEnd], ['0vw', '-18vw']);
  const rightX = useTransform(smoothProgress, [0, titleEnd], ['0vw', '18vw']);
  const titleOpacity = useTransform(
    smoothProgress,
    [0, carouselStart, cardsEnd],
    [1, 1, 0.1],
  );

  // One continuous slide: parked while the cards pop, then linear to the end.
  const carouselX = useTransform(
    smoothProgress,
    [0, carouselStart, 1],
    [introOffset, introOffset, -travel],
  );

  const hintOpacity = useTransform(smoothProgress, [0, cardsStart], [0.85, 0]);
  const counterOpacity = useTransform(
    smoothProgress,
    [cardsStart, cardsEnd],
    [0, 1],
  );

  useEffect(() => {
    const { step, cardWidth, padLeft, viewportWidth } = metrics;
    if (step <= 0) return;

    const readActive = (x: number) => {
      const centreOfTrack = viewportWidth / 2 - x - padLeft;
      const index = Math.round((centreOfTrack - cardWidth / 2) / step);
      setActiveIndex(Math.max(0, Math.min(slides.length - 1, index)));
    };

    readActive(carouselX.get());
    return carouselX.on('change', readActive);
  }, [carouselX, metrics, slides.length]);

  if (reduceMotion) {
    return (
      <section className="relative min-h-dvh bg-ink">
        <div className="flex min-h-dvh items-center justify-center px-6">
          <div className="w-full max-w-6xl">
            <h1 className="font-display mb-12 text-center text-[16vw] leading-none tracking-tight text-paper uppercase md:text-[11vw]">
              Our Work
            </h1>
            <div className="no-scrollbar flex gap-3 overflow-x-auto pb-8 snap-x snap-mandatory md:gap-4">
              {slides.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className={`group snap-center ${CARD_CLASS}`}
                  style={{
                    transform: `rotate(${rotationFor(project.slug)}deg)`,
                  }}
                >
                  <CardFace project={project} priority={index < 2} />
                </Link>
              ))}
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
      style={{ height: `${metrics.scrollHeight}px` }}
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* Progress bar */}
        <motion.div
          className="absolute top-0 left-0 z-50 h-px w-full origin-left bg-gold"
          style={{ scaleX: smoothProgress }}
        />

        <div className="relative flex h-full w-full items-center justify-center">
          {/* Title parts to make room for the opening cards */}
          <h1 className="font-display pointer-events-none absolute z-10 flex w-full max-w-6xl items-center justify-center gap-[0.18em] px-6 text-[16vw] leading-none tracking-tight text-paper uppercase md:text-[11vw]">
            <motion.span style={{ x: leftX, opacity: titleOpacity }}>
              Our
            </motion.span>
            <motion.span style={{ x: rightX, opacity: titleOpacity }}>
              Work
            </motion.span>
          </h1>

          <div className="absolute inset-0 z-20 flex items-center overflow-hidden">
            <motion.div
              ref={trackRef}
              className="flex w-max gap-3 px-6 will-change-transform md:gap-4 lg:gap-5 lg:px-10"
              style={{ x: carouselX }}
            >
              {slides.map((project, index) => {
                if (index < INTRO_CARDS) {
                  return (
                    <PopCard
                      key={project.slug}
                      project={project}
                      index={index}
                      progress={smoothProgress}
                      cardsStart={cardsStart}
                      cardsEnd={cardsEnd}
                    />
                  );
                }

                if (index < REVEAL_CARDS) {
                  return (
                    <RevealCard
                      key={project.slug}
                      project={project}
                      progress={smoothProgress}
                      cardsStart={cardsStart}
                      cardsEnd={cardsEnd}
                    />
                  );
                }

                return <StaticCard key={project.slug} project={project} />;
              })}
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

const PopCard = memo(function PopCard({
  project,
  index,
  progress,
  cardsStart,
  cardsEnd,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  cardsStart: number;
  cardsEnd: number;
}) {
  // Overlapping slots so the four cards read as one rising cascade.
  const slot = (cardsEnd - cardsStart) / INTRO_CARDS;
  const popStart = cardsStart + slot * index * 0.8;
  const popEnd = popStart + slot * 1.4;

  const scale = useTransform(progress, [popStart, popEnd], [0.86, 1]);
  const y = useTransform(progress, [popStart, popEnd], [40, 0]);
  const opacity = useTransform(
    progress,
    [popStart, popStart + (popEnd - popStart) * 0.45],
    [0, 1],
  );

  const rotate = useMemo(() => rotationFor(project.slug), [project.slug]);

  return (
    <motion.div className={CARD_CLASS} style={{ scale, y, opacity, rotate }}>
      <Link href={`/work/${project.slug}`} className="group absolute inset-0">
        <CardFace project={project} priority />
      </Link>
    </motion.div>
  );
});

const RevealCard = memo(function RevealCard({
  project,
  progress,
  cardsStart,
  cardsEnd,
}: {
  project: Project;
  progress: MotionValue<number>;
  cardsStart: number;
  cardsEnd: number;
}) {
  // Fades in behind the cascade so nothing peeks in at the edge beforehand.
  const slot = (cardsEnd - cardsStart) / INTRO_CARDS;
  const opacity = useTransform(
    progress,
    [cardsStart + slot * 2.4, cardsEnd],
    [0, 1],
  );

  const rotate = useMemo(() => rotationFor(project.slug), [project.slug]);

  return (
    <motion.div className={CARD_CLASS} style={{ opacity, rotate }}>
      <Link href={`/work/${project.slug}`} className="group absolute inset-0">
        <CardFace project={project} priority={false} />
      </Link>
    </motion.div>
  );
});

const StaticCard = memo(function StaticCard({ project }: { project: Project }) {
  return (
    <div
      className={CARD_CLASS}
      style={{ transform: `rotate(${rotationFor(project.slug)}deg)` }}
    >
      <Link href={`/work/${project.slug}`} className="group absolute inset-0">
        <CardFace project={project} priority={false} />
      </Link>
    </div>
  );
});

function CardFace({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  return (
    <>
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 60vw, 26vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority={priority}
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
    </>
  );
}
