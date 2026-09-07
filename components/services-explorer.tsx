"use client";

import { useState } from "react";
import Link from "next/link";
import { serviceCategories, type ServiceCategory } from "@/lib/services";
import { cn } from "@/lib/cn";

export function ServicesExplorer() {
  const [activeId, setActiveId] = useState<ServiceCategory["id"] | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = serviceCategories.find((item) => item.id === activeId) ?? null;
  const preview = active?.options.find((item) => item.name === hovered);

  return (
    <section className="min-h-dvh bg-ink px-6 pt-32 pb-24 text-paper">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-[11px] tracking-[0.36em] text-gold uppercase">
            Services
          </p>
          <ul className="mt-12 space-y-10">
            {serviceCategories.map((category) => {
              const selected = category.id === activeId;
              return (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveId((current) =>
                        current === category.id ? null : category.id,
                      )
                    }
                    className="text-left"
                  >
                    <span
                      className={cn(
                        "font-display block text-4xl leading-[0.95] tracking-tight uppercase transition-colors md:text-6xl",
                        selected ? "text-gold" : "text-paper hover:text-gold",
                      )}
                    >
                      {category.title}
                    </span>
                  </button>
                  <p
                    className={cn(
                      "mt-4 max-w-md text-sm leading-7 text-paper/55 transition-opacity",
                      selected ? "opacity-100" : "opacity-70",
                    )}
                  >
                    {category.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative min-h-[420px] border-t border-white/10 pt-10 lg:border-t-0 lg:border-l lg:pt-24 lg:pl-16">
          {!active ? (
            <p className="font-serif text-3xl italic text-gold/80">
              Select a practice to explore the work inside it.
            </p>
          ) : (
            <div>
              <ul>
                {active.options.map((option) => (
                  <li key={option.name} className="border-b border-white/10">
                    <button
                      type="button"
                      onMouseEnter={() => setHovered(option.name)}
                      onFocus={() => setHovered(option.name)}
                      onClick={() => setHovered(option.name)}
                      className="flex w-full items-center justify-between py-5 text-left"
                    >
                      <span
                        className={cn(
                          "text-lg tracking-wide transition-colors",
                          hovered === option.name ? "text-gold" : "text-paper",
                        )}
                      >
                        {option.name}
                      </span>
                      <span className="text-gold">+</span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-8 min-h-24 text-sm leading-7 text-paper/70">
                {preview?.description ??
                  "Hover or select an offering to read how we approach it."}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-6xl text-center">
        <p className="font-display text-[12vw] leading-none tracking-tight text-gold/15 uppercase md:text-[8vw]">
          {active?.stageTitle ?? "Select"}
        </p>
        {active ? (
          <p className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm tracking-[0.18em] text-paper/70 uppercase">
            {active.stageItems.map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gold underline decoration-gold/40 underline-offset-4"
                >
                  {item.label}*
                </Link>
              ) : (
                <span key={item.label}>{item.label}</span>
              ),
            )}
          </p>
        ) : null}
      </div>
    </section>
  );
}
