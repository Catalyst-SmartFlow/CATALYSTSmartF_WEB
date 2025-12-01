"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "framer-motion";
import Image from "next/image";

// Utility function to wrap a number between a min and max range
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const partners = [
    { name: "Espiral Edu", logo: "/partners/EspiralEdu.png" },
    { name: "Universidad Indoamérica", logo: "/partners/UniversidadIndoamerica.png" },
    { name: "El Nuevo Ecuador", logo: "/partners/el-nuevo-ecuador-logo.svg" },
    // Duplicating for marquee effect
    { name: "Espiral Edu", logo: "/partners/EspiralEdu.png" },
    { name: "Universidad Indoamérica", logo: "/partners/UniversidadIndoamerica.png" },
    { name: "El Nuevo Ecuador", logo: "/partners/el-nuevo-ecuador-logo.svg" },
    { name: "Espiral Edu", logo: "/partners/EspiralEdu.png" },
    { name: "Universidad Indoamérica", logo: "/partners/UniversidadIndoamerica.png" },
    { name: "El Nuevo Ecuador", logo: "/partners/el-nuevo-ecuador-logo.svg" },
];

function ParallaxText({ children, baseVelocity = 100 }: { children: React.ReactNode; baseVelocity: number }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);

    // Speed control refs
    const hoverSpeedFactor = useRef<number>(1);
    const targetSpeedFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        // Smoothly interpolate current speed factor to target
        // If target is 0.1 (hover), we move towards it. If 1 (no hover), we move back.
        const approachRate = 0.05; // Adjust for smoothness of slowdown/speedup
        hoverSpeedFactor.current =
            hoverSpeedFactor.current + (targetSpeedFactor.current - hoverSpeedFactor.current) * approachRate;

        let moveBy = directionFactor.current * baseVelocity * (delta / 1000) * hoverSpeedFactor.current;

        /**
         * This is what changes the direction of the scroll once we
         * switch scrolling directions.
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div
            className="parallax overflow-hidden flex flex-nowrap m-0 whitespace-nowrap"
            onMouseEnter={() => { targetSpeedFactor.current = 0.1; }} // Slow down to 10% speed
            onMouseLeave={() => { targetSpeedFactor.current = 1; }}   // Resume full speed
        >
            <motion.div className="scroller flex flex-nowrap whitespace-nowrap" style={{ x }}>
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
        <section className="w-full py-20 bg-black overflow-hidden relative z-10 border-y border-white/10">
            <div className="container mx-auto px-4 mb-12 text-center">
                <p className="text-sm text-gray-400 uppercase tracking-widest font-medium">
                    Empresas visionarias que confían en nuestra tecnología
                </p>
            </div>

            <div className="relative flex overflow-x-hidden group [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                <ParallaxText baseVelocity={-1}>
                    {partners.map((partner, index) => (
                        <div
                            key={`p-${index}`}
                            className="mx-8 md:mx-12 w-32 md:w-40 h-16 md:h-20 relative inline-flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
                        >
                            <div className="w-full h-full relative flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                        </div>
                    ))}
                </ParallaxText>
            </div>
        </section>
    );
}
