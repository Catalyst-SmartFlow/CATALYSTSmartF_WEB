"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SolutionsMenu from "./SolutionsMenu";
import { ChevronDown } from "lucide-react";

export default function Header() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
            setIsSolutionsOpen(false); // Close menu on scroll down
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
                isSolutionsOpen ? "bg-[#050505] border-b border-white/5" : "bg-transparent"
            )}
            onMouseLeave={() => setIsSolutionsOpen(false)}
        >
            <div className="flex items-center justify-between px-6 py-4 relative z-50">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-tighter text-white">Catalyst.</span>
                </div>

                <motion.div
                    variants={{
                        visible: { y: 0, opacity: 1 },
                        hidden: { y: -20, opacity: 0, pointerEvents: "none" },
                    }}
                    animate={hidden ? "hidden" : "visible"}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="flex items-center gap-8"
                >
                    <nav className="hidden md:flex items-center gap-8">
                        <div
                            className="relative h-full flex items-center"
                            onMouseEnter={() => setIsSolutionsOpen(true)}
                        >
                            <Link
                                href="#"
                                className={cn(
                                    "text-sm font-medium transition-colors py-4 flex items-center gap-1",
                                    isSolutionsOpen ? "text-white" : "text-zinc-400 hover:text-white"
                                )}
                            >
                                Soluciones
                                <ChevronDown
                                    size={14}
                                    className={cn(
                                        "transition-transform duration-200",
                                        isSolutionsOpen ? "rotate-180" : "rotate-0"
                                    )}
                                />
                            </Link>
                        </div>
                        <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Precios
                        </Link>
                        <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Recursos
                        </Link>
                        <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Ayuda
                        </Link>
                        <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Ingresar
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6">
                            Agendar demo
                        </Button>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {isSolutionsOpen && (
                    <div
                        onMouseEnter={() => setIsSolutionsOpen(true)}
                        onMouseLeave={() => setIsSolutionsOpen(false)}
                    >
                        <SolutionsMenu />
                    </div>
                )}
            </AnimatePresence>
        </header>
    );
}
