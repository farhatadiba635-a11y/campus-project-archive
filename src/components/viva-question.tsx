type VivaQuestionProps = {
  question: string;
  answer: string;
};

export function VivaQuestion({ question, answer }: VivaQuestionProps) {
  return (
    <details className="group rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">{question}</summary>
      <p className="mt-4 text-sm leading-6 text-slate-700">{answer}</p>
    </details>
  );
}
