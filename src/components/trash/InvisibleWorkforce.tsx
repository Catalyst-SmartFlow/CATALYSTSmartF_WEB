"use client";

import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { useRef, MouseEvent, useState, useEffect } from "react";
import { Clock, ShieldCheck, TrendingUp, ArrowRight, Zap, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const cards = [
    {
        icon: Clock,
        title: "Captura Instantánea",
        description: "No dejes que un cliente espere. Respuesta inmediata en <1s, garantizando que cada interés se convierta en una oportunidad.",
        color: "from-violet-500 to-indigo-500",
    },
    {
        icon: ShieldCheck,
        title: "Cierre Perfecto",
        description: "Entrenados con tus mejores técnicas de venta. Nunca tienen un mal día, nunca olvidan un seguimiento.",
        color: "from-fuchsia-500 to-pink-500",
    },
    {
        icon: TrendingUp,
        title: "Crecimiento Exponencial",
        description: "Lanza campañas masivas sin miedo al colapso. De 1 a 10,000 conversaciones simultáneas sin contratar a nadie más.",
        color: "from-cyan-500 to-blue-500",
    },
];

function Card3D({ card, index }: { card: any; index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left - width / 2);
        mouseY.set(clientY - top - height / 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const rotateX = useSpring(useTransform(mouseY, [-200, 200], [15, -15]), { damping: 15, stiffness: 150 });
    const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-15, 15]), { damping: 15, stiffness: 150 });

    return (
        <motion.div
            style={{ perspective: 1000 }}
            className="relative h-full"
        >
            <motion.div
                style={{ rotateX, rotateY }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 p-8 backdrop-blur-xl transition-colors hover:border-white/20"
            >
                {/* Border Beam Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10 blur-xl`} />
                </div>

                {/* Spotlight */}
                <motion.div
                    style={{
                        background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 80%)`,
                    }}
                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div className="relative z-10 flex flex-col h-full">
                    <div className={`mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} bg-opacity-10 border border-white/10 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-500`}>
                        <card.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
                    <p className="text-zinc-400 leading-relaxed flex-grow">{card.description}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}

function ROISlider() {
    const [leads, setLeads] = useState(100);
    const [revenue, setRevenue] = useState(0);
    const revenueRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        // Simple logic: Assume 20% conversion rate recovery and $500 LTV per lead
        const targetRevenue = leads * 0.2 * 500;

        const controls = animate(0, targetRevenue, {
            duration: 0.5,
            onUpdate: (value) => {
                if (revenueRef.current) {
                    revenueRef.current.textContent = Math.round(value).toLocaleString();
                }
            },
        });

        return () => controls.stop();
    }, [leads]);

    return (
        <div className="mt-20 p-8 rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-md max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Calcula tu Potencial Recuperado</h3>
                <p className="text-zinc-400">¿Cuántos leads pierdes o ignoras al mes?</p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/2">
                    <div className="flex justify-between text-sm text-zinc-400 mb-4">
                        <span>0 Leads</span>
                        <span className="text-white font-bold">{leads} Leads</span>
                        <span>500 Leads</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={leads}
                        onChange={(e) => setLeads(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
                    />
                </div>

                <div className="w-full md:w-1/2 text-center md:text-left p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
                    <p className="text-sm text-zinc-400 uppercase tracking-wider mb-1">Ingresos Extra Mensuales</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-4xl md:text-5xl font-bold text-white">
                        <DollarSign className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
                        <span ref={revenueRef}>0</span>
                    </div>
                    <p className="text-xs text-emerald-400 mt-2 font-medium">*Estimación basada en LTV promedio</p>
                </div>
            </div>
        </div>
    );
}

export default function InvisibleWorkforce() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    return (
        <section ref={containerRef} className="relative w-full py-40 overflow-hidden bg-black">
            {/* Geometric Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-violet-500 opacity-20 blur-[100px]" />
                <div className="absolute right-0 bottom-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-500 opacity-20 blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    style={{ opacity, scale }}
                    className="text-center max-w-4xl mx-auto mb-32"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium tracking-wider uppercase mb-6">
                        <Zap className="w-3 h-3" />
                        Sistema Autónomo
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-[1.1]">
                        Vende Mientras Duermes. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white animate-gradient-x">
                            Escala Sin Límites.
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        El 70% de tus leads se enfrían en minutos. Nuestros agentes de IA responden, califican y cierran en segundos. 24/7. Sin excusas.
                    </p>
                </motion.div>

                {/* Connecting Line (Neural Network) */}
                <motion.div
                    style={{ height: useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]) }}
                    className="absolute left-1/2 top-[30%] w-px bg-gradient-to-b from-transparent via-violet-500 to-violet-500/20 hidden md:block -translate-x-1/2 z-0"
                />

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            style={{
                                y: index % 2 === 0 ? y : useTransform(scrollYProgress, [0, 1], [50, -50]),
                            }}
                            className="relative"
                        >
                            <Card3D card={card} index={index} />

                            {/* Connecting Nodes for Desktop */}
                            <div className="absolute top-1/2 -right-6 w-12 h-px bg-gradient-to-r from-white/20 to-transparent hidden md:block" />
                            {index !== 2 && (
                                <div className="absolute top-1/2 -right-6 w-3 h-3 rounded-full bg-violet-500/50 blur-sm hidden md:block" />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* ROI Slider */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <ROISlider />
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-20 text-center"
                >
                    <div className="relative inline-block group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 animate-gradient-xy"></div>
                        <Button
                            size="lg"
                            className="relative h-20 px-12 text-xl bg-black hover:bg-zinc-900 text-white rounded-full font-bold transition-all border border-white/10"
                        >
                            <span className="flex items-center gap-3">
                                Desplegar Agentes Ahora
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                    </div>
                    <p className="mt-6 text-zinc-500 text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Únete a las empresas que ya automatizan
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
