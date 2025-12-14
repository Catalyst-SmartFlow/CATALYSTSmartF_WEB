import { z } from "zod";

export type ActionState = {
    error?: string | Record<string, string[]> | null;
    message?: string | null;
    data?: any;
};

/**
 * Validates Zod validation errors to a flat object structure.
 */
function flattenErrors(error: z.ZodError) {
    return error.flatten().fieldErrors;
}

/**
 * Standardized error mapper for Supabase and generic errors.
 */
function mapErrorToUserMessage(error: any): string {
    const msg = error?.message || "Error desconocido";

    if (msg.includes("Invalid login credentials")) return "Credenciales incorrectas.";
    if (msg.includes("Email not confirmed")) return "Email no verificado.";
    if (msg.includes("Too many requests") || error?.status === 429) return "Demasiados intentos. Espera un momento.";
    if (msg.includes("User already registered")) return "Este email ya está registrado.";
    if (msg.includes("weak_password")) return "La contraseña es muy débil (detectado por Supabase).";

    return msg; // Fallback for dev debugging, or change to "Error inesperado" for prod.
}

/**
 * Higher-order function to wrap Server Actions with:
 * 1. Global Error Handling
 * 2. Zod Validation
 * 3. Type Safety
 */
export function createSafeAction<TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: (validatedData: TInput) => Promise<ActionState>
): (formData: FormData) => Promise<ActionState> {
    return async (formData: FormData) => {
        try {
            // Convert FormData to object for Zod validation
            const data = Object.fromEntries(formData.entries());

            // Validate
            const validationResult = schema.safeParse(data);
            if (!validationResult.success) {
                return {
                    error: flattenErrors(validationResult.error),
                    message: "Error de validación en los campos.",
                };
            }

            // Execute standard handler
            return await handler(validationResult.data);

        } catch (error: any) {
            console.error("Global Action Error:", error);
            return {
                message: mapErrorToUserMessage(error),
            };
        }
    };
}
