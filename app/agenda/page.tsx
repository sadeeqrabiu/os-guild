import { WorkshopAgenda } from "@/components/workshop-agenda";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workshop Agenda | OSGuild",
  description:
    "Open Source in 2026: AI, Discipline, and the New Contribution Standard — Full workshop agenda with dual timezone support.",
};

export default function AgendaPage() {
  return (
    <main className="min-h-screen bg-[#010409] py-8 px-4 flex justify-center">
      <WorkshopAgenda />
    </main>
  );
}
