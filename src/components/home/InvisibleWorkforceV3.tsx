"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import { Zap, Brain, Rocket, CheckCircle2, BarChart3, Clock } from "lucide-react";

const features = [
    {
        id: 1,
        icon: Zap,
        title: "Velocidad Inhumana",
        copy: "El 'te respondo mañana' mata ventas. Tu agente captura al cliente en 0.2 segundos, a las 3 AM o en domingo. Si hay interés, hay respuesta.",
        stat: "Time to response: <1s",
        position: "left",
        color: "from-amber-500 to-orange-500",
        visual: "speed"
    },
    {
        id: 2,
        icon: Brain,
        title: "Ejecución Perfecta",
        copy: "Los humanos tienen días malos; la IA no. Sin olvidos, sin faltas de ortografía y sin dejar a nadie en 'visto'. Cada chat es tu mejor pitch de ventas replicado.",
        stat: "Consistency: 100%",
        position: "right",
        color: "from-violet-500 to-purple-500",
        visual: "quality"
    },
    {
        id: 3,
        icon: Rocket,
        title: "Escalabilidad Infinita",
        copy: "¿Lanzaste una promo y llegaron 1,000 mensajes? Tu sistema los atiende a todos simultáneamente. Escala tu facturación sin inflar tu nómina ni tu estrés.",
        stat: "Capacity: Unlimited",
        position: "center",
        color: "from-cyan-500 to-blue-500",
        visual: "scale"
    }
];

function CardVisual({ type }: { type: string }) {
    if (type === "speed") {
        return (
            <div className="h-16 w-full bg-black/20 rounded-xl overflow-hidden relative flex items-center px-4 border border-white/5">
                <div className="absolute inset-0 bg-amber-500/10 animate-pulse" />
                <div className="flex items-center gap-3 w-full">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 1 }}
                            className="h-full bg-amber-500"
                        />
                    </div>
                    <span className="text-xs font-mono text-amber-500">0.2s</span>
                </div>
            </div>
        );
    }
    if (type === "quality") {
        return (
            <div className="h-16 w-full bg-black/20 rounded-xl overflow-hidden relative flex items-center justify-center gap-2 border border-white/5">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.2, repeat: Infinity, repeatDelay: 2 }}
                        className="flex items-center gap-1 bg-violet-500/20 px-2 py-1 rounded-lg border border-violet-500/30"
                    >
                        <CheckCircle2 className="w-3 h-3 text-violet-400" />
                        <div className="w-8 h-1 bg-violet-400/50 rounded-full" />
                    </motion.div>
                ))}
            </div>
        );
    }
    if (type === "scale") {
        return (
            <div className="h-16 w-full bg-black/20 rounded-xl overflow-hidden relative flex items-end justify-between px-4 pb-2 border border-white/5">
                {[20, 40, 60, 80, 100].map((h, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: "10%" }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 2 }}
                        className="w-1/6 bg-cyan-500/50 rounded-t-sm"
                    />
                ))}
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-cyan-400 font-mono">
                    <BarChart3 className="w-3 h-3" /> +999%
                </div>
            </div>
        );
    }
    return null;
}

function FeatureCard({ feature, scrollYProgress, index }: { feature: any, scrollYProgress: any, index: number }) {
    const start = index * 0.25;
    const end = start + 0.35;

    const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.8, 1, 1, 0.8]);
    const y = useTransform(scrollYProgress, [start, end], [50, -50]);

    const xInitial = feature.position === "left" ? -50 : feature.position === "right" ? 50 : 0;
    const x = useTransform(scrollYProgress, [start, start + 0.1, end], [xInitial, 0, 0]);

    // Mouse tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - left) - width / 2);
        mouseY.set((clientY - top) - height / 2);
    }

    return (
        <motion.div
            style={{ opacity, scale, x, y, perspective: 1000 }}
            className={`absolute w-full max-w-lg ${feature.position === "center" ? "z-20 md:scale-110" : "z-10"}`}
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                style={{
                    rotateX: useTransform(mouseY, [-300, 300], [5, -5]),
                    rotateY: useTransform(mouseX, [-300, 300], [-5, 5]),
                }}
                className="relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent backdrop-blur-xl overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]"
            >
                {/* Inner Card */}
                <div className="relative bg-zinc-950/90 rounded-[22px] p-6 md:p-8 border border-white/5 h-full">

                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-10 ring-1 ring-white/10 shadow-lg`}>
                            <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                            {feature.stat}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                            {feature.title}
                        </h3>
                        <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                            {feature.copy}
                        </p>
                    </div>

                    {/* Visual Widget */}
                    <div className="mt-8 pt-6 border-t border-white/5">
                        <CardVisual type={feature.visual} />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function InvisibleWorkforceV3() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Connecting Line Path
    const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-4">

                {/* Dynamic Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
                    <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
                </div>

                {/* Connecting Line (SVG) */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                    <svg className="w-full h-full">
                        <motion.path
                            d="M 50% 0 V 100%"
                            stroke="white"
                            strokeWidth="2"
                            strokeDasharray="10 10"
                            style={{ pathLength }}
                        />
                    </svg>
                </div>

                {/* Cards Container */}
                <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={feature.id}
                            feature={feature}
                            index={index}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0.9, 1], [1, 0]) }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-widest"
                >
                    <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-zinc-500 to-transparent" />
                    Scroll para descubrir
                </motion.div>
            </div>
        </section>
    );
}
