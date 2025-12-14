"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSafeAction } from "@/lib/safe-action";

const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "Ingresa tu contraseña"),
});

export const loginUser = createSafeAction(loginSchema, async (data) => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
    });

    if (error) {
        throw error; // Map via global handler
    }

    redirect("/dashboard");
    return { message: "Login exitoso" };
});
