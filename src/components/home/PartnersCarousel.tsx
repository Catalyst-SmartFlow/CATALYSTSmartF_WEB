"use client";

import { useRef } from "react";
import {
    motion,
    useMotionValue,
    useTransform,
    useAnimationFrame,
} from "framer-motion";
import Image from "next/image";

// Utility function to wrap a number between a min and max range
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

import { useState } from "react";

const partners = [
    { name: "Espiral Edu", logo: "/partners/EspiralEdu.png", scale: 0.75 },
    { name: "Universidad Indoamérica", logo: "/partners/UniversidadIndoamerica.png", scale: 1.35 },
    { name: "El Nuevo Ecuador", logo: "/partners/el-nuevo-ecuador-logo.svg", scale: 1.25 },
    // Duplicating for marquee effect
    { name: "Espiral Edu", logo: "/partners/EspiralEdu.png", scale: 0.75 },
    { name: "Universidad Indoamérica", logo: "/partners/UniversidadIndoamerica.png", scale: 1.35 },
    { name: "El Nuevo Ecuador", logo: "/partners/el-nuevo-ecuador-logo.svg", scale: 1.25 },
    { name: "Espiral Edu", logo: "/partners/EspiralEdu.png", scale: 0.75 },
    { name: "Universidad Indoamérica", logo: "/partners/UniversidadIndoamerica.png", scale: 1.35 },
    { name: "El Nuevo Ecuador", logo: "/partners/el-nuevo-ecuador-logo.svg", scale: 1.25 },
];

function PartnerLogo({ partner }: { partner: typeof partners[0] }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div
            className="group/logo mx-8 md:mx-12 w-32 md:w-40 h-20 md:h-24 relative inline-flex items-center justify-center cursor-pointer select-none"
            onDragStart={(e) => e.preventDefault()} // Prevent default image drag behavior
        >
            {/* Spotlight Glow Effect */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />

            {/* Skeleton Loader */}
            {isLoading && (
                <div className="absolute inset-0 bg-white/5 animate-pulse rounded-lg" />
            )}

            {/* Base Scale Wrapper */}
            <div className="w-full h-full flex items-center justify-center" style={{ transform: `scale(${partner.scale || 1})` }}>
                <div className={`w-full h-full relative flex items-center justify-center transition-all duration-500 transform group-hover/logo:scale-105 ${isLoading ? 'opacity-0' : 'opacity-80 group-hover/logo:opacity-100'}`}>
                    <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain p-2 drop-shadow-lg"
                        onLoad={() => setIsLoading(false)}
                        draggable={false}
                    />
                </div>
            </div>

            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-zinc-900 text-white text-[10px] uppercase tracking-widest font-medium px-2 py-1 rounded border border-white/10 shadow-xl whitespace-nowrap">
                    {partner.name}
                </div>
            </div>
        </div>
    );
}

function ParallaxText({ children, baseVelocity = 100 }: { children: React.ReactNode; baseVelocity: number }) {
    const baseX = useMotionValue(0);

    // Removed scroll velocity logic for constant speed

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);

    // Speed control refs
    const hoverSpeedFactor = useRef<number>(1);
    const targetSpeedFactor = useRef<number>(1);
    const isDragging = useRef<boolean>(false);
    const lastPointerX = useRef<number>(0);

    useAnimationFrame((t, delta) => {
        if (isDragging.current) return; // Pause auto-scroll while dragging

        // Smoothly interpolate current speed factor to target
        const approachRate = 0.05;
        hoverSpeedFactor.current =
            hoverSpeedFactor.current + (targetSpeedFactor.current - hoverSpeedFactor.current) * approachRate;

        let moveBy = directionFactor.current * baseVelocity * (delta / 1000) * hoverSpeedFactor.current;

        baseX.set(baseX.get() + moveBy);
    });

    const handlePointerDown = (e: React.PointerEvent) => {
        isDragging.current = true;
        lastPointerX.current = e.clientX;
        // Capture pointer to ensure we receive events even if mouse leaves the element
        (e.target as Element).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging.current) return;

        const deltaX = e.clientX - lastPointerX.current;
        lastPointerX.current = e.clientX;

        // Adjust sensitivity here. Reduced to 0.01 for finer control.
        baseX.set(baseX.get() + deltaX * 0.01);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        isDragging.current = false;
        (e.target as Element).releasePointerCapture(e.pointerId);
    };

    return (
        <div
            className="parallax overflow-hidden flex flex-nowrap m-0 whitespace-nowrap cursor-grab active:cursor-grabbing touch-pan-y"
            onMouseEnter={() => { targetSpeedFactor.current = 0.1; }}
            onMouseLeave={() => { targetSpeedFactor.current = 1; }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            <motion.div
                className="scroller flex flex-nowrap whitespace-nowrap"
                style={{ x }}
            >
                {children}
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    );
}

export default function PartnersCarousel() {
    return (
        <section className="w-full py-6 bg-zinc-950/50 overflow-hidden relative z-10 border-y border-white/5">
            <div className="relative flex overflow-x-hidden group [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                <ParallaxText baseVelocity={-0.5}>
                    {partners.map((partner, index) => (
                        <PartnerLogo key={`p-${index}`} partner={partner} />
                    ))}
                </ParallaxText>
            </div>
        </section>
    );
}
