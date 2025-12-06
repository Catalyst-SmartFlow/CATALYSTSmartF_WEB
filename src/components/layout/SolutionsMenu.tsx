"use client";

import { motion } from "framer-motion";
import {
    Stethoscope,
    Utensils,
    MessageCircle,
    Bot,
    RefreshCw,
    ArrowRight,
    Sparkles,
    Share2,
    Blocks,
    HelpCircle
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const industries = [
    {
        icon: Stethoscope,
        title: "Salud y Consultorios",
        description: "Elimina el ausentismo y llena tu agenda 24/7 sin recepcionista.",
        href: "#",
        iconColor: "text-rose-950",
        bgColor: "bg-rose-400",
        arrowColor: "text-rose-400",
        hoverBg: "group-hover:bg-rose-500/5",
        hoverBorder: "group-hover:border-rose-500/10",
        shadowColor: "group-hover:shadow-rose-500/20"
    },
    {
        icon: Utensils,
        title: "Gastronomía y Hospitality",
        description: "Automatiza reservas, pedidos y dispara tus reseñas de 5 estrellas en Google.",
        href: "#",
        iconColor: "text-orange-950",
        bgColor: "bg-orange-400",
        arrowColor: "text-orange-400",
        hoverBg: "group-hover:bg-orange-500/5",
        hoverBorder: "group-hover:border-orange-500/10",
        shadowColor: "group-hover:shadow-orange-500/20"
    }
];

export const needs = [
    {
        icon: MessageCircle,
        title: "Ventas y Atención 24/7",
        description: "Convierte visitantes en clientes al instante. Atiende miles de chats simultáneamente.",
        href: "/soluciones/catalyst",
        iconColor: "text-cyan-950",
        bgColor: "bg-cyan-400",
        arrowColor: "text-cyan-400",
        hoverBg: "group-hover:bg-cyan-500/5",
        hoverBorder: "group-hover:border-cyan-500/10",
        shadowColor: "group-hover:shadow-cyan-500/20"
    },
    {
        icon: Bot,
        title: "Operaciones Autónomas",
        description: "Adiós al trabajo manual. Conecta facturación, CRM y equipos en piloto automático.",
        href: "#",
        iconColor: "text-violet-950",
        bgColor: "bg-violet-400",
        arrowColor: "text-violet-400",
        hoverBg: "group-hover:bg-violet-500/5",
        hoverBorder: "group-hover:border-violet-500/10",
        shadowColor: "group-hover:shadow-violet-500/20"
    },
    {
        icon: RefreshCw,
        title: "Reactivación de Ingresos",
        description: "Transforma leads \"muertos\" y bases antiguas en ventas nuevas sin bloqueos.",
        href: "#",
        iconColor: "text-emerald-950",
        bgColor: "bg-emerald-400",
        arrowColor: "text-emerald-400",
        hoverBg: "group-hover:bg-emerald-500/5",
        hoverBorder: "group-hover:border-emerald-500/10",
        shadowColor: "group-hover:shadow-emerald-500/20"
    }
];

export const platformLinks = [
    { title: "¿Por qué Catalyst?", href: "#", icon: Sparkles },
    { title: "Canales", href: "#", icon: Share2 },
    { title: "Integraciones", href: "#", icon: Blocks },
];

import { useRouter } from "next/navigation";

export default function SolutionsMenu({ closeMenu }: { closeMenu?: () => void }) {
    const router = useRouter();

    const handleNavigation = (href: string) => {
        if (closeMenu) closeMenu();
        router.push(href);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-[#050505] border-t border-white/10 shadow-2xl z-[60] overflow-hidden"
        >
            <div className="flex min-h-[500px]">

                {/* SIDEBAR: PLATAFORMA */}
                <div className="w-1/4 bg-zinc-900/30 border-r border-white/5 p-8 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xs font-semibold text-zinc-500 tracking-widest uppercase mb-6 pl-3">
                            Plataforma
                        </h3>
                        <div className="space-y-2">
                            {platformLinks.map((link, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleNavigation(link.href)}
                                    className="flex items-center gap-3 p-3 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all group border-l-2 border-transparent hover:border-violet-500 cursor-pointer"
                                >
                                    <link.icon size={18} className="text-zinc-500 group-hover:text-violet-400 transition-colors" />
                                    <span className="font-medium">{link.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FOOTER IN SIDEBAR */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/10">
                        <div className="flex items-start gap-3">
                            <HelpCircle size={20} className="text-violet-400 mt-1" />
                            <div>
                                <p className="text-sm font-medium text-white mb-1">¿Necesitas ayuda?</p>
                                <Link href="#" className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
                                    Contactar soporte <ArrowRight size={12} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="w-3/4 p-8 flex flex-col">
                    <div className="grid grid-cols-2 gap-12 flex-1">

                        {/* POR INDUSTRIA */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-semibold text-zinc-500 tracking-widest uppercase mb-4">
                                Por Industria
                            </h3>
                            <div className="grid gap-3">
                                {industries.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleNavigation(item.href)}
                                        className={cn(
                                            "group relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer",
                                            "border border-transparent",
                                            item.hoverBg,
                                            item.hoverBorder
                                        )}
                                    >
                                        <div className={cn(
                                            "p-3.5 rounded-2xl transition-all duration-300 shrink-0 group-hover:scale-110 group-hover:shadow-lg ring-1 ring-inset ring-white/20",
                                            item.bgColor,
                                            item.iconColor,
                                            item.shadowColor
                                        )}>
                                            <item.icon size={24} strokeWidth={2.5} />
                                        </div>
                                        <div className="space-y-1 relative z-10">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-zinc-200 transition-colors group-hover:text-white">
                                                    {item.title}
                                                </span>
                                                <ArrowRight size={14} className={cn(
                                                    "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all",
                                                    item.arrowColor
                                                )} />
                                            </div>
                                            <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* POR NECESIDAD */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-semibold text-zinc-500 tracking-widest uppercase mb-4">
                                Por Necesidad
                            </h3>
                            <div className="grid gap-3">
                                {needs.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleNavigation(item.href)}
                                        className={cn(
                                            "group relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer",
                                            "border border-transparent",
                                            item.hoverBg,
                                            item.hoverBorder
                                        )}
                                    >
                                        <div className={cn(
                                            "p-3.5 rounded-2xl transition-all duration-300 shrink-0 group-hover:scale-110 group-hover:shadow-lg ring-1 ring-inset ring-white/20",
                                            item.bgColor,
                                            item.iconColor,
                                            item.shadowColor
                                        )}>
                                            <item.icon size={24} strokeWidth={2.5} />
                                        </div>
                                        <div className="space-y-1 relative z-10">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-zinc-200 transition-colors group-hover:text-white">
                                                    {item.title}
                                                </span>
                                                <ArrowRight size={14} className={cn(
                                                    "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all",
                                                    item.arrowColor
                                                )} />
                                            </div>
                                            <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM BANNER */}
                    <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="flex items-center justify-between px-2">
                            <p className="text-sm text-zinc-400">
                                ¿No sabes por dónde empezar?
                            </p>
                            <Link href="#" className="text-sm font-medium text-white hover:text-violet-400 transition-colors flex items-center gap-2 group">
                                Hablar con un experto
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
