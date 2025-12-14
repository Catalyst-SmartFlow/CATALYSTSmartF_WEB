"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2, Mail, Lock } from "lucide-react";
import { loginUser } from "@/app/auth/login/actions";
import { SocialLogin } from "./SocialLogin";
import { toast } from "sonner";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            const result = await loginUser(formData);

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
            toast.error("Ocurrió un error inesperado.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
                {/* Subtle internal glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-[50px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                    <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                            Bienvenido
                        </h2>
                        <p className="text-zinc-400 text-sm">
                            Ingresa a tu cuenta
                        </p>
                    </div>

                    <div className="mb-6">
                        <SocialLogin mode="login" />
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
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold ml-1">Email</Label>
                            <div className="relative group/input">
                                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                                    <Mail className="text-zinc-500 group-focus-within/input:text-violet-400 transition-colors" size={16} />
                                </div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="hola@ejemplo.com"
                                    className="h-10 pl-10 bg-white/5 border-white/5 text-white text-sm placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50 rounded-xl transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold ml-1">Contraseña</Label>
                                <Link
                                    href="#"
                                    className="text-[10px] text-violet-400 hover:text-violet-300 transition-colors font-medium"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <div className="relative group/input">
                                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
                                    <Lock className="text-zinc-500 group-focus-within/input:text-violet-400 transition-colors" size={16} />
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-10 pl-10 bg-white/5 border-white/5 text-white text-sm placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50 rounded-xl transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                className="w-full bg-violet-600 hover:bg-violet-500 text-white h-11 rounded-xl transition-all duration-300 shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 font-medium text-base relative overflow-hidden group/btn"
                                disabled={isLoading}
                                type="submit"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" size={18} />
                                    ) : (
                                        <>
                                            Ingresar
                                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6 text-center space-y-4">
                        <div className="text-center">
                            <span className="text-zinc-400 text-sm">¿No tienes una cuenta?</span>
                            <Link
                                href="/auth/register"
                                className="ml-2 text-violet-400 hover:text-violet-300 font-medium hover:underline transition-all"
                            >
                                Regístrate
                            </Link>
                        </div>

                        <p className="text-zinc-500 text-[10px] leading-relaxed px-4 pt-2 border-t border-white/5">
                            Al ingresar, aceptas nuestros <Link href="#" className="underline hover:text-zinc-300">Términos</Link> y <Link href="#" className="underline hover:text-zinc-300">Privacidad</Link>.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
