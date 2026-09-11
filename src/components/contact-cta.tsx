import Link from 'next/link';
import type { ReactNode } from 'react';
import { GoldLink } from '@/components/gold-link';
import { Reveal } from '@/components/reveal';

export function ContactCta({
  kicker,
  title,
  href = '/contact',
  label,
}: {
  kicker?: string;
  title?: ReactNode;
  href?: string;
  label?: string;
}) {
  const isHomePhrase = title == null;

  return (
    <section
      className={
        isHomePhrase
          ? 'bg-paper px-6 py-12 md:py-16'
          : 'bg-paper px-6 py-20 md:py-24'
      }
    >
      <Reveal className="mx-auto max-w-6xl">
        {kicker ? (
          <p className="text-[13px] tracking-[0.36em] text-gold uppercase">
            {kicker}
          </p>
        ) : null}
        {isHomePhrase ? (
          <h2 className="font-display text-5xl tracking-tight uppercase md:text-8xl">
            <span className="font-sans">Get</span>{' '}
            <span className="font-bebas">in </span>{' '}
            <Link
              href={href}
              aria-label="Get in contact — open the inquiry form"
              className="font-serif font-normal tracking-normal text-gold italic normal-case underline decoration-gold/50 underline-offset-[0.18em] transition-colors hover:text-gold-bright hover:decoration-gold"
            >
              Contact
            </Link>
          </h2>
        ) : (
          <>
            <h2 className="mt-6 font-display text-5xl tracking-tight uppercase md:text-8xl">
              {title}
            </h2>
            {label ? (
              <div className="mt-10">
                <GoldLink href={href}>{label}</GoldLink>
              </div>
            ) : null}
          </>
        )}
      </Reveal>
    </section>
  );
}
