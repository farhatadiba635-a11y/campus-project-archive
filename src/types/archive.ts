export type ArchiveStatus = "Draft" | "Submitted" | "Faculty Review" | "Approved" | "Archived";

export type ProjectInfo = {
  name: string;
  shortDescription: string;
  department: string;
  academicYear: string;
  domain: string;
  status: "In Progress" | "Completed" | "Archived";
  teamSize: number;
  facultyMentor: string;
};

export type ProblemSolution = {
  problemStatement: string;
  proposedSolution: string;
  objectives: string[];
  targetUsers: string;
};

export type ArchitectureBlock = {
  overview: string;
  frontend: string;
  backend: string;
  database: string;
  hardware: string;
  apis: string;
  components: string[];
};

export type TechnologyItem = {
  id: string;
  category: string;
  name: string;
};

export type ResourceItem = {
  id: string;
  name: string;
  type: string;
  size: string;
  storagePath?: string;
  fileUrl?: string;
  mimeType?: string;
  sizeBytes?: number;
  status?: "uploaded" | "error";
  error?: string;
};

export type DeploymentStep = {
  id: string;
  value: string;
};

export type CommonProblem = {
  id: string;
  problem: string;
  cause: string;
  solution: string;
  lesson: string;
};

export type Retrospective = {
  approach: string;
  whyItFailed: string;
  whatChanged: string;
  whatWouldYouDoDifferently: string;
  mostTimeCost: string;
};

export type VivaEntry = {
  id: string;
  question: string;
  answer: string;
  category: "Basic" | "Technical" | "Architecture" | "Database" | "Deployment" | "Limitations";
};

export type FacultyFeedback = {
  feedback: string;
  corrections: string;
  requirements: string;
  finalEvaluationNotes: string;
};

export type FutureImprovement = {
  id: string;
  value: string;
};

export type ArchiveProjectData = {
  info: ProjectInfo;
  problem: ProblemSolution;
  architecture: ArchitectureBlock;
  technologies: TechnologyItem[];
  resources: ResourceItem[];
  deployment: {
    steps: DeploymentStep[];
    envVars: string[];
  };
  commonProblems: CommonProblem[];
  retrospective: Retrospective;
  vivaQuestions: VivaEntry[];
  faculty: FacultyFeedback;
  futureImprovements: FutureImprovement[];
  status: ArchiveStatus;
};
