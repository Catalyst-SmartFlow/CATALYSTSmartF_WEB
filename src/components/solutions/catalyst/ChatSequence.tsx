"use client";
import React from "react";
import { m as motion } from "framer-motion";

const ChatSequence = () => {
    const [step, setStep] = React.useState(0);

    React.useEffect(() => {
        const sequence = async () => {
            // Loop
            while (true) {
                setStep(0); // Reset
                await new Promise(r => setTimeout(r, 1000)); // Wait before start

                setStep(1); // Bot greeting
                await new Promise(r => setTimeout(r, 2500));

                setStep(2); // User typing
                await new Promise(r => setTimeout(r, 1500));

                setStep(3); // User message
                await new Promise(r => setTimeout(r, 1000));

                setStep(4); // Bot reply
                await new Promise(r => setTimeout(r, 2500));

                setStep(5); // Form
                await new Promise(r => setTimeout(r, 5000)); // Hold before restart
            }
        };
        sequence();
    }, []);

    return (
        <div className="space-y-3">
            {/* Step 1: Bot Greeting */}
            {step >= 1 && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3"
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                        AI
                    </div>
                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none text-sm text-slate-200 max-w-[80%]">
                        👋 Hola! ¿Quieres automatizar tu negocio?
                    </div>
                </motion.div>
            )}

            {/* Step 2: User Typing */}
            {step === 2 && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3 justify-end"
                >
                    <div className="bg-violet-600/20 p-3 rounded-2xl rounded-tr-none text-sm text-violet-200">
                        <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce delay-100" />
                            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce delay-200" />
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Step 3: User Message */}
            {step >= 3 && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3 justify-end"
                >
                    <div className="bg-violet-600 p-3 rounded-2xl rounded-tr-none text-sm text-white max-w-[80%]">
                        Sí, necesito vender más.
                    </div>
                </motion.div>
            )}

            {/* Step 4: Bot Reply */}
            {step >= 4 && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3"
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                        AI
                    </div>
                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none text-sm text-slate-200 max-w-[80%]">
                        Puedo atender a 1000 clientes a la vez. ¿Te ayudo a configurar tu cuenta?
                    </div>
                </motion.div>
            )}

            {/* Step 5: Capture Form */}
            {step >= 5 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 p-4 rounded-xl mt-3 mx-11"
                >
                    <p className="text-xs text-slate-400 mb-3">Comienza tu prueba gratuita 👇</p>
                    <div className="space-y-2">
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                            readOnly
                        />
                        <button className="w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium py-2 rounded-lg transition-colors">
                            Empezar Ahora
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ChatSequence;
