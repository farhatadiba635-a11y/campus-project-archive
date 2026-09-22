import test from "node:test";
import assert from "node:assert/strict";
import { canAccessArchiveDocuments, retrieveArchiveContext, buildGroundedAnswer } from "./archive-ai.ts";

test("retrieval finds relevant project context for a Wi‑Fi deployment query", () => {
  const result = retrieveArchiveContext("wifi");

  assert.ok(result.chunks.length > 0);
  assert.ok(result.citations.length > 0);
  assert.ok(result.chunks.some((chunk) => /wi[\s\u2011-]*fi/.test(chunk.text.toLowerCase())));
});

test("archive AI enforces role-based document access", () => {
  assert.equal(canAccessArchiveDocuments({ role: "STUDENT" }), false);
  assert.equal(canAccessArchiveDocuments({ role: "FACULTY" }), true);
  assert.equal(canAccessArchiveDocuments({ role: "ADMIN" }), true);
});

test("grounded answers refuse to invent unsupported facts", () => {
  const answer = buildGroundedAnswer(
    "What projects use Neuralink?",
    [],
    "Use only the retrieved archive context.",
  );

  assert.match(answer, /couldn't find enough information|insufficient/i);
});
