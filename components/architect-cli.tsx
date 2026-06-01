"use client";

import React, { useRef, useState } from "react";
import { Terminal, Code, Cpu, ShieldCheck, Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

export function ArchitectCLI() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => console.log("Video play interrupted:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (!isPlaying) {
        videoRef.current.play().catch((err) => console.log("Video play interrupted:", err));
        setIsPlaying(true);
      }
    }
  };

  return (
    <section id="cli" className="py-24 px-6 bg-[#010409] border-t border-gray-900 relative overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      <div className="mx-auto max-w-5xl space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-[3px] border-black pb-8 gap-4">
          <div>
            <span className="font-mono text-xs font-black uppercase text-[#39d353] tracking-widest block mb-2">
              CO-PILOT ENGINEER COMPANION
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white">
              Architect CLI Agent<span className="text-[#39d353]">.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm font-mono text-[#8b949e] leading-relaxed">
            A terminal-based AI assistant prioritizing codebase comprehension, safe path resolution, and structured sprint planning before writing code.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Capabilities List */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <h3 className="text-xl font-black uppercase text-white tracking-tight border-l-4 border-[#39d353] pl-4 mb-4">
              Understanding Before Generation
            </h3>

            <div className="space-y-4">
              {/* Feature 1 */}
              <div className="flex gap-4 items-start p-4 border-[2px] border-black bg-[#0d1117] hover:border-[#39d353] transition-all duration-200">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black bg-white/5 text-[#39d353]">
                  <Terminal className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white mb-1">Local TUI Companion</h4>
                  <p className="text-xs text-[#8b949e] leading-relaxed">
                    Designed in Python 3.13 with Textual, keeping developers inside a clean, high-performance terminal layout with customized keyboard mappings.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 items-start p-4 border-[2px] border-black bg-[#0d1117] hover:border-[#39d353] transition-all duration-200">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black bg-white/5 text-[#39d353]">
                  <Code className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white mb-1">Context Ingestion (&apos;@path&apos;)</h4>
                  <p className="text-xs text-[#8b949e] leading-relaxed">
                    Simply type &apos;@&apos; followed by any project filename to trigger autocompletion, feeding safe, syntax-highlighted codebase snippets directly into your prompt.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4 items-start p-4 border-[2px] border-black bg-[#0d1117] hover:border-[#39d353] transition-all duration-200">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black bg-white/5 text-[#39d353]">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white mb-1">Automatic Compaction</h4>
                  <p className="text-xs text-[#8b949e] leading-relaxed">
                    Token-aware memory managers automatically compress historical threads in the background when window limits reach 80%, preserving context space.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex gap-4 items-start p-4 border-[2px] border-black bg-[#0d1117] hover:border-[#39d353] transition-all duration-200">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black bg-white/5 text-[#39d353]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-white mb-1">Session Logging &amp; Resumes</h4>
                  <p className="text-xs text-[#8b949e] leading-relaxed">
                    Saves conversation states as a stream of structured JSONL records, instantly reloadable in production using `--continue &lt;session_id&gt;`.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Video Player */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="border-[3px] border-black bg-[#0d1117] shadow-[10px_10px_0px_0px_#39d353] overflow-hidden flex flex-col">
              {/* Mock Terminal Header Bar */}
              <div className="flex items-center justify-between border-b-[3px] border-black bg-[#161b22] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 rounded-full border border-black bg-[#f85149]" />
                  <span className="h-3.5 w-3.5 rounded-full border border-black bg-[#f1e05a]" />
                  <span className="h-3.5 w-3.5 rounded-full border border-black bg-[#39d353]" />
                </div>
                <span className="font-mono text-xs text-[#8b949e] font-black uppercase tracking-wider select-none">
                  osguild-terminal-demo
                </span>
                <div className="w-12" /> {/* spacer balance */}
              </div>

              {/* Responsive Video Canvas */}
              <div className="relative aspect-[16/10] bg-black">
                <video
                  ref={videoRef}
                  src="/osguild-demo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Cyberpunk Video Controls overlay on bottom */}
                {/* <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/85 backdrop-blur-sm border-[2px] border-black p-2 font-mono text-[10px] uppercase text-white z-20">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="hover:text-[#39d353] cursor-pointer flex items-center gap-1 focus:outline-none"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-3 w-3 fill-white stroke-none" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 fill-white stroke-none" />
                          <span>Play</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={restartVideo}
                      className="hover:text-[#39d353] cursor-pointer flex items-center gap-1 focus:outline-none"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Replay</span>
                    </button>
                  </div>

                  <button
                    onClick={toggleMute}
                    className="hover:text-[#39d353] cursor-pointer flex items-center gap-1 focus:outline-none"
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="h-3 w-3" />
                        <span>Muted</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-3 w-3" />
                        <span>Sound On</span>
                      </>
                    )}
                  </button>
                </div> */}
              </div>

              {/* Sub-Terminal Action Area */}
              {/* <div className="border-t-[3px] border-black bg-[#161b22] p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="font-mono text-xs font-bold text-gray-400">
                  Ready to test? <code className="text-[#39d353] font-black font-mono">uv run main.py</code>
                </span>
                <a
                  href="/CLI.md"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-4 py-2 border-2 border-black bg-white hover:bg-gray-100 text-xs font-black uppercase text-black shadow-[3px_3px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer rounded-sm"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Read CLI.md Guide</span>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
