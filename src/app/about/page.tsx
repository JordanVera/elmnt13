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
          <p className="text-[15px] tracking-[0.36em] text-gold uppercase">
            About
          </p>
          <Reveal>
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
                className="hidden md:block h-32 w-px shrink-0 bg-gold rounded mr-10"
                aria-hidden="true"
              ></div>
              <p className="text-lg leading-8 text-black">
                ELMNT13 is a creative marketing and management company where
                vision drives the work and the details shape the outcome. Since
                2012, we’ve partnered with brands, organizations and individuals
                to bring ideas to life through strategy, creativity and
                management. We see the full vision, understand how every brand
                element matters and handle the creative direction and execution
                needed to create a memorable experience.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <BrandsSection />
      <WhyChoose />
      <DetailsMoment tone="paper" layout="tagline" compact />
      <AboutStats />
      <ContactCta barOnly />
    </main>
  );
}
