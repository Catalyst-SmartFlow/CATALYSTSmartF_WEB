"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const CatalystCXHero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-[#050505] pt-32 lg:pt-32 pb-20">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden">
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
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                            </span>
                            🚀 New: Catalyst CX 2.0
                        </div>

                        {/* Headline */}
                        <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                            No pierdas <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                                ni un cliente más
                            </span>
                            <br />
                            por tardar en responder.
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                            Chatbots neuronales para Web y WhatsApp que venden y atienden 24/7.
                            Instálalo en minutos y detén la fuga de capital.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-105"
                            >
                                Ver Demo en Vivo
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <a href="#pricing">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-slate-700 text-slate-300 bg-transparent hover:text-white hover:bg-slate-800"
                                >
                                    Ver Planes
                                </Button>
                            </a>
                        </div>

                        {/* Social Proof */}
                        <div className="pt-4 border-t border-white/5 w-full">
                            <p className="text-sm text-slate-500 mb-4">Confían en nosotros:</p>
                            <div className="flex flex-wrap gap-x-6 gap-y-4 items-center">
                                {[
                                    {
                                        name: 'Espiral',
                                        src: '/partners/EspiralEdu.png',
                                        className: "opacity-60 grayscale group-hover/logo:grayscale-0 group-hover/logo:opacity-100"
                                    },
                                    {
                                        name: 'Indoamerica',
                                        src: '/partners/UniversidadIndoamerica.png',
                                        className: "opacity-50 brightness-0 invert group-hover/logo:brightness-100 group-hover/logo:invert-0 group-hover/logo:opacity-100"
                                    },
                                    {
                                        name: 'Nuevo Ecuador',
                                        src: '/partners/el-nuevo-ecuador-logo.svg',
                                        className: "opacity-50 brightness-0 invert group-hover/logo:brightness-100 group-hover/logo:invert-0 group-hover/logo:opacity-100"
                                    }
                                ].map((logo, i) => (
                                    <div key={i} className="relative h-8 lg:h-12 w-auto min-w-[100px] lg:min-w-[120px] group/logo">
                                        <Image
                                            src={logo.src}
                                            alt={logo.name}
                                            fill
                                            className={`object-contain object-left transition-all duration-500 ${logo.className}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Chat Simulator */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
                            {/* Chat Header */}
                            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                <div className="ml-4 flex items-center gap-2">
                                    <span className="text-sm font-medium text-slate-400">Catalyst Assistant</span>
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                                        </span>
                                        <span className="text-[10px] font-medium text-green-400">En línea</span>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 p-4 space-y-4">
                                <ChatSequence />
                            </div>

                            {/* Input Area Mockup */}
                            <div className="p-3 border-t border-white/5 bg-white/5">
                                <div className="h-10 bg-white/5 rounded-lg w-full animate-pulse" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

const ChatSequence = dynamic(() => import("./ChatSequence"), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-white/5 animate-pulse rounded-lg" />
});

export default CatalystCXHero;
