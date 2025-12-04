"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SolutionsMenu, { industries, needs, platformLinks } from "./SolutionsMenu";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

export default function Header() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);

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
                isSolutionsOpen || isMobileMenuOpen ? "bg-[#050505] border-b border-white/5" : "bg-transparent"
            )}
            onMouseLeave={() => setIsSolutionsOpen(false)}
        >
            <div className="flex items-center justify-between px-6 py-4 relative z-50">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-tighter text-white">Catalyst.</span>
                </div>

                {/* Desktop Navigation */}
                <motion.div
                    variants={{
                        visible: { y: 0, opacity: 1 },
                        hidden: { y: -20, opacity: 0, pointerEvents: "none" },
                    }}
                    animate={hidden ? "hidden" : "visible"}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="hidden md:flex items-center gap-8"
                >
                    <nav className="flex items-center gap-8">
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

                {/* Mobile Hamburger Menu */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white p-2 focus:outline-none"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden fixed inset-0 top-[72px] bg-[#050505] z-40 flex flex-col p-6 border-t border-white/5"
                    >
                        <div className="flex flex-col h-full">
                            <nav className="flex flex-col gap-6">
                                <div>
                                    <button
                                        onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                                        className="flex items-center justify-between w-full text-lg font-medium text-zinc-400 hover:text-white transition-colors group"
                                    >
                                        <span>Soluciones</span>
                                        <ChevronDown
                                            size={16}
                                            className={cn(
                                                "transition-transform duration-200",
                                                isMobileSolutionsOpen ? "rotate-180" : "rotate-0"
                                            )}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {isMobileSolutionsOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-4 pl-4 flex flex-col gap-6">
                                                    {/* Por Industria */}
                                                    <div className="space-y-3">
                                                        <h3 className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">
                                                            Por Industria
                                                        </h3>
                                                        <div className="flex flex-col gap-3">
                                                            {industries.map((item, index) => (
                                                                <Link
                                                                    key={index}
                                                                    href={item.href}
                                                                    className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors"
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                >
                                                                    <item.icon size={18} />
                                                                    <span className="text-sm">{item.title}</span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Por Necesidad */}
                                                    <div className="space-y-3">
                                                        <h3 className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">
                                                            Por Necesidad
                                                        </h3>
                                                        <div className="flex flex-col gap-3">
                                                            {needs.map((item, index) => (
                                                                <Link
                                                                    key={index}
                                                                    href={item.href}
                                                                    className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors"
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                >
                                                                    <item.icon size={18} />
                                                                    <span className="text-sm">{item.title}</span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Additional Links */}
                                                    <div className="space-y-3 pt-2 border-t border-white/5">
                                                        {platformLinks.map((link, index) => (
                                                            <Link
                                                                key={index}
                                                                href={link.href}
                                                                className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors"
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                            >
                                                                <link.icon size={18} />
                                                                <span className="text-sm">{link.title}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <Link href="#" className="text-lg font-medium text-zinc-400 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    Precios
                                </Link>
                                <Link href="#" className="text-lg font-medium text-zinc-400 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    Recursos
                                </Link>
                                <Link href="#" className="text-lg font-medium text-zinc-400 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    Ayuda
                                </Link>
                                <Link href="#" className="text-lg font-medium text-zinc-400 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    Ingresar
                                </Link>
                            </nav>

                            <div className="mt-auto flex flex-col gap-6">
                                <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full w-full h-12 text-base" onClick={() => setIsMobileMenuOpen(false)}>
                                    Agendar demo
                                </Button>

                                <div className="border-t border-white/10 pt-6">
                                    <button className="flex items-center justify-between w-full text-zinc-400 hover:text-white transition-colors group">
                                        <span className="text-base font-medium">Idioma</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-zinc-500 group-hover:text-zinc-400">Español</span>
                                            <ChevronRight size={16} />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isSolutionsOpen && !isMobileMenuOpen && (
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
