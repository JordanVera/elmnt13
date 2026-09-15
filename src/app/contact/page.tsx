import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { Reveal } from '@/components/reveal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Have a Vision? Let’s take it further.',
};

export default function ContactPage() {
  return (
    <main className="bg-paper">
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-20 md:grid-cols-2 md:pt-24 md:pb-24">
        <Reveal>
          <div>
            <p className="text-[15px] tracking-[0.36em] text-gold uppercase">
              Contact
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight uppercase md:text-7xl">
              Have a Vision?
              <span className="mt-3 block font-serif text-4xl tracking-normal normal-case text-gold italic md:text-6xl">
                Let’s take it further.
              </span>
            </h1>
            <div
              className="mt-8 h-px w-16 bg-gold md:mt-10"
              aria-hidden="true"
            />
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block text-base tracking-[0.14em] text-ink transition-colors hover:text-gold md:mt-8 md:text-lg"
            >
              {site.email}
            </a>
          </div>
        </Reveal>
        <div className="mt-10">
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
