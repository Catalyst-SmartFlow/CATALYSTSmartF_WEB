'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

export default function FinalCTA() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative py-32 overflow-hidden flex flex-col items-center justify-center min-h-[60vh] bg-black">
            {/* Background Effects with Parallax and CSS Grid */}
            <motion.div 
                style={{ 
                    y,
                    backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px),
                        radial-gradient(circle 500px at 20% 20%, rgba(139,92,246,0.15), transparent),
                        radial-gradient(circle 500px at 80% 80%, rgba(59,130,246,0.15), transparent)
                    `,
                    backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
                }} 
                className="absolute inset-0 z-0 opacity-70"
            />

            {/* Seamless transition gradient at the top */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#000101] to-transparent z-10 pointer-events-none" />
            {/* Seamless transition gradient at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#000000] to-transparent z-10 pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-6 mx-auto text-center">
                
                {/* Main Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
                >
                    Dejar de perder ventas <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                        es una decisión.
                    </span>
                </motion.h2>

                {/* Subheadline sales copy */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12"
                >
                    Tu competencia ya está automatizando sus procesos. 
                    <br className="hidden md:block" />
                    ¿Vas a seguir dependiendo de la "esperanza" o vas a tomar el control?
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <Button 
                        size="lg" 
                        className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 w-full sm:w-auto group"
                    >
                        Agendar Demo Estratégica
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>

                {/* Trust/Social Proof subtle line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="flex flex-col items-center justify-center gap-4 text-zinc-500 text-sm"
                >
                    <p className="uppercase tracking-widest text-xs font-semibold mb-2">Garantía Catalyst</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            <span>ROI demostrable</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            <span>Soporte 24/7 dedicado</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
