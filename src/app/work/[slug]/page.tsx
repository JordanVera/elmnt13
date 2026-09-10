import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, getProjectSlugs } from '@/lib/projects';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: 'Work' };
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <main className="bg-ink text-paper">
      <section className="relative h-[72vh] min-h-[480px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] tracking-[0.32em] text-gold uppercase">
              {project.service} · {project.year}
            </p>
            <h1 className="mt-3 font-display text-5xl tracking-tight text-white uppercase md:text-7xl">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
              Client
            </p>
            <p className="mt-2 text-lg">{project.client}</p>
          </div>
          <p className="max-w-xl text-lg leading-8 text-paper/75">
            {project.description}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-3 md:grid-cols-2 lg:grid-cols-3">
          {project.gallery.map((src) => (
            <div key={src} className="relative aspect-4/5 overflow-hidden">
              <Image
                src={src}
                alt=""
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <Link
            href="/work"
            className="text-[11px] tracking-[0.32em] text-gold uppercase"
          >
            Back to work
          </Link>
        </div>
      </section>
    </main>
  );
}
