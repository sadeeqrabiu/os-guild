"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animate } from "animejs";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const STEPS = [
    { id: "intro", label: "" },
    { id: "name", label: "What's your name?", placeholder: "Type your name…", type: "text" },
    { id: "email", label: "What's your email?", placeholder: "you@example.com", type: "email" },
    { id: "github", label: "Your GitHub username?", placeholder: "@username", type: "text" },
    { id: "submit", label: "" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

export function Form() {
    const [step, setStep] = useState<number>(0);
    const [values, setValues] = useState({ name: "", email: "", github: "" });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const confettiRef = useRef<HTMLDivElement>(null);

    const current = STEPS[step];

    const canProceed = useCallback(() => {
        if (current.id === "intro") return true;
        if (current.id === "name") return values.name.trim().length > 0;
        if (current.id === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
        if (current.id === "github") return values.github.trim().length > 0;
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

        if (!supabase) {
            setError("Supabase is not configured.");
            setSubmitting(false);
            return;
        }

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
        // fire confetti burst
        if (confettiRef.current) {
            const container = confettiRef.current;
            // create particles
            for (let i = 0; i < 40; i++) {
                const dot = document.createElement("span");
                dot.className = "confetti-dot";
                const colors = ["#8B5CF6", "#6366F1", "#A78BFA", "#C4B5FD", "#34D399", "#10B981", "#F59E0B", "#F472B6"];
                dot.style.cssText = `
          position: absolute;
          width: ${4 + Math.random() * 6}px;
          height: ${4 + Math.random() * 6}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
          left: 50%;
          top: 50%;
          pointer-events: none;
        `;
                container.appendChild(dot);

                animate(dot, {
                    translateX: (Math.random() - 0.5) * 500,
                    translateY: (Math.random() - 0.5) * 400 - 100,
                    scale: [1, 0],
                    opacity: [1, 0],
                    rotate: Math.random() * 720,
                    duration: 1000 + Math.random() * 600,
                    ease: "outExpo",
                    complete: () => dot.remove(),
                });
            }
        }
    };

    const setValue = (key: string, val: string) => {
        setValues((prev) => ({ ...prev, [key]: val }));
    };

    // Slide variants for one-at-a-time transitions
    const slideVariants = {
        enter: { opacity: 0, x: 40 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -40 },
    };

    return (
        <section className="relative flex h-screen w-full overflow-hidden bg-white font-(family-name:--font-source-code-pro) dark:bg-gray-950">
            {/* Left Side – Form */}
            <div className="relative z-10 flex w-full flex-col justify-center px-10 sm:px-16 md:w-1/2 lg:px-24">
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
                            className="flex flex-col gap-4"
                        >
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                                Enter the Dungeon!
                            </h1>
                            <p className="text-base text-gray-500 dark:text-gray-400">
                                .Osguild a structured layer for FOSS.
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <button
                                    onClick={next}
                                    className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.03] hover:bg-indigo-500 active:scale-[0.97]"
                                >
                                    Start
                                </button>
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                    press <strong className="text-gray-600 dark:text-gray-300">Enter ↵</strong>
                                </span>
                            </div>
                        </motion.div>
                    )}

                    {/* ── Field Steps (name / email / github) ── */}
                    {(current.id === "name" || current.id === "email" || current.id === "github") && (
                        <motion.div
                            key={current.id}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="flex flex-col gap-4"
                        >
                            <label className="text-xl font-semibold text-gray-900 dark:text-gray-100 sm:text-2xl">
                                {current.label}
                            </label>
                            <input
                                autoFocus
                                type={current.type}
                                placeholder={current.placeholder}
                                value={values[current.id as keyof typeof values]}
                                onChange={(e) => setValue(current.id, e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full border-b-2 border-gray-200 bg-transparent py-3 text-lg text-gray-900 outline-none transition-colors placeholder:text-gray-300 focus:border-indigo-500 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-indigo-400"
                            />
                            <div className="mt-4 flex items-center gap-3">
                                <button
                                    onClick={next}
                                    disabled={!canProceed()}
                                    className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.03] hover:bg-emerald-500 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40"
                                >
                                    OK ✓
                                </button>
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                    press <strong className="text-gray-600 dark:text-gray-300">Enter ↵</strong>
                                </span>
                            </div>
                            {/* Progress dots */}
                            <div className="mt-8 flex gap-2">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${step >= i
                                            ? "w-8 bg-emerald-500"
                                            : "w-4 bg-gray-200 dark:bg-gray-700"
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
                            className="relative flex flex-col gap-4"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
                                Ready to enter?
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <strong className="text-gray-700 dark:text-gray-300">{values.name}</strong> · {values.email} · {values.github}
                            </p>
                            <div ref={confettiRef} className="relative mt-4">
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="group relative overflow-hidden rounded-lg bg-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.03] hover:bg-indigo-500 hover:shadow-indigo-500/30 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60"
                                >
                                    <span className="relative z-10">{submitting ? "Submitting…" : "Submit Application"}</span>
                                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                </button>
                                {error && (
                                    <p className="mt-2 text-sm text-red-500">{error}</p>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Success ── */}
                    {submitted && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex flex-col items-start gap-3"
                        >
                            <span className="text-5xl">🎉</span>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                Welcome to the Guild!
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Your application has been sent. We&apos;ll be in touch at <strong className="text-indigo-600 dark:text-indigo-400">info@osguild.dev</strong>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Right Side – Portal Image */}
            <div className="hidden items-center justify-center md:flex md:w-1/2">
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <Image
                        src="/Osportal.png"
                        alt="OS Guild Portal"
                        width={500}
                        height={500}
                        className="pointer-events-none select-none drop-shadow-2xl"
                        priority
                    />
                </motion.div>
            </div>
        </section>
    );
}