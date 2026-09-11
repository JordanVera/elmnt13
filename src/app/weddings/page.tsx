import type { Metadata } from 'next';
import { ChampagneToast } from '@/components/champagne-toast';
import { ContactCta } from '@/components/contact-cta';
import { DetailsMoment } from '@/components/details-moment';
import { WeddingWorkSection } from '@/components/wedding-work-section';
import { WeddingLoveStory } from '@/components/wedding-love-story';
import { WeddingServicesSection } from '@/components/wedding-services-section';

export const metadata: Metadata = {
  title: 'Weddings',
  description:
    'ELMNT13 Weddings — with you for the moments that matter, from yes to I do.',
};

export default function WeddingsPage() {
  return (
    <main>
      <ChampagneToast />
      <WeddingServicesSection />
      <WeddingLoveStory />
      <DetailsMoment tone="paper" />
      <WeddingWorkSection />
      <ContactCta phrase="weddings" href="/contact" id="contact" />
    </main>
  );
}
