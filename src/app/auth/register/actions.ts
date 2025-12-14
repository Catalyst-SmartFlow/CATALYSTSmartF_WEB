"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSafeAction } from "@/lib/safe-action";

// Regex for "Safe Text" (Alphanumeric, spaces, basic punctuation)
// Prevents SQL injection characters like ; -- ' " (though partial/parameterized queries handle this, strict input is better)
const safeTextRegex = /^[a-zA-Z0-9\s.,áéíóúÁÉÍÓÚñÑüÜ-]+$/;

const registerSchema = z.object({
    name: z.string()
        .min(2, "Min 2 letras")
        .regex(safeTextRegex, "Caracteres inválidos detectados"),
    lastname: z.string()
        .min(2, "Min 2 letras")
        .regex(safeTextRegex, "Caracteres inválidos detectados"),
    company: z.string().optional()
        .refine(val => !val || safeTextRegex.test(val), "Nombre de empresa contiene caracteres inválidos"),
    email: z.string().email("Email inválido"),
    password: z.string()
        .min(8, "Mínimo 8 caracteres")
        .regex(/[A-Z]/, "Falta una mayúscula")
        .regex(/[a-z]/, "Falta una minúscula")
        .regex(/[0-9]/, "Falta un número")
        .regex(/[^A-Za-z0-9]/, "Falta un carácter especial"),
});

export const registerUser = createSafeAction(registerSchema, async (data) => {
    const supabase = createClient();

    const { error, data: authData } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                first_name: data.name,
                last_name: data.lastname,
                company_name: data.company,
            },
        },
    });

    if (error) {
        // Throwing allows the wrapper to catch and map the error
        throw error;
    }

    if (authData.session) {
        redirect("/dashboard");
    } else {
        redirect("/auth/login?message=check_email");
    }

    return { message: "Registro exitoso" };
});
