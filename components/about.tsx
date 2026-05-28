"use client";

import { motion } from "framer-motion";
import { Github, Fingerprint, Coins, ShieldCheck } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 px-6 bg-[#010409]">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-[3px] border-black pb-6 gap-4">
          <div>
            <span className="font-mono text-xs font-black uppercase text-[#39d353] tracking-widest block mb-2">
              BUILDING THE OPEN FUTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
              What is OSGuild<span className="text-[#39d353]">?</span>
            </h2>
          </div>
          <p className="max-w-md text-sm font-mono text-[#8b949e] leading-relaxed">
            A decentralized developer ecosystem bridging collaborative FOSS code contributions with cryptographic identity and lightning incentive pools.
          </p>
        </div>

        {/* 3 Core Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: FOSS Contributions */}
          <div className="border-[3px] border-black bg-[#0d1117] p-6 shadow-[5px_5px_0px_0px_#238636] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#39d353] transition-all group">
            <div className="flex h-12 w-12 items-center justify-center border-2 border-black bg-white/5 mb-6 group-hover:bg-[#39d353]/10 transition-colors">
              <Github className="h-6 w-6 text-white group-hover:text-[#39d353] transition-colors" />
            </div>
            <h3 className="text-lg font-black text-white uppercase mb-3">FOSS Code Sprints</h3>
            <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
              We focus strictly on production-grade open source projects. Collaborate on real-world repositories like Fedimint plugins, lightning wallet modules, and developer tooling.
            </p>
          </div>

          {/* Card 2: Nostr Binding */}
          <div className="border-[3px] border-black bg-[#0d1117] p-6 shadow-[5px_5px_0px_0px_#238636] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#39d353] transition-all group">
            <div className="flex h-12 w-12 items-center justify-center border-2 border-black bg-white/5 mb-6 group-hover:bg-[#39d353]/10 transition-colors">
              <Fingerprint className="h-6 w-6 text-white group-hover:text-[#39d353] transition-colors" />
            </div>
            <h3 className="text-lg font-black text-white uppercase mb-3">Nostr Identities</h3>
            <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
              Unshackle your identity from centralized accounts. Bind a NIP-07 browser Nostr key signature to claim team signatures, decentralized badges, and verify public contributions.
            </p>
          </div>

          {/* Card 3: Lightning Payouts */}
          <div className="border-[3px] border-black bg-[#0d1117] p-6 shadow-[5px_5px_0px_0px_#238636] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#39d353] transition-all group">
            <div className="flex h-12 w-12 items-center justify-center border-2 border-black bg-white/5 mb-6 group-hover:bg-[#39d353]/10 transition-colors">
              <Coins className="h-6 w-6 text-white group-hover:text-[#39d353] transition-colors" />
            </div>
            <h3 className="text-lg font-black text-white uppercase mb-3">Bitcoin Micro-Payouts</h3>
            <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
              Real open source contributions deserve instant settlement. Claim micro-ledgers of accumulated Sats claimed instantly through Lightning routing, straight to your self-custodial wallet.
            </p>
          </div>
        </div>

        {/* Informational Callout */}
        <div className="border-2 border-[#238636] bg-[#238636]/5 p-5 font-mono text-xs text-[#8b949e] leading-relaxed flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-[#39d353] shrink-0 mt-0.5" />
          <div>
            <span className="text-[#39d353] font-bold block mb-1">DISCIPLINED ENGAGEMENT STANDARDS</span>
            No fluff, no AI-generated placeholders, and no visual slop. We are a cohort of cypherpunks, builders, and cryptography pioneers focusing on real code, deterministic review standards, and decentralized networks.
          </div>
        </div>
      </div>
    </section>
  );
}
