import type { ProblemSolution } from "@/src/types/archive";

type Props = {
  data: ProblemSolution;
  onChange: (data: ProblemSolution) => void;
};

export function ProblemSolutionForm({ data, onChange }: Props) {
  const updateField = <K extends keyof ProblemSolution>(field: K, value: ProblemSolution[K]) => {
    onChange({ ...data, [field]: value });
  };

  const updateObjective = (index: number, value: string) => {
    const nextObjectives = [...data.objectives];
    nextObjectives[index] = value;
    updateField("objectives", nextObjectives);
  };

  const addObjective = () => {
    updateField("objectives", [...data.objectives, ""]);
  };

  const removeObjective = (index: number) => {
    if (data.objectives.length <= 1) return;
    const nextObjectives = data.objectives.filter((_, i) => i !== index);
    updateField("objectives", nextObjectives);
  };

  return (
    <div className="space-y-5">
      <label className="block space-y-2 text-sm text-slate-600">
        <span className="font-medium">Problem Statement</span>
        <textarea
          value={data.problemStatement}
          onChange={(e) => updateField("problemStatement", e.target.value)}
          placeholder="What problem were you trying to solve?"
          className="min-h-[120px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
        />
      </label>

      <label className="block space-y-2 text-sm text-slate-600">
        <span className="font-medium">Proposed Solution</span>
        <textarea
          value={data.proposedSolution}
          onChange={(e) => updateField("proposedSolution", e.target.value)}
          placeholder="How does your project solve the problem?"
          className="min-h-[120px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
        />
      </label>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium text-slate-700">Objectives</span>
          <button
            type="button"
            onClick={addObjective}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
          >
            Add objective
          </button>
        </div>

        {data.objectives.map((objective, index) => (
          <div key={`${index}-objective`} className="flex items-center gap-3">
            <input
              value={objective}
              onChange={(e) => updateObjective(index, e.target.value)}
              placeholder={`Objective ${index + 1}`}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
            />
            {data.objectives.length > 1 && (
              <button
                type="button"
                onClick={() => removeObjective(index)}
                className="rounded-full border border-red-200 bg-red-50 px-2.5 py-2 text-xs font-semibold text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <label className="block space-y-2 text-sm text-slate-600">
        <span className="font-medium">Target Users</span>
        <input
          value={data.targetUsers}
          onChange={(e) => updateField("targetUsers", e.target.value)}
          placeholder="Who is the project intended for?"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
        />
      </label>
    </div>
  );
}
