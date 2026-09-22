import type { Project } from "@/src/data/projects";

export function ProjectMetadata({ project }: { project: Project }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Status</p>
        <p className="mt-2 text-lg font-bold text-slate-900">{project.status}</p>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Team</p>
        <p className="mt-2 text-lg font-bold text-slate-900">{project.teamSize} Students</p>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Mentor</p>
        <p className="mt-2 text-lg font-bold text-slate-900">{project.facultyMentor}</p>
      </div>
    </div>
  );
}
