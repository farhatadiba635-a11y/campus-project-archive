"use client";

import Link from "next/link";

export default function FacultyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Faculty Portal
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Faculty Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Manage student projects, review submissions and access the project archive.
            </p>
          </div>

          <Link
            href="/projects"
            className="rounded-lg bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-slate-700"
          >
            Browse Projects
          </Link>
        </div>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Projects</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">24</p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Pending Review</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">6</p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Approved</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">15</p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Archived</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">9</p>
          </div>

        </section>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Faculty Actions
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">

            <Link
              href="/projects"
              className="rounded-lg border p-5 hover:bg-slate-50"
            >
              <h3 className="font-semibold text-slate-900">
                View Projects
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Browse and view student project details.
              </p>
            </Link>

            <Link
              href="/archive"
              className="rounded-lg border p-5 hover:bg-slate-50"
            >
              <h3 className="font-semibold text-slate-900">
                Project Archive
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Access archived academic projects.
              </p>
            </Link>

            <Link
              href="/search"
              className="rounded-lg border p-5 hover:bg-slate-50"
            >
              <h3 className="font-semibold text-slate-900">
                Search Projects
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Find projects by title, technology or domain.
              </p>
            </Link>

          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Recent Projects
          </h2>

          <div className="mt-5 space-y-4">

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-slate-900">
                AI Based Student Project Archive
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Artificial Intelligence · RAG · PostgreSQL
              </p>
              <p className="mt-2 text-sm font-medium text-amber-600">
                Pending Review
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-slate-900">
                Smart Campus Management System
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Web Development · Database
   
              </p>
              <p className="mt-2 text-sm font-medium text-green-600">
                Approved
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-slate-900">
                Machine Learning Project Repository
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Machine Learning · Python
              </p>
              <p className="mt-2 text-sm font-medium text-green-600">
                Approved
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
