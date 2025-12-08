"use client";

import React from "react";
import dynamic from "next/dynamic";
import { m as motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const IntegrationsBackground = dynamic(() => import("./IntegrationsBackground"), { ssr: false });
const CoreOrb = dynamic(() => import("./CoreOrb"), { ssr: false });

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
    const [isMobile, setIsMobile] = React.useState(false);
    const [currentInputIndex, setCurrentInputIndex] = React.useState(0);
    const [currentOutputIndex, setCurrentOutputIndex] = React.useState(0);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Cycle logos on mobile
    React.useEffect(() => {
        if (!isMobile) return;

        const interval = setInterval(() => {
            setCurrentInputIndex((prev) => (prev + 1) % inputs.length);
            setCurrentOutputIndex((prev) => (prev + 1) % outputs.length);
        }, 3000); // 3 seconds per logo

        return () => clearInterval(interval);
    }, [isMobile]);

    return (
        <section className="w-full min-h-screen bg-[#050505] py-24 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 lg:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight"
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
                {isMobile ? (
                    // MOBILE LAYOUT: Horizontal Flow (Input -> Core -> Output)
                    <div className="flex items-start justify-between gap-2 max-w-md mx-auto relative py-10">

                        {/* Connecting Line Background - Aligned with Card Centers (top-20 = py-10 + half card height) */}
                        <div className="absolute top-20 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent -translate-y-1/2 z-0" />

                        {/* Animated Data Packet (The "Data Flow") - Aligned & Full Path */}
                        <motion.div
                            className="absolute top-20 -translate-y-1/2 z-10 pointer-events-none flex items-center"
                            animate={{
                                left: ["10%", "50%", "50%", "90%"], // Exact centers: 10% (Input) -> 50% (Core) -> 90% (Output)
                                opacity: [0, 1, 0, 1, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                times: [0, 0.4, 0.5, 0.9, 1],
                                ease: "easeInOut"
                            }}
                        >
                            {/* Comet Head */}
                            <div className="relative w-4 h-4 bg-white rounded-full shadow-[0_0_25px_rgba(255,255,255,0.8),0_0_10px_rgba(99,102,241,1)] z-20">
                                <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-75" />
                            </div>

                            {/* Comet Tail */}
                            <div className="absolute right-2 w-12 h-1 bg-gradient-to-l from-indigo-500 to-transparent opacity-80 blur-[1px]" />
                        </motion.div>

                        {/* Left: Input (Stack Representation) */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative z-10 flex flex-col items-center gap-2 w-20"
                        >
                            <div className="w-20 h-20 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden group">
                                <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                {/* Carousel of Inputs */}
                                <div className="relative w-10 h-10 flex items-center justify-center">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={inputs[currentInputIndex].name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={inputs[currentInputIndex].logo}
                                                alt={inputs[currentInputIndex].name}
                                                fill
                                                className="object-contain"
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Inputs</span>
                        </motion.div>

                        {/* Center: Core - Wrapped to match height */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative z-20 w-20 h-20 flex items-center justify-center"
                        >
                            <div className="scale-75">
                                <CoreOrb />
                            </div>
                        </motion.div>

                        {/* Right: Output (Stack Representation) */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative z-10 flex flex-col items-center gap-2 w-20"
                        >
                            <div className="w-20 h-20 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden group">
                                <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                {/* Carousel of Outputs */}
                                <div className="relative w-10 h-10 flex items-center justify-center">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={outputs[currentOutputIndex].name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={outputs[currentOutputIndex].logo}
                                                alt={outputs[currentOutputIndex].name}
                                                fill
                                                className="object-contain"
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Outputs</span>
                        </motion.div>

                    </div>
                ) : (
                    // DESKTOP LAYOUT
                    <div className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0 items-center">
                        {/* Desktop SVG Connections Layer */}
                        <IntegrationsBackground />

                        {/* Left Column: Inputs */}
                        <div className="flex flex-col gap-8 items-center lg:items-end lg:pr-12 relative z-20">
                            {inputs.map((item, i) => (
                                <IntegrationCard key={item.name} item={item} index={i} side="left" />
                            ))}
                        </div>

                        {/* Center Column: The Core */}
                        <div className="flex flex-col items-center justify-center relative z-20 my-12 lg:my-0">
                            <div className="relative">
                                <CoreOrb />
                            </div>
                        </div>

                        {/* Right Column: Outputs */}
                        <div className="flex flex-col gap-8 items-center lg:items-start lg:pl-12 relative z-20">
                            {outputs.map((item, i) => (
                                <IntegrationCard key={item.name} item={item} index={i} side="right" />
                            ))}
                        </div>
                    </div>
                )}

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
