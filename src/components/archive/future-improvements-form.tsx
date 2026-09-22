import type { FutureImprovement } from "@/src/types/archive";

type Props = {
  items: FutureImprovement[];
  onChange: (items: FutureImprovement[]) => void;
};

export function FutureImprovementsForm({ items, onChange }: Props) {
  const addItem = () => onChange([...items, { id: `future-${Date.now()}`, value: "" }]);

  const updateItem = (id: string, value: string) => {
    onChange(items.map((item) => (item.id === id ? { ...item, value } : item)));
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-5">
      {items.map((item, index) => (
        <div key={item.id} className="flex items-center gap-3">
          <input
            value={item.value}
            onChange={(e) => updateItem(item.id, e.target.value)}
            placeholder={[
              "Features to add",
              "Technologies to change",
              "Scalability improvements",
              "Security improvements",
              "UX improvements",
              "Research possibilities",
            ][index % 6]}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
          />
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="rounded-full border border-red-200 bg-red-50 px-2.5 py-2 text-xs font-semibold text-red-700"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
      >
        Add improvement
      </button>
    </div>
  );
}
