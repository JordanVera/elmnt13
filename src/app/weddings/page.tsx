import type { Metadata } from 'next';
import { ChampagneToast } from '@/components/champagne-toast';
import { ContactCta } from '@/components/contact-cta';
import { WeddingLoveStory } from '@/components/wedding-love-story';
import { WeddingServicesSection } from '@/components/wedding-services-section';
import { WeddingWorkSection } from '@/components/wedding-work-section';
import { Reveal } from '@/components/reveal';
import { weddingInquiryUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Weddings',
  description:
    'ELMNT13 Weddings — with you for the moments that matter, from yes to I do.',
};

export default function WeddingsPage() {
  return (
    <main>
      <ChampagneToast />
      <div className="mx-auto bg-white px-6">
        <Reveal>
          <div className="mx-auto flex max-w-6xl md:items-center">
            <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-7 text-black/70! md:mt-12 md:text-lg md:leading-8">
              May your story be filled with moments worth celebrating, from the
              beginning of a new chapter to the forever you’re building
              together. Wherever you are in your story, we’re here to make what
              happens next unforgettable.{' '}
              <span className="font-serif text-gold">
                From when you say “yes” to when you say “I do”
              </span>
              , we consider every element with intention, creating memories that
              feel beautifully and distinctly yours.
            </p>
          </div>
        </Reveal>
      </div>
      <WeddingServicesSection />
      <WeddingLoveStory />

      <WeddingWorkSection />

      <ContactCta phrase="weddings" href={weddingInquiryUrl} />
    </main>
  );
}
