"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  onboardingRoleOptions,
  resolveRequestedOnboardingRole,
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
} from "@/src/lib/auth";
import { getSupabaseConfigError } from "@/src/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const configError = getSupabaseConfigError();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestedRole, setRequestedRole] = useState<(typeof onboardingRoleOptions)[number]["value"]>("STUDENT");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    try {
      const normalizedRequestRole = resolveRequestedOnboardingRole(requestedRole);

      if (mode === "sign-up") {
        await signUpWithEmailAndPassword({
          email,
          password,
          fullName: name || email.split("@")[0],
        });

        if (normalizedRequestRole !== "STUDENT") {
          setStatus(
            "Your requested role has been saved in the onboarding flow; actual access remains governed by the backend role assigned to your account.",
          );
        }
      } else {
        await signInWithEmailAndPassword({ email, password });
      }

      router.push("/archive");
    } catch (caughtError) {
      setStatus(caughtError instanceof Error ? caughtError.message : "Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-5 py-12">
        <div className="w-full rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-600 shadow-sm">
          Loading sign-in page...
        </div>
      </main>
    );
  }

  if (configError) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-5 py-12">
        <div className="w-full rounded-[2rem] border border-amber-200 bg-amber-50 p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Authentication required</p>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-900">Supabase configuration is missing</h1>
          <p className="mt-3 text-base text-slate-700">{configError}</p>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-white p-4 text-sm text-slate-700">
            Required environment variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/projects" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
              Explore projects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-5 py-12">
      <div className="grid w-full gap-8 rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-cyan-50 p-6 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Campus Project Archive</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-slate-900 dark:text-white">Student Project Showcase Platform</h1>
          <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">
            Sign in with your campus account to archive project work, review submissions, and keep institutional knowledge alive.
          </p>

          <div className="mt-8 space-y-3 rounded-[1.5rem] border border-slate-200 bg-white/70 p-5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950/30 dark:text-slate-200">
            <p className="font-semibold text-slate-900 dark:text-white">Role access model</p>
            <ul className="space-y-2">
              <li>• Student: archive and maintain project work.</li>
              <li>• Teacher: review campus project submissions.</li>
              <li>• HOD: department oversight and institutional review.</li>
            </ul>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Actual permissions remain governed by the authenticated campus role in the database.
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-[1.75rem] border border-slate-200 bg-slate-50/90 p-6 dark:border-slate-700 dark:bg-slate-950/40">
          <div className="mb-5 flex items-center gap-2 rounded-full bg-white p-1 shadow-sm dark:bg-slate-900">
            <button
              type="button"
              onClick={() => setMode("sign-in")}
              className={[
                "flex-1 rounded-full px-4 py-2 text-sm font-semibold transition",
                mode === "sign-in" ? "bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950" : "text-slate-600 dark:text-slate-300",
              ].join(" ")}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode("sign-up")}
              className={[
                "flex-1 rounded-full px-4 py-2 text-sm font-semibold transition",
                mode === "sign-up" ? "bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950" : "text-slate-600 dark:text-slate-300",
              ].join(" ")}
            >
              Sign up
            </button>
          </div>

          {mode === "sign-up" ? (
            <>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Full name</label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">What is your role?</label>
                <div className="grid gap-2 sm:grid-cols-3">
                  {onboardingRoleOptions.map((roleOption) => {
                    const isSelected = requestedRole === roleOption.value;

                    return (
                      <button
                        key={roleOption.value}
                        type="button"
                        onClick={() => setRequestedRole(roleOption.value)}
                        className={[
                          "rounded-2xl border p-3 text-left transition",
                          isSelected
                            ? "border-cyan-500 bg-cyan-50 text-slate-900 shadow-sm dark:border-cyan-400 dark:bg-cyan-950/40 dark:text-cyan-100"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200",
                        ].join(" ")}
                        aria-pressed={isSelected}
                      >
                        <div className="text-sm font-semibold">{roleOption.label}</div>
                        <div className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">{roleOption.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : null}

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">College email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              placeholder="name@campus.edu"
              autoComplete="email"
              required
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              placeholder="Enter your password"
              autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
              required
              minLength={6}
            />
          </div>

          {status ? <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-950/30 dark:text-rose-200">{status}</div> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
          >
            {isSubmitting ? "Please wait..." : mode === "sign-up" ? "Create account" : "Sign in"}
          </button>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/projects" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              Explore projects
            </Link>
            <Link href="/archive" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400">
              Archive access
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
