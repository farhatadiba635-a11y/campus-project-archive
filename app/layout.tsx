import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthStatus } from "@/src/components/auth/auth-status";
import { GlobalSearch } from "@/src/components/global-search";
import { ThemeToggle } from "@/src/components/theme-toggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campus Project Archive",
  description:
    "A modern institution-wide archive for student projects, lessons, deployments, and AI-powered knowledge reuse.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-3 py-4 lg:px-6">
          <div className="mb-4 flex flex-col gap-3 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/90 p-3 shadow-sm backdrop-blur-sm md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <AuthStatus />
            </div>
            <div className="flex items-center justify-end gap-2">
              <GlobalSearch />
              <ThemeToggle />
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
