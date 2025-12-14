"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2, Mail, Lock, User, Building, Github } from "lucide-react";
import { registerUser } from "@/app/auth/register/actions";
import { SocialLogin } from "./SocialLogin";
import { toast } from "sonner";

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);


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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
                {/* Ambient Lighting & Glows */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_50%)] animate-pulse duration-[8000ms]" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                </div>

                <div className="relative z-10">
                    <div className="mb-6 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2"
                        >
                            Crea tu cuenta
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-zinc-400 text-xs sm:text-sm"
                        >
                            Comienza tu prueba gratuita de 14 días
                        </motion.p>
                    </div>

                    <div className="mb-6">
                        <SocialLogin />
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] sm:text-xs uppercase tracking-widest">
                            <span className="bg-[#050505]/50 backdrop-blur-sm px-2 text-zinc-600">O Email</span>
                        </div>
                    </div>



                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <Label htmlFor="name" className="text-zinc-400 text-[10px] uppercase tracking-wider font-semibold ml-1">Nombre</Label>
                                <div className="relative group/input transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:shadow-[0_0_20px_-4px_rgba(59,130,246,0.3)] rounded-xl bg-zinc-900/40 border border-white/5 overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center">
                                        <User className="text-zinc-600 group-focus-within/input:text-blue-400 transition-colors" size={16} />
                                    </div>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Juan"
                                        className="h-10 pl-10 bg-transparent border-0 text-white text-sm placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="lastname" className="text-zinc-400 text-[10px] uppercase tracking-wider font-semibold ml-1">Apellido</Label>
                                <div className="relative group/input transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:shadow-[0_0_20px_-4px_rgba(59,130,246,0.3)] rounded-xl bg-zinc-900/40 border border-white/5 overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center">
                                        <User className="text-zinc-600 group-focus-within/input:text-blue-400 transition-colors" size={16} />
                                    </div>
                                    <Input
                                        id="lastname"
                                        name="lastname"
                                        placeholder="Pérez"
                                        className="h-10 pl-10 bg-transparent border-0 text-white text-sm placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="company" className="text-zinc-400 text-[10px] uppercase tracking-wider font-semibold ml-1">Empresa</Label>
                            <div className="relative group/input transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:shadow-[0_0_20px_-4px_rgba(59,130,246,0.3)] rounded-xl bg-zinc-900/40 border border-white/5 overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center">
                                    <Building className="text-zinc-600 group-focus-within/input:text-blue-400 transition-colors" size={16} />
                                </div>
                                <Input
                                    id="company"
                                    name="company"
                                    placeholder="Mi Empresa S.A."
                                    className="h-10 pl-10 bg-transparent border-0 text-white text-sm placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-zinc-400 text-[10px] uppercase tracking-wider font-semibold ml-1">Email</Label>
                            <div className="relative group/input transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:shadow-[0_0_20px_-4px_rgba(59,130,246,0.3)] rounded-xl bg-zinc-900/40 border border-white/5 overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center">
                                    <Mail className="text-zinc-600 group-focus-within/input:text-blue-400 transition-colors" size={16} />
                                </div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="hola@ejemplo.com"
                                    className="h-10 pl-10 bg-transparent border-0 text-white text-sm placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="password" className="text-zinc-400 text-[10px] uppercase tracking-wider font-semibold ml-1">Contraseña</Label>
                            <div className="relative group/input transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:shadow-[0_0_20px_-4px_rgba(59,130,246,0.3)] rounded-xl bg-zinc-900/40 border border-white/5 overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center">
                                    <Lock className="text-zinc-600 group-focus-within/input:text-blue-400 transition-colors" size={16} />
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-10 pl-10 bg-transparent border-0 text-white text-sm placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white h-11 rounded-xl transition-all duration-300 shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] hover:shadow-[0_0_25px_-5px_rgba(37,99,235,0.6)] relative overflow-hidden group/btn"
                                disabled={isLoading}
                                type="submit"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
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

                    {/* Text Footer */}
                    <div className="mt-6 text-center space-y-3">
                        <p className="text-zinc-400 text-xs">
                            ¿Ya tienes una cuenta?{" "}
                            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-bold hover:underline transition-all">
                                Inicia sesión
                            </Link>
                        </p>

                        <p className="text-zinc-500 text-[10px] max-w-xs mx-auto leading-relaxed">
                            Al continuar, aceptas nuestros{" "}
                            <Link href="#" className="text-violet-400 hover:text-violet-300 underline transition-colors">Términos de servicio</Link>
                            {" "}y confirmas que has leído nuestra{" "}
                            <Link href="#" className="text-violet-400 hover:text-violet-300 underline transition-colors">Política de privacidad</Link>.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
