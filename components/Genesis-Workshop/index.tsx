"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, stagger } from "animejs";
import { ArrowLeft, Terminal, GitPullRequest, ShieldCheck, Cpu } from "lucide-react";
import { RotatingBitcoin } from "./rotating-bitcoin";
import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import Image from "next/image";
import BtrustLogo from "@/app/assets/Btrust-white.png";
import AbdulImg from "@/app/assets/Abdul.png";
import BrunoImg from "@/app/assets/Bruno.png";
import MegasleyImg from "@/app/assets/Megasley.png";
import SadiqImg from "@/app/assets/Sadiq.jpg";

export function GenesisWorkshop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll(".animate-item");
    if (elements && elements.length > 0) {
      animate(elements, {
        translateY: [50, 0],
        opacity: [0, 1],
        delay: stagger(150, { start: 100 }),
        easing: "easeOutExpo",
        duration: 800,
      });
    }
  }, []);

  const handleHover = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      translateY: -4,
      boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)",
      duration: 200,
      easing: "easeOutQuad",
    });
  };

  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      translateY: 0,
      boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
      duration: 200,
      easing: "easeOutQuad",
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#010409] font-(family-name:--font-source-code-pro) text-white selection:bg-[#39d353] selection:text-black"
    >
      {/* Perspective Grid Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <PerspectiveGrid gridSize={40} fadeRadius={95} />
      </div>

      {/* Navigation */}
      <nav className="animate-item sticky top-0 z-50 flex items-center justify-between border-b-[3px] border-black bg-[#0d1117] p-4 shadow-[0_4px_0_0_#000]">
        <Link
          href="/"
          className="flex items-center gap-2 border-[2px] border-transparent p-2 text-[#8b949e] transition-colors hover:border-black hover:bg-[#161b22] hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-bold uppercase tracking-wider">Back</span>
        </Link>
        {/* <div className="border-[3px] border-black bg-[#39d353] px-3 py-1 font-black uppercase text-black shadow-[2px_2px_0px_0px_#000]">
          Cohort 001
        </div> */}
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-24">
        <header className="animate-item mb-16 md:mb-24 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <div className="mb-6 inline-block border-[3px] border-black bg-[#161b22] px-4 py-2 font-black uppercase tracking-widest text-[#f85149] shadow-[4px_4px_0px_0px_#000]">
              2 Epoch workshop
            </div>
            <h1 className="mb-6 max-w-4xl text-4xl font-black uppercase leading-none tracking-tighter text-white sm:text-6xl md:text-8xl">
              THE <br />
              <span className="text-[#39d353]">GENESIS</span> WORKSHOP
            </h1>
            <div className="max-w-1xl border-l-[4px] border-[#39d353] pl-4 text-sm font-medium text-[#8b949e] sm:text-base md:text-lg">
              <p className={`transition-all ${isTextExpanded ? "" : "line-clamp-3 md:line-clamp-none"}`}>
                The Genesis Workshop is a hands-on Bitcoin and open-source workshop organized by OSGuild in collaboration with BitDevs Mauritius 🇲🇺. It is designed to introduce new contributors to open-source culture, Bitcoin technology, and real-world contribution pathways through practical breakout sessions led by experienced engineers. Genesis serves as the entry point into a long-term builder ecosystem focused on learning, contribution, and career development in open source.
              </p>
              <button
                onClick={() => setIsTextExpanded(!isTextExpanded)}
                className="mt-2 text-xs font-bold uppercase tracking-wider text-[#39d353] hover:text-white md:hidden transition-colors cursor-pointer border-none bg-transparent"
              >
                {isTextExpanded ? "Show less" : "Show complete text"}
              </button>
            </div>
          </div>

          <div className="hidden md:block shrink-0">
            <RotatingBitcoin />
          </div>
        </header>

        {/* System Flow / Pipeline */}
        <section className="animate-item mb-16 md:mb-24">
          <h2 className="mb-8 inline-block border-b-[4px] border-[#39d353] text-2xl font-black uppercase tracking-tighter sm:text-3xl">
            Workshop Core
          </h2>
          <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
            {[
              { step: "01", title: "FOSS Culture", icon: <Terminal className="h-6 w-6" />, desc: "Introduction to open-source culture and the technical foundations of the Bitcoin ecosystem." },
              { step: "02", title: "Breakouts", icon: <Cpu className="h-6 w-6" />, desc: "Hands-on, practical engineering sessions led by experienced Bitcoin contributors." },
              { step: "03", title: "Pathways", icon: <GitPullRequest className="h-6 w-6" />, desc: "Navigate actual codebases, open issues, and real-world contribution workflows." },
              { step: "04", title: "Ecosystem", icon: <ShieldCheck className="h-6 w-6" />, desc: "Enter a long-term builder network focused on continuous learning and career development." }
            ].map((item, idx) => (
              <div
                key={item.step}
                className="group relative flex flex-1 flex-col border-[3px] border-black bg-[#0d1117] p-6 shadow-[4px_4px_0px_0px_#000] transition-colors hover:bg-[#161b22]"
              >
                {/* Connector line for desktop */}
                {idx !== 3 && (
                  <div className="absolute right-[-14px] top-1/2 z-10 hidden h-[3px] w-6 -translate-y-1/2 bg-black md:block" />
                )}
                {/* Connector line for mobile */}
                {idx !== 3 && (
                  <div className="absolute bottom-[-14px] left-8 z-10 block h-6 w-[3px] bg-black md:hidden" />
                )}

                <div className="mb-4 flex items-center justify-between text-[#8b949e] group-hover:text-[#39d353]">
                  <span className="font-black text-xl">{item.step}</span>
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-black uppercase text-white">{item.title}</h3>
                <p className="text-sm text-[#8b949e]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Tenets */}
        <section className="animate-item mb-24">
          <h2 className="mb-8 inline-block border-b-[4px] border-[#f85149] text-2xl font-black uppercase tracking-tighter sm:text-3xl">
            Core Tenets
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="border-[3px] border-black bg-[#161b22] p-8 shadow-[6px_6px_0px_0px_#f85149]">
              <h3 className="mb-4 text-xl font-black uppercase">Don&apos;t Trust. Verify.</h3>
              <p className="text-sm text-[#8b949e]">
                Every line of code you read and write must be scrutinized. We teach how to audit dependencies and validate network assumptions.
              </p>
            </div>
            <div className="border-[3px] border-black bg-[#161b22] p-8 shadow-[6px_6px_0px_0px_#39d353]">
              <h3 className="mb-4 text-xl font-black uppercase">Read &gt; Write</h3>
              <p className="text-sm text-[#8b949e]">
                Great contributors read 10x more code than they write. You will spend hours dissecting PRs before pushing your first commit.
              </p>
            </div>
            <div className="border-[3px] border-black bg-[#161b22] p-8 shadow-[6px_6px_0px_0px_#000] md:col-span-2 lg:col-span-1">
              <h3 className="mb-4 text-xl font-black uppercase">Persistent Context</h3>
              <p className="text-sm text-[#8b949e]">
                Master the git history. Understanding why a decision was made in 2014 is crucial for proposing a change today.
              </p>
            </div>
          </div>
        </section>

        {/* Speakers Section */}
        <section className="animate-item mb-24">
          <h2 className="mb-8 inline-block border-b-[4px] border-white text-2xl font-black uppercase tracking-tighter sm:text-3xl text-white">
            Speakers
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              // { name: "Abdul", img: AbdulImg, role: "Bitcoin Engineer" },
              { name: "Bruno", img: BrunoImg, role: "Core Contributor" },
              // { name: "Megasley", img: MegasleyImg, role: "FOSS Developer" },
              { name: "Sadiq", img: SadiqImg, role: "Protocol Engineer" },
            ].map((speaker) => (
              <div
                key={speaker.name}
                className="group relative flex flex-col border-[3px] border-black bg-[#161b22] shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#39d353]"
              >
                <div className="relative aspect-square w-full border-b-[3px] border-black bg-[#0d1117] overflow-hidden grayscale transition-all group-hover:grayscale-0">
                  <Image
                    src={speaker.img}
                    alt={speaker.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="w-full p-4 text-left">
                  <h3 className="mb-1 text-xl font-black uppercase text-white">{speaker.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#8b949e] transition-colors group-hover:text-[#39d353]">{speaker.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sponsors */}
        <section className="animate-item mb-24">
          <div className="flex flex-col items-center">
            <h2 className="mb-12 inline-block border-b-[4px] border-[#8b949e] text-2xl font-black uppercase tracking-tighter sm:text-3xl text-white">
              Supported By
            </h2>
            <div className="flex w-full max-w-sm justify-center">
              <div className="group relative flex aspect-[2/1] w-full cursor-pointer items-center justify-center border-[3px] border-black bg-[#0d1117] p-8 shadow-[4px_4px_0px_0px_#000] transition-all hover:-translate-y-1 hover:bg-[#161b22] hover:shadow-[6px_6px_0px_0px_#39d353]">
                <Image
                  src={BtrustLogo}
                  alt="Btrust"
                  fill
                  className="object-contain p-8 opacity-80 transition-opacity group-hover:opacity-100"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="animate-item mb-24">
          <h2 className="mb-8 inline-block border-b-[4px] border-[#39d353] text-2xl font-black uppercase tracking-tighter sm:text-3xl text-white">
            Location
          </h2>
          <div className="border-[3px] border-black bg-[#161b22] p-8 shadow-[6px_6px_0px_0px_#39d353]">
            <h3 className="mb-2 text-2xl font-black uppercase text-white">Workshop17 Mauritius 🇲🇺</h3>
            <p className="text-lg text-[#8b949e] font-medium">
              Join us in person for an immersive, hands-on engineering experience.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="animate-item flex flex-col items-center border-[4px] border-black bg-[#39d353] p-8 text-center shadow-[12px_12px_0px_0px_#000] sm:p-16 md:p-24">
          <h2 className="mb-6 max-w-3xl text-3xl font-black uppercase leading-tight tracking-tighter text-black sm:text-5xl md:text-6xl">
            Bitcoin needs thoughtful contributors.
          </h2>
          <p className="mb-10 max-w-xl text-sm font-bold text-black/80 sm:text-base md:text-lg">
            This isn&apos;t a bootcamp to learn basic web dev. This is a proving ground for engineers ready to maintain the most critical network on earth.
          </p>
          <Link
            href="/genesis-workshop/form"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="block border-[4px] border-black bg-white px-8 py-5 text-lg font-black uppercase text-black shadow-[4px_4px_0px_0px_#000] transition-colors hover:bg-gray-100 sm:text-xl"
          >
            Apply to Workshop
          </Link>
        </section>
      </main>
    </div >
  );
}

export default GenesisWorkshop;
