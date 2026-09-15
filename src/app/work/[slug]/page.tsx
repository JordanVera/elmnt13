import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectCloseLink } from '@/components/project-close-link';
import { ProjectDetailPanel } from '@/components/project-detail-panel';
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
      <ProjectCloseLink />
      <ProjectDetailPanel project={project} variant="page" />
    </main>
  );
}
