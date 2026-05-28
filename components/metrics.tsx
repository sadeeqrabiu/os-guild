"use client";

import { motion } from "framer-motion";
import { Users, Coins, GitPullRequest, Radio } from "lucide-react";

export function Metrics() {
  const GRID_ITEMS = [
    {
      label: "Active Builders",
      val: "0+",
      desc: "Cypherpunk FOSS engineers",
      icon: Users,
      color: "#238636"
    },
    {
      label: "Sats Routed",
      val: "0,000,000+",
      desc: "Lightning incentive pools",
      icon: Coins,
      color: "#39d353"
    },
    {
      label: "Merged Pull Requests",
      val: "0+",
      desc: "Verified FOSS contributions",
      icon: GitPullRequest,
      color: "#fff"
    },
    {
      label: "Linked Nodes",
      val: "2+",
      desc: "Decentralized Nostr relays",
      icon: Radio,
      color: "#f85149"
    }
  ];

  return (
    <section className="bg-[#010409] py-12 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GRID_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.label}
                className="border-[3px] border-black bg-[#0d1117] p-4 text-center shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#238636] transition-all group"
              >
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 mb-3 group-hover:bg-white/10 transition-all">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="font-mono text-[9px] text-[#8b949e] uppercase block tracking-wider">{item.label}</span>
                <span className="text-xl sm:text-2xl font-black block mt-1 leading-none text-white" style={{ color: item.color }}>
                  {item.val}
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] text-[#8b949e] block mt-1.5">{item.desc}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
