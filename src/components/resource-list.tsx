type ResourceListProps = {
  items: string[];
};

export function ResourceList({ items }: ResourceListProps) {
  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
          <span>{item}</span>
          <span className="text-slate-400">↓</span>
        </div>
      ))}
    </div>
  );
}
