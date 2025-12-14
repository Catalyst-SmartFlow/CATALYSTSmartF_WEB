"use client";

import React, { useState, useEffect, useRef } from "react";
import { m, AnimatePresence, useInView } from "framer-motion";
import {
    MessageCircle, Globe, Calendar, Check, Send, Bot, Database, MessageSquare,
    Zap, Clock, ArrowRight, Activity, Smartphone, Search, Lock, ChevronRight,
    ChevronLeft, Store, MoreVertical, Plus, Camera, Sticker, Mic, Wifi, Battery, CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- 1. WHATSAPP UI REFINED ---

const PhoneFrame = ({ children, color }: { children: React.ReactNode, color: string }) => (
    <div className="relative w-full h-[550px] bg-black rounded-[3rem] border-[8px] border-[#121212] overflow-hidden shadow-2xl ring-1 ring-white/10">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full z-50 flex items-center justify-center gap-2 px-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#0c2f6f]/50" />
        </div>

        {/* StatusBar Time (Mock) */}
        <div className="absolute top-5 left-7 text-[10px] font-medium text-white/90 z-50">9:41</div>
        <div className="absolute top-5 right-6 flex gap-1 items-center z-50">
            {/* Signal */}
            <div className="flex items-end gap-[1px]">
                <div className="w-[2px] h-[3px] bg-white/40 rounded-[0.5px]" />
                <div className="w-[2px] h-[5px] bg-white/40 rounded-[0.5px]" />
                <div className="w-[2px] h-[7px] bg-white rounded-[0.5px]" />
                <div className="w-[2px] h-[9px] bg-white rounded-[0.5px]" />
            </div>
            {/* WiFi */}
            <Wifi className="w-3 h-3 text-white stroke-[2.5]" />
            {/* Battery */}
            <div className="w-[16px] h-[8px] border-[1px] border-white/40 rounded-[2px] p-[0.5px] relative ml-0.5">
                <div className="h-full w-[60%] bg-white rounded-[0.5px]" />
                <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[1px] h-[2.5px] bg-white/40 rounded-[0.5px]" />
            </div>
        </div>

        {/* Content */}
        <div className="w-full h-full bg-[#0b141a] flex flex-col">
            {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50" />
    </div>
);

const TypingIndicator = () => (
    <m.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="self-start max-w-[85%] bg-[#202c33] p-2 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1 w-fit"
    >
        {[0, 1, 2].map((i) => (
            <m.span
                key={i}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                className="w-1 h-1 bg-[#8696a0] rounded-full"
            />
        ))}
    </m.div>
);

const WABubble = ({ isUser, children, delay, time }: any) => (
    <m.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay, type: "spring", stiffness: 400, damping: 20 }}
        className={cn(
            "max-w-[85%] p-1.5 px-2.5 rounded-lg text-xs relative shadow-sm leading-relaxed whitespace-pre-wrap",
            isUser ? "bg-[#005c4b] self-end rounded-tr-none" : "bg-[#202c33] self-start rounded-tl-none text-white/90"
        )}
    >
        {/* Tail SVG */}
        <svg
            viewBox="0 0 8 13"
            className={cn("absolute top-0 w-1.5 h-2.5 fill-current", isUser ? "-right-1.5 text-[#005c4b]" : "-left-1.5 text-[#202c33] scale-x-[-1]")}
        >
            <path d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" />
        </svg>

        <span className="text-[#e9edef] relative z-10">{children}</span>
        <div className="flex justify-end items-center gap-0.5 mt-0.5 opacity-60">
            <span className="text-[9px]">{time}</span>
            {isUser && <span className="text-[#53bdeb] text-[9px] font-bold">✓✓</span>}
        </div>
    </m.div>
);

const PaymentBubble = () => (
    <m.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="max-w-[85%] bg-[#202c33] rounded-lg rounded-tl-none overflow-hidden shadow-md self-start mt-1"
    >
        <div className="bg-[#2a3942] p-3 flex items-center gap-3 border-b border-white/5">
            <div className="w-10 h-10 rounded-full bg-[#00a884]/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#00a884]" />
            </div>
            <div>
                <h4 className="text-white text-xs font-semibold">Pago Seguro</h4>
                <p className="text-[#8696a0] text-[10px]">Stripe / PayPal</p>
            </div>
        </div>
        <div className="p-3">
            <p className="text-[#e9edef] text-sm font-medium mb-1">Total a Pagar</p>
            <p className="text-2xl text-white font-bold mb-3">$145.00</p>
            <button className="w-full bg-[#00a884] hover:bg-[#008f6f] text-black text-xs font-bold py-2 rounded-md transition-colors flex items-center justify-center gap-2">
                <CreditCard className="w-3.5 h-3.5" />
                Pagar Ahora
            </button>
        </div>
        <div className="bg-[#182229] p-1.5 flex justify-center">
            <span className="text-[9px] text-[#8696a0]">Link expires in 15:00</span>
        </div>
    </m.div>
);

const CHAT_SCRIPT = [
    { id: 1, role: "user", text: "Hola, ¿tienen disponibilidad de las AirForce 1 en blanco?", delay: 1000 },
    { id: 2, role: "ai", text: "¡Hola! 👋 Sí, justo nos quedan los últimos 3 pares en stock. ¿Te gustaría asegurar el tuyo ahora mismo?", delay: 4000 },
    { id: 3, role: "user", text: "Sí, por favor.", delay: 7500 },
    { id: 4, role: "ai", text: "¡Perfecto! Oye, un tip rápido: 🔥 La mayoría se lleva el Kit de Limpieza Nano para que no se ensucien nunca.", delay: 11000 },
    { id: 5, role: "ai", text: "Te lo dejo con 20% de descuento si lo agregas a esta orden. ¿Lo sumamos?", delay: 14000 },
    { id: 6, role: "user", text: "Mmm... vale, agrégalo.", delay: 17500 },
    { id: 7, role: "ai", text: "¡Excelente decisión! 🎉 Tu total con el descuento es $145.", delay: 20500 },
    { id: 8, role: "ai", text: "Por favor selecciona tu forma de pago preferida: \n\n1️⃣ Efectivo (Contra entrega) \n\n2️⃣ Transferencia Bancaria \n\n3️⃣ Tarjeta de Crédito/Débito 💳", delay: 24000 },
    { id: 9, role: "user", text: "Tarjeta de Crédito 💳", delay: 28000 },
    { id: 10, role: "ai", text: "¡Entendido! Generando enlace de pago seguro... 🔒", delay: 30000 },
    { id: 11, role: "ai", type: "payment", delay: 32500 }
];

export const WhatsAppVisual = ({ color }: { color: string }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [restartTrigger, setRestartTrigger] = useState(0); // For looping
    const isInView = useInView(containerRef, { margin: "0px 0px -100px 0px" });

    useEffect(() => {
        if (!isInView) return;

        let timeouts: NodeJS.Timeout[] = [];
        setMessages([]); // Reset on start
        setIsTyping(false);

        const startSequence = () => {
            // Initial Message (User)
            timeouts.push(setTimeout(() => {
                setMessages([{ ...CHAT_SCRIPT[0], time: "10:00 AM" }]);
            }, CHAT_SCRIPT[0].delay));

            // Process rest of script
            CHAT_SCRIPT.slice(1).forEach((msg, index) => {
                // Typing indicator logic for AI messages
                if (msg.role === "ai") {
                    // Start typing earlier
                    timeouts.push(setTimeout(() => setIsTyping(true), msg.delay - 1500));
                    // Stop typing and show message
                    timeouts.push(setTimeout(() => {
                        setIsTyping(false);
                        setMessages(prev => [...prev, { ...msg, time: "10:0% AM".replace("%", (index + 1).toString()) }]);
                    }, msg.delay));
                } else {
                    // User response (simulate delay without typing indicator)
                    timeouts.push(setTimeout(() => {
                        setMessages(prev => [...prev, { ...msg, time: "10:0% AM".replace("%", (index + 1).toString()) }]);
                    }, msg.delay));
                }
            });

            // Loop: Restart after the last message + extra buffer
            const totalDuration = CHAT_SCRIPT[CHAT_SCRIPT.length - 1].delay + 6000;
            timeouts.push(setTimeout(() => {
                setRestartTrigger(prev => prev + 1);
            }, totalDuration));
        };

        startSequence();

        return () => timeouts.forEach(clearTimeout);
    }, [restartTrigger, isInView]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
        <PhoneFrame color={color}>
            {/* Chat Background Pattern */}
            <div className="absolute inset-0 bg-[url('/background/wp_132_dark.jpg')] bg-cover bg-center opacity-30 pointer-events-none" />

            {/* Chat Header */}
            <div className="bg-[#202c33] pt-12 pb-2 px-3 flex items-center gap-2 z-10 shadow-sm border-b border-[#2c3840]">
                <ChevronLeft className="w-5 h-5 text-[#00a884] -ml-1" />
                <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-black overflow-hidden border border-white/10 flex items-center justify-center">
                        <img
                            src="/catalystLogos/ICONOGRAFIA/SVG/iconografiaFONDOblanco.svg"
                            alt="Catalyst Logo"
                            className="w-full h-full object-cover scale-110"
                        />
                    </div>
                    {/* Online Status Dot */}
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#00a884] border-2 border-[#202c33] rounded-full animate-bounce-subtle" />
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-white/95 text-xs flex items-center gap-1">
                        Catalyst AI
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00a884] flex items-center justify-center text-[6px] text-black font-bold">✔</span>
                    </h4>
                    <p className="text-[9px] text-[#8696a0]">Business Account</p>
                </div>
                <div className="flex gap-4 items-center text-white/90">
                    <Store className="w-4 h-4" />
                    <Search className="w-4 h-4" />
                    <MoreVertical className="w-4 h-4" />
                </div>
            </div>

            {/* Messages Area - Custom Scrollbar (Hidden) */}
            <div
                ref={containerRef}
                className="flex-1 p-3 space-y-3 overflow-y-auto flex flex-col relative z-20 scroll-smooth no-scrollbar"
            >

                {/* Timestamp */}
                <div className="flex justify-center my-2 shrink-0">
                    <span className="bg-[#182229] text-[#8696a0] text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-md shadow-sm border border-white/5">
                        Hoy
                    </span>
                </div>

                <AnimatePresence mode="popLayout" initial={false}>
                    {messages.map((msg) => (
                        msg.type === "payment" ? (
                            <PaymentBubble key={msg.id} />
                        ) : (
                            <WABubble key={msg.id} isUser={msg.role === "user"} time={msg.time}>
                                {msg.text}
                            </WABubble>
                        )
                    ))}
                    {isTyping && <TypingIndicator key="typing" />}
                </AnimatePresence>
            </div>

            {/* Footer Input Mock (iOS Style) */}
            <div className="bg-[#202c33] p-1.5 pb-6 px-3 flex items-center gap-3 z-30 border-t border-[#2c3840]">
                <Plus className="w-5 h-5 text-[#53bdeb] stroke-[2.5]" />
                <div className="flex-1 h-8 bg-[#2a3942] rounded-full flex items-center px-3 justify-between">
                    <span className="text-[#8696a0] text-xs">Escribe un mensaje...</span>
                    <Sticker className="w-4 h-4 text-[#8696a0]" />
                </div>
                <div className="flex gap-3 items-center">
                    <Camera className="w-5 h-5 text-[#53bdeb] stroke-[2]" />
                    <div className="w-5 h-5 bg-[#00a884] rounded-full flex items-center justify-center">
                        <Mic className="w-3 h-3 text-white fill-current" />
                    </div>
                </div>
            </div>
        </PhoneFrame>
    );
};

// --- 2. OMNICHANNEL BRAIN REFINED ---

export const OmnichannelVisual = ({ color }: { color: string }) => {
    return (
        <div className="h-full w-full bg-black/50 relative overflow-hidden flex items-center justify-center">
            {/* Spinning Radar */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <m.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-[400px] h-[400px] border border-violet-500/30 rounded-full border-dashed"
                />
            </div>

            {/* Central Node */}
            <m.div
                animate={{ boxShadow: ["0 0 20px rgba(139,92,246,0)", "0 0 50px rgba(139,92,246,0.5)", "0 0 20px rgba(139,92,246,0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 bg-black border border-violet-500 rounded-full relative z-20 flex items-center justify-center shadow-2xl"
            >
                <BrainCircuitIcon />
            </m.div>

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
    <m.div
        className="absolute"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: -delay * 5 }}
        style={{ width: '300px', height: '300px' }} // Orbit path diameter
    >
        <m.div
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
        </m.div>
    </m.div>
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

export const CalendarVisual = ({ color }: { color: string }) => {
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
                <m.div
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-slate-700 via-slate-800 to-transparent rounded-full"
                />

                <div className="space-y-6">
                    <CalItem time="09:00" title="Daily Standup" type="internal" delay={0.2} />

                    {/* Hero Item (Active) */}
                    <m.div
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
                    </m.div>

                    <CalItem time="14:00" title="Review Mensual" type="internal" delay={0.4} />
                </div>
            </div>

            {/* Floating Success Card (Better Contrast) */}
            <m.div
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
            </m.div>
        </div>
    )
}

const CalItem = ({ time, title, type, delay }: any) => (
    <m.div
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
    </m.div>
)
