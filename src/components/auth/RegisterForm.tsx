"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Lock, Mail, User } from "lucide-react";

export default function RegisterForm() {
    return (
        <div className="w-full max-w-[900px] h-[600px] flex bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative z-10">
            {/* Left Side: Action Panel (Visual Link to Login) */}
            <div className="hidden md:flex w-1/2 bg-violet-600 relative overflow-hidden flex-col items-center justify-center p-12 text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-900" />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />

                {/* Abstract Circles */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

                <div className="relative z-10 text-white">
                    <h2 className="text-3xl font-bold mb-4">¿Ya tienes cuenta?</h2>
                    <p className="text-violet-100 mb-8 max-w-xs mx-auto">
                        Ingresa para continuar gestionando tus proyectos con Catalyst.
                    </p>
                    <Link href="/auth/login">
                        <Button
                            variant="outline"
                            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-violet-900 py-6 px-8 rounded-full text-lg font-medium transition-all"
                        >
                            Ingresar
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative bg-[#0A0A0A]">
                <div className="mb-8 text-right md:text-left">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Crear cuenta
                    </h2>
                    <p className="text-zinc-500 mt-2">
                        Únete a la plataforma líder en automatización.
                    </p>
                </div>

                <form className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-zinc-400">
                            Nombre Completo
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-zinc-600" />
                            <Input
                                id="name"
                                type="text"
                                placeholder="Juan Pérez"
                                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20"
                            />
                        </div>
                    </div>

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
                                placeholder="Min. 8 caracteres"
                                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:ring-violet-500/20"
                            />
                        </div>
                    </div>

                    <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6 text-lg rounded-xl transition-all shadow-lg shadow-violet-900/20 group mt-2">
                        Registrarse
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
