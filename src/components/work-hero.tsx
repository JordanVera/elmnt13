"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { featuredProjects, projects } from "@/lib/projects";

const cards = (featuredProjects.length ? featuredProjects : projects).slice(0, 4);

export function WorkHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total ? passed / total : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const split = Math.min(progress / 0.55, 1);
  const card = Math.max((progress - 0.15) / 0.7, 0);

  return (
    <section ref={ref} className="relative h-[220vh] bg-ink">
      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden px-6">
        <div className="relative flex w-full max-w-6xl items-center justify-center">
          <h1 className="font-display pointer-events-none flex w-full items-center justify-between text-[18vw] leading-none tracking-tight text-paper uppercase md:text-[12vw]">
            <span
              style={{ transform: `translateX(${-split * 8}vw)` }}
              className="transition-transform duration-100"
            >
              Our
            </span>
            <span
              style={{ transform: `translateX(${split * 8}vw)` }}
              className="transition-transform duration-100"
            >
              Work
            </span>
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            {cards.map((project, index) => {
              const offset = (index - 1.5) * 18;
              const rotate = (index - 1.5) * 6;
              const y = (1 - Math.min(card, 1)) * 40 + (index % 2 === 0 ? -8 : 12);
              return (
                <div
                  key={project.slug}
                  className="absolute aspect-3/4 w-[38vw] max-w-56 overflow-hidden shadow-2xl md:w-[22vw] md:max-w-xs"
                  style={{
                    transform: `translateX(${offset * card}vw) translateY(${y}px) rotate(${rotate * card}deg)`,
                    opacity: 0.2 + card * 0.8,
                    zIndex: index,
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="22vw"
                    className="object-cover"
                    priority={index < 2}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
