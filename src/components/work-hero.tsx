'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { featuredProjects, projects, type Project } from '@/lib/projects';

const cards = (featuredProjects.length ? featuredProjects : projects).slice(
  0,
  4,
);

const CARD_SPREAD = [
  { x: -24, rotate: -9, y: -18 },
  { x: -8.5, rotate: -3, y: 14 },
  { x: 8.5, rotate: 3, y: -10 },
  { x: 24, rotate: 9, y: 16 },
] as const;

const SPRING = { stiffness: 72, damping: 26, mass: 0.38, restDelta: 0.001 };

export function WorkHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, SPRING);

  const leftX = useTransform(progress, [0, 0.5], ['0vw', '-16vw']);
  const rightX = useTransform(progress, [0, 0.5], ['0vw', '16vw']);
  const titleOpacity = useTransform(progress, [0, 0.45, 1], [1, 1, 0.5]);

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-ink">
      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden px-6">
        <div className="relative flex w-full max-w-6xl items-center justify-center">
          <h1 className="font-display pointer-events-none flex w-full items-center justify-center gap-[0.18em] text-[16vw] leading-none tracking-tight text-paper uppercase md:text-[11vw]">
            <motion.span
              style={
                reduceMotion
                  ? { x: '-16vw', opacity: 0.5 }
                  : { x: leftX, opacity: titleOpacity }
              }
            >
              Our
            </motion.span>
            <motion.span
              style={
                reduceMotion
                  ? { x: '16vw', opacity: 0.5 }
                  : { x: rightX, opacity: titleOpacity }
              }
            >
              Work
            </motion.span>
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            {cards.map((project, index) => (
              <WorkCard
                key={project.slug}
                project={project}
                index={index}
                progress={progress}
                reduceMotion={Boolean(reduceMotion)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkCard({
  project,
  index,
  progress,
  reduceMotion,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const spread = CARD_SPREAD[index];
  const start = 0.1 + index * 0.055;
  const end = 0.62 + index * 0.07;

  const x = useTransform(progress, [start, end], ['0vw', `${spread.x}vw`]);
  const rotate = useTransform(progress, [start, end], [0, spread.rotate]);
  const y = useTransform(progress, [start, end], [56, spread.y]);
  const opacity = useTransform(progress, [start, start + 0.18], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.84, 1]);

  return (
    <motion.div
      className="absolute aspect-3/4 w-[38vw] max-w-56 overflow-hidden bg-ink shadow-[0_24px_60px_rgba(0,0,0,0.45)] ring-1 ring-paper/15 md:w-[22vw] md:max-w-xs"
      style={
        reduceMotion
          ? {
              x: `${spread.x}vw`,
              y: spread.y,
              rotate: spread.rotate,
              opacity: 1,
              zIndex: index,
            }
          : { x, y, rotate, opacity, scale, zIndex: index }
      }
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 38vw, 22vw"
        className="object-cover"
        preload={index < 2}
      />
    </motion.div>
  );
}
