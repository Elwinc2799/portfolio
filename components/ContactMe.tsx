import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { PageInfo } from "@/typings";

type Props = { pageInfo: PageInfo };
type Inputs = { name: string; email: string; subject: string; message: string };

const linkCardVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const linkCardItem = {
    hidden: { opacity: 0, x: 14 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ContactMe({ pageInfo }: Props) {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) { setStatus("success"); reset(); }
            else setStatus("error");
        } catch { setStatus("error"); }
    };

    return (
        <section className="bg-cream-dark border-t border-border-cream">
            <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="mb-10"
                >
                    <div className="section-label mb-3">Contact</div>
                    <h2 className="text-2xl font-bold text-ink tracking-tight">Get in touch</h2>
                    <p className="text-[14px] text-muted mt-2">Based in Malaysia · Open to remote or relocation to Penang / KL</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-12">
                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <input {...register("name", { required: true })} placeholder="Name" className="contact-input" />
                                {errors.name && <span className="font-mono text-[10px] text-accent mt-1 block">Required</span>}
                            </div>
                            <div>
                                <input {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })} placeholder="Email" type="email" className="contact-input" />
                                {errors.email && <span className="font-mono text-[10px] text-accent mt-1 block">Valid email required</span>}
                            </div>
                        </div>
                        <input {...register("subject", { required: true })} placeholder="Subject" className="contact-input" />
                        <textarea {...register("message", { required: true })} placeholder="Message" rows={5} className="contact-input resize-none" />

                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-sm font-mono"
                            >
                                ✓ Message sent! I&apos;ll get back to you soon.
                            </motion.div>
                        ) : status === "error" ? (
                            <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-sm font-mono"
                            >
                                Something went wrong — email me directly at{" "}
                                <a href={`mailto:${pageInfo?.email || "elwinczh@gmail.com"}`} className="underline">
                                    {pageInfo?.email || "elwinczh@gmail.com"}
                                </a>
                            </motion.div>
                        ) : (
                            <button type="submit" disabled={status === "sending"} className="btn-primary self-start">
                                {status === "sending" ? "Sending..." : "Send Message →"}
                            </button>
                        )}
                    </motion.form>

                    {/* Link cards */}
                    <motion.div
                        variants={linkCardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col gap-4"
                    >
                        {[
                            { label: "Email", value: pageInfo?.email || "elwinczh@gmail.com", href: `mailto:${pageInfo?.email || "elwinczh@gmail.com"}` },
                            { label: "GitHub", value: "github.com/Elwinc2799", href: "https://github.com/Elwinc2799" },
                            { label: "LinkedIn", value: "elwin-chiong-3602b5222", href: "https://linkedin.com/in/elwin-chiong-3602b5222/" },
                        ].map((link) => (
                            <motion.a
                                key={link.label}
                                variants={linkCardItem}
                                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                                href={link.href}
                                target={link.label !== "Email" ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="bg-cream border border-border-cream rounded-sm p-4 hover:border-accent/40 transition-colors group"
                            >
                                <div className="section-label mb-1">{link.label}</div>
                                <div className="text-[13px] font-medium text-ink group-hover:text-accent transition-colors">{link.value}</div>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border-cream">
                <div className="max-w-6xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-muted">Elwin Chiong · AI Systems Engineer</span>
                    <span className="font-mono text-[10px] text-muted">{new Date().getFullYear()}</span>
                </div>
            </div>
        </section>
    );
}
