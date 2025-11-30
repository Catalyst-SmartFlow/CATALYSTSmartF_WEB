"use client";

import { motion, AnimatePresence } from "framer-motion";
import Scene from "./Scene";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const words = ["Resultados", "Eficiencia", "Innovación", "Futuro"];

export default function Hero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <Scene />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black z-0 pointer-events-none" />

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay">
                <svg className="h-full w-full">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Main Content */}
            <div className="z-10 flex flex-col items-center text-center px-4 max-w-6xl mx-auto w-full">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default"
                >
                    <Sparkles className="h-4 w-4 text-violet-400" />
                    <span className="font-medium tracking-wide">La evolución de tu negocio</span>
                </motion.div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.1] mb-8 drop-shadow-2xl">
                    Automatiza para <br className="hidden md:block" />
                    <span className="inline-flex flex-wrap justify-center gap-x-3 md:gap-x-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                            obtener
                        </span>
                        <span className="relative inline-block min-w-[280px] md:min-w-[420px] text-left">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={words[index]}
                                    initial={{ y: 40, opacity: 0, rotateX: -90 }}
                                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                    exit={{ y: -40, opacity: 0, rotateX: 90 }}
                                    transition={{ duration: 0.5, ease: "backOut" }}
                                    className="absolute left-0 top-0 text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-white filter drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                                >
                                    {words[index]}
                                </motion.span>
                            </AnimatePresence>
                            <span className="invisible opacity-0" aria-hidden="true">Innovación</span>
                        </span>
                    </span>
                </h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="max-w-2xl text-lg md:text-xl text-zinc-400 leading-relaxed mb-10"
                >
                    Transformamos operaciones manuales en sistemas autónomos de alto rendimiento.
                    <span className="text-zinc-200 block mt-1">Tu competencia ya está automatizando. ¿Y tú?</span>
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                    <Button
                        size="lg"
                        className="relative h-16 px-10 text-lg bg-black hover:bg-zinc-900 text-white rounded-full font-bold transition-all hover:scale-[1.02] active:scale-[0.98] border border-white/10 w-full sm:w-auto overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center">
                            Comienza Ahora <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Button>
                </motion.div>

                {/* Trust Signals */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-20 pt-10 border-t border-white/5 w-full max-w-4xl"
                >
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mb-6 font-medium">Potenciando empresas innovadoras</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholders for logos - using text for now but styled like logos */}
                        <span className="text-lg font-bold text-white/40 flex items-center gap-2"><div className="w-4 h-4 bg-white/40 rounded-full" /> ACME Corp</span>
                        <span className="text-lg font-bold text-white/40 flex items-center gap-2"><div className="w-4 h-4 bg-white/40 rounded-sm" /> Globex</span>
                        <span className="text-lg font-bold text-white/40 flex items-center gap-2"><div className="w-4 h-4 bg-white/40 rotate-45" /> Soylent</span>
                        <span className="text-lg font-bold text-white/40 flex items-center gap-2"><div className="w-4 h-4 bg-white/40 rounded-tr-lg" /> Initech</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
