import { Dashboard } from "@/components/dashboard";
import { auth } from "@/auth";
import type { NostrUser } from "@/lib/nostr-user";

export default async function DashboardPage() {
  const session = await auth();

  const user: NostrUser | null = session?.user ? {
    remoteUser: session.user.id || null,
    user: session.user.email || session.user.id || null,
    groups: [],
    email: session.user.email || null,
    preferredUsername: session.user.name?.split(" ")[0] || session.user.email || null,
    name: session.user.name || null,
    picture: session.user.image || null,
  } : null;

  return <Dashboard user={user} />;
}
