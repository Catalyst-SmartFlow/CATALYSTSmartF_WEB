import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/layout/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "Catalyst - AI & Automation Solutions",
    description: "Catalyst is an agency dedicated to efficiency for SMEs, developing custom automation and AI systems.",
    icons: {
        icon: "/catalystLogos/ICONOGRAFIA/SVG/catalystIconografiaFondoNegro.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}