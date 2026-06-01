"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Terminal } from "lucide-react";

export function Navbar() {
  const [showDungeonModal, setShowDungeonModal] = useState(false);
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-black bg-[#0d1117]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Brand Logo in Source Code Pro */}
        <div className="flex items-center gap-3">
          <span 
            className="text-xl font-black tracking-tight text-white cursor-pointer select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ fontFamily: "'Source Code Pro', monospace" }}
          >
            OSGUILD<span className="text-[#39d353]">.</span>
          </span>
        </div>

        {/* Navigation Actions */}
        <nav className="flex items-center gap-6">
          <div className="hidden md:flex gap-1 bg-[#010409] p-1 border border-[#30363d]">
            {[
              { label: "About", id: "about" },
              { label: "Curriculum", id: "pathway" },
              { label: "Architect CLI", id: "cli" },
              { label: "Workshops", id: "workshops" },
              { label: "FAQs", id: "faq" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-1 text-xs font-black uppercase text-[#8b949e] hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Quick link leading directly to the Vite Dashboard */}
          <button
            onClick={() => setShowDungeonModal(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 border-2 border-black bg-[#238636] text-xs font-black uppercase text-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#39d353] hover:shadow-[3px_3px_0px_0px_#000] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] transition-all cursor-pointer"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Dungeon</span>
          </button>
        </nav>
      </div>

      {showDungeonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm border-[4px] border-black bg-[#0d1117] p-6 shadow-[8px_8px_0px_0px_#39d353] text-center">
            <h4 className="text-lg font-black uppercase text-white mb-2 tracking-wide">
              COMING SOON
            </h4>
            <p className="text-xs text-gray-400 mb-6 font-mono">
              The Great dungeon is coming soon!
            </p>
            <button
              onClick={() => setShowDungeonModal(false)}
              className="border-[2px] border-black bg-white hover:bg-gray-100 text-black px-6 py-2 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000] cursor-pointer rounded-sm transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
