import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { PageInfo, Project } from "@/typings";

type Props = { pageInfo: PageInfo; projects: Project[] };

const STATS = [
    { value: 90, suffix: "%", label: "Faster GPU Testing", sub: "Paramiko · AMD" },
    { value: 30, suffix: "%", label: "Less SLA Time", sub: "Automation · AMD" },
    { value: 90, suffix: "%", label: "Faster SQL", sub: "Optimization · Dell" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const count = useMotionValue(0);

    useEffect(() => {
        if (!inView) return;
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) {
            count.set(target);
            return;
        }
        const controls = animate(count, target, { duration: 1.4, ease: "easeOut" });
        return controls.stop;
    }, [inView, target, count]);

    return (
        <span ref={ref} className="tabular-nums">
            <motion.span>{useTransform(count, (v) => Math.round(v))}</motion.span>
            <span className="text-accent text-xl sm:text-2xl font-bold">{suffix}</span>
        </span>
    );
}

const heroVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Hero({ pageInfo, projects }: Props) {
    const previewProjects = projects.slice(0, 3);

    return (
        <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] min-h-[calc(100vh-60px)] gap-0">

                {/* Left column */}
                <motion.div
                    variants={heroVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col justify-between py-12 lg:py-16 lg:border-r lg:border-border-cream lg:pr-16"
                >
                    <div>
                        <motion.div
                            variants={fadeUp}
                            className="flex items-center gap-2.5 mb-6 md:mb-7"
                        >
                            <span className="w-5 h-px bg-accent" />
                            <span className="section-label text-accent">AI Systems Engineer</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            className="text-[60px] sm:text-[72px] md:text-[80px] lg:text-[88px] font-black leading-[0.92] tracking-[-0.04em] text-ink mb-7 md:mb-8"
                        >
                            {pageInfo?.name?.split(" ").slice(0, 1).join(" ") || "Elwin"}
                            <br />
                            Chi
                            <span className="text-accent">o</span>
                            ng
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="text-base text-muted leading-relaxed max-w-md mb-8 md:mb-10"
                        >
                            Building{" "}
                            <strong className="text-ink font-semibold">AI pipelines</strong>,{" "}
                            <strong className="text-ink font-semibold">LLM tools</strong>, and{" "}
                            <strong className="text-ink font-semibold">cloud infrastructure</strong>{" "}
                            that ship to production and scale.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            className="flex flex-wrap gap-3"
                        >
                            <Link href="#work" className="btn-primary">
                                View Work ↗
                            </Link>
                            <a
                                href="https://github.com/Elwinc2799"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ghost"
                            >
                                GitHub
                            </a>
                            <a
                                href="https://linkedin.com/in/elwin-chiong-3602b5222/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ghost"
                            >
                                LinkedIn
                            </a>
                        </motion.div>
                    </div>

                    {/* Stats row */}
                    <motion.div
                        variants={fadeUp}
                        className="border-t border-border-cream grid grid-cols-3 mt-10"
                    >
                        {STATS.map((stat, i) => (
                            <div
                                key={stat.label}
                                className={`pt-5 pb-2 ${i < 2 ? "border-r border-border-cream pr-3 sm:pr-6" : ""} ${i > 0 ? "pl-3 sm:pl-6" : ""}`}
                            >
                                <div className="font-mono text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-ink leading-none mb-1.5">
                                    <CountUp target={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-[9px] sm:text-[10px] text-muted uppercase tracking-widest font-semibold leading-snug">
                                    {stat.label}
                                </div>
                                <div className="font-mono text-[9px] text-muted/60 mt-0.5 hidden sm:block">
                                    {stat.sub}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right column — project preview */}
                <div className="hidden lg:flex flex-col py-12 pl-10 gap-3">
                    <div className="section-label mb-1">Selected Work</div>

                    {previewProjects.map((project, i) => (
                        <motion.a
                            key={project._id}
                            href={project.linkToBuild || "#work"}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                            whileHover={{ y: -3, transition: { duration: 0.2 } }}
                            className="block bg-cream border border-border-cream p-4 rounded-sm hover:border-accent/40 transition-colors group"
                        >
                            <div className="font-mono text-[9px] text-accent uppercase tracking-wider mb-1.5">
                                Production · Internal
                            </div>
                            <div className="text-[12px] font-semibold text-ink mb-2 group-hover:text-accent transition-colors leading-snug">
                                {project.title}
                            </div>
                            <div className="text-[11px] text-muted leading-relaxed line-clamp-2 mb-2.5">
                                {project.summary}
                            </div>
                            <div className="font-mono text-[10px] text-accent">
                                ↗ View project
                            </div>
                        </motion.a>
                    ))}

                    {/* Availability strip */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.75 }}
                        className="mt-1 bg-cream-darker border border-border-cream rounded-sm px-3 py-2.5 flex items-center gap-2"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                        <span className="font-semibold text-ink text-[10px]">Open to roles</span>
                        <span className="font-mono text-[9px] text-muted">· Google · Meta · OpenAI · Anthropic</span>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
