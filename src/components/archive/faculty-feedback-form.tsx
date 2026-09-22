import type { FacultyFeedback } from "@/src/types/archive";

type Props = {
  data: FacultyFeedback;
  onChange: (data: FacultyFeedback) => void;
};

export function FacultyFeedbackForm({ data, onChange }: Props) {
  const updateField = <K extends keyof FacultyFeedback>(field: K, value: FacultyFeedback[K]) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-5">
      <label className="block space-y-2 text-sm text-slate-600">
        <span className="font-medium">Faculty feedback</span>
        <textarea
          value={data.feedback}
          onChange={(e) => updateField("feedback", e.target.value)}
          placeholder="What feedback did the faculty provide?"
          className="min-h-[110px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
        />
      </label>

      <label className="block space-y-2 text-sm text-slate-600">
        <span className="font-medium">Important corrections</span>
        <textarea
          value={data.corrections}
          onChange={(e) => updateField("corrections", e.target.value)}
          placeholder="List key corrections or issues to fix."
          className="min-h-[110px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
        />
      </label>

      <label className="block space-y-2 text-sm text-slate-600">
        <span className="font-medium">Requirements from faculty</span>
        <textarea
          value={data.requirements}
          onChange={(e) => updateField("requirements", e.target.value)}
          placeholder="Any requirements, constraints, or changes requested?"
          className="min-h-[110px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
        />
      </label>

      <label className="block space-y-2 text-sm text-slate-600">
        <span className="font-medium">Final evaluation notes</span>
        <textarea
          value={data.finalEvaluationNotes}
          onChange={(e) => updateField("finalEvaluationNotes", e.target.value)}
          placeholder="Summarize the final evaluation."
          className="min-h-[110px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
        />
      </label>
    </div>
  );
}
