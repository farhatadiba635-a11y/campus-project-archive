"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArchiveStepper } from "@/src/components/archive-stepper";
import { ProtectedRoute } from "@/src/components/auth/protected-route";
import { ArchitectureEditor } from "@/src/components/archive/architecture-editor";
import { ArchiveReview } from "@/src/components/archive/archive-review";
import { DeploymentGuideEditor } from "@/src/components/archive/deployment-guide-editor";
import { FacultyFeedbackForm } from "@/src/components/archive/faculty-feedback-form";
import { FutureImprovementsForm } from "@/src/components/archive/future-improvements-form";
import { ProblemEditor } from "@/src/components/archive/problem-editor";
import { ProblemSolutionForm } from "@/src/components/archive/problem-solution-form";
import { ProjectInformationForm } from "@/src/components/archive/project-information-form";
import { ResourceUploader } from "@/src/components/archive/resource-uploader";
import { RetrospectiveForm } from "@/src/components/archive/retrospective-form";
import { TechnologySelector } from "@/src/components/archive/technology-selector";
import { VivaQuestionEditor } from "@/src/components/archive/viva-question-editor";
import { defaultArchiveData } from "@/src/data/archive-default";
import type { ArchiveProjectData } from "@/src/types/archive";

const stepLabels = [
  "Project information",
  "Problem & solution",
  "Architecture",
  "Technology stack",
  "Resources",
  "Deployment",
  "Common problems",
  "Retrospective",
  "Viva questions",
  "Faculty feedback",
  "Future improvements",
  "Review",
] as const;

export default function ArchivePage() {
  const [data, setData] = useState<ArchiveProjectData>(defaultArchiveData);
  const [currentStep, setCurrentStep] = useState(0);
  const [lastSavedAt, setLastSavedAt] = useState<string>("Not saved yet");

  const totalSteps = stepLabels.length;
  const currentLabel = stepLabels[currentStep];

  const completionStats = useMemo(() => {
    const completedFields = [
      data.info.name,
      data.info.shortDescription,
      data.problem.problemStatement,
      data.problem.proposedSolution,
      data.architecture.overview,
      data.technologies.length,
      data.resources.length,
      data.deployment.steps.some((step) => step.value.trim()),
      data.commonProblems.some((problem) => problem.problem.trim() || problem.solution.trim()),
      data.retrospective.approach,
      data.vivaQuestions.some((item) => item.question.trim()),
      data.faculty.feedback,
      data.futureImprovements.some((item) => item.value.trim()),
    ].filter(Boolean).length;

    return {
      completedFields,
      percent: Math.min(100, Math.round((completedFields / 13) * 100)),
    };
  }, [data]);

  const nextStep = () => setCurrentStep((step) => Math.min(step + 1, totalSteps - 1));
  const previousStep = () => setCurrentStep((step) => Math.max(step - 1, 0));

  const saveDraft = () => {
    setData((previous) => ({ ...previous, status: "Draft" }));
    setLastSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  };

  const submitArchive = () => {
    setData((previous) => ({ ...previous, status: "Submitted" }));
    setCurrentStep(totalSteps - 1);
    setLastSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ProjectInformationForm
            data={data.info}
            onChange={(info) => setData((previous) => ({ ...previous, info }))}
          />
        );
      case 1:
        return (
          <ProblemSolutionForm
            data={data.problem}
            onChange={(problem) => setData((previous) => ({ ...previous, problem }))}
          />
        );
      case 2:
        return (
          <ArchitectureEditor
            data={data.architecture}
            onChange={(architecture) => setData((previous) => ({ ...previous, architecture }))}
          />
        );
      case 3:
        return (
          <TechnologySelector
            technologies={data.technologies}
            onChange={(technologies) => setData((previous) => ({ ...previous, technologies }))}
          />
        );
      case 4:
        return (
          <ResourceUploader
            resources={data.resources}
            onChange={(resources) => setData((previous) => ({ ...previous, resources }))}
          />
        );
      case 5:
        return (
          <DeploymentGuideEditor
            steps={data.deployment.steps}
            envVars={data.deployment.envVars}
            onStepsChange={(steps) =>
              setData((previous) => ({ ...previous, deployment: { ...previous.deployment, steps } }))
            }
            onEnvVarsChange={(envVars) =>
              setData((previous) => ({ ...previous, deployment: { ...previous.deployment, envVars } }))
            }
          />
        );
      case 6:
        return (
          <ProblemEditor
            problems={data.commonProblems}
            onChange={(commonProblems) => setData((previous) => ({ ...previous, commonProblems }))}
          />
        );
      case 7:
        return (
          <RetrospectiveForm
            data={data.retrospective}
            onChange={(retrospective) => setData((previous) => ({ ...previous, retrospective }))}
          />
        );
      case 8:
        return (
          <VivaQuestionEditor
            questions={data.vivaQuestions}
            onChange={(vivaQuestions) => setData((previous) => ({ ...previous, vivaQuestions }))}
          />
        );
      case 9:
        return (
          <FacultyFeedbackForm
            data={data.faculty}
            onChange={(faculty) => setData((previous) => ({ ...previous, faculty }))}
          />
        );
      case 10:
        return (
          <FutureImprovementsForm
            items={data.futureImprovements}
            onChange={(futureImprovements) =>
              setData((previous) => ({ ...previous, futureImprovements }))
            }
          />
        );
      case 11:
        return <ArchiveReview data={data} onEdit={setCurrentStep} />;
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute
      allowedRoles={["STUDENT", "FACULTY", "ADMIN"]}
      title="Student access required"
      description="Only authenticated campus members can archive or review a project. Pick a role to continue."
    >
      <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Archive a project
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.06em] text-slate-900 md:text-4xl">
              Campus Project Archive
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              View projects
            </Link>
            <button
              type="button"
              onClick={saveDraft}
              className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Save draft
            </button>
          </div>
        </header>

        <div className="mb-8 grid gap-6 lg:grid-cols-[1.5fr_0.7fr]">
          <ArchiveStepper currentStep={currentStep} totalSteps={totalSteps} />

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Status
              </p>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                {data.status}
              </span>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                <span>Completion</span>
                <span>{completionStats.percent}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-slate-900 transition-all duration-300"
                  style={{ width: `${completionStats.percent}%` }}
                />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">Last saved: {lastSavedAt}</p>
          </div>
        </div>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Step {currentStep + 1}</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">{currentLabel}</h2>
            </div>

            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
              {data.info.name || "Untitled project"}
            </div>
          </div>

          {renderStep()}

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={previousStep}
                disabled={currentStep === 0}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>
              {currentStep < totalSteps - 1 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                >
                  Next
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {currentStep === totalSteps - 1 ? (
                <button
                  type="button"
                  onClick={submitArchive}
                  className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Submit archive
                </button>
              ) : (
                <button
                  type="button"
                  onClick={saveDraft}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  Save progress
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}
