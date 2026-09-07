'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GoldLink } from '@/components/gold-link';
import { featuredProjects, projects } from '@/lib/projects';

const slides = featuredProjects.length
  ? featuredProjects
  : projects.slice(0, 4);

export function WorkCarousel() {
  return (
    <section className="bg-paper py-28 md:py-36">
      <div className="mx-auto flex max-w-6xl items-end justify-between px-6">
        <div>
          <p className="text-[11px] tracking-[0.36em] text-gold uppercase">
            Work
          </p>
          <h2 className="mt-4 font-display text-5xl tracking-tight uppercase md:text-7xl">
            Curated
            <br />
            Experiences
          </h2>
        </div>
        <div className="hidden md:block">
          <GoldLink href="/work">View all</GoldLink>
        </div>
      </div>

      <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4">
        {slides.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group relative aspect-4/5 w-[78vw] shrink-0 snap-center overflow-hidden sm:w-[48vw] lg:w-[28vw]"
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
              <p className="mt-2 font-display text-2xl text-paper uppercase">
                {project.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 px-6 md:hidden">
        <GoldLink href="/work">View all</GoldLink>
      </div>
    </section>
  );
}
