import { cache } from "react";
import { headers } from "next/headers";

export type NostrUser = {
  remoteUser: string | null;
  user: string | null;
  groups: string[];
  email: string | null;
  preferredUsername: string | null;
  name: string | null;
  picture: string | null;
};

const HEADER_PREFIX = "x-nostr-auth-";

function prefixed(name: string): string {
  return `${HEADER_PREFIX}${name}`;
}

export const getNostrUser = cache(async (): Promise<NostrUser | null> => {
  const headerStore = await headers();

  const remoteUser = headerStore.get(prefixed("remote-user"));
  const user = headerStore.get(prefixed("x-auth-request-user")) ?? remoteUser;

  if (!user && !remoteUser) {
    return null;
  }

  const rawGroups =
    headerStore.get(prefixed("x-auth-request-groups")) ??
    headerStore.get(prefixed("x-forwarded-groups")) ??
    "";

  return {
    remoteUser,
    user,
    groups: rawGroups
      .split(",")
      .map((group) => group.trim())
      .filter(Boolean),
    email: headerStore.get(prefixed("x-auth-request-email")),
    preferredUsername: headerStore.get(prefixed("x-auth-request-preferred-username")),
    name: headerStore.get(prefixed("x-auth-request-name")) ?? headerStore.get(prefixed("remote-user-name")),
    picture: headerStore.get(prefixed("x-auth-request-picture")) ?? headerStore.get(prefixed("remote-user-picture")),
  };
});
