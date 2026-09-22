export type ProjectStatus = "Completed" | "In Review" | "Active";
export type ProjectDifficulty = "Easy" | "Medium" | "Hard";

export type ProjectTechnology = {
  category: string;
  items: string[];
};

export type ProjectError = {
  question: string;
  causes: string[];
  solution: string;
};

export type VivaQuestion = {
  question: string;
  answer: string;
};

export type ProjectDocumentEntry = {
  id: number;
  name: string;
  fileType: string;
  sizeBytes: number;
  createdAt: string;
  uploadedBy: string;
  fileUrl?: string | null;
};

export type Project = {
  id: string;
  name: string;
  department: string;
  academicYear: string;
  description: string;
  technologies: string[];
  domain: string;
  difficulty: ProjectDifficulty;
  status: ProjectStatus;
  teamSize: number;
  facultyMentor: string;
  problemStatement: string;
  solution: string;
  objectives: string[];
  summary: string;
  resources: number;
  githubUrl: string;
  architecture: string[];
  technologyStack: ProjectTechnology[];
  documentation: string[];
  documents?: ProjectDocumentEntry[];
  deploymentGuide: string[];
  commonErrors: ProjectError[];
  lessons: string[];
  vivaQuestions: VivaQuestion[];
  facultyFeedback: string[];
  futureImprovements: string[];
  timeline: string[];
};

export const projects: Project[] = [
  {
    id: "smart-attendance-system",
    name: "Smart Attendance System",
    department: "Computer Science",
    academicYear: "2025–26",
    description:
      "An RFID-based attendance system with real-time cloud synchronization and faculty dashboards.",
    technologies: ["ESP32", "RFID", "Firebase", "React"],
    domain: "IoT",
    difficulty: "Medium",
    status: "Completed",
    teamSize: 4,
    facultyMentor: "Dr. Sharma",
    problemStatement:
      "Manual attendance tracking was prone to delay, duplication, and inaccurate reporting, especially in large classrooms.",
    solution:
      "A contactless RFID attendance flow connected to a cloud database and a live dashboard for instant reporting.",
    objectives: [
      "Reduce delay during attendance marking",
      "Maintain a reliable digital record",
      "Offer faculty visibility into attendance trends",
      "Create a repeatable, low-cost deployment model",
    ],
    summary:
      "AI summary: Strong deployment workflow and authentication troubleshooting notes from the final review.",
    resources: 42,
    githubUrl: "https://github.com/example/smart-attendance-system",
    architecture: [
      "RFID Reader",
      "ESP32",
      "Wi‑Fi",
      "Firebase",
      "Backend API",
      "React Dashboard",
    ],
    technologyStack: [
      { category: "Frontend", items: ["React"] },
      { category: "Backend", items: ["Node.js", "Express"] },
      { category: "Database", items: ["Firebase"] },
      { category: "Hardware", items: ["ESP32", "RFID Reader"] },
      { category: "Hosting", items: ["Vercel"] },
    ],
    documentation: [
      "Project Report",
      "SRS",
      "Design Document",
      "API Documentation",
      "Presentation",
      "Deployment Guide",
    ],
    documents: [
      {
        id: 1,
        name: "Smart Attendance System - Final Report.pdf",
        fileType: "PDF",
        sizeBytes: 1842000,
        createdAt: "2026-02-14T10:30:00Z",
        uploadedBy: "Aditi Sharma",
      },
      {
        id: 2,
        name: "Attendance Dashboard Wireframes.fig",
        fileType: "FIG",
        sizeBytes: 892000,
        createdAt: "2026-02-18T10:30:00Z",
        uploadedBy: "Rohan Mehta",
      },
      {
        id: 3,
        name: "Deployment Checklist.txt",
        fileType: "TXT",
        sizeBytes: 26000,
        createdAt: "2026-02-20T10:30:00Z",
        uploadedBy: "Priya Nair",
      },
    ],
    deploymentGuide: [
      "Clone the repository and install dependencies.",
      "Configure environment variables for Firebase and backend services.",
      "Create a Firebase project and enable authentication.",
      "Upload database rules and initialize the real-time database.",
      "Flash the ESP32 firmware with the RFID reader configuration.",
      "Start the backend API and verify the secure endpoints.",
      "Run the frontend dashboard and confirm live attendance updates.",
    ],
    commonErrors: [
      {
        question: "ESP32 won’t connect to Wi‑Fi",
        causes: [
          "Incorrect SSID",
          "Incorrect password",
          "2.4GHz compatibility issue",
          "Incorrect firmware configuration",
        ],
        solution:
          "Validate the SSID and credentials from a separate production config and confirm the device is on a 2.4GHz network before testing again.",
      },
      {
        question: "Firebase authentication fails intermittently",
        causes: [
          "Mixed local and production credentials",
          "Missing Firebase config values",
          "Improper initialization order",
        ],
        solution:
          "Keep production credentials isolated and initialize Firebase only after environment variables are confirmed to match the target project.",
      },
    ],
    lessons: [
      "Separate local and production Firebase credentials before deployment.",
      "Plan backend and hardware logs from the first firmware test cycle.",
      "Use faculty feedback early to reduce rework during final review.",
    ],
    vivaQuestions: [
      {
        question: "Why did you choose this project?",
        answer:
          "The project solved a recurring operational issue: manual attendance marking was slow, error-prone, and difficult to audit.",
      },
      {
        question: "Why did you choose ESP32?",
        answer:
          "ESP32 offered built-in Wi‑Fi, low cost, and easy integration with RFID hardware, making it useful for an automated classroom environment.",
      },
      {
        question: "How does authentication work?",
        answer:
          "The app verifies the RFID tag identity, validates the attendance event against the backend, and writes to Firebase with a timestamp and session reference.",
      },
    ],
    facultyFeedback: [
      "Strong architecture and practical deployment knowledge; documentation was clear and helpful for students reusing the project.",
      "The team should have documented production environment differences earlier to reduce deployment confusion.",
    ],
    futureImprovements: [
      "Add facial verification fallback for lost RFID cards.",
      "Improve attendance analytics and anomaly detection for repeated late entries.",
      "Support offline synchronization when internet access is weak during class transitions.",
    ],
    timeline: [
      "Problem Selected",
      "Architecture Designed",
      "Prototype",
      "Development",
      "Testing",
      "Deployment",
      "Final Review",
    ],
  },
  {
    id: "smart-irrigation-system",
    name: "Smart Irrigation System",
    department: "Electronics",
    academicYear: "2024–25",
    description:
      "A sensor-driven irrigation system that monitors soil moisture and automates watering decisions using MQTT messaging.",
    technologies: ["ESP32", "Soil Moisture Sensor", "MQTT", "IoT"],
    domain: "IoT",
    difficulty: "Medium",
    status: "Completed",
    teamSize: 3,
    facultyMentor: "Prof. Iyer",
    problemStatement:
      "Farmers and campus gardeners often overwater or underwater plants because moisture levels are not tracked in real time.",
    solution:
      "Use low-cost soil sensors and an ESP32 controller to monitor moisture and trigger irrigation only when thresholds are crossed.",
    objectives: [
      "Reduce water wastage",
      "Monitor current soil moisture in real time",
      "Automate irrigation based on threshold rules",
      "Keep the design cost-effective and scalable",
    ],
    summary:
      "AI summary: Best example for low-cost sensor calibration and field testing with environmental constraints.",
    resources: 28,
    githubUrl: "https://github.com/example/smart-irrigation-system",
    architecture: [
      "Soil Sensor",
      "ESP32",
      "MQTT Broker",
      "Rule Engine",
      "Valve Controller",
      "Monitoring Dashboard",
    ],
    technologyStack: [
      { category: "Controller", items: ["ESP32"] },
      { category: "Communication", items: ["MQTT"] },
      { category: "Sensors", items: ["Soil Moisture Sensor"] },
      { category: "Interface", items: ["Web Dashboard"] },
    ],
    documentation: [
      "Project Report",
      "Design Document",
      "User Manual",
      "Presentation",
      "Deployment Guide",
    ],
    deploymentGuide: [
      "Wire the soil sensor and relay to the ESP32.",
      "Set the moisture threshold values for the target crop.",
      "Configure the MQTT broker and topic definitions.",
      "Start the controller firmware and validate sensor readings.",
      "Connect the irrigation valve and verify command flow.",
      "Run the dashboard and view alerts in real time.",
    ],
    commonErrors: [
      {
        question: "Sensor values fluctuate unexpectedly",
        causes: [
          "Poor grounding",
          "Power instability",
          "Incorrect analog calibration",
        ],
        solution:
          "Calibrate the sensor across wet and dry states and isolate noisy power lines before final deployment.",
      },
      {
        question: "Irrigation triggers too frequently",
        causes: [
          "Threshold values set too low",
          "Sensor delay not configured",
          "Unstable network delay",
        ],
        solution:
          "Increase threshold hysteresis and add a short delay before re-triggering the valve controller.",
      },
    ],
    lessons: [
      "Environmental noise can create misleading sensor readings if calibration is rushed.",
      "Low-cost hardware needs a stronger power and grounding plan in field conditions.",
      "Testing the irrigation cycle under real soil conditions is more valuable than lab-only verification.",
    ],
    vivaQuestions: [
      {
        question: "Why use MQTT instead of direct API calls?",
        answer:
          "MQTT is lightweight, ideal for constrained devices, and reliable for low-bandwidth sensor event messaging.",
      },
      {
        question: "What were the major calibration challenges?",
        answer:
          "Different soil compositions changed the readings, so the team had to calibrate threshold values based on real deployment conditions.",
      },
    ],
    facultyFeedback: [
      "Good field-driven design and strong practical understanding of hardware constraints.",
      "The solution would benefit from a more explicit comparison against manual irrigation methods.",
    ],
    futureImprovements: [
      "Add multi-zone control for larger gardens.",
      "Use weather forecasting to optimize irrigation timing.",
      "Support solar-powered deployment with battery monitoring.",
    ],
    timeline: [
      "Problem Selected",
      "Architecture Designed",
      "Prototype",
      "Development",
      "Testing",
      "Deployment",
      "Final Review",
    ],
  },
  {
    id: "college-bus-tracking-system",
    name: "College Bus Tracking System",
    department: "Computer Science",
    academicYear: "2024–25",
    description:
      "A GPS-driven tracking application that helps students view live bus locations and arrival times on Android.",
    technologies: ["GPS", "Android", "Firebase"],
    domain: "Transportation",
    difficulty: "Medium",
    status: "Completed",
    teamSize: 5,
    facultyMentor: "Dr. Nair",
    problemStatement:
      "Students struggled with bus timing uncertainty and lacked real-time information about route delays and boarding status.",
    solution:
      "Track bus positions using GPS and expose them to students through a mobile app and web dashboard synced to Firebase.",
    objectives: [
      "Provide live location visibility",
      "Reduce uncertainty around bus arrival times",
      "Support route planning for students",
      "Keep data updates consistent across mobile and web interfaces",
    ],
    summary:
      "AI summary: Useful example of real-time data workflow and route-logic planning for student services.",
    resources: 34,
    githubUrl: "https://github.com/example/college-bus-tracking-system",
    architecture: [
      "GPS Device",
      "Android App",
      "Firebase",
      "Backend Services",
      "Student Dashboard",
    ],
    technologyStack: [
      { category: "Frontend", items: ["Android", "React"] },
      { category: "Backend", items: ["Firebase", "Node.js"] },
      { category: "Location", items: ["GPS"] },
    ],
    documentation: [
      "Project Report",
      "SRS",
      "API Documentation",
      "Presentation",
      "Deployment Guide",
    ],
    deploymentGuide: [
      "Configure the Android client and map APIs.",
      "Initialize the Firebase project and route database structure.",
      "Integrate GPS updates from the bus device and verify streaming.",
      "Deploy the backend service for live route calculations.",
      "Test route updates on campus and refine delay thresholds.",
    ],
    commonErrors: [
      {
        question: "GPS location updates are delayed",
        causes: [
          "Low network stability",
          "Background app permissions",
          "Incorrect refresh frequency",
        ],
        solution:
          "Tune the GPS update interval and validate permissions and foreground/background lifecycle behavior in Android.",
      },
    ],
    lessons: [
      "Real-time apps depend heavily on data freshness assumptions.",
      "Testing poor network conditions is critical before relying on route accuracy.",
    ],
    vivaQuestions: [
      {
        question: "How did you manage route updates?",
        answer:
          "The team updated bus locations at intervals and computed current travel trends to estimate expected arrival times.",
      },
    ],
    facultyFeedback: [
      "The project showed practical thinking around real-time constraints and student usability.",
    ],
    futureImprovements: [
      "Support route recommendations based on traffic patterns.",
      "Add emergency alerts and notifications for delay events.",
    ],
    timeline: [
      "Problem Selected",
      "Architecture Designed",
      "Prototype",
      "Development",
      "Testing",
      "Deployment",
      "Final Review",
    ],
  },
  {
    id: "ai-resume-analyzer",
    name: "AI Resume Analyzer",
    department: "Computer Science",
    academicYear: "2025–26",
    description:
      "A resume scoring and keyword-analysis tool using NLP to extract skills, align roles, and suggest improvements.",
    technologies: ["Python", "NLP", "React"],
    domain: "Artificial Intelligence",
    difficulty: "Hard",
    status: "In Review",
    teamSize: 4,
    facultyMentor: "Dr. Kapoor",
    problemStatement:
      "Students and recruiters lacked an efficient way to interpret resume quality and alignment against job descriptions.",
    solution:
      "Create an NLP-powered analyzer that detects key skills, scores content quality, and offers role-fit recommendations.",
    objectives: [
      "Extract key skills and experiences",
      "Compare resumes to job descriptions",
      "Generate structured feedback for users",
      "Keep scoring explainable and transparent",
    ],
    summary:
      "AI summary: Strong architecture for preprocessing, scoring, and iterative feedback loops with role matching.",
    resources: 36,
    githubUrl: "https://github.com/example/ai-resume-analyzer",
    architecture: [
      "Resume Upload",
      "Preprocessing",
      "NLP Model",
      "Skill Extractor",
      "Scoring Engine",
      "React Dashboard",
    ],
    technologyStack: [
      { category: "Frontend", items: ["React"] },
      { category: "Backend", items: ["Python", "Flask"] },
      { category: "AI", items: ["NLP", "Skill Matching"] },
    ],
    documentation: [
      "Project Report",
      "SRS",
      "Design Document",
      "API Documentation",
      "Presentation",
    ],
    deploymentGuide: [
      "Prepare the Python environment and install required NLP libraries.",
      "Validate the resume parsing pipeline on sample documents.",
      "Configure API routes for scoring and extraction.",
      "Deploy the frontend and connect it to the backend service.",
      "Test multiple resume formats and scoring outputs.",
    ],
    commonErrors: [
      {
        question: "The parser fails on inconsistent resume formats",
        causes: [
          "Unstructured text",
          "Poor tokenization",
          "Missing standard sections",
        ],
        solution:
          "Normalize the incoming text and use fallback matching rules for common resume sections before scoring.",
      },
    ],
    lessons: [
      "Simple NLP pipelines often fail without robust preprocessing.",
      "Explainability matters: users must understand why a resume was scored a certain way.",
    ],
    vivaQuestions: [
      {
        question: "What are the limitations of NLP-based resume analysis?",
        answer:
          "The tool can be confused by unusual formatting, non-standard vocabulary, and inconsistent skill representations across different industries.",
      },
    ],
    facultyFeedback: [
      "The solution demonstrates a practical AI workflow and good attention to real-world input variability.",
    ],
    futureImprovements: [
      "Add support for multiple languages and job descriptions.",
      "Use stronger semantic matching for role and skill similarity.",
    ],
    timeline: [
      "Problem Selected",
      "Architecture Designed",
      "Prototype",
      "Development",
      "Testing",
      "Deployment",
      "Final Review",
    ],
  },
  {
    id: "face-recognition-attendance",
    name: "Face Recognition Attendance",
    department: "Computer Science",
    academicYear: "2025–26",
    description:
      "A computer vision attendance system that recognizes faces and logs attendance into a central database.",
    technologies: ["Python", "OpenCV", "PostgreSQL"],
    domain: "Computer Vision",
    difficulty: "Hard",
    status: "Completed",
    teamSize: 4,
    facultyMentor: "Dr. Rao",
    problemStatement:
      "Existing attendance systems were still manual or RFID-based, and the team wanted to explore a contactless biometric option.",
    solution:
      "Use OpenCV and image-processing workflows to capture, compare, and register face samples for attendance tracking.",
    objectives: [
      "Create a reliable face recognition workflow",
      "Store attendance records securely in PostgreSQL",
      "Keep false positives low in classroom conditions",
      "Make the application easy to test with a sample dataset",
    ],
    summary:
      "AI summary: Good reference for computer vision pipeline design, environment setup, and dataset quality issues.",
    resources: 41,
    githubUrl: "https://github.com/example/face-recognition-attendance",
    architecture: [
      "Camera",
      "OpenCV Pipeline",
      "Face Recognition Model",
      "PostgreSQL",
      "Attendance Dashboard",
    ],
    technologyStack: [
      { category: "Vision", items: ["OpenCV"] },
      { category: "Language", items: ["Python"] },
      { category: "Database", items: ["PostgreSQL"] },
    ],
    documentation: [
      "Project Report",
      "SRS",
      "Design Document",
      "Presentation",
      "Deployment Guide",
    ],
    deploymentGuide: [
      "Prepare the camera setup and lighting environment.",
      "Train or test the recognition model on a small dataset.",
      "Configure database tables and secure attendance entries.",
      "Optimize tuning values for face alignment and thresholding.",
      "Run the dashboard and validate attendance logs.",
    ],
    commonErrors: [
      {
        question: "Detection fails in low-light classrooms",
        causes: [
          "Poor lighting",
          "Improper camera placement",
          "Low-quality face samples",
        ],
        solution:
          "Improve lighting conditions and capture a more consistent training set before increasing recognition thresholds.",
      },
    ],
    lessons: [
      "Dataset quality matters as much as algorithm design.",
      "Biometric systems need careful testing before they can be trusted for daily attendance.",
    ],
    vivaQuestions: [
      {
        question: "What is the biggest challenge in face recognition systems?",
        answer:
          "The biggest challenge is variability in lighting, pose, and image quality, which affects recognition accuracy.",
      },
    ],
    facultyFeedback: [
      "Complex but valuable computer vision project; strong understanding of both technical and practical constraints.",
    ],
    futureImprovements: [
      "Use infra-red or AI-based enhancements for low-light compatibility.",
      "Add anti-spoofing protection for recognition checks.",
    ],
    timeline: [
      "Problem Selected",
      "Architecture Designed",
      "Prototype",
      "Development",
      "Testing",
      "Deployment",
      "Final Review",
    ],
  },
  {
    id: "campus-lost-found",
    name: "Campus Lost & Found",
    department: "Information Technology",
    academicYear: "2025–26",
    description:
      "A web-based lost-and-found portal to help students report and recover misplaced belongings quickly.",
    technologies: ["React", "Node.js", "MongoDB"],
    domain: "Web Development",
    difficulty: "Medium",
    status: "Completed",
    teamSize: 3,
    facultyMentor: "Dr. Singh",
    problemStatement:
      "Students often lost documents, gadgets, and personal items and had no reliable campus-wide reporting mechanism.",
    solution:
      "Provide a campus-focused listing system where users can post items found or lost and match them through smart filters.",
    objectives: [
      "Enable quick item posting and discovery",
      "Support category-based filtering",
      "Reduce repeated reporting for the same item",
      "Keep the experience simple for students and staff",
    ],
    summary:
      "AI summary: Useful reference for full-stack CRUD workflows, filter design, and campus utility product thinking.",
    resources: 29,
    githubUrl: "https://github.com/example/campus-lost-found",
    architecture: [
      "Frontend UI",
      "Node.js API",
      "MongoDB",
      "Search Filters",
      "Admin Review",
    ],
    technologyStack: [
      { category: "Frontend", items: ["React"] },
      { category: "Backend", items: ["Node.js", "Express"] },
      { category: "Database", items: ["MongoDB"] },
    ],
    documentation: [
      "Project Report",
      "SRS",
      "Design Document",
      "Presentation",
      "Deployment Guide",
    ],
    deploymentGuide: [
      "Initialize the backend service and configure the environment.",
      "Set up MongoDB collections for lost and found entries.",
      "Connect the React frontend to the API endpoints.",
      "Define search and category filters for item matching.",
      "Test report creation and recovery workflows end-to-end.",
    ],
    commonErrors: [
      {
        question: "Search results are not accurate enough",
        causes: [
          "Missing field indexing",
          "Weak search filters",
          "Unstructured item descriptions",
        ],
        solution:
          "Introduce better indexing and tag-based sorting for item descriptions and categories before large-scale testing.",
      },
    ],
    lessons: [
      "Filtering and sorting can matter more than the raw CRUD logic in a campus utility product.",
      "User trust depends on consistent item matching and transparent status updates.",
    ],
    vivaQuestions: [
      {
        question: "How did you design the search experience?",
        answer:
          "The team used category filters and location-aware matching so users could narrow down items by type, place, and time of disappearance.",
      },
    ],
    facultyFeedback: [
      "Useful full-stack project with clear practical relevance and a straightforward user flow.",
    ],
    futureImprovements: [
      "Add item owner verification via university credentials.",
      "Introduce automated notification email and SMS alerts.",
    ],
    timeline: [
      "Problem Selected",
      "Architecture Designed",
      "Prototype",
      "Development",
      "Testing",
      "Deployment",
      "Final Review",
    ],
  },
];

export const getProjectById = (id: string) =>
  projects.find((project) => project.id === id);

export const getRelatedProjects = (project: Project, limit = 3) => {
  const related = projects
    .filter(
      (item) =>
        item.id !== project.id &&
        (item.domain === project.domain ||
          item.technologies.some((technology) => project.technologies.includes(technology))),
    )
    .slice(0, limit);

  return related.length >= limit
    ? related
    : projects.filter((item) => item.id !== project.id).slice(0, limit);
};
