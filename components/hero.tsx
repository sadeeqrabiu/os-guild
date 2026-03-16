"use client";

import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { animate } from "animejs";
import { useRouter } from "next/navigation";

export function Hero() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const [isJoining, setIsJoining] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    if (!buttonRef.current || isJoining) return;
    animate(buttonRef.current, {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(139, 92, 246, 0.6)", // vibrant branding glow
      duration: 400,
      ease: "outExpo",
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current || isJoining) return;
    animate(buttonRef.current, {
      scale: 1,
      boxShadow: "0 0 0px rgba(139, 92, 246, 0)",
      duration: 600,
      ease: "outElastic(1, .8)",
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
    <section className="relative w-full h-screen overflow-hidden font-(family-name:--font-source-code-pro)">
      {/* Perspective Grid Background */}
      <div className="absolute inset-0">
        <PerspectiveGrid gridSize={40} fadeRadius={95} />
      </div>

      {/* Portal Element */}
      <div
        ref={portalRef}
        className="pointer-events-none fixed z-50 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-violet-600 to-indigo-900"
      />

      {/* Hero Content */}
      <div className="hero-content pointer-events-none relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-auto flex flex-col items-center gap-6"
        >
          <span className="inline-block rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm dark:border-gray-700 dark:bg-black/60 dark:text-gray-300">
            .os guild
          </span>

          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-gray-950 dark:text-gray-400 sm:text-4xl md:text-5xl">
            Build Open Source,{" "}
            <span className="bg-linear-to-r from-gray-500 via-gray-400 to-gray-600 bg-clip-text text-transparent dark:from-gray-300 dark:via-gray-500 dark:to-gray-700">
              Together
            </span>
          </h1>

          <div className="mt-4 flex gap-4">
            <button
              ref={buttonRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              className="rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:outline-gray-100"
            >
              join Guild
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-full bg-transparent px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:text-gray-100 dark:ring-gray-700 dark:hover:bg-gray-800"
            >
              Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
