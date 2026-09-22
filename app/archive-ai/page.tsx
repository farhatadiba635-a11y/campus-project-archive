'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import { readAuthUser } from "@/src/lib/auth";
import type { ArchiveAiCitation } from "@/src/lib/archive-ai";

const starterQueries = [
  "How do previous teams troubleshoot Wi‑Fi issues?",
  "Which projects use ESP32 in the archive?",
  "What should I know about Firebase deployment problems?",
];

export default function ArchiveAiPage() {
  const [query, setQuery] = useState("How do previous teams troubleshoot Wi‑Fi issues?");
  const [answer, setAnswer] = useState<string>("");
  const [citations, setCitations] = useState<ArchiveAiCitation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const currentUser = readAuthUser();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      setError("Ask a question about the archive before submitting.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/archive-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, userRole: currentUser?.role ?? "STUDENT" }),
      });

      const payload = (await response.json()) as {
        answer?: string;
        citations?: ArchiveAiCitation[];
        error?: string;
      };

      if (!response.ok || !payload.answer) {
        throw new Error(payload.error ?? "The archive AI service is unavailable.");
      }

      setAnswer(payload.answer);
      setCitations(payload.citations ?? []);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "The archive AI service is unavailable.");
      setAnswer("");
      setCitations([]);
    } finally {
      setLoading(false);
    }
  };

  const answerLines = useMemo(() => (answer ? answer.split(/\n+/).filter(Boolean) : []), [answer]);

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Archive AI</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">
            Campus knowledge assistant
          </h1>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Browse the archive
        </Link>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <form onSubmit={onSubmit} className="space-y-5">
            <label className="block text-sm font-medium text-slate-700" htmlFor="archive-ai-question">
              Ask about the project archive
            </label>
            <textarea
              id="archive-ai-question"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              rows={5}
              className="w-full rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100"
              placeholder="Ask about deployment issues, architecture decisions, lessons learned, or technology choices..."
            />

            <div className="flex flex-wrap gap-2">
              {starterQueries.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => setQuery(sample)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  {sample}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Retrieving context..." : "Ask archive AI"}
              </button>
            </div>
          </form>

          {error ? (
            <div className="mt-6 rounded-[1.25rem] border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Grounded answer</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              {answerLines.length ? (
                answerLines.map((line) => <p key={line}>{line}</p>)
              ) : (
                <p className="text-slate-500">
                  Submit a question to retrieve relevant archive context and generate a citation-backed answer.
                </p>
              )}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">How it works</p>
            <ol className="mt-5 space-y-4 text-sm text-slate-700">
              <li>
                <span className="font-semibold text-slate-900">1.</span> Retrieve matching project and document context from the archive.
              </li>
              <li>
                <span className="font-semibold text-slate-900">2.</span> Send only relevant context to the answer generator.
              </li>
              <li>
                <span className="font-semibold text-slate-900">3.</span> Return only evidence-backed responses with citations.
              </li>
            </ol>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Citations</p>
            {citations.length ? (
              <ul className="mt-5 space-y-3">
                {citations.map((citation) => (
                  <li key={citation.id} className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-900">{citation.title}</p>
                      <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                        {citation.type}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">{citation.projectName ?? "Campus archive"}</p>
                    <p className="mt-2 line-clamp-3">{citation.snippet}</p>
                    {citation.href ? (
                      <a href={citation.href} className="mt-3 inline-block text-sm font-medium text-cyan-700">
                        Open source
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-slate-500">No citations yet. Ask a question to populate the evidence list.</p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
