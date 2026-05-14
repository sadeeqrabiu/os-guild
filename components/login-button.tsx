"use client";

import { signIn, signOut } from "next-auth/react";

export function LoginButton({ session }: { session: any }) {
  if (session) {
    return (
      <button 
        onClick={() => signOut()}
        className="px-4 py-2 text-sm font-bold border-[2px] border-black bg-[#0d1117] text-[#8b949e] hover:border-black/50 hover:text-white transition-all shadow-[2px_2px_0px_0px_#000]"
      >
        Sign Out
      </button>
    );
  }

  return (
    <button 
      onClick={() => signIn("github", { callbackUrl: '/dashboard' })}
      className="px-4 py-2 text-sm font-bold border-[2px] border-black bg-[#238636] text-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#39d353] hover:shadow-[4px_4px_0px_0px_#000] transition-all"
    >
      Sign In with GitHub
    </button>
  );
}
