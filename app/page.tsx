import { Hero } from "@/components/hero";
import { Workshop } from "@/components/workshop";

export default function Home() {
  return (
    <main className="flex h-screen w-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory">
      <Hero />
      <Workshop />
    </main>
  );
}
