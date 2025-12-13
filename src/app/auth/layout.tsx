export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#000000] relative overflow-hidden">
            {/* Background Gradients/Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px]" />

            {/* Grid pattern overlay (optional) */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />

            <main className="relative z-10 w-full flex justify-center px-4">
                {children}
            </main>
        </div>
    );
}
