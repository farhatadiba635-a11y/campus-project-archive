import { useRef, useState } from "react";
import { isSupportedDocumentFile, uploadProjectDocument } from "@/src/lib/storage";
import type { ResourceItem } from "@/src/types/archive";

type Props = {
  resources: ResourceItem[];
  onChange: (items: ResourceItem[]) => void;
  projectId?: number | string;
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

export function ResourceUploader({ resources, onChange, projectId = "drafts" }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const nextResources: ResourceItem[] = [];
    setUploadError(null);
    setIsUploading(true);

    try {
      for (const file of files) {
        if (!isSupportedDocumentFile(file)) {
          nextResources.push({
            id: `resource-${Date.now()}-${file.name}`,
            name: file.name,
            type: file.type || "File",
            size: formatFileSize(file.size),
            status: "error",
            error: "Unsupported file type. Use PDF, DOC, PPT, XLS, TXT, or image files only.",
          });
          continue;
        }

        try {
          const uploaded = await uploadProjectDocument(file, { projectId });
          nextResources.push({
            id: `resource-${Date.now()}-${file.name}`,
            name: file.name,
            type: file.type || "File",
            size: formatFileSize(file.size),
            storagePath: uploaded.path,
            fileUrl: uploaded.url || undefined,
            mimeType: uploaded.mimeType,
            sizeBytes: uploaded.sizeBytes,
            status: "uploaded",
          });
        } catch (uploadError) {
          nextResources.push({
            id: `resource-${Date.now()}-${file.name}`,
            name: file.name,
            type: file.type || "File",
            size: formatFileSize(file.size),
            status: "error",
            error:
              uploadError instanceof Error
                ? uploadError.message
                : "Storage is unavailable. The file was not uploaded.",
          });
        }
      }
    } finally {
      onChange([...resources, ...nextResources]);
      event.target.value = "";
      setIsUploading(false);
    }
  };

  const removeResource = (id: string) => {
    onChange(resources.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-5">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.png,.jpg,.jpeg,.gif,.webp"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? "Uploading…" : "Upload file"}
        </button>
      </div>

      {uploadError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {uploadError}
        </div>
      ) : null}

      <div className="space-y-3">
        {resources.map((resource) => (
          <div key={resource.id} className="flex flex-col gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-slate-900">{resource.name}</p>
              <div className="mt-1 flex flex-wrap gap-3 text-xs uppercase tracking-[0.12em] text-slate-500">
                <span>{resource.type}</span>
                <span>{resource.size}</span>
                {resource.status === "uploaded" ? <span className="text-emerald-700">Uploaded</span> : null}
                {resource.status === "error" ? <span className="text-red-700">Rejected</span> : null}
              </div>
              {resource.error ? (
                <p className="mt-2 text-xs text-red-700">{resource.error}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => removeResource(resource.id)}
              className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700"
            >
              Remove file
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
