import { supabase } from "@/src/lib/supabase";

export type AppRole = "STUDENT" | "FACULTY" | "ADMIN";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: AppRole;
  source: "supabase" | "demo";
};

export const rolePriority: Record<AppRole, number> = {
  STUDENT: 1,
  FACULTY: 2,
  ADMIN: 3,
};

export const roleOptions: AppRole[] = ["STUDENT", "FACULTY", "ADMIN"];
export const onboardingRoleOptions = [
  { value: "STUDENT", label: "Student", description: "Showcase projects and manage submissions." },
  { value: "FACULTY", label: "Teacher", description: "Review student projects and faculty workflows." },
  { value: "HOD", label: "HOD", description: "Department oversight and institutional review." },
] as const;

export const AUTH_STORAGE_KEY = "cpa-auth-user";

export const getRoleLabel = (role: AppRole): string => {
  if (role === "FACULTY") {
    return "Faculty";
  }

  if (role === "ADMIN") {
    return "Admin";
  }

  return "Student";
};

export const normalizeRole = (value?: string | null): AppRole => {
  if (value === "FACULTY") {
    return "FACULTY";
  }

  if (value === "ADMIN") {
    return "ADMIN";
  }

  return "STUDENT";
};

export const resolveRequestedOnboardingRole = (
  value?: string | null,
): AppRole => {
  if (value === "FACULTY" || value === "TEACHER") {
    return "FACULTY";
  }

  if (value === "ADMIN") {
    return "ADMIN";
  }

  if (value === "HOD") {
    return "FACULTY";
  }

  return "STUDENT";
};

export const isRoleAllowed = (role: AppRole, allowedRoles: AppRole[]) => {
  if (!allowedRoles.length) {
    return true;
  }

  return allowedRoles.includes(role);
};

export const getDefaultDemoUser = (): AuthUser => ({
  id: "demo-user",
  email: "demo@campusarchive.local",
  name: "Demo Student",
  role: "STUDENT",
  source: "demo",
});

export const getDemoUserForRole = (role: AppRole): AuthUser => ({
  id: `demo-${role.toLowerCase()}`,
  email: `demo-${role.toLowerCase()}@campusarchive.local`,
  name: `Demo ${getRoleLabel(role)}`,
  role,
  source: "demo",
});

export const readAuthUser = (): AuthUser | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<AuthUser>;

    return {
      ...getDefaultDemoUser(),
      ...parsed,
      role: normalizeRole(parsed.role),
      source: parsed.source === "supabase" ? "supabase" : "demo",
    };
  } catch {
    return null;
  }
};

export const writeAuthUser = (user: AuthUser) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
};

export const clearAuthUser = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
};

async function syncUserProfile(authUser: {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown> | null;
}) {
  if (!supabase || !authUser.email) {
    return null;
  }

  const normalizedEmail = authUser.email.toLowerCase();
  const profileName =
    typeof authUser.user_metadata?.full_name === "string" && authUser.user_metadata.full_name.trim()
      ? authUser.user_metadata.full_name.trim()
      : authUser.email.split("@")[0];

  const { error } = await supabase.from("user").upsert(
    {
      email: normalizedEmail,
      name: profileName,
      role: "STUDENT",
    },
    { onConflict: "email" },
  );

  if (error) {
    throw error;
  }

  return {
    email: normalizedEmail,
    name: profileName,
  };
}

export async function signUpWithEmailAndPassword({
  email,
  password,
  fullName,
}: {
  email: string;
  password: string;
  fullName: string;
}) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName.trim() || email.split("@")[0],
      },
    },
  });

  if (error) {
    throw error;
  }

  if (data.user?.email) {
    await syncUserProfile(data.user);
  }

  return data.user;
}

export async function signInWithEmailAndPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }

  if (data.user?.email) {
    await syncUserProfile(data.user);
  }

  return data.user;
}

export async function signOutFromSupabase() {
  if (!supabase) {
    clearAuthUser();
    return;
  }

  clearAuthUser();

  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function loadCurrentUserProfile(): Promise<AuthUser | null> {
  if (!supabase) {
    return null;
  }

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    clearAuthUser();
    return null;
  }

  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !authUser?.email) {
    clearAuthUser();
    return null;
  }

  await syncUserProfile(authUser);

  const normalizedEmail = authUser.email.toLowerCase();
  const { data: profile, error: profileError } = await supabase
    .from("user")
    .select("id, name, email, role")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (profileError && profileError.code !== "PGRST116") {
    throw profileError;
  }

  const currentName =
    profile?.name ||
    (typeof authUser.user_metadata?.full_name === "string"
      ? authUser.user_metadata.full_name
      : authUser.email.split("@")[0]);

  const role = normalizeRole(profile?.role ?? "STUDENT");

  const nextUser: AuthUser = {
    id: String(profile?.id ?? authUser.id),
    email: normalizedEmail,
    name: currentName,
    role,
    source: "supabase",
  };

  writeAuthUser(nextUser);
  return nextUser;
}
