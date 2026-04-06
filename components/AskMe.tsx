import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SUGGESTIONS = [
    "What's your strongest skill?",
    "What have you shipped at AMD?",
    "What are you looking for next?",
];

export default function AskMe() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [asked, setAsked] = useState(false);
    const abortRef = useRef<AbortController | null>(null);

    async function ask(q: string) {
        if (!q.trim() || loading) return;

        // Cancel any in-flight request
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setAsked(true);
        setAnswer("");
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: q }),
                signal: controller.signal,
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setError(
                    res.status === 429
                        ? "Rate limit reached — try again later."
                        : data.error || "Something went wrong."
                );
                return;
            }

            const reader = res.body?.getReader();
            const decoder = new TextDecoder();
            if (!reader) return;

            let buffer = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });

                const lines = buffer.split("\n");
                buffer = lines.pop() ?? "";

                for (const line of lines) {
                    if (!line.startsWith("data: ")) continue;
                    const payload = line.slice(6);
                    if (payload === "[DONE]") break;
                    try {
                        const parsed = JSON.parse(payload);
                        if (parsed.error) {
                            setError(parsed.error);
                        } else if (parsed.text) {
                            setAnswer((prev) => prev + parsed.text);
                        }
                    } catch {
                        // ignore malformed chunks
                    }
                }
            }
        } catch (err: unknown) {
            if (err instanceof Error && err.name !== "AbortError") {
                setError("Network error. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        ask(question);
    }

    function handleChip(chip: string) {
        setQuestion(chip);
        ask(chip);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full max-w-md"
        >
            {/* Suggestion chips */}
            <AnimatePresence>
                {!asked && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-wrap gap-2 mb-3"
                    >
                        {SUGGESTIONS.map((chip) => (
                            <button
                                key={chip}
                                onClick={() => handleChip(chip)}
                                className="font-mono text-[10px] px-2.5 py-1 border border-border-cream bg-cream-dark text-muted rounded-sm hover:border-accent/50 hover:text-accent transition-colors"
                            >
                                {chip}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Input row */}
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask me anything…"
                    maxLength={500}
                    className="flex-1 bg-cream-dark border border-border-cream px-3 py-2 text-[12px] text-ink placeholder-muted outline-none focus:border-accent/60 transition-colors rounded-sm font-mono"
                />
                <button
                    type="submit"
                    disabled={!question.trim() || loading}
                    className="btn-primary py-2 px-3 text-[11px] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="inline-flex gap-0.5">
                            <span className="animate-bounce" style={{ animationDelay: "0ms" }}>·</span>
                            <span className="animate-bounce" style={{ animationDelay: "150ms" }}>·</span>
                            <span className="animate-bounce" style={{ animationDelay: "300ms" }}>·</span>
                        </span>
                    ) : (
                        "Ask ↗"
                    )}
                </button>
            </form>

            {/* Answer / error */}
            <AnimatePresence>
                {(answer || error) && (
                    <motion.div
                        key="response"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 bg-cream-dark border border-border-cream rounded-sm px-3 py-2.5"
                    >
                        {error ? (
                            <p className="text-[11px] text-red-400 font-mono">{error}</p>
                        ) : (
                            <p className="text-[12px] text-ink leading-relaxed">
                                {answer}
                                {loading && (
                                    <span className="inline-block w-1.5 h-3.5 bg-accent ml-0.5 align-middle animate-pulse" />
                                )}
                            </p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
