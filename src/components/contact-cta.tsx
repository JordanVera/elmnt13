import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/cn';
import { externalLinkProps } from '@/lib/site';

function ContactBar({ href }: { href: string }) {
  return (
    <h2 className="text-right font-display text-5xl tracking-tight uppercase md:text-6xl">
      <span className="font-bebas">Get in </span>{' '}
      <Link
        href={href}
        aria-label="Get in contact — open the inquiry form"
        className="font-serif font-normal tracking-normal text-gold italic normal-case underline decoration-1 decoration-gold/50 underline-offset-[0.18em] transition-colors hover:text-gold-bright hover:decoration-gold"
        {...externalLinkProps(href)}
      >
        contact
      </Link>
    </h2>
  );
}

export function ContactCta({
  href = '/contact',
  label,
  barOnly = false,
  phrase = 'home',
  id,
  inverted = false,
}: {
  href?: string;
  label?: string;
  barOnly?: boolean;
  phrase?: 'home' | 'weddings';
  id?: string;
  inverted?: boolean;
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
    <section
      id={id}
      className={cn(
        id && 'scroll-mt-8',
        inverted ? 'bg-ink text-paper' : 'bg-white text-ink',
        'px-6 py-12',
      )}
    >
      <p
        className={cn(
          // Make the base font size larger on mobile
          'flex flex-col items-center justify-center text-center text-5xl leading-[0.8] tracking-tight md:text-5xl lg:text-7xl',
          inverted ? 'text-white' : 'text-black',
        )}
      >
        <span className="font-sans text-[0.6em] leading-none tracking-tighter uppercase md:text-[0.5em]">
          Ready to take your
        </span>
        <span className="flex items-baseline justify-center gap-x-2 md:gap-x-3">
          <span className="font-bebas font-black uppercase">Vision</span>
          <span className="font-serif normal-case text-gold">further?</span>
        </span>
      </p>

      <h2
        className={cn(
          'mt-0 text-center font-sans text-5xl uppercase md:mt-4 md:text-5xl',
          inverted ? 'text-white' : 'text-black',
        )}
      >
        <span className="font-sans text-[0.5em] leading-none tracking-tighter uppercase md:text-[0.75em]">
          Get in{' '}
        </span>
        <Link
          href={href}
          aria-label="Get in contact — open the inquiry form"
          className="font-bebas text-[0.8em] font-black tracking-normal text-gold normal-case underline decoration-1 decoration-gold/50 underline-offset-[0.18em] transition-colors hover:text-gold-bright hover:decoration-gold md:text-[0.75em]"
          {...externalLinkProps(href)}
        >
          contact
        </Link>
      </h2>
    </section>
  );
}
