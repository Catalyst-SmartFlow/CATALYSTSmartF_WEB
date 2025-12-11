"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { MessageCircle, Globe, Calendar, Check, Send, Bot, Database, MessageSquare, Zap, Clock, ArrowRight, Activity, Smartphone, Search, Lock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data Configuration ---
const products = [
    {
        id: "host",
        title: "Catalyst Host",
        tagline: "Ventas Automáticas",
        description: "Tu WhatsApp se convierte en un agente de ventas autónomo. Entiende contexto, detecta intención de compra y cierra tratos mientras te concentras en crecer.",
        features: ["Upselling IA", "Recuperación de Carritos", "Lead Scoring"],
        color: "#4ADE80", // Green-400
        visualType: "whatsapp_ui"
    },
    {
        id: "cx",
        title: "Catalyst CX",
        tagline: "Inteligencia Central",
        description: "Un cerebro digital conectado a todo. Entrenamos a la IA con tus manuales y bases de datos para dar soporte técnico de nivel experto en cualquier canal.",
        features: ["RAG con PDFs", "Omnicanalidad", "Memoria Infinita"],
        color: "#A78BFA", // Violet-400
        visualType: "omnichannel_ui"
    },
    {
        id: "agenda",
        title: "Catalyst Agenda",
        tagline: "Gestión de Tiempo",
        description: "Tu secretaria virtual perfecta. Filtra curiosos, califica prospectos reales y gestiona tu Google Calendar para llenar tu semana solo con reuniones de alto valor.",
        features: ["Sync Google Calendar", "Filtro de Calidad", "Cero Ausentismo"],
        color: "#60A5FA", // Blue-400
        visualType: "calendar_ui"
    }
];

export const CoreProducts = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCard, setActiveCard] = useState(0);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Parallax & Scrubbing hooks
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const scaleAnim = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

    // Dynamic Gradient Visibility (Only at edges)
    const opacityTop = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
    const opacityBottom = useTransform(scrollYProgress, [0.95, 1], [0, 1]);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const cardsLength = products.length;
            const step = 1 / cardsLength;
            const index = Math.min(
                Math.max(Math.floor(latest / step), 0),
                cardsLength - 1
            );
            setActiveCard(index);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-black text-white selection:bg-white/30"
            style={{ height: `${products.length * 200}vh` }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden perspective-3d">

                {/* Top Fade Gradient (Only visible at start) */}
                <motion.div
                    style={{ opacity: opacityTop }}
                    className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black via-black/80 to-transparent z-40 pointer-events-none"
                />

                {/* 1. Cinematic Background */}
                <CinematicBackground activeColor={products[activeCard].color} />

                <div className="max-w-[1600px] mx-auto h-full flex flex-col-reverse lg:flex-row items-center justify-center p-6 lg:p-20 relative z-10 gap-10 lg:gap-20">

                    {/* LEFT: Cinematic Narrative Engine */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center lg:pr-10 relative pointer-events-none mt-10 lg:mt-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCard}
                                initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: 30, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                                className="space-y-6 lg:space-y-10"
                            >
                                {/* Tagline Chip */}
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur w-fit">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: products[activeCard].color }}></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: products[activeCard].color }}></span>
                                    </span>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/70">
                                        System: {products[activeCard].tagline}
                                    </span>
                                </div>

                                {/* Staggered Title Reveal */}
                                <motion.h2
                                    className="text-5xl lg:text-7xl font-black leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20"
                                >
                                    {products[activeCard].title.split(" ").map((word, i) => (
                                        <motion.span
                                            key={i}
                                            className="inline-block mr-3"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 * i, type: "spring" }}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </motion.h2>

                                <p className="text-lg lg:text-xl text-neutral-400 leading-relaxed font-light max-w-xl">
                                    {products[activeCard].description}
                                </p>

                                {/* Interactive Feature Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                                    {products[activeCard].features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 + (idx * 0.1) }}
                                            className="flex items-center gap-3 group"
                                        >
                                            <div className="p-2 rounded-lg bg-neutral-900 border border-white/5 group-hover:border-white/20 transition-colors">
                                                <Check className="w-4 h-4" style={{ color: products[activeCard].color }} />
                                            </div>
                                            <span className="text-sm text-neutral-300 font-medium group-hover:text-white transition-colors">
                                                {feature}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-fit mt-6 px-8 py-4 rounded-xl bg-white text-black font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow pointer-events-auto"
                                >
                                    <span>Explorar Demo</span>
                                    <ChevronRight className="w-4 h-4" />
                                </motion.button>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT: High-Fidelity Visual Engine (Interactive 3D) */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end h-[40vh] lg:h-auto pointer-events-auto perspective-1000">
                        <motion.div
                            style={{ scale: scaleAnim }}
                            className="w-full max-w-[600px] aspect-square relative"
                        >
                            <PrismaticCard activeColor={products[activeCard].color}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={products[activeCard].id}
                                        initial={{ opacity: 0, rotateX: 10, y: 50 }}
                                        animate={{ opacity: 1, rotateX: 0, y: 0 }}
                                        exit={{ opacity: 0, rotateX: -10, y: -50, filter: "blur(10px)" }}
                                        transition={{ duration: 0.6, ease: "backOut" }}
                                        className="w-full h-full"
                                    >
                                        {products[activeCard].visualType === "whatsapp_ui" && <WhatsAppVisual color={products[activeCard].color} />}
                                        {products[activeCard].visualType === "omnichannel_ui" && <OmnichannelVisual color={products[activeCard].color} />}
                                        {products[activeCard].visualType === "calendar_ui" && <CalendarVisual color={products[activeCard].color} />}
                                    </motion.div>
                                </AnimatePresence>
                            </PrismaticCard>
                        </motion.div>
                    </div>

                </div>

                {/* Scroll Progress Indicator (Enhanced) */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-30 pointer-events-auto">
                    {products.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                const sectionHeight = window.innerHeight * 2;
                                window.scrollTo({ top: containerRef.current!.offsetTop + (i * sectionHeight), behavior: 'smooth' });
                            }}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-700 ease-out backdrop-blur-md border border-white/20",
                                activeCard === i ? "w-20 opacity-100 shadow-[0_0_20px_rgba(255,255,255,0.4)]" : "w-6 opacity-30 hover:opacity-100 bg-white"
                            )}
                            style={{
                                backgroundColor: activeCard === i ? products[activeCard].color : "rgba(255,255,255,0.2)",
                            }}
                        />
                    ))}
                </div>

                {/* Bottom Fade Gradient (Only visible at end) */}
                <motion.div
                    style={{ opacity: opacityBottom }}
                    className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black/80 to-transparent z-40 pointer-events-none"
                />
            </div>
        </section>
    );
};

// --- CINEMATIC COMPONENTS ---

const CinematicBackground = ({ activeColor }: { activeColor: string }) => (
    <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Space Gradients */}
        <div
            className="absolute inset-0 transition-all duration-1000 ease-in-out opacity-20"
            style={{
                background: `radial-gradient(circle at 70% 30%, ${activeColor}, transparent 60%)`,
                filter: 'blur(100px)'
            }}
        />
        <div
            className="absolute inset-0 transition-all duration-1000 ease-in-out opacity-10"
            style={{
                background: `conic-gradient(from 0deg at 50% 50%, ${activeColor} 0deg, transparent 60deg, transparent 300deg, ${activeColor} 360deg)`,
                filter: 'blur(80px)'
            }}
        />
        {/* Scanlines & Noise */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%] pointer-events-none" />
    </div>
)

const PrismaticCard = ({ children, activeColor }: { children: React.ReactNode, activeColor: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <div
            className="group relative w-full h-full rounded-[2rem] bg-black/80 border border-white/10 shadow-2xl overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Prismatic Border Glow */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                        800px circle at ${mouseX}px ${mouseY}px,
                        ${activeColor}60,
                        transparent 80%
                        )
                    `,
                }}
            />

            {/* Inner Content Container */}
            <div className="absolute inset-[1px] rounded-[1.9rem] bg-[#090909] overflow-hidden flex flex-col">
                {/* 1. Glass Header */}
                <div className="h-10 w-full bg-white/5 border-b border-white/5 backdrop-blur-md flex items-center px-6 justify-between z-20">
                    <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock className="w-3 h-3 text-white/30" />
                        <span className="text-[10px] text-white/30 font-mono">SECURE_CONNECTION</span>
                    </div>
                </div>

                <div className="flex-1 relative p-2 lg:p-4 text-white font-sans overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- 1. WHATSAPP UI REFINED ---

const WhatsAppVisual = ({ color }: { color: string }) => (
    <div className="flex flex-col h-full bg-[#0b141a] rounded-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] opacity-[0.05] pointer-events-none" />

        {/* Chat Header */}
        <div className="bg-[#202c33] p-4 flex items-center gap-4 z-10 shadow-md">
            <div className="relative">
                <div className="w-10 h-10 rounded-full bg-black overflow-hidden border border-white/10 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-green-500" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#202c33] rounded-full animate-pulse" />
            </div>
            <div>
                <h4 className="font-medium text-white text-sm">Catalyst AI</h4>
                <p className="text-xs text-[#8696a0]">Business Account</p>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 space-y-6 overflow-hidden flex flex-col justify-end relative z-10">
            <WABubble isUser={false} delay={0.2} time="10:00 AM">
                Hola 👋 Bienvenido a Catalyst. ¿Cómo podemos escalar tu negocio hoy?
            </WABubble>

            <WABubble isUser={true} delay={1.0} time="10:05 AM">
                Necesito automatizar mis citas médicas.
            </WABubble>

            <WABubble isUser={false} delay={2.0} time="10:05 AM">
                ¡Perfecto! 🏥 Nuestro módulo **Agenda AI** se conecta con tu calendario y califica pacientes automáticamente.
            </WABubble>

            {/* Smart Chips */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 3.5 }}
                className="flex gap-2 mt-2"
            >
                <span className="px-3 py-1.5 rounded-full bg-[#202c33] text-[#00a884] text-xs font-medium border border-[#00a884]/30 cursor-pointer hover:bg-[#00a884]/10 transition-colors">
                    Ver Demo
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#202c33] text-[#00a884] text-xs font-medium border border-[#00a884]/30 cursor-pointer hover:bg-[#00a884]/10 transition-colors">
                    Precios
                </span>
            </motion.div>
        </div>
    </div>
)

const WABubble = ({ isUser, children, delay, time }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay, type: "spring" }}
        className={cn(
            "max-w-[85%] p-2 px-3 rounded-lg text-sm relative shadow-sm",
            isUser ? "bg-[#005c4b] self-end rounded-tr-none" : "bg-[#202c33] self-start rounded-tl-none"
        )}
    >
        <span className="text-[#e9edef]">{children}</span>
        <div className="flex justify-end items-center gap-1 mt-1">
            <span className="text-[10px] text-[#8696a0]">{time}</span>
            {isUser && <div className="text-[#53bdeb] text-[10px]">✓✓</div>}
        </div>
    </motion.div>
)

// --- 2. OMNICHANNEL BRAIN REFINED ---

const OmnichannelVisual = ({ color }: { color: string }) => {
    return (
        <div className="h-full w-full bg-black/50 relative overflow-hidden flex items-center justify-center">
            {/* Spinning Radar */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-[400px] h-[400px] border border-violet-500/30 rounded-full border-dashed"
                />
            </div>

            {/* Central Node */}
            <motion.div
                animate={{ boxShadow: ["0 0 20px rgba(139,92,246,0)", "0 0 50px rgba(139,92,246,0.5)", "0 0 20px rgba(139,92,246,0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 bg-black border border-violet-500 rounded-full relative z-20 flex items-center justify-center shadow-2xl"
            >
                <BrainCircuitIcon />
            </motion.div>

            {/* Orbiting Satellites */}
            <Satellite icon={MessageSquare} angle={0} color="green" label="WhatsApp" delay={0} />
            <Satellite icon={Send} angle={120} color="sky" label="Telegram" delay={1} />
            <Satellite icon={Globe} angle={240} color="blue" label="Web" delay={2} />

            {/* Data Stream Box */}
            <div className="absolute bottom-6 w-3/4 bg-neutral-900/90 border border-violet-500/20 rounded-lg p-3 font-mono text-[10px] text-violet-300">
                <div className="flex justify-between border-b border-white/5 pb-1 mb-1">
                    <span>LIVE_FEED</span>
                    <span className="text-green-500">CONN_OK</span>
                </div>
                <div className="space-y-1 opacity-70">
                    <p>{">"} User detected on /pricing</p>
                    <p>{">"} Triggering agent_sales_v2</p>
                    <p>{">"} Response generated (12ms)</p>
                </div>
            </div>
        </div>
    )
}

const Satellite = ({ icon: Icon, angle, color, label, delay }: any) => (
    <motion.div
        className="absolute"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: -delay * 5 }}
        style={{ width: '300px', height: '300px' }} // Orbit path diameter
    >
        <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#090909] border border-white/10 p-2 rounded-xl flex items-center gap-2 shadow-lg"
            style={{ transform: `rotate(-${angle}deg)` }} // Keep icon upright? No, logic needs correction for upright rotation
        >
            <div
                className={`p-1.5 rounded-lg bg-${color}-500/10`}
                style={{ transform: 'rotate(0deg)' }} // Actually we need counter-rotation to keep it upright, simplified here
            >
                <Icon className={`w-4 h-4 text-${color}-400`} />
            </div>
            <span className="text-[10px] font-bold hidden lg:block">{label}</span>
        </motion.div>
    </motion.div>
)

const BrainCircuitIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-violet-400">
        <path d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2ZM9 20V21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9ZM12 4C14.76 4 17 6.24 17 9C17 11.76 14.76 14 12 14C9.24 14 7 11.76 7 9C7 6.24 9.24 4 12 4Z" fill="currentColor" fillOpacity="0.2" />
        <path d="M12 6L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 10L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 9L7 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 9L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
)


// --- 3. CALENDAR UI REFINED ---

// --- 3. CALENDAR UI REFINED (Dark Mode & Smooth) ---

const CalendarVisual = ({ color }: { color: string }) => {
    return (
        <div className="h-full w-full bg-[#0F172A] text-white p-6 lg:p-8 flex flex-col relative overflow-hidden font-sans">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 blur-[60px] pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-start mb-8 z-10 relative">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white mb-1">Octubre 24</h3>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Sincronizado</p>
                    </div>
                </div>
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Calendar className="w-5 h-5 text-blue-400" />
                </div>
            </div>

            {/* Timeline Container */}
            <div className="flex-1 relative z-10 flex flex-col justify-center">
                {/* Timeline Line */}
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-slate-700 via-slate-800 to-transparent rounded-full"
                />

                <div className="space-y-6">
                    <CalItem time="09:00" title="Daily Standup" type="internal" delay={0.2} />

                    {/* Hero Item (Active) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ delay: 0.8, type: "spring", duration: 0.8 }}
                        className="relative pl-16 pr-4"
                    >
                        <div className="absolute left-[20px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-[#0F172A] z-20 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />

                        <div className="bg-gradient-to-r from-blue-900/40 to-blue-600/10 border-l-2 border-blue-500 rounded-r-2xl p-4 group cursor-pointer hover:bg-blue-900/30 transition-all duration-300 relative overflow-hidden">
                            {/* Hover Shine */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                            <div className="flex justify-between items-center relative z-10">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-blue-300 text-xs font-bold font-mono">11:30 AM</p>
                                        <span className="px-1.5 py-0.5 rounded-md bg-blue-500/20 text-[10px] text-blue-200 font-bold uppercase">Venta</span>
                                    </div>
                                    <p className="text-white font-bold text-lg leading-tight group-hover:text-blue-200 transition-colors">Demo: Grupo Farma</p>
                                    <p className="text-slate-500 text-xs mt-1">Google Meet • 45 min</p>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                                    <Check className="w-4 h-4 text-blue-400" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <CalItem time="14:00" title="Review Mensual" type="internal" delay={0.4} />
                </div>
            </div>

            {/* Floating Success Card (Better Contrast) */}
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8, type: "spring", bounce: 0.4 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A] to-transparent pt-10 pb-6 px-6"
            >
                <div className="bg-[#1E293B] border border-slate-700/50 p-4 rounded-xl shadow-2xl flex items-center gap-4 relative overflow-hidden group">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 border border-green-500/30">
                        <Check className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">Reserva Confirmada</p>
                        <p className="text-[10px] text-slate-400">Invitación enviada a juan@grupofarma.com</p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

const CalItem = ({ time, title, type, delay }: any) => (
    <motion.div
        className="relative pl-16 pr-4 py-2 group opacity-50 hover:opacity-100 transition-opacity duration-300"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 0.5 }}
        whileHover={{ x: 5, opacity: 1 }}
        transition={{ delay, duration: 0.5 }}
    >
        <div className="absolute left-[24px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-[2px] border-slate-600 bg-[#0F172A] z-10 group-hover:border-slate-400 group-hover:scale-125 transition-all" />
        <span className="text-[10px] font-mono text-slate-500 absolute left-0 top-1/2 -translate-y-1/2 w-12 text-right group-hover:text-slate-300 transition-colors">{time}</span>

        <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex justify-between items-center backdrop-blur-sm">
            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{title}</span>
            <span className="text-[9px] bg-black/20 px-2 py-0.5 rounded text-slate-500 uppercase tracking-wide">{type}</span>
        </div>
    </motion.div>
)
