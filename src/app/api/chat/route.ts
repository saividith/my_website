import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const SYSTEM_PROMPT = `You are SV-AI, the personal AI assistant for Sai Vidith (Gouribhatla Sai Vidith), a backend and AI engineer based in Hyderabad, India. You are embedded in his portfolio website.

About Sai Vidith:
- Student at Vignana Jyothi Institute of Technology, pursuing B.Tech in Computer Science
- Specializes in Backend Engineering and AI/ML systems
- GitHub: @sai-vidith and @saividith
- Email: saividith396@gmail.com
- Available for internships and opportunities

Key Projects:
1. Smart Brain - AI-powered second brain using RAG architecture (Python, FastAPI, LangChain, Pinecone, PostgreSQL, React)
2. KIRo - Knowledge Intelligence Retrieval system with multi-agent orchestration (Next.js, TypeScript, Python, OpenAI)
3. ProjectRaseed - AI receipt/expense intelligence pipeline with OCR and ML classification (Python, FastAPI, TensorFlow)
4. HealthCare Blockchain - Decentralized health records with smart contracts (Solidity, Web3.js, IPFS, Ethereum)
5. Navaidix - Navigation AI system with geospatial queries (Node.js, PostGIS, Redis, Docker)
6. Ambulance Detection - Real-time emergency vehicle detection at 94.2% mAP50 (Python, YOLOv8, TensorRT)
7. Smart Tourist System - AI-guided tourism platform (React, Node.js, Python, MongoDB, OpenAI)

Skills:
- Languages: Python (expert), TypeScript/JavaScript (advanced), SQL (advanced), Java, Solidity
- AI/ML: LangChain, LangGraph, YOLOv8, TensorFlow, PyTorch, RAG, Prompt Engineering
- Backend: FastAPI, Node.js/Express, REST APIs, Microservices, WebSockets
- Databases: PostgreSQL/PostGIS, MongoDB, Redis, Pinecone (vector DB)
- DevOps: Docker, AWS, GitHub Actions, Linux/Shell
- Frontend: React, Next.js, Tailwind CSS

Experience:
- System Design Club Lead at VJ Institute of Technology
- IBM AI Fundamentals certification
- AWS Cloud Practitioner certification
- GenAI credentials on Credly

System Design Philosophy:
- Design for failure with circuit breakers and graceful degradation
- Cache aggressively, invalidate carefully
- APIs are contracts — version from v1
- Measure then optimize (no premature optimization)

Currently Learning:
- Kubernetes & container orchestration
- LLM fine-tuning & RLHF
- Rust for systems programming
- Distributed consensus algorithms

Be conversational, technically precise, and enthusiastic. When asked about system design or architecture decisions, explain the tradeoffs clearly. Keep responses concise (2-4 paragraphs max). If asked about something outside Sai Vidith's portfolio, politely redirect.`;

// Simple in-memory rate limiter
const requestMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestMap.get(ip);

  if (!record || now > record.resetTime) {
    requestMap.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }

  if (record.count >= 20) return false;
  record.count++;
  return true;
}

// Simple response cache
const responseCache = new Map<string, { response: string; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait a minute." },
        { status: 429 }
      );
    }

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const userMessage = lastMessage?.content || "";

    // Check cache
    const cacheKey = userMessage.toLowerCase().trim().slice(0, 100);
    const cached = responseCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json({ response: cached.response });
    }

    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      // Fallback keyword-based response when no API key
      const response = getFallbackResponse(userMessage);
      return NextResponse.json({ response });
    }

    const groq = new Groq({ apiKey });
    
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: "You are SV-AI. Please introduce yourself briefly." },
        { role: "assistant", content: "I'm SV-AI, Sai Vidith's personal AI assistant. I can tell you about his projects, skills, experience, and system design philosophy. What would you like to know?" },
        ...messages.slice(0, -1).map((m: { role: string; content: string }) => ({
          role: (m.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
          content: m.content,
        })),
        { role: "user", content: userMessage }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_completion_tokens: 1024,
    });

    const response = completion.choices[0]?.message?.content || "No response generated.";

    // Cache the response
    responseCache.set(cacheKey, { response, timestamp: Date.now() });

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("project") || lower.includes("build")) {
    return "Sai Vidith has built 7 major projects including Smart Brain (RAG-powered knowledge system), KIRo (multi-agent knowledge retrieval), ProjectRaseed (AI receipt intelligence), HealthCare Blockchain, Navaidix, Ambulance Detection with YOLOv8 at 94.2% mAP50, and Smart Tourist System. Each features a full system architecture — check the Projects section to explore them in depth!";
  }
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack")) {
    return "Sai Vidith's core stack: Python & FastAPI for backends, LangChain + RAG for AI systems, YOLOv8 for computer vision, PostgreSQL + Redis + Pinecone for data layer, Docker + AWS for infrastructure, and React/Next.js when frontend is needed. The AI/ML side is where he's especially strong.";
  }
  if (lower.includes("contact") || lower.includes("hire") || lower.includes("email") || lower.includes("work")) {
    return "Sai Vidith is actively looking for opportunities! You can reach him at saividith396@gmail.com, or via GitHub (@sai-vidith / @saividith). He's particularly interested in backend engineering and AI systems roles.";
  }
  if (lower.includes("experience") || lower.includes("background")) {
    return "Sai Vidith is pursuing B.Tech in CS at Vignana Jyothi Institute of Technology. He leads the System Design Club on campus, holds IBM AI Fundamentals, AWS Cloud Practitioner, and GenAI certifications. His practical experience comes from building real-world AI and backend systems.";
  }
  if (lower.includes("system design") || lower.includes("architecture") || lower.includes("scale")) {
    return "Sai Vidith's system design philosophy: Design for failure (circuit breakers, graceful degradation), cache aggressively at the right layer (Redis for hot data), treat APIs as contracts (version from v1, never break backwards compatibility), and measure before optimizing — never guess at bottlenecks.";
  }
  if (lower.includes("learn") || lower.includes("current") || lower.includes("now")) {
    return "Right now Sai Vidith is diving into: Kubernetes & container orchestration at scale, LLM fine-tuning & RLHF workflows, Rust for systems programming, and distributed consensus algorithms (Raft, Paxos). Always building at the frontier.";
  }

  return "I'm SV-AI — Sai Vidith's portfolio assistant. Ask me about his **projects** (Smart Brain, KIRo, Ambulance Detection...), **tech stack** (Python, FastAPI, LangChain, YOLOv8...), **system design philosophy**, or how to **contact him**. What would you like to know?";
}
