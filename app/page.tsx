import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Metrics } from "@/components/metrics";
import { About } from "@/components/about";
import { Pathway } from "@/components/pathway";
import { Pillars } from "@/components/pillars";
import { Workshop } from "@/components/workshop";
import { FAQ } from "@/components/faq";
import { FooterAction } from "@/components/footer-action";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#010409] text-white selection:bg-[#39d353] selection:text-black scroll-smooth">
      <Navbar />
      <Hero />
      <Metrics />
      <About />
      <Pathway />
      <Pillars />
      <Workshop />
      <FAQ />
      <FooterAction />
    </div>
  );
}
