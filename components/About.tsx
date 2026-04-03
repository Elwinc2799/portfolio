import React from "react";
import { motion } from "framer-motion";
import { PageInfo } from "@/typings";

type Props = { pageInfo: PageInfo };

const CERTS = [
    { name: "Microsoft AZ-900", issuer: "Microsoft", date: "Dec 2024", abbr: "AZ", color: "#0078D4" },
];

const EDUCATION = [
    {
        degree: "BSc Computer Science",
        focus: "Intelligent Computing / Data Analytics",
        school: "Universiti Sains Malaysia",
        period: "2019 – 2023",
        note: "CGPA 3.75 · Dean's List",
    },
];

const sideVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const slideRight = {
    hidden: { opacity: 0, x: 16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function About({ pageInfo }: Props) {
    return (
        <section className="border-t border-border-cream">
            <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="mb-10"
                >
                    <div className="section-label mb-3">About</div>
                    <h2 className="text-2xl font-bold text-ink tracking-tight">Background</h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-12">
                    {/* Bio */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-[15px] text-muted leading-relaxed max-w-2xl mb-8">
                            {pageInfo?.backgroundInformation ||
                                "AI Systems Engineer with 2+ years of experience building production AI solutions, cloud infrastructure, and data pipelines. Proficient in Python, LangChain, Azure, and LLM tooling."}
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                            <div className="bg-cream-dark border border-border-cream px-4 py-3 rounded-sm">
                                <div className="section-label mb-1">Location</div>
                                <div className="text-[13px] text-ink font-medium">Penang, Malaysia</div>
                                <div className="font-mono text-[10px] text-muted mt-0.5">Open to remote · Penang · KL</div>
                            </div>
                            <div className="bg-cream-dark border border-border-cream px-4 py-3 rounded-sm">
                                <div className="section-label mb-1">Contact</div>
                                <div className="text-[13px] text-ink font-medium">{pageInfo?.email || "elwinczh@gmail.com"}</div>
                                <div className="font-mono text-[10px] text-muted mt-0.5">{pageInfo?.phoneNumber || "+601139022271"}</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Certs + Education */}
                    <motion.div
                        variants={sideVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col gap-6"
                    >
                        <motion.div variants={slideRight}>
                            <div className="section-label mb-4">Certifications</div>
                            {CERTS.map((cert) => (
                                <div key={cert.name} className="bg-cream border border-border-cream rounded-sm p-4 flex items-start gap-3">
                                    <div
                                        className="w-8 h-8 rounded-sm flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                                        style={{ background: cert.color }}
                                    >
                                        {cert.abbr}
                                    </div>
                                    <div>
                                        <div className="text-[13px] font-semibold text-ink">{cert.name}</div>
                                        <div className="font-mono text-[10px] text-muted mt-0.5">{cert.issuer} · {cert.date}</div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div variants={slideRight}>
                            <div className="section-label mb-4">Education</div>
                            {EDUCATION.map((edu) => (
                                <div key={edu.degree} className="bg-cream border border-border-cream rounded-sm p-4">
                                    <div className="text-[13px] font-semibold text-ink">{edu.degree}</div>
                                    <div className="text-[11px] text-accent mt-0.5">{edu.focus}</div>
                                    <div className="text-[12px] text-muted mt-1">{edu.school}</div>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="font-mono text-[10px] text-muted">{edu.period}</span>
                                        <span className="font-mono text-[10px] text-ink font-semibold">{edu.note}</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
