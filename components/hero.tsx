"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { useRouter } from "next/navigation";
import { ArrowRight, Video } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import OsportalImg from "@/app/Osportal.png";

export function Hero() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [isMeetingLive, setIsMeetingLive] = useState(false);
  const router = useRouter();

  // Show "Join Meeting" only during Apr 15, 2026 5:00 PM – 6:30 PM WAT (UTC+1)
  useEffect(() => {
    const MEETING_START = new Date("2026-04-15T17:00:00+01:00").getTime();
    const MEETING_END = new Date("2026-04-15T18:30:00+01:00").getTime();

    const check = () => {
      const now = Date.now();
      setIsMeetingLive(now >= MEETING_START && now <= MEETING_END);
    };

    check();
    const interval = setInterval(check, 30_000); // re-check every 30s
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = () => {
    if (!buttonRef.current || isJoining) return;
    animate(buttonRef.current, {
      scale: 1.02,
      rotate: "1deg",
      boxShadow: "6px 6px 0px 0px #000",
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current || isJoining) return;
    animate(buttonRef.current, {
      scale: 1,
      rotate: "0deg",
      boxShadow: "4px 4px 0px 0px #000",
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  const handleClick = () => {
    if (!buttonRef.current || !portalRef.current || isJoining) return;
    setIsJoining(true);

    // get button position for the portal origin
    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Reset portal position to center of button
    portalRef.current.style.left = `${x}px`;
    portalRef.current.style.top = `${y}px`;
    portalRef.current.style.display = "block";

    // Portal animation
    animate(portalRef.current, {
      scale: [0, 150], // expand massive enough to cover any screen
      opacity: [1, 1],
      duration: 800,
      ease: "inOutExpo",
      complete: () => {
        router.push("/form");
      }
    });

    // Fade out hero content
    animate(".hero-content", {
      opacity: 0,
      scale: 0.95,
      duration: 400,
      ease: "outExpo"
    });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#010409] py-16 md:py-24 border-b-[3px] border-black">
      {/* Subtle Background Glow Accent instead of Grid */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#238636]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Portal Element */}
      <div
        ref={portalRef}
        className="pointer-events-none fixed z-50 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39d353] border-[3px] border-black"
      />

      {/* Hero Content - Professional Split Grid */}
      <div className="hero-content relative z-20 mx-auto max-w-6xl w-full px-6 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* LEFT COLUMN: HERO ACTION CONTROLS */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-8">
            
            {/* Mauritius + Brand Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 border-[3px] border-black bg-[#0d1117] px-3.5 py-1.5 font-mono text-xs font-black uppercase tracking-wider text-[#f85149] shadow-[3.5px_3.5px_0px_0px_#000]">
                Mauritius 🇲🇺
              </span>
            </div>

            {/* Structured Pipeline Cypherpunk Heading */}
            <h1 className="max-w-xl text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-[1.1] tracking-tight text-white">
              A Structured Pipeline<br />
              for Sovereign Contributors in<br />
              <span className="inline-block -rotate-1 mt-2 border-[3px] border-black bg-[#39d353] px-4 py-1 text-black shadow-[6px_6px_0px_0px_#000] leading-none">
                Bitcoin Open Source
              </span>
            </h1>

            {/* Dungeon Tagline Description */}
            <p className="max-w-lg font-mono text-xs sm:text-sm text-[#8b949e] leading-relaxed">
              Unlock the <span className="text-[#39d353] font-bold">GitHub dungeon ⛩️</span>. Link repositories, authenticate with Nostr keys, and route claimable micro-incentives to lightning wallets.
            </p>

            {/* CTAs Row */}
            <div className="flex flex-wrap gap-4 w-full sm:w-auto pt-2">
              <button
                ref={buttonRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                className="w-full sm:w-auto bg-[#39d353] px-8 py-3.5 text-sm font-black uppercase text-black shadow-[4px_4px_0px_0px_#000] border-[3px] border-black transition-all hover:bg-[#238636] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] cursor-pointer text-center"
              >
                Join Guild
              </button>

              <Link
                href="/genesis-workshop"
                className="w-full sm:w-auto text-center group relative flex items-center justify-center bg-[#0d1117] px-8 py-3.5 text-sm font-black uppercase text-white shadow-[4px_4px_0px_0px_#000] border-[3px] border-[#f85149] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#f85149] hover:text-[#f85149]"
              >
                <span className="relative">Genesis Workshop</span>
              </Link>

              {isMeetingLive && (
                <button
                  onClick={() => {
                    const el = document.getElementById("workshops");
                    el?.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent('open-jitsi-meeting'));
                    }, 800);
                  }}
                  className="w-full sm:w-auto group relative flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-black uppercase text-white border-[3px] border-[#f85149] bg-[#0d1117] shadow-[4px_4px_0px_0px_#000] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#f85149] animate-[glow_2s_ease-in-out_infinite] cursor-pointer"
                >
                  <span className="absolute inset-0 bg-[#f85149]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Video className="h-4 w-4 text-[#f85149] group-hover:text-white transition-colors" />
                  <span className="relative">Join Meeting</span>
                </button>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: WEBVIEW PORTAL MOCKUP (HIDDEN ON MOBILE) */}
          <div className="hidden lg:block lg:col-span-5 relative z-10 shrink-0">
            {/* Neo-brutalist Mockup Frame Wrapper */}
            <div className="border-[4px] border-black bg-[#0d1117] p-3 shadow-[10px_10px_0px_0px_#238636] relative scanlines hover:shadow-[12px_12px_0px_0px_#39d353] hover:border-[#39d353]/30 transition-all">
              <div className="mb-2.5 flex items-center justify-between border-b border-[#30363d] pb-2 font-mono text-[9px] text-[#8b949e]">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#f85149]" />
                  <span className="h-2 w-2 rounded-full bg-[#d29922]" />
                  <span className="h-2 w-2 rounded-full bg-[#39d353]" />
                </span>
                <span>OS_PORTAL_SIGNAL.EXE</span>
              </div>
              <Image 
                src={OsportalImg} 
                alt="OSGuild Sovereignty Interface Portal" 
                className="w-full object-cover border-2 border-black"
                priority
              />
              <p className="mt-2.5 font-mono text-[8px] text-[#484f58] uppercase tracking-wider text-center">
                Visual demonstration &bull; Cryptographic Contributor Terminal
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Blinking Scroll Arrow - Scrolls to About Section */}
      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-row items-center gap-2 animate-pulse text-[#39d353] hover:text-white transition-colors cursor-pointer border-none bg-transparent"
        aria-label="Scroll to About Section"
      >
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Scroll Down</span>
        <ArrowRight className="w-5 h-5 rotate-90" />
      </button>
    </section>
  );
}
