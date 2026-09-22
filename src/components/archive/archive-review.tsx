import type { ArchiveProjectData } from "@/src/types/archive";

type Props = {
  data: ArchiveProjectData;
  onEdit: (step: number) => void;
};

export function ArchiveReview({ data, onEdit }: Props) {
  const sections = [
    { title: "Project Information", step: 0 },
    { title: "Problem & Solution", step: 1 },
    { title: "Architecture", step: 2 },
    { title: "Technology Stack", step: 3 },
    { title: "Resources", step: 4 },
    { title: "Deployment", step: 5 },
    { title: "Common Problems", step: 6 },
    { title: "What Didn’t Work", step: 7 },
    { title: "Viva Questions", step: 8 },
    { title: "Faculty Feedback", step: 9 },
    { title: "Future Improvements", step: 10 },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
            <button
              type="button"
              onClick={() => onEdit(section.step)}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
            >
              Edit
            </button>
          </div>

          {section.step === 0 && (
            <div className="space-y-2 text-sm text-slate-700">
              <p><strong>Project:</strong> {data.info.name || "Not provided"}</p>
              <p><strong>Description:</strong> {data.info.shortDescription || "Not provided"}</p>
              <p><strong>Department:</strong> {data.info.department || "Not provided"}</p>
              <p><strong>Academic year:</strong> {data.info.academicYear || "Not provided"}</p>
              <p><strong>Status:</strong> {data.info.status}</p>
            </div>
          )}

          {section.step === 1 && (
            <div className="space-y-2 text-sm text-slate-700">
              <p><strong>Problem:</strong> {data.problem.problemStatement || "Not provided"}</p>
              <p><strong>Solution:</strong> {data.problem.proposedSolution || "Not provided"}</p>
              <p><strong>Target users:</strong> {data.problem.targetUsers || "Not provided"}</p>
            </div>
          )}

          {section.step === 2 && (
            <div className="space-y-2 text-sm text-slate-700">
              <p><strong>Overview:</strong> {data.architecture.overview || "Not provided"}</p>
              <p><strong>Frontend:</strong> {data.architecture.frontend || "Not provided"}</p>
              <p><strong>Backend:</strong> {data.architecture.backend || "Not provided"}</p>
              <p><strong>Database:</strong> {data.architecture.database || "Not provided"}</p>
            </div>
          )}

          {section.step === 3 && (
            <div className="flex flex-wrap gap-2">
              {data.technologies.length ? data.technologies.map((tech) => (
                <span key={tech.id} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
                  {tech.name}
                </span>
              )) : <span className="text-sm text-slate-500">No technologies added</span>}
            </div>
          )}

          {section.step === 4 && (
            <div className="text-sm text-slate-700">
              {data.resources.length ? data.resources.map((resource) => (
                <div key={resource.id} className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
                  {resource.name} · {resource.type} · {resource.size}
                </div>
              )) : <p>No resources uploaded</p>}
            </div>
          )}

          {section.step === 5 && (
            <div className="space-y-2 text-sm text-slate-700">
              <p><strong>Deployment steps:</strong> {data.deployment.steps.length ? data.deployment.steps.map((step) => step.value).join(" • ") : "No steps added"}</p>
              <p><strong>Environment variables:</strong> {data.deployment.envVars.length ? data.deployment.envVars.join(", ") : "No variables listed"}</p>
            </div>
          )}

          {section.step === 6 && (
            <div className="space-y-2 text-sm text-slate-700">
              {data.commonProblems.length ? data.commonProblems.map((problem) => (
                <div key={problem.id} className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                  <div><strong>Problem:</strong> {problem.problem || "Not provided"}</div>
                  <div><strong>Cause:</strong> {problem.cause || "Not provided"}</div>
                </div>
              )) : <p>No common problems recorded</p>}
            </div>
          )}

          {section.step === 7 && (
            <div className="space-y-2 text-sm text-slate-700">
              <p><strong>Approach:</strong> {data.retrospective.approach || "Not provided"}</p>
              <p><strong>Why it failed:</strong> {data.retrospective.whyItFailed || "Not provided"}</p>
              <p><strong>What changed:</strong> {data.retrospective.whatChanged || "Not provided"}</p>
            </div>
          )}

          {section.step === 8 && (
            <div className="space-y-2 text-sm text-slate-700">
              {data.vivaQuestions.length ? data.vivaQuestions.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                  <strong>{item.category}:</strong> {item.question || "Question not provided"}
                </div>
              )) : <p>No viva questions added</p>}
            </div>
          )}

          {section.step === 9 && (
            <div className="space-y-2 text-sm text-slate-700">
              <p><strong>Feedback:</strong> {data.faculty.feedback || "Not provided"}</p>
              <p><strong>Corrections:</strong> {data.faculty.corrections || "Not provided"}</p>
            </div>
          )}

          {section.step === 10 && (
            <div className="space-y-2 text-sm text-slate-700">
              {data.futureImprovements.length ? data.futureImprovements.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                  {item.value || "Not provided"}
                </div>
              )) : <p>No future improvements added</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
