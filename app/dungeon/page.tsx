"use client";

import { motion } from "framer-motion";
import {
  Star,
  Code2,
  GitPullRequest,
  MessageSquare,
  ArrowUpRight,
  Terminal,
  Zap,
} from "lucide-react";

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
    repo: "os-guild/ui",
    message: "refactor: simplify dashboard components",
    time: "2h ago",
    icon: Terminal,
  },
  {
    repo: "neo-wallet/core",
    message: "feat: add lightning channel management",
    time: "5h ago",
    icon: GitPullRequest,
  },
  {
    repo: "architect-bot/engine",
    message: "Approved pull request #42",
    time: "1d ago",
    icon: MessageSquare,
  },
];

function ProjectCard({ project, delay }: { project: (typeof pinnedProjects)[number]; delay: number }) {
  return (
    <motion.a
      href={project.link}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group relative block border-[3px] border-black bg-[#0d1117] p-6 shadow-[4px_4px_0px_0px_#238636] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#39d353]"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-xl font-black text-white transition-colors group-hover:text-[#39d353]">
            {project.name}
            <ArrowUpRight className="-ml-1 h-5 w-5 text-[#39d353] opacity-0 transition-opacity group-hover:opacity-100" />
          </h3>
          <p className="mt-1 font-mono text-sm text-[#8b949e]">{project.role}</p>
        </div>
      </div>
      <p className="mb-6 text-sm leading-relaxed text-[#c9d1d9]">{project.description}</p>
      <div className="flex items-center gap-4 text-xs font-bold text-[#8b949e]">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full border border-black bg-[#39d353]" />
          {project.language}
        </span>
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5" />
          {project.stars}
        </span>
      </div>
    </motion.a>
  );
}

function ActivityItem({ item, delay }: { item: (typeof recentActivity)[number]; delay: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group flex items-start gap-4 border-b-[3px] border-black/50 py-4 last:border-b-0"
    >
      <div className="bg-[#161b22] p-2 shadow-[2px_2px_0px_0px_#000] transition-colors group-hover:bg-[#238636]">
        <Icon className="h-4 w-4 text-white transition-colors group-hover:text-black" />
      </div>
      <div className="flex-1 pt-1">
        <p className="mb-1 font-mono text-sm text-[#8b949e]">{item.repo}</p>
        <p className="text-base font-bold text-white">{item.message}</p>
      </div>
      <div className="pt-1">
        <span className="border border-[#30363d] bg-black/50 px-2 py-1 text-xs font-bold text-[#484f58]">
          {item.time}
        </span>
      </div>
    </motion.div>
  );
}

export default function DungeonPage() {
  const displayName = "OS Developer";
  const handle = "@osguild-dev";
  const subtitle = "Building the decentralized future. Full-stack engineer focusing on Bitcoin protocols, cryptography, and open systems.";

  return (
    <div className="min-h-screen bg-[#010409] font-[family-name:var(--font-geist-sans)] text-white selection:bg-[#39d353] selection:text-black">
      <header className="sticky top-0 z-50 border-b-[3px] border-black bg-[#0d1117]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center border-[2px] border-black bg-[#39d353] shadow-[2px_2px_0px_0px_#000]">
              <Zap className="h-4 w-4 fill-black text-black" />
            </div>
            <span className="hidden text-xl font-black tracking-tight sm:block">
              OS<span className="text-[#39d353]">.</span>GUILD
            </span>
          </div>

          <nav className="flex gap-1">
            {["Overview", "Projects", "Activity"].map((item, i) => (
              <button
                key={item}
                className={`px-4 py-2 text-sm font-bold transition-all ${
                  i === 0
                    ? "border-black bg-[#238636] text-black shadow-[2px_2px_0px_0px_#000]"
                    : "border-transparent text-[#8b949e] hover:border-black/50 hover:text-white"
                } border-[2px]`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="sticky top-28">
            <div className="relative mb-6 h-32 w-32 border-[4px] border-black bg-[#238636] shadow-[6px_6px_0px_0px_#39d353]">
              <div className="absolute inset-0 opacity-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMikiLz4KPC9zdmc+')]" />
            </div>

            <h1 className="mb-2 text-4xl font-black tracking-tight">{displayName}</h1>
            <p className="mb-6 inline-block border-[2px] border-black bg-[#161b22] px-3 py-1 font-mono text-sm text-[#39d353] shadow-[2px_2px_0px_0px_#000]">
              {handle}
            </p>

            <p className="mb-8 text-lg leading-relaxed font-medium text-[#c9d1d9]">{subtitle}</p>

            <div className="flex gap-4">
              <button className="flex-1 border-[3px] border-black bg-[#39d353] py-3 font-black text-black shadow-[2px_2px_0px_0px_#000] transition-all hover:-translate-y-1 hover:bg-[#238636] hover:shadow-[4px_4px_0px_0px_#000]">
                CONNECT
              </button>
              <button className="border-[3px] border-black bg-[#0d1117] px-4 py-3 text-white shadow-[2px_2px_0px_0px_#000] transition-colors hover:bg-[#161b22]">
                <Code2 className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-12 flex gap-8">
              <div>
                <p className="text-3xl font-black text-white">42</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#8b949e]">Projects</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#39d353]">8.4k</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#8b949e]">Contributions</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-16 lg:col-span-8">
          <section>
            <div className="mb-8 flex items-end justify-between border-b-[3px] border-black pb-4">
              <h2 className="flex items-center gap-3 text-2xl font-black">
                <span className="inline-block h-3 w-3 border-2 border-black bg-[#39d353]" />
                Featured Work
              </h2>
              <a
                href="#"
                className="border-b-2 border-transparent pb-1 text-sm font-bold text-[#8b949e] transition-colors hover:border-[#39d353] hover:text-[#39d353]"
              >
                View all projects →
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {pinnedProjects.map((project, i) => (
                <ProjectCard key={project.name} project={project} delay={0.2 + i * 0.1} />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-8 flex items-end justify-between border-b-[3px] border-black pb-4">
              <h2 className="flex items-center gap-3 text-2xl font-black">
                <span className="inline-block h-3 w-3 border-2 border-black bg-white" />
                Recent Pulse
              </h2>
            </div>

            <div className="border-[3px] border-black bg-[#0d1117] p-6 shadow-[6px_6px_0px_0px_#000]">
              {recentActivity.map((item, i) => (
                <ActivityItem key={item.message} item={item} delay={0.4 + i * 0.1} />
              ))}

              <button className="mt-6 w-full border-[2px] border-black bg-[#161b22] py-3 font-bold text-[#c9d1d9] transition-all hover:-translate-y-0.5 hover:bg-[#238636] hover:text-black hover:shadow-[4px_4px_0px_0px_#000]">
                Load more activity
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
