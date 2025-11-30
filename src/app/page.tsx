import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import Vision from "@/components/home/Vision";
import ServicesTeaser from "@/components/home/ServicesTeaser";
import Footer from "@/components/layout/Footer";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-black">
            <Hero />
            <Mission />
            <Vision />
            <ServicesTeaser />
            <Footer />
        </main>
    );
}
