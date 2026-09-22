import type { DeploymentStep } from "@/src/types/archive";

type Props = {
  steps: DeploymentStep[];
  envVars: string[];
  onStepsChange: (steps: DeploymentStep[]) => void;
  onEnvVarsChange: (envVars: string[]) => void;
};

export function DeploymentGuideEditor({ steps, envVars, onStepsChange, onEnvVarsChange }: Props) {
  const addStep = () => {
    onStepsChange([...steps, { id: `step-${Date.now()}`, value: "" }]);
  };

  const updateStep = (id: string, value: string) => {
    onStepsChange(steps.map((step) => (step.id === id ? { ...step, value } : step)));
  };

  const removeStep = (id: string) => {
    if (steps.length <= 1) return;
    onStepsChange(steps.filter((step) => step.id !== id));
  };

  const moveStep = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= steps.length) return;
    const nextSteps = [...steps];
    const temp = nextSteps[index];
    nextSteps[index] = nextSteps[targetIndex];
    nextSteps[targetIndex] = temp;
    onStepsChange(nextSteps);
  };

  const updateEnvVar = (index: number, value: string) => {
    const nextEnvVars = [...envVars];
    nextEnvVars[index] = value;
    onEnvVarsChange(nextEnvVars);
  };

  const addEnvVar = () => onEnvVarsChange([...envVars, ""]);
  const removeEnvVar = (index: number) => onEnvVarsChange(envVars.filter((_, i) => i !== index));

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Deployment steps</h3>
          <button
            type="button"
            onClick={addStep}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
          >
            Add step
          </button>
        </div>

        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-3 rounded-[1.2rem] border border-slate-200 bg-slate-50 p-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
              {index + 1}
            </span>
            <input
              value={step.value}
              onChange={(e) => updateStep(step.id, e.target.value)}
              placeholder="Clone repository"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus:outline-none"
            />
            <div className="flex gap-2">
              <button type="button" onClick={() => moveStep(index, -1)} className="rounded-full border border-slate-200 bg-white px-2 py-1.5 text-xs font-semibold text-slate-700">
                ↑
              </button>
              <button type="button" onClick={() => moveStep(index, 1)} className="rounded-full border border-slate-200 bg-white px-2 py-1.5 text-xs font-semibold text-slate-700">
                ↓
              </button>
              {steps.length > 1 && (
                <button type="button" onClick={() => removeStep(step.id)} className="rounded-full border border-red-200 bg-red-50 px-2 py-1.5 text-xs font-semibold text-red-700">
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900">Environment variables</h3>
          <button
            type="button"
            onClick={addEnvVar}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
          >
            Add variable
          </button>
        </div>

        <p className="mb-4 text-sm text-slate-600">
          Never add real secrets. Use placeholder names like DATABASE_URL or API_BASE_URL only.
        </p>

        <div className="space-y-3">
          {envVars.map((envVar, index) => (
            <div key={`${envVar}-${index}`} className="flex items-center gap-3">
              <input
                value={envVar}
                onChange={(e) => updateEnvVar(index, e.target.value)}
                placeholder="DATABASE_URL"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus:outline-none"
              />
              {envVars.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEnvVar(index)}
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
