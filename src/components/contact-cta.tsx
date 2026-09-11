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
    <>
      <div className="bg-white">
        <div className="flex justify-center px-6 pb md:pb-24 mx-auto max-w-6xl ">
          <Reveal>
            <p className="flex flex-col items-center justify-center text-center text-6xl leading-[0.8] tracking-tight md:text-7xl lg:text-8xl">
              <span className="font-sans text-[0.5em] leading-none tracking-tighter uppercase">
                Let’s Take Your
              </span>
              <span className="flex items-baseline gap-x-2 md:gap-x-3 justify-center">
                <span className="font-bebas font-black uppercase">Vision</span>
                <span className="font-serif normal-case text-gold">
                  further
                </span>
              </span>
            </p>
          </Reveal>
        </div>
      </div>

      <section
        className={
          isHomePhrase
            ? 'bg-paper px-6 py-2 md:py-2'
            : 'bg-paper px-6 py-2 md:py-2'
        }
      >
        <Reveal>
          {isHomePhrase ? (
            <h2 className="text-right font-display text-5xl tracking-tight uppercase md:text-6xl">
              <span className="font-bebas">Get in </span>{' '}
              <Link
                href={href}
                aria-label="Get in contact — open the inquiry form"
                className="font-serif font-normal tracking-normal underline text-gold italic normal-case decoration-1 decoration-gold/50 underline-offset-[0.18em] transition-colors hover:text-gold-bright hover:decoration-gold"
              >
                contact
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
    </>
  );
}
