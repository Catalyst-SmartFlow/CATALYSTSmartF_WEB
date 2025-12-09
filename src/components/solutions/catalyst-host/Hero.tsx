"use client";

import React, { useState, useEffect } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, MessageCircle, CheckCircle2, DollarSign, Calendar, Flame, Wifi, Battery, Signal, Plus, StickyNote, Camera, Mic, Video, Phone, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

const scenes = [
    {
        id: 1,
        client: "¿Tienen las Jordan en talla 42?",
        ai: "¡Sí! Nos quedan 2 pares. 👟 ¿Te las reservo o prefieres ver las de edición limitada?",
        client2: "¡Las quiero! Resérvalas.",
        popup: { icon: DollarSign, text: "Venta Cerrada", color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-l-emerald-500" }
    },
    {
        id: 2,
        client: "Quiero pedir una Doble Cheese.",
        ai: "¡Buena elección! 🍔 ¿Te gustaría hacerla combo con papas y bebida por solo $3 extra?",
        client2: "Dale, con todo.",
        popup: { icon: DollarSign, text: "Ticket +30%", color: "text-blue-400", bg: "bg-blue-500/20", border: "border-l-blue-500" }
    },
    {
        id: 3,
        client: "Precio del depa en el centro.",
        ai: "Desde $120k. 🏢 ¿Buscas para inversión o para vivir? Te envío el catálogo.",
        client2: "Inversión. Envíame info.",
        popup: { icon: Flame, text: "Lead Calificado", color: "text-orange-400", bg: "bg-orange-500/20", border: "border-l-orange-500" }
    }
];

const CatalystHostHero = () => {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [step, setStep] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        let mounted = true;

        const runSequence = async () => {
            if (!mounted) return;

            // Reset step for new scene
            setStep(0);
            setIsTyping(false);

            // Step 1: Client Message (0.5s)
            await new Promise(r => setTimeout(r, 500));
            if (!mounted) return;
            setStep(1);

            // Typing Indicator (0.5s delay before typing starts)
            await new Promise(r => setTimeout(r, 500));
            if (!mounted) return;
            setIsTyping(true);

            // Step 2: AI Message (Typing for 1.5s)
            await new Promise(r => setTimeout(r, 1500));
            if (!mounted) return;
            setIsTyping(false);
            setStep(2);

            // Step 3: Client 2 Message (1.5s)
            await new Promise(r => setTimeout(r, 1500));
            if (!mounted) return;
            setStep(3);

            // Step 4: Popup (1.0s)
            await new Promise(r => setTimeout(r, 1000));
            if (!mounted) return;
            setStep(4);

            // Wait before next scene (Total ~5s)
            await new Promise(r => setTimeout(r, 3000));
            if (!mounted) return;

            // Next scene
            setCurrentSceneIndex((prev) => (prev + 1) % scenes.length);
        };

        runSequence();

        return () => { mounted = false; };
    }, [currentSceneIndex]);

    const currentScene = scenes[currentSceneIndex];
    const PopupIcon = currentScene.popup.icon;

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-[#050505] pt-24 lg:pt-24 pb-20 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] opacity-30 animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-30 animate-pulse delay-1000" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Copy & CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-start space-y-6"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                            <Zap className="w-4 h-4" />
                            <span>El sistema operativo para vender en WhatsApp</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                            Deja de perder clientes <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                                por no responder a tiempo.
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                            Automatiza tus ventas, agenda citas y califica leads en piloto automático. Ya sea que vendas autos, ropa o servicios, Catalyst Host cierra tratos mientras tú duermes.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
                            <Button
                                size="lg"
                                className="bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-105 h-12 px-8 text-base"
                            >
                                Ver Demo Interactiva
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white h-12 px-8 text-base bg-transparent"
                            >
                                Ver Planes
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Column: Chat Simulator */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative perspective-1000"
                    >
                        {/* Floating Animation Wrapper */}
                        <motion.div
                            className="relative"
                        >
                            {/* Phone Mockup */}
                            <div className="relative mx-auto border-gray-800 bg-gray-800 border-[12px] rounded-[2.5rem] h-[550px] w-[280px] sm:w-[320px] shadow-[0_0_50px_-12px_rgba(139,92,246,0.5)] overflow-hidden ring-1 ring-white/10 font-sans">
                                {/* Screen Glare */}
                                <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-50 rounded-[2rem]" />

                                {/* Physical Buttons */}
                                <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[15px] top-[72px] rounded-s-lg shadow-sm"></div>
                                <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[15px] top-[124px] rounded-s-lg shadow-sm"></div>
                                <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[15px] top-[178px] rounded-s-lg shadow-sm"></div>
                                <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[15px] top-[142px] rounded-e-lg shadow-sm"></div>

                                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-[#0b141a] relative flex flex-col">

                                    {/* Status Bar & Notch */}
                                    <div className="bg-[#202c33] px-6 py-2 flex items-center justify-between text-white text-[10px] z-30 relative h-8">
                                        <span className="font-medium w-8">19:42</span>
                                        {/* Notch */}
                                        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-xl z-40 flex items-center justify-center">
                                            <div className="w-10 h-1 bg-gray-800 rounded-full opacity-50" />
                                        </div>
                                        <div className="flex items-center gap-1.5 w-8 justify-end">
                                            <Signal className="w-3 h-3" />
                                            <Wifi className="w-3 h-3" />
                                            <Battery className="w-3 h-3" />
                                        </div>
                                    </div>

                                    {/* WhatsApp Header */}
                                    <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between border-b border-white/5 relative z-20">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                                                AI
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-100">Catalyst Agent</div>
                                                <div className="text-xs text-emerald-500 font-medium flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                    En línea
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 text-gray-400">
                                            <Video size={18} strokeWidth={1.5} className="hover:text-white transition-colors cursor-pointer" />
                                            <Phone size={18} strokeWidth={1.5} className="hover:text-white transition-colors cursor-pointer" />
                                            <MoreVertical size={18} strokeWidth={1.5} className="hover:text-white transition-colors cursor-pointer" />
                                        </div>
                                    </div>

                                    {/* Chat Area */}
                                    <div className="flex-1 p-4 space-y-4 overflow-hidden relative bg-[#0b141a] flex flex-col">

                                        <div className="relative z-10 space-y-4 h-full flex flex-col justify-start">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={currentScene.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="flex flex-col space-y-4 w-full"
                                                >
                                                    {/* Client Message */}
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                                                        animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -20, scale: step >= 1 ? 1 : 0.9 }}
                                                        className="self-start bg-[#202c33] text-gray-100 rounded-lg rounded-tl-none px-3 py-2 max-w-[85%] shadow-sm text-sm"
                                                    >
                                                        {currentScene.client}
                                                        <span className="block text-[10px] text-gray-500 text-right mt-1">19:42</span>
                                                    </motion.div>

                                                    {/* AI Typing Indicator */}
                                                    {isTyping && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.9 }}
                                                            className="self-end bg-[#005c4b]/50 backdrop-blur-sm text-white rounded-lg rounded-tr-none px-3 py-2 shadow-sm"
                                                        >
                                                            <div className="flex gap-1">
                                                                <motion.div
                                                                    animate={{ y: [0, -5, 0] }}
                                                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                                                    className="w-1.5 h-1.5 bg-white/60 rounded-full"
                                                                />
                                                                <motion.div
                                                                    animate={{ y: [0, -5, 0] }}
                                                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                                                    className="w-1.5 h-1.5 bg-white/60 rounded-full"
                                                                />
                                                                <motion.div
                                                                    animate={{ y: [0, -5, 0] }}
                                                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                                                    className="w-1.5 h-1.5 bg-white/60 rounded-full"
                                                                />
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* AI Message */}
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                                        animate={{ opacity: step >= 2 ? 1 : 0, x: step >= 2 ? 0 : 20, scale: step >= 2 ? 1 : 0.9 }}
                                                        className="self-end bg-[#005c4b] text-white rounded-lg rounded-tr-none px-3 py-2 max-w-[85%] shadow-sm text-sm"
                                                    >
                                                        {currentScene.ai}
                                                        <span className="block text-[10px] text-white/60 text-right mt-1">19:42</span>
                                                    </motion.div>

                                                    {/* Client 2 Message */}
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                                                        animate={{ opacity: step >= 3 ? 1 : 0, x: step >= 3 ? 0 : -20, scale: step >= 3 ? 1 : 0.9 }}
                                                        className="self-start bg-[#202c33] text-gray-100 rounded-lg rounded-tl-none px-3 py-2 max-w-[85%] shadow-sm text-sm"
                                                    >
                                                        {currentScene.client2}
                                                        <span className="block text-[10px] text-gray-500 text-right mt-1">19:43</span>
                                                    </motion.div>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    {/* Input Area */}
                                    <div className="bg-[#202c33] px-3 py-2 flex items-center gap-2 border-t border-white/5 z-20 relative">
                                        <div className="p-1.5 text-gray-400 hover:text-gray-300 cursor-pointer">
                                            <div className="w-6 h-6 rounded-full border-2 border-gray-500/50" />
                                        </div>
                                        <div className="flex-1 bg-[#2a3942] h-9 rounded-full px-4 flex items-center text-gray-400 text-sm font-normal">
                                            Escribe un mensaje...
                                        </div>
                                        <div className="p-2 bg-[#00a884] rounded-full hover:bg-[#008f6f] transition-colors cursor-pointer shadow-lg">
                                            <div className="w-4 h-4 text-white flex items-center justify-center">
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                                    <path d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dynamic Shadow */}
                            <motion.div
                                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/40 blur-xl rounded-full z-[-1]"
                            />

                            {/* Popup Notification - Outside Phone */}
                            <AnimatePresence>
                                {step >= 4 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                        className={`absolute right-2 sm:-right-12 bottom-32 bg-gray-900/90 backdrop-blur-md border border-white/10 ${currentScene.popup.border} border-l-4 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-20 max-w-[200px]`}
                                    >
                                        <div className={`${currentScene.popup.bg} p-2 rounded-full`}>
                                            <PopupIcon className={`w-5 h-5 ${currentScene.popup.color}`} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Impacto</p>
                                            <p className="text-sm font-bold text-white">{currentScene.popup.text}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default CatalystHostHero;
