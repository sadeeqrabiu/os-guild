"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import SadiqAvatar from "@/app/assets/Sadiq.jpg";

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

  const handleButtonHover = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      scale: 1.05,
      rotate: "2deg",
      boxShadow: "12px 12px 0px 0px rgba(0,0,0,1)",
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      scale: 1,
      rotate: "0deg",
      boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)",
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  const handleButtonDown = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      scale: 0.95,
      translateY: 4,
      translateX: 4,
      boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)",
      duration: 100,
      easing: "easeOutQuad",
    });
  };

  const handleButtonUp = (e: React.MouseEvent<HTMLElement>) => {
    handleButtonHover(e);
  };

  return (
    <section className="relative w-screen h-screen shrink-0 snap-center flex flex-col justify-center bg-[#010409] py-16 px-4 sm:px-12 md:py-24 md:px-16 border-l-[3px] border-black border-dashed overflow-y-auto overflow-x-hidden" ref={containerRef}>
      <div className="w-full max-w-5xl mx-auto">
        <div className="animate-item bg-[#238636] border-[3px] border-black inline-block px-4 py-2 mb-6 shadow-[4px_4px_0px_0px_#000] -rotate-2">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Workshop
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          <div className="animate-item w-full md:w-2/3 flex-1 bg-[#0d1117] border-[3px] border-black p-5 sm:p-8 md:p-12 shadow-[6px_6px_0px_0px_#39d353] md:shadow-[12px_12px_0px_0px_#39d353] relative z-10 transition-colors">
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-12 h-12 md:w-16 md:h-16 bg-[#39d353] border-[3px] border-black rounded-full shadow-[4px_4px_0px_0px_#000] flex items-center justify-center">
              <span className="text-black font-black text-xl md:text-2xl rotate-12">!</span>
            </div>

            <p className="text-[#39d353] font-bold uppercase tracking-wider border-2 border-black inline-block px-2 py-1 bg-[#161b22] mb-4 text-xs sm:text-sm shadow-[2px_2px_0px_0px_#000]">
              Upcoming Event
            </p>

            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase mb-4 leading-tight">
              Open Source In 2026: AI, Discipline, and the New Contributor Standard
            </h3>

            <p className="text-sm sm:text-base md:text-lg text-[#c9d1d9] font-medium mb-8 border-l-4 border-[#39d353] pl-4 py-1">
              This workshop focuses on how to help developers understand how to get started with open source the right way. You’ll learn how to navigate real codebases, contribute effectively, and move from learning to making meaningful contributions.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-[#161b22] border-[3px] border-black p-4 md:p-5 shadow-[4px_4px_0px_0px_#000] md:shadow-[6px_6px_0px_0px_#000] transform hover:-translate-y-1 transition-transform">
                <div>
                  <p className="text-xs font-black uppercase text-[#8b949e] mb-1">Date</p>
                  <p className="text-lg md:text-xl font-black text-white uppercase mb-2">April 15, 2026</p>
                </div>
                <p className="text-xs md:text-sm font-bold border-t-2 border-black/50 border-dashed pt-2 mt-2 text-[#c9d1d9]">20:00 (GMT+4)</p>
              </div>

              <div className="bg-[#161b22] border-[3px] border-black p-4 md:p-5 shadow-[4px_4px_0px_0px_#000] md:shadow-[6px_6px_0px_0px_#000] transform hover:-translate-y-1 transition-transform">
                <div>
                  <p className="text-xs font-black uppercase text-[#8b949e] mb-1">Type</p>
                  <p className="text-lg md:text-xl font-black text-white uppercase mb-2">Build Session</p>
                </div>
                <p className="text-xs md:text-sm font-bold border-t-2 border-black/50 border-dashed pt-2 mt-2 text-[#c9d1d9]">Intensive & Hands-on</p>
              </div>
            </div>

            <a
              href="https://app.evento.so/e/evt_Ppvv9rvexKXTWhFc"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onMouseDown={handleButtonDown}
              onMouseUp={handleButtonUp}
              className="w-full sm:w-auto block text-center bg-[#39d353] text-black font-black uppercase text-base md:text-xl px-6 md:px-12 py-3 md:py-5 border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-[#238636]"
            >
              Sign Up For Workshop
            </a>
          </div>

          <div className="animate-item w-full md:w-1/3 flex flex-col gap-6 mt-4 md:mt-0">
            <div className="inline-block border-b-[4px] border-[#39d353] pb-2">
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
                Line Up
              </h3>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 shrink-0 bg-[#39d353] rounded-full flex items-center justify-center border-[3px] border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
                  <Image src={SadiqAvatar} alt="Sadiq" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-white uppercase leading-none mb-1">Sadiq Rabiu</h4>
                  <p className="text-[#8b949e] font-bold uppercase text-xs md:text-sm">Guild Master @ OS-Guild</p>
                </div>
              </div>

              {/* Optional: Add more speakers here in the exact same format later */}
            </div>
          </div>
        </div>
      </div>

      {/* Blinking Scroll Back Arrow */}
      <button
        onClick={() => document.querySelector('main')?.scrollBy({ left: -window.innerWidth, behavior: 'smooth' })}
        className="absolute left-4 bottom-8 md:bottom-1/2 md:left-8 md:translate-y-1/2 flex flex-col items-center gap-4 animate-pulse text-[#39d353] hover:text-white transition-colors cursor-pointer border-none bg-transparent"
        aria-label="Scroll back to Hero"
      >
        <ArrowLeft className="w-8 h-8" />
        <span className="font-mono text-sm font-bold uppercase -rotate-90 md:-rotate-90 tracking-widest whitespace-nowrap hidden md:block mt-4">Back</span>
      </button>
    </section>
  );
}
