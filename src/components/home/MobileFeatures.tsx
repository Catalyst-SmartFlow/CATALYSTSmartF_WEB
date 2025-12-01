"use client";

import React from "react";
import { MessageCircle, Zap, CalendarClock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Datos reutilizados de StickyScrollFeatures
const content = [
    {
        title: "Catalyst CX",
        subtitle: "Tu fuerza de ventas digital",
        description:
            "No es solo un chatbot. Es un asistente 'Neural' en Web y WhatsApp que califica leads y responde dudas 24/7. Captura clientes antes de que abandonen tu página.",
        tags: ["WhatsApp Neural", "Web AI Widget", "Omnicanal"],
        icon: MessageCircle,
        color: "from-violet-500 to-purple-500",
        visual: (
            <div className="flex flex-col gap-3 p-4 w-full max-w-[300px]">
                <div className="self-start rounded-2xl rounded-tl-none bg-zinc-800 p-3 text-sm text-zinc-300">
                    Hola, quiero información sobre los planes.
                </div>
                <div className="self-end rounded-2xl rounded-tr-none bg-violet-600 p-3 text-sm text-white shadow-lg shadow-violet-500/20">
                    ¡Claro! En Catalyst automatizamos tu crecimiento. ¿Te gustaría ver una demo ahora mismo?
                </div>
                <div className="self-start rounded-2xl rounded-tl-none bg-zinc-800 p-3 text-sm text-zinc-300 animate-pulse">
                    Escribiendo...
                </div>
            </div>
        ),
    },
    {
        title: "Catalyst Ops",
        subtitle: "La magia invisible (n8n)",
        description:
            "Sincronización pura. Si alguien compra en tu web, generamos la factura y notificamos a tu equipo en Slack automáticamente. Sin intervención humana.",
        tags: ["Automatización n8n", "Conexión CRM", "Facturación Auto"],
        icon: Zap,
        color: "from-blue-500 to-cyan-500",
        visual: (
            <div className="relative flex items-center justify-center w-full h-full min-h-[200px]">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-dashed border-cyan-500/50 animate-[spin_10s_linear_infinite]" />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center z-10">
                    <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-lg text-xs text-zinc-400">Stripe</div>
                    <div className="flex items-center justify-center text-cyan-400">
                        <ArrowRight className="w-4 h-4" />
                    </div>
                    <div className="bg-cyan-900/30 border border-cyan-500 p-2 rounded-lg text-xs text-cyan-200">Factura</div>

                    <div className="col-span-3 flex justify-center py-2">
                        <div className="h-8 w-px bg-zinc-700"></div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-lg text-xs text-zinc-400">Slack</div>
                    <div className="flex items-center justify-center text-cyan-400">
                        <ArrowRight className="w-4 h-4" />
                    </div>
                    <div className="bg-green-900/30 border border-green-500 p-2 rounded-lg text-xs text-green-200">Notificado</div>
                </div>
            </div>
        ),
    },
    {
        title: "Agenda AI",
        subtitle: "Elimina el ausentismo",
        description:
            "Ideal para clínicas y servicios. Un bot que califica pacientes, responde preguntas frecuentes y agenda directo en Google Calendar.",
        tags: ["Google Calendar Sync", "Recordatorios", "Salud & Servicios"],
        icon: CalendarClock,
        color: "from-emerald-500 to-green-500",
        visual: (
            <div className="bg-zinc-900 w-64 rounded-xl border border-zinc-800 overflow-hidden mx-auto">
                <div className="bg-zinc-800 p-3 flex justify-between items-center">
                    <span className="text-xs text-zinc-400">Octubre 2024</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                </div>
                <div className="p-3 space-y-2">
                    <div className="h-8 bg-zinc-800 rounded flex items-center px-2 text-[10px] text-zinc-500 line-through">09:00 AM - Ocupado</div>
                    <div className="h-10 bg-emerald-500/20 border border-emerald-500/50 rounded flex items-center px-2 text-xs text-emerald-300">
                        10:30 AM - Cita Nueva (Bot)
                    </div>
                    <div className="h-8 bg-zinc-800 rounded flex items-center px-2 text-[10px] text-zinc-500">12:00 PM - Disponible</div>
                </div>
            </div>
        ),
    },
];

export default function MobileFeatures() {
    return (
        <section className="md:hidden block space-y-16 px-4 py-20 bg-black">
            <div className="text-center mb-10">
                <span className="text-sm font-medium text-zinc-500 uppercase tracking-widest border border-zinc-800 px-3 py-1 rounded-full">
                    Nuestras Soluciones
                </span>
            </div>

            <div className="flex flex-col gap-20">
                {content.map((item, index) => (
                    <div key={index} className="flex flex-col gap-8">
                        {/* Visual */}
                        <div className="w-full flex items-center justify-center">
                            <div className={cn(
                                "relative w-full max-w-[320px] aspect-square rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center bg-zinc-950/50 backdrop-blur-xl",
                                "shadow-2xl"
                            )}>
                                <div className={cn("absolute inset-0 opacity-20 bg-gradient-to-br blur-3xl", item.color)} />
                                <div className="relative z-10">
                                    {item.visual}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col items-center text-center">
                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br", item.color)}>
                                <item.icon className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                            <p className={`text-lg font-medium bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-4`}>
                                {item.subtitle}
                            </p>
                            <p className="text-zinc-400 leading-relaxed mb-6">
                                {item.description}
                            </p>

                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                {item.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-300 font-mono">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <Button variant="outline" className="group border-zinc-700 hover:bg-zinc-800 text-white rounded-full w-full max-w-xs">
                                Ver Detalles <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}