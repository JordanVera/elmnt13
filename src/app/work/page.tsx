import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";
import { WorkHero } from "@/components/work-hero";
import { workProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "A selection of experiences produced by ELMNT13.",
};

export default function WorkPage() {
  return (
    <main>
      <WorkHero />
      <section className="bg-paper px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ProjectGrid items={workProjects} />
        </div>
      </section>
    </main>
  );
}
