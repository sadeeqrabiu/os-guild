"use client";

import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden font-(family-name:--font-source-code-pro)">
      {/* Perspective Grid Background */}
      <div className="absolute inset-0">
        <PerspectiveGrid gridSize={40} fadeRadius={95} />
      </div>

      {/* Hero Content */}
      <div className="pointer-events-none relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-auto flex flex-col items-center gap-6"
        >
          <span className="inline-block rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm dark:border-gray-700 dark:bg-black/60 dark:text-gray-300">
            .os guild
          </span>

          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-gray-950 dark:text-gray-400 sm:text-4xl md:text-5xl">
            Build Open Source,{" "}
            <span className="bg-linear-to-r from-gray-500 via-gray-400 to-gray-600 bg-clip-text text-transparent dark:from-gray-300 dark:via-gray-500 dark:to-gray-700">
              Together
            </span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
