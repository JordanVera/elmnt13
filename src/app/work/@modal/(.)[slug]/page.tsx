import { notFound } from 'next/navigation';
import { ProjectDetailPanel } from '@/components/project-detail-panel';
import { ProjectModal } from '@/components/project-modal';
import { getProject } from '@/lib/projects';

export default async function InterceptedProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <ProjectModal title={project.title}>
      <ProjectDetailPanel project={project} variant="overlay" />
    </ProjectModal>
  );
}
