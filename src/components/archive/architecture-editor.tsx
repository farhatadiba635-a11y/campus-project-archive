import type { ArchitectureBlock } from "@/src/types/archive";

type Props = {
  data: ArchitectureBlock;
  onChange: (data: ArchitectureBlock) => void;
};

const defaultComponents = ["Frontend", "Backend", "Database", "Hardware", "API"];

export function ArchitectureEditor({ data, onChange }: Props) {
  const updateField = <K extends keyof ArchitectureBlock>(field: K, value: ArchitectureBlock[K]) => {
    onChange({ ...data, [field]: value });
  };

  const addComponent = () => {
    onChange({ ...data, components: [...data.components, "New Component"] });
  };

  const updateComponent = (index: number, value: string) => {
    const nextComponents = [...data.components];
    nextComponents[index] = value;
    onChange({ ...data, components: nextComponents });
  };

  const removeComponent = (index: number) => {
    if (data.components.length <= 1) return;
    onChange({
      ...data,
      components: data.components.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <label className="block space-y-2 text-sm text-slate-600">
        <span className="font-medium">Architecture overview</span>
        <textarea
          value={data.overview}
          onChange={(e) => updateField("overview", e.target.value)}
          placeholder="Explain how the main modules work together."
          className="min-h-[120px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Frontend</span>
          <input
            value={data.frontend}
            onChange={(e) => updateField("frontend", e.target.value)}
            placeholder="React, Next.js, mobile UI..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Backend</span>
          <input
            value={data.backend}
            onChange={(e) => updateField("backend", e.target.value)}
            placeholder="Node.js / Express"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Database</span>
          <input
            value={data.database}
            onChange={(e) => updateField("database", e.target.value)}
            placeholder="PostgreSQL / Firebase"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          <span className="font-medium">Hardware</span>
          <input
            value={data.hardware}
            onChange={(e) => updateField("hardware", e.target.value)}
            placeholder="ESP32, sensors, devices..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm text-slate-600">
        <span className="font-medium">APIs / external services</span>
        <input
          value={data.apis}
          onChange={(e) => updateField("apis", e.target.value)}
          placeholder="Firebase Auth, weather API, payment API..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
        />
      </label>

      <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900">Architecture builder</h3>
          <button
            type="button"
            onClick={addComponent}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
          >
            Add component
          </button>
        </div>

        <div className="space-y-3">
          {data.components.map((component, index) => (
            <div key={`${component}-${index}`} className="flex items-center gap-3">
              <input
                value={component}
                onChange={(e) => updateComponent(index, e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus:outline-none"
                placeholder={defaultComponents[index % defaultComponents.length]}
              />
              {data.components.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeComponent(index)}
                  className="rounded-full border border-red-200 bg-red-50 px-2.5 py-2 text-xs font-semibold text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
