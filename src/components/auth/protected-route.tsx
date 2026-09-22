"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  type AppRole,
  type AuthUser,
  isRoleAllowed,
  loadCurrentUserProfile,
} from "@/src/lib/auth";
import { getSupabaseConfigError, supabase } from "@/src/lib/supabase";

type ProtectedRouteProps = {
  allowedRoles: AppRole[];
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export function ProtectedRoute({
  allowedRoles,
  children,
  title = "Access restricted",
  description = "Choose a role to continue to this campus workspace.",
}: ProtectedRouteProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!supabase) {
      setUser(null);
      return;
    }

    let isMounted = true;

    const syncUser = async () => {
      try {
        const nextUser = await loadCurrentUserProfile();
        if (isMounted) {
          setUser(nextUser);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      }
    };

    void syncUser();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null);
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
      <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-5 py-12">
        <div className="w-full rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-600 shadow-sm">
          Loading protected content...
        </div>
      </main>
    );
  }

  if (configError) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-5 py-12">
        <div className="w-full rounded-[2rem] border border-amber-200 bg-amber-50 p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Configuration required</p>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-900">Supabase auth is not configured</h1>
          <p className="mt-3 text-base text-slate-700">{configError}</p>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-white p-4 text-sm text-slate-700">
            Required variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  if (!isRoleAllowed(user.role, allowedRoles)) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-5 py-12">
        <div className="w-full rounded-[2rem] border border-amber-200 bg-amber-50 p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Access required</p>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-900">{title}</h1>
          <p className="mt-3 text-base text-slate-700">{description}</p>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-white p-4 text-sm text-slate-700">
            Signed in as <span className="font-semibold text-slate-900">{user.name}</span> with role <span className="font-semibold text-slate-900">{user.role}</span>.
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Switch role
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Explore projects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
