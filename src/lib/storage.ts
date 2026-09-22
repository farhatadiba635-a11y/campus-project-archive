import { PROJECT_DOCUMENTS_BUCKET, assertSupabaseConfigured, supabase } from "@/src/lib/supabase";

export const ALLOWED_DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/zip",
  "application/x-zip-compressed",
  "text/plain",
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
] as const;

export const ALLOWED_DOCUMENT_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".ppt",
  ".pptx",
  ".xls",
  ".xlsx",
  ".zip",
  ".txt",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
] as const;

export function isSupportedDocumentFile(file: Pick<File, "name" | "type">) {
  const extension = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
  const mimeType = file.type?.toLowerCase();

  const blockedExtensions = [".exe", ".dll", ".bat", ".cmd", ".scr", ".js", ".msi", ".apk", ".ps1"];
  const blockedMimeTypes = [
    "application/x-msdownload",
    "application/x-msdos-program",
    "application/vnd.microsoft.portable-executable",
    "application/javascript",
    "text/javascript",
  ];

  const isBlocked =
    blockedExtensions.includes(extension) || blockedMimeTypes.includes(mimeType ?? "");

  return !isBlocked && (
    ALLOWED_DOCUMENT_EXTENSIONS.includes(extension as (typeof ALLOWED_DOCUMENT_EXTENSIONS)[number]) ||
    ALLOWED_DOCUMENT_MIME_TYPES.includes(mimeType as (typeof ALLOWED_DOCUMENT_MIME_TYPES)[number])
  );
}

export function getProjectDocumentStoragePath({
  projectId,
  fileName,
}: {
  projectId: number | string;
  fileName: string;
}) {
  const safeName = fileName
    .trim()
    .replace(/\\/g, "/")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "document";

  return `projects/${projectId}/${Date.now()}-${safeName.toLowerCase()}`;
}

export async function uploadProjectDocument(
  file: File,
  options: { projectId: number | string; bucketName?: string } = { projectId: "drafts" },
): Promise<{ path: string; url: string | null; mimeType: string; sizeBytes: number }> {
  if (!isSupportedDocumentFile(file)) {
    throw new Error("Unsupported file type. Use PDF, DOC, PPT, XLS, TXT, or image files only.");
  }

  if (!supabase) {
    throw new Error("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY before uploading documents.");
  }

  const bucketName = options.bucketName ?? PROJECT_DOCUMENTS_BUCKET;
  const path = getProjectDocumentStoragePath({ projectId: options.projectId, fileName: file.name });

  const { error: uploadError } = await supabase.storage.from(bucketName).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || "application/octet-stream",
  });

  if (uploadError) {
    throw new Error(uploadError.message || "Document upload failed.");
  }

  return {
    path,
    url: null,
    mimeType: file.type || "application/octet-stream",
    sizeBytes: file.size,
  };
}

export async function getProjectDocumentDownloadUrl(
  path: string,
  bucketName: string = PROJECT_DOCUMENTS_BUCKET,
) {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.storage.from(bucketName).createSignedUrl(path, 60 * 60 * 24);

  if (error || !data?.signedUrl) {
    return null;
  }

  return data.signedUrl;
}

export function ensureProjectDocumentsBucket() {
  const { url, anonKey } = assertSupabaseConfigured();

  return {
    url,
    anonKey,
    bucket: PROJECT_DOCUMENTS_BUCKET,
    isPrivate: true,
    allowedTypes: [...ALLOWED_DOCUMENT_EXTENSIONS],
  };
}
