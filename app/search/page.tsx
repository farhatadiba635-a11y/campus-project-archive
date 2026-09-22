"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getSearchResults } from "@/src/lib/search";
import { readAuthUser } from "@/src/lib/auth";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const user = readAuthUser();

  const groupedResults = useMemo(() => getSearchResults(query, user), [query, user]);
  const flattened = groupedResults.flatMap((group) =>
    group.items.map((item) => ({ ...item, group: group.category })),
  );

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Search results</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">
            {query ? `Results for “${query}”` : "Search the platform"}
          </h1>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Browse projects
        </Link>
      </header>

      {!query ? (
        <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
          Start typing in the global search to find projects, developers, technologies, documents, and more.
        </div>
      ) : flattened.length === 0 ? (
        <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900">No results found</h2>
          <p className="mt-3 text-slate-600">Try a broader keyword or search for a project name, technology, or mentor.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedResults.map((group) => (
            <section key={group.category} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold tracking-[-0.04em] text-slate-900">{group.category}</h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                  {group.items.length}
                </span>
              </div>

              <div className="space-y-3">
                {group.items.map((item) => (
                  <Link
                    key={`${group.category}-${item.title}-${item.description}`}
                    href={item.href}
                    className="block rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-300 hover:bg-cyan-50/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                      </div>
                      {item.badge ? (
                        <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                          {item.badge}
                        </span>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
