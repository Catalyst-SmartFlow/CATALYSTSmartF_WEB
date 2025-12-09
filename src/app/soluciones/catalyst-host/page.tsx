import React from "react";
import CatalystHostHero from "@/components/solutions/catalyst-host/Hero";
import dynamic from "next/dynamic";

const ProblemSection = dynamic(() => import("@/components/solutions/catalyst-host/ProblemSection"));
const SolutionSection = dynamic(() => import("@/components/solutions/catalyst-host/SolutionSection"));
import MotionWrapper from "@/components/solutions/catalyst-host/MotionWrapper";

export default function CatalystHostPage() {
    return (
        <main className="min-h-screen bg-[#050505]">
            <MotionWrapper>
                <CatalystHostHero />
                <ProblemSection />
                <SolutionSection />
            </MotionWrapper>
        </main>
    );
}
