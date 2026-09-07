import Image from "next/image";
import { weddingProjects } from "@/lib/projects";

export function WeddingGallery() {
  return (
    <section className="bg-paper px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] tracking-[0.36em] text-gold uppercase">Work</p>
        <h2 className="mt-4 font-display text-4xl tracking-tight uppercase md:text-6xl">
          Moments Then,
          <br />
          Memories Now
        </h2>
        <div className="mt-14 grid gap-3 md:grid-cols-12">
          {weddingProjects.map((project, index) => (
            <div
              key={project.slug}
              className={
                index === 0
                  ? "relative aspect-4/5 overflow-hidden md:col-span-7 md:aspect-4/5"
                  : "relative aspect-4/5 overflow-hidden md:col-span-5"
              }
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          ))}
          <div className="relative flex aspect-4/5 items-end bg-ink p-8 text-paper md:col-span-12 md:aspect-[21/7]">
            <p className="font-serif text-3xl italic md:text-5xl">
              Film and stills, composed as one memory.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
