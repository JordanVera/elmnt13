import type { Metadata } from 'next';
import { Reveal } from '@/components/reveal';
import { WhyChoose } from '@/components/why-choose';
import { BrandsSection } from '@/components/brands-section';
import { DetailsMoment } from '@/components/details-moment';
import { AboutStats } from '@/components/about-stats';
import { ContactCta } from '@/components/contact-cta';

export const metadata: Metadata = {
  title: 'About',
  description:
    'ELMNT13 is a creative marketing and management company where vision drives the work and the details shape the outcome. Since 2012.',
};

export default function AboutPage() {
  return (
    <main>
      <section className="bg-white px-6 pt-20 pb-20 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[15px] tracking-[0.36em] text-gold uppercase">
              About
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight uppercase md:text-7xl">
              Vision drives the work.
              <span className="text-gold mt-3 block font-serif text-4xl tracking-normal normal-case italic md:text-6xl">
                Details shape the outcome.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={120} className="mt-12 md:ml-auto md:max-w-xl ">
            <div className="flex md:items-center">
              <div
                className="hidden md:block h-44 w-px shrink-0 bg-gold rounded mr-10"
                aria-hidden="true"
              ></div>
              <p className="text-lg leading-8 text-black">
                ELMNT13 is a creative marketing and management company known for
                transforming ideas into thoughtfully developed concepts and
                elevated brand experiences. We pair creative thinking with a
                discerning eye for detail, maximizing the opportunity to
                strengthen brands, elevate their presence and create lasting
                impact.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <WhyChoose />
      <BrandsSection />
      <DetailsMoment tone="paper" layout="tagline" compact />
      <AboutStats />
      <ContactCta />
    </main>
  );
}
