"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Terminal, 
  Cpu, 
  GitPullRequest, 
  ShieldCheck, 
  Coins, 
  Users, 
  Code, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  Mail,
  CheckCircle2,
  Lock,
  Play,
  RotateCcw,
  Award,
  BookOpen,
  MessageSquare,
  Wallet,
  AppWindow,
  Smartphone,
  Send,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
  Check
} from "lucide-react";

// Import local assets
import BitnobLogoImg from "@/app/assets/bitnoblogo.svg";
import BtrustLogoImg from "@/app/assets/Btrust-white.png";

// Helper for count-up animation
function Counter({ end, suffix = "", duration = 1500 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span className="font-mono text-4xl sm:text-5xl font-black text-[#39d353]">
      {count}
      {suffix}
    </span>
  );
}

// Collapsible Container for long text blocks on mobile screens
interface CollapsibleContainerProps {
  children: React.ReactNode;
  maxHeightClass?: string;
  fromClass?: string;
  expandLabel?: string;
  collapseLabel?: string;
}

function CollapsibleContainer({
  children,
  maxHeightClass = "max-h-24",
  fromClass = "from-[#0d1117]",
  expandLabel = "▼ Show More",
  collapseLabel = "▲ Show Less"
}: CollapsibleContainerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="relative w-full">
      <div 
        className={`relative overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[800px]" : maxHeightClass
        }`}
      >
        {children}
        {!isExpanded && (
          <div className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t ${fromClass} to-transparent pointer-events-none`} />
        )}
      </div>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 inline-flex items-center gap-1 text-[#39d353] hover:text-[#2ea44f] transition-all font-black uppercase text-[10px] tracking-wider cursor-pointer bg-transparent border-none p-0 focus:outline-none"
      >
        {isExpanded ? collapseLabel : expandLabel}
      </button>
    </div>
  );
}

export function BitnobProposal() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [pledgeEmail, setPledgeEmail] = useState("");
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const [pledgeTxId, setPledgeTxId] = useState("");
  const [showPledgeModal, setShowPledgeModal] = useState(false);

  const handlePledgeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeEmail || !selectedTier) return;

    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const txId = `OSG-BITNOB-MINT-${randomCode}`;

    try {
      await fetch("/api/pledges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pledgeEmail, tier: selectedTier, txId }),
      });
    } catch (err) {
      console.error("Failed to post pledge to backend database:", err);
    }

    setPledgeTxId(txId);
    setPledgeSubmitted(true);
  };

  const openPledge = (tierName: string) => {
    setSelectedTier(tierName);
    setPledgeEmail("");
    setPledgeSubmitted(false);
    setShowPledgeModal(true);
  };

  const stages = [
    {
      id: 0,
      title: "Stage 0: Genesis Workshop",
      subtitle: "Developer Onboarding & API Integration Sprints",
      desc: "An intensive technical workshop onboarding software developers to the Bitnob API and checkout widgets. Focuses on setting up merchant Lightning checkouts, savings apps, and automated savings integrations.",
      metric: "50+ Activated Builders",
      duration: "Event Launch",
      color: "border-[#39d353] shadow-[#39d353]/20 text-[#39d353]"
    },
    {
      id: 1,
      title: "Stage 1: Foundation",
      subtitle: "6-Week mentored open source API sprints",
      desc: "Graduates commit to structured code sprints. Technical builders submit features, wrappers, and documentation directly into core Bitnob API developer ecosystems and open-source payment libraries.",
      metric: "6-Week Guided Cohort",
      duration: "Months 1 - 2",
      color: "border-[#238636] shadow-[#238636]/20 text-[#238636]"
    },
    {
      id: 2,
      title: "Stage 2: Specialization",
      subtitle: "Custom Lightning App Development",
      desc: "Advanced training integrating Bitnob APIs with protocol-level lightning networks. Attendees design customized multisig custody structures, merchant invoicing pipelines, and stablecoin voucher systems.",
      metric: "Lightning Deep Dives",
      duration: "Months 3 - 4",
      color: "border-[#f85149] shadow-[#f85149]/20 text-[#f85149]"
    },
    {
      id: 3,
      title: "Stage 3: Career Track",
      subtitle: "Professional Developer Placement",
      desc: "Placement of certified technical graduates into production open-source roles, Bitcoin developer internships, and professional fintech integrations throughout Africa.",
      metric: "Professional Placements",
      duration: "Months 5 - 6",
      color: "border-[#39d353] shadow-[#39d353]/20 text-[#39d353]"
    },
    {
      id: 4,
      title: "Stage 4: Sovereign Independence",
      subtitle: "Grants & Regional Ecosystem Leadership",
      desc: "Reaching absolute technical independence. Top performing graduates secure direct development grants to build sovereign regional apps and expand grassroots developer cohorts across East Africa.",
      metric: "Ecosystem Project Grants",
      duration: "Ongoing Growth",
      color: "border-[#238636] shadow-[#238636]/20 text-[#238636]"
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#010409] font-mono text-white selection:bg-[#39d353] selection:text-black overflow-x-hidden">
      
      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Sticky Header Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b-[3px] border-black bg-[#0d1117]/95 backdrop-blur-md p-4 shadow-[0_4px_0_0_#000]">
        <Link
          href="/genesis-workshop"
          className="flex items-center gap-2 border-[2px] border-transparent p-2 text-[#8b949e] transition-all hover:border-black hover:bg-[#161b22] hover:text-white cursor-pointer rounded-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-bold text-xs uppercase tracking-wider hidden sm:inline">Genesis Workshop</span>
          <span className="font-bold text-xs uppercase tracking-wider sm:hidden">Back</span>
        </Link>

        {/* Partnership Badging */}
        <div className="flex items-center gap-2">
          <span className="font-black text-xs sm:text-sm uppercase tracking-tight text-white select-none">
            OSGUILD<span className="text-[#39d353]">.</span>
          </span>
          <div className="h-4 w-[2px] bg-[#30363d]" />
          <div className="flex items-center gap-1 border border-[#39d353]/30 bg-[#39d353]/10 px-2.5 py-0.5 rounded text-[10px] sm:text-xs font-black uppercase text-[#39d353] tracking-widest shadow-[0_0_10px_rgba(57,211,83,0.1)]">
            <Sparkles className="h-3 w-3 inline mr-0.5 animate-pulse" />
            Bitnob Proposal
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-16">
        
        {/* Proposal Header Banner (The Hero) */}
        <header className="mb-16 border-[3px] border-black bg-[#0d1117] p-6 sm:p-8 md:p-12 shadow-[8px_8px_0px_0px_#000] relative overflow-hidden">
          {/* Subtle decorative cyber lines */}
          <div className="absolute top-0 right-0 w-24 h-[3px] bg-[#39d353]" />
          <div className="absolute top-0 right-0 w-[3px] h-24 bg-[#238636]" />
          <div className="absolute bottom-0 left-0 w-16 h-[3px] bg-[#f85149]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              <div className="mb-6 inline-flex items-center gap-2 border-[2px] border-black bg-[#161b22] px-4 py-2 font-black uppercase tracking-widest text-[#39d353] shadow-[4px_4px_0px_0px_#000] text-xs">
                <Coins className="h-4 w-4 text-[#39d353] animate-spin-slow" />
                Lightning Infrastructure Sponsorship
              </div>
              
              <h1 className="mb-4 text-3xl sm:text-5xl md:text-6xl font-black uppercase leading-none tracking-tight text-white">
                THE <span className="text-[#39d353]">GENESIS</span> <br />
                WORKSHOP
              </h1>
              
              <h2 className="mb-6 text-base sm:text-lg md:text-xl font-bold text-gray-300 border-l-4 border-[#39d353] pl-4 max-w-2xl">
                Activating Lightning Payment Infrastructure in Mauritius
              </h2>
              
              <p className="text-sm text-[#8b949e] font-medium max-w-xl leading-relaxed">
                A Strategic Partnership Proposal for Bitnob, onboarding sovereign developers to build custom web and mobile checkout widgets.
              </p>
            </div>

            {/* Bitnob Brand Container (Clean Brutalist Logo Circle) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-white border-[4px] border-black flex items-center justify-center p-8 shadow-[8px_8px_0px_0px_#000] overflow-hidden">
                <Image
                  src={BitnobLogoImg}
                  alt="Bitnob Logo"
                  width={140}
                  height={140}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </header>

        {/* Executive Summary Section */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-7 flex flex-col justify-between border-[3px] border-black bg-[#0d1117] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000]">
            <div>
              <h3 className="mb-6 inline-block border-b-[3px] border-[#39d353] text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                Executive Summary
              </h3>
              <CollapsibleContainer fromClass="from-[#0d1117]" maxHeightClass="max-h-24">
                <p className="mb-4 text-sm text-[#8b949e] leading-relaxed">
                  OSGuild and Bitnob share a core mission: <strong className="text-white">transforming emerging markets by onboarding developers to build on top of robust Bitcoin and Lightning payment infrastructure.</strong>
                </p>
                <p className="mb-4 text-sm text-[#8b949e] leading-relaxed">
                  Bitnob has established itself as one of Africa’s leading payment infrastructure and Bitcoin platforms, enabling individuals and businesses to move value globally using Lightning Network APIs, automated dollar-cost averaging (DCA), and digital financial tools. While Bitnob builds the financial rails that connect global markets, OSGuild builds the developer pipeline to ensure those systems are integrated, customized, and scaled locally.
                </p>
                <p className="text-sm text-[#8b949e] leading-relaxed">
                  The <strong className="text-white">Genesis Workshop</strong> in Mauritius is a hands-on, high-signal technical sprint designed by OSGuild in collaboration with **BitDevs Mauritius**. By partner-funding this initiative, Bitnob directly sponsors **developer onboarding and API building capability**, enabling sovereign software builders to master the **Bitnob API & Lightning SDK**, construct custom commercial checkouts, and submit active contributions to payment libraries—turning promising local students into professional regional developers.
                </p>
              </CollapsibleContainer>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col justify-between border-[3px] border-black bg-[#161b22] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] relative overflow-hidden">
            <div>
              <div className="mb-4 inline-block bg-[#f85149] text-black px-2.5 py-1 text-xs font-black uppercase tracking-wider rounded-sm shadow-[2px_2px_0px_0px_#000]">
                Proof of Work
              </div>
              <h4 className="text-lg font-black uppercase text-white mb-4">Technical Developer Focus</h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                The primary focus of the Genesis Workshop is **Technical Developer Onboarding**. This is not a standard community seminar; it is a **Proof of Work** engineering pipeline designed to train developers to build commercial financial checkouts.
              </p>
            </div>

            <div className="mt-8 border-t border-gray-800 pt-4 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-gray-500">Ecosystem Status</span>
              <span className="text-xs font-bold text-white uppercase">● Onboarding Route</span>
            </div>
          </div>
        </section>

        {/* The Problem & The Contributor Gap */}
        <section className="mb-16">
          <h3 className="mb-8 inline-block border-b-[3px] border-[#f85149] text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            The Problem: The API Integration & Onboarding Gap
          </h3>
          <p className="mb-8 text-sm text-[#8b949e] max-w-3xl">
            Emerging markets like Mauritius possess abundant talent and ready digital infrastructure, but developers and merchant coordinators frequently lack a structured pathway to master production payment rails. This gap exists due to a lack of:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                idx: "01",
                title: "Practical API Skills",
                desc: "Technical students understand Bitcoin theory, but they rarely have hands-on experience integrating Lightning checkouts, managing dynamic merchant invoice generation, or configuring API webhooks.",
                icon: <Users className="h-6 w-6 text-white" />,
                shadow: "border-black hover:border-[#39d353]"
              },
              {
                idx: "02",
                title: "Merchant Checkouts",
                desc: "Small businesses want fast, cheap payments but lack an active cohort of local software developers capable of building custom checkout checkouts and local currency settlement scripts.",
                icon: <ShieldCheck className="h-6 w-6 text-white" />,
                shadow: "border-black hover:border-[#f85149]"
              },
              {
                idx: "03",
                title: "Contributor Pathways",
                desc: "Emerging developers need structured, sprint-based mentorship to transition from casual coders to active contributors of open-source Bitcoin and payment libraries.",
                icon: <Code className="h-6 w-6 text-white" />,
                shadow: "border-black hover:border-[#39d353]"
              }
            ].map((item) => (
              <div 
                key={item.idx}
                className={`group border-[3px] bg-[#0d1117] p-6 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-1 transition-all ${item.shadow}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-black font-mono text-xs text-gray-500">GAP_{item.idx}</span>
                  {item.icon}
                </div>
                <h4 className="text-base font-black uppercase text-white mb-2">{item.title}</h4>
                <p className="text-xs text-[#8b949e] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Mauritius Sandbox Section */}
        <section className="mb-16 border-[3px] border-black bg-[#0d1117] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] relative">
          <h3 className="mb-8 inline-block border-b-[3px] border-[#39d353] text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            Why Mauritius? A High-Signal Technical Sandbox
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-[#39d353]/20 flex items-center justify-center text-xs font-black text-[#39d353]">1</span>
                <h4 className="text-sm font-black uppercase text-white">Explosion of Academic Talent</h4>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed pl-7">
                High interest and Software Engineering capability from students at the <strong className="text-white">University of Mauritius</strong> eager to build production-grade financial applications.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-[#39d353]/20 flex items-center justify-center text-xs font-black text-[#39d353]">2</span>
                <h4 className="text-sm font-black uppercase text-white">Active Protocol Core</h4>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed pl-7">
                A dedicated, growing community centered around <strong className="text-white">BitDevs Mauritius</strong> meetups, covering lightning liquidity, statechains, and cryptography.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-[#f85149]/20 flex items-center justify-center text-xs font-black text-[#f85149]">3</span>
                <h4 className="text-sm font-black uppercase text-white">Strategic Business Gateway</h4>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed pl-7">
                Mauritius serves as a highly digital, business-friendly bridge between the Indian Ocean, Africa, and global financial hubs—making it the ideal sandbox to pilot Lightning payment checkouts.
              </p>
            </div>
          </div>
        </section>

        {/* The Curriculum: Mastering the Bitnob API */}
        <section className="mb-16">
          <h3 className="mb-8 inline-block border-b-[3px] border-[#238636] text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            The Curriculum: Onboarding to the Bitnob API
          </h3>
          <p className="mb-8 text-sm text-[#8b949e] max-w-3xl">
            The Genesis Workshop curriculum focuses entirely on equipping developers with the practical skills necessary to build commercial payment applications using Bitnob's developer infrastructure:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border-[3px] border-black bg-[#0d1117] p-6 shadow-[4px_4px_0px_0px_#000] border-t-[6px] border-t-[#39d353]">
              <div className="flex items-center gap-2 mb-4 text-[#39d353]">
                <BookOpen className="h-5 w-5" />
                <h4 className="text-base font-black uppercase text-white">API & SDK Integration</h4>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Onboarding developers to construct secure payment handlers, generate Lightning checkout requests, and process payment callbacks using webhooks.
              </p>
            </div>

            <div className="border-[3px] border-black bg-[#0d1117] p-6 shadow-[4px_4px_0px_0px_#000] border-t-[6px] border-t-[#238636]">
              <div className="flex items-center gap-2 mb-4 text-[#238636]">
                <Users className="h-5 w-5" />
                <h4 className="text-base font-black uppercase text-white">Lightning Merchant Widgets</h4>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Building responsive web checkout portals and customized local billing scripts for student-led and merchant-run commerce points in Port Louis.
              </p>
            </div>

            <div className="border-[3px] border-black bg-[#0d1117] p-6 shadow-[4px_4px_0px_0px_#000] border-t-[6px] border-t-[#f85149]">
              <div className="flex items-center gap-2 mb-4 text-[#f85149]">
                <Award className="h-5 w-5" />
                <h4 className="text-base font-black uppercase text-white">Automated Savings</h4>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Designing automated savings, dollar-cost averaging (DCA), and reward programs on top of Bitnob's automated financial rails.
              </p>
            </div>

            <div className="border-[3px] border-black bg-[#0d1117] p-6 shadow-[4px_4px_0px_0px_#000] border-t-[6px] border-t-[#39d353] md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4 text-[#39d353]">
                <TrendingUp className="h-5 w-5" />
                <h4 className="text-base font-black uppercase text-white">Long-Term Sprints</h4>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Guiding developers to submit high-signal pull requests, write comprehensive documentation, and build client-side wrappers for open-source payment libraries.
              </p>
            </div>

            <div className="border-[3px] border-black bg-[#0d1117] p-6 shadow-[4px_4px_0px_0px_#000] border-t-[6px] border-t-[#238636] md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4 text-[#238636]">
                <Sparkles className="h-5 w-5" />
                <h4 className="text-base font-black uppercase text-white">Bitnob Developer Pipeline</h4>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Establishing the permanent regional cohort designed to champion Lightning Network solutions, payment APIs, and lead future developer onboarding rollouts across East Africa.
              </p>
            </div>
          </div>
        </section>

        {/* The OSGuild Structured Pathway Section */}
        <section className="mb-16">
          <h3 className="mb-8 inline-block border-b-[3px] border-[#39d353] text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            The OSGuild Structured Pathway
          </h3>
          <p className="mb-8 text-sm text-[#8b949e] max-w-3xl">
            The Genesis Workshop serves as <strong className="text-white">Stage 0</strong> in a multi-tier professional journey designed to guide local software builders toward long-term consistency and independent development careers. Click each stage to inspect:
          </p>

          {/* Interactive Steps Pipeline Timeline */}
          <div className="flex flex-col md:flex-row border-[3px] border-black bg-[#0d1117] shadow-[6px_6px_0px_0px_#000] overflow-hidden mb-8">
            {stages.map((stage, idx) => {
              const isSelected = activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`flex flex-row md:flex-col items-center justify-start md:justify-center p-4 md:p-6 gap-4 md:gap-0 transition-all border-b-[3px] md:border-b-0 md:border-r-[3px] last:border-b-0 md:last:border-r-0 border-black cursor-pointer w-full ${
                    isSelected 
                      ? "bg-[#161b22] text-white" 
                      : "bg-[#0d1117] text-gray-500 hover:bg-[#161b22]/50 hover:text-gray-300"
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black text-sm shrink-0 md:mb-2 ${
                    isSelected ? "bg-[#39d353] text-black" : "bg-[#161b22] text-gray-400"
                  }`}>
                    {stage.id}
                  </span>
                  <div className="flex flex-col items-start md:items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-left md:text-center">
                      {stage.id === 0 ? "GENESIS" : `STAGE ${stage.id}`}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400 md:hidden mt-0.5">
                      {stage.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Viewport Card */}
          <div className="border-[3px] border-black bg-[#0d1117] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] relative overflow-hidden transition-all">
            {/* Ambient edge tag */}
            <div className={`absolute top-0 right-0 border-b-[24px] border-b-transparent border-r-[24px] border-r-transparent ${stages[activeStage].color}`} />
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-gray-800 pb-6 mb-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#39d353] block mb-1">
                  Active Stage Specification
                </span>
                <h4 className="text-2xl font-black uppercase text-white">{stages[activeStage].title}</h4>
                <p className="text-sm font-bold text-gray-400 mt-1">{stages[activeStage].subtitle}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="border-2 border-black bg-[#161b22] px-3 py-1 text-xs font-black uppercase text-[#39d353] shadow-[2px_2px_0px_0px_#000]">
                  Target: {stages[activeStage].metric}
                </div>
                <div className="border-2 border-black bg-[#161b22] px-3 py-1 text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_#000]">
                  Timeline: {stages[activeStage].duration}
                </div>
              </div>
            </div>

            <CollapsibleContainer fromClass="from-[#0d1117]" maxHeightClass="max-h-16">
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-4xl">
                {stages[activeStage].desc}
              </p>
            </CollapsibleContainer>
          </div>
        </section>

        {/* Target Outcomes & Impact Table */}
        <section className="mb-16">
          <h3 className="mb-8 inline-block border-b-[3px] border-[#39d353] text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            Target Outcomes & Impact
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Onboarded Builders",
                value: 50,
                suffix: "+",
                desc: "Software builders and technical students onboarded to Lightning checkout APIs.",
                border: "border-black",
                tag: "DEVELOPER ONBOARDING"
              },
              {
                title: "Live Integrations",
                value: 20,
                suffix: "+",
                desc: "Working commercial checkouts, utilities, and widget apps active in production on Bitnob.",
                border: "border-black",
                tag: "API DEPLOYED"
              },
              {
                title: "Active Projects",
                value: 5,
                suffix: "+",
                desc: "Open-source billing libraries, SDK wrappers, or developer guides successfully created.",
                border: "border-black",
                tag: "ECOSYSTEM VALUE"
              },
              {
                title: "Local Infrastructure",
                value: 1,
                suffix: " Cohort",
                desc: "Permanent Bitnob developer pipeline established to scale regional deployments.",
                border: "border-black",
                tag: "REGIONAL PIPELINE"
              }
            ].map((metric, idx) => (
              <div 
                key={idx}
                className={`flex flex-col justify-between border-[3px] bg-[#0d1117] p-6 shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-y-1 ${metric.border}`}
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 block mb-2">{metric.tag}</span>
                  <Counter end={metric.value} suffix={metric.suffix} />
                  <h4 className="text-sm font-black uppercase text-white mt-4 mb-2">{metric.title}</h4>
                  <p className="text-xs text-[#8b949e] leading-relaxed">{metric.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Strategic Value for Bitnob */}
        <section className="mb-16">
          <h3 className="mb-8 inline-block border-b-[3px] border-[#238636] text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            Strategic Value for Bitnob
          </h3>
          <p className="mb-8 text-sm text-[#8b949e] max-w-3xl">
            By partner-funding the Genesis Workshop, Bitnob achieves highly leveraged developer onboarding and regional branding outcomes:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="border-[3px] border-black bg-[#0d1117] p-6 shadow-[4px_4px_0px_0px_#000] relative">
              <h4 className="text-sm font-black uppercase text-white mb-2">Accelerated Developer Onboarding</h4>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Establish Bitnob as the foundational API platform of choice for emerging software engineering talent in Mauritius.
              </p>
            </div>

            <div className="border-[3px] border-black bg-[#0d1117] p-6 shadow-[4px_4px_0px_0px_#000] relative">
              <h4 className="text-sm font-black uppercase text-white mb-2">Top-Tier Developer Sourcing</h4>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Connect with the brightest technical builders, future engineers, product ambassadors, and collaborators emerging from Mauritius.
              </p>
            </div>

            <div className="border-[3px] border-black bg-[#0d1117] p-6 shadow-[4px_4px_0px_0px_#000] relative">
              <h4 className="text-sm font-black uppercase text-white mb-2">Ecosystem Education Leader</h4>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Position Bitnob as a foundational organization actively investing in developer knowledge and long-term capacity building.
              </p>
            </div>

            <div className="border-[3px] border-black bg-[#0d1117] p-6 shadow-[4px_4px_0px_0px_#000] relative md:col-span-2 lg:col-span-2">
              <h4 className="text-sm font-black uppercase text-white mb-2">Indian Ocean Foothill</h4>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Secure visibility and strategic relationships in Mauritius, bridging Bitnob’s African footprint with global Indian Ocean and Asian markets.
              </p>
            </div>
          </div>

          {/* Value Proposition Callout */}
          <div className="border-[3px] border-black bg-[#161b22] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#39d353] relative overflow-hidden">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#39d353] block mb-2">
              VALUE PROPOSITION
            </span>
            <CollapsibleContainer fromClass="from-[#161b22]" maxHeightClass="max-h-24">
              <p className="text-sm sm:text-base font-bold text-gray-200 leading-relaxed max-w-4xl">
                Genesis gives Bitnob an opportunity to onboard, resource, and grow a vibrant, sovereign software development pipeline in Mauritius, establishing an active regional payments network built on top of their Lightning API.
              </p>
            </CollapsibleContainer>
          </div>
        </section>

        {/* Partnership Tiers (Premium Sponsorship Vouchers) */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h3 className="inline-block border-b-[3px] border-[#39d353] text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2">
              Partnership Opportunities
            </h3>
            <p className="text-sm text-[#8b949e] max-w-2xl mx-auto">
              Your sponsorship funds the physical infrastructure, technical mentorship, developer incentives, and student rewards necessary to transition developers and organizers into sovereign builders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Bronze Tier */}
            <div className="border-[3px] border-black bg-[#0d1117] flex flex-col justify-between p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000] border-t-[8px] border-t-amber-700 transition-all hover:-translate-y-1">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-600/10 px-2.5 py-0.5 rounded border border-amber-600/20">
                    Tier 3
                  </span>
                  <Award className="h-5 w-5 text-amber-600" />
                </div>
                <h4 className="text-xl font-black uppercase text-white">Genesis Catalyst</h4>
                <div className="font-mono text-3xl font-black text-amber-500 mt-2 mb-6">
                  $1,500
                </div>

                <CollapsibleContainer fromClass="from-[#0d1117]" maxHeightClass="max-h-24" expandLabel="▼ Show Features" collapseLabel="▲ Hide Features">
                  <ul className="text-xs text-gray-300 flex flex-col gap-4 border-t border-gray-800 pt-6">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">✔</span>
                      <span><strong>Brand Placement:</strong> Logo recognition across physical workshop materials, event guides, and digital assets.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">✔</span>
                      <span><strong>Ecosystem Presence:</strong> Mention in promotional communications, and opening and closing remarks.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">✔</span>
                      <span><strong>Developer Exposure:</strong> Brand visibility during standard technical workshops.</span>
                    </li>
                  </ul>
                </CollapsibleContainer>
              </div>

              <button 
                onClick={() => openPledge("Genesis Catalyst — $1,500")}
                className="mt-8 w-full border-[2px] border-black bg-white hover:bg-gray-100 text-black py-3 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000] transition-all cursor-pointer rounded-sm"
              >
                Pledge Support
              </button>
            </div>

            {/* Silver Tier */}
            <div className="border-[3px] border-black bg-[#0d1117] flex flex-col justify-between p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000] border-t-[8px] border-t-gray-400 transition-all hover:-translate-y-1">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 bg-gray-400/10 px-2.5 py-0.5 rounded border border-gray-400/20">
                    Tier 2
                  </span>
                  <Award className="h-5 w-5 text-gray-400" />
                </div>
                <h4 className="text-xl font-black uppercase text-white">Community Pillar</h4>
                <div className="font-mono text-3xl font-black text-gray-300 mt-2 mb-6">
                  $3,000
                </div>

                <CollapsibleContainer fromClass="from-[#0d1117]" maxHeightClass="max-h-24" expandLabel="▼ Show Features" collapseLabel="▲ Hide Features">
                  <ul className="text-xs text-gray-300 flex flex-col gap-4 border-t border-gray-800 pt-6">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 font-bold">✔</span>
                      <span><strong>Featured Landing Page Spot:</strong> Direct logo placement on the OS-Guild webpage.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 font-bold">✔</span>
                      <span><strong>Developer Analytics:</strong> Post-cohort impact report detailing GitHub PR metrics and custom checkouts developed.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 font-bold">✔</span>
                      <span><strong>Showcase Spotlight:</strong> Priority access to test, review, and hire emerging builders from the sandbox project showcase.</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-400 italic">
                      <span>* Includes all benefits of Sovereign Visionary.</span>
                    </li>
                  </ul>
                </CollapsibleContainer>
              </div>

              <button 
                onClick={() => openPledge("Ecosystem Partner — $3,000")}
                className="mt-8 w-full border-[2px] border-black bg-white hover:bg-gray-100 text-black py-3 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000] transition-all cursor-pointer rounded-sm"
              >
                Pledge Support
              </button>
            </div>

            {/* Gold Tier (Genesis Catalyst - Glowing Holographic) */}
            <div className="relative group flex flex-col justify-between border-[3px] border-black bg-[#0d1117] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#39d353] border-t-[8px] border-t-[#39d353] transition-all hover:-translate-y-1 md:col-span-2 lg:col-span-1">
              {/* Neon accent corner badge */}
              <div className="absolute top-0 right-0 bg-[#39d353] text-black font-black uppercase text-[8px] px-2 py-0.5 tracking-widest rounded-bl-sm">
                MOST IMPACT
              </div>

              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#39d353] bg-[#39d353]/10 px-2.5 py-0.5 rounded border border-[#39d353]/20">
                    Tier 1
                  </span>
                  <Sparkles className="h-5 w-5 text-[#39d353] animate-pulse" />
                </div>
                <h4 className="text-xl font-black uppercase text-white">Genesis Catalyst</h4>
                <div className="font-mono text-3xl font-black text-[#39d353] mt-2 mb-6">
                  $5,000+
                </div>

                <CollapsibleContainer fromClass="from-[#0d1117]" maxHeightClass="max-h-24" expandLabel="▼ Show Features" collapseLabel="▲ Hide Features">
                  <ul className="text-xs text-gray-300 flex flex-col gap-4 border-t border-gray-800 pt-6">
                    <li className="flex items-start gap-2">
                      <span className="text-[#39d353] font-bold">✔</span>
                      <span><strong>Direct Keynote Address:</strong> Design and deliver the workshop address and direct collaborative challenge tracks.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#39d353] font-bold">✔</span>
                      <span><strong>Post-Event Mentorship:</strong> Co-sponsor subsequent mentored cohorts, actively guiding top-performing technical graduates.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#39d353] font-bold">✔</span>
                      <span><strong>Sovereign Breakout Sessions:</strong> Host specialized developer roundtables focusing on Lightning payment API scaling and digital finance architectures.</span>
                    </li>
                    <li className="flex items-start gap-2 text-[#39d353] italic">
                      <span>* Includes all benefits of Supporting & Ecosystem Partner.</span>
                    </li>
                  </ul>
                </CollapsibleContainer>
              </div>

              <button 
                onClick={() => openPledge("Founding Partner — $5,000+")}
                className="mt-8 w-full border-[2px] border-black bg-[#39d353] hover:bg-[#2ea44f] text-black py-3 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000] transition-all cursor-pointer rounded-sm"
              >
                Secure Sponsorship Pass
              </button>
            </div>

          </div>
        </section>

        {/* Co-Host Supporter section */}
        <section className="mb-24 border-t border-gray-800 pt-16 flex flex-col items-center">
          <h4 className="mb-8 font-black uppercase text-xs tracking-widest text-gray-500">
            In Collaboration With
          </h4>
          <div className="flex w-full max-w-sm justify-center">
            <div className="group relative flex aspect-[2/1] w-full cursor-pointer items-center justify-center border-[3px] border-black bg-[#0d1117] p-8 shadow-[4px_4px_0px_0px_#000] transition-all hover:-translate-y-1 hover:bg-[#161b22] hover:shadow-[6px_6px_0px_0px_#000]">
              <Image
                src={BtrustLogoImg}
                alt="Btrust"
                fill
                className="object-contain p-8 opacity-80 transition-opacity group-hover:opacity-100"
              />
            </div>
          </div>
        </section>

        {/* Final CTA / Closing Section */}
        <section className="animate-item flex flex-col items-center border-[4px] border-black bg-[#39d353] p-8 text-center shadow-[12px_12px_0px_0px_#000] sm:p-16 md:p-24 relative overflow-hidden">
          {/* Neon accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-b-4 border-r-4 border-black" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-t-4 border-l-4 border-black" />

          <h2 className="mb-6 max-w-3xl text-2xl sm:text-4xl md:text-5xl font-black uppercase leading-tight tracking-tight text-black">
            Let&apos;s build the sovereign payment pipeline.
          </h2>
          
          <p className="mb-10 max-w-2xl text-xs sm:text-sm font-bold text-black/80 leading-relaxed">
            The Genesis Workshop is a major step toward establishing a self-sustaining, community-driven Bitcoin open-source ecosystem in Mauritius. With Bitnob’s support, we will equip the next generation of technical builders and merchant coordinators with the skills, workflows, and tools to ensure the decentralized future is built by the communities who need it most.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
            <a 
              href="mailto:info@osguild.dev?subject=Bitnob%20Genesis%20Workshop%20Sponsorship"
              className="flex items-center justify-center gap-2 border-[3px] border-black bg-black text-white px-6 py-4 text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] hover:bg-gray-900 transition-all rounded-sm cursor-pointer"
            >
              <Mail className="h-4 w-4" />
              Contact: info@osguild.dev
            </a>
            <button 
              onClick={() => openPledge("Founding Partner — $5,000+")}
              className="flex items-center justify-center gap-2 border-[3px] border-black bg-white text-black px-6 py-4 text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 transition-all rounded-sm cursor-pointer"
            >
              Pledge Sponsorship
            </button>
          </div>
          
          <div className="mt-8 font-mono text-[10px] font-black text-black/60 uppercase">
            OSGuild & BitDevs Mauritius | info@osguild.dev | bitdevs.mu
          </div>
        </section>

      </main>

      {/* Interactive Cyberpunk Sponsorship Pledge Modal */}
      {showPledgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg border-[4px] border-black bg-[#0d1117] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#39d353] animate-fade-in text-left">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-gray-800 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-black uppercase text-[#39d353] block mb-1">
                  Secure Pledge Gate
                </span>
                <h4 className="text-xl font-black uppercase text-white">
                  Pledge Partnership
                </h4>
              </div>
              <button 
                onClick={() => setShowPledgeModal(false)}
                className="font-bold text-gray-500 hover:text-white cursor-pointer px-2 border-none bg-transparent"
              >
                ✕
              </button>
            </div>

            {/* Non-submitted Pledge Form */}
            {!pledgeSubmitted ? (
              <form onSubmit={handlePledgeSubmit} className="flex flex-col gap-4">
                <div className="border-[2px] border-black bg-[#161b22] p-4 text-xs">
                  <span className="font-bold text-gray-400 block mb-1">SELECTED PROGRAM CONTRIBUTION:</span>
                  <span className="font-black text-white uppercase text-sm">{selectedTier}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold text-gray-300">
                    Sponsor Representative Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="partner@bitnob.com"
                    value={pledgeEmail}
                    onChange={(e) => setPledgeEmail(e.target.value)}
                    className="border-[2px] border-black bg-[#161b22] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#39d353] rounded-sm"
                  />
                </div>

                <p className="text-[10px] text-gray-500 leading-relaxed">
                  * By submitting this pledge, you notify the OSGuild and BitDevs Mauritius logistics teams. A representative will contact you with invoice details and custom checkout challenges within 12 hours.
                </p>

                <button
                  type="submit"
                  className="mt-4 border-[3px] border-black bg-[#39d353] hover:bg-[#2ea44f] text-black py-4 text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#000] cursor-pointer rounded-sm transition-all"
                >
                  Confirm Partnership Pledge
                </button>
              </form>
            ) : (
              // Submitted Success State (Voucher Ticket output)
              <div className="flex flex-col items-center text-center gap-4 py-4">
                <CheckCircle2 className="h-12 w-12 text-[#39d353] animate-bounce-slow" />
                <h5 className="text-lg font-black uppercase text-[#39d353]">
                  PLEDGE CAPTURED SUCCESSFUL
                </h5>
                <p className="text-xs text-gray-300 max-w-sm">
                  Your pledge support for <strong className="text-white">{selectedTier}</strong> has been logged to the coordinator network.
                </p>

                {/* Cyber Receipt Ticket */}
                <div className="w-full border-2 border-dashed border-gray-700 bg-[#161b22] p-4 text-left font-mono text-[10px] sm:text-xs flex flex-col gap-2 rounded-sm mt-2 relative">
                  {/* Decorative corner ticket cuts */}
                  <div className="absolute top-1/2 -left-[6px] -translate-y-1/2 w-3 h-3 bg-[#0d1117] rounded-full border-r border-gray-700" />
                  <div className="absolute top-1/2 -right-[6px] -translate-y-1/2 w-3 h-3 bg-[#0d1117] rounded-full border-l border-gray-700" />

                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="font-bold text-gray-500">MINT_VOUCHER_ID:</span>
                    <span className="font-black text-[#39d353]">{pledgeTxId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">INITIATED_BY:</span>
                    <span className="text-white font-bold">{pledgeEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">PARTNER_STATUS:</span>
                    <span className="text-[#39d353] font-black uppercase tracking-wider">● COHORT_PENDING</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">DATE:</span>
                    <span className="text-white">{new Date().toISOString().split("T")[0]}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowPledgeModal(false)}
                  className="mt-6 border-[2px] border-black bg-white hover:bg-gray-100 text-black px-6 py-2.5 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000] cursor-pointer rounded-sm transition-all"
                >
                  Return to Proposal
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default BitnobProposal;
