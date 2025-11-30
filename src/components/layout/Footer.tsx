export default function Footer() {
    return (
        <footer className="py-12 px-4 bg-black text-white border-t border-zinc-900">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold tracking-tighter">CATALYST</h2>
                    <p className="text-sm text-zinc-500">© 2024 Catalyst. Todos los derechos reservados.</p>
                </div>
                <div className="flex gap-6">
                    <a href="#" className="text-zinc-400 hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="text-zinc-400 hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="text-zinc-400 hover:text-white transition-colors">Instagram</a>
                </div>
            </div>
        </footer>
    );
}
