"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { MessageCircle, Zap, CalendarClock, CheckCircle2, User, ArrowRight, Bot, Sparkles, Command } from "lucide-react";
import { cn } from "@/lib/utils";

// --- VISUAL COMPONENTS ---

const VisualCX = ({ isActive }: { isActive: boolean }) => (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
        {/* Abstract Background Elements */}
        <motion.div
            animate={{
                scale: isActive ? [1, 1.2, 1] : 0.8,
                opacity: isActive ? 0.5 : 0.2
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-violet-500/20 blur-[80px] rounded-full"
        />

        <div className="relative w-full max-w-[340px] flex flex-col gap-4">
            {/* User Message */}
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="self-start max-w-[85%] relative group"
            >
                <div className="absolute -left-10 top-0 w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="bg-zinc-900 border border-white/10 p-4 rounded-2xl rounded-tl-none text-sm text-zinc-300 shadow-lg">
                    <p>Hola, ¿tienen planes para clínicas?</p>
                </div>
            </motion.div>

            {/* AI Typing Indicator */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="self-end flex gap-1 bg-violet-600/20 px-3 py-2 rounded-xl rounded-tr-none mb-1 ml-auto"
            >
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
            </motion.div>

            {/* Bot Response */}
            <motion.div
                initial={{ x: 20, opacity: 0, scale: 0.95 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
                className="self-end max-w-[90%] relative"
            >
                <div className="absolute -right-10 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-5 rounded-2xl rounded-tr-none shadow-xl shadow-violet-900/20 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-sm font-medium leading-relaxed">
                            ¡Sí! <span className="font-bold text-white bg-white/20 px-1 rounded">Catalyst Agenda AI</span> es ideal para clínicas.
                        </p>
                        <p className="text-sm mt-2 text-violet-100/90">¿Quieres ver cómo funciona?</p>

                        <div className="mt-4 flex gap-2">
                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-violet-700 rounded-lg text-xs font-bold shadow-lg hover:shadow-xl transition-shadow">
                                <Zap className="w-3 h-3 fill-current" />
                                Ver Demo
                            </button>
                            <button className="px-3 py-1.5 bg-violet-800/50 text-white rounded-lg text-xs font-medium hover:bg-violet-800/70 transition-colors">
                                Precios
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
);

const VisualOps = ({ isActive }: { isActive: boolean }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-8 opacity-10 pointer-events-none">
            {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="w-0.5 h-0.5 bg-cyan-400 rounded-full" />
            ))}
        </div>

        {/* Central Flow */}
        <div className="relative z-10 flex flex-col items-center gap-8 w-64">
            {/* Step 1: Stripe */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700 p-3 rounded-xl flex items-center gap-3 relative z-20"
            >
                <div className="w-10 h-10 bg-[#635BFF] rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <span className="font-bold text-white text-sm">S</span>
                </div>
                <div>
                    <h4 className="text-xs font-bold text-white">Stripe Payment</h4>
                    <p className="text-[10px] text-zinc-400">+$120.00 USD</p>
                </div>
                <div className="ml-auto w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            </motion.div>

            {/* Connection Line 1 */}
            <div className="h-8 w-0.5 bg-zinc-700 relative overflow-hidden">
                <motion.div
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                />
            </div>

            {/* Step 2: Catalyst Core */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full bg-zinc-900/90 backdrop-blur-md border border-cyan-500/50 p-4 rounded-xl flex items-center gap-4 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative z-20"
            >
                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <Zap className="w-5 h-5 text-white fill-current" />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-cyan-400">Processing</span>
                        <span className="text-[10px] bg-cyan-950 text-cyan-400 px-1.5 rounded">12ms</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                            className="h-full bg-cyan-400"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Connection Line 2 */}
            <div className="h-8 w-0.5 bg-zinc-700 relative overflow-hidden">
                <motion.div
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
                    className="absolute inset-0 w-full h-1/2 bg-gradient-to-b from-transparent via-pink-400 to-transparent"
                />
            </div>

            {/* Step 3: Slack */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="w-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700 p-3 rounded-xl flex items-center gap-3 relative z-20"
            >
                <div className="w-10 h-10 bg-[#4A154B] rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/20">
                    <span className="font-bold text-white text-xs">Slack</span>
                </div>
                <div>
                    <h4 className="text-xs font-bold text-white">#ventas</h4>
                    <p className="text-[10px] text-zinc-400">Notificación enviada</p>
                </div>
                <CheckCircle2 className="ml-auto w-4 h-4 text-green-500" />
            </motion.div>
        </div>
    </div>
);

const VisualAgenda = ({ isActive }: { isActive: boolean }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-[320px] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Calendar Header */}
            <div className="bg-zinc-800/50 p-4 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <CalendarClock className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-zinc-200">Octubre 2024</span>
                </div>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/40" />
                    <div className="w-2 h-2 rounded-full bg-amber-500/40" />
                    <div className="w-2 h-2 rounded-full bg-green-500/40" />
                </div>
            </div>

            {/* Calendar Rows */}
            <div className="p-4 space-y-2">
                {[
                    { time: "09:00", text: "Daily Standup", color: "border-l-zinc-600", bg: "bg-zinc-800/50", opacity: "opacity-40" },
                    { time: "10:30", text: "Dr. Paredes - Demo", color: "border-l-emerald-500", bg: "bg-emerald-500/10", active: true },
                    { time: "12:00", text: "Almuerzo Equipo", color: "border-l-blue-500", bg: "bg-blue-500/10", opacity: "opacity-40" },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={item.active ? { scale: 0.95, opacity: 0 } : false}
                        animate={item.active ? { scale: 1, opacity: 1 } : false}
                        transition={{ delay: 0.5 }}
                        className={cn(
                            "flex items-center gap-3 p-3 rounded-lg border-l-2 transition-all",
                            item.color,
                            item.bg,
                            item.opacity
                        )}
                    >
                        <span className="text-xs font-mono text-zinc-400">{item.time}</span>
                        <div className="flex-1">
                            <p className="text-xs font-medium text-zinc-200">{item.text}</p>
                            {item.active && (
                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold">
                                        <CheckCircle2 className="w-3 h-3" />
                                        Confirmado
                                    </span>
                                    <span className="text-[10px] text-zinc-500">Google Meet</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Glow */}
            <div className="h-1 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
        </div>
    </div>
);

// --- MAIN COMPONENT ---

const content = [
    {
        id: "cx",
        icon: MessageCircle,
        title: "Catalyst CX",
        subtitle: "Tu fuerza de ventas digital.",
        description: "No es solo un chatbot. Es un asistente 'Neural' en Web y WhatsApp que califica leads y responde dudas 24/7. Captura clientes antes de que abandonen tu página.",
        colorProps: {
            gradient: "from-violet-500 to-indigo-500",
            text: "text-violet-400",
            glow: "bg-violet-500",
            border: "border-violet-500/20",
            bg: "bg-[#0B0418]" // Deep Violet
        },
        Visual: VisualCX
    },
    {
        id: "ops",
        icon: Zap,
        title: "Catalyst Ops",
        subtitle: "La magia invisible.",
        description: "Orquestación de procesos. Detectamos la factura de tu sistema (SRI/ERP) y la enviamos automáticamente al correo del cliente y a tu equipo en Slack. Cero tareas manuales.",
        colorProps: {
            gradient: "from-cyan-500 to-blue-500",
            text: "text-cyan-400",
            glow: "bg-cyan-500",
            border: "border-cyan-500/20",
            bg: "bg-[#040F18]" // Deep Blue/Cyan
        },
        Visual: VisualOps
    },
    {
        id: "agenda",
        icon: CalendarClock,
        title: "Agenda AI",
        subtitle: "Elimina el ausentismo.",
        description: "Ideal para clínicas y servicios. Un bot que califica pacientes, responde preguntas frecuentes y agenda directo en Google Calendar.",
        colorProps: {
            gradient: "from-emerald-500 to-green-500",
            text: "text-emerald-400",
            glow: "bg-emerald-500",
            border: "border-emerald-500/20",
            bg: "bg-[#021008]" // Deep Emerald
        },
        Visual: VisualAgenda
    }
];

export default function StickyScrollFeatures() {
    const [activeCard, setActiveCard] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll(".scroll-section");
            const triggerPoint = window.innerHeight * 0.4;

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
                    setActiveCard(index);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section ref={containerRef} className="hidden md:block relative min-h-screen py-20 transition-colors duration-1000">
            {/* Full Width Background Color Layer */}
            <motion.div
                animate={{ backgroundColor: content[activeCard] ? content[activeCard].colorProps.bg.replace("bg-[", "").replace("]", "") : "#000000" }}
                className="absolute inset-0 z-0 ease-in-out duration-1000"
                style={{ backgroundColor: "#000" }} // Fallback
            >
                <div className="absolute inset-0 bg-black/60 z-10" /> {/* Slight dim overlay to ensure content pop */}
            </motion.div>

            <div className="max-w-[1400px] mx-auto px-8 flex gap-20 relative z-20">

                {/* LEFT COLUMN: SCROLLABLE CONTENT */}
                <div className="w-1/2 relative z-10 py-[10vh]">
                    {content.map((item, index) => (
                        <div
                            key={item.id}
                            className={cn(
                                "scroll-section min-h-[80vh] flex flex-col justify-center transition-opacity duration-500",
                                activeCard === index ? "opacity-100" : "opacity-30 blur-[2px]"
                            )}
                        >
                            <div className="mb-8 p-4 w-fit rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
                                <item.icon className={cn("w-8 h-8", item.colorProps.text)} />
                            </div>

                            <h2 className="text-6xl font-bold text-white tracking-tighter mb-6 relative">
                                {item.title}
                                {activeCard === index && (
                                    <motion.span
                                        layoutId="title-underline"
                                        className={cn("absolute -bottom-2 left-0 h-1 rounded-full w-24", item.colorProps.gradient.replace("from-", "bg-"))}
                                    />
                                )}
                            </h2>

                            <h3 className={cn("text-3xl font-medium mb-6 bg-clip-text text-transparent bg-gradient-to-r", item.colorProps.gradient)}>
                                {item.subtitle}
                            </h3>

                            <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
                                {item.description}
                            </p>

                            {activeCard === index && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="mt-8 flex items-center gap-2 text-white font-medium cursor-pointer group"
                                >
                                    <span>Conocer más</span>
                                    <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                {/* RIGHT COLUMN: STICKY VISUALS */}
                <div className="w-1/2 h-screen sticky top-0 flex items-center justify-center">
                    <div
                        className={cn(
                            "relative w-full max-w-[550px] aspect-square rounded-[3rem] bg-zinc-900/50 overflow-hidden backdrop-blur-3xl transition-all duration-700",
                            "border shadow-2xl",
                            content[activeCard].colorProps.border,
                            `shadow-${content[activeCard].colorProps.text.split('-')[1]}-500/20`
                        )}
                        style={{
                            boxShadow: activeCard === 0
                                ? "0 25px 50px -12px rgba(139, 92, 246, 0.25)"
                                : activeCard === 1
                                    ? "0 25px 50px -12px rgba(6, 182, 212, 0.25)"
                                    : "0 25px 50px -12px rgba(16, 185, 129, 0.25)"
                        }}
                    >
                        {/* Dynamic Background Glow */}
                        <div className={cn(
                            "absolute inset-0 opacity-20 transition-all duration-1000 bg-gradient-to-br blur-[100px]",
                            content[activeCard].colorProps.gradient
                        )} />

                        {/* Noise Filter */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                        {/* Visual Content Transition */}
                        <div className="relative z-10 w-full h-full p-8">
                            {content.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={cn(
                                        "absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                                        activeCard === index
                                            ? "opacity-100 scale-100 translate-x-0"
                                            : index < activeCard
                                                ? "opacity-0 scale-95 -translate-x-full pointer-events-none"
                                                : "opacity-0 scale-95 translate-x-32 pointer-events-none"
                                    )}
                                >
                                    <item.Visual isActive={activeCard === index} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}