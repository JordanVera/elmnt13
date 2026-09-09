import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { serviceApproach, serviceCategories } from '@/lib/services';

export function ServicesApproach() {
  return (
    <>
      <section className="bg-paper px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.36em] text-gold uppercase">
            Approach
          </p>
          <Reveal>
            <h2 className="mt-4 max-w-3xl font-display text-4xl tracking-tight uppercase md:text-6xl">
              Achieve the vision
              <span className="mt-2 block font-serif text-3xl tracking-normal normal-case italic md:text-5xl">
                through a tailored path.
              </span>
            </h2>
          </Reveal>
          <ol className="mt-20 grid gap-12 md:grid-cols-3 md:gap-16">
            {serviceApproach.map((step, index) => (
              <Reveal key={step.number} delay={index * 80}>
                <li className="border-t border-ink/10 pt-8">
                  <p className="text-[11px] tracking-[0.32em] text-black uppercase">
                    {step.number}
                  </p>
                  <h3 className="mt-4 font-display text-3xl tracking-tight uppercase md:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-ink/70">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper px-6 py-24 text-paper md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.36em] text-black uppercase">
            Formats
          </p>
          <Reveal>
            <h2 className="mt-4 font-display text-4xl tracking-tight uppercase md:text-6xl">
              What this looks like
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-24">
            {serviceCategories.map((category) => (
              <div key={category.id}>
                <p className="font-serif text-3xl italic text-black">
                  {category.stageTitle}
                </p>
                <ul className="mt-8 space-y-3">
                  {category.stageItems.map((item) => (
                    <li
                      key={item.label}
                      className="border-b border-white/10 pb-3"
                    >
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-sm tracking-[0.16em] text-black uppercase underline decoration-gold/40 underline-offset-4"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-sm tracking-[0.16em] text-paper/75 uppercase">
                          {item.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
