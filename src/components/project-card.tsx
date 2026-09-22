import Link from "next/link";
import type { Project } from "@/src/data/projects";
import { TechnologyBadge } from "@/src/components/technology-badge";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">{project.name}</h3>
          <p className="mt-2 text-sm font-medium text-slate-500">
            {project.department} · {project.academicYear}
          </p>
        </div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
          {project.status}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.technologies.slice(0, 4).map((tag) => (
          <TechnologyBadge key={tag} label={tag} />
        ))}
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{project.description}</p>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
        {project.summary}
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-500">
        <span className="rounded-full bg-slate-100 px-2.5 py-1">Difficulty: {project.difficulty}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1">Domain: {project.domain}</span>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
        <span>Team size: {project.teamSize}</span>
        <span>{project.resources} resources</span>
      </div>

      <div className="mt-5 flex gap-3">
        <Link
          href={`/projects/${project.id}`}
          className="flex-1 rounded-full bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          View Project
        </Link>
        <button className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          Ask AI
        </button>
      </div>
    </article>
  );
}
