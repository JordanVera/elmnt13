import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Have an idea? Let’s make it happen.',
};

export default function ContactPage() {
  return (
    <main className="bg-paper">
      <section className="mx-auto grid max-w-6xl gap-16 px-6 pt-24 pb-28 md:grid-cols-2 md:pt-32 md:pb-36">
        <div>
          <p className="text-[11px] tracking-[0.36em] text-gold uppercase">
            Contact
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight uppercase md:text-7xl">
            Have an idea?
            <span className="mt-3 block font-serif text-4xl tracking-normal normal-case italic md:text-6xl">
              Let’s make it happen.
            </span>
          </h1>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
