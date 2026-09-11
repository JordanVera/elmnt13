import type { Metadata } from 'next';
import { ChampagneToast } from '@/components/champagne-toast';
import { ContactCta } from '@/components/contact-cta';
import { DetailsMoment } from '@/components/details-moment';
import { Reveal } from '@/components/reveal';
import { WeddingGallery } from '@/components/wedding-gallery';
import { weddingServices } from '@/lib/weddings';

export const metadata: Metadata = {
  title: 'Weddings',
  description:
    'ELMNT13 Weddings — with you for the moments that matter, from yes to I do.',
};

export default function WeddingsPage() {
  return (
    <main>
      <ChampagneToast />

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.36em] text-gold uppercase text-center">
            With you for the moments that matter
          </p>
          <h2 className="mt-4 font-serif text-4xl italic md:text-6xl text-center">
            from yes to I do
          </h2>
          <div className="mt-14 space-y-14">
            {weddingServices.map((service, index) => (
              <Reveal key={service.title} delay={index * 40}>
                <article className="grid gap-8 border-t border-ink/10 pt-10 md:grid-cols-[0.9fr_1.4fr]">
                  <div>
                    <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
                      {service.kicker}
                    </p>
                    <h3 className="mt-3 font-display text-3xl tracking-tight uppercase md:text-4xl">
                      {service.title}
                    </h3>
                  </div>
                  <div>
                    <p className="max-w-xl text-lg leading-8 text-stone">
                      {service.description}
                    </p>
                    <p className="mt-6 text-sm tracking-[0.16em] text-stone uppercase">
                      {service.details.join(' · ')}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mt-6 font-serif text-4xl tracking-tight capitalize md:text-6xl">
            Allow us to be a part of your love story
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-2xl leading-9 text-black">
            We love love, and we’d be honored to be part of yours. We understand
            that being trusted with your wedding means being trusted with one of
            the most meaningful moments of your life. Your vision matters to us,
            which is why we consider every detail and curate every moment with
            the care and intention it deserves.
          </p>
        </div>
      </section>

      <DetailsMoment tone="paper" />
      <WeddingGallery />
      <ContactCta
        kicker="Contact"
        title="Let’s get started on your forever"
        href="/contact"
        label="Now"
      />
    </main>
  );
}
