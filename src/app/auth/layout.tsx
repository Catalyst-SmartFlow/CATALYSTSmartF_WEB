import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full flex bg-[#050505] text-white overflow-hidden relative selection:bg-violet-500/30">
            {/* Background Effects for the whole page (mobile + desktop) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
            </div>

            {/* Left Side - Visual (Desktop Only) */}
            <div className="hidden lg:flex w-1/2 relative z-10 flex-col justify-between p-12 lg:p-16 lg:pb-32 border-r border-white/5 bg-black/20 backdrop-blur-sm">

                {/* Logo Area */}
                <div className="relative z-20">
                    <Link href="/" className="block w-fit transition-opacity hover:opacity-80">
                        <img
                            src="/catalystLogos/TIPOGRAFIA/SVG/tipografiaBlanca-S.svg"
                            alt="Catalyst"
                            className="h-[40px] w-[162px] object-cover object-center"
                        />
                    </Link>
                </div>

                {/* Main Visual Content */}
                <div className="relative z-20 flex flex-col gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25 mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h1 className="text-4xl xl:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 pb-2 leading-tight">
                        Escala tu negocio con inteligencia artificial.
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
                        Únete a miles de empresas que ya están automatizando sus ventas y atención al cliente con Catalyst.
                    </p>
                </div>

                {/* Footer / Quote */}
                <div className="relative z-20">
                    <div className="flex items-center gap-4 text-zinc-500 text-sm">
                        <p>© 2024 Catalyst. Todos los derechos reservados.</p>
                    </div>
                </div>

                {/* Grid Overlay for Texture */}
                <div className="absolute inset-0 z-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* Right Side - Form Container */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10 lg:pb-50">
                {/* Mobile Header (Only visible on < lg) */}
                <div className="absolute top-6 left-6 lg:hidden z-50">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium p-2 rounded-lg hover:bg-white/5">
                        <ArrowLeft size={16} />
                        Volver
                    </Link>
                </div>

                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
