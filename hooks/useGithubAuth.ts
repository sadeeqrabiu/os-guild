import { useState } from "react";
import { signIn, signOut as nextAuthSignOut } from "next-auth/react";

export function useGithubAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signInWithGithub = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await signIn("github", { callbackUrl: "/dashboard" });
    } catch (err) {
      console.error("GitHub auth error:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await nextAuthSignOut({ callbackUrl: "/" });
  };

  return { signInWithGithub, signOut, isLoading, error };
}
