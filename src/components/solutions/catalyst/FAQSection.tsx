"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqItems = [
    {
        question: "¿El precio incluye los costos de WhatsApp y OpenAI?",
        answer: "No. Para garantizar transparencia, tú pagas el costo real de uso directamente a los proveedores (Meta y OpenAI). Nosotros no cobramos comisiones sobre tus mensajes. Estima entre $10-$30 USD extra al mes para un volumen medio."
    },
    {
        question: "¿Necesito saber programar para configurarlo?",
        answer: "En absoluto. Catalyst está diseñado como una solución 'No-Code' para ti. Nosotros nos encargamos de la configuración técnica inicial y tú solo gestionas el panel de control."
    },
    {
        question: "¿Es seguro usar esto con mi número de WhatsApp?",
        answer: "100% Seguro. Utilizamos la API Oficial de WhatsApp Business (Cloud API). A diferencia de los bots 'piratas' que escanean códigos QR, nuestra conexión está verificada por Meta, protegiendo tu número contra bloqueos."
    },
    {
        question: "¿Puedo intervenir si el bot no sabe qué responder?",
        answer: "Sí. Nuestra función de 'Human Handoff' te notifica cuando una conversación requiere atención humana, permitiéndote tomar el control del chat instantáneamente desde nuestra plataforma o tu móvil."
    },
    {
        question: "¿Hay contratos de permanencia?",
        answer: "Ninguno. Eres libre de cancelar tu suscripción en cualquier momento desde tu dashboard. El servicio se mantendrá activo hasta el final de tu ciclo de facturación actual."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950" />

            {/* Top & Bottom Fades */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Preguntas Frecuentes
                        </h2>
                        <p className="text-slate-400">
                            Resolvemos tus dudas para que tomes la mejor decisión.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`
                  group rounded-2xl border border-white/10 bg-white/5 
                  hover:bg-white/[0.07] hover:border-white/20 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]
                  transition-all duration-300 overflow-hidden cursor-pointer
                `}
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="p-6 flex items-center justify-between gap-4">
                                    <h3 className="text-lg font-medium text-white group-hover:text-blue-200 transition-colors text-left">
                                        {item.question}
                                    </h3>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 45 : 0 }}
                                        transition={{ duration: 0.3, ease: "circOut" }}
                                        className="flex-shrink-0 text-slate-400 group-hover:text-white"
                                    >
                                        <Plus className="w-6 h-6" />
                                    </motion.div>
                                </div>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Final */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-sm text-slate-400">
                            ¿Tienes una duda más específica?{' '}
                            <a
                                href="#"
                                className="text-blue-400 hover:text-blue-300 transition-colors font-medium inline-flex items-center gap-1 hover:underline decoration-blue-400/30 underline-offset-4"
                            >
                                Chatea con nuestro equipo de Soporte →
                            </a>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
