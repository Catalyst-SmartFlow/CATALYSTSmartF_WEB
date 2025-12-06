"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Starter",
        price: "39",
        description: "Ideal para validar tu idea o negocios locales.",
        features: [
            { main: "800 Conversaciones", sub: "(Atención automática)" },
            { main: "Agente IA Esencial", sub: "(Respuestas pre-entrenadas)" },
            { main: "Soporte por Email", sub: "(Respuesta < 24h)" },
            { main: "Reporte Mensual PDF", sub: "(Métricas clave)" },
            { main: "Infraestructura Cloud", sub: "(Segura y estable)" },
        ],
        cta: "Comenzar Ahora",
        popular: false,
        gradient: false,
        microCopy: "Cancela cuando quieras.",
    },
    {
        name: "Growth",
        price: "99",
        description: "Para PYMES que buscan automatizar ventas y soporte.",
        features: [
            { main: "3,000 Conversaciones/mes", sub: "(Escalabilidad real)" },
            { main: "Conexión a Base de Datos", sub: "(Tus clientes, tus datos)" },
            { main: "Soporte Prioritario WhatsApp", sub: "(Tu equipo técnico directo)" },
            { main: "Dashboard en Tiempo Real", sub: "(Mira lo que pasa al instante)" },
            { main: "Hosting Dedicado Optimizado", sub: "(Máxima velocidad)" },
        ],
        cta: "Acelerar mi Negocio",
        popular: true,
        gradient: true,
        microCopy: "Lo más elegido por PYMES.",
    },
    {
        name: "Enterprise",
        price: "199",
        description: "Infraestructura dedicada para alto volumen y máxima seguridad.",
        features: [
            { main: "Conversaciones Ilimitadas", sub: "(Sin restricciones)" },
            { main: "VPS Dedicado Exclusivo", sub: "(Recursos 100% para ti)" },
            { main: "Analítica Predictiva con IA", sub: "(Anticípate a tus clientes)" },
            { main: "Onboarding VIP", sub: "(Configuración hecha por nosotros)" },
            { main: "Soporte 24/7 Dedicado", sub: "(Línea directa)" },
        ],
        cta: "Hablar con Ventas",
        popular: false,
        gradient: false,
        microCopy: "Auditoría inicial incluida.",
    },
];

const Pricing = () => {
    return (
        <section id="pricing" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Gradient fade from previous section */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] via-[#050505]/50 to-transparent z-0" />

            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                        Planes transparentes y escalables
                    </h2>
                    <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
                        Elige el plan que mejor se adapte al volumen de tus conversaciones.
                        Sin costos ocultos de mantenimiento.
                    </p>
                </div>

                {/* Pricing Grid */}
                {/* Reduced max-w-5xl for compactness */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={cn(
                                "relative transition-all duration-300 flex flex-col",
                                plan.popular ? "z-10 md:scale-110" : "scale-100"
                            )}
                        >
                            <div className={cn(
                                "flex flex-col rounded-2xl transition-all duration-300 border relative group",
                                // Popular card has more padding to be physically taller
                                plan.popular
                                    ? "bg-slate-900/90 border-violet-500 shadow-2xl shadow-violet-500/20 p-8 md:py-10"
                                    : "bg-slate-900/40 border-white/10 hover:border-white/20 p-6 h-[500px]"
                            )}>
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-full text-center z-20">
                                        <span className="bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-violet-500/40">
                                            Más Popular
                                        </span>
                                    </div>
                                )}

                                <div className="mb-6">
                                    {/* Reduced title size to text-base */}
                                    <h3 className="text-base font-medium text-slate-300 mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-3">
                                        {/* Reduced price size to text-4xl */}
                                        <span className="text-4xl font-bold text-white tracking-tight">${plan.price}</span>
                                        <span className="text-slate-500 text-sm font-medium">/mes</span>
                                    </div>
                                    <p className="text-slate-400 text-xs leading-relaxed">{plan.description}</p>
                                </div>

                                <ul className="space-y-3 mb-6 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2.5">
                                            <div className="mt-0.5 bg-cyan-500/10 p-0.5 rounded-full shrink-0">
                                                <Check className="w-3 h-3 text-cyan-400" />
                                            </div>
                                            {/* Reduced list text size to text-sm/xs */}
                                            <span className="text-sm text-slate-300 font-light leading-snug">
                                                <strong className="font-semibold text-white">{feature.main}</strong>{" "}
                                                <span className="text-slate-500 text-xs">{feature.sub}</span>
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="w-full mt-auto space-y-3">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full"
                                    >
                                        <Button
                                            className={cn(
                                                "w-full h-10 text-sm font-semibold tracking-wide",
                                                plan.gradient
                                                    ? "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white shadow-lg shadow-violet-500/25 border-0"
                                                    : "bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:text-white hover:border-white/20 backdrop-blur-sm"
                                            )}
                                            variant={plan.gradient ? "default" : "outline"}
                                        >
                                            {plan.cta}
                                        </Button>
                                    </motion.div>

                                    {plan.microCopy && (
                                        <p className="text-center text-[10px] text-slate-500 font-medium">
                                            {plan.microCopy}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* API Disclaimer */}
                <div className="text-center mt-12 mb-20">
                    <p className="text-slate-500 text-xs max-w-xl mx-auto">
                        Nota: Costos de consumo de terceros (WhatsApp Business API / OpenAI Tokens) no incluidos.
                        Se facturan según uso real directamente por los proveedores.
                    </p>
                </div>

                {/* Custom Engineering Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="relative rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900 to-slate-800 p-8 md:p-10 group hover:border-violet-500/30 transition-all duration-500 shadow-xl">
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-blue-600/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] group-hover:bg-violet-500/20 transition-colors duration-500" />

                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-medium mb-3 border border-blue-500/20">
                                    <Sparkles className="w-3 h-3" />
                                    Enterprise Solutions
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                    ¿Necesitas una arquitectura a medida?
                                </h3>
                                <p className="text-slate-400 text-sm mb-3 leading-relaxed max-w-lg">
                                    Desarrollo de Soluciones Catalyst CX (Omnicanal + Web + WhatsApp).
                                    Integración de bases de conocimiento y entrenamiento avanzado.
                                </p>
                            </div>

                            <div className="flex flex-col items-start md:items-end gap-3">
                                {/* Price prominently displayed */}
                                <div className="text-right">
                                    <p className="text-2xl md:text-3xl font-bold text-white">
                                        Desde $800 USD
                                    </p>
                                    <p className="text-cyan-400 text-sm font-semibold">
                                        Pago único de implementación
                                    </p>
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        size="lg"
                                        className="bg-white text-slate-950 hover:bg-slate-200 font-bold min-w-[200px] h-10 text-sm shadow-xl shadow-white/5"
                                    >
                                        Cotizar Proyecto
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Gradient fade to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent z-0" />
        </section>
    );
};

export default Pricing;
