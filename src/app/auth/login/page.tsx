import Login from "@/components/auth/Login";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#050505] relative">
            <div className="p-8 md:absolute md:top-0 md:left-0 z-20">
                <Link href="/" className="transition-opacity hover:opacity-80 block">
                    <img
                        src="/catalystLogos/TIPOGRAFIA/SVG/tipografiaBlanca-S.svg"
                        alt="Catalyst"
                        className="h-[40px] w-[162px] object-cover object-center"
                    />
                </Link>
            </div>
            <div className="flex-1 flex items-center justify-center px-4">
                <Login />
            </div>
        </div>
    );
}
