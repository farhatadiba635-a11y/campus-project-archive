"use client";

import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "cpa-theme";

type ThemeMode = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = storedTheme ?? (prefersDark ? "dark" : "light");

    setTheme(nextTheme);
    setMounted(true);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [mounted, theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-cyan-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
    >
      <span aria-hidden="true" className="mr-2 text-base">
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
      {mounted ? (theme === "dark" ? "Light" : "Dark") : "Theme"}
    </button>
  );
}
