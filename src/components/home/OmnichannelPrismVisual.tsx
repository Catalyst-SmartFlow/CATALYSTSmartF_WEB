"use client";

import React, { useEffect } from "react";
import { m, useAnimate, stagger } from "framer-motion";
import { FileText, Database, FileBox, Send, Bot, User, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { INPUT_PATHS, OUTPUT_PATHS, SPRING_CONFIG, DURATIONS, DELAYS } from "./OmnichannelConstants";

export const OmnichannelPrismVisual = ({ activeColor = "#A78BFA" }: { activeColor?: string }) => {
    const [scope, animate] = useAnimate();
    const isMounted = React.useRef(true);

    useEffect(() => {
        isMounted.current = true;

        const sequence = async () => {
            // Wait for initial render and mount
            await new Promise(resolve => setTimeout(resolve, 100));

            while (isMounted.current) {
                try {
                    // === STATE 0: RESET (Visual State: HUB) ===
                    // Brain at Center, Inputs around it.
                    await animate([
                        // Brain (Start Center)
                        [".brain-container", { left: "50%", x: "-50%", y: "-50%" }, { duration: 0 }],
                        [".brain-pulse", { scale: 1, opacity: 0.5 }, { duration: 0 }],
                        [".thinking-text", { opacity: 0, y: 0 }, { duration: 0 }],

                        // Inputs (Visible)
                        [".input-group", { opacity: 1, scale: 1 }, { duration: 0 }],
                        [".input-icon", { opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }, { duration: 0 }], // Ensure y:0 reset
                        [".input-line", { pathLength: 0, opacity: 0 }, { duration: 0 }],
                        [".input-particle-1, .input-particle-2, .input-particle-3, .input-particle-4", { opacity: 0 }, { duration: 0 }],

                        // Final Cards (Hidden)
                        [".channel-card", { x: 50, opacity: 0 }, { duration: 0 }],
                        [".connector-line", { pathLength: 0, opacity: 0 }, { duration: 0 }],
                        [".output-particle-1, .output-particle-2, .output-particle-3", { opacity: 0 }, { duration: 0 }],
                        [".chat-bubble", { opacity: 0, y: 10 }, { duration: 0 }],
                        [".upsell-container", { height: 0, opacity: 0 }, { duration: 0 }],
                        ["#channel-card-1", { scale: 1, borderColor: "rgba(255,255,255,0.05)" }, { duration: 0 }],
                    ]);

                    // Start Organic Breathing (Idle)
                    animate(".input-icon", { y: [0, -8, 0] }, { duration: DURATIONS.breathing, repeat: Infinity, ease: "easeInOut" });

                    if (!isMounted.current) break;

                    // === PHASE 1: INGESTION (Hub) ===

                    // Show Lines & Flow Particles
                    animate(".input-line", { pathLength: 1, opacity: 0.6 }, { duration: DURATIONS.lineDraw, ease: "easeInOut" });
                    // Particles with a slight trail effect (simulated by faster/staggered appearance)
                    animate(".input-particle-1, .input-particle-2, .input-particle-3, .input-particle-4", { opacity: 1 }, { duration: DURATIONS.particleFlow });

                    // Wait for particles (Organic Breathing continues)
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    // Absorb Inputs
                    // Stop breathing by animating to specific state
                    animate(".input-icon", { y: 0 }, { duration: 0.5 });
                    animate(".input-particle-1, .input-particle-2, .input-particle-3, .input-particle-4", { opacity: 0 }, { duration: 0.3 });
                    animate(".input-line", { pathLength: 0, opacity: 0 }, { duration: 0.4 });

                    // Suck icons into brain (Center) with Spring
                    animate(".input-icon", { scale: 0, opacity: 0, rotate: 180 }, { duration: 1.0, ...SPRING_CONFIG.iconSuck });

                    // Organic Heartbeat Pulse (Double Beat)
                    animate(".brain-core", {
                        scale: [1, 1.25, 1.1, 1.35, 1],
                        filter: ["brightness(1)", "brightness(1.5)", "brightness(1.2)", "brightness(1.6)", "brightness(1)"]
                    }, { duration: 1.2, times: [0, 0.2, 0.4, 0.6, 1] });

                    await new Promise(resolve => setTimeout(resolve, 800));

                    // === PHASE 2: PROCESSING (Shift Left) ===

                    // Move Brain Left (Spring Physics)
                    // type: "spring", stiffness: 60, damping: 14 => Elastic but settled
                    await animate(".brain-container", { left: "15%" }, { ...SPRING_CONFIG.brainShift });

                    // Show "Pensando..." text
                    animate(".thinking-text", { opacity: [0, 1, 1, 0], y: [5, 0, 0, -5] }, { duration: 1.8, times: [0, 0.2, 0.8, 1] });

                    // Wait for "Thinking"
                    await new Promise(resolve => setTimeout(resolve, DELAYS.thinking));

                    if (!isMounted.current) break;

                    // === PHASE 3: OUTPUT (Prism) ===

                    // Connectors to Cards
                    animate(".connector-line", { pathLength: 1, opacity: 1 }, { duration: DURATIONS.lineDraw, ease: "circOut" });

                    // Show Output Particles
                    animate(".output-particle-1, .output-particle-2, .output-particle-3", { opacity: 1 }, { duration: DURATIONS.particleFlow, delay: DELAYS.particleStart });

                    // Channel Cards Appear (Spring Stagger)
                    await animate(".channel-card", { x: 0, opacity: 1 }, { delay: stagger(0.15), ...SPRING_CONFIG.cardAppear });

                    // === CHAT SEQUENCE ===
                    // Users ask
                    await animate(".user-bubble", { opacity: 1, y: 0 }, { duration: DURATIONS.chatBubble, delay: stagger(DELAYS.chatStagger), ease: "easeOut" });

                    await new Promise(resolve => setTimeout(resolve, 800));

                    // AI Responds
                    await animate(".ai-bubble", { opacity: 1, y: 0 }, { duration: DURATIONS.chatBubble, delay: stagger(DELAYS.chatStagger), ease: "easeOut" });

                    // Upsell
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    animate("#channel-card-1", { scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }, { duration: 0.6, ...SPRING_CONFIG.upsellStart });
                    await animate(".upsell-container", { height: "auto", opacity: 1 }, { duration: 0.6, ease: "backOut" });

                    // Wait and Reset
                    await new Promise(resolve => setTimeout(resolve, 5000));

                } catch (e) {
                    console.log("Animation sequence stopped or failed", e);
                    break;
                }
            }
        };

        sequence();

        return () => { isMounted.current = false; };
    }, [activeColor, animate]);

    return (
        <div ref={scope} className="relative w-full h-full flex items-center justify-center overflow-hidden">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-violet-500/10 via-transparent to-transparent opacity-50" />

            {/* --- CENTRAL HUB (Phase 1) --- */}
            {/* Brain Container - Animates from Center to Left */}
            <div className="brain-container absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4 will-change-transform">
                <div className="relative flex items-center justify-center">
                    <div className="brain-pulse absolute inset-0 rounded-full bg-violet-500 blur-xl" />
                    <div className="brain-core relative w-20 h-20 rounded-full bg-black border border-violet-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(167,139,250,0.5)]">
                        <Zap className="w-10 h-10 text-violet-400 fill-violet-400" />
                    </div>
                </div>
                {/* Thinking Text with dots span for potential CSS anims if needed, or keeping simple text for now */}
                <span className="thinking-text text-xs font-medium text-violet-300 opacity-0 absolute top-full mt-2 whitespace-nowrap flex gap-0.5">
                    Pensando<span className="animate-pulse">.</span><span className="animate-pulse delay-100">.</span><span className="animate-pulse delay-200">.</span>
                </span>
            </div>

            {/* --- INPUTS (Phase 1: 4 Nodes) --- */}
            <div className="input-group absolute inset-0 z-20">
                {/* 1. PDF (Top Left) */}
                <div className="absolute left-[30%] top-[30%] -translate-x-1/2 -translate-y-1/2">
                    <InputIcon src="/integratorsLogos/PDF_file_icon.svg" alt="PDF" className="input-icon w-16 h-16 p-3 will-change-transform" />
                </div>
                {/* 2. Word (Bottom Left) */}
                <div className="absolute left-[30%] top-[60%] -translate-x-1/2 -translate-y-1/2">
                    <InputIcon src="/integratorsLogos/Microsoft_Word_2013-2019_logo.svg.png" alt="Word" className="input-icon w-16 h-16 p-3 will-change-transform" />
                </div>
                {/* 3. Sheets (Top Right) */}
                <div className="absolute right-[30%] top-[30%] translate-x-1/2 -translate-y-1/2">
                    <InputIcon src="/integratorsLogos/google-sheets-logo-icon.svg" alt="Sheets" className="input-icon w-16 h-16 p-3 will-change-transform" />
                </div>
                {/* 4. Database (Bottom Right) */}
                <div className="absolute right-[30%] top-[60%] translate-x-1/2 -translate-y-1/2">
                    <div className="input-icon w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-lg p-3 will-change-transform">
                        <Database className="w-full h-full text-emerald-400 opacity-80" strokeWidth={1.5} />
                    </div>
                </div>
            </div>

            {/* --- CONNECTORS (SVG) --- */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 600 400" preserveAspectRatio="none">

                {/* --- Input Lines (Curved) --- */}

                {/* Top Left (PDF) -> Center (300,180). 180,120 -> 300,180 */}
                <m.path
                    d={INPUT_PATHS.topLeft}
                    stroke="url(#gradInput1)"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    className="input-line"
                />
                <m.circle r="4" fill="#ef4444" className="input-particle-1" opacity="0" filter="url(#glow1)">
                    <animateMotion dur="0.8s" repeatCount="indefinite" path={INPUT_PATHS.topLeft} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                </m.circle>

                {/* Bot Left (Word) -> Center. 180,240 -> 300,180 */}
                <m.path
                    d={INPUT_PATHS.botLeft}
                    stroke="url(#gradInput2)"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    className="input-line"
                />
                <m.circle r="4" fill="#3b82f6" className="input-particle-2" opacity="0" filter="url(#glow2)">
                    <animateMotion dur="0.8s" repeatCount="indefinite" path={INPUT_PATHS.botLeft} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                </m.circle>

                {/* Top Right (Sheets) -> Center. 420,120 -> 300,180 */}
                <m.path
                    d={INPUT_PATHS.topRight}
                    stroke="url(#gradInput3)"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    className="input-line"
                />
                <m.circle r="4" fill="#10b981" className="input-particle-3" opacity="0" filter="url(#glow3)">
                    <animateMotion dur="0.8s" repeatCount="indefinite" path={INPUT_PATHS.topRight} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                </m.circle>

                {/* Bot Right (DB) -> Center. 420,240 -> 300,180 */}
                <m.path
                    d={INPUT_PATHS.botRight}
                    stroke="url(#gradInput4)"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    className="input-line"
                />
                <m.circle r="4" fill="#f59e0b" className="input-particle-4" opacity="0" filter="url(#glow4)">
                    <animateMotion dur="0.8s" repeatCount="indefinite" path={INPUT_PATHS.botRight} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                </m.circle>

                {/* --- Connector Lines to Channels (Phase 2) --- */}
                {/* From New Brain Pos (Left ~15% => 90px) to Right Cards (320px+) */}
                {/* Brain (20% of 600 = 120) - (16/2 = 8) = 112. So X=112. Y=180. */}
                {/* Card 1 (Top): 320, 120 (approx) */}
                {/* Card 2 (Mid): 320, 200 (approx) */}
                {/* Card 3 (Bot): 320, 280 (approx) */}
                <m.path d="M 112 180 C 180 180, 250 120, 320 120" stroke="url(#grad1)" strokeWidth="2" fill="none" className="connector-line opacity-0" />
                <m.path d="M 112 180 C 180 180, 250 200, 320 200" stroke="url(#grad2)" strokeWidth="2" fill="none" className="connector-line opacity-0" />
                <m.path d="M 112 180 C 180 180, 250 280, 320 280" stroke="url(#grad3)" strokeWidth="2" fill="none" className="connector-line opacity-0" />

                <defs>
                    <filter id="glow1" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="glow3" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="glow4" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>

                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#22c55e" /> {/* WhatsApp Green */}
                    </linearGradient>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3B82F6" /> {/* Web Blue */}
                    </linearGradient>
                    <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#0EA5E9" /> {/* Telegram Cyan */}
                    </linearGradient>

                    {/* Input Gradients */}
                    <linearGradient id="gradInput1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradInput2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradInput3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradInput4" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* --- Connector Lines to Channels (Phase 2) --- */}

                {/* 1. Top Line (Green) */}
                <m.path
                    d={OUTPUT_PATHS.top}
                    stroke="url(#grad1)"
                    strokeWidth="4"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    className="connector-line"
                />
                <m.circle r="3" fill="#22c55e" className="output-particle-1" opacity="0" filter="url(#glow1)">
                    <animateMotion dur="1.5s" repeatCount="indefinite" path={OUTPUT_PATHS.top} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                </m.circle>

                {/* 2. Middle Line (Blue) - Straight */}
                <m.path
                    d={OUTPUT_PATHS.mid}
                    stroke="url(#grad2)"
                    strokeWidth="4"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    className="connector-line"
                />
                <m.circle r="3" fill="#3B82F6" className="output-particle-2" opacity="0" filter="url(#glow2)">
                    <animateMotion dur="1.5s" repeatCount="indefinite" path={OUTPUT_PATHS.mid} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                </m.circle>

                {/* 3. Bottom Line (Cyan) */}
                <m.path
                    d={OUTPUT_PATHS.bot}
                    stroke="url(#grad3)"
                    strokeWidth="4"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    className="connector-line"
                />
                <m.circle r="3" fill="#0EA5E9" className="output-particle-3" opacity="0" filter="url(#glow4)">
                    <animateMotion dur="1.5s" repeatCount="indefinite" path={OUTPUT_PATHS.bot} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                </m.circle>
            </svg>

            {/* --- RIGHT: CHANNELS (Phase 2 Cards) --- */}
            {/* Moved further right (right-2), centered to Brain (top-[45%]), wider (360px) */}
            <div className="absolute right-2 top-[45%] -translate-y-1/2 flex flex-col gap-4 w-[360px] z-10">

                {/* 1. TOP: WhatsApp */}
                <ChannelCard
                    id="channel-card-0"
                    icon={<div className="w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center"><Send className="w-3 h-3 text-black" /></div>}
                    title="WhatsApp"
                    accentColor="#22c55e"
                    userMsg="¿Tienen stock del modelo X?"
                    aiMsg="Sí, quedan 3 unidades en tu talla."
                />

                {/* 2. MIDDLE: Web Chat (Hero) */}
                <ChannelCard
                    id="channel-card-1"
                    icon={<div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center"><Bot className="w-3 h-3 text-white" /></div>}
                    title="Web Support"
                    accentColor="#3B82F6"
                    userMsg="Ayuda con mi última factura."
                    aiMsg="Aquí tienes tu factura #9923."
                    isHero={true}
                />

                {/* 3. BOTTOM: Telegram */}
                <ChannelCard
                    id="channel-card-2"
                    icon={<div className="w-5 h-5 rounded-full bg-[#0EA5E9] flex items-center justify-center"><Send className="w-3 h-3 text-white pl-0.5" /></div>}
                    title="Telegram"
                    accentColor="#0EA5E9"
                    userMsg="Error 404 en el login."
                    aiMsg="Reiniciando sesión segura..."
                />
            </div>

        </div>
    );
};

const InputIcon = React.memo(({ src, alt, className, delay = 0 }: any) => (
    <div className={cn("rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-lg", className)}>
        <img src={src} alt={alt} className="w-full h-full object-contain drop-shadow-md" />
    </div>
));
InputIcon.displayName = "InputIcon";

const ChannelCard = React.memo(({ id, icon, title, accentColor, userMsg, aiMsg, isHero = false }: any) => (
    <div
        id={id}
        className={cn(
            "channel-card relative w-full bg-white/5 backdrop-blur-xl border border-white/5 rounded-xl p-3 flex flex-col gap-2 transition-colors will-change-transform",
            isHero ? "z-10 bg-white/10 border-white/10" : "z-0 scale-95 opacity-80"
        )}
    >
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            {icon}
            <span className="text-[10px] font-medium text-white/50">{title}</span>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col gap-1.5 text-[10px]">
            {/* User */}
            <div className="chat-bubble user-bubble self-end bg-white/10 text-white px-2 py-1 rounded-lg rounded-tr-none max-w-[90%]">
                {userMsg}
            </div>

            {/* AI */}
            <div className="chat-bubble ai-bubble self-start flex gap-1.5 max-w-[90%]">
                <div className="min-w-[12px] h-[12px] rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 mt-1" />
                <div className="bg-[#1a1a1a] border border-white/10 text-white/90 px-2 py-1 rounded-lg rounded-tl-none">
                    {aiMsg}
                </div>
            </div>

            {/* Upsell (Hero Only) */}
            {isHero && (
                <div className="upsell-container overflow-hidden">
                    <div className="mt-2 p-2 rounded-lg bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-500/30">
                        <p className="text-[9px] text-white/80 leading-tight mb-1.5">
                            <span className="text-violet-300 font-bold">✨ Oferta Personalizada:</span> <br />
                            Calificas para el Plan Pro con 20% OFF.
                        </p>
                        <button className="w-full py-1 bg-white text-black text-[9px] font-bold rounded-md flex items-center justify-center gap-1 hover:bg-neutral-200 transition-colors">
                            Ver Oferta <ChevronRight className="w-2.5 h-2.5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
));
ChannelCard.displayName = "ChannelCard";
