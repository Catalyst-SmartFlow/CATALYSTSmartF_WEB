"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Header() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-300 bg-transparent"
            )}
        >
            <div className="flex items-center gap-2 z-50">
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
                    <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        Soluciones
                    </Link>
                    <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        Misión
                    </Link>
                    <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        Visión
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/10">
                        Ingresar
                    </Button>
                    <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6">
                        Empezar
                    </Button>
                </div>
            </motion.div>
        </header>
    );
}
