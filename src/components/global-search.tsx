"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { readAuthUser } from "@/src/lib/auth";
import { getSearchResults } from "@/src/lib/search";

export function GlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const user = mounted ? readAuthUser() : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 180);

    return () => window.clearTimeout(timer);
  }, [query]);

  const groupedResults = useMemo(() => {
    return getSearchResults(debouncedQuery, user).slice(0, 5);
  }, [debouncedQuery, user]);

  const hasQuery = Boolean(query.trim());

  const handleSubmit = () => {
    const nextQuery = query.trim();
    setIsOpen(false);
    if (!nextQuery) {
      router.push("/projects");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(nextQuery)}`);
  };

  return (
    <div className="relative w-full max-w-xl">
      <label className="sr-only" htmlFor="global-search">
        Search the DevHub platform
      </label>

      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 shadow-sm transition focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-200/60 dark:border-slate-700 dark:bg-slate-900/80 dark:focus-within:border-cyan-400 dark:focus-within:ring-cyan-400/30">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 text-slate-500 dark:text-slate-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <circle cx="11" cy="11" r="6" />
          <path d="M16 16L21 21" strokeLinecap="round" />
        </svg>

        <input
          id="global-search"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setIsOpen(false), 150);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Search projects, developers, technologies, hackathons..."
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
          aria-label="Search DevHub"
        />

        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Clear
          </button>
        ) : null}
      </div>

      {isOpen && (hasQuery || groupedResults.length > 0) ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-50 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white/95 p-3 shadow-[0_28px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/95">
          {groupedResults.length ? (
            <div className="max-h-[430px] space-y-4 overflow-y-auto pr-1">
              {groupedResults.map((group) => (
                <div key={group.category} className="space-y-2">
                  <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {group.category}
                  </p>

                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={`${group.category}-${item.title}-${item.description}`}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-start justify-between gap-3 rounded-2xl px-2 py-2 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                          <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                        </div>
                        {item.badge ? (
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                            {item.badge}
                          </span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[1rem] bg-slate-50 px-3 py-4 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              No matching projects, developers, technologies, hackathons, or documents found.
            </div>
          )}

          <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-700">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center text-sm font-semibold text-cyan-700 transition hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
            >
              View all results →
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
