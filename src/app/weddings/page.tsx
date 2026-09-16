import type { Metadata } from 'next';
import { ChampagneToast } from '@/components/champagne-toast';
import { ContactCta } from '@/components/contact-cta';
import { DetailsMoment } from '@/components/details-moment';
import { KnotMarker, TieTheKnot } from '@/components/tie-the-knot';
import { WeddingGallery } from '@/components/wedding-gallery';
import { WeddingLoveStory } from '@/components/wedding-love-story';
import { WeddingServicesSection } from '@/components/wedding-services-section';
import { WeddingWorkSection } from '@/components/wedding-work-section';

export const metadata: Metadata = {
  title: 'Weddings',
  description:
    'ELMNT13 Weddings — with you for the moments that matter, from yes to I do.',
};

export default function WeddingsPage() {
  return (
    <main>
      {/* <TieTheKnot> */}
      <ChampagneToast />
      <WeddingServicesSection />
      <WeddingLoveStory />
      <DetailsMoment tone="paper" />
      <WeddingWorkSection />
      {/* <WeddingGallery /> */}
      {/* <KnotMarker kind="bow" side="center" word="forever" /> */}
      <ContactCta phrase="weddings" href="/contact" id="contact" />
      {/* </TieTheKnot> */}
    </main>
  );
}
