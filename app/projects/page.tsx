"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ProjectCard } from "@/src/components/project-card";
import { ProjectFilters } from "@/src/components/project-filters";
import { SearchBar } from "@/src/components/search-bar";
import { projects } from "@/src/data/projects";

export default function ExploreProjectsPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [technology, setTechnology] = useState("");
  const [domain, setDomain] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("");

  const departments = Array.from(new Set(projects.map((project) => project.department)));
  const years = Array.from(new Set(projects.map((project) => project.academicYear)));
  const technologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies)),
  );
  const domains = Array.from(new Set(projects.map((project) => project.domain)));
  const difficulties = Array.from(new Set(projects.map((project) => project.difficulty))) as [
    "Easy",
    "Medium",
    "Hard",
  ];
  const statuses = Array.from(new Set(projects.map((project) => project.status))) as [
    "Completed",
    "In Review",
    "Active",
  ];

  const filteredProjects = useMemo(() => {
    const source = search.trim().toLowerCase();

    return projects.filter((project) => {
      const queryText = [
        project.name,
        project.description,
        project.domain,
        project.technologies.join(" "),
        project.problemStatement,
        project.solution,
        ...project.lessons,
        ...project.commonErrors.map((error) => error.question),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !source || queryText.includes(source);
      const matchesDepartment = !department || project.department === department;
      const matchesYear = !academicYear || project.academicYear === academicYear;
      const matchesTechnology = !technology || project.technologies.includes(technology);
      const matchesDomain = !domain || project.domain === domain;
      const matchesDifficulty = !difficulty || project.difficulty === difficulty;
      const matchesStatus = !status || project.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesYear &&
        matchesTechnology &&
        matchesDomain &&
        matchesDifficulty &&
        matchesStatus
      );
    });
  }, [search, department, academicYear, technology, domain, difficulty, status]);

  const clearFilters = () => {
    setSearch("");
    setDepartment("");
    setAcademicYear("");
    setTechnology("");
    setDomain("");
    setDifficulty("");
    setStatus("");
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
            Explore campus projects
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">
            Explore Campus Projects
          </h1>
        </div>
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Back to Home
        </Link>
      </header>

      <p className="mb-8 max-w-3xl text-lg text-slate-600">
        Discover what previous students built, how they built it, and what they learned along the way.
      </p>

      <div className="mb-8">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <ProjectFilters
        department={department}
        academicYear={academicYear}
        technology={technology}
        domain={domain}
        difficulty={difficulty}
        status={status}
        setDepartment={setDepartment}
        setAcademicYear={setAcademicYear}
        setTechnology={setTechnology}
        setDomain={setDomain}
        setDifficulty={setDifficulty}
        setStatus={setStatus}
        onReset={clearFilters}
        departments={departments}
        years={years}
        technologies={technologies}
        domains={domains}
        difficulties={difficulties}
        statuses={statuses}
      />

      <div className="mt-8 flex items-center justify-between gap-3 text-sm text-slate-500">
        <p>{filteredProjects.length} projects found</p>
        {(search || department || academicYear || technology || domain || difficulty || status) && (
          <button
            onClick={clearFilters}
            className="font-semibold text-slate-700 transition hover:text-slate-900"
          >
            Clear active filters
          </button>
        )}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="mt-10 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900">No projects match your search</h2>
          <p className="mt-3 text-slate-600">
            Try a broader keyword or reset the filters to see the full archive.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </main>
  );
}
