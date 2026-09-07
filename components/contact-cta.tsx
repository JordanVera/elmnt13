import { GoldLink } from "@/components/gold-link";
import { Reveal } from "@/components/reveal";

export function ContactCta({
  kicker = "Contact",
  title = "Let’s make it happen.",
  href = "/contact",
  label = "Contact",
}: {
  kicker?: string;
  title?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="bg-paper px-6 py-28 md:py-36">
      <Reveal className="mx-auto max-w-6xl">
        <p className="text-[11px] tracking-[0.36em] text-gold uppercase">{kicker}</p>
        <h2 className="mt-6 font-display text-5xl tracking-tight uppercase md:text-8xl">
          {title}
        </h2>
        <div className="mt-10">
          <GoldLink href={href}>{label}</GoldLink>
        </div>
      </Reveal>
    </section>
  );
}
