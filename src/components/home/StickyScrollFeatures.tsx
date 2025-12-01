"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MessageCircle, Zap, CalendarClock, ArrowRight, CheckCircle2, User } from "lucide-react";
import { cn } from "@/lib/utils";

// --- MOCKUPS VISUALES (Code-based) ---

const VisualCX = () => (
    <div className="relative w-full max-w-[380px] flex flex-col gap-4 p-6">
        {/* Mensaje Entrante (Usuario) */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="self-start max-w-[85%] rounded-2xl rounded-tl-none bg-zinc-800/80 backdrop-blur-md border border-white/5 p-4 shadow-lg"
        >
            <p className="text-sm text-zinc-200">Hola, ¿tienen planes para clínicas?</p>
        </motion.div>

        {/* Respuesta (Bot) */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.5, type: "spring" }}
            className="self-end max-w-[90%] rounded-2xl rounded-tr-none bg-gradient-to-br from-violet-600 to-indigo-600 p-4 shadow-xl shadow-violet-500/20"
        >
            <p className="text-sm text-white font-medium">¡Sí! Catalyst Agenda AI es ideal para clínicas. ¿Quieres ver cómo funciona?</p>
            <div className="mt-3 flex gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer text-xs text-white font-medium backdrop-blur-sm">
                    Ver Demo
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer text-xs text-white/90 backdrop-blur-sm">
                    Más info
                </div>
            </div>
        </motion.div>
    </div>
);

const VisualOps = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
        {/* Línea de flujo animada */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-50">
            <motion.path
                d="M 100 100 Q 200 100 200 200 T 300 300"
                fill="none"
                stroke="url(#gradient-line)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
            </defs>
        </svg>

        <div className="relative z-10 flex flex-col gap-12 w-full max-w-[320px]">
            {/* Nodo 1: Trigger */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 p-3 rounded-xl shadow-lg"
            >
                <div className="w-10 h-10 rounded-lg bg-[#635BFF] flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <span className="font-bold text-white text-xs">S</span>
                </div>
                <div>
                    <p className="text-xs text-zinc-400 font-mono">Stripe</p>
                    <p className="text-sm text-zinc-200 font-medium">Pago Recibido</p>
                </div>
                <div className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </motion.div>

            {/* Nodo 2: Action */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4 bg-zinc-900/80 backdrop-blur-xl border border-cyan-500/30 p-3 rounded-xl shadow-lg shadow-cyan-900/20 ml-12"
            >
                <div className="w-10 h-10 rounded-lg bg-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-xs text-cyan-400 font-mono">Catalyst Ops</p>
                    <p className="text-sm text-zinc-200 font-medium">Procesar & Enviar</p>
                </div>
            </motion.div>

            {/* Nodo 3: Notification */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="flex items-center gap-4 bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 p-3 rounded-xl shadow-lg"
            >
                <div className="w-10 h-10 rounded-lg bg-[#4A154B] flex items-center justify-center shadow-lg shadow-pink-900/20">
                    <span className="font-bold text-white text-xs">Slack</span>
                </div>
                <div>
                    <p className="text-xs text-zinc-400 font-mono">Slack</p>
                    <p className="text-sm text-zinc-200 font-medium">Notificar Equipo</p>
                </div>
                <CheckCircle2 className="ml-auto w-4 h-4 text-green-500" />
            </motion.div>
        </div>
    </div>
);

const VisualAgenda = () => (
    <div className="relative w-full max-w-[340px] bg-zinc-900/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Header Calendario */}
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium text-zinc-300">Octubre 24</span>
            </div>
            <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
        </div>

        {/* Lista de Citas */}
        <div className="p-4 space-y-3">
            {/* Cita Pasada */}
            <div className="flex gap-3 opacity-40">
                <span className="text-xs text-zinc-500 font-mono pt-1">09:00</span>
                <div className="flex-1 p-2 rounded-lg bg-zinc-800 border border-white/5">
                    <p className="text-xs text-zinc-300 line-through">Dr. Paredes - Revisión</p>
                </div>
            </div>

            {/* Cita Actual (Animada) */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex gap-3 relative"
            >
                <div className="absolute -left-1.5 top-2 w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-xs text-emerald-400 font-mono pt-1 font-bold">10:30</span>
                <div className="flex-1 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-xs font-bold text-emerald-100">Cita Confirmada</p>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300">Bot</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">
                            <User className="w-3 h-3 text-zinc-400" />
                        </div>
                        <span className="text-[10px] text-zinc-400">Paciente Nuevo</span>
                    </div>
                </div>
            </motion.div>

            {/* Cita Futura */}
            <div className="flex gap-3 opacity-40">
                <span className="text-xs text-zinc-500 font-mono pt-1">12:00</span>
                <div className="flex-1 p-2 rounded-lg bg-zinc-800 border border-white/5">
                    <p className="text-xs text-zinc-300">Almuerzo de equipo</p>
                </div>
            </div>
        </div>
    </div>
);

// --- DATOS ---

const content = [
    {
        id: "cx",
        title: "Catalyst CX",
        subtitle: "Tu fuerza de ventas digital",
        description: "No es solo un chatbot. Es un asistente 'Neural' en Web y WhatsApp que califica leads y responde dudas 24/7. Captura clientes antes de que abandonen tu página.",
        icon: MessageCircle,
        color: "from-violet-500 to-purple-500",
        glow: "bg-violet-500",
        visual: <VisualCX />,
    },
    {
        id: "ops",
        title: "Catalyst Ops",
        subtitle: "La magia invisible (n8n)",
        description: "Orquestación de procesos. Detectamos la factura de tu sistema (SRI/ERP) y la enviamos automáticamente al correo del cliente y a tu equipo en Slack. Cero tareas manuales.",
        icon: Zap,
        color: "from-blue-500 to-cyan-500",
        glow: "bg-cyan-500",
        visual: <VisualOps />,
    },
    {
        id: "agenda",
        title: "Agenda AI",
        subtitle: "Elimina el ausentismo",
        description: "Ideal para clínicas y servicios. Un bot que califica pacientes, responde preguntas frecuentes y agenda directo en Google Calendar.",
        icon: CalendarClock,
        color: "from-emerald-500 to-green-500",
        glow: "bg-emerald-500",
        visual: <VisualAgenda />,
    },
];

export default function StickyScrollFeatures() {
    const [activeCard, setActiveCard] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Detección de Scroll para "Focus Reveal"
    useEffect(() => {
        const handleScroll = () => {
            const cards = document.querySelectorAll(".feature-text-block");
            const triggerPoint = window.innerHeight * 0.5; // Centro de la pantalla

            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                // Si el bloque está en el centro
                if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
                    setActiveCard(index);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
    const headerBlur = useTransform(scrollYProgress, [0, 0.1], ["blur(0px)", "blur(10px)"]);

    return (
        <section ref={containerRef} className="bg-black relative hidden md:block pt-32">

            {/* HEADLINE SECTION */}
            <div className="max-w-5xl mx-auto text-center mb-32 px-4">
                <motion.div style={{ opacity: headerOpacity, scale: headerScale, filter: headerBlur }}>
                    <motion.div
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: false, amount: 0.3 }}
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

            <div className="max-w-[1400px] mx-auto flex relative">

                {/* COLUMNA IZQUIERDA: TEXTO SCROLLABLE */}
                <div className="w-1/2 relative z-10 px-12 lg:px-20">
                    {/* Espaciador inicial */}
                    <div className="h-[20vh]" />

                    {content.map((item, index) => (
                        <div
                            key={item.id}
                            className={cn(
                                "feature-text-block min-h-screen flex flex-col justify-center transition-all duration-700",
                                activeCard === index ? "opacity-100 blur-0" : "opacity-20 blur-[2px]"
                            )}
                        >
                            <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br shadow-2xl",
                                item.color
                            )}>
                                <item.icon className="text-white w-8 h-8" />
                            </div>

                            <h3 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tighter leading-tight">
                                {item.title}
                            </h3>

                            <p className={cn(
                                "text-2xl lg:text-3xl font-medium mb-8 bg-clip-text text-transparent bg-gradient-to-r",
                                item.color
                            )}>
                                {item.subtitle}
                            </p>

                            <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
                                {item.description}
                            </p>
                        </div>
                    ))}

                    {/* Espaciador final */}
                    <div className="h-[20vh]" />
                </div>

                {/* COLUMNA DERECHA: VISUAL STICKY */}
                <div className="w-1/2 sticky top-0 h-screen flex items-center justify-center overflow-hidden">

                    {/* Ambient Glow Dinámico */}
                    <div
                        className={cn(
                            "absolute inset-0 opacity-20 transition-colors duration-1000 blur-[120px]",
                            content[activeCard].glow
                        )}
                    />

                    {/* Contenedor Visual */}
                    <div className="relative w-full max-w-xl aspect-square flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={content[activeCard].id}
                                initial={{ y: 50, opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ y: -50, opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Ease Apple-like
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                {/* Glass Container */}
                                <div className="relative w-full h-full max-h-[500px] rounded-[3rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
                                    {/* Noise Texture Overlay */}
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

                                    {/* El Visual Específico */}
                                    <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                                        {content[activeCard].visual}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </section>
    );
}