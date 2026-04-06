import type { NextApiRequest, NextApiResponse } from "next";
import Anthropic from "@anthropic-ai/sdk";

const foundryResource = process.env.ANTHROPIC_FOUNDRY_RESOURCE ?? "az-coding-llms-resource";

// Base URL: SDK appends /v1/messages → full path is /anthropic/v1/messages
// Auth: SDK sends x-api-key header by default (Anthropic standard, works with Azure Foundry)
const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_FOUNDRY_API_KEY ?? "",
    baseURL: `https://${foundryResource}.services.ai.azure.com/anthropic/`,
});

// In-memory rate limit store: IP -> list of request timestamps
const rateLimitStore = new Map<string, number[]>();

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 60 * 1000; // 15 hours

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const timestamps = (rateLimitStore.get(ip) ?? []).filter(
        (t) => now - t < RATE_LIMIT_WINDOW_MS
    );
    if (timestamps.length >= RATE_LIMIT_MAX) return true;
    rateLimitStore.set(ip, [...timestamps, now]);
    return false;
}

const SYSTEM_PROMPT = `You are an AI assistant on Elwin Chiong's portfolio site. Elwin is an AI Systems Engineer with experience building AI pipelines, LLM tools, and cloud infrastructure. He has worked at AMD and Dell on GPU testing automation and SQL optimization. Answer questions about his background, skills, projects, and experience concisely. Keep answers under 2 sentences.`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const ip =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        "unknown";

    if (isRateLimited(ip)) {
        return res.status(429).json({ error: "Rate limit exceeded. Try again later." });
    }

    const { question } = req.body;
    if (!question || typeof question !== "string" || question.trim().length === 0) {
        return res.status(400).json({ error: "Missing question" });
    }

    if (question.length > 500) {
        return res.status(400).json({ error: "Question too long" });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    try {
        const stream = client.messages.stream({
            model: process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL ?? "claude-haiku-4-5",
            max_tokens: 120,
            system: SYSTEM_PROMPT,
            messages: [{ role: "user", content: question.trim() }],
        });

        for await (const event of stream) {
            if (
                event.type === "content_block_delta" &&
                event.delta.type === "text_delta"
            ) {
                res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
            }
        }

        res.write("data: [DONE]\n\n");
        res.end();
    } catch (err) {
        console.error("Anthropic stream error:", err);
        res.write(`data: ${JSON.stringify({ error: "Failed to get response" })}\n\n`);
        res.end();
    }
}
