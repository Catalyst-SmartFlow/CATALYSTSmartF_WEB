"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function SalesProblem() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth physics-based spring for scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Animaciones sincronizadas con el scroll
    const titleOpacity = useTransform(smoothProgress, [0, 0.2, 0.3], [0, 1, 0]);
    const titleScale = useTransform(smoothProgress, [0, 0.3], [0.9, 1.1]);
    const titleBlur = useTransform(smoothProgress, [0, 0.2, 0.3], ["10px", "0px", "10px"]);

    // Segunda sección (Copy)
    const copyOpacity = useTransform(smoothProgress, [0.3, 0.5, 0.8], [0, 1, 1]);
    const copyY = useTransform(smoothProgress, [0.3, 0.5], [50, 0]);
    const problemScale = useTransform(smoothProgress, [0.5, 0.7], [1, 1.2]);

    // Background changes based on scroll
    const bgGradient = useTransform(
        smoothProgress,
        [0.4, 0.6, 1],
        [
            "radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0) 0%, rgba(0,0,0,1) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.15) 0%, rgba(0,0,0,1) 80%)",
            "radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0) 0%, rgba(0,0,0,1) 100%)"
        ]
    );

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-black">
            <motion.div
                className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
                style={{ background: bgGradient }}
            >
                {/* Stage 1: The Hook */}
                <motion.div
                    style={{ opacity: titleOpacity, scale: titleScale, filter: `blur(${titleBlur})` }}
                    className="absolute px-4 text-center z-10"
                >
                    <h2 className="text-6xl font-bold tracking-tighter text-white md:text-9xl">
                        ¿TU NEGOCIO
                        <br />
                        <span className="text-zinc-600">DUERME?</span>
                    </h2>
                </motion.div>

                {/* Stage 2: The Pain */}
                <motion.div
                    style={{ opacity: copyOpacity, y: copyY }}
                    className="absolute max-w-5xl px-6 text-center z-20"
                >
                    <p className="text-3xl font-medium leading-tight text-zinc-300 md:text-6xl md:leading-[1.1]">
                        Tus clientes no.
                        <br />
                        <span className="mt-8 block text-2xl font-light text-zinc-400 md:text-4xl">
                            Ignorar leads y responder tarde es el veneno silencioso que está drenando tu crecimiento.
                        </span>
                    </p>

                    <div className="mt-16 flex flex-col items-center gap-4">
                        <span className="text-xl uppercase tracking-widest text-red-500/80">Impacto Mensual</span>
                        <motion.div
                            style={{ scale: problemScale }}
                            className="relative"
                        >
                            <span className="block text-8xl font-black tracking-tighter text-white md:text-[12rem] leading-none">
                                -30%
                            </span>
                            <div className="absolute inset-0 -z-10 animate-pulse bg-red-600/20 blur-[100px]" />
                        </motion.div>
                        <p className="text-xl text-zinc-500 md:text-2xl">de facturación perdida</p>
                    </div>
                </motion.div>

                {/* Ambient Particles/Noise Overlay could go here */}

                {/* Fade to Black Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-30 pointer-events-none" />
            </motion.div>
        </section>
    );
}
