// All personal data for Sai Vidith's portfolio — sourced from resume + confirmed details

export const PERSONAL_INFO = {
  name: "Gouribhatla Sai Vidith",
  shortName: "Sai Vidith",
  handle: "saividith",
  title: "AI/ML & Backend Engineer",
  roles: [
    "AI/ML Engineer",
    "Backend Engineer",
    "Systems Builder",
    "Full-Stack Developer",
  ],
  bio: "Penultimate-year CSE (Data Science) student building production systems across AI/ML, backend, and infrastructure — from an 8-GPU compute cluster I run myself to RAG pipelines and a 17-year document pipeline built at INCOIS.",
  location: "Hyderabad, India",
  institution: "VNR Vignana Jyothi Institute of Engineering and Technology",
  email: "saividith396@gmail.com",
  domain: "saividith.tech",
  github: {
    primary: "https://github.com/sai-vidith",
    secondary: "https://github.com/saividith",
  },
  linkedin: "https://linkedin.com/in/saividith",
  resumeUrl: "/SaiVidith_Resume.pdf",
  availableForWork: true,
};

// ─────────────────────────────────────────────
// Projects — hero tier (full case-study cards)
// ─────────────────────────────────────────────
export const PROJECTS = [
  {
    id: "axon",
    title: "Axon",
    tagline: "AI-powered second brain — a deployed RAG knowledge assistant",
    description:
      "A deployed RAG knowledge system: FastAPI embeds documents via all-MiniLM-L6-v2 into ChromaDB, then routes queries across Groq (LLaMA 3.3) and Gemini. Firebase Auth with per-user Firestore profiles and a rate-limited public API, live on Render + Vercel.",
    stack: ["FastAPI", "ChromaDB", "HuggingFace", "Groq", "Gemini", "Firebase", "Next.js"],
    category: "AI/ML",
    link: "https://github.com/sai-vidith/Smart_Brain",
    linkLabel: "View Source",
    highlights: ["RAG architecture", "Multi-model routing (Groq + Gemini)", "Firebase Auth + per-user profiles", "Rate-limited public API"],
    architecture: {
      components: ["Next.js Client", "FastAPI Gateway", "MiniLM-L6-v2 Embedder", "ChromaDB", "Groq (LLaMA 3.3)", "Gemini", "Firebase Auth", "Firestore"],
      flow: "Document Upload → Embed (MiniLM) → ChromaDB Store → User Query → Similarity Search → Route to Groq/Gemini → Grounded Response",
      decisions: [
        { choice: "Dual LLM routing (Groq + Gemini)", reason: "Groq for low-latency inference, Gemini as a broader-context fallback — balances speed and capability" },
        { choice: "ChromaDB over a managed vector DB", reason: "Self-hosted with no per-query cost — sufficient for the current scale of the knowledge base" },
      ],
      tradeoffs: "Self-hosted vector DB trades managed scalability for zero marginal cost — fine at current usage, would revisit if query volume grows sharply.",
    },
    featured: true,
  },
  {
    id: "ai-business-toolkit",
    title: "AI Business Tool Kit",
    tagline: "MCP multi-agent platform — 5 AI microservices in production",
    description:
      "A containerised multi-agent AI automation platform built on MCP. A Node.js API gateway routes tasks to an Agent Registry that dispatches work across 5 Docker microservices (Website Generator, Marketing Agent, Image Generator, Analytics, VoiceBot) for end-to-end automated AI workflows.",
    stack: ["Node.js", "MCP", "Docker", "Redis", "MongoDB", "Nginx", "WebSockets"],
    category: "AI/ML",
    link: "https://github.com/sai-vidith/AI-tool-kit",
    linkLabel: "View Source",
    highlights: ["5 Docker microservices", "Redis inter-agent queues", "Nginx reverse proxy + rate limiting", "Non-root, resource-constrained containers"],
    architecture: {
      components: ["Node.js API Gateway", "Agent Registry", "5 Docker Microservices", "Redis Queue", "MongoDB", "Nginx Reverse Proxy", "WebSocket Layer"],
      flow: "Client Request → API Gateway → Agent Registry → Redis Queue → Dispatch to Microservice → Process → MongoDB Persist → WebSocket Update",
      decisions: [
        { choice: "MCP for agent orchestration", reason: "Standardised tool-use protocol across heterogeneous agents — simpler than a bespoke dispatcher" },
        { choice: "Non-root containers with per-agent limits", reason: "Isolates blast radius so no single agent can starve cluster resources" },
      ],
      tradeoffs: "Redis-based queueing adds a network hop versus direct calls, but decouples agents so one slow service can't block the gateway.",
    },
    featured: true,
  },
  {
    id: "gpu-cluster",
    title: "VJ GPU Cluster",
    tagline: "Distributed Ray compute cluster across 6–8 physical nodes",
    description:
      "Architected and operate a production compute cluster using Ray across 6–8 physical nodes — node configuration, resource allocation, job scheduling, and real-time monitoring across heterogeneous hardware. Configured NFS for shared storage, SSH-based passwordless auth between head/worker nodes, and CUDA-aware resource allocation enabling single- and multi-GPU (8-GPU) parallel jobs with live status monitoring via a web UI.",
    stack: ["Ray", "Python", "Docker", "Linux", "FastAPI", "CUDA", "NFS"],
    category: "Infrastructure",
    link: "https://cluster.vjstartup.com",
    linkLabel: "Visit Cluster",
    highlights: ["6–8 physical nodes", "8-GPU parallel job execution", "NFS shared storage", "Live job monitoring web UI"],
    architecture: {
      components: ["Ray Head Node", "Ray Worker Nodes (6–8)", "NFS Shared Storage", "CUDA Resource Allocator", "FastAPI Monitoring UI"],
      flow: "Job Submit → Ray Head Scheduler → Resource-Aware Placement → Worker Node(s) → CUDA-aware GPU Allocation → Live Status → Web UI",
      decisions: [
        { choice: "Ray over raw Slurm/Kubernetes", reason: "Python-native scheduling — faster iteration for ML workloads across heterogeneous nodes" },
        { choice: "NFS for shared storage", reason: "Simple, POSIX-compatible shared filesystem across all nodes without extra infrastructure" },
      ],
      tradeoffs: "NFS is simpler to operate than a distributed filesystem but scales less far — fine at 6–8 nodes, would need to revisit beyond that.",
    },
    featured: true,
  },
  {
    id: "ambulance-detection",
    title: "Emergency Vehicle Detection",
    tagline: "Real-time emergency vehicle detection at 25+ FPS with YOLOv8",
    description:
      "A real-time object detection pipeline using YOLOv8 and PyTorch, training a custom model to identify emergency vehicles in live video streams. Optimised the inference pipeline for real-time throughput and packaged it into a production-ready system with application-level decision logic.",
    stack: ["YOLOv8", "PyTorch", "OpenCV", "Python"],
    category: "AI/ML",
    link: "https://github.com/sai-vidith/Ambulance-Detection-using-YOLOv8",
    linkLabel: "View Source",
    highlights: ["Custom-trained YOLOv8 model", "25+ FPS real-time inference", "OpenCV video pipeline", "Application-level decision logic"],
    architecture: {
      components: ["Video Stream", "OpenCV Frame Extraction", "YOLOv8 Model", "PyTorch Runtime", "Decision Logic", "Alert Output"],
      flow: "Video Feed → Frame Extraction (OpenCV) → YOLOv8 Inference → Confidence Filtering → Decision Logic → Alert/Output",
      decisions: [
        { choice: "YOLOv8 over two-stage detectors", reason: "Single-stage detection needed to sustain real-time FPS on live video" },
        { choice: "Custom training on emergency-vehicle data", reason: "Base COCO classes don't distinguish emergency vehicles — required a fine-tuned dataset" },
      ],
      tradeoffs: "Traded a small amount of accuracy for inference speed by choosing a lighter YOLOv8 variant, prioritising real-time responsiveness.",
    },
    featured: true,
  },
];

// ─────────────────────────────────────────────
// More work — smaller, description-only cards
// ─────────────────────────────────────────────
export const MORE_PROJECTS = [
  {
    id: "blog-app",
    title: "Blog App",
    tagline: "Full-stack blog platform with auth, CRUD posts, and user management",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    link: "https://github.com/sai-vidith/Blog-App",
    linkLabel: "View Source",
  },
  {
    id: "vj-dataquesters-website",
    title: "VJ DataQuesters Website",
    tagline: "College club website with event listings and registration, built while leading the club's technical initiatives",
    stack: ["React", "JavaScript"],
    link: "https://github.com/vjdataquesters/WebsiteESG",
    linkLabel: "View Source",
  },
];

// ─────────────────────────────────────────────
// Research
// ─────────────────────────────────────────────
export const RESEARCH = [
  {
    id: "greenwashing",
    title: "ESG Greenwashing Detection",
    venue: "IEEE — submitted",
    description:
      "Research applying Gradient Boosting to detect ESG greenwashing signals across 835 firms, using SHAP for interpretability and a Streamlit app to explore predictions.",
    stack: ["Python", "scikit-learn", "SHAP", "Streamlit"],
    metrics: ["835 firms analysed", "F1 = 0.97", "SHAP-based interpretability"],
    link: null as string | null,
  },
];

// ─────────────────────────────────────────────
// Skills — grouped, no arbitrary numeric levels
// ─────────────────────────────────────────────
export const SKILLS = [
  {
    category: "Languages",
    icon: "💻",
    items: ["Python", "JavaScript", "TypeScript", "SQL", "Bash", "Java"],
  },
  {
    category: "AI / ML & Data",
    icon: "🧠",
    items: ["PyTorch", "HuggingFace", "YOLOv8", "RAG / ChromaDB", "NumPy", "Pandas", "Data Visualisation"],
  },
  {
    category: "Backend & APIs",
    icon: "⚙️",
    items: ["FastAPI", "Node.js", "Express.js", "REST APIs", "WebSockets", "MCP"],
  },
  {
    category: "Databases",
    icon: "🗄️",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "ChromaDB"],
  },
  {
    category: "Cloud & DevOps",
    icon: "☁️",
    items: ["Docker", "Kubernetes (basics)", "Linux", "Nginx", "AWS (basics)", "GCP"],
  },
  {
    category: "Tools",
    icon: "🛠️",
    items: ["Git", "GitHub", "JIRA", "Splunk (basics)"],
  },
];

// ─────────────────────────────────────────────
// Work experience — reverse chronological
// ─────────────────────────────────────────────
export const WORK_EXPERIENCE = [
  {
    title: "Fullstack Intern",
    organization: "Trovofi Pvt Ltd",
    location: "trovofi.in",
    period: "Oct 2025 – Dec 2025",
    description:
      "Built and shipped the frontend and backend for www.trovofi.in over a 3-month internship, including automated email workflows and database-backed storage for user data.",
    highlights: ["Frontend + backend of trovofi.in", "Email automation with Nodemailer", "Firebase for data storage"],
  },
  {
    title: "AI/ML Project Intern",
    organization: "INCOIS (Indian National Centre for Ocean Information Services)",
    location: "Hyderabad, India",
    period: "Mar 2025 – May 2025",
    description:
      "Designed and implemented an end-to-end Python data pipeline to ingest, process, and structure 17 years of domain-specific documents (2008–2025) — ETL across 100+ large-scale PDFs with OCR fallback for scanned documents. Automated document workflows to eliminate 40+ hours/month of manual effort, and maintained the pipeline end-to-end, diagnosing and fixing format-specific extraction failures.",
    highlights: ["17 years of documents processed", "100+ PDFs, OCR fallback", "40+ hrs/month automated", "Worked directly with domain scientists"],
  },
];

// ─────────────────────────────────────────────
// Leadership & achievements
// ─────────────────────────────────────────────
export const LEADERSHIP = [
  {
    title: "Tech Lead",
    organization: "VJ DataQuesters",
    period: "2024 – Present",
    description: "Led technical initiatives for a 200+ member community (50+ technical); shipped production features to the club platform and mentored junior members on engineering best practices.",
  },
  {
    title: "Runner-up",
    organization: "Technovista Hackathon",
    period: "2024",
    description: "Delivered a working AI-based system under time constraints, demonstrating end-to-end problem solving and team execution in a competitive setting.",
  },
  {
    title: "Rank 47 / Top 100",
    organization: "Competitive Programming Contest",
    period: "",
    description: "Solved 160+ problems across arrays, graphs, dynamic programming, and algorithms on LeetCode.",
  },
];

// ─────────────────────────────────────────────
// Education
// ─────────────────────────────────────────────
export const EDUCATION = {
  institution: "VNR Vignana Jyothi Institute of Engineering and Technology",
  degree: "B.Tech, Computer Science and Engineering (Data Science)",
  location: "Hyderabad, India",
  period: "2023 – 2027",
  cgpa: "8.87",
};

// Combined timeline used by the terminal "About" view and Experience section
export const EXPERIENCE = [
  {
    type: "work",
    title: WORK_EXPERIENCE[0].title,
    organization: WORK_EXPERIENCE[0].organization,
    location: WORK_EXPERIENCE[0].location,
    period: WORK_EXPERIENCE[0].period,
    description: WORK_EXPERIENCE[0].description,
    highlights: WORK_EXPERIENCE[0].highlights,
  },
  {
    type: "work",
    title: WORK_EXPERIENCE[1].title,
    organization: WORK_EXPERIENCE[1].organization,
    location: WORK_EXPERIENCE[1].location,
    period: WORK_EXPERIENCE[1].period,
    description: WORK_EXPERIENCE[1].description,
    highlights: WORK_EXPERIENCE[1].highlights,
  },
  {
    type: "leadership",
    title: LEADERSHIP[0].title,
    organization: LEADERSHIP[0].organization,
    location: "Hyderabad, India",
    period: LEADERSHIP[0].period,
    description: LEADERSHIP[0].description,
    highlights: ["200+ member community", "Production features shipped", "Mentored junior members"],
  },
  {
    type: "achievement",
    title: `${LEADERSHIP[1].title} — ${LEADERSHIP[1].organization}`,
    organization: LEADERSHIP[1].organization,
    location: "",
    period: LEADERSHIP[1].period,
    description: LEADERSHIP[1].description,
    highlights: [],
  },
  {
    type: "achievement",
    title: `${LEADERSHIP[2].title} — LeetCode`,
    organization: LEADERSHIP[2].organization,
    location: "",
    period: LEADERSHIP[2].period,
    description: LEADERSHIP[2].description,
    highlights: ["160+ problems solved"],
  },
  {
    type: "education",
    title: EDUCATION.degree,
    organization: EDUCATION.institution,
    location: EDUCATION.location,
    period: EDUCATION.period,
    description: `CGPA: ${EDUCATION.cgpa} / 10`,
    highlights: [`CGPA ${EDUCATION.cgpa}`],
  },
];

export const CERTIFICATIONS = [
  { name: "AI Fundamentals", issuer: "IBM SkillsBuild / Cisco" },
  { name: "Prompt Design in Vertex AI", issuer: "Google Cloud" },
  { name: "SQL", issuer: "HackerRank" },
];

export const SYSTEM_PHILOSOPHY = [
  {
    title: "Design for failure",
    description: "Every system will fail. Design with circuit breakers, retry logic, and graceful degradation from day one.",
    icon: "🛡️",
  },
  {
    title: "Cache aggressively, invalidate carefully",
    description: "Cache at the right layer. Redis for hot data, CDN for static, in-memory for computed values. TTL > manual invalidation.",
    icon: "⚡",
  },
  {
    title: "APIs are contracts",
    description: "API design is product design. Version from v1, document everything, never break backwards compatibility in production.",
    icon: "📐",
  },
  {
    title: "Measure, then optimize",
    description: "Premature optimization is the root of all evil. Profile first, then optimize the actual bottleneck with data.",
    icon: "📊",
  },
];

export const CURRENTLY_LEARNING = [
  "Kubernetes & container orchestration at scale",
  "LLM fine-tuning & RLHF workflows",
  "Diffusion-based video generation (ComfyUI)",
  "Distributed systems at cluster scale",
];
