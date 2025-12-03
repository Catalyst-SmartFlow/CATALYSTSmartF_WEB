"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const SalesTeamHeadline = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Mantenemos el elemento visible (1) durante el primer 40% del scroll
    // Luego desvanecemos (0) del 40% al 80%
    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0.9]);
    const blur = useTransform(scrollYProgress, [0, 0.4, 0.8], ["blur(0px)", "blur(0px)", "blur(10px)"]);

    return (
        <section ref={containerRef} className="relative h-[150vh]">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="max-w-5xl mx-auto text-center px-4">
                    <motion.div style={{ opacity, scale, filter: blur }}>
                        <motion.div
                            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-6">
                                Tu equipo de ventas de IA <br />
                                <motion.span
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 bg-[length:200%_auto]"
                                    animate={{ backgroundPosition: "200% center" }}
                                    transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                                >
                                    disponible 24/7.
                                </motion.span>
                            </h2>
                            <p className="text-zinc-400 text-lg md:text-xl font-medium">
                                Escala tus operaciones sin aumentar tu nómina.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
