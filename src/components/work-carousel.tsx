'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GoldLink } from '@/components/gold-link';
import { Reveal } from '@/components/reveal';
import type { Project } from '@/lib/project-types';

export function WorkCarousel({ projects }: { projects: Project[] }) {
  const slides = projects;
  return (
    <section className="bg-white pt-12 pb-16 md:pt-16 md:pb-20">
      <div className="mx-auto flex max-w-6xl items-end justify-between px-6">
        <Reveal>
          <div>
            <p className="text-[15px] tracking-[0.36em] text-gold uppercase">
              Work
            </p>
            <h2 className="mt-3 font-display text-6xl tracking-tight uppercase md:text-8xl">
              Curated
              <br />
              Experiences
            </h2>
          </div>
        </Reveal>
        <Reveal delay={80} className="hidden md:block">
          <GoldLink href="/work" className="text-[15px]">
            View all
          </GoldLink>
        </Reveal>
      </div>

      <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4">
        {slides.map((project, index) => (
          <Reveal key={project.slug} delay={index * 70} className="shrink-0">
            <Link
              href={`/work/${project.slug}`}
              className="group relative block aspect-4/5 w-[78vw] snap-center overflow-hidden sm:w-[48vw] lg:w-[28vw]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 78vw, 28vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/45" />
              <div className="absolute inset-x-0 bottom-0 translate-y-4 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
                  {project.service}
                </p>
                <p className="mt-2 font-display text-2xl text-white uppercase">
                  {project.title}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 px-6 md:hidden">
        <GoldLink href="/work">View all</GoldLink>
      </Reveal>
    </section>
  );
}
