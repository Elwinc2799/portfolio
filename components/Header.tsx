import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Social } from "@/typings";

type Props = { socials: Social[] };

const NAV_LINKS = [
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];

export default function Header({ socials }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border-cream"
            >
                <div className="max-w-6xl mx-auto px-6 md:px-10 h-[60px] flex items-center justify-between">
                    <Link
                        href="#hero"
                        className="flex items-center gap-1.5 font-mono text-sm font-bold text-ink hover:text-accent transition-colors"
                    >
                        <span className="inline-block w-2 h-2 rounded-sm bg-accent" />
                        EC
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="font-mono text-[11px] text-muted uppercase tracking-widest hover:text-ink transition-colors"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    <Link href="#contact" className="btn-primary hidden md:inline-flex">
                        Get in touch
                    </Link>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.22 }}
                            className="block w-5 h-px bg-ink origin-center"
                        />
                        <motion.span
                            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.15 }}
                            className="block w-5 h-px bg-ink"
                        />
                        <motion.span
                            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.22 }}
                            className="block w-5 h-px bg-ink origin-center"
                        />
                    </button>
                </div>
            </motion.header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-ink/20 md:hidden"
                            onClick={() => setOpen(false)}
                        />
                        <motion.nav
                            key="drawer"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 320, damping: 32 }}
                            className="fixed top-[60px] right-0 bottom-0 z-40 w-64 bg-cream border-l border-border-cream flex flex-col px-6 py-8 gap-6 md:hidden"
                        >
                            {NAV_LINKS.map((l, i) => (
                                <motion.div
                                    key={l.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06 + 0.05 }}
                                >
                                    <Link
                                        href={l.href}
                                        onClick={() => setOpen(false)}
                                        className="font-mono text-[13px] text-muted uppercase tracking-widest hover:text-ink transition-colors block"
                                    >
                                        {l.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: NAV_LINKS.length * 0.06 + 0.05 }}
                                className="mt-auto"
                            >
                                <Link
                                    href="#contact"
                                    onClick={() => setOpen(false)}
                                    className="btn-primary w-full justify-center"
                                >
                                    Get in touch
                                </Link>
                            </motion.div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
