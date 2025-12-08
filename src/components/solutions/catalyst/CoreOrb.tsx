"use client";
import React from "react";
import { m as motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

const CoreOrb = () => {
    return (
        <div className="relative">
            {/* Pulsing Rings */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-indigo-500/30 rounded-full blur-xl"
                style={{ willChange: "transform, opacity" }}
            />
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl"
                style={{ willChange: "transform, opacity" }}
            />

            {/* Core Orb */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center relative shadow-[0_0_50px_rgba(99,102,241,0.3)] z-10 backdrop-blur-sm">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-indigo-500/10 to-transparent" />
                <BrainCircuit className="w-16 h-16 text-indigo-400" />
            </div>

            {/* Label */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
                <span className="text-indigo-400 font-semibold tracking-wider text-sm uppercase">Catalyst Core</span>
            </div>
        </div>
    );
};

export default CoreOrb;
