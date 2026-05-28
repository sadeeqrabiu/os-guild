"use client";

import Link from "next/link";
import { User, Terminal } from "lucide-react";

export function Navbar() {
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
          <Link
            href="http://localhost:5173"
            className="flex items-center gap-1.5 px-4 py-1.5 border-2 border-black bg-[#238636] text-xs font-black uppercase text-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#39d353] hover:shadow-[3px_3px_0px_0px_#000] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] transition-all cursor-pointer"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
