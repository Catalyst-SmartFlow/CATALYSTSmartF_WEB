"use client";

import { m, AnimatePresence, useMotionValue } from "framer-motion";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), { ssr: false });
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect, useRef, MouseEvent } from "react";

const words = ["Resultados", "Eficiencia", "Innovación", "Futuro"];

function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.02); // Further reduced magnetic strength
        y.set(middleY * 0.03);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <m.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </m.div>
    );
}

export default function Hero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-20 group"
        >
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
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default"
                >
                    <Sparkles className="h-4 w-4 text-violet-400" />
                    <span className="font-medium tracking-wide">La evolución de tu negocio</span>
                </m.div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.1] mb-8 drop-shadow-2xl">
                    Automatiza para <br className="hidden md:block" />
                    <span className="inline-flex flex-wrap justify-center gap-x-3 md:gap-x-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                            obtener
                        </span>
                        <span className="relative inline-block min-w-[280px] md:min-w-[420px] text-left">
                            <AnimatePresence mode="wait">
                                <m.span
                                    key={words[index]}
                                    initial={{ y: 40, opacity: 0, rotateX: -90 }}
                                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                    exit={{ y: -40, opacity: 0, rotateX: 90 }}
                                    transition={{ duration: 0.5, ease: "backOut" }}
                                    className="absolute left-0 top-0 text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-white filter drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                                >
                                    {words[index]}
                                </m.span>
                            </AnimatePresence>
                            <span className="invisible opacity-0" aria-hidden="true">Innovación</span>
                        </span>
                    </span>
                </h1>

                {/* Subheadline */}
                <m.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="max-w-2xl text-lg md:text-xl text-zinc-400 leading-relaxed mb-10"
                >
                    Transformamos operaciones manuales en sistemas autónomos de alto rendimiento.
                    <span className="text-zinc-200 block mt-1">Tu competencia ya está automatizando. ¿Y tú?</span>
                </m.p>

                {/* CTA Button */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 relative"
                >
                    <MagneticButton>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                            <Button
                                size="lg"
                                className="relative h-16 px-10 text-lg bg-black hover:bg-zinc-900 text-white rounded-full font-bold transition-all border border-white/10 w-full sm:w-auto overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center">
                                    Comienza Ahora <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </Button>
                        </div>
                    </MagneticButton>
                </m.div>



            </div>

            {/* Scroll Indicator */}
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 pointer-events-none"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-medium">Scroll</span>
                <div className="w-[1px] h-12 bg-zinc-800/50 relative overflow-hidden">
                    <m.div
                        animate={{ top: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute w-full h-full bg-gradient-to-b from-transparent via-violet-500 to-transparent"
                    />
                </div>
            </m.div>
        </section>
    );
}
