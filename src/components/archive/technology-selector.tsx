import { useMemo, useState } from "react";
import type { TechnologyItem } from "@/src/types/archive";

type Props = {
  technologies: TechnologyItem[];
  onChange: (items: TechnologyItem[]) => void;
};

const knownTechnologies = [
  "React",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Firebase",
  "ESP32",
  "MongoDB",
  "Next.js",
  "Express",
  "OpenCV",
  "NLP",
  "MQTT",
  "Android",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "Docker",
  "Redis",
  "AWS",
  "Vercel",
];

export function TechnologySelector({ technologies, onChange }: Props) {
  const [query, setQuery] = useState("");

  const filteredSuggestions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return knownTechnologies.slice(0, 8);
    return knownTechnologies.filter((item) => item.toLowerCase().includes(trimmed));
  }, [query]);

  const addTechnology = (name: string) => {
    if (!name.trim()) return;
    const exists = technologies.some((item) => item.name.toLowerCase() === name.toLowerCase());
    if (exists) return;

    onChange([
      ...technologies,
      {
        id: `tech-${Date.now()}`,
        category: "Tool",
        name,
      },
    ]);
    setQuery("");
  };

  const removeTechnology = (id: string) => {
    onChange(technologies.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search technology tags..."
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />

        {filteredSuggestions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filteredSuggestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => addTechnology(item)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <div
            key={tech.id}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700"
          >
            <span>{tech.name}</span>
            <button
              type="button"
              onClick={() => removeTechnology(tech.id)}
              className="text-slate-400 transition hover:text-slate-900"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
