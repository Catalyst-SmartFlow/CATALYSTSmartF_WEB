"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const ProblemAgitation = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative min-h-[80vh] flex items-center justify-center bg-[#050505] py-24 overflow-hidden">
            {/* Background Gradients - Warning Colors (Softened) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#050505] to-transparent z-10" />
                <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] opacity-30 animate-pulse" />
                <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[100px] opacity-20" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Copy */}
                    <div className="flex flex-col space-y-8 text-center lg:text-left">
                        <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                            ¿Sabías que el{" "}
                            <span className="inline-flex text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 font-extrabold">
                                <Counter from={0} to={80} duration={2} isInView={isInView} />%
                            </span>
                            <br />
                            de tus visitas se van sin comprar?
                        </h2>

                        <p className="text-xl text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Porque nadie les respondió en el momento. El <span className="text-slate-200 font-medium">"Cementerio de Leads"</span> es real.
                        </p>

                        <p className="text-2xl font-bold text-white">
                            Catalyst CX detiene la fuga de capital.
                        </p>
                    </div>

                    {/* Right Column: Visual (Floating Cards) */}
                    <div className="relative h-[400px] w-full flex items-center justify-center lg:justify-end perspective-1000">
                        <CardsStack isInView={isInView} />
                    </div>
                </div>
            </div>
        </section>
    );
};

const Counter = ({ from, to, duration, isInView }: { from: number; to: number; duration: number; isInView: boolean }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!isInView) return;

        const node = nodeRef.current;
        if (!node) return;

        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);

            const current = Math.floor(from + (to - from) * ease);
            node.textContent = current.toString();

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [isInView, from, to, duration]);

    return <span ref={nodeRef}>{from}</span>;
}

const CardsStack = ({ isInView }: { isInView: boolean }) => {
    return (
        <div className="relative w-full max-w-md flex flex-col items-end space-y-4">
            {/* Card 1: Top, Faded - Drifting away */}
            <motion.div
                initial={{ opacity: 0, x: 0, scale: 0.9 }}
                animate={isInView ? {
                    opacity: [0, 1, 1, 0],
                    x: [0, 0, 20, 150], // Slide out right
                    scale: [0.9, 1, 1, 0.8],
                    filter: ["blur(2px)", "blur(0px)", "blur(0px)", "blur(4px)"]
                } : {}}
                transition={{
                    duration: 4,
                    delay: 0,
                    repeat: Infinity,
                    repeatDelay: 2,
                    times: [0, 0.1, 0.7, 1]
                }}
                className="w-full lg:w-[90%] mr-8"
            >
                <Card
                    icon="❌"
                    title="Cliente perdido"
                    message="Hola, ¿precio?"
                    time="Sin respuesta por 2h"
                    color="red"
                    opacity="opacity-40"
                />
            </motion.div>

            {/* Card 2: Middle, Faded - Drifting away */}
            <motion.div
                initial={{ opacity: 0, x: 0, scale: 0.9 }}
                animate={isInView ? {
                    opacity: [0, 1, 1, 0],
                    x: [0, 0, 20, 150], // Slide out right
                    scale: [0.9, 1, 1, 0.8],
                    filter: ["blur(2px)", "blur(0px)", "blur(0px)", "blur(4px)"]
                } : {}}
                transition={{
                    duration: 4,
                    delay: 2,
                    repeat: Infinity,
                    repeatDelay: 2,
                    times: [0, 0.1, 0.7, 1]
                }}
                className="w-full lg:w-[95%] mr-4"
            >
                <Card
                    icon="❌"
                    title="Cliente perdido"
                    message="Quiero agendar..."
                    time="Visto hace 5h"
                    color="red"
                    opacity="opacity-60"
                />
            </motion.div>

            {/* Card 3: Newest, Alert */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    boxShadow: [
                        "0 0 0 rgba(234, 179, 8, 0)",
                        "0 0 30px rgba(234, 179, 8, 0.2)",
                        "0 0 0 rgba(234, 179, 8, 0)"
                    ]
                } : {}}
                transition={{
                    opacity: { duration: 0.5 },
                    y: { type: "spring", stiffness: 100 },
                    scale: { duration: 0.5 },
                    boxShadow: { duration: 2, repeat: Infinity }
                }}
                className="w-full z-10"
            >
                <Card
                    icon="⚠️"
                    title="Nueva visita esperando..."
                    message="(3 min)"
                    time="Ahora"
                    color="yellow"
                    opacity="opacity-100"
                    isNew
                />
            </motion.div>
        </div>
    )
}

const Card = ({ icon, title, message, time, color, opacity, isNew }: any) => (
    <div className={`backdrop-blur-xl border p-4 rounded-xl shadow-2xl flex items-center gap-4 transition-all duration-500 ${opacity} 
        ${isNew
            ? 'bg-slate-800/90 border-l-4 border-l-yellow-500 border-y-white/10 border-r-white/10 shadow-yellow-900/20'
            : 'bg-slate-900/40 border-white/5 grayscale-[0.3] hover:grayscale-0'
        }`}>
        <div className={`text-2xl ${isNew ? 'animate-pulse' : ''}`}>{icon}</div>
        <div className="flex-1">
            <div className="flex justify-between items-center">
                <h3 className={`text-sm font-bold ${color === 'red' ? 'text-red-400/80' : 'text-yellow-400'}`}>{title}</h3>
                <span className="text-xs text-slate-500">{time}</span>
            </div>
            <p className="text-slate-300 text-sm mt-0.5">{message}</p>
        </div>
    </div>
)

export default ProblemAgitation;
