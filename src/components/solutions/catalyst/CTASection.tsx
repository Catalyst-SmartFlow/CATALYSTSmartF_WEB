"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
    return (
        <section className="w-full py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">

                {/* Main Container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative max-w-4xl mx-auto"
                >
                    {/* Subtle Ambient Glow (Central) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent blur-3xl -z-10" />

                    {/* Card Content - More Minimal & Clean */}
                    <div className="relative rounded-[2.5rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-12 md:p-24 text-center overflow-hidden">

                        {/* Top Highlight Line */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight"
                        >
                            ¿Listo para escalar tu <br className="hidden md:block" />
                            <span className="text-white">
                                atención al cliente?
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-lg md:text-xl text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed font-light"
                        >
                            Configura tu primer agente en menos de 48 horas. <br />
                            <span className="text-slate-300 font-medium">Sin código, sin estrés.</span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-5"
                        >
                            <Button
                                size="lg"
                                className="h-14 px-10 text-lg rounded-full bg-white text-slate-950 hover:bg-slate-100 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] hover:-translate-y-0.5"
                            >
                                Comenzar Ahora
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="lg"
                                className="h-14 px-8 text-lg rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                            >
                                <Play className="mr-2 w-5 h-5 fill-current" />
                                Ver Demo en Vivo
                            </Button>
                        </motion.div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}
