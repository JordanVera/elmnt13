import type { Metadata } from "next";
import { ServicesExplorer } from "@/components/services-explorer";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Experiential marketing and event management — explored one offering at a time.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesExplorer />
    </main>
  );
}
