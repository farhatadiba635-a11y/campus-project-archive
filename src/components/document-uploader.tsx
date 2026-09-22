"use client";

import { useRef, useState } from "react";
import { isSupportedDocumentFile, uploadProjectDocument } from "@/src/lib/storage";

type ProjectDocumentUpload = {
  id: string;
  name: string;
  type: string;
  size: string;
  status: "uploading" | "uploaded" | "error";
  error?: string;
  path?: string;
};

type DocumentUploaderProps = {
  projectId?: string | number;
  onFilesChange?: (files: ProjectDocumentUpload[]) => void;
};

const formatFileSize = (bytes: number) => {
  if (!bytes) return "0 KB";

  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
};

export function DocumentUploader({ projectId = "drafts", onFilesChange }: DocumentUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<ProjectDocumentUpload[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const updateFiles = (nextFiles: ProjectDocumentUpload[]) => {
    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
  };

  const handleSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    if (!selectedFiles.length) return;

    const nextFiles: ProjectDocumentUpload[] = selectedFiles.map((file) => ({
      id: `${Date.now()}-${file.name}`,
      name: file.name,
      type: file.type || "File",
      size: formatFileSize(file.size),
      status: "uploading",
    }));

    updateFiles([...files, ...nextFiles]);
    setIsUploading(true);

    try {
      for (const file of selectedFiles) {
        if (!isSupportedDocumentFile(file)) {
          updateFiles(
            files.map((item) =>
              item.id === nextFiles.find((candidate) => candidate.name === file.name)?.id
                ? { ...item, status: "error", error: "Unsupported file type. Only document and image files are allowed." }
                : item,
            ),
          );
          continue;
        }

        const uploaded = await uploadProjectDocument(file, { projectId });

        updateFiles(
          files.map((item) =>
            item.id === nextFiles.find((candidate) => candidate.name === file.name)?.id
              ? {
                  ...item,
                  status: "uploaded",
                  path: uploaded.path,
                }
              : item,
          ),
        );
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "The file could not be uploaded.";

      const currentFileIds = nextFiles.map((item) => item.id);
      updateFiles(
        files.map((item) =>
          currentFileIds.includes(item.id)
            ? { ...item, status: "error", error: message }
            : item,
        ),
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const removeFile = (id: string) => {
    updateFiles(files.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/40">
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleSelection}
          className="hidden"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.txt,.png,.jpg,.jpeg,.gif,.webp"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
        >
          {isUploading ? "Uploading…" : "Upload project files"}
        </button>
      </div>

      {files.length ? (
        <div className="space-y-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex flex-col gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between dark:border-slate-700 dark:bg-slate-950/40"
            >
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{file.name}</p>
                <div className="mt-1 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  <span>{file.type}</span>
                  <span>{file.size}</span>
                  <span className={file.status === "uploaded" ? "text-emerald-600 dark:text-emerald-400" : file.status === "error" ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-300"}>
                    {file.status}
                  </span>
                </div>
                {file.error ? <p className="mt-2 text-xs text-red-600 dark:text-red-400">{file.error}</p> : null}
              </div>

              <button
                type="button"
                onClick={() => removeFile(file.id)}
                className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
