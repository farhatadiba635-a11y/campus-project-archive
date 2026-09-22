type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search projects, developers, technologies, documents, or hackathons..."
        className="w-full bg-transparent text-base text-slate-700 placeholder:text-slate-400 focus:outline-none"
        aria-label="Search projects"
      />
    </div>
  );
}
