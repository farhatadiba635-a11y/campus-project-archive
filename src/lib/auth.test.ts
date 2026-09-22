import test from "node:test";
import assert from "node:assert/strict";

import {
  getRoleLabel,
  isRoleAllowed,
  resolveRequestedOnboardingRole,
  rolePriority,
} from "./auth";

test("role checks enforce the expected campus access rules", () => {
  assert.equal(getRoleLabel("STUDENT"), "Student");
  assert.equal(getRoleLabel("FACULTY"), "Faculty");
  assert.equal(getRoleLabel("ADMIN"), "Admin");

  assert.equal(isRoleAllowed("STUDENT", ["STUDENT", "FACULTY"]), true);
  assert.equal(isRoleAllowed("FACULTY", ["STUDENT"]), false);
  assert.equal(isRoleAllowed("ADMIN", ["ADMIN"]), true);
  assert.equal(rolePriority["FACULTY"], 2);
});

test("onboarding role selection stays separate from database authorization", () => {
  assert.equal(resolveRequestedOnboardingRole("STUDENT"), "STUDENT");
  assert.equal(resolveRequestedOnboardingRole("FACULTY"), "FACULTY");
  assert.equal(resolveRequestedOnboardingRole("HOD"), "FACULTY");
  assert.equal(resolveRequestedOnboardingRole("ADMIN"), "ADMIN");
});
