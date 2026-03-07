"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PerspectiveGrid } from "@/components/ui/perspective-grid";

export function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section className="relative w-full h-screen overflow-hidden font-(family-name:--font-source-code-pro) bg-linear-to-br from-violet-600 to-indigo-900">
            {/* Perspective Grid Background */}
            <div className="absolute inset-0 opacity-50 mix-blend-overlay">
                <PerspectiveGrid gridSize={40} fadeRadius={95} />
            </div>

            <div className="pointer-events-none relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="pointer-events-auto flex w-full max-w-md flex-col items-center gap-6 rounded-3xl bg-black/20 p-8 py-10 shadow-2xl backdrop-blur-md border border-white/10"
                >
                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Join the Guild
                    </h2>
                    <p className="text-indigo-200 text-sm mb-2">Build Open Source, Together. Enter your details to get started.</p>

                    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 text-left">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-indigo-200/80 uppercase tracking-wider pl-4">Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-2xl bg-white/10 px-6 py-4 text-sm text-white placeholder:text-white/40 shadow-inner transition-colors border border-white/5 hover:bg-white/15 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-indigo-200/80 uppercase tracking-wider pl-4">Email</label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-2xl bg-white/10 px-6 py-4 text-sm text-white placeholder:text-white/40 shadow-inner transition-colors border border-white/5 hover:bg-white/15 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-indigo-200/80 uppercase tracking-wider pl-4">Message (Optional)</label>
                            <textarea
                                placeholder="Why do you want to join?"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={3}
                                className="w-full resize-none rounded-2xl bg-white/10 px-6 py-4 text-sm text-white placeholder:text-white/40 shadow-inner transition-colors border border-white/5 hover:bg-white/15 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-4 w-full rounded-2xl bg-white px-8 py-4 text-sm font-bold text-indigo-900 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02] hover:bg-indigo-50 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] focus:outline-none active:scale-[0.98]"
                        >
                            {submitted ? "Application Sent!" : "Submit Application"}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}