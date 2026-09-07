import type { Metadata } from 'next';
import { ContactCta } from '@/components/contact-cta';
import { ServicesApproach } from '@/components/services-approach';
import { ServicesExplorer } from '@/components/services-explorer';
import { ServicesIntro } from '@/components/services-hero';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Experiential marketing and event management — from first concept to last light.',
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesIntro />
      <ServicesExplorer />
      <ServicesApproach />
      <ContactCta
        kicker="Let’s connect"
        title="Make things happen."
        href="/contact"
        label="Inquire"
      />
    </main>
  );
}
