import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // TODO: wire up Resend or another email provider
    // Add RESEND_API_KEY to .env.local and implement email delivery here
    console.log("Contact form submission:", { name, email, subject });

    return res.status(200).json({ ok: true });
}
