"use client";

import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { useRouter } from "next/navigation";
import { ArrowRight, Video } from "lucide-react";

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
      scale: 1.05,
      rotate: "2deg",
      boxShadow: "8px 8px 0px 0px #000",
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
    <section className="relative w-screen h-screen shrink-0 snap-center overflow-hidden bg-[#010409]">
      {/* Perspective Grid Background */}
      <div className="absolute inset-0 opacity-40">
        <PerspectiveGrid gridSize={40} fadeRadius={95} />
      </div>

      {/* Portal Element */}
      <div
        ref={portalRef}
        className="pointer-events-none fixed z-50 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#39d353] border-[3px] border-black"
      />

      {/* Hero Content */}
      <div className="hero-content pointer-events-none relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-auto flex flex-col items-center gap-8"
        >
          <span className="inline-block border-[3px] border-black bg-[#161b22] px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider text-[#39d353] shadow-[4px_4px_0px_0px_#000]">
            .OS GUILD
          </span>

          <h1 className="max-w-4xl text-5xl font-black uppercase leading-none tracking-tighter text-white sm:text-6xl md:text-7xl">
            Build Open Source<br />
            <span className="inline-block -rotate-2 mt-4 border-[4px] border-black bg-[#39d353] px-6 py-2 text-black shadow-[8px_8px_0px_0px_#000]">
              Together
            </span>
          </h1>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              ref={buttonRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              className="block bg-[#39d353] px-8 py-3 text-base font-black uppercase text-black shadow-[4px_4px_0px_0px_#000] border-[3px] border-black transition-colors hover:bg-[#238636]"
            >
              Join Guild
            </button>

            {isMeetingLive && (
              <button
                onClick={() => {
                  // Scroll to workshop section, then trigger the meeting
                  const main = document.querySelector('main');
                  main?.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
                  // Dispatch a custom event that Workshop listens for
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('open-jitsi-meeting'));
                  }, 800);
                }}
                className="group relative flex items-center gap-2 px-8 py-3 text-base font-black uppercase text-white border-[3px] border-[#f85149] bg-[#0d1117] shadow-[4px_4px_0px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#f85149] animate-[glow_2s_ease-in-out_infinite]"
              >
                <span className="absolute inset-0 bg-[#f85149]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Video className="h-5 w-5 text-[#f85149] group-hover:text-white transition-colors" />
                <span className="relative">Join Meeting</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Blinking Scroll Arrow */}
      <button
        onClick={() => document.querySelector('main')?.scrollBy({ left: window.innerWidth, behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-1/2 md:translate-y-1/2 md:left-auto md:-translate-x-0 md:right-8 flex flex-row md:flex-col items-center gap-2 md:gap-4 animate-pulse text-[#39d353] hover:text-white transition-colors cursor-pointer border-none bg-transparent"
        aria-label="Scroll to Workshop"
      >
        <span className="font-mono text-sm font-bold uppercase md:rotate-90 tracking-widest whitespace-nowrap md:mb-6">Scroll</span>
        <ArrowRight className="w-8 h-8" />
      </button>
    </section>
  );
}
