import Link from 'next/link';
import { GoldLink } from '@/components/gold-link';
import { Reveal } from '@/components/reveal';

function ContactBar({ href }: { href: string }) {
  return (
    <h2 className="text-right font-display text-5xl tracking-tight uppercase md:text-6xl">
      <span className="font-bebas">Get in </span>{' '}
      <Link
        href={href}
        aria-label="Get in contact — open the inquiry form"
        className="font-serif font-normal tracking-normal text-gold italic normal-case underline decoration-1 decoration-gold/50 underline-offset-[0.18em] transition-colors hover:text-gold-bright hover:decoration-gold"
      >
        contact
      </Link>
    </h2>
  );
}

function CreativePhrase({ variant }: { variant: 'home' | 'weddings' }) {
  if (variant === 'weddings') {
    return (
      <p className="flex flex-col items-center justify-center text-center text-6xl leading-[0.85] tracking-tight md:text-7xl lg:text-8xl">
        <span className="font-sans text-[0.42em] leading-none tracking-tighter uppercase">
          Let&apos;s get started{' '}
        </span>
        <span className="mt-1 flex items-baseline justify-center gap-x-2 md:gap-x-3">
          <span className="font-display uppercase"> on your</span>
          <span className="font-serif normal-case text-gold italic">
            forever
          </span>
        </span>
      </p>
    );
  }

  return (
    <p className="flex flex-col items-center justify-center text-center text-xl leading-[0.8] tracking-tight md:text-5xl lg:text-7xl">
      <span className=" font-sans text-[0.5em] leading-none tracking-tighter uppercase">
        {/* Let&apos;s Take Your */}
        Ready to take your
      </span>
      <span className="flex items-baseline justify-center gap-x-2 md:gap-x-3">
        <span className="font-bebas font-black uppercase">Vision</span>
        <span className="font-serif normal-case text-gold">further?</span>
      </span>
    </p>
  );
}

export function ContactCta({
  href = '/contact',
  label,
  barOnly = false,
  phrase = 'home',
  id,
}: {
  href?: string;
  label?: string;
  barOnly?: boolean;
  phrase?: 'home' | 'weddings';
  id?: string;
}) {
  if (barOnly) {
    return (
      <section id={id} className="scroll-mt-8 bg-paper px-6 py-2 md:py-2">
        <Reveal>
          <ContactBar href={href} />
        </Reveal>
      </section>
    );
  }

  return (
    <section className="bg-white px-6 py-20 text-ink md:py-12">
      <p className="text-black flex flex-col items-center justify-center text-center text-xl leading-[0.8] tracking-tight md:text-5xl lg:text-7xl">
        <span className=" font-sans text-[0.5em] leading-none tracking-tighter uppercase">
          {/* Let&apos;s Take Your */}
          Ready to take your
        </span>
        <span className="flex items-baseline justify-center gap-x-2 md:gap-x-3">
          <span className="font-bebas font-black uppercase">Vision</span>
          <span className="font-serif normal-case text-gold">further?</span>
        </span>
      </p>

      <h2 className="font-sans text-black mt-4 text-center text-5xl uppercase md:text-5xl">
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
  );
}
