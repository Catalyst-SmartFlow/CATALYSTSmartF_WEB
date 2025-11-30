"use client";

import { motion } from "framer-motion";
import { Bot, Cpu, Zap } from "lucide-react";

const services = [
    {
        icon: <Bot className="h-8 w-8 text-violet-500" />,
        title: "Chatbots IA",
        description: "Asistentes virtuales inteligentes que operan 24/7.",
    },
    {
        icon: <Cpu className="h-8 w-8 text-cyan-500" />,
        title: "Automatización",
        description: "Flujos de trabajo optimizados para reducir tareas repetitivas.",
    },
    {
        icon: <Zap className="h-8 w-8 text-white" />,
        title: "Eficiencia",
        description: "Sistemas diseñados para maximizar el rendimiento de tu negocio.",
    },
];

export default function ServicesTeaser() {
    return (
        <section className="py-24 px-4 bg-black text-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
                    >
                        <div className="mb-4">{service.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-zinc-400">{service.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
