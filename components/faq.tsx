"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FAQ() {
  const FAQ_ITEMS = [
    {
      q: "Who is OSGuild built for?",
      a: "OSGuild is built for developers who want to master real-world FOSS development, learn core Bitcoin protocol engineering, and collaborate inside strict, peer-reviewed environments alongside experienced maintainers."
    },
    {
      q: "How do the Bitcoin Sats micro-rewards work?",
      a: "When you contribute to our featured repositories, senior maintainers review and merge your code. Verified contributions trigger claimable rewards in your local dashboard ledger, which you can route instantly to any standard self-custodial Lightning wallet."
    },
    {
      q: "Is a Nostr key required?",
      a: "Connecting a GitHub profile is required to synchronize workspace repositories, but binding a Nostr cryptographic public key is optional. You can easily use NIP-07 browser signers like Alby or skip the step using sandbox cypherpunk developer identities."
    },
    {
      q: "What is the workload of the 6-Week Pathway?",
      a: "The pathway program consists of weekly code contributions, reviews, and cohort discussions. It requires roughly 5–10 hours per week of disciplined work focusing strictly on writing code and performing peer-reviews."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-6 bg-[#0d1117] border-t-[3px] border-b-[3px] border-black">
      <div className="mx-auto max-w-3xl space-y-12">
        {/* Section Header */}
        <div className="border-b-[3px] border-black pb-6 text-center">
          <span className="font-mono text-xs font-black uppercase text-[#39d353] tracking-widest block mb-2">
            GOT QUESTIONS?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
            Frequently Asked
          </h2>
        </div>

        {/* Accordion Panels */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={item.q}
                className="border-[3px] border-black bg-[#010409] transition-all hover:border-[#39d353]/30"
              >
                {/* Header */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-black uppercase text-sm sm:text-base text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  <div className="flex h-7 w-7 items-center justify-center border-2 border-black bg-[#161b22] text-white shrink-0 shadow-[1.5px_1.5px_0px_0px_#000]">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                {/* Content Panel */}
                {isOpen && (
                  <div className="p-5 border-t border-[#30363d] bg-black/40 font-mono text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
