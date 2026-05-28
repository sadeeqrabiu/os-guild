"use client";

import { ShieldAlert, KeyRound, TerminalSquare } from "lucide-react";

export function Pillars() {
  const CORE_PILLARS = [
    {
      title: "Peer Review Rigor",
      desc: "Zero loose commits. Every line of merged code undergoes strict multi-signature validation from senior repository maintainers to verify safety and layout standards.",
      icon: ShieldAlert
    },
    {
      title: "Self-Custodial Control",
      desc: "Your keys remain strictly yours. Authenticate securely via NIP-07 Nostr extensions and route Bitcoin Sats rewards directly to your personal Lightning network addresses.",
      icon: KeyRound
    },
    {
      title: "Production FOSS Sprints",
      desc: "We focus on clean, running deployments. Experience real-world contributions targeting actively used tools, developer utilities, and decentralized networks.",
      icon: TerminalSquare
    }
  ];

  return (
    <section className="py-20 px-6 bg-[#010409]">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-[3px] border-black pb-6 gap-4">
          <div>
            <span className="font-mono text-xs font-black uppercase text-[#39d353] tracking-widest block mb-2">
              OUR GUIDING STANDARDS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
              Guild Principles
            </h2>
          </div>
          <p className="max-w-md text-sm font-mono text-[#8b949e]">
            Deterministic reviews, mathematical proof systems, and collaborative development standards built for cypherpunks.
          </p>
        </div>

        {/* Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CORE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.title}
                className="border-[3px] border-black bg-[#0d1117] p-6 shadow-[5px_5px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#39d353] transition-all group"
              >
                <div className="flex h-12 w-12 items-center justify-center border-2 border-black bg-white/5 mb-6 group-hover:bg-[#39d353]/10">
                  <Icon className="h-6 w-6 text-white group-hover:text-[#39d353] transition-colors" />
                </div>
                <h3 className="text-lg font-black text-white uppercase mb-3 leading-tight">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
