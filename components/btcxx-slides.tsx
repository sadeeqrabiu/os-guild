"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  Terminal, 
  Cpu, 
  GitPullRequest, 
  ShieldCheck, 
  Activity, 
  Play, 
  RotateCcw,
  Check,
  AlertTriangle,
  Code,
  Flame,
  BookOpen,
  Users,
  Layers,
  HelpCircle,
  Menu
} from "lucide-react";

// Slide Data
const SLIDES = [
  {
    title: "Opening",
    headline: "The Cognitive Cost of AI-Assisted Open Source",
    subtitle: "Generating code is no longer the hard part. Understanding it is.",
    speakerNotes: "Goal: Create immediate curiosity and tension. Acknowledge that the developer workflow has fundamentally changed. Today, anyone can generate code instantly. We are flooded with tools that write, debug, and explain code for us. But the bottleneck in software engineering—especially in open source—has shifted. Writing code is cheap. Comprehending, maintaining, and standing behind that code is now the real challenge.",
    goal: "Create curiosity and set the presentation tone."
  },
  {
    title: "Golden Age",
    headline: "Open Source Has Never Been More Accessible",
    subtitle: "Accessibility is good. We should celebrate it.",
    points: [
      "AI agents explain legacy, unfamiliar codebases in seconds.",
      "Drafting complex pull requests takes only a single prompt.",
      "The initial barrier to entry for new contributors has vanished.",
      "Everyone is a 10x engineer now (or so they think)."
    ],
    speakerNotes: "Goal: Celebrate the accessibility of open source today. Do not start as an anti-AI luddite; validate the benefits first. We should celebrate this accessibility. It allows developers from underrepresented backgrounds or new languages to get their feet wet. Explanations are instant, boilerplate is handled. But this ease of production hides a fundamental trap.",
    goal: "Acknowledge the benefits of AI in increasing accessibility."
  },
  {
    title: "The Shift",
    headline: "When Contribution Becomes Cheap, Understanding Becomes Rare",
    subtitle: "The Review Paradox: PR volume scales, while active review capacity flatlines.",
    quote: {
      text: "Easy choices, hard life. Hard choices, easy life.",
      author: "Jerzy Gregorek"
    },
    speakerNotes: "Goal: Introduce the central conflict: the dilution of review and deep code ownership. When writing code is difficult, you naturally write less of it, and you review it carefully because it took hours of manual concentration. When code becomes a commodity that can be generated in seconds, we dump high-volume, low-context contributions on maintainers, offloading our cognitive effort onto them.",
    goal: "Introduce tension around PR velocity vs. review quality."
  },
  {
    title: "Offloading",
    headline: "Humans Have Always Outsourced Thinking",
    subtitle: "AI is the first tool that attempts to outsource reasoning itself.",
    timeline: [
      { tool: "Writing", replaced: "Human memory recall" },
      { tool: "Calculators", replaced: "Manual mental arithmetic" },
      { tool: "GPS Navigation", replaced: "Spatial mapping & directions" },
      { tool: "Search Engines", replaced: "Encyclopedic fact retrieval" },
      { tool: "AI Assistants", replaced: "Logical deduction & reasoning", highlight: true }
    ],
    speakerNotes: "Goal: Place AI in historical context. Show that while offloading memory or math is safe, offloading reasoning changes the nature of human agency. Outsourcing our memory to books or navigation to GPS didn't destroy our capacity to build. But AI is different. It is the first tool that touches reasoning itself. When we outsource reasoning about our code, we stop building the mental models required to debug it when it breaks.",
    goal: "Situate AI reasoning within the history of cognitive offloading."
  },
  {
    title: "Hidden Cost",
    headline: "The Brain Only Learns Through Effort",
    subtitle: "Psychological friction is the mechanism that builds long-term mental models.",
    quote: {
      text: "What we obtain too cheap, we esteem too lightly.",
      author: "Thomas Paine"
    },
    speakerNotes: "Goal: Explain the cognitive psychology of coding. Explain why instant explanations from AI often lead to shallow learning. If you ask an AI to explain a complex Rust module, it gives you a clean paragraph. You read it and feel like you understand. But because your brain encountered no friction—no confusion, no hunting through files, no wrestling with syntax—it constructs no long-term memory. You did not actually learn it; you just rented the understanding.",
    goal: "Explain why 'frictionless' tools lead to superficial retention."
  },
  {
    title: "Bitcoin Way",
    headline: "Bitcoin Optimizes For Safety, Not Speed",
    subtitle: "Move slowly and don't break things.",
    points: [
      "In Bitcoin, a single consensus mistake can cost millions.",
      "Slow, methodical peer review is a critical feature, not a bug.",
      "Bugs have structural consensus consequences.",
      "Security requires extreme caution over shipping velocity."
    ],
    speakerNotes: "Goal: Ground the talk in Bitcoin's unique culture and requirements. In web development, shipping a bug means you push a hotfix 10 minutes later. In Bitcoin, bugs can partition the network, lock up millions of dollars, or destroy trust in the protocol. We cannot afford to write code we don't fully understand, and we cannot afford to review code with a casual glance.",
    goal: "Contrast Bitcoin's security-first culture with startup shipping culture."
  },
  {
    title: "Shallow Code",
    headline: "Can You Maintain What You Didn't Understand?",
    subtitle: "The Contributor Iceberg: Generating syntax vs. knowing the system.",
    quote: {
      text: "Code is read more often than it is written.",
      author: "Guido van Rossum"
    },
    speakerNotes: "Goal: Highlight the long-term risk of low-context contributions. If you submit a pull request where the syntax is correct but you don't understand the underlying system design, who maintains it? If the AI model disappears tomorrow, are you still capable of fixing, securing, and defending the code you just merged?",
    goal: "Prompt self-reflection on the maintenance capacity of creators."
  },
  {
    title: "Responsible Use",
    headline: "The Problem Is Not AI",
    subtitle: "It is our relationship to responsibility, review, and verification.",
    speakerNotes: "Goal: Offer a balanced, constructive path forward. Show how to use AI responsibly. AI is an incredible tool. It can act as a tireless tutor, explaining functions and helping you write edge-case tests. But the moment you let the AI sign off on code correctness, or the moment you submit code you can't manually verify line-by-line, you have abdicated your responsibility as an engineer.",
    goal: "Outline where AI is beneficial vs. where it is highly dangerous."
  },
  {
    title: "Integrity",
    headline: "Open Source Needs Thinkers, Not Prompt Operators",
    subtitle: "The Contribution Integrity Manifesto:",
    points: [
      "Read before you generate: Study the codebase manually.",
      "Verify before you merge: Never submit code you can't explain.",
      "Own the outcome: You, not the model, are responsible for bugs.",
      "Value review capacity: Respect the time and attention of maintainers."
    ],
    speakerNotes: "Goal: Establish a clear code of conduct for modern FOSS contributors. We need to transition from prompt operators to deep thinkers. Open source has always been about peer review and collaboration. AI should help us participate in that dialogue, not replace the human-to-human trust that forms the foundation of the ecosystem.",
    goal: "Define concrete guidelines for contribution integrity."
  },
  {
    title: "Closing",
    headline: "Generating Code Is No Longer The Hard Part",
    subtitle: "In the age of AI, contribution integrity matters far more than velocity.",
    quote: {
      text: "The real problem is not whether machines think but whether men do.",
      author: "B. F. Skinner"
    },
    speakerNotes: "Goal: Leave the audience with a profound sense of responsibility. As you leave today and return to your IDEs, ask yourself: Are you using AI to expand your mind and think deeper, or are you using it to avoid thinking altogether? The future of Bitcoin depends on our answer. Thank you.",
    goal: "Conclude with the core takeaway of human responsibility."
  }
];

export function BtcxxSlides() {
  const [slide, setSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(true);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        setSlide((prev) => Math.min(prev + 1, SLIDES.length - 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSlide((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const nextSlide = () => setSlide((prev) => Math.min(prev + 1, SLIDES.length - 1));
  const prevSlide = () => setSlide((prev) => Math.max(prev - 1, 0));

  return (
    <div className="relative min-h-screen w-full bg-[#010409] font-mono text-white selection:bg-[#39d353] selection:text-black overflow-hidden flex flex-col md:flex-row">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#39d353]/3 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main Slides Display Container */}
      <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 md:p-8 z-10 min-w-0">
        
        {/* Navigation Header */}
        <header className="flex items-center justify-between border-b-[3px] border-black bg-[#0d1117] p-4 shadow-[4px_4px_0_0_#000] mb-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 border-[2px] border-transparent px-2.5 py-1 text-[#8b949e] hover:border-black hover:bg-[#161b22] hover:text-white transition-all text-xs font-bold uppercase rounded-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>OSGUILD</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#8b949e] font-black uppercase">
              BTC++ Talk <span className="text-[#39d353]">Slide {slide + 1}/{SLIDES.length}</span>
            </span>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="flex items-center gap-1.5 border-[2px] border-black bg-[#161b22] px-3 py-1 text-xs font-black uppercase text-[#39d353] hover:bg-white hover:text-black transition-all shadow-[2px_2px_0_0_#000] cursor-pointer"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>{showNotes ? "Hide Notes" : "Show Notes"}</span>
            </button>
          </div>
        </header>

        {/* Dynamic Slide Viewport */}
        <div className="flex-1 flex flex-col justify-center items-center py-4 md:py-8 max-w-4xl mx-auto w-full">
          <div className="w-full border-[4px] border-black bg-[#0d1117] p-6 sm:p-8 md:p-12 shadow-[8px_8px_0_0_#000] relative overflow-hidden transition-all duration-300">
            {/* Slide decoration corners */}
            <div className="absolute top-0 right-0 w-12 h-[3px] bg-[#39d353]" />
            <div className="absolute top-0 right-0 w-[3px] h-12 bg-[#39d353]" />
            <div className="absolute bottom-0 left-0 w-8 h-[3px] bg-[#f85149]" />

            {/* Slide Title Tag */}
            <div className="mb-4 inline-flex items-center gap-2 border-[2px] border-black bg-[#161b22] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#39d353] shadow-[2px_2px_0_0_#000]">
              <Activity className="h-3 w-3 text-[#39d353]" />
              Slide {slide + 1}: {SLIDES[slide].title.toUpperCase()}
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-6 leading-tight select-none">
              {SLIDES[slide].headline}
            </h1>

            {/* Slide Subtitle */}
            <p className="text-sm sm:text-base text-[#8b949e] border-l-4 border-[#39d353] pl-4 mb-8 font-medium leading-relaxed max-w-3xl">
              {SLIDES[slide].subtitle}
            </p>

            {/* Dynamic Embedded Visual Interactive Modules */}
            <div className="mt-8 border-t-[2px] border-black border-dashed pt-8 w-full">
              {slide === 0 && <Slide1Interactive />}
              {slide === 1 && <Slide2Points points={SLIDES[1].points || []} />}
              {slide === 2 && <Slide3Interactive quote={SLIDES[2].quote} />}
              {slide === 3 && <Slide4Timeline timeline={SLIDES[3].timeline || []} />}
              {slide === 4 && <Slide5Interactive quote={SLIDES[4].quote} />}
              {slide === 5 && <Slide6Points points={SLIDES[5].points || []} />}
              {slide === 6 && <Slide7Interactive quote={SLIDES[6].quote} />}
              {slide === 7 && <Slide8Interactive />}
              {slide === 8 && <Slide9Points points={SLIDES[8].points || []} />}
              {slide === 9 && <Slide10Interactive quote={SLIDES[9].quote} />}
            </div>
          </div>
        </div>

        {/* Footer Slide Controls */}
        <footer className="mt-6 flex items-center justify-between border-[3px] border-black bg-[#0d1117] p-4 shadow-[4px_4px_0_0_#000] relative">
          <button
            onClick={prevSlide}
            disabled={slide === 0}
            className={`flex items-center gap-1.5 border-[2px] border-black py-2.5 px-4 text-xs font-black uppercase transition-all shadow-[2px_2px_0_0_#000] cursor-pointer ${
              slide === 0 
                ? "bg-[#161b22] text-[#8b949e] border-gray-800 shadow-none opacity-50 cursor-not-allowed" 
                : "bg-white text-black hover:bg-gray-100 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#000]"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>PREVIOUS</span>
          </button>

          {/* Stepper dots */}
          <div className="hidden sm:flex items-center gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlide(idx)}
                className={`w-3.5 h-3.5 border-2 border-black transition-all ${
                  slide === idx ? "bg-[#39d353] rotate-45" : "bg-[#161b22] hover:bg-[#21262d]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={slide === SLIDES.length - 1}
            className={`flex items-center gap-1.5 border-[2px] border-black py-2.5 px-4 text-xs font-black uppercase transition-all shadow-[2px_2px_0_0_#000] cursor-pointer ${
              slide === SLIDES.length - 1 
                ? "bg-[#161b22] text-[#8b949e] border-gray-800 shadow-none opacity-50 cursor-not-allowed" 
                : "bg-[#39d353] text-black hover:bg-[#2ea44f] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#000]"
            }`}
          >
            <span>NEXT</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </footer>
      </div>

      {/* Speaker Notes Drawer */}
      {showNotes && (
        <aside className="w-full md:w-80 border-t-[3px] md:border-t-0 md:border-l-[3px] border-black bg-[#0d1117] p-6 z-10 flex flex-col justify-between shrink-0 shadow-[-4px_0_0_0_#000] font-mono">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b-[2px] border-black pb-3">
              <Terminal className="h-5 w-5 text-[#39d353]" />
              <span className="text-sm font-black uppercase tracking-wider text-white">SPEAKER MONITOR</span>
            </div>

            <div className="bg-[#010409] border-[2px] border-black p-4 text-xs shadow-[2px_2px_0_0_#000] relative">
              <span className="absolute top-0 right-2 text-[8px] font-bold text-[#8b949e] uppercase">slide details</span>
              <p className="text-[#39d353] font-bold uppercase mb-1">Goal:</p>
              <p className="text-gray-300 leading-relaxed font-sans">{SLIDES[slide].goal}</p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase text-[#8b949e] tracking-widest block">SPEAKER SCRIPT:</span>
              <p className="text-sm text-gray-300 leading-relaxed font-sans border-l-[2px] border-gray-700 pl-3 py-1 max-h-[300px] overflow-y-auto">
                {SLIDES[slide].speakerNotes}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-4 text-center">
            <p className="text-[9px] font-black uppercase text-gray-500">
              Bitcoin++ Technical Session &bull; Sadiq OSG
            </p>
          </div>
        </aside>
      )}
    </div>
  );
}

/* ==========================================
   INTERACTIVE SUB-COMPONENTS FOR SPECIFIC SLIDES
   ========================================== */

// Slide 1: Opening Comparison Simulator
function Slide1Interactive() {
  const [running, setRunning] = useState(false);
  const [humanStats, setHumanStats] = useState({ lines: 0, focus: 0, debt: "NONE" });
  const [aiStats, setAiStats] = useState({ lines: 0, time: "0.0s", debt: "NONE" });

  useEffect(() => {
    if (!running) return;

    // AI instant output
    const aiTimeout = setTimeout(() => {
      setAiStats({ lines: 342, time: "0.4s", debt: "HIGH ⚠️" });
    }, 400);

    // Human gradual typing simulation
    let interval = setInterval(() => {
      setHumanStats((prev) => {
        if (prev.lines >= 12) {
          clearInterval(interval);
          return prev;
        }
        return {
          lines: prev.lines + 1,
          focus: prev.focus + 2,
          debt: "NONE ✅"
        };
      });
    }, 500);

    return () => {
      clearTimeout(aiTimeout);
      clearInterval(interval);
    };
  }, [running]);

  const startSim = () => {
    setHumanStats({ lines: 0, focus: 0, debt: "NONE" });
    setAiStats({ lines: 0, time: "0.0s", debt: "NONE" });
    setRunning(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-black uppercase text-gray-400">interactive visual: generator vs coder</span>
        <button 
          onClick={startSim}
          className="flex items-center gap-1 border border-black bg-[#39d353] hover:bg-[#2ea44f] px-3 py-1 text-xs text-black font-black uppercase shadow-[2px_2px_0_0_#000] cursor-pointer"
        >
          <Play className="h-3 w-3" />
          <span>Simulate Execution</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Human Side */}
        <div className="border-[2px] border-black bg-[#161b22] p-4 font-mono shadow-[4px_4px_0_0_#000] flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex justify-between items-center text-[10px] border-b border-gray-700 pb-2 mb-3">
              <span className="font-black text-[#39d353]">HUMAN CODER</span>
              <span className="text-gray-500">reading_and_designing.rs</span>
            </div>
            <p className="text-xs text-gray-300 min-h-[40px]">
              {humanStats.lines === 0 ? "// Waiting to run..." : ""}
              {humanStats.lines > 0 && Array.from({ length: humanStats.lines }).map((_, i) => (
                <span key={i} className="block text-[#39d353]/90 text-[10px] font-bold">
                  {i === 0 && "fn verify_block(block: &Block) -> bool {"}
                  {i === 1 && "    let consensus = load_consensus_rules();"}
                  {i === 2 && "    if !block.check_transactions(&consensus) {"}
                  {i === 3 && "        return false;"}
                  {i === 4 && "    }"}
                  {i > 4 && i < 11 && `    // Performing audit validation loop line ${i}`}
                  {i === 11 && "}"}
                </span>
              ))}
            </p>
          </div>
          <div className="border-t border-gray-800 pt-2 mt-4 text-[10px] flex justify-between text-[#8b949e]">
            <span>Lines Written: <strong className="text-white">{humanStats.lines}</strong></span>
            <span>Focus Time: <strong className="text-white">{humanStats.focus}m</strong></span>
            <span>Review Debt: <strong className="text-[#39d353]">{humanStats.debt}</strong></span>
          </div>
        </div>

        {/* AI Side */}
        <div className="border-[2px] border-black bg-[#161b22] p-4 font-mono shadow-[4px_4px_0_0_#000] flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex justify-between items-center text-[10px] border-b border-gray-700 pb-2 mb-3">
              <span className="font-black text-[#f85149]">AI ASSISTANT</span>
              <span className="text-gray-500">copilot_generation.rs</span>
            </div>
            <p className="text-xs text-gray-300 min-h-[40px]">
              {aiStats.lines === 0 ? "// Waiting to run..." : ""}
              {aiStats.lines > 0 && (
                <span className="block text-red-400 text-[10px] font-mono leading-tight">
                  [SUCCESS] Generated 342 lines of Rust logic instantly.<br/>
                  [WARN] Diff file exceeds standard human review guidelines (+342 lines).<br/>
                  [WARN] Missing unit test assets for consensus boundary checks.
                </span>
              )}
            </p>
          </div>
          <div className="border-t border-gray-800 pt-2 mt-4 text-[10px] flex justify-between text-[#8b949e]">
            <span>Lines Written: <strong className="text-white">{aiStats.lines}</strong></span>
            <span>Generation: <strong className="text-white">{aiStats.time}</strong></span>
            <span>Review Debt: <strong className="text-[#f85149]">{aiStats.debt}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Slide 2: Bullets slide
function Slide2Points({ points }: { points: string[] }) {
  return (
    <div className="flex flex-col gap-3.5 my-2">
      {points.map((pt, idx) => (
        <div key={idx} className="flex items-start gap-3 bg-[#161b22] border-[2px] border-black p-4 shadow-[4px_4px_0_0_#000] transform hover:-translate-y-0.5 transition-transform">
          <span className="w-6 h-6 shrink-0 rounded-full border border-black bg-[#39d353]/10 flex items-center justify-center text-[#39d353] font-bold text-xs">
            {idx + 1}
          </span>
          <span className="text-sm font-medium text-gray-200">{pt}</span>
        </div>
      ))}
    </div>
  );
}

// Slide 3: The Review Paradox Chart
function Slide3Interactive({ quote }: { quote?: { text: string; author: string } }) {
  const [prVolume, setPrVolume] = useState(20);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-800 pb-3">
        <span className="text-[10px] font-black uppercase text-gray-400">interactive paradox visual</span>
        <div className="flex items-center gap-2 text-xs">
          <span>PR Generation:</span>
          <input 
            type="range" 
            min="20" 
            max="100" 
            value={prVolume} 
            onChange={(e) => setPrVolume(parseInt(e.target.value))} 
            className="w-24 accent-[#f85149] cursor-pointer"
          />
          <span className="font-bold text-[#f85149] w-8">{prVolume}x</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Dynamic bar charts */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px] font-bold text-gray-300">
              <span>Code Generation Volume (PRs)</span>
              <span className="text-[#f85149] font-black">{prVolume * 15}% Increase</span>
            </div>
            <div className="w-full h-8 bg-black/50 border border-black/40 p-1">
              <div 
                className="h-full bg-[#f85149] transition-all duration-150 shadow-[0_0_10px_rgba(248,81,73,0.3)]"
                style={{ width: `${prVolume}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px] font-bold text-gray-300">
              <span>Maintainer Review Velocity</span>
              <span className="text-[#39d353] font-black">STABLE (Human Limit)</span>
            </div>
            <div className="w-full h-8 bg-black/50 border border-black/40 p-1">
              <div 
                className="h-full bg-[#39d353] shadow-[0_0_10px_rgba(57,211,83,0.3)]"
                style={{ width: "20%" }}
              />
            </div>
          </div>
        </div>

        {/* Quote / Conclusion */}
        <div className="bg-[#161b22] border-[2px] border-black p-5 shadow-[4px_4px_0_0_#000] relative">
          <div className="absolute top-0 right-0 border-b-[16px] border-b-transparent border-r-[16px] border-r-transparent border-r-[#f85149]" />
          {quote && (
            <>
              <p className="text-sm text-gray-200 italic leading-relaxed mb-3">
                &ldquo;{quote.text}&rdquo;
              </p>
              <p className="text-xs text-[#8b949e] font-black text-right">— {quote.author}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Slide 4: Timeline items
function Slide4Timeline({ timeline }: { timeline: { tool: string; replaced: string; highlight?: boolean }[] }) {
  return (
    <div className="flex flex-col gap-2 my-2">
      <span className="text-[10px] font-black uppercase text-gray-400 mb-2">cognitive offloading timeline</span>
      {timeline.map((item, idx) => (
        <div 
          key={idx} 
          className={`flex items-center justify-between border-[2px] p-3 shadow-[3px_3px_0_0_#000] transition-all ${
            item.highlight 
              ? "bg-[#39d353]/10 border-[#39d353] shadow-[#39d353]/20" 
              : "bg-[#161b22] border-black hover:border-gray-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${item.highlight ? "bg-[#39d353] animate-ping" : "bg-gray-600"}`} />
            <span className={`text-sm font-black uppercase ${item.highlight ? "text-[#39d353]" : "text-white"}`}>
              {item.tool}
            </span>
          </div>
          <span className="text-xs text-gray-400 italic">Replaced {item.replaced}</span>
        </div>
      ))}
    </div>
  );
}

// Slide 5: Desirable Difficulty Interactive Slider
function Slide5Interactive({ quote }: { quote?: { text: string; author: string } }) {
  const [effort, setEffort] = useState(1);

  const getStatus = (val: number) => {
    if (val === 1) {
      return {
        label: "AI Copy-Paste (No Effort)",
        retention: "5%",
        color: "text-[#f85149]",
        impact: "Zero learning. Code works, but you don't know why. Zero ability to debug."
      };
    } else if (val === 2) {
      return {
        label: "AI Assisted with Code Review",
        retention: "40%",
        color: "text-amber-500",
        impact: "Basic understanding. You modified a few lines but didn't build the core logic."
      };
    } else {
      return {
        label: "Deep Wrestling (High Effort)",
        retention: "95%",
        color: "text-[#39d353]",
        impact: "Desirable Difficulty. wrestler-level retention. You built the mental model."
      };
    }
  };

  const status = getStatus(effort);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-gray-800 pb-3">
        <span className="text-[10px] font-black uppercase text-gray-400">interactive concept: desirable difficulty</span>
        <div className="flex items-center gap-2 text-xs">
          <span>Wrestling Level:</span>
          <button 
            onClick={() => setEffort(1)} 
            className={`px-2 py-0.5 border text-[10px] font-bold uppercase transition-all ${effort === 1 ? "bg-[#f85149] text-black border-black shadow-[1px_1px_0_0_#000]" : "border-gray-800 hover:text-white"}`}
          >
            None
          </button>
          <button 
            onClick={() => setEffort(2)} 
            className={`px-2 py-0.5 border text-[10px] font-bold uppercase transition-all ${effort === 2 ? "bg-amber-500 text-black border-black shadow-[1px_1px_0_0_#000]" : "border-gray-800 hover:text-white"}`}
          >
            Medium
          </button>
          <button 
            onClick={() => setEffort(3)} 
            className={`px-2 py-0.5 border text-[10px] font-bold uppercase transition-all ${effort === 3 ? "bg-[#39d353] text-black border-black shadow-[1px_1px_0_0_#000]" : "border-gray-800 hover:text-white"}`}
          >
            High
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Dynamic status panel */}
        <div className="md:col-span-7 border-[2px] border-black bg-[#161b22] p-5 shadow-[4px_4px_0_0_#000] flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-500 block mb-1">SELECTED METHODOLOGY</span>
            <h4 className={`text-base font-black uppercase ${status.color} mb-3`}>
              {status.label}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4">
              {status.impact}
            </p>
          </div>

          <div className="border-t border-gray-800 pt-3 flex justify-between items-center text-xs">
            <span className="font-bold text-gray-400">Mental Retention Rate:</span>
            <span className={`font-mono font-black text-lg ${status.color}`}>
              {status.retention}
            </span>
          </div>
        </div>

        {/* Quote panel */}
        <div className="md:col-span-5 border-[2px] border-black bg-[#0d1117] p-5 shadow-[4px_4px_0_0_#000] border-t-[6px] border-t-amber-600 flex flex-col justify-between">
          {quote && (
            <>
              <p className="text-xs text-gray-300 italic font-serif leading-relaxed mb-4">
                &ldquo;{quote.text}&rdquo;
              </p>
              <p className="text-[10px] text-gray-500 font-bold text-right">— {quote.author}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Slide 6: Bullets slide
function Slide6Points({ points }: { points: string[] }) {
  return (
    <div className="flex flex-col gap-3.5 my-2">
      {points.map((pt, idx) => (
        <div 
          key={idx} 
          className={`flex items-start gap-3 bg-[#161b22] border-[2px] p-4 shadow-[4px_4px_0_0_#000] transform hover:-translate-y-0.5 transition-transform ${
            idx === 1 
              ? "border-[#39d353] border-l-[6px] border-l-[#39d353]" 
              : "border-black"
          }`}
        >
          <span className="w-6 h-6 shrink-0 rounded-full border border-black bg-[#f0883e]/10 flex items-center justify-center text-[#f0883e] font-bold text-xs">
            {idx + 1}
          </span>
          <span className="text-sm font-medium text-gray-200">{pt}</span>
        </div>
      ))}
    </div>
  );
}

// Slide 7: Interactive Iceberg Diagram
function Slide7Interactive({ quote }: { quote?: { text: string; author: string } }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const icebergDetails: Record<string, string> = {
    syntax: "Generated Code & Syntax (Above Water): The basic characters and programming instructions. Extremely simple for AI to generate automatically.",
    design: "System Architecture (Submerged): The organizational relationship between libraries and components. AI struggles to maintain design patterns consistently.",
    tradeoffs: "Consensus Trade-offs (Submerged): Choosing speed vs security, size vs computational footprint. Requires deep technical reasoning.",
    consensus: "Consensus Rules & Security (Submerged): Understanding boundary cases, transaction locking, and potential network split vulnerabilities.",
    history: "Historical Context (Submerged): Knowing WHY a decision was made in a codebase years ago, avoiding regression of past fixes."
  };

  return (
    <div className="flex flex-col gap-6">
      <span className="text-[10px] font-black uppercase text-gray-400">interactive diagram: the contributor iceberg (hover segments)</span>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* The Visual Iceberg */}
        <div className="md:col-span-6 border-[2px] border-black bg-[#0d1117] p-4 flex flex-col items-center justify-center min-h-[240px] shadow-[4px_4px_0_0_#000] select-none">
          {/* Wave line separator */}
          <div className="w-full text-center text-[10px] font-black tracking-widest text-[#39d353] bg-[#161b22] py-1 border border-black mb-3">
            ~~~~~~~~ SEA LEVEL (AI CAPABILITY) ~~~~~~~~
          </div>

          <div className="flex flex-col gap-2 w-full text-center text-xs font-bold uppercase">
            <button
              onMouseEnter={() => setHoveredNode("syntax")}
              onMouseLeave={() => setHoveredNode(null)}
              className={`py-2 border border-black/50 transition-all ${hoveredNode === "syntax" ? "bg-amber-600 text-black border-black shadow-[2px_2px_0_0_#000]" : "bg-[#161b22]/70 text-gray-300"}`}
            >
              ▲ Syntax & Boilerplate (AI domain)
            </button>
            
            <div className="text-[9px] font-black text-gray-500 py-1">UNDER WATER (HUMAN THINKING NEEDED)</div>

            <button
              onMouseEnter={() => setHoveredNode("design")}
              onMouseLeave={() => setHoveredNode(null)}
              className={`py-1.5 border border-black/50 transition-all ${hoveredNode === "design" ? "bg-[#39d353] text-black border-black shadow-[2px_2px_0_0_#000]" : "bg-blue-950/20 text-gray-400"}`}
            >
              ▼ System Architecture
            </button>
            <button
              onMouseEnter={() => setHoveredNode("tradeoffs")}
              onMouseLeave={() => setHoveredNode(null)}
              className={`py-1.5 border border-black/50 transition-all ${hoveredNode === "tradeoffs" ? "bg-[#39d353] text-black border-black shadow-[2px_2px_0_0_#000]" : "bg-blue-950/30 text-gray-400"}`}
            >
              ▼ Consensus Trade-offs
            </button>
            <button
              onMouseEnter={() => setHoveredNode("consensus")}
              onMouseLeave={() => setHoveredNode(null)}
              className={`py-1.5 border border-black/50 transition-all ${hoveredNode === "consensus" ? "bg-[#f85149] text-black border-black shadow-[2px_2px_0_0_#000]" : "bg-blue-950/40 text-gray-400"}`}
            >
              ▼ Protocol Consensus Rules
            </button>
            <button
              onMouseEnter={() => setHoveredNode("history")}
              onMouseLeave={() => setHoveredNode(null)}
              className={`py-1.5 border border-black/50 transition-all ${hoveredNode === "history" ? "bg-[#39d353] text-black border-black shadow-[2px_2px_0_0_#000]" : "bg-blue-950/50 text-gray-400"}`}
            >
              ▼ Project History Context
            </button>
          </div>
        </div>

        {/* The Detail Explorer */}
        <div className="md:col-span-6 border-[2px] border-black bg-[#161b22] p-5 shadow-[4px_4px_0_0_#000] flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-500 block mb-1">EXPLORER METADATA</span>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              {hoveredNode 
                ? icebergDetails[hoveredNode] 
                : "Hover over sections of the Iceberg diagram to inspect the cognitive layers required for open-source development."
              }
            </p>
          </div>

          <div className="border-t border-gray-800 pt-3">
            {quote && (
              <>
                <p className="text-[11px] text-gray-400 italic font-serif">&ldquo;{quote.text}&rdquo;</p>
                <p className="text-[9px] text-gray-500 font-bold text-right">— {quote.author}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Slide 8: Split Interactive Checklist
function Slide8Interactive() {
  const [servantChecks, setServantChecks] = useState([true, true, true]);
  const [masterChecks, setMasterChecks] = useState([false, false, false]);

  return (
    <div className="flex flex-col gap-6">
      <span className="text-[10px] font-black uppercase text-gray-400">interactive checklist: sovereign tool relationship</span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI as Servant (Sovereign Usage) */}
        <div className="border-[2px] border-black bg-[#161b22] p-4 shadow-[4px_4px_0_0_#000] border-t-[6px] border-t-[#39d353] flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-black text-white uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#39d353] animate-pulse" />
              AI as Servant (Accelerates Coder)
            </h4>
            <div className="flex flex-col gap-2">
              {[
                "Explain legacy files and core terms",
                "Draft unit and regression edge-cases",
                "Generate shell scripts and structural boilerplate"
              ].map((task, i) => (
                <label key={i} className="flex items-start gap-2.5 text-xs text-gray-300 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={servantChecks[i]} 
                    onChange={(e) => {
                      const copy = [...servantChecks];
                      copy[i] = e.target.checked;
                      setServantChecks(copy);
                    }}
                    className="accent-[#39d353] mt-0.5"
                  />
                  <span className={servantChecks[i] ? "line-through text-gray-500" : ""}>{task}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-800 pt-3 mt-4 text-[10px] text-[#39d353] font-bold">
            ✅ VERIFICATION OWNED BY HUMAN
          </div>
        </div>

        {/* AI as Master (Outsourced) */}
        <div className="border-[2px] border-black bg-[#161b22] p-4 shadow-[4px_4px_0_0_#000] border-t-[6px] border-t-[#f85149] flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-black text-white uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f85149] animate-pulse" />
              AI as Master (Outsources Coder)
            </h4>
            <div className="flex flex-col gap-2">
              {[
                "Automatically merge generated commits",
                "Approve pull requests without auditing logic",
                "Blame AI logic models when bugs break system"
              ].map((task, i) => (
                <label key={i} className="flex items-start gap-2.5 text-xs text-gray-300 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={masterChecks[i]} 
                    onChange={(e) => {
                      const copy = [...masterChecks];
                      copy[i] = e.target.checked;
                      setMasterChecks(copy);
                    }}
                    className="accent-[#f85149] mt-0.5"
                  />
                  <span className={masterChecks[i] ? "text-[#f85149] font-bold" : "text-gray-400"}>
                    {task} {masterChecks[i] && "⚠️ DANGEROUS"}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-800 pt-3 mt-4 text-[10px] text-[#f85149] font-bold">
            ❌ RESPONSIBILITY ABDICATED
          </div>
        </div>
      </div>
    </div>
  );
}

// Slide 9: Checklist slide
function Slide9Points({ points }: { points: string[] }) {
  return (
    <div className="flex flex-col gap-3 my-2">
      {points.map((pt, idx) => (
        <div key={idx} className="flex items-center gap-3 bg-[#161b22] border-[2px] border-black p-4 shadow-[4px_4px_0_0_#000] transform hover:-translate-y-0.5 transition-transform border-l-[#39d353] border-l-[6px]">
          <Check className="h-5 w-5 text-[#39d353] shrink-0" />
          <span className="text-sm font-bold text-white uppercase">{pt}</span>
        </div>
      ))}
    </div>
  );
}

// Slide 10: Closing interactive final message
function Slide10Interactive({ quote }: { quote?: { text: string; author: string } }) {
  const [complete, setComplete] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-gray-800 pb-3">
        <span className="text-[10px] font-black uppercase text-gray-400">interactive: final summation</span>
        <button 
          onClick={() => setComplete(!complete)}
          className={`flex items-center gap-1 border border-black px-3 py-1 text-xs text-black font-black uppercase shadow-[2px_2px_0_0_#000] cursor-pointer transition-all ${complete ? "bg-[#f0883e]" : "bg-white hover:bg-gray-200"}`}
        >
          <RotateCcw className="h-3 w-3 animate-spin-slow" />
          <span>{complete ? "Reset Session" : "Final Takeaway"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Quote Block */}
        <div className="border-[2px] border-black bg-[#161b22] p-5 shadow-[4px_4px_0_0_#000] flex flex-col justify-between">
          {quote && (
            <>
              <p className="text-sm text-gray-200 italic leading-relaxed mb-4">
                &ldquo;{quote.text}&rdquo;
              </p>
              <p className="text-xs text-[#8b949e] font-black text-right">— {quote.author}</p>
            </>
          )}
        </div>

        {/* Glowing Orange Logo summary box */}
        <div className="border-[2px] border-black bg-[#0d1117] p-5 shadow-[4px_4px_0_0_#f0883e] flex flex-col items-center justify-center text-center">
          {complete ? (
            <div className="animate-pulse">
              <span className="text-[10px] font-black text-[#f0883e] uppercase tracking-widest block mb-2">final reflection</span>
              <p className="text-sm font-black uppercase text-white leading-snug">
                Think Clearly.<br/>
                Verify Deeply.<br/>
                Take Full Responsibility.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#f0883e]/10 border-[2px] border-[#f0883e] flex items-center justify-center mb-3">
                <span className="text-[#f0883e] font-black text-lg">₿</span>
              </div>
              <p className="text-xs text-[#8b949e] font-medium leading-relaxed font-sans">
                Click "Final Takeaway" to reveal Sadiq's closing summary message for Bitcoin++.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
