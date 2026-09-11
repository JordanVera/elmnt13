import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/project-types';
import { cn } from '@/lib/cn';

export function ProjectDetailPanel({
  project,
  variant,
}: {
  project: Project;
  variant: 'page' | 'overlay';
}) {
  const isOverlay = variant === 'overlay';

  return (
    <article className={cn(isOverlay ? 'bg-white text-ink' : 'bg-ink text-paper')}>
      <section
        className={cn(
          'relative overflow-hidden',
          isOverlay ? 'h-[55vh] min-h-80' : 'h-[72vh] min-h-120',
        )}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={!isOverlay}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/40" />
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 px-6',
            isOverlay ? 'pb-6' : 'pb-28',
          )}
        >
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] tracking-[0.32em] text-gold uppercase">
              {project.service}
            </p>
            <h1
              className={cn(
                'mt-3 font-display tracking-tight text-white uppercase',
                isOverlay ? 'text-4xl md:text-6xl' : 'text-5xl md:text-7xl',
              )}
            >
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      <section className={cn('px-6', isOverlay ? 'py-10 md:py-14' : 'py-14')}>
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_1.4fr] md:gap-12">
          {project.client ? (
            <div>
              <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
                Client
              </p>
              <p className="mt-2 text-lg">{project.client}</p>
            </div>
          ) : null}
          {project.description ? (
            <p className="max-w-xl text-lg leading-8 text-stone">
              {project.description}
            </p>
          ) : null}
        </div>

        {project.gallery.length > 0 ? (
          <div className="mx-auto mt-16 grid max-w-6xl gap-3 md:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((src) => (
              <div key={src} className="relative aspect-4/5 overflow-hidden">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes={isOverlay ? '50vw' : '33vw'}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}

        {isOverlay ? null : (
          <div className="mx-auto mt-16 max-w-6xl">
            <Link
              href="/work"
              className="text-[11px] tracking-[0.32em] text-gold uppercase"
            >
              Back to work
            </Link>
          </div>
        )}
      </section>
    </article>
  );
}
