import type { Metadata } from 'next';
import { WorkHero } from '@/components/work-hero';
import { workProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Work',
  description: 'A selection of experiences produced by ELMNT13.',
};

export default function WorkPage() {
  return (
    <main className="block w-full">
      <WorkHero items={workProjects} />
    </main>
  );
}
