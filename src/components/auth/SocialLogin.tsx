"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Github, Chrome } from "lucide-react"; // Using Chrome icon as Google proxy if specific Google icon isn't available, or simple text.
import { useState } from "react";

export function SocialLogin() {
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isGithubLoading, setIsGithubLoading] = useState(false);

    const supabase = createClient();

    const handleLogin = async (provider: "google" | "github") => {
        if (provider === "google") setIsGoogleLoading(true);
        if (provider === "github") setIsGithubLoading(true);

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    // This requires the /auth/callback route to be implemented!
                    redirectTo: `${location.origin}/auth/callback`,
                },
            });

            if (error) {
                console.error("OAuth error:", error);
                // Here we should add toast notification in next steps
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        } finally {
            // We don't set loading to false immediately because we want to show state while redirecting
            setTimeout(() => {
                if (provider === "google") setIsGoogleLoading(false);
                if (provider === "github") setIsGithubLoading(false);
            }, 2000);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <Button
                variant="outline"
                type="button"
                disabled={isGoogleLoading}
                onClick={() => handleLogin("google")}
                className="w-full bg-background hover:bg-muted"
            >
                {isGoogleLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                )}
                <span className="sr-only">Google</span>
                Google
            </Button>

            <Button
                variant="outline"
                type="button"
                disabled={isGithubLoading}
                onClick={() => handleLogin("github")}
                className="w-full bg-background hover:bg-muted"
            >
                {isGithubLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                    <Github className="mr-2 h-4 w-4" />
                )}
                <span className="sr-only">GitHub</span>
                GitHub
            </Button>
        </div>
    );
}
