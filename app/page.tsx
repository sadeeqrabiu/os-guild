"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#010409] text-white selection:bg-[#39d353] selection:text-black flex flex-col items-center justify-center gap-10 px-4 overflow-hidden">
      {/* Swinging construction sign */}
      <div className="relative flex flex-col items-center">
        {/* Hanging point */}
        <div className="w-3 h-3 rounded-full bg-zinc-500" />
        <motion.div
          className="flex flex-col items-center origin-top"
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Strings */}
          <svg width="160" height="48" viewBox="0 0 160 48" className="-mt-1.5">
            <line x1="80" y1="0" x2="20" y2="48" stroke="#71717a" strokeWidth="2" />
            <line x1="80" y1="0" x2="140" y2="48" stroke="#71717a" strokeWidth="2" />
          </svg>
          {/* Diamond warning sign */}
          <div className="relative w-40 h-40 flex items-center justify-center -mt-4">
            <div className="absolute inset-4 rotate-45 rounded-lg bg-[#facc15] border-4 border-black shadow-[0_0_40px_rgba(250,204,21,0.25)]" />
            <svg
              viewBox="0 0 64 64"
              className="relative w-16 h-16"
              fill="none"
              stroke="black"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Worker with shovel */}
              <circle cx="30" cy="12" r="5" fill="black" />
              <path d="M28 18 L22 36 L14 50" />
              <path d="M22 36 L32 50" />
              <path d="M27 22 L38 30" />
              <path d="M38 30 L48 46" />
              <path d="M44 48 L54 44 L52 52 Z" fill="black" />
              <path d="M8 54 Q14 46 20 54 Z" fill="black" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Text */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
          Site under construction
          <motion.span
            className="text-[#39d353]"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            _
          </motion.span>
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base">
          OSGuild is getting a rebuild. Check back soon.
        </p>
      </div>

      {/* Scrolling hazard tape */}
      <div className="w-full max-w-xl h-6 rounded border-2 border-black overflow-hidden">
        <motion.div
          className="h-full w-[200%]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #facc15 0 16px, #000 16px 32px)",
          }}
          animate={{ x: [0, -45.25] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
