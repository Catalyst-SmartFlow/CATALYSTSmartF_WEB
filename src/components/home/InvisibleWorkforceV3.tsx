"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { Zap, Brain, Rocket, MessageSquare, CalendarCheck, Users } from "lucide-react";

const features = [
    {
        id: 1,
        icon: Zap,
        title: "Captura Inmediata (0.2s)",
        copy: "Mientras tu competencia tarda horas en responder, tu agente de IA ya saludó, calificó al lead y resolvió su duda. A las 3 AM o un domingo.",
        stat: "Status: Online 24/7",
        position: "left",
        color: "from-amber-500 to-orange-500",
        textColor: "text-amber-500",
        visual: "chat_simulation" // Visual cambiado para ser literal
    },
    {
        id: 2,
        icon: Brain,
        title: "Lógica de Negocio Perfecta",
        copy: "No es un chatbot tonto. Es un flujo inteligente que entiende contexto, consulta tu base de datos y agenda en Google Calendar sin errores humanos.",
        stat: "Error Rate: 0%",
        position: "right",
        color: "from-violet-500 to-purple-500",
        textColor: "text-violet-500",
        visual: "logic_flow" // Visual cambiado para mostrar "cerebro/proceso"
    },
    {
        id: 3,
        icon: Rocket,
        title: "Escalabilidad Masiva",
        copy: "¿Lanzaste publicidad y llegaron 500 leads de golpe? Tu sistema atiende a los 500 simultáneamente. Sin colas de espera, sin contratar más personal.",
        stat: "Capacity: Unlimited",
        position: "center",
        color: "from-cyan-500 to-blue-500",
        textColor: "text-cyan-500",
        visual: "multi_task" // Visual cambiado para mostrar volumen
    }
];

function CardVisual({ type }: { type: string }) {
    // 1. SIMULACIÓN DE CHAT (Velocidad)
    // 1. SIMULACIÓN DE CHAT (Velocidad)
    if (type === "chat_simulation") {
        return (
            <div className="h-24 w-full bg-zinc-900/50 rounded-xl overflow-hidden relative flex flex-col justify-center px-4 gap-3 border border-white/5 font-mono text-[10px]">
                {/* Mensaje Cliente (Izquierda) */}
                <motion.div
                    animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, -10] }}
                    transition={{ duration: 4, times: [0, 0.1, 0.9, 1], repeat: Infinity, repeatDelay: 1 }}
                    className="self-start flex items-end gap-2 max-w-[80%]"
                >
                    <div className="w-5 h-5 rounded-full bg-zinc-700 flex-shrink-0" />
                    <div className="bg-zinc-800 text-zinc-300 px-3 py-2 rounded-2xl rounded-bl-sm">
                        Info precios?
                    </div>
                </motion.div>

                {/* Área de Respuesta (Derecha) */}
                <div className="self-end flex flex-col items-end gap-1 max-w-[80%]">
                    {/* Indicador de "Escribiendo..." */}
                    <motion.div
                        animate={{ opacity: [0, 0, 1, 1, 0, 0], scale: [0.9, 0.9, 1, 1, 0.9, 0.9] }}
                        transition={{ duration: 4, times: [0, 0.2, 0.25, 0.35, 0.4, 1], repeat: Infinity, repeatDelay: 1 }}
                        className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-3 py-2 rounded-2xl rounded-br-sm border border-amber-500/20 absolute bottom-3 right-4"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            className="w-1 h-1 rounded-full bg-amber-500"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="w-1 h-1 rounded-full bg-amber-500"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className="w-1 h-1 rounded-full bg-amber-500"
                        />
                    </motion.div>

                    {/* Mensaje Final IA */}
                    <motion.div
                        animate={{ opacity: [0, 0, 0, 0, 1, 1, 0], scale: [0.95, 0.95, 0.95, 0.95, 1, 1, 0.95] }}
                        transition={{ duration: 4, times: [0, 0.4, 0.4, 0.4, 0.45, 0.9, 1], repeat: Infinity, repeatDelay: 1 }}
                        className="flex items-end gap-2"
                    >
                        <div className="bg-amber-500 text-black px-3 py-2 rounded-2xl rounded-br-sm shadow-lg shadow-amber-500/20">
                            <span className="flex items-center gap-2 font-bold">
                                <Zap className="w-3 h-3 text-black fill-black" />
                                ¡Hola! Te envío el catálogo...
                            </span>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-amber-500 flex-shrink-0 flex items-center justify-center">
                            <Zap className="w-3 h-3 text-white" />
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    // 2. SIMULACIÓN DE FLUJO / CALENDARIO (Lógica)
    if (type === "logic_flow") {
        return (
            <div className="h-24 w-full bg-zinc-900/50 rounded-xl overflow-hidden relative flex items-center justify-between px-6 border border-white/5">
                {/* Input (Message) */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], filter: ["grayscale(100%)", "grayscale(0%)", "grayscale(100%)"] }}
                    transition={{ duration: 4, times: [0, 0.1, 1], repeat: Infinity, repeatDelay: 1 }}
                    className="h-10 w-10 index-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center relative z-10"
                >
                    <MessageSquare className="w-5 h-5 text-zinc-400" />
                    {/* Pulse Effect */}
                    <motion.div
                        animate={{ opacity: [0, 0.5, 0], scale: [1, 1.5, 1.5] }}
                        transition={{ duration: 4, times: [0, 0.1, 0.5], repeat: Infinity, repeatDelay: 1 }}
                        className="absolute inset-0 rounded-xl bg-violet-500/30"
                    />
                </motion.div>

                {/* Connection Line */}
                <div className="flex-1 h-[2px] bg-zinc-800 mx-4 relative overflow-hidden rounded-full">
                    {/* Traveling Dot */}
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 4, times: [0.1, 0.4], ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-violet-500 to-transparent blur-[1px]"
                    />
                </div>

                {/* Output (Calendar) */}
                <div className="relative z-10">
                    <motion.div
                        animate={{
                            scale: [1, 1, 1.1, 1],
                            rotate: [0, 0, -5, 5, 0],
                            borderColor: ["rgba(139, 92, 246, 0.2)", "rgba(139, 92, 246, 0.2)", "rgba(139, 92, 246, 1)", "rgba(139, 92, 246, 0.5)"]
                        }}
                        transition={{ duration: 4, times: [0, 0.4, 0.45, 0.55, 1], repeat: Infinity, repeatDelay: 1 }}
                        className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center"
                    >
                        <CalendarCheck className="w-5 h-5 text-violet-400" />
                    </motion.div>

                    {/* Notification Badge */}
                    <motion.div
                        animate={{ scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
                        transition={{ duration: 4, times: [0, 0.45, 0.5, 0.9, 1], repeat: Infinity, repeatDelay: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border border-zinc-900"
                    >
                        <span className="text-[8px] font-bold text-white">1</span>
                    </motion.div>

                    {/* Tooltip Label - Positioned Left to avoid clipping */}
                    <motion.div
                        animate={{ opacity: [0, 0, 1, 1, 0], x: [10, 0, 0, 10] }}
                        transition={{ duration: 4, times: [0, 0.45, 0.5, 0.9, 1], repeat: Infinity, repeatDelay: 1 }}
                        className="absolute top-1/2 -translate-y-1/2 right-[130%] text-[9px] font-bold bg-violet-500 text-white px-2 py-0.5 rounded-full whitespace-nowrap shadow-lg shadow-violet-500/20"
                    >
                        Agendado!
                    </motion.div>
                </div>
            </div>
        );
    }

    // 3. SIMULACIÓN DE MULTITASKING (Escala)
    if (type === "multi_task") {
        return (
            <div className="h-24 w-full bg-zinc-900/50 rounded-xl overflow-hidden relative border border-white/5 flex items-center justify-center p-0">

                {/* SVG System */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        {/* Glow Filter for the beams */}
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="1" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* BACKGROUND TRACKS (Roads) - Lighter color: zinc-700 (#3f3f46) */}
                    <g stroke="#52525b" strokeWidth="2" fill="none" opacity="0.5">
                        {/* Inputs */}
                        <path d="M 0 35 Q 25 35, 48 48" vectorEffect="non-scaling-stroke" />
                        <path d="M 0 65 Q 25 65, 48 52" vectorEffect="non-scaling-stroke" />
                        {/* Outputs */}
                        <path d="M 52 48 Q 75 25, 100 25" vectorEffect="non-scaling-stroke" />
                        <path d="M 52 50 Q 75 40, 100 40" vectorEffect="non-scaling-stroke" />
                        <path d="M 52 50 Q 75 60, 100 60" vectorEffect="non-scaling-stroke" />
                        <path d="M 52 52 Q 75 75, 100 75" vectorEffect="non-scaling-stroke" />
                    </g>

                    {/* ANIMATED BEAMS (Overlay Paths) */}
                    <g stroke="#06b6d4" strokeWidth="2" fill="none" filter="url(#glow)">
                        {/* Input Beams */}
                        <motion.path
                            d="M 0 35 Q 25 35, 48 48"
                            pathLength="1"
                            strokeDasharray="0.3 1"
                            strokeDashoffset="1.3"
                            animate={{ strokeDashoffset: 0 }}
                            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                            vectorEffect="non-scaling-stroke"
                        />
                        <motion.path
                            d="M 0 65 Q 25 65, 48 52"
                            pathLength="1"
                            strokeDasharray="0.3 1"
                            strokeDashoffset="1.3"
                            animate={{ strokeDashoffset: 0 }}
                            transition={{ duration: 1.5, ease: "linear", repeat: Infinity, delay: 0.75 }}
                            vectorEffect="non-scaling-stroke"
                        />

                        {/* Output Beams */}
                        {[
                            { d: "M 52 48 Q 75 25, 100 25", delay: 0 },
                            { d: "M 52 50 Q 75 40, 100 40", delay: 0.15 },
                            { d: "M 52 50 Q 75 60, 100 60", delay: 0.3 },
                            { d: "M 52 52 Q 75 75, 100 75", delay: 0.45 }
                        ].map((path, i) => (
                            <motion.path
                                key={i}
                                d={path.d}
                                pathLength="1"
                                strokeDasharray="0.3 1"
                                strokeDashoffset="1.3"
                                animate={{ strokeDashoffset: 0 }}
                                transition={{ duration: 0.8, ease: "linear", repeat: Infinity, delay: path.delay }}
                                vectorEffect="non-scaling-stroke" // Keeps line width consistent despite non-uniform scaling
                            />
                        ))}
                    </g>
                </svg>

                {/* CENTRAL NODE */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black border border-cyan-500/50 rounded-lg flex items-center justify-center z-10 shadow-[0_0_20px_rgba(6,182,212,0.3)] overflow-hidden">
                    <img
                        src="/catalystLogos/ICONOGRAFIA/SVG/catalystIconografiaFondoNegro_backup.svg"
                        alt="Catalyst Core"
                        className="w-full h-full object-cover scale-[2.5]"
                    />
                </div>

                {/* LABELS */}
                <div className="absolute top-2 left-3 text-[9px] text-zinc-500 font-mono">IN: 2 THREADS</div>
                <div className="absolute bottom-2 right-3 text-[9px] text-cyan-400 font-mono font-bold">OUT: 4X SCALE</div>

            </div>
        );
    }
    return null;
}

function FeatureCard({ feature, scrollYProgress, index }: { feature: any, scrollYProgress: any, index: number }) {
    const isFirst = index === 0;

    const isLast = index === 2; // Hardcoded or features.length - 1

    // Timeline adjustments
    // Shifted earlier to ensure last card appears before scroll ends (1.0)
    // Intro Title: 0.0 - 0.35
    // Cards Start: 0.35
    const baseStart = 0.35;
    const step = 0.25;
    const start = baseStart + (index * step);

    // Duration:
    // Non-last cards exit quickly to avoid overlapping the next one too much.
    // Next card starts at `start + step`. We want this card to fade out shortly after that.
    const fadeOutStart = start + step;
    const fadeOutEnd = start + step + 0.15; // Quick fade out as next one rises

    const end = isLast ? 1 : fadeOutEnd;

    // Opacity Logic
    const opacityRange = isLast
        ? [start, start + 0.1, 0.9, 1] // Last card: Enter -> Hold -> Stay Visible
        : [start, start + 0.1, fadeOutStart, fadeOutEnd]; // Others: Enter -> Hold -> Fade Out early

    const opacityOutput = isLast
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0];

    // Scale Logic
    const scaleRange = isLast
        ? [start, start + 0.1, 1]
        : [start, start + 0.1, fadeOutStart, fadeOutEnd];

    const scaleOutput = isLast
        ? [0.8, 1, 1] // Last card stays full scale (or 1)
        : [0.8, 1, 1, 0.6]; // Others scale down to 0.6 on exit

    // Movement Logic
    // Card 1 (First) -> Enters from RIGHT
    // Cards 2, 3 -> Enter from BOTTOM
    const xInitial = 100;
    // X logic only affects First card's entry. It stays center afterwards.
    const xRange = [start, start + 0.1, end];
    const xOutput = isFirst ? [xInitial, 0, 0] : [0, 0, 0];

    const yInitial = 150;
    // Y Logic:
    // Non-Last: Enter (150) -> Center (0) -> Exit Up (-200)
    // Last: Enter (150) -> Center (0) -> Stay (0)
    const yRange = isLast
        ? [start, start + 0.1, 1]
        : [start, start + 0.1, fadeOutStart, fadeOutEnd];

    const yOutput = isLast
        ? [yInitial, 0, 0]
        : (isFirst ? [0, 0, -200, -200] : [yInitial, 0, -200, -200]); // Ensure arrays match range length (4 items)

    const opacity = useTransform(scrollYProgress, opacityRange, opacityOutput);
    const scale = useTransform(scrollYProgress, scaleRange, scaleOutput);
    const x = useTransform(scrollYProgress, xRange, xOutput);
    const y = useTransform(scrollYProgress, yRange, yOutput);

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
            className={`absolute w-full max-w-xl md:max-w-2xl px-4 ${feature.position === "center" ? "z-20 md:scale-110" : "z-10"}`}
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                style={{
                    rotateX: useTransform(mouseY, [-300, 300], [2, -2]), // Reducido para ser menos mareante
                    rotateY: useTransform(mouseX, [-300, 300], [-2, 2]),
                }}
                className="relative p-[1px] rounded-3xl overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]"
            >
                {/* Borde Gradiente Animado (Opcional, simulado con bg-gradient) */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-30`} />
                <div className="absolute inset-0 bg-zinc-950 rounded-3xl m-[1px]" />

                <div className="relative bg-zinc-950/80 backdrop-blur-md rounded-[23px] p-6 md:p-8 h-full flex flex-col">

                    {/* Mini Header */}
                    <div className="mb-6">
                        <p className={`text-xs md:text-sm font-semibold ${feature.textColor} uppercase tracking-wider mb-3`}>
                            Por qué tu competencia seguirá operando lento y tú no
                        </p>
                        <div className={`w-full h-px bg-gradient-to-r from-transparent via-${feature.textColor.replace('text-', '')}/50 to-transparent opacity-50`} />
                    </div>

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-10 ring-1 ring-white/10 shadow-lg`}>
                            <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color} animate-pulse`} />
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

                    {/* Visual Widget - Ahora es más grande y claro */}
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

    const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

    return (
        // Altura ajustada: 300vh suele ser suficiente para 3 cards, 400vh puede sentirse lento.
        <section ref={containerRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

                {/* Header Section - Intro Animation (Slower & Bigger) */}
                <motion.div
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.15, 0.3, 0.4], [0, 1, 1, 0]), // Ends by 0.4
                        x: useTransform(scrollYProgress, [0, 0.15, 0.3, 0.4], [100, 0, 0, -100]),
                        scale: useTransform(scrollYProgress, [0, 0.15, 0.4], [0.9, 1, 1.1])
                    }}
                    className="absolute z-30 text-center px-4 w-full max-w-[90vw]"
                >
                    <h2 className="text-6xl md:text-9xl font-bold text-white mb-8 tracking-tighter leading-[0.85] uppercase">
                        La ventaja <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 italic pr-4">injusta</span> <br /> de tu negocio
                    </h2>
                    <p className="text-xl md:text-3xl text-zinc-400 font-light max-w-4xl mx-auto tracking-wide">
                        Por qué tu competencia seguirá operando lento y tú no.
                    </p>
                </motion.div>


                {/* Fondo Técnico - Grid sutil */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>

                {/* Línea conectora - Representa el "Cableado" de n8n */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-30 flex justify-center">
                    <svg className="h-full w-px overflow-visible">
                        <motion.path
                            d="M 0 0 V 10000" // Línea vertical larga
                            stroke="url(#gradient-line)"
                            strokeWidth="2"
                            strokeDasharray="10 10"
                            style={{ pathLength }}
                        />
                        <defs>
                            <linearGradient id="gradient-line" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#f59e0b" /> {/* Amber */}
                                <stop offset="50%" stopColor="#8b5cf6" /> {/* Violet */}
                                <stop offset="100%" stopColor="#06b6d4" /> {/* Cyan */}
                            </linearGradient>
                        </defs>
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
                    style={{ opacity: useTransform(scrollYProgress, [0.8, 0.9], [1, 0]) }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-zinc-500 text-[10px] font-mono uppercase tracking-widest"
                >
                    <div className="relative w-[1px] h-12 bg-zinc-800 overflow-hidden">
                        <motion.div
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-white/50"
                        />
                    </div>
                    Ver el sistema en acción
                </motion.div>
            </div>
        </section>
    );
}