import { db } from "@/src/prisma/db";

export default async function AdminProjectsPage() {
  const projects = await db.orm.public.Project.all();

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
              Project Management
            </h1>

            <p className="mt-2 text-slate-600">
              Review and manage projects submitted to the campus archive.
            </p>
          </div>

          <a
            href="/admin"
            className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Back to Dashboard
          </a>
        </div>

        {/* Project List */}
        <section className="mt-8 rounded-xl border bg-white p-6">

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              All Projects
            </h2>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
              {projects.length} projects
            </span>
          </div>

          {projects.length === 0 ? (
            <div className="mt-6 rounded-lg border border-dashed p-10 text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                No projects found
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                There are currently no projects in the database.
              </p>
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-left">

                <thead>
                  <tr className="border-b bg-slate-50">
                    <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                      ID
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                      Project
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                      Category
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                      Academic Year
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                      Status
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-slate-700">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b last:border-b-0 hover:bg-slate-50"
                    >
                      <td className="px-4 py-4 text-sm text-slate-600">
                        {project.id}
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-900">
                          {project.title}
                        </p>

                        <p className="mt-1 max-w-md text-sm text-slate-500">
                          {project.description}
                        </p>
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600">
                        {project.category}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600">
                        {project.academicYear}
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {project.status}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <a
                          href={`/projects/${project.id}`}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </section>

      </div>
    </main>
  );
}
