import type { Metadata } from "next";
import { BrandsSection } from "@/components/brands-section";
import { CountUp } from "@/components/count-up";
import { DetailsMoment } from "@/components/details-moment";
import { Reveal } from "@/components/reveal";
import { stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "ELMNT13 is a creative marketing and management company where vision drives the work and the details shape the outcome. Since 2012.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="bg-paper px-6 pt-36 pb-24 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.36em] text-gold uppercase">About</p>
          <Reveal>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight uppercase md:text-7xl">
              Vision drives the work.
              <span className="mt-3 block font-serif text-4xl tracking-normal normal-case italic md:text-6xl">
                Details shape the outcome.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-12 max-w-2xl text-lg leading-8 text-ink/75">
              ELMNT13 is a creative marketing and management company where vision
              drives the work and the details shape the outcome. Since 2012, we’ve
              partnered with brands, organizations and individuals to bring ideas
              to life through strategy, creativity and management. We see the full
              vision, understand how every brand element matters and handle the
              creative direction and execution needed to create a memorable
              experience.
            </p>
          </Reveal>
        </div>
      </section>

      <BrandsSection />

      <section className="bg-paper px-6 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.36em] text-gold uppercase">
            Why clients choose ELMNT13
          </p>
          <div className="mt-12 space-y-6">
            {[
              "We approach every project with intention.",
              "We see the whole vision.",
              "We think beyond what you see.",
            ].map((line, index) => (
              <Reveal key={line} delay={index * 80}>
                <p className="font-display text-3xl tracking-tight uppercase md:text-5xl">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DetailsMoment line="Because the details matter" tone="ink" />

      <section className="bg-mist px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t border-ink/15 pt-6">
              <p className="font-display text-5xl text-ink">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-[11px] tracking-[0.22em] text-ink/50 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
