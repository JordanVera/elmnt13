import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectGrid({ items }: { items: Project[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((project) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className="group relative aspect-4/5 overflow-hidden bg-mist"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
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
      ))}
    </div>
  );
}
