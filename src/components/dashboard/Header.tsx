"use client";

import { signOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
    className?: string;
}

export function DashboardHeader({ className }: DashboardHeaderProps) {
    return (
        <header className={cn("w-full border-b border-white/5 bg-black/20 backdrop-blur-md px-6 py-4 flex items-center justify-between", className)}>
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs">
                    C
                </div>
                <span className="text-white font-medium text-sm tracking-tight">Catalyst</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                    <div className="h-6 w-6 rounded-full bg-zinc-800 flex items-center justify-center">
                        <User size={14} className="text-zinc-400" />
                    </div>
                    <span className="text-xs text-zinc-400">Usuario</span>
                </div>

                <form action={() => signOut()}>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-zinc-400 hover:text-red-400 hover:bg-red-500/10 gap-2"
                    >
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Cerrar Sesión</span>
                    </Button>
                </form>
            </div>
        </header>
    );
}
