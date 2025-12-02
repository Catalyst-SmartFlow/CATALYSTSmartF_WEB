"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import {
    Zap,
    BrainCircuit,
    TrendingUp,
    Clock,
    Ghost,
    Briefcase,
    Rocket,
    ShieldCheck,
    Cpu,
    X,
    Check
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Sub-components ---

const CompetitorBlock = ({
    title,
    icon: Icon,
    className,
    style,
    issues
}: {
    title: string;
    icon: any;
    className?: string;
    style?: any;
    issues: string[];
}) => (
    <motion.div
        style={style}
        className={`absolute flex flex-col p-5 rounded-xl bg-[#0F0F0F] border border-red-500/20 backdrop-blur-md shadow-[0_0_30px_rgba(239,68,68,0.05)] ${className} group hover:border-red-500/40 transition-colors duration-500`}
    >
        {/* Warning Header */}
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-red-400" />
                </div>
                <span className="text-gray-200 font-semibold text-base tracking-tight">{title}</span>
            </div>
            <div className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/10 text-red-500 border border-red-500/20 uppercase tracking-wider">
                Inefficient
            </div>
        </div>

        {/* Issues List */}
        <ul className="space-y-2.5">
            {issues.map((issue, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                    <X className="w-3.5 h-3.5 text-red-500/70 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{issue}</span>
                </li>
            ))}
        </ul>

        {/* "System Failure" decorative element */}
        <div className="absolute bottom-3 right-3 flex gap-1 opacity-20">
            <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-red-500" />
            <div className="w-1 h-1 rounded-full bg-red-500" />
        </div>
    </motion.div>
);

const BentoItem = ({
    icon: Icon,
    title,
    desc,
    className,
    mouseX,
    mouseY
}: {
    icon: any;
    title: string;
    desc: string;
    className?: string;
    mouseX: any;
    mouseY: any;
}) => {
    // Parallax effect for icons
    const x = useTransform(mouseX, [-1, 1], [3, -3]);
    const y = useTransform(mouseY, [-1, 1], [3, -3]);

    return (
        <div className={`relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-3 md:p-4 group hover:bg-white/10 transition-colors ${className}`}>
            <motion.div style={{ x, y }} className="mb-2">
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
            </motion.div>
            <h4 className="text-white font-bold text-xs md:text-sm mb-0.5">{title}</h4>
            <p className="text-[10px] md:text-xs text-gray-400 leading-tight">{desc}</p>
        </div>
    );
};

export default function CatalystAdvantage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // --- Scroll Animations (Refined Sequencing) ---
    const springConfig = { stiffness: 80, damping: 20 }; // Softer spring

    // 1. Text Transition (0 - 0.25)
    const textOpacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const textOpacity2 = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
    const textScale = useTransform(scrollYProgress, [0.2, 0.35], [0.9, 1]);

    // 2. Parting Sea (0.15 - 0.45) - Start earlier, move further
    const leftBlockX = useSpring(useTransform(scrollYProgress, [0.15, 0.45], [0, -400]), springConfig);
    const rightBlockX = useSpring(useTransform(scrollYProgress, [0.15, 0.45], [0, 400]), springConfig);
    const topBlockY = useSpring(useTransform(scrollYProgress, [0.15, 0.45], [0, -300]), springConfig);

    const blocksOpacity = useTransform(scrollYProgress, [0.15, 0.4], [1, 0.2]); // Fade out faster
    const blocksBlur = useTransform(scrollYProgress, [0.15, 0.4], ["0px", "8px"]); // More blur

    // 3. Catalyst Emergence (0.35 - 0.7) - Overlap slightly but mostly after parting
    const heroScale = useSpring(useTransform(scrollYProgress, [0.35, 0.65], [0.6, 1]), springConfig);
    const heroOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
    const heroY = useSpring(useTransform(scrollYProgress, [0.35, 0.65], [100, 0]), springConfig);

    // Background dimming for focus
    const bgDim = useTransform(scrollYProgress, [0.3, 0.6], [0, 0.6]);

    // --- Mouse Parallax Logic ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
        const y = (e.clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <section ref={containerRef} className="h-[300vh] relative bg-black">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4">

                {/* Dynamic Header - Relative positioning to avoid overlap */}
                <div className="w-full max-w-[90vw] text-center z-30 mb-4 md:mb-8 relative shrink-0 py-2">
                    <motion.h2
                        style={{ opacity: textOpacity1 }}
                        className="text-2xl md:text-5xl font-bold text-gray-600 absolute w-full left-0 top-0 px-4 leading-tight"
                    >
                        ¿Sigues contratando a la antigua?
                    </motion.h2>
                    <motion.h2
                        style={{ opacity: textOpacity2, scale: textScale }}
                        className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white drop-shadow-[0_0_25px_rgba(168,85,247,0.6)] px-4 leading-tight pb-1"
                    >
                        Evoluciona a una Fuerza Laboral Digital.
                    </motion.h2>
                    {/* Spacer to keep height */}
                    <h2 className="text-2xl md:text-5xl font-bold opacity-0 select-none px-4 leading-tight pb-1">
                        Placeholder Text
                    </h2>
                </div>

                {/* The Stage */}
                <div className="relative w-full max-w-7xl flex items-center justify-center shrink-0">

                    {/* Background Dimmer */}
                    <motion.div
                        style={{ opacity: bgDim }}
                        className="absolute inset-0 bg-black z-0 pointer-events-none"
                    />

                    {/* Competitor Blocks (The Sea) */}
                    <CompetitorBlock
                        title="Freelancers"
                        icon={Ghost}
                        className="w-72 md:w-[26rem] h-auto -rotate-6 z-0 top-[10%] left-[15%] md:left-[13%]"
                        style={{ x: leftBlockX, opacity: blocksOpacity, filter: useMotionTemplate`blur(${blocksBlur})` }}
                        issues={["Disponibilidad intermitente", "Sin garantía de calidad", "Riesgo de abandono"]}
                    />
                    <CompetitorBlock
                        title="Agencias Tradicionales"
                        icon={Clock}
                        className="w-80 md:w-[28rem] h-auto rotate-3 z-0 top-[-5%] right-[0%] md:right-[3%]"
                        style={{ x: rightBlockX, opacity: blocksOpacity, filter: useMotionTemplate`blur(${blocksBlur})` }}
                        issues={["Procesos burocráticos", "Costos inflados (Overhead)", "Tecnología obsoleta"]}
                    />
                    <CompetitorBlock
                        title="Consultoras"
                        icon={Briefcase}
                        className="w-72 md:w-[26rem] h-auto -rotate-3 z-0 bottom-[2%] left-1/2 -translate-x-1/2"
                        style={{ y: topBlockY, opacity: blocksOpacity, filter: useMotionTemplate`blur(${blocksBlur})` }}
                        issues={["Tarifas excesivas", "PowerPoint > Código", "Lentos para ejecutar"]}
                    />

                    {/* Catalyst Hero Card - Compacted & Responsive */}
                    <motion.div
                        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
                        onMouseMove={handleMouseMove}
                        className="relative z-20 w-full max-w-5xl bg-gray-900/90 backdrop-blur-2xl rounded-[20px] md:rounded-[32px] p-1 overflow-hidden group shadow-[0_0_100px_rgba(168,85,247,0.15)]"
                    >
                        {/* Animated Conic Gradient Border */}
                        <div className="absolute inset-0 bg-[conic-gradient(from_var(--angle),#A855F7,#06B6D4,#A855F7)] animate-[spin_4s_linear_infinite] opacity-60" />
                        <div className="absolute inset-[2px] bg-[#0A0A0A] rounded-[18px] md:rounded-[30px] z-0" />

                        {/* Card Content - Reduced padding */}
                        <div className="relative z-10 p-5 md:p-8 h-full flex flex-col md:flex-row gap-6 md:gap-10 items-center">

                            {/* Left: Value Prop */}
                            <div className="flex-1 flex flex-col justify-center space-y-4 md:space-y-5">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 w-fit shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                                    <Rocket className="w-3 h-3 text-cyan-400" />
                                    <span className="text-cyan-400 text-[10px] md:text-xs font-bold tracking-wider">NEXT-GEN WORKFORCE</span>
                                </div>

                                <h3 className="text-2xl md:text-4xl font-bold text-white leading-[1.1]">
                                    Tu equipo de ingeniería, <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">reimaginado por IA.</span>
                                </h3>

                                <div className="space-y-2 md:space-y-3">
                                    <div className="flex items-start">
                                        <Check className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                                            <strong className="text-white">Velocidad Extrema:</strong> Despliega células de desarrollo autónomas en minutos.
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <Check className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                                            <strong className="text-white">Cero Overhead:</strong> Sin reclutamiento, sin onboarding, sin gestión.
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <Check className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                                            <strong className="text-white">Calidad Constante:</strong> Código limpio, documentado y testeado 24/7.
                                        </p>
                                    </div>
                                </div>

                                <Button className="w-fit bg-white text-black hover:bg-gray-200 rounded-full font-bold px-6 py-3 text-sm md:text-base shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all transform hover:scale-105">
                                    Iniciar Transformación
                                </Button>
                            </div>

                            {/* Right: Bento Grid - Reduced row height */}
                            <div className="flex-1 w-full grid grid-cols-2 gap-2 md:gap-3 auto-rows-[80px] md:auto-rows-[100px]">
                                <BentoItem
                                    icon={Zap}
                                    title="Instantáneo"
                                    desc="Despliegue en < 24h"
                                    className="col-span-1"
                                    mouseX={mouseX} mouseY={mouseY}
                                />
                                <BentoItem
                                    icon={BrainCircuit}
                                    title="Autónomo"
                                    desc="Auto-gestión total"
                                    className="col-span-1"
                                    mouseX={mouseX} mouseY={mouseY}
                                />
                                <BentoItem
                                    icon={TrendingUp}
                                    title="Escalabilidad Infinita"
                                    desc="Crece con tu demanda sin fricción"
                                    className="col-span-2 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-purple-500/20"
                                    mouseX={mouseX} mouseY={mouseY}
                                />
                                <BentoItem
                                    icon={ShieldCheck}
                                    title="Seguridad"
                                    desc="Compliance & Privacy"
                                    className="col-span-1"
                                    mouseX={mouseX} mouseY={mouseY}
                                />
                                <BentoItem
                                    icon={Cpu}
                                    title="IA Nativa"
                                    desc="Core Neural v2.0"
                                    className="col-span-1"
                                    mouseX={mouseX} mouseY={mouseY}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
