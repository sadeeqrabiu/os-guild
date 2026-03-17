import { Dashboard } from "@/components/dashboard";
import { getNostrUser } from "@/lib/nostr-user";

export default async function DashboardPage() {
  const user = await getNostrUser();

  return <Dashboard user={user} />;
}
