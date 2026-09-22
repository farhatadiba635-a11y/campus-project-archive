import type { ProjectDifficulty, ProjectStatus } from "@/src/data/projects";

type ProjectFiltersProps = {
  department: string;
  academicYear: string;
  technology: string;
  domain: string;
  difficulty: string;
  status: string;
  setDepartment: (value: string) => void;
  setAcademicYear: (value: string) => void;
  setTechnology: (value: string) => void;
  setDomain: (value: string) => void;
  setDifficulty: (value: string) => void;
  setStatus: (value: string) => void;
  onReset: () => void;
  departments: string[];
  years: string[];
  technologies: string[];
  domains: string[];
  difficulties: ProjectDifficulty[];
  statuses: ProjectStatus[];
};

export function ProjectFilters({
  department,
  academicYear,
  technology,
  domain,
  difficulty,
  status,
  setDepartment,
  setAcademicYear,
  setTechnology,
  setDomain,
  setDifficulty,
  setStatus,
  onReset,
  departments,
  years,
  technologies,
  domains,
  difficulties,
  statuses,
}: ProjectFiltersProps) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-slate-900">Filters</h3>
        <button
          onClick={onReset}
          className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Department</span>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 focus:outline-none">
            <option value="">All Departments</option>
            {departments.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Academic Year</span>
          <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 focus:outline-none">
            <option value="">All Years</option>
            {years.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Technology</span>
          <select value={technology} onChange={(e) => setTechnology(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 focus:outline-none">
            <option value="">All Technologies</option>
            {technologies.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Project Domain</span>
          <select value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 focus:outline-none">
            <option value="">All Domains</option>
            {domains.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Difficulty</span>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 focus:outline-none">
            <option value="">All Difficulties</option>
            {difficulties.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Project Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 focus:outline-none">
            <option value="">All Statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
