import { projects } from "../data/projects";

export type ArchiveAiUser = {
  role?: string | null;
};

export type ArchiveAiCitation = {
  id: string;
  projectId?: string;
  projectName?: string;
  title: string;
  type: "project" | "document" | "technology" | "summary";
  href?: string;
  snippet?: string;
};

export type ArchiveAiChunk = {
  id: string;
  projectId: string;
  projectName: string;
  type: "project" | "document" | "technology" | "summary";
  title: string;
  text: string;
  sourceHref?: string;
};

export function canAccessArchiveDocuments(user?: ArchiveAiUser | null): boolean {
  const role = (user?.role ?? "STUDENT").toString().toUpperCase();
  return role === "FACULTY" || role === "ADMIN";
}

const normalizeArchiveText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u2011\u2012\u2013\u2014\u2015\-]/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s+/g, "");

const toSearchableText = (...values: Array<string | undefined | null>) =>
  values
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    .map((value) => normalizeArchiveText(value))
    .join(" ");

export function retrieveArchiveContext(
  question: string,
  options?: { projectId?: string; user?: ArchiveAiUser | null; limit?: number },
) {
  const lowered = question.trim().toLowerCase();
  const limit = options?.limit ?? 12;
  const eligibleProjects = options?.projectId
    ? projects.filter((project) => project.id === options.projectId)
    : projects;
  const canAccessDocs = canAccessArchiveDocuments(options?.user);

  const chunks: ArchiveAiChunk[] = eligibleProjects.flatMap((project) => {
    const projectFieldTexts = [
      project.name,
      project.department,
      project.domain,
      project.description,
      project.problemStatement,
      project.solution,
      project.summary,
      project.facultyMentor,
      project.technologies.join(" "),
      ...project.architecture,
      ...project.documentation,
      ...project.objectives,
      ...project.lessons,
      ...project.facultyFeedback,
      ...project.deploymentGuide,
      ...project.commonErrors.flatMap((error) => [error.question, error.solution, ...error.causes]),
      ...project.vivaQuestions.flatMap((question) => [question.question, question.answer]),
    ]
      .map((value) => ({
        id: `${project.id}-summary-${value}`,
        projectId: project.id,
        projectName: project.name,
        type: "project" as const,
        title: project.name,
        text: value,
        sourceHref: `/projects/${project.id}`,
      }))
      .filter((entry) => !lowered || toSearchableText(entry.text).includes(normalizeArchiveText(lowered)));

    const technologyChunks = project.technologies
      .map((technology) => ({
        id: `${project.id}-technology-${technology}`,
        projectId: project.id,
        projectName: project.name,
        type: "technology" as const,
        title: technology,
        text: `${technology} appears in ${project.name}'s technology stack and project notes.`,
        sourceHref: `/projects/${project.id}`,
      }))
      .filter((entry) => !lowered || toSearchableText(entry.title, entry.text).includes(normalizeArchiveText(lowered)));

    const documentChunks = canAccessDocs
      ? (project.documents ?? []).map((document) => ({
          id: `${project.id}-document-${document.id}`,
          projectId: project.id,
          projectName: project.name,
          type: "document" as const,
          title: document.name,
          text: `${document.name} (${document.fileType}) uploaded by ${document.uploadedBy}. ${project.name} includes this document in the archived resource set.`,
          sourceHref: document.fileUrl ?? `/projects/${project.id}`,
        }))
      : [];

    const combined = [...projectFieldTexts, ...technologyChunks, ...documentChunks];

    return combined.filter((entry) => {
      if (!lowered) return true;
      const haystack = toSearchableText(entry.title, entry.text);
      return haystack.includes(normalizeArchiveText(lowered));
    });
  });

  const citations: ArchiveAiCitation[] = chunks.slice(0, 6).map((chunk) => ({
    id: chunk.id,
    projectId: chunk.projectId,
    projectName: chunk.projectName,
    title: chunk.title,
    type: chunk.type,
    href: chunk.sourceHref,
    snippet: chunk.text,
  }));

  return {
    chunks: chunks.slice(0, limit),
    citations,
    documentAccess: canAccessDocs,
  };
}

export function buildGroundedAnswer(
  question: string,
  chunks: ArchiveAiChunk[],
  systemPrompt: string,
) {
  const normalizedQuestion = question.trim();

  if (!normalizedQuestion) {
    return "I couldn't find enough information in the DevHub archive to answer that.";
  }

  if (!chunks.length) {
    return "I couldn't find enough information in the DevHub archive to answer that.";
  }

  const evidence = chunks
    .slice(0, 4)
    .map((chunk) => `${chunk.projectName}: ${chunk.text}`)
    .join("\n\n");

  const promptText = systemPrompt.trim() || "Use only the retrieved archive context and cite the relevant project or document.";

  return [
    "Based on the retrieved archive context, here is the grounded answer:",
    "",
    evidence,
    "",
    `Guidance: ${promptText}`,
    "",
    "If the archive does not contain enough evidence for a claim, I will say that instead of guessing.",
  ].join("\n");
}
