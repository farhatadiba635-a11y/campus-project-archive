import type { CommonProblem } from "@/src/types/archive";

type Props = {
  problems: CommonProblem[];
  onChange: (items: CommonProblem[]) => void;
};

export function ProblemEditor({ problems, onChange }: Props) {
  const updateProblem = (id: string, field: keyof CommonProblem, value: string) => {
    onChange(
      problems.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const addProblem = () => {
    onChange([
      ...problems,
      {
        id: `problem-${Date.now()}`,
        problem: "",
        cause: "",
        solution: "",
        lesson: "",
      },
    ]);
  };

  const removeProblem = (id: string) => {
    if (problems.length <= 1) return;
    onChange(problems.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-5">
      {problems.map((problem, index) => (
        <div key={problem.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-slate-900">Problem {index + 1}</h3>
            {problems.length > 1 && (
              <button
                type="button"
                onClick={() => removeProblem(problem.id)}
                className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700"
              >
                Remove
              </button>
            )}
          </div>

          <div className="space-y-4">
            <label className="block space-y-2 text-sm text-slate-600">
              <span className="font-medium">Problem</span>
              <textarea
                value={problem.problem}
                onChange={(e) => updateProblem(problem.id, "problem", e.target.value)}
                placeholder="What went wrong?"
                className="min-h-[90px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus:outline-none"
              />
            </label>

            <label className="block space-y-2 text-sm text-slate-600">
              <span className="font-medium">Cause</span>
              <textarea
                value={problem.cause}
                onChange={(e) => updateProblem(problem.id, "cause", e.target.value)}
                placeholder="Why did it happen?"
                className="min-h-[90px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus:outline-none"
              />
            </label>

            <label className="block space-y-2 text-sm text-slate-600">
              <span className="font-medium">Solution</span>
              <textarea
                value={problem.solution}
                onChange={(e) => updateProblem(problem.id, "solution", e.target.value)}
                placeholder="How was it fixed?"
                className="min-h-[90px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus:outline-none"
              />
            </label>

            <label className="block space-y-2 text-sm text-slate-600">
              <span className="font-medium">Lesson</span>
              <textarea
                value={problem.lesson}
                onChange={(e) => updateProblem(problem.id, "lesson", e.target.value)}
                placeholder="What should future students know?"
                className="min-h-[90px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus:outline-none"
              />
            </label>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addProblem}
        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
      >
        Add problem
      </button>
    </div>
  );
}
