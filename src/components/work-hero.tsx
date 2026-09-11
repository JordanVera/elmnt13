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

const SPRING = { stiffness: 72, damping: 26, mass: 0.38, restDelta: 0.001 };

const cardEntrance = [
  { x: [-36, -12], y: [72, 8], rotate: [-12, -3.5] },
  { x: [40, 14], y: [58, -10], rotate: [10, 2.5] },
  { x: [-24, 6], y: [68, 6], rotate: [9, -2] },
  { x: [32, 16], y: [84, -12], rotate: [-8, 3.5] },
] as const;

export function WorkHero({ projects }: { projects: Project[] }) {
  const pieces = projects.slice(0, 4);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, SPRING);

  const leftX = useTransform(progress, [0, 0.5], ['0vw', '-18vw']);
  const rightX = useTransform(progress, [0, 0.5], ['0vw', '18vw']);
  const titleOpacity = useTransform(progress, [0, 0.45, 1], [1, 1, 0.42]);

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-white">
      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden px-6">
        <div className="relative flex w-full max-w-6xl flex-col items-center justify-center">
          <h1 className="font-display pointer-events-none flex w-full items-center justify-center gap-[0.18em] text-[16vw] leading-none tracking-tight text-ink uppercase md:text-[11vw]">
            <motion.span
              style={
                reduceMotion
                  ? { x: '-18vw', opacity: 0.42 }
                  : { x: leftX, opacity: titleOpacity }
              }
            >
              Our
            </motion.span>
            <motion.span
              style={
                reduceMotion
                  ? { x: '18vw', opacity: 0.42 }
                  : { x: rightX, opacity: titleOpacity }
              }
            >
              Work
            </motion.span>
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid w-full max-w-5xl grid-cols-2 gap-2 px-1 sm:gap-3 md:grid-cols-4 md:gap-4">
              {pieces.map((project, index) => (
                <WorkPiece
                  key={project.slug}
                  project={project}
                  index={index}
                  entrance={cardEntrance[index] ?? cardEntrance[0]}
                  progress={progress}
                  reduceMotion={Boolean(reduceMotion)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkPiece({
  project,
  index,
  entrance,
  progress,
  reduceMotion,
}: {
  project: Project;
  index: number;
  entrance: (typeof cardEntrance)[number];
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const start = 0.12 + index * 0.06;
  const end = 0.48 + index * 0.05;
  const x = useTransform(progress, [start, end], [...entrance.x]);
  const y = useTransform(progress, [start, end], [...entrance.y]);
  const rotate = useTransform(progress, [start, end], [...entrance.rotate]);
  const opacity = useTransform(progress, [start, start + 0.16], [0, 1]);

  return (
    <motion.div
      className="relative aspect-3/4 overflow-hidden bg-mist will-change-transform"
      style={
        reduceMotion
          ? {
              opacity: 1,
              x: entrance.x[1],
              y: entrance.y[1],
              rotate: entrance.rotate[1],
            }
          : { x, y, rotate, opacity }
      }
    >
      <Link href={`/work/${project.slug}`} className="group absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 46vw, 22vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          preload={index < 2}
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-left md:p-5">
          <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
            {project.service}
          </p>
          <p className="mt-2 font-display text-lg text-white uppercase md:text-xl">
            {project.title}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
