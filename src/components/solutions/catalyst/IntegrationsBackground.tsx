"use client";
import React from "react";
import { m as motion } from "framer-motion";

const ConnectionLine = ({ d, delay }: { d: string; delay: number }) => {
    return (
        <>
            {/* Base Line */}
            <path d={d} stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />

            {/* Animated Flow Line */}
            <motion.path
                d={d}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay, ease: "easeInOut" }}
                style={{ willChange: "path-length, opacity" }}
            />

            {/* Moving Particle */}
            <motion.circle r="3" fill="#818cf8">
                <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path={d}
                    rotate="auto"
                />
            </motion.circle>
        </>
    );
};

const IntegrationsBackground = () => {
    return (
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1400 550" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(99, 102, 241, 0.1)" />
                        <stop offset="50%" stopColor="rgba(99, 102, 241, 0.5)" />
                        <stop offset="100%" stopColor="rgba(99, 102, 241, 0.1)" />
                    </linearGradient>
                </defs>

                {/* Left to Center Connections */}
                {[0, 1, 2, 3].map((i) => {
                    const yStart = 60 + i * 144; // Aligned with box centers (approx 550 height)
                    const yEnd = 275; // Center of container
                    return (
                        <ConnectionLine
                            key={`left-${i}`}
                            d={`M 420 ${yStart} C 550 ${yStart}, 550 ${yEnd}, 620 ${yEnd}`}
                            delay={i * 0.2}
                        />
                    );
                })}

                {/* Center to Right Connections */}
                {[0, 1, 2, 3].map((i) => {
                    const yStart = 275; // Center of container
                    const yEnd = 60 + i * 144; // Aligned with box centers
                    return (
                        <ConnectionLine
                            key={`right-${i}`}
                            d={`M 780 ${yStart} C 850 ${yStart}, 850 ${yEnd}, 980 ${yEnd}`}
                            delay={0.5 + i * 0.2}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export default IntegrationsBackground;
