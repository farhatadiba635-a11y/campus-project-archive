"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  clearAuthUser,
  getRoleLabel,
  loadCurrentUserProfile,
  signOutFromSupabase,
  type AuthUser,
} from "@/src/lib/auth";
import { getSupabaseConfigError, supabase } from "@/src/lib/supabase";

export function AuthStatus() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!supabase) {
      setUser(null);
      setError(null);
      return;
    }

    let isMounted = true;

    const syncUser = async () => {
      try {
        const nextUser = await loadCurrentUserProfile();
        if (isMounted) {
          setUser(nextUser);
          setError(null);
        }
      } catch (caughtError) {
        if (isMounted) {
          setUser(null);
          setError(caughtError instanceof Error ? caughtError.message : "Unable to load profile.");
        }
      }
    };

    void syncUser();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        clearAuthUser();
        setUser(null);
        setError(null);
        return;
      }

      void syncUser();
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const configError = getSupabaseConfigError();

  if (!mounted) {
    return (
      <div className="mb-4 rounded-[1.5rem] border border-slate-200 bg-white p-3 text-sm text-slate-600 shadow-sm">
        Loading account status...
      </div>
    );
  }

  if (configError) {
    return (
      <div className="mb-4 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 shadow-sm">
        Supabase auth is not configured. Required variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOutFromSupabase();
      clearAuthUser();
      setUser(null);
      setError(null);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Sign-out failed.");
    }
  };

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Signed in as</p>
        <div className="mt-1 flex items-center gap-3">
          {user ? (
            <>
              <span className="inline-flex rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
                {getRoleLabel(user.role)}
              </span>
              <span className="text-sm font-medium text-slate-700">{user.name}</span>
            </>
          ) : (
            <span className="text-sm font-medium text-slate-600">Not signed in</span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/login"
          className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
        >
          {user ? "Account" : "Sign in"}
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-full bg-slate-900 px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!user}
        >
          Sign out
        </button>
      </div>

      {error ? <div className="mt-2 text-xs text-rose-700">{error}</div> : null}
    </div>
  );
}
