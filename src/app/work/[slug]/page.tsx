import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectAdjacentNav } from '@/components/project-adjacent-nav';
import { ProjectCloseLink } from '@/components/project-close-link';
import { ProjectDetailPanel } from '@/components/project-detail-panel';
import { getAdjacentWorkProjects, getProject } from '@/lib/projects';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: 'Work' };
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, adjacent] = await Promise.all([
    getProject(slug),
    getAdjacentWorkProjects(slug),
  ]);
  if (!project) notFound();

  return (
    <main className="bg-ink text-paper">
      <ProjectCloseLink />
      <ProjectAdjacentNav
        prev={adjacent.prev}
        next={adjacent.next}
        variant="page"
      />
      <ProjectDetailPanel project={project} variant="page" />
    </main>
  );
}
