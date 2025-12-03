"use client";

import { useRef } from "react";
import {
    motion,
    useMotionValue,
    useTransform,
    useAnimationFrame,
    useInView
} from "framer-motion";
import Image from "next/image";

// Utility function to wrap a number between a min and max range
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// Integration Data
const integrations = [
    { name: "WhatsApp", src: "/integratorsLogos/whatsapp-seeklogo.svg", scale: 1.3 },
    { name: "HubSpot", src: "/integratorsLogos/hubspot-seeklogo.svg", scale: 1 },
    { name: "Salesforce", src: "/integratorsLogos/salesforce-seeklogo.svg", scale: 1 },
    { name: "Shopify", src: "/integratorsLogos/shopify-seeklogo.svg", scale: 1 },
    { name: "Stripe", src: "/integratorsLogos/stripe-seeklogo.svg", scale: 1 },
    { name: "WooCommerce", src: "/integratorsLogos/woocommerce-seeklogo.svg", scale: 1 },
    { name: "WordPress", src: "/integratorsLogos/wordpress-seeklogo.svg", scale: 1 },
    { name: "Google Workspace", src: "/integratorsLogos/google-workspace-seeklogo.svg", scale: 2.4, containerWidth: "w-40 md:w-64" },
    { name: "Wix", src: "/integratorsLogos/wix-seeklogo.svg", scale: 0.7, className: "invert" },
    // Duplicates for marquee
    { name: "WhatsApp", src: "/integratorsLogos/whatsapp-seeklogo.svg", scale: 1.3 },
    { name: "HubSpot", src: "/integratorsLogos/hubspot-seeklogo.svg", scale: 1 },
    { name: "Salesforce", src: "/integratorsLogos/salesforce-seeklogo.svg", scale: 1 },
    { name: "Shopify", src: "/integratorsLogos/shopify-seeklogo.svg", scale: 1 },
    { name: "Stripe", src: "/integratorsLogos/stripe-seeklogo.svg", scale: 1 },
    { name: "WooCommerce", src: "/integratorsLogos/woocommerce-seeklogo.svg", scale: 1 },
    { name: "WordPress", src: "/integratorsLogos/wordpress-seeklogo.svg", scale: 1 },
    { name: "Google Workspace", src: "/integratorsLogos/google-workspace-seeklogo.svg", scale: 2.4, containerWidth: "w-40 md:w-64" },
    { name: "Wix", src: "/integratorsLogos/wix-seeklogo.svg", scale: 0.7, className: "invert" },
];

function IntegrationLogo({ integration }: { integration: typeof integrations[0] }) {
    const containerWidth = integration.containerWidth || "w-16 md:w-20";

    return (
        <div className={`group/logo mx-8 md:mx-12 ${containerWidth} h-16 md:h-20 relative flex flex-col items-center justify-center cursor-pointer select-none`}>
            <div className="relative w-24 h-12 md:w-32 md:h-16 transition-all duration-500 grayscale opacity-60 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-110">
                <div className={`w-full h-full relative ${integration.className || ""}`} style={{ transform: `scale(${integration.scale || 1})` }}>
                    <Image
                        src={integration.src}
                        alt={integration.name}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
            <span className="mt-4 text-[10px] uppercase tracking-widest text-zinc-500 group-hover/logo:text-white transition-all duration-500 opacity-0 group-hover/logo:opacity-100 absolute -bottom-6 translate-y-2 group-hover/logo:translate-y-0 whitespace-nowrap font-medium">
                {integration.name}
            </span>
        </div>
    );
}

function ParallaxText({ children, baseVelocity = 100 }: { children: React.ReactNode; baseVelocity: number }) {
    const baseX = useMotionValue(0);
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="parallax overflow-hidden flex flex-nowrap m-0 whitespace-nowrap">
            <motion.div className="scroller flex flex-nowrap whitespace-nowrap" style={{ x }}>
                {children}
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    );
}

export default function IntegrationsCarousel() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.21, 0.47, 0.32, 0.98], // Premium "spring-like" ease
            },
        },
    };

    return (
        <section ref={containerRef} className="relative h-[150vh] bg-black z-10">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden border-t border-white/5">

                {/* Background Glow - Animated & Extended */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-0 left-0 w-full h-full bg-blue-500/5 blur-[100px] pointer-events-none"
                />

                {/* Top Gradient Fade */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />

                {/* Bottom Gradient Fade for smooth transition */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto px-4 mb-16 text-center relative z-30"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 hover:bg-white/10 transition-colors cursor-default backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                        <span className="text-[10px] font-semibold text-zinc-300 uppercase tracking-widest">Ecosistema Universal</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h3 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                        Tu ecosistema actual, <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                            ahora con superpoderes.
                        </span>
                    </motion.h3>

                    {/* Description */}
                    <motion.p variants={itemVariants} className="text-zinc-400 mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Sincronización nativa con <span className="text-white font-medium">+250 herramientas</span>.
                        Sin código. Sin fricción. Sin cambiar tu flujo de trabajo.
                    </motion.p>
                </motion.div>

                {/* Carousel - Fade In Reveal */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative w-full flex overflow-x-hidden group [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] z-30"
                >
                    <ParallaxText baseVelocity={0.5}>
                        {integrations.map((integration, index) => (
                            <IntegrationLogo key={`i-${index}`} integration={integration} />
                        ))}
                    </ParallaxText>
                </motion.div>
            </div>
        </section>
    );
}

