import { useState, useCallback, useEffect } from "react";

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface UseN8NChatProps {
    webhookUrl: string;
}

const STORAGE_KEY = "catalyst_chat_history_v1";

const INITIAL_MESSAGE: Message = {
    id: "welcome",
    role: "assistant",
    content: "👋 Hola! Soy **EstafanIA**. ¿En qué puedo ayudarte hoy?",
    timestamp: new Date(),
};

export const useN8NChat = ({ webhookUrl }: UseN8NChatProps) => {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load from storage on mount
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Convert string dates back to Date objects
                const hydrated = parsed.map((m: any) => ({
                    ...m,
                    timestamp: new Date(m.timestamp),
                }));
                setMessages(hydrated);
            }
        } catch (e) {
            console.error("Failed to load chat history", e);
        }
    }, []);

    // Save to storage on change
    useEffect(() => {
        if (messages.length > 0) {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        }
    }, [messages]);

    const clearChat = useCallback(() => {
        setMessages([INITIAL_MESSAGE]);
        sessionStorage.removeItem(STORAGE_KEY);
    }, []);

    const sendMessage = useCallback(
        async (content: string) => {
            if (!content.trim() || !webhookUrl) return;

            const userMessage: Message = {
                id: Date.now().toString(),
                role: "user",
                content,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMessage]);
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(webhookUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: content,
                        chatHistory: messages.map(m => ({ role: m.role, content: m.content })),
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to send message to n8n");
                }

                const data = await response.json();
                const botContent = data.output || data.message || data.text || "Lo siento, no pude procesar tu respuesta.";

                const botMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: botContent,
                    timestamp: new Date(),
                };

                setMessages((prev) => [...prev, botMessage]);
            } catch (err) {
                console.error("Chat Error:", err);
                setError("Ocurrió un error al conectar con el asistente.");
                
                const errorMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: "⚠️ Lo siento, hubo un error de conexión. Por favor intenta de nuevo.",
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, errorMessage]);
            } finally {
                setIsLoading(false);
            }
        },
        [webhookUrl, messages]
    );

    return {
        messages,
        sendMessage,
        clearChat,
        isLoading,
        error,
    };
};
