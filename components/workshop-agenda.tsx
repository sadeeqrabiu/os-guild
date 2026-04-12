"use client";

import React, { useEffect, useRef } from "react";
import { X, Clock, Mic, MessageSquare, Flag, ArrowLeft } from "lucide-react";
import { animate, stagger } from "animejs";
import Link from "next/link";

interface AgendaItem {
  timeWAT: string;
  timeMUT: string;
  speaker: string;
  role: string;
  session: string;
  duration: string;
  focus: string[];
  outcome?: string;
  icon: React.ElementType;
}

const agenda: AgendaItem[] = [
  {
    timeWAT: "5:00 – 5:10 PM",
    timeMUT: "8:00 – 8:10 PM",
    speaker: "Sadiq",
    role: "Guild Master",
    session: "The Shift: From Contribution Speed to Contribution Integrity",
    duration: "10 mins",
    focus: [
      "AI removed barriers to writing code, not contributing meaningfully",
      "The bottleneck is now review, trust, and maintenance",
      "Core standard: Disclose → Understand → Verify → Own",
    ],
    icon: Flag,
  },
  {
    timeWAT: "5:10 – 5:30 PM",
    timeMUT: "8:10 – 8:30 PM",
    speaker: "Megasley",
    role: "MD Africa Free Routing",
    session: "The New Contribution Standard: What Projects Expect in 2026",
    duration: "20 mins",
    focus: [
      "Rise of AI-generated pull requests and maintainer fatigue",
      "Shift from volume to accountability",
      "Disclose AI usage → Understand deeply → Verify through testing → Own fully",
    ],
    outcome: "Clear definition of what \"acceptable contribution\" means today",
    icon: Mic,
  },
  {
    timeWAT: "5:30 – 5:50 PM",
    timeMUT: "8:30 – 8:50 PM",
    speaker: "Bruno Bernard",
    role: "CTO @ OSGuild",
    session: "New Contributors in the AI Era: Where You Actually Win",
    duration: "20 mins",
    focus: [
      "AI replaces shallow contributions, not contributors",
      "High-leverage entry points: Documentation, Testing, Bug reproduction, Issue clarification",
      "Strategy: Focus on one project, build context, deliver consistent correct contributions",
    ],
    outcome: "A clear path for beginners to become valuable",
    icon: Mic,
  },
  {
    timeWAT: "5:50 – 6:10 PM",
    timeMUT: "8:50 – 9:10 PM",
    speaker: "Abdullahi",
    role: "Software Engineer & OSC",
    session: "Maintainer Reality: Scaling Trust in an AI-Accelerated World",
    duration: "20 mins",
    focus: [
      "Increase in low-quality AI-generated submissions",
      "Rejected: Lack of understanding, no testing, generic contributions",
      "Accepted: Clear reasoning, strong validation, respect for project standards",
    ],
    outcome: "Understanding how maintainers evaluate contributions",
    icon: Mic,
  },
  {
    timeWAT: "6:10 – 6:25 PM",
    timeMUT: "9:10 – 9:25 PM",
    speaker: "Sadiq",
    role: "Guild Master",
    session: "From First PR to Trusted Contributor",
    duration: "15 mins",
    focus: [
      "How to build trust quickly in a project",
      "When and how to disclose AI usage",
      "Difference between getting a PR merged vs becoming respected",
      "How communities should enforce standards",
    ],
    icon: MessageSquare,
  },
  {
    timeWAT: "6:25 – 6:30 PM",
    timeMUT: "9:25 – 9:30 PM",
    speaker: "Sadiq",
    role: "Guild Master",
    session: "The Contributor You Need to Become",
    duration: "5 mins",
    focus: [
      "AI is leverage, not identity",
      "Open source is now trust-based",
      "Think clearly → Verify deeply → Communicate well → Take ownership",
    ],
    outcome:
      "Contribution is no longer about how fast you produce — it is about how confidently you stand behind what you submit",
    icon: Flag,
  },
];

interface WorkshopAgendaProps {
  onClose?: () => void;
}

export function WorkshopAgenda({ onClose }: WorkshopAgendaProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate cards staggering in
    const cards = contentRef.current?.querySelectorAll(".agenda-card");
    if (cards && cards.length > 0) {
      animate(cards, {
        translateY: [40, 0],
        opacity: [0, 1],
        delay: stagger(80, { start: 200 }),
        easing: "easeOutCubic",
        duration: 500,
      });
    }
  }, []);

  return (
    <div
      ref={contentRef}
      className="w-full max-w-3xl bg-[#0d1117] border-[3px] border-black shadow-[8px_8px_0px_0px_#39d353]"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-[#161b22] border-b-[3px] border-black p-5 md:p-6">
        <div>
          <div className="inline-block bg-[#238636] border-[2px] border-black px-3 py-1 mb-3 shadow-[2px_2px_0px_0px_#000] -rotate-1">
            <span className="text-xs font-black uppercase tracking-wider text-white">
              Workshop Agenda
            </span>
          </div>
          <h2 className="text-lg md:text-xl font-black text-white uppercase leading-tight">
            Open Source in 2026: AI, Discipline, and the New Contribution
            Standard
          </h2>
          <div className="flex flex-wrap gap-3 mt-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#39d353] bg-[#0d1117] border border-black/50 px-2 py-1">
              <Clock className="w-3 h-3" />
              🇳🇬 WAT 5:00 – 6:30 PM
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#39d353] bg-[#0d1117] border border-black/50 px-2 py-1">
              <Clock className="w-3 h-3" />
              🇲🇺 MUT 8:00 – 9:30 PM
            </span>
          </div>
        </div>

        {/* Close / Back button */}
        {onClose ? (
          <button
            onClick={onClose}
            className="shrink-0 flex items-center justify-center w-10 h-10 bg-[#da3633] border-[2px] border-black text-white shadow-[2px_2px_0px_0px_#000] transition-colors hover:bg-[#f85149]"
          >
            <X className="h-5 w-5" />
          </button>
        ) : (
          <Link
            href="/"
            className="shrink-0 flex items-center gap-2 bg-[#161b22] border-[2px] border-black px-3 py-2 text-xs font-black uppercase text-[#c9d1d9] shadow-[2px_2px_0px_0px_#000] transition-colors hover:bg-[#238636] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        )}
      </div>

      {/* Intro */}
      <div className="px-5 md:px-6 pt-5 pb-2">
        <p className="text-sm text-[#c9d1d9] leading-relaxed border-l-[3px] border-[#39d353] pl-4">
          AI has dramatically increased the speed of contribution, but it has
          also raised the standard for what counts as meaningful work. This
          workshop explores how contributors must evolve: from simply producing
          code to understanding, verifying, and owning their work.
        </p>
      </div>

      {/* Timeline */}
      <div className="px-5 md:px-6 py-4 space-y-3">
        {agenda.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="agenda-card bg-[#161b22] border-[2px] border-black/60 shadow-[3px_3px_0px_0px_#000] transition-transform hover:-translate-y-0.5"
              style={{ opacity: 0 }}
            >
              {/* Time bar */}
              <div className="flex items-center justify-between gap-2 px-4 py-2 bg-[#0d1117] border-b border-black/40">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[10px] font-bold text-[#39d353] uppercase tracking-wide">
                    🇳🇬 {item.timeWAT}
                  </span>
                  <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wide">
                    🇲🇺 {item.timeMUT}
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase text-[#484f58] bg-black/40 px-2 py-0.5 border border-black/30">
                  {item.duration}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center justify-center w-7 h-7 bg-[#238636] border-[1.5px] border-black rounded-full shrink-0">
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-black text-white uppercase">
                      {item.speaker}
                    </span>
                    <span className="text-[10px] font-bold text-[#8b949e] ml-2">
                      {item.role}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-black text-[#c9d1d9] mb-3 leading-snug">
                  &ldquo;{item.session}&rdquo;
                </h3>

                <ul className="space-y-1.5 mb-2">
                  {item.focus.map((point, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-xs text-[#8b949e]"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 shrink-0 bg-[#39d353] border border-black/50 rounded-full" />
                      {point}
                    </li>
                  ))}
                </ul>

                {item.outcome && (
                  <div className="mt-3 pt-2 border-t border-black/30">
                    <p className="text-xs font-bold text-[#39d353]">
                      <span className="text-[#8b949e] mr-1">✦ Outcome:</span>{" "}
                      {item.outcome}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-5 md:px-6 py-5 bg-[#161b22] border-t-[3px] border-black">
        <p className="text-xs text-[#8b949e] font-bold text-center uppercase tracking-wide">
          In this new era, contribution is no longer about how fast you produce.
          <br />
          <span className="text-[#39d353]">
            It is about how confidently you stand behind what you submit.
          </span>
        </p>
      </div>
    </div>
  );
}
