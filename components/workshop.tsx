"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { ArrowLeft } from "lucide-react";

export function Workshop() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Anime.js animation setup for entrance
    const elements = containerRef.current?.querySelectorAll(".animate-item");
    if (elements && elements.length > 0) {
      animate(elements, {
        translateY: [50, 0],
        opacity: [0, 1],
        delay: stagger(200, { start: 200 }),
        easing: "easeOutElastic(1, 0.8)",
        duration: 1200,
      });
    }
  }, []);

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    animate(e.currentTarget, {
      scale: 1.05,
      rotate: "2deg",
      boxShadow: "12px 12px 0px 0px rgba(0,0,0,1)",
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    animate(e.currentTarget, {
      scale: 1,
      rotate: "0deg",
      boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)",
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  const handleButtonDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    animate(e.currentTarget, {
      scale: 0.95,
      translateY: 4,
      translateX: 4,
      boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)",
      duration: 100,
      easing: "easeOutQuad",
    });
  };

  const handleButtonUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleButtonHover(e);
  };

  return (
    <section className="relative w-screen h-screen shrink-0 snap-center flex flex-col justify-center bg-[#010409] py-24 px-8 border-l-[3px] border-black border-dashed overflow-hidden" ref={containerRef}>
      <div className="w-full max-w-5xl mx-auto">
        <div className="animate-item bg-[#238636] border-[3px] border-black inline-block px-4 py-2 mb-8 shadow-[4px_4px_0px_0px_#000] -rotate-2">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Workshop
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="animate-item flex-1 bg-[#0d1117] border-[3px] border-black p-8 sm:p-12 shadow-[12px_12px_0px_0px_#39d353] relative z-10 transition-colors">
            {/* Decorative element */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#39d353] border-[3px] border-black rounded-full shadow-[4px_4px_0px_0px_#000] flex items-center justify-center">
              <span className="text-black font-black text-2xl rotate-12">!</span>
            </div>
            
            <p className="text-[#39d353] font-bold uppercase tracking-wider border-2 border-black inline-block px-3 py-1 bg-[#161b22] mb-6 text-sm shadow-[2px_2px_0px_0px_#000]">
              Upcoming Event
            </p>
            
            <h3 className="text-4xl sm:text-5xl font-black text-white uppercase mb-6 leading-none">
              Design Systems in Neo-Brutalism
            </h3>
            
            <p className="text-xl sm:text-2xl text-[#c9d1d9] font-medium mb-10 border-l-4 border-[#39d353] pl-4 py-1">
              Learn how to craft accessible, striking, and dynamic interfaces that break all the rules.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="bg-[#161b22] border-[3px] border-black p-5 shadow-[6px_6px_0px_0px_#000] transform hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#39d353] rounded-full flex items-center justify-center text-black border-2 border-black">
                    {/* Placeholder for speaker avatar */}
                    <span className="font-bold">SP</span>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-[#8b949e]">Speaker</p>
                    <p className="text-xl font-black text-white uppercase">Jane Doe</p>
                  </div>
                </div>
                <p className="text-sm font-bold border-t-2 border-black/50 border-dashed pt-2 mt-2 text-[#c9d1d9]">Lead Designer @ OS-Clan</p>
              </div>

              <div className="bg-[#161b22] border-[3px] border-black p-5 shadow-[6px_6px_0px_0px_#000] transform hover:-translate-y-1 transition-transform">
                <div>
                  <p className="text-xs font-black uppercase text-[#8b949e] mb-1">Type</p>
                  <p className="text-xl font-black text-white uppercase mb-2">Build Session</p>
                </div>
                <p className="text-sm font-bold border-t-2 border-black/50 border-dashed pt-2 mt-2 text-[#c9d1d9]">Intensive & Hands-on</p>
              </div>
            </div>

            <button
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onMouseDown={handleButtonDown}
              onMouseUp={handleButtonUp}
              className="w-full sm:w-auto block bg-[#39d353] text-black font-black uppercase text-xl px-12 py-5 border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-[#238636]"
            >
              Sign Up For Workshop
            </button>
          </div>
        </div>
      </div>

      {/* Blinking Scroll Back Arrow */}
      <button 
        onClick={() => document.querySelector('main')?.scrollBy({ left: -window.innerWidth, behavior: 'smooth' })}
        className="absolute left-8 bottom-1/2 translate-y-1/2 flex flex-col items-center gap-4 animate-pulse text-[#39d353] hover:text-white transition-colors cursor-pointer border-none bg-transparent"
        aria-label="Scroll back to Hero"
      >
        <ArrowLeft className="w-8 h-8" />
        <span className="font-mono text-sm font-bold uppercase -rotate-90 tracking-widest whitespace-nowrap mt-4">Back</span>
      </button>
    </section>
  );
}
