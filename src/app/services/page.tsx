import type { Metadata } from 'next';
import { ContactCta } from '@/components/contact-cta';
import { ServicesExplorer } from '@/components/services-explorer';
import { Reveal } from '@/components/reveal';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Experiential marketing and event management — from first concept to last light.',
};

export default function ServicesPage() {
  return (
    <main className="bg-ink">
      <ServicesExplorer />

      <Reveal>
        <section className="bg-ink px-6 py-20 text-ink md:py-12">
          <p className="text-white flex flex-col items-center justify-center text-center text-xl leading-[0.8] tracking-tight md:text-5xl lg:text-7xl">
            <span className=" font-sans text-[0.5em] leading-none tracking-tighter uppercase">
              {/* Let&apos;s Take Your */}
              Ready to take your
            </span>
            <span className="flex items-baseline justify-center gap-x-2 md:gap-x-3">
              <span className="font-bebas font-black uppercase">Vision</span>
              <span className="font-serif normal-case text-gold">further?</span>
            </span>
          </p>

          <h2 className="font-sans text-white mt-4 text-center text-5xl uppercase md:text-5xl">
            Get in{' '}
            <Link
              href="/contact"
              aria-label="Get in contact — open the inquiry form"
              className="font-bebas font-black tracking-normal text-gold normal-case underline decoration-1 decoration-gold/50 underline-offset-[0.18em] transition-colors hover:text-gold-bright hover:decoration-gold"
            >
              contact
            </Link>
          </h2>
        </section>
      </Reveal>
      {/* <ContactCta /> */}
    </main>
  );
}
