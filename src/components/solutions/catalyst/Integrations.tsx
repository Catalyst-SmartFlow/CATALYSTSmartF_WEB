"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import Image from "next/image";

const inputs = [
    { name: "WhatsApp", logo: "/integratorsLogos/whatsapp-seeklogo.svg" },
    { name: "Telegram", logo: "/integratorsLogos/Telegram_logo.svg" },
    { name: "WordPress", logo: "/integratorsLogos/wordpress-seeklogo.svg" },
    { name: "Shopify", logo: "/integratorsLogos/shopify-seeklogo.svg" },
];

const outputs = [
    { name: "HubSpot", logo: "/integratorsLogos/hubspot-1.svg" },
    { name: "Google Sheets", logo: "/integratorsLogos/google-sheets-logo-icon.svg" },
    { name: "Slack", logo: "/integratorsLogos/slack-new-logo.svg" },
    { name: "Stripe", logo: "/integratorsLogos/stripe-seeklogo.svg" },
];

const Integrations = () => {
    return (
        <section className="w-full min-h-screen bg-[#050505] py-24 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
                    >
                        Vende donde están <span className="text-indigo-400">tus clientes</span>.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
                    >
                        Una sola mente conectada a tus canales de mayor tráfico y tus herramientas de gestión.
                    </motion.p>
                </div>

                {/* Main Interaction Stage */}
                <div className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0 items-center">

                    {/* Desktop SVG Connections Layer */}
                    <div className="hidden lg:block absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 1400 550" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(99, 102, 241, 0.1)" />
                                    <stop offset="50%" stopColor="rgba(99, 102, 241, 0.5)" />
                                    <stop offset="100%" stopColor="rgba(99, 102, 241, 0.1)" />
                                </linearGradient>
                            </defs>

                            {/* Left to Center Connections */}
                            {[0, 1, 2, 3].map((i) => {
                                const yStart = 60 + i * 144; // Aligned with box centers (approx 550 height)
                                const yEnd = 275; // Center of container
                                return (
                                    <ConnectionLine
                                        key={`left-${i}`}
                                        d={`M 420 ${yStart} C 550 ${yStart}, 550 ${yEnd}, 620 ${yEnd}`}
                                        delay={i * 0.2}
                                    />
                                );
                            })}

                            {/* Center to Right Connections */}
                            {[0, 1, 2, 3].map((i) => {
                                const yStart = 275; // Center of container
                                const yEnd = 60 + i * 144; // Aligned with box centers
                                return (
                                    <ConnectionLine
                                        key={`right-${i}`}
                                        d={`M 780 ${yStart} C 850 ${yStart}, 850 ${yEnd}, 980 ${yEnd}`}
                                        delay={0.5 + i * 0.2}
                                    />
                                );
                            })}
                        </svg>
                    </div>

                    {/* Left Column: Inputs */}
                    <div className="flex flex-col gap-8 items-center lg:items-end lg:pr-12 relative z-20">
                        {inputs.map((item, i) => (
                            <IntegrationCard key={item.name} item={item} index={i} side="left" />
                        ))}
                    </div>

                    {/* Center Column: The Core */}
                    <div className="flex flex-col items-center justify-center relative z-20 my-12 lg:my-0">
                        <div className="relative">
                            {/* Pulsing Rings */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 bg-indigo-500/30 rounded-full blur-xl"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl"
                            />

                            {/* Core Orb */}
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center relative shadow-[0_0_50px_rgba(99,102,241,0.3)] z-10 backdrop-blur-sm">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-indigo-500/10 to-transparent" />
                                <BrainCircuit className="w-16 h-16 text-indigo-400" />
                            </div>

                            {/* Label */}
                            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
                                <span className="text-indigo-400 font-semibold tracking-wider text-sm uppercase">Catalyst Core</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Outputs */}
                    <div className="flex flex-col gap-8 items-center lg:items-start lg:pl-12 relative z-20">
                        {outputs.map((item, i) => (
                            <IntegrationCard key={item.name} item={item} index={i} side="right" />
                        ))}
                    </div>

                </div>

                {/* Footer Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <p className="text-slate-500 text-sm font-medium tracking-wide">
                        Y conecta con <span className="text-indigo-400 font-bold">+150 herramientas</span> más de tu ecosistema.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

const ConnectionLine = ({ d, delay }: { d: string; delay: number }) => {
    return (
        <>
            {/* Base Line */}
            <path d={d} stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />

            {/* Animated Flow Line */}
            <motion.path
                d={d}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay, ease: "easeInOut" }}
            />

            {/* Moving Particle */}
            <motion.circle r="3" fill="#818cf8">
                <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path={d}
                    rotate="auto"
                />
            </motion.circle>
        </>
    );
};

const IntegrationCard = ({ item, index, side }: { item: { name: string; logo: string }; index: number; side: "left" | "right" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative w-28 h-28 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl flex items-center justify-center hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all duration-300 cursor-default"
        >
            <div className="relative w-14 h-14 transition-all duration-300">
                <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    className="object-contain"
                />
            </div>

            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 rounded-xl bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.div>
    );
};

export default Integrations;
