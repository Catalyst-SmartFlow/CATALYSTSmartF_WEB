import React from "react";
import dynamic from "next/dynamic";
import CatalystCXHero from "@/components/solutions/catalyst/Hero";

// Dynamic Imports with Loading Placeholders to prevent layout shifts
const ProblemAgitation = dynamic(() => import("@/components/solutions/catalyst/ProblemAgitation"), {
    ssr: false,
    loading: () => <div className="w-full h-[600px] bg-[#050505]" />
});
const Pricing = dynamic(() => import("@/components/solutions/catalyst/Pricing"), {
    ssr: false,
    loading: () => <div className="w-full h-[800px] bg-[#050505]" />
});
const FeaturesBento = dynamic(() => import("@/components/solutions/catalyst/FeaturesBento"), {
    ssr: false,
    loading: () => <div className="w-full h-[900px] bg-[#050505]" />
});
const Integrations = dynamic(() => import("@/components/solutions/catalyst/Integrations"), {
    ssr: false,
    loading: () => <div className="w-full h-[800px] bg-[#050505]" />
});
const FAQSection = dynamic(() => import("@/components/solutions/catalyst/FAQSection"), {
    ssr: false,
    loading: () => <div className="w-full h-[600px] bg-[#050505]" />
});
const CTASection = dynamic(() => import("@/components/solutions/catalyst/CTASection"), {
    ssr: false,
    loading: () => <div className="w-full h-[400px] bg-[#050505]" />
});
import Footer from "@/components/layout/Footer";

export default function CatalystCXPage() {
    return (
        <main className="min-h-screen bg-[#050505]">
            <CatalystCXHero />
            <ProblemAgitation />
            <Pricing />
            <FeaturesBento />
            <Integrations />
            <FAQSection />
            <CTASection />
            <Footer />
        </main>
    );
}
