import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import Vision from "@/components/home/Vision";
import ServicesTeaser from "@/components/home/ServicesTeaser";
import Footer from "@/components/layout/Footer"; // Asegúrate de tener este archivo creado

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-black">
            <Hero />
            <ServicesTeaser /> {/* Bento Grid subido aquí para mayor impacto */}
            <Mission />
            <Vision />
            <Footer />
        </main>
    );
}