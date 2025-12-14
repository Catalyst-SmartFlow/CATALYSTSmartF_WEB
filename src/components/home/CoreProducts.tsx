"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { m, useScroll, useTransform, AnimatePresence, LazyMotion, domMax, useMotionValue, useMotionTemplate } from "framer-motion";
import { Check, ChevronRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

import { OmnichannelPrismVisual } from "./OmnichannelPrismVisual";
// Dynamic Imports for Heavy Visuals
const WhatsAppVisual = dynamic(() => import("./CoreProductsVisuals").then(mod => mod.WhatsAppVisual), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-900/10 animate-pulse rounded-[3rem]" />
});
const OmnichannelVisual = dynamic(() => import("./CoreProductsVisuals").then(mod => mod.OmnichannelVisual), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-900/10 animate-pulse rounded-full" />
});
const CalendarVisual = dynamic(() => import("./CoreProductsVisuals").then(mod => mod.CalendarVisual), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-900/10 animate-pulse rounded-xl" />
});


// --- Data Configuration ---
const products = [
    {
        id: "host",
        name: "Catalyst Host",
        title: "Deja de chatear. Empieza a facturar.",
        tagline: "Ventas Automáticas",
        description: "Tu WhatsApp no debería ser una agenda, debería ser tu mejor vendedor. Nuestra IA no solo responde: negocia, hace upselling y cierra ventas por ti las 24/7. Se adapta a la voz de tu marca —ya vendas sneakers exclusivos o hamburguesas gourmet— para que tus clientes sientan que hablan contigo, mientras tú solo ves llegar las notificaciones de pago.",
        features: ["Upselling IA", "Recuperación de Carritos", "Lead Scoring"],
        color: "#4ADE80", // Green-400
        visualType: "whatsapp_ui"
    },
    {
        id: "cx",
        name: "Catalyst CX",
        title: "Tu empresa, omnipresente y omnisciente.",
        tagline: "Inteligencia Central",
        description: "Centraliza el conocimiento de toda tu organización en un solo cerebro digital. Entrenamos a CatalystCX con tus manuales y bases de datos para brindar soporte técnico y atención al cliente de nivel experto, sin alucinaciones y en cualquier canal. Una IA que domina tanto tu producto que no solo resuelve incidencias... sabe identificar el momento exacto para ofrecer una mejora y cerrar una nueva venta.",
        features: ["RAG con PDFs", "Omnicanalidad", "Memoria Infinita"],
        color: "#A78BFA", // Violet-400
        visualType: "omnichannel_ui"
    },
    {
        id: "agenda",
        name: "Catalyst Agenda",
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
        <LazyMotion features={domMax}>
            <section
                ref={containerRef}
                className="relative w-full bg-black text-white selection:bg-white/30"
                style={{ height: `${products.length * 200}vh` }}
            >
                <div className="sticky top-0 h-screen w-full overflow-hidden perspective-3d">

                    {/* Top Fade Gradient (Only visible at start) */}
                    <m.div
                        style={{ opacity: opacityTop }}
                        className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black via-black/80 to-transparent z-40 pointer-events-none"
                    />

                    {/* 1. Cinematic Background */}
                    <CinematicBackground activeColor={products[activeCard].color} />

                    <div className="max-w-[1600px] mx-auto h-full flex flex-col-reverse lg:flex-row items-center justify-center p-6 lg:p-20 relative z-10 gap-10 lg:gap-20">

                        {/* LEFT: Cinematic Narrative Engine */}
                        <div className="w-full lg:w-1/2 flex flex-col justify-center lg:pr-10 relative pointer-events-none mt-10 lg:mt-0">
                            <AnimatePresence mode="wait">
                                <m.div
                                    key={activeCard}
                                    initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, x: 30, filter: "blur(10px)" }}
                                    transition={{ duration: 0.5, ease: "circOut" }}
                                    className="space-y-5 lg:space-y-8"
                                >
                                    {/* Tagline Chip */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur w-fit mt-12 lg:mt-0">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: products[activeCard].color }}></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: products[activeCard].color }}></span>
                                        </span>
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-white/70">
                                            System: {products[activeCard].name}
                                        </span>
                                    </div>

                                    {/* Staggered Title Reveal */}
                                    <m.h2
                                        className="text-3xl lg:text-5xl font-black leading-[1.1] tracking-tighter text-white drop-shadow-2xl"
                                    >
                                        {products[activeCard].title.split(" ").map((word, i) => (
                                            <m.span
                                                key={i}
                                                className="inline-block mr-1.5 lg:mr-2.5"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.1 * i, type: "spring" }}
                                            >
                                                {word}
                                            </m.span>
                                        ))}
                                    </m.h2>

                                    <p className="text-sm lg:text-base text-white/80 leading-relaxed font-light max-w-lg drop-shadow-md">
                                        {products[activeCard].description}
                                    </p>

                                    {/* Interactive Feature Grid */}
                                    <div className="flex flex-wrap gap-2.5 pt-0">
                                        {products[activeCard].features.map((feature, idx) => (
                                            <m.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.3 + (idx * 0.1) }}
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-white/30 transition-colors"
                                            >
                                                <Check className="w-3.5 h-3.5" style={{ color: products[activeCard].color }} />
                                                <span className="text-sm text-neutral-200 font-medium group-hover:text-white transition-colors">
                                                    {feature}
                                                </span>
                                            </m.div>
                                        ))}
                                    </div>

                                    <m.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-fit mt-6 px-8 py-4 rounded-xl bg-white text-black font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow pointer-events-auto"
                                    >
                                        <span>Explorar Demo</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </m.button>
                                </m.div>
                            </AnimatePresence>
                        </div>

                        {/* RIGHT: High-Fidelity Visual Engine (Interactive 3D) */}
                        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end h-[40vh] lg:h-auto pointer-events-auto perspective-1000">
                            <m.div
                                layout
                                style={{ scale: scaleAnim }}
                                className={cn(
                                    "relative transition-all duration-700 ease mx-auto",
                                    products[activeCard].visualType === "whatsapp_ui"
                                        ? "w-full max-w-[320px] aspect-[9/19.5]"
                                        : "w-full max-w-[600px] aspect-square"
                                )}
                            >
                                <AnimatePresence mode="wait">
                                    {products[activeCard].visualType === "whatsapp_ui" ? (
                                        <m.div
                                            key="whatsapp_container"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                                            transition={{ duration: 0.6, ease: "backOut" }}
                                            className="w-full h-full flex items-center justify-center"
                                        >
                                            <WhatsAppVisual color={products[activeCard].color} />
                                        </m.div>
                                    ) : (
                                        <PrismaticCard
                                            key="generic_container"
                                            activeColor={products[activeCard].color}
                                            hideHeader={products[activeCard].id === 'cx'}
                                            transparent={products[activeCard].id === 'cx'}
                                        >
                                            <m.div
                                                key={products[activeCard].id}
                                                initial={{ opacity: 0, rotateX: 10, y: 50 }}
                                                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                                                exit={{ opacity: 0, rotateX: -10, y: -50, filter: "blur(10px)" }}
                                                transition={{ duration: 0.6, ease: "backOut" }}
                                                className="w-full h-full"
                                            >
                                                {products[activeCard].visualType === "omnichannel_ui" && <OmnichannelPrismVisual activeColor={products[activeCard].color} />}
                                                {products[activeCard].visualType === "calendar_ui" && <CalendarVisual color={products[activeCard].color} />}
                                            </m.div>
                                        </PrismaticCard>
                                    )}
                                </AnimatePresence>
                            </m.div>
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
                    <m.div
                        style={{ opacity: opacityBottom }}
                        className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black/80 to-transparent z-40 pointer-events-none"
                    />
                </div>
            </section>
        </LazyMotion >
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
                filter: 'blur(60px)',
                willChange: "opacity"
            }}
        />
        <div
            className="absolute inset-0 transition-all duration-1000 ease-in-out opacity-10"
            style={{
                background: `conic-gradient(from 0deg at 50% 50%, ${activeColor} 0deg, transparent 60deg, transparent 300deg, ${activeColor} 360deg)`,
                filter: 'blur(40px)',
                willChange: "opacity"
            }}
        />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
    </div>
);

const PrismaticCard = ({ children, activeColor, hideHeader = false, transparent = false }: { children: React.ReactNode, activeColor: string, hideHeader?: boolean, transparent?: boolean }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const spotlightBg = useMotionTemplate`
        radial-gradient(
            650px circle at ${mouseX}px ${mouseY}px,
            ${activeColor}15,
            transparent 80%
        )
    `;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <m.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            className="relative w-full h-full rounded-2xl overflow-hidden group perspective-1000"
        >
            <div className={cn(
                "absolute inset-0 z-10 rounded-2xl transition-all duration-500 flex flex-col",
                !transparent && "bg-white/5 border border-white/10 backdrop-blur-md group-hover:border-white/20"
            )}>
                {/* Dynamic Spotlight */}
                {!transparent && (
                    <m.div
                        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                        style={{ background: spotlightBg }}
                    />
                )}

                {(!hideHeader && !transparent) && (
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
                )}

                <div className={cn("flex-1 relative font-sans overflow-hidden", !transparent ? "p-2 lg:p-4 text-white" : "")}>
                    {children}
                </div>
            </div>
        </m.div>
    );
};
