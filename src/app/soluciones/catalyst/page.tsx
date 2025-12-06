import React from "react";
import CatalystCXHero from "@/components/solutions/catalyst/Hero";
import ProblemAgitation from "@/components/solutions/catalyst/ProblemAgitation";
import Pricing from "@/components/solutions/catalyst/Pricing";
import FeaturesBento from "@/components/solutions/catalyst/FeaturesBento";

export default function CatalystCXPage() {
    return (
        <main className="min-h-screen bg-[#050505]">
            <CatalystCXHero />
            <ProblemAgitation />
            <Pricing />
            <FeaturesBento />
        </main>
    );
}
