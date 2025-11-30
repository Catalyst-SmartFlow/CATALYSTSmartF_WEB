"use client";

import { motion } from "framer-motion";

export default function Mission() {
    return (
        <section className="py-24 px-4 bg-black text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-black to-black pointer-events-none" />
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-sm font-medium text-violet-500 uppercase tracking-widest"
                >
                    Nuestra Misión
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-4 text-3xl md:text-5xl font-bold leading-tight"
                >
                    Ser la agencia de <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-500">eficiencia</span> definitiva para las PYMES.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-6 text-xl text-zinc-400 leading-relaxed"
                >
                    Desarrollamos sistemas de automatización e inteligencia artificial personalizados para que puedas enfocar tu tiempo y energía en lo más importante: <span className="text-white font-semibold">crecer</span>.
                </motion.p>
            </div>
        </section>
    );
}
