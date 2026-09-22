import type { ProjectInfo } from "@/src/types/archive";

type Props = {
  data: ProjectInfo;
  onChange: (data: ProjectInfo) => void;
};

export function ProjectInformationForm({ data, onChange }: Props) {
  const updateField = <K extends keyof ProjectInfo>(field: K, value: ProjectInfo[K]) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Project name</span>
          <input
            value={data.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Smart Attendance System"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Department</span>
          <input
            value={data.department}
            onChange={(e) => updateField("department", e.target.value)}
            placeholder="Computer Science"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-slate-600">
        <span className="font-medium">Short description</span>
        <textarea
          value={data.shortDescription}
          onChange={(e) => updateField("shortDescription", e.target.value)}
          placeholder="A brief description of the project, problem, and outcome."
          className="min-h-[110px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Academic year</span>
          <input
            value={data.academicYear}
            onChange={(e) => updateField("academicYear", e.target.value)}
            placeholder="2025–26"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Project domain</span>
          <input
            value={data.domain}
            onChange={(e) => updateField("domain", e.target.value)}
            placeholder="IoT"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Project status</span>
          <select
            value={data.status}
            onChange={(e) => updateField("status", e.target.value as ProjectInfo["status"])}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Archived">Archived</option>
          </select>
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Team size</span>
          <input
            type="number"
            min={1}
            value={data.teamSize}
            onChange={(e) => updateField("teamSize", Number(e.target.value) || 1)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Faculty mentor</span>
          <input
            value={data.facultyMentor}
            onChange={(e) => updateField("facultyMentor", e.target.value)}
            placeholder="Dr. Sharma"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
          />
        </label>
      </div>
    </div>
  );
}
