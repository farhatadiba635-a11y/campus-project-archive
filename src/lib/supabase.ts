import { createClient } from "@supabase/supabase-js";

export const REQUIRED_SUPABASE_ENV_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

export const PROJECT_DOCUMENTS_BUCKET = "project-documents";

export const getMissingSupabaseEnvVars = () =>
  REQUIRED_SUPABASE_ENV_VARS.filter((key) => !process.env[key] || process.env[key]?.trim() === "");

export const isSupabaseConfigured = () => getMissingSupabaseEnvVars().length === 0;

export const getSupabaseConfigError = () => {
  const missing = getMissingSupabaseEnvVars();

  if (!missing.length) {
    return null;
  }

  return `Missing required Supabase environment variable(s): ${missing.join(", ")}. Add them to the environment before enabling sign-up, sign-in, session persistence, or logout.`;
};

export const assertSupabaseConfigured = () => {
  const error = getSupabaseConfigError();

  if (error) {
    throw new Error(error);
  }

  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
