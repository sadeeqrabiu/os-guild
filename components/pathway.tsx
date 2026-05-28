"use client";

import { Award, CheckCircle, Flame, GitBranch, Key, ShieldCheck, Zap } from "lucide-react";

export function Pathway() {
  const WEEK_STEPS = [
    {
      week: 1,
      title: "Orientation & Keybinding",
      desc: "Link GitHub credentials and Nostr cryptographic signatures to synchronize your local workspace sessions.",
      icon: Key,
      badge: "Completed on mount",
    },
    {
      week: 2,
      title: "Git Codeflows & Review Rigor",
      desc: "Master production branch lifecycles, pull request standards, and FOSS peer-review mechanics.",
      icon: GitBranch,
      badge: "Completed",
    },
    {
      week: 3,
      title: "Contribution Sprints",
      desc: "Submit your first pull requests in active featured repositories and earn initial claimable Sats incentives.",
      icon: Zap,
      badge: "Completed",
    },
    {
      week: 4,
      title: "Active Team Sprints",
      desc: "Collaborate inside developer cohort groups. Focus on active FOSS Projects.",
      icon: Flame,
      badge: "Active Stage",
      isActive: true,
    },
    {
      week: 5,
      title: "Core Preparedness",
      desc: "Prepare for graduation reviews.",
      icon: ShieldCheck,
      badge: "Upcoming",
    },
    {
      week: 6,
      title: "Graduation & Badging",
      desc: "Receive your NIP-07 verified cryptographic certificate badge and join the core maintainer pool.",
      icon: Award,
      badge: "Upcoming",
    },
  ];

  return (
    <section id="pathway" className="py-20 px-6 bg-[#0d1117] border-t-[3px] border-b-[3px] border-black">
      <div className="mx-auto max-w-5xl space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-[3px] border-black pb-6 gap-4">
          <div>
            <span className="font-mono text-xs font-black uppercase text-[#39d353] tracking-widest block mb-2">
              CURRICULUM ROADMAP
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
              The 6-Week Pathway
            </h2>
          </div>
          <span className="font-mono text-xs text-[#39d353] font-black border-2 border-black bg-[#238636]/15 px-3 py-1 shadow-[2px_2px_0px_0px_#000]">
            ACTIVE TRACK &bull; GENESIS COHORT 2026
          </span>
        </div>

        {/* Vertical Neo-Brutalist Milestones Timeline */}
        <div className="relative pl-8 sm:pl-12 border-l-4 border-black/50 space-y-12">
          {WEEK_STEPS.map((step) => {
            const IconComponent = step.icon;
            return (
              <div key={step.week} className="relative group">
                
                {/* Milestone Node */}
                <div className={`absolute -left-[54px] sm:-left-[70px] flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center border-[3px] border-black font-mono text-sm sm:text-base font-black shadow-[2px_2px_0px_0px_#000] z-10 transition-transform group-hover:scale-105 ${
                  step.isActive 
                    ? "bg-[#39d353] text-black animate-pulse" 
                    : step.badge === "Upcoming"
                    ? "bg-[#161b22] text-[#8b949e]"
                    : "bg-[#238636] text-black"
                }`}>
                  {step.week}
                </div>

                {/* Milestone Details Card */}
                <div className={`border-[3px] border-black bg-[#010409] p-5 sm:p-6 shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#238636] hover:border-[#39d353]/30 transition-all ${
                  step.isActive ? "border-[#39d353] shadow-[4px_4px_0px_0px_#39d353]/30" : ""
                }`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                    <h3 className="text-lg sm:text-xl font-black text-white uppercase flex items-center gap-2">
                      <IconComponent className={`h-5 w-5 ${step.isActive ? "text-[#39d353]" : "text-[#8b949e]"}`} />
                      {step.title}
                    </h3>
                    
                    {/* Step Status Badge */}
                    <span className={`font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border-2 ${
                      step.isActive
                        ? "border-[#39d353] bg-[#238636]/10 text-[#39d353]"
                        : step.badge === "Upcoming"
                        ? "border-[#30363d] bg-black/40 text-[#8b949e]"
                        : "border-[#238636] bg-[#238636]/15 text-[#39d353]"
                    }`}>
                      {step.badge}
                    </span>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed max-w-3xl">
                    {step.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
