type ArchiveStepperProps = {
  currentStep: number;
  totalSteps: number;
};

export function ArchiveStepper({ currentStep, totalSteps }: ArchiveStepperProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Step {currentStep + 1} of {totalSteps}
        </p>
        <span className="text-sm font-medium text-slate-600">{Math.round(progress)}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-900 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
