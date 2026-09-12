'use client';

import { useRef } from 'react';
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
import type { Project } from '@/lib/project-types';

const CARD_SPREAD = [
  { x: -24, rotate: -9, y: -18 },
  { x: -8.5, rotate: -3, y: 14 },
  { x: 8.5, rotate: 3, y: -10 },
  { x: 24, rotate: 9, y: 16 },
] as const;

const CARD_Z = ['z-0', 'z-[1]', 'z-[2]', 'z-[3]'] as const;

const SPRING = { stiffness: 72, damping: 26, mass: 0.38, restDelta: 0.001 };

export function WorkHero({ projects }: { projects: Project[] }) {
  const cards = projects.slice(0, 4);
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
    <section ref={sectionRef} className="relative h-[150vh] bg-white">
      <div className="sticky top-0 z-20 h-[75vh] overflow-hidden bg-white px-6 pt-[5vh]">
        <div className="relative mx-auto flex h-[48vh] w-full max-w-6xl items-center justify-center">
          <h1 className="font-display pointer-events-none flex w-full items-center justify-center gap-[0.18em] text-[16vw] leading-none tracking-tight text-ink uppercase md:text-[11vw]">
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
  const y = useTransform(progress, [start, end], [40, spread.y]);
  const opacity = useTransform(progress, [start, start + 0.18], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.84, 1]);

  return (
    <motion.div
      className={`absolute ${CARD_Z[index]} aspect-3/4 w-[38vw] max-w-56 overflow-hidden bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] ring-1 ring-ink/10 hover:z-20 md:w-[22vw] md:max-w-xs`}
      style={
        reduceMotion
          ? {
              x: `${spread.x}vw`,
              y: spread.y,
              rotate: spread.rotate,
              opacity: 1,
            }
          : { x, y, rotate, opacity, scale }
      }
    >
      <Link href={`/work/${project.slug}`} className="group absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 38vw, 22vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          preload={index < 2}
        />
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/50" />
        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
            {project.service}
          </p>
          <p className="mt-2 font-display text-2xl text-paper uppercase">
            {project.title}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
