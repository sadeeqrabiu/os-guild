import Link from "next/link";
import { Zap } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-[3px] border-black bg-[#0d1117]">
      <div className="flex h-16 w-full items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center border-[2px] border-black bg-[#39d353] shadow-[2px_2px_0px_0px_#000]">
            <Zap className="h-4 w-4 fill-black text-black" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            OS<span className="text-[#39d353]">.</span>GUILD
          </span>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="border-[2px] border-black bg-[#238636] px-4 py-2 text-sm font-bold text-black shadow-[2px_2px_0px_0px_#000] transition-all hover:-translate-y-0.5 hover:bg-[#39d353] hover:shadow-[4px_4px_0px_0px_#000]"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
