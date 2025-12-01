"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Bot, Zap, Calendar, ArrowUpRight, Cpu, Layers } from "lucide-react";

export default function ServicesTeaser() {
    return (
        <section className="py-32 px-4 bg-black relative">
            {/* Grid de fondo estilo "Tron" sutil */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-24 md:flex md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-6">
                            Ingeniería <br />
                            <span className="text-zinc-500">Invisible.</span>
                        </h2>
                        <p className="text-xl text-zinc-400 leading-relaxed">
                            No vendemos software. Construimos la infraestructura digital
                            que permite a tu empresa operar automáticamente.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <span className="text-xs font-mono text-violet-500 border border-violet-500/30 px-3 py-1 rounded-full uppercase tracking-widest">
                            System Status: Online
                        </span>
                    </div>
                </div>

                {/* El Grid Asimétrico - Estilo Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">

                    [cite_start]{/* Tarjeta Principal: Catalyst CX [cite: 10] */}
                    <SpotlightCard className="md:col-span-8 md:row-span-2 rounded-3xl p-10 flex flex-col justify-between group">
                        <div className="absolute top-0 right-0 p-10 opacity-50 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-violet-500/20 rounded-2xl flex items-center justify-center mb-6 border border-violet-500/30">
                                <Bot className="w-8 h-8 text-violet-400" />
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-4">Catalyst CX</h3>
                            <p className="text-zinc-400 text-lg max-w-md">
                                Tu fuerza de ventas digital. [cite_start]Un asistente omnicanal que captura leads y cierra ventas en Web y WhatsApp sin intervención humana[cite: 10, 13].
                            </p>
                        </div>
                        {/* Visualización Abstracta de Datos (Decorativo) */}
                        <div className="mt-8 flex gap-2">
                            <div className="h-2 w-24 bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    whileInView={{ x: "0%" }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                    className="h-full w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent"
                                />
                            </div>
                        </div>
                    </SpotlightCard>

                    [cite_start]{/* Tarjeta Secundaria: Catalyst Ops [cite: 20] */}
                    <SpotlightCard className="md:col-span-4 md:row-span-1 rounded-3xl p-8 bg-zinc-900/20">
                        <div className="flex items-center justify-between mb-4">
                            <Zap className="w-6 h-6 text-yellow-400" />
                            <span className="text-xs text-zinc-500 font-mono">BACKEND LOGIC</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Catalyst Ops</h3>
                        <p className="text-zinc-400 text-sm">
                            Conectamos tu CRM y facturación con n8n puro. [cite_start]Sincronización invisible[cite: 20].
                        </p>
                    </SpotlightCard>

                    [cite_start]{/* Tarjeta Terciaria: Agenda AI [cite: 6] */}
                    <SpotlightCard className="md:col-span-4 md:row-span-1 rounded-3xl p-8 bg-zinc-900/20">
                        <div className="flex items-center justify-between mb-4">
                            <Calendar className="w-6 h-6 text-cyan-400" />
                            <span className="text-xs text-zinc-500 font-mono">SCHEDULING</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Agenda AI</h3>
                        <p className="text-zinc-400 text-sm">
                            Elimina el ausentismo. [cite_start]Agendamiento directo a Google Calendar[cite: 6].
                        </p>
                    </SpotlightCard>
                </div>
            </div>
        </section>
    );
}