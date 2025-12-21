"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Trash2, Minimize2, Maximize2 } from "lucide-react";
import { useN8NChat } from "@/hooks/useN8NChat";
import { cn } from "@/lib/utils";
import Image from "next/image";

// --- Simple Markdown Renderer ---
const SimpleMarkdown = ({ content }: { content: string }) => {
    const paragraphs = content.split(/\n\n+/);
    return (
        <div className="space-y-2">
            {paragraphs.map((p, i) => (
                <p key={i} className="leading-relaxed">
                    {p.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g).map((part, j) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                            return <strong key={j} className="text-violet-200 font-semibold">{part.slice(2, -2)}</strong>;
                        }
                        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
                        if (linkMatch) {
                            return (
                                <a key={j} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-violet-300 underline hover:text-violet-100 transition-colors">
                                    {linkMatch[1]}
                                </a>
                            );
                        }
                        return part;
                    })}
                </p>
            ))}
        </div>
    );
};

const SUGGESTIONS = [
    { label: "🚀 Servicios", text: "¿Qué servicios ofrecen en Catalyst?" },
    { label: "💰 Precios", text: "¿Cuáles son sus planes y precios?" },
    { label: "📞 Agendar", text: "Me gustaría agendar una reunión." },
    { label: "🤖 Automatización", text: "¿Cómo funciona la automatización con IA?" },
];

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [showProactive, setShowProactive] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [greeting, setGreeting] = useState("Hola");
    
    // Webhook URL from env
    const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK || "";

    const { messages, sendMessage, clearChat, isLoading } = useN8NChat({
        webhookUrl: WEBHOOK_URL,
    });

    // Time-aware greeting
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Buenos días");
        else if (hour < 18) setGreeting("Buenas tardes");
        else setGreeting("Buenas noches");
    }, []);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setShowProactive(false);
            // Focus input on open
            setTimeout(() => textareaRef.current?.focus(), 300);
        }
    }, [messages, isOpen]);

    // Hide proactive message after 10s
    useEffect(() => {
        const timer = setTimeout(() => setShowProactive(false), 10000);
        return () => clearTimeout(timer);
    }, []);

    const handleSend = async (text: string = inputValue) => {
        if (!text.trim()) return;
        await sendMessage(text);
        setInputValue("");
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSuggestionClick = (text: string) => {
        handleSend(text);
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-4 font-sans isolate">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                        className={cn(
                            "flex flex-col",
                            "fixed inset-0 sm:inset-auto sm:relative", // Fullscreen on mobile
                            "w-full h-full sm:w-[380px] sm:h-[min(600px,80vh)]",
                            "bg-black/30 backdrop-blur-3xl border border-white/10 sm:rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/10"
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5 backdrop-blur-md select-none">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center relative z-10 shadow-lg shadow-black/20 overflow-hidden border border-white/10">
                                         <Image 
                                            src="/catalystLogos/ICONOGRAFIA/SVG/iconografiaFONDOblanco.svg" 
                                            alt="EstafanIA Avatar" 
                                            fill
                                            className="object-cover scale-110" 
                                        />
                                    </div>
                                    <span className={cn(
                                        "absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-black rounded-full z-20 transition-colors duration-500",
                                        isLoading ? "bg-amber-400 animate-pulse" : "bg-emerald-500"
                                    )} />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-2 drop-shadow-sm">
                                        EstafanIA 
                                        {/* Verified badge roughly modeled */}
                                        <Sparkles className="w-3 h-3 text-violet-400" />
                                    </h3>
                                    <p className="text-white/50 text-[10px] font-medium uppercase tracking-wider transition-all duration-300">
                                        {isLoading ? "Escribiendo..." : "Online"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={clearChat}
                                    className="p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-red-400 transition-colors"
                                    title="Limpiar chat"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin overscroll-y-contain">
                            {/* Contextual Greeting Banner */}
                            <div className="text-center py-4">
                                <p className="text-xs text-white/30 uppercase tracking-widest">{new Date().toLocaleDateString()}</p>
                            </div>

                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className={cn(
                                        "flex w-full",
                                        msg.role === "user" ? "justify-end" : "justify-start"
                                    )}
                                >
                                    {msg.role === "assistant" && (
                                         <div className="w-8 h-8 rounded-full bg-black flex-shrink-0 mr-2 mt-1 overflow-hidden relative border border-white/10">
                                            <Image 
                                                src="/catalystLogos/ICONOGRAFIA/SVG/iconografiaFONDOblanco.svg" 
                                                alt="Bot" 
                                                fill
                                                className="object-cover scale-110"
                                            />
                                         </div>
                                    )}
                                    <div
                                        className={cn(
                                            "max-w-[80%] p-3.5 rounded-2xl text-sm shadow-sm leading-relaxed relative group backdrop-blur-sm",
                                            msg.role === "user"
                                                ? "bg-violet-600/90 text-white rounded-tr-sm shadow-violet-500/10"
                                                : "bg-white/10 text-slate-200 rounded-tl-sm border border-white/5"
                                        )}
                                    >
                                        {msg.role === "assistant" ? (
                                            <SimpleMarkdown content={msg.content} />
                                        ) : (
                                            msg.content
                                        )}
                                        <p className="text-[10px] opacity-40 mt-1 text-right select-none">
                                            {typeof msg.timestamp === 'string' ? new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                            
                            {/* Thinking Indicator */}
                            {isLoading && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                     <div className="w-8 h-8 rounded-full bg-black flex-shrink-0 mr-2 mt-1 overflow-hidden relative border border-white/10">
                                        <Image 
                                            src="/catalystLogos/ICONOGRAFIA/SVG/iconografiaFONDOblanco.svg" 
                                            alt="Bot" 
                                            fill 
                                            className="object-cover scale-110"
                                        />
                                     </div>
                                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-sm border border-white/5 flex items-center gap-2 backdrop-blur-sm">
                                        <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></span>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/5 bg-white/5 backdrop-blur-md">
                            <div className="flex gap-2 relative items-end">
                                <textarea
                                    ref={textareaRef}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={`${greeting}, escribe aquí...`}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 resize-none min-h-[44px] max-h-[120px] no-scrollbar transition-all shadow-inner"
                                    rows={1}
                                    style={{ height: 'auto' }}
                                    onInput={(e) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        target.style.height = 'auto'; 
                                        target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
                                    }}
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!inputValue.trim() || isLoading}
                                    className={cn(
                                        "p-3 rounded-xl transition-all duration-200 flex-shrink-0 mb-[1px]",
                                        !inputValue.trim() || isLoading
                                            ? "bg-white/5 text-white/20 cursor-not-allowed"
                                            : "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20 active:scale-95 hover:-translate-y-0.5"
                                    )}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Proactive Bubble */}
            <AnimatePresence>
                {!isOpen && showProactive && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute bottom-20 right-0 bg-white text-black text-sm px-4 py-2 rounded-xl rounded-br-sm shadow-xl font-medium whitespace-nowrap hidden sm:block pointer-events-none after:content-[''] after:absolute after:-bottom-2 after:right-6 after:border-8 after:border-t-white after:border-x-transparent after:border-b-transparent"
                    >
                        {greeting}, ¿te ayudo en algo? 👋
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg transition-all relative z-50",
                    isOpen 
                        ? "bg-black text-white/80 border border-white/20 hover:bg-black/90 rotate-90" 
                        : "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:shadow-violet-500/40 hover:shadow-2xl"
                )}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <Minimize2 className="w-6 h-6 sm:w-7 sm:h-7" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default ChatWidget;
