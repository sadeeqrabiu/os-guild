"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animate } from "animejs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

const STEPS = [
  { id: "intro", label: "" },
  { id: "name", label: "What's your name/alias?", placeholder: "Type your alias…", type: "text" },
  { id: "email", label: "What's your email?", placeholder: "you@example.com", type: "email" },
  { id: "github", label: "Your GitHub username?", placeholder: "@username", type: "text" },
  { id: "experience", label: "Briefly describe your programming experience.", placeholder: "E.g., 3 years Rust, familiar with Bitcoin Core...", type: "text" },
  { id: "submit", label: "" },
] as const;

export function GenesisWorkshopForm() {
  const [step, setStep] = useState<number>(0);
  const [values, setValues] = useState({ name: "", email: "", github: "", experience: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = STEPS[step];

  const canProceed = useCallback(() => {
    if (current.id === "intro") return true;
    if (current.id === "name") return values.name.trim().length > 0;
    if (current.id === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
    if (current.id === "github") return values.github.trim().length > 0;
    if (current.id === "experience") return values.experience.trim().length > 0;
    return true;
  }, [current.id, values]);

  const next = () => {
    if (!canProceed()) return;
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      next();
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    // Using the same table JoinGuild or we could just mock it for now.
    // Assuming JoinGuild exists with the fields below. We may not have experience field in DB yet.
    if (!supabase) {
      setError("Supabase is not configured.");
      setSubmitting(false);
      return;
    }

    // You might need to update your DB schema to support "Experience" if you keep this field
    const { error: dbError } = await supabase
      .from("JoinGuild")
      .insert({
        Name: values.name,
        Email: values.email,
        GitHub: values.github,
      });

    if (dbError) {
      setError(dbError.message);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const setValue = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#010409] font-(family-name:--font-source-code-pro) text-white">
      {/* Navigation */}
      <nav className="absolute left-0 top-0 z-50 flex w-full items-center justify-between p-4 md:p-8">
        <Link
          href="/genesis-workshop"
          className="flex items-center gap-2 border-[2px] border-transparent p-2 text-[#8b949e] transition-colors hover:border-black hover:bg-[#161b22] hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-bold uppercase tracking-wider">Back</span>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-2xl border-[4px] border-black bg-[#0d1117] p-8 shadow-[8px_8px_0px_0px_#39d353] md:p-16">
          <AnimatePresence mode="wait">
            {/* ── Intro Step ── */}
            {current.id === "intro" && (
              <motion.div
                key="intro"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                <div className="inline-block w-fit border-[3px] border-black bg-[#39d353] px-3 py-1 font-black uppercase text-black shadow-[2px_2px_0px_0px_#000]">
                  Application
                </div>
                <h1 className="text-3xl font-black uppercase tracking-tighter text-white sm:text-5xl">
                  Genesis Workshop
                </h1>
                <p className="text-base font-medium text-[#8b949e] md:text-lg">
                  Submit your details below to apply for the next Genesis Workshop cohort.
                  We are looking for thoughtful contributors ready to dive deep into Bitcoin&apos;s codebase.
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <button
                    onClick={next}
                    className="border-[3px] border-black bg-[#39d353] px-8 py-4 font-black uppercase text-black shadow-[4px_4px_0px_0px_#000] transition-colors hover:bg-[#238636] active:translate-y-1 active:shadow-[0px_0px_0px_0px_#000]"
                  >
                    Start Application
                  </button>
                  <span className="text-xs text-[#8b949e]">
                    press <strong className="text-white">Enter ↵</strong>
                  </span>
                </div>
              </motion.div>
            )}

            {/* ── Field Steps ── */}
            {(current.id === "name" || current.id === "email" || current.id === "github" || current.id === "experience") && (
              <motion.div
                key={current.id}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                <label className="text-2xl font-black uppercase tracking-tighter text-white md:text-4xl">
                  {current.label}
                </label>
                <input
                  autoFocus
                  type={current.type}
                  placeholder={current.placeholder}
                  value={values[current.id as keyof typeof values]}
                  onChange={(e) => setValue(current.id, e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full border-b-[4px] border-[#39d353]/30 bg-transparent py-4 text-xl font-bold text-white outline-none transition-colors placeholder:text-[#8b949e] focus:border-[#39d353]"
                />
                <div className="mt-4 flex items-center gap-4">
                  <button
                    onClick={next}
                    disabled={!canProceed()}
                    className="border-[3px] border-black bg-[#39d353] px-8 py-4 font-black uppercase text-black shadow-[4px_4px_0px_0px_#000] transition-colors hover:bg-[#238636] active:translate-y-1 active:shadow-[0px_0px_0px_0px_#000] disabled:opacity-50 disabled:active:translate-y-0 disabled:active:shadow-[4px_4px_0px_0px_#000]"
                  >
                    OK ✓
                  </button>
                  <span className="text-xs text-[#8b949e]">
                    press <strong className="text-white">Enter ↵</strong>
                  </span>
                </div>
                {/* Progress bars */}
                <div className="mt-8 flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-2 transition-all duration-300 ${
                        step >= i ? "w-8 bg-[#39d353]" : "w-4 bg-[#161b22]"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Submit Step ── */}
            {current.id === "submit" && !submitted && (
              <motion.div
                key="submit"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                  Ready to submit?
                </h2>
                <div className="flex flex-col gap-2 border-[2px] border-[#39d353]/30 p-4 text-[#8b949e]">
                  <p><strong className="text-white">Alias:</strong> {values.name}</p>
                  <p><strong className="text-white">Email:</strong> {values.email}</p>
                  <p><strong className="text-white">GitHub:</strong> {values.github}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full border-[4px] border-black bg-[#39d353] px-8 py-5 text-center text-lg font-black uppercase text-black shadow-[6px_6px_0px_0px_#000] transition-colors hover:bg-[#238636] active:translate-y-1 active:shadow-[0px_0px_0px_0px_#000] disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                  {error && (
                    <p className="mt-4 border-l-4 border-[#f85149] pl-3 text-sm font-bold text-[#f85149]">{error}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── Success ── */}
            {submitted && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                <div className="mb-2 text-6xl">🛠️</div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-[#39d353] sm:text-4xl">
                  Application Sent.
                </h2>
                <p className="text-lg font-medium text-[#8b949e]">
                  We will review your profile and get back to you via email. Expect a challenge.
                </p>

                <div className="mt-6 border-[3px] border-black bg-[#161b22] p-6 shadow-[6px_6px_0px_0px_#000]">
                  <h3 className="mb-2 font-black uppercase text-white">Next Steps</h3>
                  <p className="mb-6 text-sm text-[#8b949e]">
                    Join the OS-Guild Discord to stay updated while you wait.
                  </p>
                  <a
                    href="https://discord.gg/YbCSFxb3WV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full border-[3px] border-black bg-white py-4 text-center text-sm font-black uppercase text-black shadow-[4px_4px_0px_0px_#000] transition-colors hover:bg-gray-200"
                  >
                    Join Discord
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default GenesisWorkshopForm;
