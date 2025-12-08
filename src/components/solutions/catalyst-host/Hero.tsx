"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Rocket, MessageCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const CatalystHostHero = () => {
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
                            <Rocket className="w-4 h-4" />
                            <span>Nuevo: El primer SO para restaurantes en WhatsApp</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                            Tu restaurante pierde dinero <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                                cada vez que WhatsApp suena
                            </span>
                            <br />
                            y nadie responde.
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                            Catalyst Host es el piloto automático que toma pedidos, gestiona reservas y usa IA para vender postres y bebidas extra (Upselling), sin que tus meseros toquen el celular.
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
                                variant="ghost"
                                size="lg"
                                className="text-slate-300 hover:text-white hover:bg-white/5 h-12 px-8 text-base"
                            >
                                Hablar con un Experto
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Column: Chat Simulator */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Phone Mockup */}
                        <div className="relative mx-auto border-gray-800 bg-gray-800 border-[12px] rounded-[2.5rem] h-[550px] w-[280px] sm:w-[320px] shadow-xl">
                            <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[15px] top-[72px] rounded-s-lg"></div>
                            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[15px] top-[124px] rounded-s-lg"></div>
                            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[15px] top-[178px] rounded-s-lg"></div>
                            <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[15px] top-[142px] rounded-e-lg"></div>
                            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-[#0b141a] relative">
                                {/* WhatsApp Header */}
                                <div className="bg-[#202c33] p-3 flex items-center gap-3 shadow-sm z-10 relative">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                                        CH
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-100 text-sm font-medium">Catalyst Host</span>
                                        <span className="text-gray-400 text-[10px]">Cuenta de empresa</span>
                                    </div>
                                </div>

                                {/* Chat Area */}
                                <div className="p-4 space-y-4 h-full overflow-hidden relative bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-opacity-5">
                                    <div className="absolute inset-0 bg-[#0b141a]/95" /> {/* Dark overlay for background pattern */}
                                    <div className="relative z-10 space-y-4">
                                        <ChatAnimation />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Upsell Notification */}
                        <UpsellNotification />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

const ChatAnimation = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            // Reset
            setStep(0);
            await new Promise(r => setTimeout(r, 1000)); // Initial pause

            // Step 1: Client Message
            setStep(1);
            await new Promise(r => setTimeout(r, 2000)); // Read time

            // Step 2: AI Response (Upsell)
            setStep(2);
            await new Promise(r => setTimeout(r, 3500)); // Read time

            // Step 3: Client Acceptance
            setStep(3);
            await new Promise(r => setTimeout(r, 2000)); // Read time

            // Step 4: Confirmation
            setStep(4);
            await new Promise(r => setTimeout(r, 5000)); // Show final state

            // Loop
            sequence();
        };

        sequence();
    }, []);

    return (
        <AnimatePresence mode="wait">
            <div className="flex flex-col space-y-4">
                {step >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        className="self-start bg-[#202c33] text-gray-100 rounded-lg rounded-tl-none p-3 max-w-[85%] shadow-sm text-sm"
                    >
                        Hola, quiero pedir una Pizza Margarita grande.
                        <span className="block text-[10px] text-gray-400 text-right mt-1">19:42</span>
                    </motion.div>
                )}

                {step >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        className="self-end bg-[#7c3aed] text-white rounded-lg rounded-tr-none p-3 max-w-[85%] shadow-sm text-sm"
                    >
                        ¡Hola! Excelente elección. 🍕 ¿Te gustaría agregar unos Palitos de Queso con salsa de ajo por solo $4.99 extra para acompañar?
                        <span className="block text-[10px] text-white/70 text-right mt-1">19:42</span>
                    </motion.div>
                )}

                {step >= 3 && (
                    <motion.div
                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        className="self-start bg-[#202c33] text-gray-100 rounded-lg rounded-tl-none p-3 max-w-[85%] shadow-sm text-sm"
                    >
                        Uff, sí. ¡Agrégalo!
                        <span className="block text-[10px] text-gray-400 text-right mt-1">19:43</span>
                    </motion.div>
                )}

                {step >= 4 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        className="self-end bg-[#7c3aed] text-white rounded-lg rounded-tr-none p-3 max-w-[85%] shadow-sm text-sm"
                    >
                        <div className="font-bold mb-1">✅ Pedido Confirmado:</div>
                        <ul className="list-disc list-inside mb-2 space-y-1 text-xs opacity-90">
                            <li>1x Pizza Margarita Grande</li>
                            <li>1x Palitos de Queso (Extra)</li>
                        </ul>
                        <div className="font-bold border-t border-white/20 pt-1 mt-1">Total: $24.98</div>
                        <div className="mt-2">¡Tu orden se envía a cocina ahora mismo! 👨‍🍳</div>
                        <span className="block text-[10px] text-white/70 text-right mt-1">19:43</span>
                    </motion.div>
                )}
            </div>
        </AnimatePresence>
    );
};

const UpsellNotification = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const sequence = async () => {
            // Sync with main animation
            await new Promise(r => setTimeout(r, 1000)); // Initial
            await new Promise(r => setTimeout(r, 2000)); // Step 1
            await new Promise(r => setTimeout(r, 3500)); // Step 2

            // Show when Step 3 (Acceptance) happens
            setShow(true);
            await new Promise(r => setTimeout(r, 3000)); // Keep visible
            setShow(false);

            await new Promise(r => setTimeout(r, 4000)); // Wait for rest of sequence

            // Loop
            sequence();
        };
        sequence();
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 20, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white text-slate-900 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-20 border border-slate-100 max-w-[200px]"
                >
                    <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Impacto</p>
                        <p className="text-sm font-bold text-slate-900">Ticket +$4.99</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CatalystHostHero;
