type ErrorCardProps = {
  question: string;
  causes: string[];
  solution: string;
};

export function ErrorCard({ question, causes, solution }: ErrorCardProps) {
  return (
    <details className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
      <summary className="cursor-pointer list-none text-lg font-bold text-slate-900">{question}</summary>
      <div className="mt-4 space-y-4 text-sm text-slate-700">
        <div>
          <p className="font-semibold uppercase tracking-[0.15em] text-slate-500">Possible causes</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {causes.map((cause) => (
              <li key={cause}>{cause}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-[0.15em] text-slate-500">Solution</p>
          <p className="mt-2">{solution}</p>
        </div>
      </div>
    </details>
  );
}
