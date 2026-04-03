import React from "react";
import { motion } from "framer-motion";
import { Skill } from "@/typings";

type Props = { skills: Skill[] };

const SKILL_GROUPS: { label: string; keys: string[] }[] = [
    {
        label: "AI & LLM",
        keys: ["Python", "LangChain", "PyTorch", "Streamlit", "Dagster", "Minio", "Dremio", "Apache Iceberg"],
    },
    {
        label: "Cloud & Infra",
        keys: ["Azure", "Docker", "Paramiko", "ServiceNow", "Power Automate", "Copilot Studio"],
    },
    {
        label: "Data",
        keys: ["SQL", "PostgreSQL", "Pandas", "NumPy", "Plotly", "Jupyter Notebook", "NoSQL", "BeautifulSoup"],
    },
    {
        label: "Build",
        keys: ["Next.js", "TypeScript", "Flask", "Node.js", "Flutter", "Git"],
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const groupVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="group"
        >
            <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] font-medium text-ink">{skill.title}</span>
                <span className="font-mono text-[10px] text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                    {skill.progress}%
                </span>
            </div>
            <div className="h-0.5 bg-border-cream rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.04 }}
                    className="h-full bg-accent rounded-full"
                />
            </div>
        </motion.div>
    );
}

export default function Skills({ skills }: Props) {
    const skillMap = new Map(skills.map((s) => [s.title, s]));

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
                    <div className="section-label mb-3">Technical Skills</div>
                    <h2 className="text-2xl font-bold text-ink tracking-tight">
                        Tools I build with
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8"
                >
                    {SKILL_GROUPS.map((group) => (
                        <motion.div key={group.label} variants={groupVariants}>
                            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border-cream">
                                <span className="w-1.5 h-1.5 rounded-sm bg-accent flex-shrink-0" />
                                <span className="section-label">{group.label}</span>
                            </div>
                            <div className="flex flex-col gap-4">
                                {group.keys.map((key, ki) => {
                                    const skill = skillMap.get(key);
                                    if (!skill) {
                                        return (
                                            <motion.div
                                                key={key}
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: ki * 0.04 }}
                                                className="text-[12px] text-muted"
                                            >
                                                {key}
                                            </motion.div>
                                        );
                                    }
                                    return <SkillBar key={key} skill={skill} index={ki} />;
                                })}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
