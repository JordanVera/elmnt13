import { notFound } from 'next/navigation';
import { ProjectAdjacentNav } from '@/components/project-adjacent-nav';
import { ProjectDetailPanel } from '@/components/project-detail-panel';
import { ProjectModal } from '@/components/project-modal';
import { getAdjacentWorkProjects, getProject } from '@/lib/projects';

export const dynamic = 'force-dynamic';

export default async function InterceptedProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, adjacent] = await Promise.all([
    getProject(slug),
    getAdjacentWorkProjects(slug),
  ]);
  if (!project) notFound();

  return (
    <ProjectModal title={project.title}>
      <ProjectAdjacentNav
        prev={adjacent.prev}
        next={adjacent.next}
        variant="overlay"
      />
      <ProjectDetailPanel project={project} variant="overlay" />
    </ProjectModal>
  );
}
