"use client";

import { motion } from "framer-motion";
import {
  GitFork,
  Star,
  Activity,
  Code2,
  GitPullRequest,
  MessageSquare,
  ArrowUpRight,
  Terminal,
  Zap,
} from "lucide-react";

// Mock 

const pinnedProjects = [
  {
    name: "os-guild",
    role: "Maintainer",
    description: "Community-driven platform for collaborative open source development.",
    language: "TypeScript",
    stars: 284,
    link: "#",
  },
  {
    name: "neo-wallet",
    role: "Core Contributor",
    description: "Self-custodial Bitcoin wallet with Fedimint integration.",
    language: "Rust",
    stars: 512,
    link: "#",
  },
  {
    name: "architect-bot",
    role: "Creator",
    description: "Intelligent Discord bot guiding open-source contribution workflows.",
    language: "Python",
    stars: 138,
    link: "#",
  },
  {
    name: "fedimint-modules",
    role: "Contributor",
    description: "Custom Fedimint modules for community banking.",
    language: "Rust",
    stars: 203,
    link: "#",
  },
];

const recentActivity = [
  {
    type: "commit",
    repo: "os-guild/ui",
    message: "refactor: simplify dashboard components",
    time: "2h ago",
    icon: Terminal,
  },
  {
    type: "pr",
    repo: "neo-wallet/core",
    message: "feat: add lightning channel management",
    time: "5h ago",
    icon: GitPullRequest,
  },
  {
    type: "review",
    repo: "architect-bot/engine",
    message: "Approved pull request #42",
    time: "1d ago",
    icon: MessageSquare,
  },
];

// Components

function ProjectCard({ project, delay }: { project: any; delay: number }) {
  return (
    <motion.a
      href={project.link}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group block relative border-[3px] border-black bg-[#0d1117] p-6 shadow-[4px_4px_0px_0px_#238636] hover:shadow-[8px_8px_0px_0px_#39d353] hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-black text-white group-hover:text-[#39d353] transition-colors flex items-center gap-2">
            {project.name}
            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity -ml-1 text-[#39d353]" />
          </h3>
          <p className="text-sm font-mono text-[#8b949e] mt-1">{project.role}</p>
        </div>
      </div>
      <p className="text-[#c9d1d9] text-sm leading-relaxed mb-6">
        {project.description}
      </p>
      <div className="flex items-center gap-4 text-xs font-bold text-[#8b949e]">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#39d353] border border-black" />
          {project.language}
        </span>
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5" />
          {project.stars}
        </span>
      </div>
    </motion.a>
  );
}

function ActivityItem({ item, delay }: { item: any; delay: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-start gap-4 py-4 border-b-[3px] border-black/50 last:border-b-0 group"
    >
      <div className="p-2 border-[2px] border-black bg-[#161b22] group-hover:bg-[#238636] transition-colors shadow-[2px_2px_0px_0px_#000]">
        <Icon className="w-4 h-4 text-white group-hover:text-black transition-colors" />
      </div>
      <div className="flex-1 pt-1">
        <p className="text-sm text-[#8b949e] font-mono mb-1">{item.repo}</p>
        <p className="text-base font-bold text-white">{item.message}</p>
      </div>
      <div className="pt-1">
        <span className="text-xs font-bold text-[#484f58] bg-black/50 px-2 py-1 border border-[#30363d]">
          {item.time}
        </span>
      </div>
    </motion.div>
  );
}

// Main page

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#010409] text-white selection:bg-[#39d353] selection:text-black font-[family-name:var(--font-geist-sans)]">
      {/* Sleek Header */}
      <header className="border-b-[3px] border-black bg-[#0d1117] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#39d353] border-[2px] border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center">
              <Zap className="w-4 h-4 text-black fill-black" />
            </div>
            <span className="font-black tracking-tight text-xl hidden sm:block">
              OS<span className="text-[#39d353]">.</span>GUILD
            </span>
          </div>

          <nav className="flex gap-1">
            {['Overview', 'Projects', 'Activity'].map((item, i) => (
              <button
                key={item}
                className={`px-4 py-2 text-sm font-bold border-[2px] transition-all
                  ${i === 0
                    ? 'border-black bg-[#238636] shadow-[2px_2px_0px_0px_#000] text-black'
                    : 'border-transparent text-[#8b949e] hover:text-white hover:border-black/50'}
                `}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

        {/* Profile Column */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-28"
          >
            {/* Minimal Avatar */}
            <div className="w-32 h-32 border-[4px] border-black bg-[#238636] mb-6 shadow-[6px_6px_0px_0px_#39d353] relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMikiLz4KPC9zdmc+')] opacity-50" />
            </div>

            <h1 className="text-4xl font-black mb-2 tracking-tight">OS Developer</h1>
            <p className="text-[#39d353] font-mono text-sm mb-6 border-[2px] border-black bg-[#161b22] px-3 py-1 inline-block shadow-[2px_2px_0px_0px_#000]">
              @osguild-dev
            </p>

            <p className="text-[#c9d1d9] leading-relaxed mb-8 text-lg font-medium">
              Building the decentralized future. Full-stack engineer focusing on Bitcoin protocols, cryptography, and open systems.
            </p>

            <div className="flex gap-4">
              <button className="flex-1 py-3 border-[3px] border-black bg-[#39d353] text-black font-black hover:bg-[#238636] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] transition-all shadow-[2px_2px_0px_0px_#000]">
                CONNECT
              </button>
              <button className="px-4 py-3 border-[3px] border-black bg-[#0d1117] text-white hover:bg-[#161b22] transition-colors shadow-[2px_2px_0px_0px_#000]">
                <Code2 className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-12 flex gap-8">
              <div>
                <p className="text-3xl font-black text-white">42</p>
                <p className="text-xs font-bold text-[#8b949e] uppercase tracking-wider mt-1">Projects</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#39d353]">8.4k</p>
                <p className="text-xs font-bold text-[#8b949e] uppercase tracking-wider mt-1">Contributions</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-8 space-y-16">

          {/* Projects Section */}
          <section>
            <div className="flex items-end justify-between mb-8 border-b-[3px] border-black pb-4">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <span className="w-3 h-3 bg-[#39d353] border-2 border-black inline-block" />
                Featured Work
              </h2>
              <a href="#" className="text-sm font-bold text-[#8b949e] hover:text-[#39d353] transition-colors border-b-2 border-transparent hover:border-[#39d353] pb-1">
                View all projects →
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pinnedProjects.map((project, i) => (
                <ProjectCard key={project.name} project={project} delay={0.2 + (i * 0.1)} />
              ))}
            </div>
          </section>

          {/* Activity Section */}
          <section>
            <div className="flex items-end justify-between mb-8 border-b-[3px] border-black pb-4">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <span className="w-3 h-3 bg-white border-2 border-black inline-block" />
                Recent Pulse
              </h2>
            </div>

            <div className="border-[3px] border-black bg-[#0d1117] p-6 shadow-[6px_6px_0px_0px_#000]">
              {recentActivity.map((item, i) => (
                <ActivityItem key={i} item={item} delay={0.4 + (i * 0.1)} />
              ))}

              <button className="w-full mt-6 py-3 border-[2px] border-black bg-[#161b22] font-bold text-[#c9d1d9] hover:bg-[#238636] hover:text-black hover:shadow-[4px_4px_0px_0px_#000] transition-all hover:-translate-y-0.5">
                Load more activity
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
