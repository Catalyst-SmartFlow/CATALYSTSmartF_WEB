"use client";

import { motion } from "framer-motion";

export default function Vision() {
    return (
        <section className="py-24 px-4 bg-zinc-950 text-white relative border-t border-zinc-900">
            <div className="max-w-4xl mx-auto text-right">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-sm font-medium text-cyan-500 uppercase tracking-widest"
                >
                    Nuestra Visión
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-4 text-3xl md:text-5xl font-bold leading-tight"
                >
                    Convertirnos en el <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-500 to-blue-500">catalizador</span> clave para la modernización.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-6 text-xl text-zinc-400 leading-relaxed"
                >
                    Aspiramos a ser una agencia de alto valor en automatización e IA, impulsando un crecimiento medible y sostenible para los negocios del futuro.
                </motion.p>
            </div>
        </section>
    );
}
