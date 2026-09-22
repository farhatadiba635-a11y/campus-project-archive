import Link from "next/link";
import { GlobalSearch } from "@/src/components/global-search";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Explore Projects", href: "/projects" },
  { label: "AI Knowledge", href: "/archive-ai" },
  { label: "Departments", href: "/projects" },
  { label: "Archive a Project", href: "/archive" },
  { label: "Dashboard", href: "/projects" },
];

const problemTimeline = [
  "Previous Student",
  "Builds project",
  "Writes documentation",
  "Graduates",
  "Knowledge gets scattered",
  "Next student starts from scratch",
];

const lostKnowledge = [
  "Architecture decisions",
  "Source code",
  "Deployment instructions",
  "Datasets",
  "Faculty requirements",
  "Common errors",
  "Failed approaches",
  "Viva questions",
  "Faculty feedback",
  "Future improvements",
];

const knowledgeNodes = [
  "Problem Statement",
  "Solution",
  "Architecture",
  "Tech Stack",
  "Source Code",
  "Documentation",
  "Dataset",
  "Deployment Guide",
  "Common Errors",
  "Viva Questions",
  "Faculty Feedback",
  "What Didn't Work",
  "Future Improvements",
];

const projectCards = [
  {
    title: "Smart Attendance System",
    dept: "CSE",
    year: "2025–26",
    tags: ["ESP32", "RFID", "Firebase", "React"],
    summary:
      "An RFID-based attendance system with real-time cloud synchronization.",
    status: "Completed",
    resources: 42,
    ai: "AI summary: Strong deployment workflow and authentication troubleshooting notes.",
  },
  {
    title: "Smart Irrigation System",
    dept: "ECE",
    year: "2024–25",
    tags: ["ESP32", "Sensors", "MQTT", "IoT"],
    summary:
      "Automated soil-moisture monitoring with remote irrigation alerts.",
    status: "Completed",
    resources: 28,
    ai: "AI summary: Best example for low-cost sensor calibration and field testing.",
  },
  {
    title: "AI Resume Analyzer",
    dept: "CSE",
    year: "2025–26",
    tags: ["Python", "NLP", "React", "AI"],
    summary:
      "Resume parsing and skill extraction using NLP-driven scoring logic.",
    status: "In Review",
    resources: 36,
    ai: "AI summary: Strong architecture for preprocessing, scoring, and feedback loops.",
  },
];

const techCards = [
  { label: "Frontend", value: "React" },
  { label: "Backend", value: "Node.js / Express" },
  { label: "Database", value: "Firebase" },
  { label: "Hardware", value: "ESP32 + RFID" },
  { label: "Hosting", value: "Vercel" },
];

const documentList = [
  "Project Report",
  "SRS",
  "Design Document",
  "API Documentation",
  "User Manual",
  "Presentation",
  "Deployment Guide",
];

const deploymentGuide = [
  "Clone repository",
  "Install dependencies",
  "Configure environment variables",
  "Create Firebase project",
  "Upload database rules",
  "Flash ESP32 firmware",
  "Start backend",
  "Start frontend",
];

const lessonCards = [
  {
    title: "Firebase Authentication Failed",
    problem: "Authentication randomly failed during deployment.",
    cause: "Incorrect Firebase configuration.",
    solution: "Updated environment variables and Firebase initialization.",
    lesson:
      "Always verify production Firebase credentials separately from local development credentials.",
  },
  {
    title: "ESP32 Wi‑Fi instability",
    problem: "The device stayed offline during testing.",
    cause: "The board was configured for 5GHz-only settings.",
    solution: "Shifted to a 2.4GHz SSID and validated firmware configuration.",
    lesson: "Check hardware compatibility before debugging application logic.",
  },
];

const vivaQuestions = [
  { category: "Basic Questions", q: "Why did you choose this project?" },
  { category: "Technical Questions", q: "Why did you choose ESP32?" },
  { category: "Architecture Questions", q: "Explain the data flow." },
  { category: "Critical Questions", q: "What are the limitations?" },
];

const aiSearchResults = [
  {
    title: "Smart Attendance System",
    tags: ["ESP32", "RFID", "Firebase"],
  },
  {
    title: "Smart Irrigation System",
    tags: ["ESP32", "Soil Moisture Sensor", "MQTT"],
  },
  {
    title: "IoT Energy Monitor",
    tags: ["ESP32", "Current Sensor", "ThingSpeak"],
  },
];

const compareRows = [
  { feature: "Hardware", a: "ESP32", b: "Arduino", c: "ESP32" },
  { feature: "Database", a: "Firebase", b: "MySQL", c: "MongoDB" },
  { feature: "Deployment", a: "Vercel", b: "Local", c: "AWS" },
  { feature: "Difficulty", a: "Medium", b: "Easy", c: "Hard" },
  { feature: "Known Issues", a: "4", b: "2", c: "7" },
];

const archiveSteps = [
  "Project information",
  "Problem and solution",
  "Architecture",
  "Technology stack",
  "Upload resources",
  "Deployment instructions",
  "Common problems",
  "What didn't work",
  "Faculty feedback",
  "Future improvements",
];

const dashboardStats = [
  { label: "Archived projects", value: "1,284" },
  { label: "Departments", value: "42" },
  { label: "Documents", value: "8,540" },
  { label: "Deployment guides", value: "3,210" },
  { label: "Documented issues", value: "6,820" },
];

const departmentCards = [
  "CSE",
  "ECE",
  "Mechanical",
  "Civil",
  "Biotech",
  "Electrical",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-slate-50/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white shadow-lg shadow-slate-200">
              CPA
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Campus
              </p>
              <h2 className="text-lg font-semibold text-slate-900">
                Project Archive
              </h2>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="transition hover:text-slate-900">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <GlobalSearch />
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:bg-slate-800">
              Profile
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 lg:px-8 lg:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-5 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Institutional project memory
              </div>
              <h1 className="max-w-xl text-5xl font-black tracking-[-0.06em] text-slate-900 md:text-6xl">
                Don’t Let Great College Projects Graduate With Their Students.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Preserve projects, mistakes, documentation, deployment knowledge, and faculty feedback so the next batch can build smarter.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:bg-slate-800"
                >
                  Explore Projects
                </Link>
                <Link
                  href="/archive"
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Archive a Project
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
                <div>
                  <div className="text-2xl font-black text-slate-900">1,284</div>
                  <div>archived projects</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">42</div>
                  <div>departments</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">8,540</div>
                  <div>knowledge files</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-slate-500">
                    <span>Project journey</span>
                    <span>Archive AI</span>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-slate-900 p-3 text-center text-sm font-medium text-white shadow-lg shadow-slate-200">
                      Student Project
                    </div>
                    <div className="flex justify-center text-slate-400">↓</div>
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-center text-sm font-medium text-emerald-800">
                      Archive
                    </div>
                    <div className="flex justify-center text-slate-400">↓</div>
                    <div className="rounded-2xl border border-violet-200 bg-violet-50 p-3 text-center text-sm font-medium text-violet-800">
                      AI Knowledge
                    </div>
                    <div className="flex justify-center text-slate-400">↓</div>
                    <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-3 text-center text-sm font-medium text-cyan-800">
                      Next Student
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                The problem
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-slate-900">
                Every Batch Starts From Zero.
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="space-y-5">
                  {problemTimeline.map((step, index) => (
                    <div key={step} className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                        {index + 1}
                      </div>
                      <div className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                  Lost information
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {lostKnowledge.map((item) => (
                    <li key={item} className="flex items-center gap-3 rounded-xl bg-white/70 px-3 py-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-lg font-semibold italic text-slate-800">
                  “The project may be finished. The knowledge shouldn&apos;t be.”
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              The solution
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-slate-900">
              Turn Every Project Into Institutional Knowledge.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {knowledgeNodes.map((node, index) => (
              <div
                key={node}
                className={`rounded-[1.5rem] border p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                  index % 4 === 0
                    ? "border-slate-200 bg-slate-50"
                    : index % 4 === 1
                      ? "border-emerald-200 bg-emerald-50"
                      : index % 4 === 2
                        ? "border-violet-200 bg-violet-50"
                        : "border-cyan-200 bg-cyan-50"
                }`}
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-700 shadow-sm">
                  {index + 1}
                </div>
                <p className="text-base font-semibold text-slate-800">{node}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Project archive
                </p>
                <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-900">
                  Discover what the campus has already built.
                </h2>
              </div>
              <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
                1,284 projects indexed
              </div>
            </div>

            <div className="mb-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <input
                placeholder="Search projects, technologies, problems, or mistakes..."
                className="w-full bg-transparent text-base text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            <div className="mb-8 flex flex-wrap gap-2 text-sm text-slate-600">
              {[
                "Department",
                "Academic year",
                "Project type",
                "Technology",
                "Programming language",
                "Hardware",
                "Difficulty",
                "Status",
                "Faculty",
                "Project domain",
              ].map((filter) => (
                <button
                  key={filter}
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {projectCards.map((project) => (
                <article
                  key={project.title}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-slate-500">
                        {project.dept} · {project.year}
                      </p>
                    </div>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                      {project.status}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">{project.summary}</p>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                    {project.ai}
                  </div>

                  <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                    <span>Student team: 4</span>
                    <span>{project.resources} archived resources</span>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button className="flex-1 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                      View Project
                    </button>
                    <button className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                      Ask AI
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Project detail
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-900">
              Smart Attendance System
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                    CSE · 2025–26
                  </span>
                  {"ESP32"}
                  {"RFID"}
                  {"Firebase"}
                  {"React"}
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Status</p>
                    <p className="mt-2 text-lg font-bold text-slate-900">Completed</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Team</p>
                    <p className="mt-2 text-lg font-bold text-slate-900">4 Students</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Mentor</p>
                    <p className="mt-2 text-lg font-bold text-slate-900">Dr. Sharma</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">
                    Project Overview
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    This project addressed manual attendance tracking by replacing paper sheets and inconsistent records with an RFID-based student check-in system connected to real-time cloud analytics. The solution aimed to reduce delays, improve accuracy, and provide a practical dashboard for faculty and administrators.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">
                  Architecture
                </h3>
                <div className="mt-6 space-y-3">
                  {[
                    "RFID Reader",
                    "ESP32",
                    "Wi‑Fi",
                    "Firebase",
                    "Backend API",
                    "React Dashboard",
                  ].map((item, index, arr) => (
                    <div key={item} className="flex items-center justify-center gap-3 text-sm font-medium text-slate-700">
                      <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                        {item}
                      </div>
                      {index !== arr.length - 1 && <span className="text-slate-400">↓</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">
                  Source Code
                </h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                    View GitHub Repository
                  </button>
                  <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                    Clone Project
                  </button>
                  <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                    Download ZIP
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">
                  Tech Stack
                </h3>
                <div className="mt-5 space-y-3">
                  {techCards.map((card) => (
                    <div key={card.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{card.label}</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{card.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">
                  Documentation
                </h3>
                <div className="mt-5 grid gap-2">
                  {documentList.map((doc) => (
                    <div key={doc} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                      <span>{doc}</span>
                      <span className="text-slate-400">↓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">
              Deployment Guide
            </h3>
            <ol className="mt-5 grid gap-3 md:grid-cols-2">
              {deploymentGuide.map((step, index) => (
                <li key={step} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Warning: Always keep production Firebase credentials separate from local development credentials; the team saw authentication failures when both were mixed during deployment.
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                Learn from failure
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-900">
                Learn From What Didn&apos;t Work.
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {lessonCards.map((lesson) => (
                <div key={lesson.title} className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
                  <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">{lesson.title}</h3>
                  <div className="mt-5 space-y-4 text-sm text-slate-700">
                    <div>
                      <p className="font-semibold uppercase tracking-[0.15em] text-slate-500">Problem</p>
                      <p className="mt-1">{lesson.problem}</p>
                    </div>
                    <div>
                      <p className="font-semibold uppercase tracking-[0.15em] text-slate-500">Cause</p>
                      <p className="mt-1">{lesson.cause}</p>
                    </div>
                    <div>
                      <p className="font-semibold uppercase tracking-[0.15em] text-slate-500">Solution</p>
                      <p className="mt-1">{lesson.solution}</p>
                    </div>
                    <div>
                      <p className="font-semibold uppercase tracking-[0.15em] text-slate-500">Lesson</p>
                      <p className="mt-1">{lesson.lesson}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Common errors
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-900">
              Troubleshooting from archived deployments.
            </h2>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">
                  ESP32 won&apos;t connect to Wi‑Fi
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Possible causes: incorrect SSID, incorrect password, 2.4GHz compatibility issue, incorrect firmware configuration.
                </p>
              </div>
              <button className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                This solved my problem
              </button>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-900 py-20 text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                Viva preparation
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-white">
                Viva Knowledge
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {vivaQuestions.map((item) => (
                <div key={item.q} className="rounded-[1.5rem] border border-slate-700 bg-slate-800 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.category}</p>
                  <p className="mt-3 text-base font-semibold text-white">{item.q}</p>
                  <button className="mt-5 text-sm font-medium text-cyan-300">Reveal answer</button>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[2rem] border border-slate-700 bg-slate-800 p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                    Archive AI
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-white">Ask AI about this project</h3>
                </div>
                <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                  Open assistant
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              AI knowledge assistant
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-900">
              Archive AI answers from evidence, not guesswork.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Sample query</p>
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                “Why did this team abandon Firebase?”
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-600">
                According to the archived project documentation: the team initially used Firebase but encountered authentication and deployment configuration issues. They eventually moved part of the backend logic to Node.js.
              </p>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Sources</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>• Deployment Notes</li>
                  <li>• Project Retrospective</li>
                  <li>• Faculty Feedback</li>
                </ul>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                AI search experience
              </p>
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                “Show me previous IoT projects using ESP32.”
              </div>

              <div className="mt-6 space-y-4">
                {aiSearchResults.map((result) => (
                  <div key={result.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-lg font-bold text-slate-900">{result.title}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {result.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-slate-700">
                <button className="rounded-full border border-slate-200 bg-white px-4 py-2">Compare Projects</button>
                <button className="rounded-full border border-slate-200 bg-white px-4 py-2">View Architecture</button>
                <button className="rounded-full border border-slate-200 bg-white px-4 py-2">Ask About Mistakes</button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                Comparison
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-900">
                Compare multiple archived projects.
              </h2>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <table className="min-w-full text-left">
                <thead className="bg-slate-50 text-sm uppercase tracking-[0.18em] text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Feature</th>
                    <th className="px-5 py-4">Project A</th>
                    <th className="px-5 py-4">Project B</th>
                    <th className="px-5 py-4">Project C</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.feature} className="border-t border-slate-200 text-sm text-slate-700">
                      <td className="px-5 py-4 font-semibold text-slate-900">{row.feature}</td>
                      <td className="px-5 py-4">{row.a}</td>
                      <td className="px-5 py-4">{row.b}</td>
                      <td className="px-5 py-4">{row.c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 text-lg text-slate-700">
              AI-generated insight: “What can I learn from these projects?”
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                Archive workflow
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-900">
                Archive a project before the knowledge disappears.
              </h2>
            </div>
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
              7 / 10 sections completed
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {archiveSteps.map((step, idx) => (
              <div
                key={step}
                className={`rounded-[1.5rem] border p-4 ${
                  idx < 7 ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                <p className="text-xs uppercase tracking-[0.18em]">Step {idx + 1}</p>
                <p className="mt-3 text-base font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                Student dashboard
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-900">
                Keep your project journey visible.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {dashboardStats.map((stat) => (
                <div key={stat.label} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-3xl font-black tracking-[-0.05em] text-slate-900">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "My Projects",
                "Saved Projects",
                "Recently Viewed",
                "Recommended Projects",
                "My Questions",
                "AI Conversations",
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Faculty dashboard
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-900">
              Review, mentor, and approve archived project knowledge.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Review queue</p>
              <div className="mt-4 space-y-3">
                {[
                  "Smart Attendance System",
                  "AI Resume Analyzer",
                  "Campus Lost & Found",
                ].map((project) => (
                  <div key={project} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700">
                    {project}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Approval flow</p>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="rounded-2xl bg-slate-50 p-3">Draft → Submitted</div>
                <div className="rounded-2xl bg-slate-50 p-3">Faculty Review</div>
                <div className="rounded-2xl bg-slate-50 p-3">Approved</div>
                <div className="rounded-2xl bg-slate-50 p-3">Archived</div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Mentor actions</p>
              <div className="mt-4 grid gap-2 text-sm text-slate-700">
                {[
                  "Add feedback",
                  "Mark important documentation",
                  "Add viva questions",
                  "Recommend projects for juniors",
                ].map((action) => (
                  <div key={action} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    {action}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                Project timeline
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-900">
                Understand how the project evolved.
              </h2>
            </div>

            <div className="space-y-6">
              {[
                ["July 2025", "Problem selected"],
                ["August 2025", "Architecture designed"],
                ["September 2025", "Prototype developed"],
                ["October 2025", "Firebase integration"],
                ["November 2025", "Deployment problems"],
                ["December 2025", "Final implementation"],
                ["January 2026", "Faculty feedback"],
              ].map(([date, event], index) => (
                <div key={date} className="flex items-center gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">{date}</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Retrospective
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-900">
              What Would You Do Differently?
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              "What would you change?",
              "What technology would you use today?",
              "What mistake cost the most time?",
              "What should juniors know before starting?",
              "What should they avoid?",
              "What would you improve?",
            ].map((question) => (
              <div key={question} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                {question}
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                Recommendations
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-900">
                Students who viewed this also explored.
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">Similar projects</h3>
                <div className="mt-5 space-y-3">
                  {[
                    "Campus Bus Tracking System",
                    "Smart Irrigation System",
                    "Face Recognition Attendance",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">
                  Before You Build This Project
                </h3>
                <ul className="mt-5 space-y-3 text-sm text-slate-700">
                  <li>• Validate the deployment environment before architecture finalization.</li>
                  <li>• Separate local and production configurations.</li>
                  <li>• Keep live hardware and cloud testing logs from day one.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                Department insights
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-slate-900">
                Search by department and technology.
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {departmentCards.map((dept) => (
                <span key={dept} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                  {dept}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>Campus Project Archive</p>
          <p>“Don&apos;t just archive the final project. Archive the journey.”</p>
        </div>
      </footer>
    </div>
  );
}
