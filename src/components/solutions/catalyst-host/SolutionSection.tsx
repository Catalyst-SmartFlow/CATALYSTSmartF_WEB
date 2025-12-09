"use client";

import React from "react";
import { m as motion } from "framer-motion";
import { Calendar, Check, TrendingUp, Star, MessageCircle, MoreVertical, Phone, Video, Clock, ArrowRight, RefreshCw, Zap, BarChart3 } from "lucide-react";

const BentoCard = ({
    children,
    className = "",
    title,
    description,
    delay = 0,
    gradient = "from-violet-600/20 to-blue-600/20"
}: {
    children: React.ReactNode;
    className?: string;
    title: string;
    description: string;
    delay?: number;
    gradient?: string;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10 ${className}`}
        >
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br ${gradient}`} />

            {/* Noise Texture */}


            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col">
                {/* Visual Area */}
                <div className="flex-1 min-h-[220px] mb-8 relative flex items-center justify-center overflow-hidden rounded-2xl bg-black/40 border border-white/5 shadow-inner group-hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
                    {children}
                </div>

                {/* Text Area */}
                <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                        {title}
                    </h3>
                    <p className="text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const WhatsAppMockup = () => (
    <div className="w-full max-w-md mx-auto bg-[#0b141a] rounded-xl overflow-hidden border border-white/10 shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500 font-sans">
        {/* Header */}
        <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between border-b border-white/5 relative z-20">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                    AI
                </div>
                <div>
                    <div className="text-sm font-bold text-gray-100">Catalyst Agent</div>
                    <div className="text-xs text-emerald-500 font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        En línea
                    </div>
                </div>
            </div>
            <div className="flex gap-5 text-gray-400">
                <Video size={22} strokeWidth={1.5} className="hover:text-white transition-colors cursor-pointer" />
                <Phone size={20} strokeWidth={1.5} className="hover:text-white transition-colors cursor-pointer" />
                <MoreVertical size={20} strokeWidth={1.5} className="hover:text-white transition-colors cursor-pointer" />
            </div>
        </div>

        {/* Chat Area */}
        <div className="p-6 space-y-2 text-sm bg-[#0b141a] relative h-[480px] overflow-hidden flex flex-col justify-end pb-4">


            <div className="space-y-2 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-end"
                >
                    <div className="bg-[#005c4b] text-white px-4 py-2 rounded-lg rounded-tr-none max-w-[85%] shadow-sm relative group/msg">
                        <p className="leading-relaxed">¡Hola! Me interesa el paquete Premium, pero tengo dudas sobre la integración.</p>
                        <span className="text-[10px] text-white/60 block text-right mt-1">10:42 AM</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-start"
                >
                    <div className="bg-[#202c33] text-gray-100 px-4 py-2 rounded-lg rounded-tl-none max-w-[85%] shadow-sm">
                        <p className="leading-relaxed">Entiendo perfectamente. Nuestra integración es plug-and-play. ¿Te gustaría ver una demo rápida?</p>
                        <span className="text-[10px] text-gray-500 block text-right mt-1">10:42 AM</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex justify-end"
                >
                    <div className="bg-[#005c4b] text-white px-4 py-2 rounded-lg rounded-tr-none max-w-[85%] shadow-sm">
                        <p className="leading-relaxed">Sí, por favor.</p>
                        <span className="text-[10px] text-white/60 block text-right mt-1">10:43 AM</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="flex justify-start"
                >
                    <div className="bg-[#202c33] text-gray-100 px-4 py-2 rounded-lg rounded-tl-none max-w-[85%] shadow-sm">
                        <p className="leading-relaxed">¡Genial! Te envío el acceso directo 👇</p>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="mt-2 bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 cursor-pointer transition-all flex items-center gap-3"
                        >
                            <div className="w-8 h-8 rounded bg-violet-500/20 flex items-center justify-center">
                                <Zap size={16} className="text-violet-400" />
                            </div>
                            <div>
                                <div className="text-violet-300 font-medium text-xs">Demo Interactiva</div>
                                <div className="text-gray-400 text-[10px]">Click para iniciar</div>
                            </div>
                        </motion.div>
                        <span className="text-[10px] text-gray-500 block text-right mt-1">10:43 AM</span>
                    </div>
                </motion.div>
            </div>
        </div>

        {/* Input Bar Simulation */}
        <div className="bg-[#202c33] px-2 py-2 flex items-center gap-2 border-t border-white/5">
            <div className="p-2 text-gray-400 hover:text-gray-300 cursor-pointer">
                <div className="w-6 h-6 rounded-full border-2 border-gray-500/50" />
            </div>
            <div className="flex-1 bg-[#2a3942] h-10 rounded-full px-4 flex items-center text-gray-400 text-sm font-normal">
                Escribe un mensaje...
            </div>
            <div className="p-2.5 bg-[#00a884] rounded-full hover:bg-[#008f6f] transition-colors cursor-pointer shadow-lg">
                <div className="w-5 h-5 text-white flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
);

const GoogleReviewMockup = () => (
    <div className="flex flex-col items-center justify-center gap-6 w-full">
        <div className="relative group/gicon">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(66,133,244,0.3)] z-10 relative transition-transform duration-500 group-hover/gicon:scale-110">
                <svg viewBox="0 0 24 24" className="w-12 h-12">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 4.61c1.61 0 3.06.56 4.21 1.64l3.16-3.16C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
            </div>

            {/* Orbiting Elements */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border border-dashed border-blue-500/20"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 rounded-full border border-dashed border-green-500/10"
            />
        </div>

        <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -30 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                        <Star className="w-8 h-8 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                    </motion.div>
                ))}
            </div>
            <div className="text-center">
                <div className="text-4xl font-bold text-white tracking-tight">4.9<span className="text-xl text-gray-500 font-normal">/5.0</span></div>
                <div className="text-sm text-gray-400 mt-1 font-medium">Basado en 120+ reseñas</div>
            </div>
        </div>
    </div>
);

const FollowUpMockup = () => (
    <div className="relative w-full max-w-[240px] aspect-square bg-[#1a1a1a] rounded-3xl border border-white/10 p-6 flex flex-col items-center justify-center group-hover:border-violet-500/30 transition-all shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 opacity-50" />

        <div className="relative mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 flex items-center justify-center border border-white/10 shadow-inner">
                <MessageCircle className="w-8 h-8 text-gray-300 group-hover:text-violet-400 transition-colors" />
            </div>
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center border-4 border-[#1a1a1a] shadow-lg"
            >
                <span className="text-[10px] font-bold text-white">1</span>
            </motion.div>
        </div>

        <div className="space-y-3 w-full">
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 backdrop-blur-sm"
            >
                <Clock size={14} className="text-violet-400" />
                <div className="flex flex-col gap-1.5 w-full">
                    <div className="h-1.5 w-20 bg-white/20 rounded-full" />
                    <div className="h-1.5 w-12 bg-white/10 rounded-full" />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="flex items-center justify-between gap-2 px-1"
            >
                <span className="text-[10px] text-violet-400 font-medium tracking-wider uppercase">Reactivando</span>
                <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center animate-spin-slow">
                    <RefreshCw size={12} className="text-violet-400" />
                </div>
            </motion.div>
        </div>
    </div>
);

const ROIGraph = () => (
    <div className="w-full h-full flex items-end justify-between px-6 pb-6 gap-3">
        {[35, 55, 45, 70, 60, 85, 100].map((height, i) => (
            <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                className="w-full bg-gradient-to-t from-violet-600/10 to-violet-500/40 rounded-t-lg relative group/bar hover:from-violet-600/30 hover:to-violet-500/60 transition-colors"
            >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/bar:translate-y-0 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-xs font-bold text-white whitespace-nowrap shadow-xl z-20">
                    +${height * 45}
                </div>
                {/* Glow at top of bar */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-violet-400/50 shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
            </motion.div>
        ))}

        {/* Overlay Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" preserveAspectRatio="none">
            <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="1" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <motion.path
                d="M0,100 C20,100 20,65 40,65 S60,85 80,85 S100,30 120,30 S140,55 160,55 S180,15 200,15"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="4"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />
        </svg>
    </div>
);

export default function SolutionSection() {
    return (
        <section className="relative py-32 px-4 overflow-hidden bg-[#050505]">
            {/* Top Gradient Fade */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] to-transparent z-20 pointer-events-none" />

            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-1000" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-1000 delay-1000" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-24 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-violet-300 mb-8"
                    >
                        <Zap size={16} className="fill-violet-300" />
                        <span>Automatización Total</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
                    >
                        El Sistema Operativo que{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 animate-gradient-x">
                            trabaja mientras duermes
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Automatiza lo aburrido, escala lo rentable. Una suite completa para dominar las ventas y la atención en WhatsApp sin intervención humana.
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[minmax(350px,auto)]">

                    {/* Main Card - Sales Brain */}
                    <BentoCard
                        className="md:col-span-2 md:row-span-2"
                        title="IA de Ventas & Upselling Autónomo"
                        description="Entrena a tu agente para vender mejor que tu mejor humano. Sugiere complementos, responde objeciones técnicas y cierra la transacción 24/7."
                        gradient="from-violet-600/20 to-fuchsia-600/20"
                    >
                        <WhatsAppMockup />
                    </BentoCard>

                    {/* Secondary 1 - Reputation */}
                    <BentoCard
                        className="md:col-span-1 md:row-span-1"
                        title="Motor de Reseñas Google"
                        description="Convierte clientes felices en reseñas de 5 estrellas automáticamente. Domina el SEO local."
                        delay={0.2}
                        gradient="from-blue-600/20 to-cyan-600/20"
                    >
                        <GoogleReviewMockup />
                    </BentoCard>

                    {/* Secondary 2 - Follow Up */}
                    <BentoCard
                        className="md:col-span-1 md:row-span-1"
                        title="Seguimiento Automático"
                        description="Recupera ventas perdidas. La IA hace follow-up estratégicos para reactivar leads olvidados."
                        delay={0.3}
                        gradient="from-emerald-600/20 to-green-600/20"
                    >
                        <FollowUpMockup />
                    </BentoCard>

                    {/* Wide Bottom - Control */}
                    <BentoCard
                        className="md:col-span-3 md:row-span-1 min-h-[300px]"
                        title="Analítica de ROI en Tiempo Real"
                        description="No adivines. Mira exactamente cuánto dinero extra ha generado la IA para tu negocio esta semana. Control total sobre tu retorno de inversión."
                        delay={0.4}
                        gradient="from-violet-600/20 to-blue-600/20"
                    >
                        <div className="w-full h-full flex items-center justify-center px-8 pt-8">
                            <div className="w-full max-w-5xl h-40 relative">
                                <div className="absolute top-0 right-0 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-md shadow-lg">
                                    <TrendingUp size={20} className="text-emerald-400" />
                                    <span className="text-emerald-400 font-bold text-lg">+$4,500</span>
                                </div>
                                <div className="absolute top-0 left-0 flex items-center gap-2 text-gray-500 text-sm font-medium">
                                    <BarChart3 size={16} />
                                    <span>Ingresos Recuperados (Últimos 7 días)</span>
                                </div>
                                <ROIGraph />
                            </div>
                        </div>
                    </BentoCard>

                </div>
            </div>
        </section>
    );
}
