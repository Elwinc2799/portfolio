import React from "react";
import { motion } from "framer-motion";
import { Experience } from "@/typings";

type Props = { experiences: Experience[] };

function formatDate(dateStr: string | undefined): string {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const rowVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function WorkExperience({ experiences }: Props) {
    const sorted = [...(experiences || [])].sort((a, b) => {
        if (a.isCurrentWorkingHere) return -1;
        if (b.isCurrentWorkingHere) return 1;
        return new Date(b.dateStarted).getTime() - new Date(a.dateStarted).getTime();
    });

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
                    <div className="section-label mb-3">Experience</div>
                    <h2 className="text-2xl font-bold text-ink tracking-tight">Where I&apos;ve worked</h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="flex flex-col gap-0"
                >
                    {sorted.map((exp) => (
                        <motion.div
                            key={exp._id}
                            variants={rowVariants}
                            className="grid grid-cols-1 md:grid-cols-[180px_1fr] border-b border-border-cream last:border-b-0"
                        >
                            {/* Date column */}
                            <div className="pt-5 pb-0 md:py-6 md:pr-8 md:border-r border-border-cream flex flex-row md:flex-col gap-3 md:gap-1">
                                <div className="font-mono text-[10px] text-muted uppercase tracking-wider">
                                    {formatDate(exp.dateStarted)} —{" "}
                                    {exp.isCurrentWorkingHere ? (
                                        <span className="text-accent font-semibold">Present</span>
                                    ) : (
                                        formatDate(exp.dateEnded)
                                    )}
                                </div>
                                {exp.isCurrentWorkingHere && (
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                                        <span className="font-mono text-[9px] text-green-600 uppercase tracking-wider whitespace-nowrap">Current</span>
                                    </div>
                                )}
                            </div>

                            {/* Content column */}
                            <div className="py-5 md:py-6 md:pl-8 flex flex-col gap-3">
                                <div>
                                    <h3 className="text-[15px] font-bold text-ink">{exp.jobTitle}</h3>
                                    <div className="text-[12px] text-muted mt-0.5">{exp.company}</div>
                                </div>
                                {exp.points && exp.points.length > 0 && (
                                    <ul className="flex flex-col gap-1.5">
                                        {exp.points.slice(0, 4).map((point, pi) => (
                                            <li key={pi} className="flex items-start gap-2.5 text-[12px] text-muted leading-relaxed">
                                                <span className="text-accent mt-1.5 flex-shrink-0 text-[8px]">▸</span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
