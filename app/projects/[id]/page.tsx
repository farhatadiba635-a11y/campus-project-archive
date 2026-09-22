"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { ArchitectureDiagram } from "@/src/components/architecture-diagram";
import { ErrorCard } from "@/src/components/error-card";
import { ProjectDocumentList } from "@/src/components/project-document-list";
import { ProjectMetadata } from "@/src/components/project-metadata";
import { ProjectTimeline } from "@/src/components/project-timeline";
import { ResourceList } from "@/src/components/resource-list";
import { TechnologyBadge } from "@/src/components/technology-badge";
import { VivaQuestion } from "@/src/components/viva-question";
import { getProjectById, getRelatedProjects, type Project } from "@/src/data/projects";

function PageContent({ project }: { project: Project }) {
  const relatedProjects = getRelatedProjects(project);

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
            {project.department} · {project.academicYear}
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">
            {project.name}
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Back to Projects
          </Link>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            View GitHub
          </a>
        </div>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <TechnologyBadge key={tech} label={tech} />
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Overview</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{project.problemStatement}</p>
            <p className="mt-4 text-base leading-7 text-slate-600">{project.solution}</p>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-slate-900">Objectives</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {project.objectives.map((objective) => (
                  <li key={objective} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Project Metadata</h2>
            <div className="mt-6">
              <ProjectMetadata project={project} />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Technology Stack</h2>
            <div className="mt-6 space-y-4">
              {project.technologyStack.map((stack) => (
                <div key={stack.category} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{stack.category}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <TechnologyBadge key={item} label={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Architecture</h2>
            <div className="mt-6">
              <ArchitectureDiagram steps={project.architecture} />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Source Code</h2>
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-600">Repository placeholder for this mock project.</p>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Open GitHub Repository
              </a>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Documentation</h2>
            <div className="mt-5">
              <ResourceList items={project.documentation} />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Project Documents</h2>
            <div className="mt-5">
              <ProjectDocumentList documents={project.documents ?? []} />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Deployment Guide</h2>
            <ol className="mt-5 grid gap-3 md:grid-cols-2">
              {project.deploymentGuide.map((step, index) => (
                <li key={step} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Common Errors</h2>
            <div className="mt-6 space-y-4">
              {project.commonErrors.map((error) => (
                <ErrorCard
                  key={error.question}
                  question={error.question}
                  causes={error.causes}
                  solution={error.solution}
                />
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">What Didn&apos;t Work</h2>
            <div className="mt-5 space-y-3">
              {project.lessons.map((lesson) => (
                <div key={lesson} className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  {lesson}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Viva Questions</h2>
            <div className="mt-6 space-y-4">
              {project.vivaQuestions.map((item) => (
                <VivaQuestion key={item.question} question={item.question} answer={item.answer} />
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Faculty Feedback</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-700">
              {project.facultyFeedback.map((feedback) => (
                <div key={feedback} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  {feedback}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Future Improvements</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-700">
              {project.futureImprovements.map((improvement) => (
                <div key={improvement} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  {improvement}
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Project Timeline</h2>
            <div className="mt-6">
              <ProjectTimeline steps={project.timeline} />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Explore Similar Projects</h2>
            <div className="mt-6 space-y-4">
              {relatedProjects.map((item) => (
                <Link
                  key={item.id}
                  href={`/projects/${item.id}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5"
                >
                  <p className="text-lg font-bold text-slate-900">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.domain}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.technologies.slice(0, 3).map((tech) => (
                      <TechnologyBadge key={tech} label={tech} />
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return <PageContent project={project} />;
}
