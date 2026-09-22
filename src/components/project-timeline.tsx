type ProjectTimelineProps = {
  steps: string[];
};

export function ProjectTimeline({ steps }: ProjectTimelineProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
            {index + 1}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Phase {index + 1}</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{step}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
