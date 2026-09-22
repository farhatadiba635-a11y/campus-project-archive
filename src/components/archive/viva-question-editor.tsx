import type { VivaEntry } from "@/src/types/archive";

type Props = {
  questions: VivaEntry[];
  onChange: (items: VivaEntry[]) => void;
};

const categories = ["Basic", "Technical", "Architecture", "Database", "Deployment", "Limitations"] as const;

export function VivaQuestionEditor({ questions, onChange }: Props) {
  const updateQuestion = (id: string, field: keyof VivaEntry, value: string) => {
    onChange(
      questions.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const addQuestion = () => {
    onChange([
      ...questions,
      {
        id: `viva-${Date.now()}`,
        question: "",
        answer: "",
        category: "Basic",
      },
    ]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length <= 1) return;
    onChange(questions.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-5">
      {questions.map((entry, index) => (
        <div key={entry.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-slate-900">Question {index + 1}</h3>
            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => removeQuestion(entry.id)}
                className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700"
              >
                Remove
              </button>
            )}
          </div>

          <div className="space-y-4">
            <label className="block space-y-2 text-sm text-slate-600">
              <span className="font-medium">Question</span>
              <input
                value={entry.question}
                onChange={(e) => updateQuestion(entry.id, "question", e.target.value)}
                placeholder="What problem does this solve?"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus:outline-none"
              />
            </label>

            <label className="block space-y-2 text-sm text-slate-600">
              <span className="font-medium">Answer</span>
              <textarea
                value={entry.answer}
                onChange={(e) => updateQuestion(entry.id, "answer", e.target.value)}
                placeholder="Provide the archived answer."
                className="min-h-[100px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus:outline-none"
              />
            </label>

            <label className="block space-y-2 text-sm text-slate-600">
              <span className="font-medium">Category</span>
              <select
                value={entry.category}
                onChange={(e) => updateQuestion(entry.id, "category", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus:outline-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
      >
        Add viva question
      </button>
    </div>
  );
}
