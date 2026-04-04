import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // If RESEND_API_KEY is not set, log and return success (for testing)
    if (!process.env.RESEND_API_KEY) {
        console.log("Contact form submission (no email sent - RESEND_API_KEY missing):", { name, email, subject });
        return res.status(200).json({ ok: true });
    }

    try {
        await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>", // Update with your verified domain
            to: process.env.CONTACT_EMAIL || "elwinczh@gmail.com",
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h2>New contact form submission</h2>
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
            `,
        });

        return res.status(200).json({ ok: true });
    } catch (error) {
        console.error("Failed to send email:", error);
        return res.status(500).json({ error: "Failed to send email" });
    }
}
