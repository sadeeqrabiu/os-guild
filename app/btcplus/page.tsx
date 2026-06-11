import { BtcxxSlides } from "@/components/btcxx-slides";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Cognitive Cost of AI-Assisted Open Source | OSGuild",
  description:
    "Sadiq's Bitcoin++ talk: Exploring the cognitive cost of AI-assisted open source development, and how to maintain contribution integrity in Bitcoin.",
  openGraph: {
    title: "The Cognitive Cost of AI-Assisted Open Source | OSGuild",
    description:
      "Sadiq's Bitcoin++ talk: Exploring the cognitive cost of AI-assisted open source development, and how to maintain contribution integrity in Bitcoin.",
    type: "website",
  },
};

export default function BtcxxPage() {
  return (
    <main className="min-h-screen bg-[#010409]">
      <BtcxxSlides />
    </main>
  );
}
