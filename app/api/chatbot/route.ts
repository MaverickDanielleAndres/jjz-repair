import { NextRequest, NextResponse } from "next/server";
import {
  CHATBOT_SYSTEM_PROMPT,
  MESSENGER_URL,
  PHONE_DISPLAY,
} from "@/components/landing/site-data";

type ChatMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

type IncomingBody = {
  messages?: { role: "user" | "assistant" | "model"; content: string }[];
};

// Per-IP in-memory rate limit
const buckets = new Map<string, { tokens: number; ts: number }>();
const LIMIT_PER_MIN = 20;

function takeToken(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip) ?? { tokens: LIMIT_PER_MIN, ts: now };
  const elapsedMin = (now - b.ts) / 60_000;
  const refilled = Math.min(
    LIMIT_PER_MIN,
    b.tokens + elapsedMin * LIMIT_PER_MIN,
  );
  if (refilled < 1) {
    buckets.set(ip, { tokens: refilled, ts: now });
    return false;
  }
  buckets.set(ip, { tokens: refilled - 1, ts: now });
  return true;
}

const FALLBACK_REPLY =
  "Our assistant is taking a quick break — please message us on Messenger or call " +
  PHONE_DISPLAY +
  " and we'll help you right away.";

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "local";

  if (!takeToken(ip)) {
    return NextResponse.json(
      {
        reply:
          "You're sending a lot of messages — please slow down a bit, or reach us on Messenger.",
      },
      { status: 429 },
    );
  }

  let body: IncomingBody;
  try {
    body = (await req.json()) as IncomingBody;
  } catch {
    return NextResponse.json(
      { reply: "Invalid request." },
      { status: 400 },
    );
  }

  const raw = (body.messages ?? [])
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant" || m.role === "model") &&
        typeof m.content === "string",
    )
    .map<ChatMessage>((m) => ({
      role: m.role === "assistant" ? "model" : (m.role as "user" | "model"),
      parts: [{ text: m.content }],
    }));

  if (raw.length === 0) {
    return NextResponse.json({
      reply:
        "Hi! I'm the JJZ Assistant. Ask me about screen replacement, iCloud unlock, prices, hours, or where to find us.",
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: FALLBACK_REPLY, mode: "fallback" });
  }

  // Try newer model names first, fall back to older ones. The "latest" aliases
  // are the most resilient across API versions and account types.
  const CANDIDATE_MODELS = [
    "gemini-flash-latest",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash",
  ];

  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(apiKey);

    let lastError: unknown = null;
    for (const modelName of CANDIDATE_MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: CHATBOT_SYSTEM_PROMPT,
        });

        const chat = model.startChat({
          history: raw.slice(0, -1),
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.6,
          },
        });

        const last = raw[raw.length - 1];
        const result = await chat.sendMessage(last.parts[0].text);
        const reply =
          result.response.text()?.trim() ||
          `Sorry, I couldn't come up with an answer. For a real person, message us on Messenger (${MESSENGER_URL}) or call ${PHONE_DISPLAY}.`;

        return NextResponse.json({ reply, mode: "gemini", model: modelName });
      } catch (err) {
        lastError = err;
        // Try the next model.
        continue;
      }
    }

    throw lastError ?? new Error("No Gemini model worked");
  } catch (err) {
    console.error("[chatbot] Gemini error", err);
    return NextResponse.json({ reply: FALLBACK_REPLY, mode: "error" });
  }
}
