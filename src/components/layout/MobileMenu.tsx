"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { industries, needs, platformLinks } from "./menuData";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden fixed inset-0 top-[72px] bg-[#050505] z-40 flex flex-col p-6 border-t border-white/5 overflow-y-auto"
                >
                    <div className="flex flex-col min-h-full">
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
                                            <div className="pt-6 flex flex-col gap-8">
                                                {/* Plataforma */}
                                                <div className="space-y-4">
                                                    <h3 className="text-xs font-semibold text-zinc-500 tracking-widest uppercase pl-1">
                                                        Plataforma
                                                    </h3>
                                                    <div className="grid gap-2">
                                                        {platformLinks.map((link, index) => (
                                                            <Link
                                                                key={index}
                                                                href={link.href}
                                                                className="flex items-center gap-3 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                                                                onClick={onClose}
                                                            >
                                                                <link.icon size={20} className="text-zinc-500" />
                                                                <span className="text-sm font-medium">{link.title}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Por Industria */}
                                                <div className="space-y-4">
                                                    <h3 className="text-xs font-semibold text-zinc-500 tracking-widest uppercase pl-1">
                                                        Por Industria
                                                    </h3>
                                                    <div className="grid gap-4">
                                                        {industries.map((item, index) => (
                                                            <Link
                                                                key={index}
                                                                href={item.href}
                                                                className="group flex items-start gap-4"
                                                                onClick={onClose}
                                                            >
                                                                <div className={cn(
                                                                    "p-2.5 rounded-xl shrink-0 transition-colors",
                                                                    item.bgColor,
                                                                    item.iconColor
                                                                )}>
                                                                    <item.icon size={20} />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                                                                        {item.title}
                                                                    </span>
                                                                    <p className="text-xs text-zinc-500 leading-relaxed">
                                                                        {item.description}
                                                                    </p>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Por Necesidad */}
                                                <div className="space-y-4">
                                                    <h3 className="text-xs font-semibold text-zinc-500 tracking-widest uppercase pl-1">
                                                        Por Necesidad
                                                    </h3>
                                                    <div className="grid gap-4">
                                                        {needs.map((item, index) => (
                                                            <Link
                                                                key={index}
                                                                href={item.href}
                                                                className="group flex items-start gap-4"
                                                                onClick={onClose}
                                                            >
                                                                <div className={cn(
                                                                    "p-2.5 rounded-xl shrink-0 transition-colors",
                                                                    item.bgColor,
                                                                    item.iconColor
                                                                )}>
                                                                    <item.icon size={20} />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                                                                        {item.title}
                                                                    </span>
                                                                    <p className="text-xs text-zinc-500 leading-relaxed">
                                                                        {item.description}
                                                                    </p>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link href="#" className="text-lg font-medium text-zinc-400 hover:text-white transition-colors" onClick={onClose}>
                                Precios
                            </Link>
                            <Link href="#" className="text-lg font-medium text-zinc-400 hover:text-white transition-colors" onClick={onClose}>
                                Recursos
                            </Link>
                            <Link href="#" className="text-lg font-medium text-zinc-400 hover:text-white transition-colors" onClick={onClose}>
                                Ayuda
                            </Link>
                            <Link href="/auth/login" className="text-lg font-medium text-zinc-400 hover:text-white transition-colors" onClick={onClose}>
                                Ingresar
                            </Link>
                        </nav>

                        <div className="mt-auto flex flex-col gap-6 pt-6">
                            <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full w-full h-12 text-base" onClick={onClose}>
                                Agendar demo
                            </Button>

                            <div className="border-t border-white/10 pt-6 pb-6">
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
    );
}
