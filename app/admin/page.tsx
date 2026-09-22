import { db } from "@/src/prisma/db";

export default async function AdminPage() {
  const projects = await db.orm.public.Project.all();

  const totalProjects = projects.length;

  const pendingReview = projects.filter(
    (project) =>
      project.status === "SUBMITTED" ||
      project.status === "UNDER_REVIEW"
  ).length;

  const approved = projects.filter(
    (project) => project.status === "APPROVED"
  ).length;

  const archived = projects.filter(
    (project) => project.status === "ARCHIVED"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wide text-blue-600">
              ADMIN PORTAL
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Manage users, projects, approvals and the project archive.
            </p>
          </div>

          <a
            href="/projects"
            className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Browse Projects
          </a>
        </div>

        {/* Statistics */}
        <section className="mt-8 grid gap-4 md:grid-cols-4">

          <div className="rounded-xl border bg-white p-6">
            <p className="text-sm text-slate-500">
              Total Projects
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {totalProjects}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <p className="text-sm text-slate-500">
              Pending Review
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {pendingReview}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <p className="text-sm text-slate-500">
              Approved
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {approved}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <p className="text-sm text-slate-500">
              Archived
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {archived}
            </p>
          </div>

        </section>

        {/* Admin Actions */}
        <section className="mt-8 rounded-xl border bg-white p-6">

          <h2 className="text-xl font-bold text-slate-900">
            Admin Actions
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">

            <a
              href="/projects"
              className="rounded-lg border p-5 hover:bg-slate-50"
            >
              <h3 className="font-semibold text-slate-900">
                Manage Projects
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Review, approve and manage student projects.
              </p>
            </a>

            <a
              href="/search"
              className="rounded-lg border p-5 hover:bg-slate-50"
            >
              <h3 className="font-semibold text-slate-900">
                Search Projects
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Find projects by title, technology or domain.
              </p>
            </a>

            <a
              href="/archive"
              className="rounded-lg border p-5 hover:bg-slate-50"
            >
              <h3 className="font-semibold text-slate-900">
                Project Archive
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Access archived academic projects.
              </p>
            </a>

          </div>

        </section>

        {/* System Information */}
        <section className="mt-8 rounded-xl border bg-white p-6">

          <h2 className="text-xl font-bold text-slate-900">
            System Overview
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">

            <div className="rounded-lg bg-slate-50 p-5">
              <p className="text-sm text-slate-500">
                Application
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                Smart Campus Management System
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-5">
              <p className="text-sm text-slate-500">
                Platform
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                Next.js · PostgreSQL
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}