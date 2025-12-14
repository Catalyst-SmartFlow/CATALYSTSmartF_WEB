"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2, Mail, Lock, User, Building } from "lucide-react";
import { registerUser } from "@/app/auth/register/actions";
import { SocialLogin } from "./SocialLogin";
import { toast } from "sonner";

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const error = searchParams.get("error");
        if (error) {
            if (error === "account_already_exists") {
                toast.error("Esta cuenta ya está registrada. Por favor inicia sesión.");
            } else if (error === "oauth_failed") {
                toast.error("Error al autenticar con Google/GitHub.");
            }
            router.replace(window.location.pathname);
        }
    }, [searchParams, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            const result = await registerUser(formData);
            if (result?.error) {
                if (typeof result.error === 'object') {
                    const firstError = Object.values(result.error).flat()[0];
                    toast.error(firstError as string);
                } else {
                    toast.error(result.error as string);
                }
            } else if (result?.message) {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Ocurrió un error inesperado");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
                {/* Subtle internal glow */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[50px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10">
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                            Crea tu cuenta
                        </h1>
                        <p className="text-zinc-400 text-sm">
                            Comienza tu prueba gratuita
                        </p>
                    </div>

                    <div className="mb-6">
                        <SocialLogin mode="register" />
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-widest">
                            <span className="bg-[#0a0a0a] px-2 text-zinc-500">O con Email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold ml-1">Nombre</Label>
                                <div className="relative group/input">
                                    <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                                        <User className="text-zinc-500 group-focus-within/input:text-blue-400 transition-colors" size={16} />
                                    </div>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Juan"
                                        className="h-10 pl-10 bg-white/5 border-white/5 text-white text-sm placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 rounded-xl transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastname" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold ml-1">Apellido</Label>
                                <div className="relative group/input">
                                    <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                                        <User className="text-zinc-500 group-focus-within/input:text-blue-400 transition-colors" size={16} />
                                    </div>
                                    <Input
                                        id="lastname"
                                        name="lastname"
                                        placeholder="Pérez"
                                        className="h-10 pl-10 bg-white/5 border-white/5 text-white text-sm placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 rounded-xl transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="company" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold ml-1">Empresa</Label>
                            <div className="relative group/input">
                                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                                    <Building className="text-zinc-500 group-focus-within/input:text-blue-400 transition-colors" size={16} />
                                </div>
                                <Input
                                    id="company"
                                    name="company"
                                    placeholder="Mi Empresa S.A."
                                    className="h-10 pl-10 bg-white/5 border-white/5 text-white text-sm placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 rounded-xl transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold ml-1">Email</Label>
                            <div className="relative group/input">
                                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                                    <Mail className="text-zinc-500 group-focus-within/input:text-blue-400 transition-colors" size={16} />
                                </div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="hola@ejemplo.com"
                                    className="h-10 pl-10 bg-white/5 border-white/5 text-white text-sm placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 rounded-xl transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold ml-1">Contraseña</Label>
                            <div className="relative group/input">
                                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                                    <Lock className="text-zinc-500 group-focus-within/input:text-blue-400 transition-colors" size={16} />
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-10 pl-10 bg-white/5 border-white/5 text-white text-sm placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 rounded-xl transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white h-11 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 font-medium relative overflow-hidden group/btn text-base"
                                disabled={isLoading}
                                type="submit"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" size={18} />
                                    ) : (
                                        <>
                                            Crear cuenta
                                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6 text-center space-y-4">
                        <div className="text-center">
                            <span className="text-zinc-400 text-sm">¿Ya tienes una cuenta?</span>
                            <Link
                                href="/auth/login"
                                className="ml-2 text-blue-400 hover:text-blue-300 font-medium hover:underline transition-all"
                            >
                                Iniciar sesión
                            </Link>
                        </div>

                        <p className="text-zinc-500 text-[10px] leading-relaxed px-4 pt-2 border-t border-white/5">
                            Al hacer clic en "Crear cuenta", aceptas nuestros <Link href="#" className="underline hover:text-zinc-300">Términos de servicio</Link> y <Link href="#" className="underline hover:text-zinc-300">Política de privacidad</Link>.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
