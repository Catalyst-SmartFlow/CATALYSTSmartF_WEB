"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Lock, Mail } from "lucide-react";

export default function LoginForm() {
    return (
        <div className="w-full max-w-[900px] h-[600px] flex bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative z-10">
            {/* Left Side: Form */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative bg-[#0A0A0A]">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Bienvenido de nuevo
                    </h2>
                    <p className="text-zinc-500 mt-2">
                        Ingresa tus credenciales para acceder a tu panel.
                    </p>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-400">
                            Email
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-600" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="hola@ejemplo.com"
                                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-zinc-400">
                            Contraseña
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-600" />
                            <Input
                                id="password"
                                type="password"
                                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded border border-zinc-700 bg-white/5" />
                            <span className="text-sm text-zinc-400">Recordarme</span>
                        </div>
                        <Link
                            href="#"
                            className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6 text-lg rounded-xl transition-all shadow-lg shadow-violet-900/20 group">
                        Ingresar
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </form>
            </div>

            {/* Right Side: Action Panel (Visual Link to Register) */}
            <div className="hidden md:flex w-1/2 bg-violet-600 relative overflow-hidden flex-col items-center justify-center p-12 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-900" />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />

                {/* Abstract Circles */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

                <div className="relative z-10 text-white">
                    <h2 className="text-3xl font-bold mb-4">¿No tienes cuenta?</h2>
                    <p className="text-violet-100 mb-8 max-w-xs mx-auto">
                        Comienza tu viaje con Catalyst hoy mismo y optimiza tu flujo de trabajo.
                    </p>
                    <Link href="/auth/register">
                        <Button
                            variant="outline"
                            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-violet-900 py-6 px-8 rounded-full text-lg font-medium transition-all"
                        >
                            Registrarse
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
