"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative border border-white/10 bg-zinc-900/30 overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
        >
            {/* Luz de fondo que sigue el mouse */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            {/* Borde brillante que sigue el mouse */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.5), 
              transparent 40%
            )
          `,
                }}
            // Mask para que solo pinte el borde
            // (Nota técnica: usamos un div superpuesto con z-index para simular el borde iluminado)
            />

            <div className="relative h-full">{children}</div>
        </div>
    );
};