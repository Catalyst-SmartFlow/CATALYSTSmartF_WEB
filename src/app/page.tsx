import Hero from "@/components/home/Hero";
import PartnersCarousel from "@/components/home/PartnersCarousel";
import InvisibleWorkforceV3 from "@/components/home/InvisibleWorkforceV3";
import CatalystAdvantage from "@/components/home/CatalystAdvantage";
import { SalesTeamHeadline } from "@/components/home/SalesTeamHeadline";
import { SalesProblem } from "@/components/home/SalesProblem";
import IntegrationsCarousel from "@/components/home/IntegrationsCarousel";
import StickyScrollFeatures from "../components/home/StickyScrollFeatures";
import MobileFeatures from "@/components/home/MobileFeatures";
import Footer from "@/components/layout/Footer";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-black">
            <Hero />

            {/* Sección de Logos con Título */}
            <div className="py-10 border-b border-white/5">
                <p className="text-center text-zinc-400 text-sm mb-8 uppercase tracking-widest">EMPRESAS QUE AUTOMATIZAN CON NOSOTROS</p>
                <PartnersCarousel />
            </div>

            {/* Sección de Fuerza Laboral Invisible (Velocity Engine V3) */}
            <SalesTeamHeadline />
            <SalesProblem />

            {/* Sección de Fuerza Laboral Invisible (Velocity Engine V3) */}
            <InvisibleWorkforceV3 />

            {/* Sección de Features (Desktop) */}
            <StickyScrollFeatures />

            {/* Sección de Integrations */}
            <IntegrationsCarousel />




            {/* Sección de Features (Mobile) */}
            <MobileFeatures />

            {/* Sección de Catalyst Advantage */}
            <CatalystAdvantage />

            <Footer />
        </main>
    );
}