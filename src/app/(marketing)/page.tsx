import Hero from "@/components/home/Hero";
import dynamic from 'next/dynamic';

const PartnersCarousel = dynamic(() => import("@/components/home/PartnersCarousel"));
const InvisibleWorkforceV3 = dynamic(() => import("@/components/home/InvisibleWorkforceV3"));
const CoreProducts = dynamic(() => import("@/components/home/CoreProducts").then(mod => mod.CoreProducts));
const CatalystAdvantage = dynamic(() => import("@/components/home/CatalystAdvantage"));
const SalesTeamHeadline = dynamic(() => import("@/components/home/SalesTeamHeadline").then(mod => mod.SalesTeamHeadline));
const SalesProblem = dynamic(() => import("@/components/home/SalesProblem").then(mod => mod.SalesProblem));
const IntegrationsCarousel = dynamic(() => import("@/components/home/IntegrationsCarousel"));
const MobileFeatures = dynamic(() => import("@/components/trash/MobileFeatures"));
const Footer = dynamic(() => import("@/components/layout/Footer"));

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

            {/* Core Products Showcase (Living Interface) */}
            <CoreProducts />


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