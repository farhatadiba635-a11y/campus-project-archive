import type { Retrospective } from "@/src/types/archive";

type Props = {
  data: Retrospective;
  onChange: (data: Retrospective) => void;
};

export function RetrospectiveForm({ data, onChange }: Props) {
  const updateField = <K extends keyof Retrospective>(field: K, value: Retrospective[K]) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        Honest failures are valuable knowledge for future students. Document them clearly.
      </div>

      {[
        { key: "approach", label: "What approach did you try first?", placeholder: "Describe the first solution you attempted." },
        { key: "whyItFailed", label: "Why didn’t it work?", placeholder: "What prevented the first approach from succeeding?" },
        { key: "whatChanged", label: "What did you change?", placeholder: "How did your solution evolve?" },
        { key: "whatWouldYouDoDifferently", label: "What would you do differently?", placeholder: "What would you improve with hindsight?" },
        { key: "mostTimeCost", label: "What mistake cost the most time?", placeholder: "Identify the heaviest time sink." },
      ].map((field) => (
        <label key={field.key} className="block space-y-2 text-sm text-slate-600">
          <span className="font-medium">{field.label}</span>
          <textarea
            value={data[field.key as keyof Retrospective] as string}
            onChange={(e) => updateField(field.key as keyof Retrospective, e.target.value as never)}
            placeholder={field.placeholder}
            className="min-h-[100px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
          />
        </label>
      ))}
    </div>
  );
}
