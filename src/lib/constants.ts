// All personal data for Sai Vidith's portfolio

export const PERSONAL_INFO = {
  name: "Gouribhatla Sai Vidith",
  shortName: "Sai Vidith",
  handle: "saividith",
  title: "Backend & AI Engineer",
  roles: [
    "Backend Engineer",
    "AI Systems Builder",
    "Problem Solver",
    "Systems Architect",
    "Full-Stack Developer",
  ],
  bio: "I build systems that scale — from distributed backends to intelligent AI pipelines. Obsessed with clean architecture, real-world AI applications, and engineering that makes a difference.",
  location: "Hyderabad, India",
  institution: "Vignana Jyothi Institute of Technology",
  email: "saividith396@gmail.com",
  domain: "saividith.tech",
  github: {
    primary: "https://github.com/sai-vidith",
    secondary: "https://github.com/saividith",
  },
  linkedin: "https://linkedin.com/in/saividith",
  availableForWork: true,
};

export const PROJECTS = [
  {
    id: "smart-brain",
    title: "Smart Brain",
    tagline: "AI-powered second brain & knowledge assistant",
    description:
      "A production-grade knowledge management system that processes, embeds, and semantically retrieves information using RAG architecture. Features multi-modal document ingestion, vector storage, and an intelligent chat interface.",
    stack: ["Python", "FastAPI", "LangChain", "PostgreSQL", "Pinecone", "React", "Docker"],
    category: "AI/ML",
    github: "https://github.com/sai-vidith/Smart_Brain",
    highlights: ["RAG architecture", "Vector embeddings", "Multi-modal ingestion", "Semantic search"],
    architecture: {
      components: ["Client", "FastAPI Gateway", "LangChain Orchestrator", "Vector DB (Pinecone)", "PostgreSQL", "Redis Cache"],
      flow: "User Query → FastAPI → LangChain → Embed Query → Pinecone Similarity Search → Context Retrieval → LLM Response",
      decisions: [
        { choice: "Pinecone over Chroma", reason: "Production scalability + managed infrastructure" },
        { choice: "FastAPI over Flask", reason: "Async support, automatic OpenAPI docs, better performance" },
        { choice: "RAG over fine-tuning", reason: "Dynamic knowledge base, lower cost, easier updates" },
      ],
      tradeoffs: "Latency vs. accuracy: increased chunk overlap from 100→200 tokens (+15% relevant retrieval, +40ms p99 latency)",
    },
    featured: true,
  },
  {
    id: "kiro",
    title: "KIRo",
    tagline: "Knowledge Intelligence Retrieval system",
    description:
      "An agentic knowledge retrieval and organization system that autonomously indexes, categorizes, and cross-references information. Built on top of a multi-agent orchestration layer with tool use capabilities.",
    stack: ["Next.js", "TypeScript", "Python", "OpenAI", "PostgreSQL", "Redis"],
    category: "AI/ML",
    github: "https://github.com/saividith/KIRo",
    highlights: ["Multi-agent orchestration", "Tool use", "Auto-indexing", "Cross-referencing"],
    architecture: {
      components: ["Frontend (Next.js)", "Agent Orchestrator", "Tool Registry", "Knowledge Graph", "PostgreSQL", "Cache Layer"],
      flow: "Input → Agent Router → Specialist Agents → Tool Execution → Knowledge Update → Structured Output",
      decisions: [
        { choice: "Agent-based over monolithic", reason: "Specialization, parallel execution, easier debugging" },
        { choice: "Redis caching layer", reason: "Repeated queries served in <10ms vs 800ms DB lookup" },
      ],
      tradeoffs: "Agent coordination overhead vs. parallelism gains. Used async task queues to balance.",
    },
    featured: true,
  },
  {
    id: "project-raseed",
    title: "ProjectRaseed",
    tagline: "AI-powered receipt & expense intelligence",
    description:
      "End-to-end expense intelligence pipeline. Receipts are OCR-processed, ML-classified by category, and aggregated into actionable financial insights with anomaly detection.",
    stack: ["Python", "FastAPI", "OCR", "TensorFlow", "PostgreSQL", "React"],
    category: "AI/ML",
    github: "https://github.com/sai-vidith/ProjectRaseed",
    highlights: ["OCR pipeline", "ML classification", "Anomaly detection", "Financial insights"],
    architecture: {
      components: ["Upload Service", "OCR Engine", "ML Classifier", "Analytics Engine", "PostgreSQL", "Dashboard"],
      flow: "Receipt Upload → OCR Processing → Text Extraction → ML Category Classification → DB Storage → Analytics Dashboard",
      decisions: [
        { choice: "Tesseract + custom preprocessing", reason: "Better accuracy on varied receipt formats vs. cloud OCR cost" },
        { choice: "PostgreSQL with JSONB", reason: "Flexible schema for varied receipt structures + relational queries" },
      ],
      tradeoffs: "Processing speed vs. accuracy. Implemented async job queue for non-blocking UX.",
    },
    featured: true,
  },
  {
    id: "healthcare-blockchain",
    title: "HealthCare Blockchain",
    tagline: "Decentralized health record management",
    description:
      "A blockchain-based healthcare data management system ensuring patient data sovereignty, immutable audit trails, and selective access control for healthcare providers.",
    stack: ["Solidity", "Web3.js", "React", "Node.js", "IPFS", "Ethereum"],
    category: "Blockchain",
    github: "https://github.com/sai-vidith/HealthCare-BlockChain",
    highlights: ["Smart contracts", "IPFS storage", "Access control", "Immutable audit logs"],
    architecture: {
      components: ["React DApp", "Ethereum Smart Contracts", "IPFS Node", "Web3 Provider", "Event Indexer"],
      flow: "Patient → DApp → Smart Contract → IPFS (data) + Blockchain (metadata) → Access Control Check → Provider View",
      decisions: [
        { choice: "IPFS for data, blockchain for metadata", reason: "Cost-efficient — only hashes on-chain, not full records" },
        { choice: "Role-based access control", reason: "Granular permissions — patient controls who sees what" },
      ],
      tradeoffs: "Transaction finality latency (12-15s) vs. immutability guarantees. Used optimistic updates for UX.",
    },
    featured: true,
  },
  {
    id: "navaidix",
    title: "Navaidix",
    tagline: "AI-powered navigation & intelligent indexing",
    description:
      "A navigation intelligence system with real-time path optimization, smart indexing of geographic data, and AI-powered route recommendations based on contextual factors.",
    stack: ["Node.js", "Express", "PostgreSQL", "Redis", "Python", "Docker"],
    category: "Backend",
    github: "https://github.com/sai-vidith/Navaidix",
    highlights: ["Path optimization", "Real-time data", "Smart indexing", "Geospatial queries"],
    architecture: {
      components: ["API Gateway", "Route Engine", "Cache (Redis)", "Geo DB (PostGIS)", "AI Recommender", "WebSocket"],
      flow: "Route Request → API Gateway → Cache Check → Route Engine → PostGIS Spatial Query → AI Scoring → WebSocket Response",
      decisions: [
        { choice: "PostGIS over external APIs", reason: "Reduced latency, no rate limits, full control over geospatial queries" },
        { choice: "Redis Geo commands", reason: "O(log N) nearest-neighbor searches at scale" },
      ],
      tradeoffs: "Freshness vs. performance: TTL-based cache invalidation for route data (30s for traffic, 1h for static)",
    },
    featured: false,
  },
  {
    id: "ambulance-detection",
    title: "Ambulance Detection",
    tagline: "Real-time emergency vehicle detection with YOLOv8",
    description:
      "Computer vision system for real-time emergency vehicle detection in traffic surveillance footage. Achieves 94.2% mAP50 using a custom-tuned YOLOv8 model with optimized inference pipeline.",
    stack: ["Python", "YOLOv8", "OpenCV", "FastAPI", "WebSocket", "TensorRT"],
    category: "AI/ML",
    github: "https://github.com/sai-vidith/Ambulance-Detection-using-YOLOv8",
    highlights: ["94.2% mAP50", "Real-time inference", "TensorRT optimization", "Live WebSocket feed"],
    architecture: {
      components: ["Camera Feed", "Preprocessing Pipeline", "YOLOv8 Model", "TensorRT Runtime", "Alert System", "Dashboard"],
      flow: "Video Stream → Frame Extraction → Preprocessing → YOLOv8 Inference → Confidence Scoring → Alert → Dashboard",
      decisions: [
        { choice: "TensorRT over vanilla PyTorch", reason: "2.3x speedup, 60% memory reduction, critical for real-time needs" },
        { choice: "Custom dataset augmentation", reason: "+8% mAP improvement over base YOLOv8 on ambulance-specific features" },
      ],
      tradeoffs: "Accuracy vs. latency: YOLOv8n (faster, 89% mAP) vs YOLOv8m (slower, 94.2% mAP). Chose medium for safety-critical use.",
    },
    featured: true,
  },
  {
    id: "smart-tourist",
    title: "Smart Tourist System",
    tagline: "AI-guided tourism experience platform",
    description:
      "An intelligent tourism platform providing personalized itinerary generation, real-time local recommendations, and augmented reality points of interest using AI and geolocation.",
    stack: ["React", "Node.js", "Python", "MongoDB", "Google Maps API", "OpenAI"],
    category: "Full-Stack",
    github: "https://github.com/saividith/smart-tourist-system",
    highlights: ["AI itineraries", "Real-time recommendations", "AR integration", "Geolocation"],
    architecture: {
      components: ["Mobile/Web Frontend", "Node.js API", "AI Service (Python)", "MongoDB", "Maps API", "Cache"],
      flow: "User Preferences → AI Service → Itinerary Generation → POI Scoring → Real-time Updates → Personalized Feed",
      decisions: [
        { choice: "MongoDB for POI data", reason: "Geospatial indexes, flexible schema for diverse attraction types" },
        { choice: "Microservice for AI", reason: "Independent scaling of compute-heavy AI vs. lightweight API calls" },
      ],
      tradeoffs: "Personalization quality vs. cold-start problem. Used collaborative filtering with fallback to popularity-based.",
    },
    featured: false,
  },
  {
    id: "ai-business-tool-kit",
    title: "AI Business Tool Kit",
    tagline: "Comprehensive toolkit for AI business solutions",
    description: "A business-focused tool kit that leverages AI capabilities to streamline operations and enhance productivity.",
    stack: ["JavaScript", "Node.js", "AI Integration"],
    category: "AI/ML",
    github: "https://github.com/sai-vidith/AI-tool-kit",
    highlights: ["Business automation", "AI integration", "Productivity enhancement"],
    architecture: {
      components: ["Frontend", "AI Core Service", "Integration Layer"],
      flow: "User Request → AI Core Service → Processing → Actionable Business Insights",
      decisions: [
        { choice: "Modular architecture", reason: "Easy integration of various AI tools" }
      ],
      tradeoffs: "Generality vs Specificity: focused on common business use cases to maximize utility."
    },
    featured: true,
  },
  {
    id: "bias-detection",
    title: "Bias Detection AI",
    tagline: "Mitigating unconscious bias in hiring & evaluations",
    description: "An AI-powered tool that detects and mitigates unconscious bias by analyzing decision-making patterns, evaluating historical data, and providing real-time insights for equitable outcomes.",
    stack: ["Python", "Machine Learning", "Data Analytics"],
    category: "AI/ML",
    github: "https://github.com/sai-vidith/Bias_Detection",
    highlights: ["Pattern discovery", "Bias mitigation", "Real-time insights"],
    architecture: {
      components: ["Data Processing Pipeline", "Bias Detection Model", "Analytics Dashboard"],
      flow: "Historical Data → Model Evaluation → Pattern Recognition → Insight Generation",
      decisions: [
        { choice: "White-box model evaluation", reason: "Interpretability is critical for fairness assessment" }
      ],
      tradeoffs: "Model complexity vs Interpretability."
    },
    featured: true,
  },
];

export const SKILLS = [
  {
    category: "Languages",
    icon: "💻",
    items: [
      { name: "Python", level: 92 },
      { name: "TypeScript/JavaScript", level: 88 },
      { name: "SQL", level: 85 },
      { name: "Java", level: 75 },
      { name: "Solidity", level: 65 },
    ],
  },
  {
    category: "AI / ML",
    icon: "🧠",
    items: [
      { name: "LangChain / LangGraph", level: 88 },
      { name: "YOLOv8 / Computer Vision", level: 85 },
      { name: "TensorFlow / PyTorch", level: 80 },
      { name: "RAG Architecture", level: 90 },
      { name: "Prompt Engineering", level: 87 },
      { name: "Scikit-learn", level: 82 },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    items: [
      { name: "FastAPI", level: 90 },
      { name: "Node.js / Express", level: 88 },
      { name: "REST API Design", level: 92 },
      { name: "Microservices", level: 80 },
      { name: "WebSockets / gRPC", level: 75 },
    ],
  },
  {
    category: "Databases",
    icon: "🗄️",
    items: [
      { name: "PostgreSQL / PostGIS", level: 87 },
      { name: "MongoDB", level: 82 },
      { name: "Redis", level: 80 },
      { name: "Pinecone (Vector DB)", level: 85 },
      { name: "IPFS", level: 65 },
    ],
  },
  {
    category: "Cloud / DevOps",
    icon: "☁️",
    items: [
      { name: "Docker / Docker Compose", level: 85 },
      { name: "AWS (EC2, S3, Lambda)", level: 78 },
      { name: "GitHub Actions CI/CD", level: 82 },
      { name: "Linux / Shell Scripting", level: 80 },
    ],
  },
  {
    category: "Frontend",
    icon: "🎨",
    items: [
      { name: "React / Next.js", level: 85 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Framer Motion", level: 75 },
      { name: "TypeScript", level: 85 },
    ],
  },
];

export const EXPERIENCE = [
  {
    type: "education",
    title: "B.Tech in Computer Science Engineering",
    organization: "Vignana Jyothi Institute of Technology",
    location: "Hyderabad, India",
    period: "2022 – Present",
    description: "Specializing in AI/ML and distributed systems. Active in technical clubs and competitive programming.",
    highlights: ["System Design Club Lead", "AI/ML Research Projects", "Backend Engineering Focus"],
  },
  {
    type: "achievement",
    title: "AI & GenAI Credentials",
    organization: "IBM, AWS & Credly",
    location: "Online",
    period: "2024 – 2025",
    description: "Earned multiple verified credentials in AI, cloud computing, and GenAI from IBM, AWS, and other platforms.",
    highlights: ["IBM AI Fundamentals", "AWS Cloud Practitioner", "GenAI Certification", "Credly Verified Profile"],
  },
  {
    type: "project",
    title: "System Design Club — Lead",
    organization: "VJ Institute of Technology",
    location: "Hyderabad, India",
    period: "2024 – Present",
    description: "Founded and led the System Design Club, organizing workshops on scalability, reliability, distributed systems, and real-world architecture patterns. Ran the Summer System Design event for 2026.",
    highlights: ["50+ members", "System Design workshops", "Real-world case studies", "Summer SSD Event 2026"],
  },
];

export const CERTIFICATIONS = [
  { name: "IBM AI Fundamentals", issuer: "IBM", year: "2024" },
  { name: "AWS Cloud Practitioner", issuer: "AWS", year: "2024" },
  { name: "GenAI Certification", issuer: "Google/Credly", year: "2025" },
  { name: "Python for Data Science", issuer: "IBM", year: "2024" },
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
  "Rust for systems programming",
  "Distributed consensus algorithms (Raft, Paxos)",
];
