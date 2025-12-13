"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="w-full flex justify-center"
        >
            {children}
        </motion.div>
    );
}
