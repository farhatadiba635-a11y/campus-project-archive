import test from "node:test";
import assert from "node:assert/strict";

import { isSupportedDocumentFile, getProjectDocumentStoragePath } from "./storage";

test("supported document types are accepted and dangerous executables are rejected", () => {
  assert.equal(isSupportedDocumentFile({ name: "proposal.pdf", type: "application/pdf" }), true);
  assert.equal(isSupportedDocumentFile({ name: "diagram.png", type: "image/png" }), true);
  assert.equal(isSupportedDocumentFile({ name: "archive.zip", type: "application/zip" }), true);
  assert.equal(isSupportedDocumentFile({ name: "notes.txt", type: "text/plain" }), true);
  assert.equal(isSupportedDocumentFile({ name: "payload.exe", type: "application/x-msdownload" }), false);
});

test("storage paths are scoped to a project and sanitized for safe Supabase uploads", () => {
  const path = getProjectDocumentStoragePath({ projectId: 42, fileName: "Q4 Report (Final).pdf" });

  assert.match(path, /^projects\/42\//);
  assert.doesNotMatch(path, /\\/);
  assert.match(path, /\.pdf$/);
});
