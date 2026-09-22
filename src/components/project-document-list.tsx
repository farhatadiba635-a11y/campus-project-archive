type ProjectDocument = {
  id: number;
  name: string;
  fileType?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  createdAt?: string | Date | null;
  fileUrl?: string | null;
  uploadedBy?: { name?: string | null; email?: string | null } | string | null;
};

type ProjectDocumentListProps = {
  documents: ProjectDocument[];
};

const formatBytes = (value?: number | null) => {
  if (!value) return "0 KB";

  const units = ["B", "KB", "MB", "GB"];
  let size = value;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
};

const formatDate = (value?: string | Date | null) => {
  if (!value) return "Unknown date";

  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "Unknown date";

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function ProjectDocumentList({ documents }: ProjectDocumentListProps) {
  if (!documents.length) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
        No project documents uploaded yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((document) => (
        <div
          key={document.id}
          className="flex flex-col gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between dark:border-slate-700 dark:bg-slate-950/40"
        >
          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-900 dark:text-white">{document.name}</p>
            <div className="mt-1 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              <span>{document.fileType || document.mimeType || "Document"}</span>
              <span>{formatBytes(document.sizeBytes)}</span>
              <span>{formatDate(document.createdAt)}</span>
            </div>
            {typeof document.uploadedBy === "string" ? (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Uploaded by {document.uploadedBy}</p>
            ) : document.uploadedBy?.name ? (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Uploaded by {document.uploadedBy.name}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            {document.fileUrl ? (
              <a
                href={document.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                View
              </a>
            ) : null}
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {document.fileType || document.mimeType || "FILE"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
