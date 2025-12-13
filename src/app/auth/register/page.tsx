import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Registrarse | Catalyst",
    description: "Crea tu cuenta en Catalyst",
};

export default function RegisterPage() {
    return <RegisterForm />;
}
