"use client";

import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Perspective Grid Background */}
      <div className="absolute inset-0">
        <PerspectiveGrid gridSize={40} fadeRadius={75} />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <span className="inline-block rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm dark:border-gray-700 dark:bg-black/60 dark:text-gray-300">
            Welcome to OS Guild
          </span>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-gray-950 dark:text-white sm:text-6xl md:text-7xl">
            Build Open Source,{" "}
            <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 bg-clip-text text-transparent dark:from-white dark:via-gray-300 dark:to-gray-500">
              Together
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl"
          >
            A community of developers, designers, and creators collaborating on
            impactful open-source projects. Join us and shape the future of
            software.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-4 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gray-950 px-8 text-sm font-medium text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
            >
              Get Started
            </a>
            <a
              href="#"
              className="inline-flex h-12 items-center justify-center rounded-full border border-gray-300 bg-white/70 px-8 text-sm font-medium text-gray-700 backdrop-blur-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-black/50 dark:text-gray-300 dark:hover:bg-gray-900"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
