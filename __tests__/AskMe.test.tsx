import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AskMe from "@/components/AskMe";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

function makeStream(chunks: string[]) {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        start(controller) {
            for (const chunk of chunks) {
                controller.enqueue(encoder.encode(chunk));
            }
            controller.close();
        },
    });
    return stream;
}

beforeEach(() => {
    vi.clearAllMocks();
});

describe("AskMe", () => {
    it("renders suggestion chips and input on initial render", () => {
        render(<AskMe />);
        expect(screen.getByPlaceholderText("Ask me anything…")).toBeInTheDocument();
        expect(screen.getByText("What's your strongest skill?")).toBeInTheDocument();
        expect(screen.getByText("What have you shipped at AMD?")).toBeInTheDocument();
        expect(screen.getByText("What are you looking for next?")).toBeInTheDocument();
    });

    it("streams response text when question is submitted", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            body: makeStream([
                'data: {"text":"Hello"}\n\n',
                'data: {"text":" world"}\n\n',
                "data: [DONE]\n\n",
            ]),
        });

        render(<AskMe />);
        const input = screen.getByPlaceholderText("Ask me anything…");
        fireEvent.change(input, { target: { value: "What do you do?" } });
        fireEvent.submit(input.closest("form")!);

        await waitFor(() => {
            expect(screen.getByText(/Hello world/)).toBeInTheDocument();
        });
    });

    it("shows rate limit error when API returns 429", async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 429,
            json: async () => ({ error: "Rate limit exceeded" }),
        });

        render(<AskMe />);
        const input = screen.getByPlaceholderText("Ask me anything…");
        fireEvent.change(input, { target: { value: "Hello" } });
        fireEvent.submit(input.closest("form")!);

        await waitFor(() => {
            expect(screen.getByText("Rate limit reached — try again later.")).toBeInTheDocument();
        });
    });

    it("clicking a chip fires the question without needing submit", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            body: makeStream(['data: {"text":"Strong at AI"}\n\n', "data: [DONE]\n\n"]),
        });

        render(<AskMe />);
        fireEvent.click(screen.getByText("What's your strongest skill?"));

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(
                "/api/ask",
                expect.objectContaining({
                    method: "POST",
                    body: JSON.stringify({ question: "What's your strongest skill?" }),
                })
            );
        });
    });

    it("hides suggestion chips after first ask", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            body: makeStream(["data: [DONE]\n\n"]),
        });

        render(<AskMe />);
        const input = screen.getByPlaceholderText("Ask me anything…");
        fireEvent.change(input, { target: { value: "test" } });
        fireEvent.submit(input.closest("form")!);

        await waitFor(() => {
            expect(screen.queryByText("What's your strongest skill?")).not.toBeInTheDocument();
        });
    });
});
