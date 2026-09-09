import type { Metadata } from 'next';
import { ServicesExplorer } from '@/components/services-explorer';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Experiential marketing and event management — from first concept to last light.',
};

export default function ServicesPage() {
  return (
    <main className="bg-ink">
      <ServicesExplorer />
    </main>
  );
}
