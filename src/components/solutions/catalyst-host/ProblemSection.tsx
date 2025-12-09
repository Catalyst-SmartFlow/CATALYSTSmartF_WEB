'use client';

import React, { useRef, useState } from 'react';
import { Clock, FileX, TrendingDown } from 'lucide-react';
import { m as motion } from 'framer-motion';

const ProblemSection = () => {
    const cards = [
        {
            icon: Clock,
            title: 'El Costo del Silencio',
            text: 'La intención de compra caduca en 5 minutos. Cada segundo de demora reduce tu conversión drásticamente. No estás perdiendo un chat, le estás regalando el cliente a tu competencia más rápida.',
            color: 'text-red-400',
            gradient: 'from-red-500/20 to-transparent',
            borderGlow: 'group-hover:border-red-500 group-hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]',
            iconBg: 'bg-red-500/10'
        },
        {
            icon: FileX,
            title: 'El Cementerio de Leads',
            text: 'El 80% de las ventas se cierran tras el 5º seguimiento. Tu equipo humano se rinde o se olvida después del 2º. Estás pagando marketing para dejar morir a tus clientes en "Visto".',
            color: 'text-orange-400',
            gradient: 'from-orange-500/20 to-transparent',
            borderGlow: 'group-hover:border-orange-500 group-hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)]',
            iconBg: 'bg-orange-500/10'
        },
        {
            icon: TrendingDown,
            title: 'Marketing Quemado',
            text: 'Es inútil escalar tu inversión publicitaria si tu capacidad de respuesta es manual. Traer 100 leads y solo poder atender bien a 10 es la forma más rápida de quemar tu capital.',
            color: 'text-yellow-400',
            gradient: 'from-yellow-500/20 to-transparent',
            borderGlow: 'group-hover:border-yellow-500 group-hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.3)]',
            iconBg: 'bg-yellow-500/10'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="relative py-32 px-4 overflow-hidden bg-[#050505]">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[128px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-orange-900/10 rounded-full blur-[128px] -translate-y-1/2 pointer-events-none" />

            <motion.div
                className="relative max-w-7xl mx-auto z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Header */}
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight"
                    >
                        Tu velocidad de respuesta está{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-gradient-x">
                            matando tu rentabilidad
                        </span>
                        .
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-zinc-300 leading-relaxed"
                    >
                        Vivimos en la economía de la inmediatez. El <span className="text-white font-semibold">78% de las ventas</span> se las lleva el negocio que responde primero.
                        Si haces esperar a tus clientes, se van con la competencia.
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <SpotlightCard key={index} card={card} variants={itemVariants} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

const SpotlightCard = ({ card, variants }: { card: any, variants: any }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}
            variants={variants}
            className={`
        group relative p-8 rounded-3xl overflow-hidden
        bg-zinc-900/20 border border-white/5
        transition-all duration-300 ease-out
        hover:-translate-y-2
        ${card.borderGlow}
      `}
        >
            {/* Spotlight Effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
                }}
            />

            {/* Inner Gradient Blob */}
            <div className={`
        absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500
        bg-gradient-to-br ${card.gradient}
      `} />

            <div className="relative z-10">
                <div className={`
          w-14 h-14 rounded-2xl mb-8 flex items-center justify-center
          ${card.iconBg} ${card.color}
          transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
        `}>
                    <card.icon className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
                    {card.title}
                </h3>

                <p className="text-zinc-300 leading-relaxed group-hover:text-zinc-100 transition-colors duration-300">
                    {card.text}
                </p>
            </div>
        </motion.div>
    );
};

export default ProblemSection;
