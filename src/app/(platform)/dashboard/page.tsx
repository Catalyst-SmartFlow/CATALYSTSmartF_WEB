import { DashboardHeader } from "@/components/dashboard/Header";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <DashboardHeader />
            <main className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                        Bienvenido al Dashboard
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Has iniciado sesión correctamente. Esta es un área protegida.
                        Tu organización y perfil ya están configurados en la base de datos.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mt-12">
                        {/* Placeholder Cards */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-violet-500/20 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-zinc-800 mb-4" />
                                <h3 className="font-medium text-white mb-2">Módulo {i}</h3>
                                <p className="text-sm text-zinc-500">Funcionalidad próximamente disponible en la plataforma.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
