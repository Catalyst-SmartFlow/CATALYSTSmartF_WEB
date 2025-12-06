"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Brain, MessageCircle, Smartphone, BarChart3 } from "lucide-react";

// Layered Neural Network Visualization
const LayeredNeuralNetwork = () => {
    // Define layers and nodes
    const layers = [
        { id: 0, nodes: [1, 2, 3], x: 20 },   // Input Layer
        { id: 1, nodes: [4, 5, 6, 7], x: 50 }, // Hidden Layer
        { id: 2, nodes: [8, 9, 10], x: 80 },  // Output Layer
    ];

    // Generate connections (fully connected between adjacent layers)
    const connections: { id: string; x1: number; y1: number; x2: number; y2: number }[] = [];

    layers.forEach((layer, layerIndex) => {
        if (layerIndex < layers.length - 1) {
            const nextLayer = layers[layerIndex + 1];
            layer.nodes.forEach((nodeId, nodeIndex) => {
                // Distribute vertically in the top 60% of the container (y=15 to y=65)
                const y1 = 20 + (nodeIndex * (40 / (layer.nodes.length - 1 || 1)));

                nextLayer.nodes.forEach((nextNodeId, nextNodeIndex) => {
                    const y2 = 20 + (nextNodeIndex * (40 / (nextLayer.nodes.length - 1 || 1)));
                    connections.push({
                        id: `${nodeId}-${nextNodeId}`,
                        x1: layer.x,
                        y1: y1,
                        x2: nextLayer.x,
                        y2: y2,
                    });
                });
            });
        }
    });

    // Calculate node positions for rendering circles
    const nodePositions = layers.flatMap((layer) =>
        layer.nodes.map((nodeId, index) => ({
            id: nodeId,
            x: layer.x,
            y: 20 + (index * (40 / (layer.nodes.length - 1 || 1))),
        }))
    );

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Gradient Mask to fade out bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]/80 z-10" />

            <svg className="w-full h-full opacity-90" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(168, 85, 247, 0.1)" />
                        <stop offset="50%" stopColor="rgba(168, 85, 247, 0.4)" />
                        <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Connections */}
                {connections.map((conn, i) => (
                    <motion.line
                        key={conn.id}
                        x1={`${conn.x1}%`}
                        y1={`${conn.y1}%`}
                        x2={`${conn.x2}%`}
                        y2={`${conn.y2}%`}
                        stroke="url(#neural-gradient)"
                        strokeWidth="0.3"
                        initial={{ opacity: 0.1 }}
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{
                            duration: 2 + Math.random(),
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}

                {/* Signals traveling forward */}
                {connections.map((conn, i) => (
                    <motion.circle
                        key={`signal-${conn.id}`}
                        r="0.5"
                        fill="#fff"
                        filter="url(#glow)"
                        initial={{ offsetDistance: "0%" }}
                        animate={{
                            cx: [`${conn.x1}%`, `${conn.x2}%`],
                            cy: [`${conn.y1}%`, `${conn.y2}%`],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "linear",
                            repeatDelay: 0.5
                        }}
                    />
                ))}

                {/* Nodes */}
                {nodePositions.map((node) => (
                    <motion.circle
                        key={node.id}
                        cx={`${node.x}%`}
                        cy={`${node.y}%`}
                        r="1.8"
                        fill="#050505"
                        stroke="#A855F7"
                        strokeWidth="0.8"
                        filter="url(#glow)"
                        animate={{ scale: [1, 1.1, 1], strokeOpacity: [0.5, 1, 0.5] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: Math.random(),
                        }}
                    />
                ))}
            </svg>
        </div>
    );
};

export default function FeaturesBento() {
    return (
        <section className="py-24 px-4 md:px-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[#050505]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
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
                        <LayeredNeuralNetwork />

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

                            {/* Visual: Growth Chart */}
                            <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-4">
                                {[40, 65, 45, 80, 60, 95].map((height, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: "5%" }}
                                        whileInView={{ height: `${height}%` }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 1.2,
                                            delay: 0.2 + (i * 0.1),
                                            type: "spring",
                                            stiffness: 50,
                                            damping: 15
                                        }}
                                        className="w-full bg-white/10 rounded-t-sm relative group-hover:bg-emerald-500/30 transition-colors duration-500"
                                    >
                                        {i === 5 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 1.2, type: "spring" }}
                                                className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-bold px-2 py-1 rounded shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                                            >
                                                +128%
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
                            {/* Visual: Flow */}
                            <div className="flex items-center justify-between px-2 py-6">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/5 shadow-inner">
                                    <Smartphone className="w-6 h-6 text-white/80" />
                                </div>

                                {/* Connecting Line with Particle */}
                                <div className="flex-1 h-[2px] bg-white/10 mx-4 relative overflow-hidden rounded-full">
                                    <motion.div
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent w-1/2 blur-[1px]"
                                    />
                                </div>

                                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center border border-[#25D366]/20 shadow-[0_0_15px_rgba(37,211,102,0.1)]">
                                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                                </div>
                            </div>

                            <div>
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
                            {/* Visual: Toggle */}
                            <div className="flex justify-center py-4">
                                <div className="relative w-36 h-14 bg-black/40 rounded-full p-1.5 border border-white/10 flex items-center shadow-inner">
                                    <motion.div
                                        animate={{ x: [0, 88, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                                        className="w-11 h-11 bg-gradient-to-b from-white to-gray-300 rounded-full shadow-lg flex items-center justify-center z-10 relative"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-black/20" />
                                    </motion.div>

                                    <div className="absolute inset-0 flex justify-between px-5 items-center text-[10px] font-bold tracking-widest text-white/20 uppercase pointer-events-none">
                                        <span>AI</span>
                                        <span>Human</span>
                                    </div>
                                </div>
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
