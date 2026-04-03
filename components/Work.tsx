import React from "react";
import { motion } from "framer-motion";
import { Project } from "@/typings";

type Props = { projects: Project[] };

const AI_TERMS = ["Python", "LangChain", "Dagster", "LLMs", "Streamlit", "PyTorch", "LLM", "AI"];

function isAccentBadge(tech: string) {
    return AI_TERMS.some((t) => tech.toLowerCase().includes(t.toLowerCase()));
}

const PROJECT_STACKS: Record<string, string[]> = {
    "ClickBites": ["Next.js", "TypeScript", "Flask", "Python", "BERT", "MongoDB"],
    "AI Data Platform Pipeline": ["Python", "Dagster", "LLMs", "Azure", "SQL", "Minio"],
    "AI Infrastructure Monitoring": ["Python", "LangChain", "LLMs", "Streamlit", "Azure"],
    "GPU Node Performance Testing": ["Python", "Paramiko", "Threading"],
};

function getStackTags(title: string): string[] {
    for (const key of Object.keys(PROJECT_STACKS)) {
        if (title.includes(key)) return PROJECT_STACKS[key];
    }
    return [];
}

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Work({ projects }: Props) {
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
                    <div className="section-label mb-3">Selected Work</div>
                    <h2 className="text-2xl font-bold text-ink tracking-tight">
                        Production systems, real outcomes
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    {projects.map((project) => {
                        const stackTags = getStackTags(project.title);
                        const isPublic = project.title.toLowerCase().includes("clickbites");

                        return (
                            <motion.div
                                key={project._id}
                                variants={cardVariants}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className="bg-cream border border-border-cream rounded-sm p-5 hover:border-accent/40 transition-colors group flex flex-col"
                            >
                                <div className="font-mono text-[9px] uppercase tracking-wider text-accent mb-2 flex items-center gap-2">
                                    <span>{isPublic ? "Public" : "Production · Internal"}</span>
                                    {isPublic && (
                                        <span className="text-muted">· GitHub</span>
                                    )}
                                </div>

                                <h3 className="text-sm font-bold text-ink mb-2.5 leading-snug group-hover:text-accent transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-[12px] text-muted leading-relaxed mb-4 flex-1">
                                    {project.summary}
                                </p>

                                {stackTags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {stackTags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={isAccentBadge(tag) ? "badge-accent" : "badge"}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {project.linkToBuild && (
                                    <a
                                        href={project.linkToBuild}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-mono text-[10px] text-accent hover:underline mt-auto inline-flex items-center gap-1"
                                    >
                                        ↗ {isPublic ? "View on GitHub" : "View on LinkedIn"}
                                    </a>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
