import { projects } from "@/src/data/projects";
import type { AuthUser } from "@/src/lib/auth";

export type SearchCategory = "Projects" | "Developers" | "Technologies" | "Hackathons" | "Documents";

export type SearchResultItem = {
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  badge?: string;
};

const normalize = (value: string) => value.trim().toLowerCase();

const projectMatches = (project: (typeof projects)[number], query: string) => {
  const haystack = [
    project.name,
    project.department,
    project.domain,
    project.description,
    project.summary,
    project.problemStatement,
    project.solution,
    project.facultyMentor,
    project.technologies.join(" "),
    project.documentation.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return !query || haystack.includes(query);
};

export function getSearchResults(query: string, user?: AuthUser | null) {
  const normalizedQuery = normalize(query);

  const projectResults: SearchResultItem[] = projects
    .filter((project) => projectMatches(project, normalizedQuery))
    .slice(0, 12)
    .map((project) => ({
      title: project.name,
      description: `${project.department} • ${project.domain}`,
      href: `/projects/${project.id}`,
      category: "Projects",
      badge: project.status,
    }));

  const developerResults: SearchResultItem[] = Array.from(
    new Set(projects.map((project) => project.facultyMentor)),
  )
    .filter((mentor) => !normalizedQuery || mentor.toLowerCase().includes(normalizedQuery))
    .slice(0, 8)
    .map((mentor) => {
      const project = projects.find((candidate) => candidate.facultyMentor === mentor)!;
      return {
        title: mentor,
        description: `${project.department} • Faculty mentor`,
        href: "/projects",
        category: "Developers",
        badge: project.department,
      };
    });

  const technologyResults: SearchResultItem[] = Array.from(
    new Set(projects.flatMap((project) => project.technologies)),
  )
    .filter((technology) => !normalizedQuery || technology.toLowerCase().includes(normalizedQuery))
    .slice(0, 10)
    .map((technology) => ({
      title: technology,
      description: "Technology used across the current project archive",
      href: "/projects",
      category: "Technologies",
    }));

  const documentResults: SearchResultItem[] = user
    ? projects
        .flatMap((project) =>
          (project.documents ?? []).map((document) => ({
            project,
            document,
          })),
        )
        .filter(({ project, document }) => {
          if (!normalizedQuery) return true;

          const haystack = `${project.name} ${document.name} ${project.department} ${document.uploadedBy}`.toLowerCase();
          return haystack.includes(normalizedQuery);
        })
        .slice(0, 10)
        .map(({ project, document }) => ({
          title: document.name,
          description: `${project.name} • ${document.fileType}`,
          href: document.fileUrl ? document.fileUrl : `/projects/${project.id}`,
          category: "Documents",
          badge: document.fileType,
        }))
    : [];

  const hackathonResults: SearchResultItem[] = [];

  return [
    { category: "Projects", items: projectResults },
    { category: "Developers", items: developerResults },
    { category: "Technologies", items: technologyResults },
    { category: "Hackathons", items: hackathonResults },
    { category: "Documents", items: documentResults },
  ].filter((section) => section.items.length > 0);
}
