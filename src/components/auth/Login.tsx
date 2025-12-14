"use client";


import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2, Mail, Lock, Github } from "lucide-react";
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
                // Handle Zod errors (object) or generic string
                if (typeof result.error === 'object') {
                    // Show first error of first field
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
        <div className="w-full max-w-md mx-auto p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
                {/* Ambient Lighting & Glows */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(109,40,217,0.08)_0%,transparent_50%)] animate-pulse [animation-duration:8s]" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                </div>

                <div className="relative z-10">
                    <div className="mb-8 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl font-bold tracking-tight text-white mb-2"
                        >
                            Bienvenido de nuevo
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-zinc-400 text-sm"
                        >
                            Ingresa a tu cuenta para continuar
                        </motion.p>
                    </div>

                    <div className="mb-6">
                        <SocialLogin mode="login" />
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-widest">
                            <span className="bg-[#050505]/50 backdrop-blur-sm px-2 text-zinc-600">O Email</span>
                        </div>
                    </div>



                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-400 text-xs uppercase tracking-wider font-semibold ml-1">Email</Label>
                            <div className="relative group/input transition-all duration-300 focus-within:ring-2 focus-within:ring-violet-500/50 focus-within:shadow-[0_0_20px_-4px_rgba(139,92,246,0.3)] rounded-xl bg-zinc-900/40 border border-white/5 overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center">
                                    <Mail className="text-zinc-600 group-focus-within/input:text-violet-400 transition-colors" size={18} />
                                </div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="hola@ejemplo.com"
                                    className="h-12 pl-12 bg-transparent border-0 text-white placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-zinc-400 text-xs uppercase tracking-wider font-semibold ml-1">Contraseña</Label>
                                <Link
                                    href="#"
                                    className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <div className="relative group/input transition-all duration-300 focus-within:ring-2 focus-within:ring-violet-500/50 focus-within:shadow-[0_0_20px_-4px_rgba(139,92,246,0.3)] rounded-xl bg-zinc-900/40 border border-white/5 overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center">
                                    <Lock className="text-zinc-600 group-focus-within/input:text-violet-400 transition-colors" size={18} />
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-12 pl-12 bg-transparent border-0 text-white placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white h-12 rounded-xl transition-all duration-300 shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)] hover:shadow-[0_0_25px_-5px_rgba(124,58,237,0.6)] relative overflow-hidden group/btn"
                                disabled={isLoading}
                                type="submit"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>
                                            Ingresar
                                            <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </Button>
                        </div>
                    </form>

                    {/* Text Footer */}
                    <div className="mt-8 text-center space-y-4">
                        <p className="text-zinc-400">
                            ¿No tienes una cuenta?{" "}
                            <Link href="/auth/register" className="text-violet-400 hover:text-violet-300 font-bold hover:underline transition-all">
                                Regístrate
                            </Link>
                        </p>

                        <p className="text-zinc-500 text-xs max-w-xs mx-auto leading-relaxed">
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
