'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "¿Qué es exactamente Catalyst?",
        answer: "Catalyst es una plataforma de automatización inteligente que conecta todos tus canales de comunicación en un solo lugar, actuando como una 'mente central' que orquesta interacciones fluidas entre tu negocio y tus clientes."
    },
    {
        question: "¿Necesito conocimientos técnicos para usarlo?",
        answer: "No. Catalyst está diseñado para ser intuitivo. Nuestro equipo se encarga de la configuración técnica compleja, entregándote un sistema listo para usar que puedes gestionar sin escribir una sola línea de código."
    },
    {
        question: "¿Se integra con mis herramientas actuales?",
        answer: "Absolutamente. Catalyst se integra nativamente con CRMs populares, herramientas de marketing, pasarelas de pago y plataformas de mensajería como WhatsApp, Instagram y correo electrónico."
    },
    {
        question: "¿Cuánto tiempo toma la implementación?",
        answer: "Nuestro proceso de onboarding acelerado permite tener tu sistema base funcionando en menos de 2 semanas, con iteraciones continuas para perfeccionar los flujos según tus necesidades específicas."
    },
    {
        question: "¿Cómo garantiza Catalyst la seguridad de mis datos?",
        answer: "Utilizamos encriptación de grado bancario y cumplimos con los estándares internacionales de protección de datos para asegurar que toda la información de tu negocio y tus clientes esté siempre protegida."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-6"
                    >
                        Elimina el miedo antes del contacto
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg text-zinc-400 max-w-2xl mx-auto"
                    >
                        Respuestas claras a las preguntas que importan. Transparencia total desde el primer momento.
                    </motion.p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="border border-white/10 rounded-2xl bg-zinc-900/20 backdrop-blur-sm overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors duration-300"
                            >
                                <span className="text-lg font-medium text-zinc-200 pr-8">
                                    {faq.question}
                                </span>
                                <span className={`flex-shrink-0 text-blue-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-zinc-400 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
