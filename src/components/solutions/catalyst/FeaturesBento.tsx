"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { m as motion, useAnimation } from "framer-motion";
import { Brain, MessageCircle, Smartphone, BarChart3, User, Bot } from "lucide-react";

// Minimalist & Proportional Neural Network - Lazy Loaded
const NeuralNetworkVisual = dynamic(() => import("./NeuralNetworkVisual"), {
    ssr: false,
    loading: () => <div className="absolute inset-0 w-full h-full bg-white/5 animate-pulse" />
});

export default function FeaturesBento() {
    return (
        <section className="py-24 px-4 md:px-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[#050505]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4 pb-2">
                        Inteligencia que evoluciona
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto">
                        Más que un chatbot, una suite de herramientas cognitivas diseñadas para escalar.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px]">

                    {/* 1. CAJA GRANDE (Destacada): "Cerebro Neural" */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-colors duration-300"
                    >

                        {/* Abstract Visual: Full Card Layered Neural Network */}
                        <NeuralNetworkVisual />

                        <div className="absolute bottom-0 left-0 p-8 w-full pointer-events-none">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-md">
                                    <Brain className="w-5 h-5 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">Cerebro Neural</h3>
                            </div>
                            <p className="text-white/60">Entiende contexto, no palabras clave. Una IA que lee entre líneas.</p>
                        </div>
                    </motion.div>

                    {/* 4. CAJA ALTA (Reports) - Right Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="md:col-span-1 md:row-span-2 group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-colors duration-300 flex flex-col"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="p-8 flex-1 flex flex-col relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">ROI en Tiempo Real</h3>
                            </div>
                            <p className="text-white/60 mb-8">Mira cuánto dinero te ha generado el bot.</p>

                            {/* Visual: Premium Growth Chart */}
                            <div className="flex-1 flex items-end justify-between gap-3 px-2 pb-4 relative z-10">
                                {/* Grid Lines (Background) */}
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                                    <div className="w-full h-[1px] bg-white border-t border-dashed border-white/50" />
                                    <div className="w-full h-[1px] bg-white border-t border-dashed border-white/50" />
                                    <div className="w-full h-[1px] bg-white border-t border-dashed border-white/50" />
                                    <div className="w-full h-[1px] bg-white border-t border-dashed border-white/50" />
                                </div>

                                {[35, 60, 45, 75, 55, 90].map((height, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: "0%" }}
                                        whileInView={{ height: `${height}%` }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 1.5,
                                            delay: 0.2 + (i * 0.1),
                                            ease: "easeOut"
                                        }}
                                        className="w-full rounded-t-lg relative group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-shadow duration-500"
                                    >
                                        {/* Bar Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-emerald-500/60 rounded-t-lg" />

                                        {/* Top Line Highlight */}
                                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

                                        {/* Live Fluctuation Animation */}
                                        <motion.div
                                            animate={{ height: [`${height}%`, `${height + (Math.random() * 10 - 5)}%`, `${height}%`] }}
                                            transition={{
                                                duration: 2 + Math.random(),
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: 1.5 + (i * 0.2)
                                            }}
                                            className="absolute inset-0 bg-emerald-500/0"
                                        />

                                        {i === 5 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                                whileInView={{ opacity: 1, y: -35, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 1.5, type: "spring" }}
                                                className="absolute left-1/2 -translate-x-1/2 bg-emerald-500 text-[#050505] text-xs font-bold px-2.5 py-1 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] whitespace-nowrap z-20"
                                            >
                                                +128%
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-500 rotate-45" />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. CAJA MEDIA (Omnichannel) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="md:col-span-1 group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-colors duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="h-full p-8 flex flex-col justify-between relative z-10">
                            {/* Visual: Premium Omni-Channel Flow */}
                            <div className="flex items-center justify-between px-2 py-6 relative">
                                {/* Connecting Path (Background) */}
                                <div className="absolute left-14 right-14 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-blue-500/20 to-[#25D366]/20" />

                                {/* Web/Device Node */}
                                <div className="relative group/web z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                        <Smartphone className="w-7 h-7 text-blue-400" />
                                    </div>
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-400/50 tracking-wider uppercase">Web</div>
                                </div>

                                {/* Traveling Message Bubble */}
                                <div className="absolute left-14 right-14 top-1/2 -translate-y-1/2 h-8 pointer-events-none z-20">
                                    <motion.div
                                        initial={{ left: "0%", opacity: 0, scale: 0.5 }}
                                        animate={{
                                            left: ["0%", "90%"],
                                            opacity: [0, 1, 1, 0],
                                            scale: [0.5, 1, 1, 0.5]
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            repeatDelay: 0.5
                                        }}
                                        className="absolute top-1/2 -translate-y-1/2"
                                    >
                                        <div className="px-3 py-1.5 rounded-full bg-white text-black text-[10px] font-bold shadow-[0_0_10px_rgba(255,255,255,0.3)] flex items-center gap-1.5 whitespace-nowrap">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                            Hola!
                                        </div>
                                    </motion.div>
                                </div>

                                {/* WhatsApp Node */}
                                <div className="relative group/wa z-10">
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2.5, repeat: Infinity, times: [0.8, 0.9, 1], repeatDelay: 0.5 }}
                                        className="w-14 h-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center border border-[#25D366]/20 shadow-[0_0_15px_rgba(37,211,102,0.1)]"
                                    >
                                        <MessageCircle className="w-7 h-7 text-[#25D366]" />
                                    </motion.div>

                                    {/* Notification Badge */}
                                    <motion.div
                                        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1, 0] }}
                                        transition={{ duration: 2.5, repeat: Infinity, times: [0.8, 0.85, 0.95, 1], repeatDelay: 0.5 }}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-2 border-[#050505] flex items-center justify-center z-20 shadow-[0_0_15px_rgba(239,68,68,0.6)]"
                                    >
                                        <span className="text-[10px] font-bold text-white">1</span>
                                    </motion.div>

                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#25D366]/50 tracking-wider uppercase">WhatsApp</div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-xl font-semibold text-white mb-1">Omnicanalidad</h3>
                                <p className="text-white/60 text-sm">Te hablan por web, siguen por WhatsApp.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 3. CAJA CUADRADA (Human Mode) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="md:col-span-1 group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-colors duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="h-full p-8 flex flex-col justify-between relative z-10">
                            {/* Visual: Advanced Toggle */}
                            <div className="flex flex-col items-center justify-center py-2 flex-1">
                                <div className="relative w-48 h-16 bg-black/40 rounded-full p-1.5 border border-white/10 flex items-center justify-start shadow-inner overflow-hidden">

                                    {/* Background Labels */}
                                    <div className="absolute inset-0 flex justify-between px-6 items-center text-xs font-bold tracking-wider text-white/20 uppercase pointer-events-none z-0">
                                        <span className="flex items-center gap-2">
                                            <Bot className="w-3 h-3" /> AI
                                        </span>
                                        <span className="flex items-center gap-2">
                                            HUMAN <User className="w-3 h-3" />
                                        </span>
                                    </div>

                                    {/* Sliding Knob */}
                                    <motion.div
                                        animate={{
                                            x: [0, 85, 85, 0, 0],
                                            backgroundColor: ["#A855F7", "#F97316", "#F97316", "#A855F7", "#A855F7"]
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            times: [0, 0.1, 0.5, 0.6, 1],
                                            repeatDelay: 1
                                        }}
                                        className="w-20 h-full rounded-full shadow-lg flex items-center justify-center z-10 relative"
                                    >
                                        <motion.div
                                            animate={{ opacity: [1, 0, 0, 1, 1] }}
                                            transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.5, 0.6, 1], repeatDelay: 1 }}
                                            className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs gap-1"
                                        >
                                            <Bot className="w-4 h-4" /> AUTO
                                        </motion.div>

                                        <motion.div
                                            animate={{ opacity: [0, 1, 1, 0, 0] }}
                                            transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.5, 0.6, 1], repeatDelay: 1 }}
                                            className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs gap-1"
                                        >
                                            MANUAL <User className="w-4 h-4" />
                                        </motion.div>
                                    </motion.div>
                                </div>

                                {/* Status Indicator */}
                                <motion.div
                                    className="mt-4 text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 relative flex items-center justify-center"
                                    animate={{
                                        color: ["#A855F7", "#F97316", "#F97316", "#A855F7", "#A855F7"],
                                        borderColor: ["rgba(168,85,247,0.2)", "rgba(249,115,22,0.2)", "rgba(249,115,22,0.2)", "rgba(168,85,247,0.2)", "rgba(168,85,247,0.2)"]
                                    }}
                                    transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.5, 0.6, 1], repeatDelay: 1 }}
                                >
                                    <motion.span
                                        animate={{ opacity: [1, 0, 0, 1, 1] }}
                                        transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.5, 0.6, 1], repeatDelay: 1 }}
                                    >
                                        ● AI PILOT ACTIVE
                                    </motion.span>
                                    <motion.span
                                        className="absolute inset-0 flex items-center justify-center w-full h-full"
                                        animate={{ opacity: [0, 1, 1, 0, 0] }}
                                        transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.5, 0.6, 1], repeatDelay: 1 }}
                                    >
                                        ● HUMAN CONTROL
                                    </motion.span>
                                </motion.div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-white mb-1">Modo Humano</h3>
                                <p className="text-white/60 text-sm">Toma el control del chat cuando quieras.</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
