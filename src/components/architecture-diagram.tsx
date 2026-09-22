type ArchitectureDiagramProps = {
  steps: string[];
};

export function ArchitectureDiagram({ steps }: ArchitectureDiagramProps) {
  return (
    <div className="space-y-3">
      {steps.map((step, index, arr) => (
        <div key={step} className="flex items-center justify-center gap-3 text-sm font-medium text-slate-700">
          <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 shadow-sm">
            {step}
          </div>
          {index !== arr.length - 1 && <span className="text-slate-400">↓</span>}
        </div>
      ))}
    </div>
  );
}
