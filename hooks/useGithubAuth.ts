import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function useGithubAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signInWithGithub = async () => {
    if (!supabase) {
      setError(new Error("Supabase is not initialized"));
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error("GitHub auth error:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  return { signInWithGithub, signOut, isLoading, error };
}
