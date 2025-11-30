import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "Catalyst - AI & Automation Solutions",
    description: "Catalyst is an agency dedicated to efficiency for SMEs, developing custom automation and AI systems.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
                <SmoothScroll>
                    <Header />
                    {children}
                </SmoothScroll>
            </body>
        </html>
    );
}
