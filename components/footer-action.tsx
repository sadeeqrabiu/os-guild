"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ShieldCheck, Github, Fingerprint, Radio, Cpu, Coins } from "lucide-react";


export function FooterAction() {
  const [signupText, setSignupText] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupText.trim()) return;
    setSuccess(true);
    setTimeout(() => {
      setSignupText("");
      setSuccess(false);
    }, 4000);
  };

  const INTEGRATIONS = [
    { name: "GitHub", icon: Github },
    { name: "Nostr Protocol", icon: Fingerprint },
    { name: "LDK Engine", icon: Radio },
    { name: "Alby Core", icon: Cpu },
    { name: "Fedimint", icon: Coins },
  ];

  return (
    <footer className="bg-[#010409] pt-20 pb-12 px-6">
      <div className="mx-auto max-w-5xl space-y-16">
        
        {/* Integrations Partnerships Row */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#39d353]" />
            <h4 className="font-mono text-xs font-black uppercase text-[#8b949e] tracking-widest text-center">
              CORE PROTOCOL INTEGRATIONS
            </h4>
            <span className="h-1.5 w-1.5 rounded-full bg-[#39d353]" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {INTEGRATIONS.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.name} 
                  className="flex items-center gap-2 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all cursor-default"
                >
                  <Icon className="h-5 w-5 text-white" />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Newsletter Signup Card */}
        <div className="border-[3px] border-black bg-[#0d1117] p-8 md:p-12 shadow-[6px_6px_0px_0px_#238636] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <span className="inline-block border-2 border-black bg-[#161b22] px-3 py-1 font-mono text-[10px] font-bold text-[#39d353] uppercase shadow-[2px_2px_0px_0px_#000]">
              STAY SECURED
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white uppercase leading-none tracking-tighter">
              Get Guild Sprints Updates
            </h3>
            <p className="font-mono text-xs text-[#8b949e] max-w-md mx-auto leading-relaxed">
              Sign up with your Nostr pubkey or email to receive notifications about code sprints, Mauritian workshops, and Bitcoin milestones.
            </p>

            <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="text"
                value={signupText}
                onChange={(e) => setSignupText(e.target.value)}
                disabled={success}
                placeholder="npub1... or email address"
                className="flex-1 border-[3px] border-black bg-[#010409] px-4 py-3 font-mono text-sm text-[#39d353] focus:border-[#39d353] focus:outline-none placeholder-[#484f58]"
              />
              
              {success ? (
                <div className="flex items-center justify-center gap-1.5 border-[3px] border-[#39d353] bg-[#238636]/10 px-6 py-3 font-mono text-xs font-bold text-[#39d353] w-full sm:w-auto shrink-0 animate-pulse">
                  <CheckCircle2 className="h-4 w-4" />
                  SIGNUP BROADCASTED!
                </div>
              ) : (
                <button
                  type="submit"
                  className="bg-[#238636] hover:bg-[#39d353] text-black font-black uppercase text-xs px-6 py-3 border-[3px] border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] transition-all cursor-pointer w-full sm:w-auto shrink-0"
                >
                  SUBSCRIBE
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Brand Copyright Column */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-[#30363d] pt-8 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-sm uppercase text-white font-mono" style={{ fontFamily: "'Source Code Pro', monospace" }}>
              OSGUILD<span className="text-[#39d353]">.</span>
            </span>
            <span className="text-xs text-[#484f58] font-mono">| &copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex gap-6 font-mono text-[10px] sm:text-xs text-[#8b949e] uppercase font-bold">
            <a href="https://github.com/OsGuild-HQ" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <span className="text-[#484f58]">&bull;</span>
            <span className="cursor-pointer hover:text-white transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Root Node</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
