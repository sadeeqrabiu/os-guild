"use client";

import { createContext, useContext } from "react";
import type { NostrUser } from "@/lib/nostr-user";

const NostrUserContext = createContext<NostrUser | null>(null);

export function NostrUserProvider({
  user,
  children,
}: {
  user: NostrUser | null;
  children: React.ReactNode;
}) {
  return <NostrUserContext.Provider value={user}>{children}</NostrUserContext.Provider>;
}

export function useNostrUser(): NostrUser | null {
  return useContext(NostrUserContext);
}
