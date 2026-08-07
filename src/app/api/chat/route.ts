import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import {
  PERSONAL_INFO,
  PROJECTS,
  MORE_PROJECTS,
  RESEARCH,
  SKILLS,
  WORK_EXPERIENCE,
  EDUCATION,
  LEADERSHIP,
  CERTIFICATIONS,
  SYSTEM_PHILOSOPHY,
  CURRENTLY_LEARNING,
} from "@/lib/constants";

const SYSTEM_PROMPT = `You are SV-AI, the personal AI assistant for Sai Vidith (Gouribhatla Sai Vidith), an AI/ML and backend engineer based in ${PERSONAL_INFO.location}. You are embedded in his portfolio website.

About Sai Vidith:
- Student at ${EDUCATION.institution}, pursuing ${EDUCATION.degree} (${EDUCATION.period}, CGPA ${EDUCATION.cgpa})
- Specializes in AI/ML systems and backend engineering
- GitHub: @sai-vidith and @saividith
- Email: ${PERSONAL_INFO.email}
- Available for internships and opportunities

Work Experience:
${WORK_EXPERIENCE.map((w) => `- ${w.title}, ${w.organization} (${w.period}): ${w.description}`).join("\n")}

Key Projects:
${PROJECTS.map((p, i) => `${i + 1}. ${p.title} - ${p.tagline} (${p.stack.join(", ")})`).join("\n")}

Also built: ${MORE_PROJECTS.map((p) => p.title).join(", ")}.

Research:
${RESEARCH.map((r) => `- ${r.title} (${r.venue}): ${r.description}`).join("\n")}

Skills:
${SKILLS.map((s) => `- ${s.category}: ${s.items.join(", ")}`).join("\n")}

Leadership & Achievements:
${LEADERSHIP.map((l) => `- ${l.title}${l.organization ? `, ${l.organization}` : ""}: ${l.description}`).join("\n")}

Certifications: ${CERTIFICATIONS.map((c) => `${c.name} (${c.issuer})`).join(", ")}

System Design Philosophy:
${SYSTEM_PHILOSOPHY.map((p) => `- ${p.title}: ${p.description}`).join("\n")}

Currently Learning:
${CURRENTLY_LEARNING.map((c) => `- ${c}`).join("\n")}

Be conversational, technically precise, and enthusiastic. When asked about system design or architecture decisions, explain the tradeoffs clearly. Keep responses concise (2-4 paragraphs max). Only state facts given above — do not invent metrics, dates, or projects. If asked about something outside Sai Vidith's portfolio, politely redirect.`;

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
    return `Sai Vidith's core projects: ${PROJECTS.map((p) => p.title).join(", ")}. He also built ${MORE_PROJECTS.map((p) => p.title).join(" and ")}, and has a research paper on ${RESEARCH[0].title} (${RESEARCH[0].venue}). Check the Projects section to explore each one in depth!`;
  }
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack")) {
    return `Sai Vidith's core stack: ${SKILLS.map((s) => s.items.slice(0, 2).join("/")).join(", ")}, across ${SKILLS.map((s) => s.category).join(", ")}. The AI/ML and backend side is where he's especially strong.`;
  }
  if (lower.includes("contact") || lower.includes("hire") || lower.includes("email")) {
    return `Sai Vidith is actively looking for opportunities! You can reach him at ${PERSONAL_INFO.email}, or via GitHub (@sai-vidith / @saividith). He's particularly interested in AI/ML and backend engineering roles.`;
  }
  if (lower.includes("experience") || lower.includes("intern") || lower.includes("background") || lower.includes("work")) {
    return `Sai Vidith is pursuing ${EDUCATION.degree} at ${EDUCATION.institution} (CGPA ${EDUCATION.cgpa}). He interned as ${WORK_EXPERIENCE[0].title} at ${WORK_EXPERIENCE[0].organization} (${WORK_EXPERIENCE[0].period}) and as ${WORK_EXPERIENCE[1].title} at ${WORK_EXPERIENCE[1].organization} (${WORK_EXPERIENCE[1].period}), plus leads ${LEADERSHIP[0].organization} as ${LEADERSHIP[0].title}.`;
  }
  if (lower.includes("system design") || lower.includes("architecture") || lower.includes("scale")) {
    return "Sai Vidith's system design philosophy: Design for failure (circuit breakers, graceful degradation), cache aggressively at the right layer (Redis for hot data), treat APIs as contracts (version from v1, never break backwards compatibility), and measure before optimizing — never guess at bottlenecks.";
  }
  if (lower.includes("learn") || lower.includes("current") || lower.includes("now")) {
    return `Right now Sai Vidith is diving into: ${CURRENTLY_LEARNING.join("; ")}. Always building at the frontier.`;
  }

  return `I'm SV-AI — Sai Vidith's portfolio assistant. Ask me about his **projects** (${PROJECTS.slice(0, 2).map((p) => p.title).join(", ")}...), **tech stack**, **experience**, or how to **contact him**. What would you like to know?`;
}
