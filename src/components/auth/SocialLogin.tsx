"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SocialLoginProps {
    mode?: "login" | "register";
}

export function SocialLogin({ mode = "login" }: SocialLoginProps) {
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isGithubLoading, setIsGithubLoading] = useState(false);

    const supabase = createClient();

    const handleLogin = async (provider: "google" | "github") => {
        if (provider === "google") setIsGoogleLoading(true);
        if (provider === "github") setIsGithubLoading(true);

        document.cookie = `auth_flow_mode=${mode}; path=/; max-age=300`;

        try {
            const returnUrl = `${location.origin}/auth/callback`;

            const { error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: returnUrl,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'select_account',
                    },
                },
            });

            if (error) {
                console.error("OAuth error:", error);
                toast.error(`Error al iniciar con ${provider}`);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            toast.error("Error inesperado en autenticación social.");
        } finally {
            // Delay resetting loading to keep UI stable during redirect
            setTimeout(() => {
                if (provider === "google") setIsGoogleLoading(false);
                if (provider === "github") setIsGithubLoading(false);
            }, 4000);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-3">
            <Button
                variant="outline"
                type="button"
                disabled={isGoogleLoading || isGithubLoading}
                onClick={() => handleLogin("google")}
                className="w-full h-11 bg-white/5 border-white/5 hover:bg-white/10 text-white hover:text-white transition-all duration-200"
            >
                {isGoogleLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-transparent" />
                ) : (
                    <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-white" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                        <span>Google</span>
                    </div>

                )}
            </Button>

            <Button
                variant="outline"
                type="button"
                disabled={isGithubLoading || isGoogleLoading}
                onClick={() => handleLogin("github")}
                className="w-full h-11 bg-white/5 border-white/5 hover:bg-white/10 text-white hover:text-white transition-all duration-200"
            >
                {isGithubLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-transparent" />
                ) : (
                    <div className="flex items-center gap-2">
                        <Github className="h-4 w-4 text-white" />
                        <span>GitHub</span>
                    </div>
                )}
            </Button>
        </div>
    );
}
