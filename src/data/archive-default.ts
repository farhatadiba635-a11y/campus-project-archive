import type { ArchiveProjectData } from "@/src/types/archive";

export const defaultArchiveData: ArchiveProjectData = {
  info: {
    name: "",
    shortDescription: "",
    department: "",
    academicYear: "",
    domain: "",
    status: "In Progress",
    teamSize: 1,
    facultyMentor: "",
  },
  problem: {
    problemStatement: "",
    proposedSolution: "",
    objectives: ["", ""],
    targetUsers: "",
  },
  architecture: {
    overview: "",
    frontend: "",
    backend: "",
    database: "",
    hardware: "",
    apis: "",
    components: ["Frontend", "Backend", "Database", "API"],
  },
  technologies: [
    { id: "t1", category: "Frontend", name: "React" },
    { id: "t2", category: "Backend", name: "Node.js" },
    { id: "t3", category: "Database", name: "PostgreSQL" },
  ],
  resources: [
    { id: "r1", name: "Project Report.pdf", type: "PDF", size: "2.4 MB" },
  ],
  deployment: {
    steps: [
      { id: "d1", value: "Clone repository" },
      { id: "d2", value: "Install dependencies" },
      { id: "d3", value: "Configure environment variables" },
    ],
    envVars: ["DATABASE_URL", "FIREBASE_API_KEY", "API_BASE_URL"],
  },
  commonProblems: [
    {
      id: "cp1",
      problem: "",
      cause: "",
      solution: "",
      lesson: "",
    },
  ],
  retrospective: {
    approach: "",
    whyItFailed: "",
    whatChanged: "",
    whatWouldYouDoDifferently: "",
    mostTimeCost: "",
  },
  vivaQuestions: [
    {
      id: "v1",
      question: "",
      answer: "",
      category: "Basic",
    },
  ],
  faculty: {
    feedback: "",
    corrections: "",
    requirements: "",
    finalEvaluationNotes: "",
  },
  futureImprovements: [
    { id: "fi1", value: "" },
  ],
  status: "Draft",
};
