import type { Metadata } from 'next';
import { ContactCta } from '@/components/contact-cta';
import { ProjectGrid } from '@/components/project-grid';
import { WorkHero } from '@/components/work-hero';
import { getFeaturedProjects, getWorkProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Work',
  description: 'A selection of experiences produced by ELMNT13.',
};

export default async function WorkPage() {
  const [workProjects, featuredProjects] = await Promise.all([
    getWorkProjects(),
    getFeaturedProjects(),
  ]);
  const heroProjects = (
    featuredProjects.length ? featuredProjects : workProjects
  ).slice(0, 4);

  return (
    <main className="bg-white">
      <WorkHero projects={heroProjects} />
      <section className="bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <ProjectGrid items={workProjects} />
        </div>
      </section>
      <ContactCta />
    </main>
  );
}
