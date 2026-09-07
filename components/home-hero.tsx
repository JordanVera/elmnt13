import Link from "next/link";
import { footerLinks } from "@/lib/site";

export function HomeHero() {
  return (
    <section className="relative flex min-h-dvh flex-col justify-center bg-ink px-6 text-paper">
      <div className="mx-auto w-full max-w-6xl pt-24 pb-28">
        <h1 className="font-display text-[13vw] leading-[0.82] tracking-tight uppercase md:text-[8.4vw]">
          <span className="hero-mask block">
            <span className="hero-line font-serif text-[0.42em] font-normal tracking-normal normal-case italic text-gold">
              We See
            </span>
          </span>
          <span className="hero-mask block text-right">
            <span
              className="hero-line from-right"
              style={{ animationDelay: "0.05s" }}
            >
              the Vision.
            </span>
          </span>
          <span className="hero-mask mt-[0.12em] block">
            <span
              className="hero-line font-serif text-[0.42em] font-normal tracking-normal normal-case italic text-gold"
              style={{ animationDelay: "0.42s" }}
            >
              We Handle
            </span>
          </span>
          <span className="hero-mask block text-right">
            <span
              className="hero-line from-right"
              style={{ animationDelay: "0.48s" }}
            >
              the Details.
            </span>
          </span>
        </h1>
      </div>

      <nav className="absolute inset-x-0 bottom-0 px-6 pb-8">
        <ul className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[11px] tracking-[0.38em] text-gold uppercase transition-colors hover:text-gold-bright"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
