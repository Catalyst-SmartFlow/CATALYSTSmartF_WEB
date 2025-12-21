"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function AnimatedWaveFooter() {
  return (
    <footer className="relative bg-black pt-20 overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 h-full w-[200%] flex animate-wave origin-bottom opacity-30">
        {/* First SVG Copy */}
        <div className="h-full w-1/2 flex items-end">
            <svg
            className="w-full h-[500px]"
            viewBox="0 0 1800 500"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                d="M0 250C200 150 400 50 600 100C800 150 1000 350 1200 300C1400 250 1600 150 1800 250V500H0V250Z"
                fill="currentColor"
                className="text-zinc-800"
            />
            <path
                d="M0 250C200 200 400 100 600 150C800 200 1000 350 1200 300C1400 250 1600 200 1800 250V500H0V250Z"
                fill="currentColor"
                className="text-zinc-900"
            />
            </svg>
        </div>
        {/* Second SVG Copy for seamless loop */}
        <div className="h-full w-1/2 flex items-end">
            <svg
            className="w-full h-[500px]"
            viewBox="0 0 1800 500"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                d="M0 250C200 150 400 50 600 100C800 150 1000 350 1200 300C1400 250 1600 150 1800 250V500H0V250Z"
                fill="currentColor"
                className="text-zinc-800"
            />
            <path
                d="M0 250C200 200 400 100 600 150C800 200 1000 350 1200 300C1400 250 1600 200 1800 250V500H0V250Z"
                fill="currentColor"
                className="text-zinc-900"
            />
            </svg>
        </div>
        </div>
      </div>
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-white">Mantente Conectado</h2>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-zinc-400">Correo Electrónico</Label>
                <Input
                  id="email"
                  placeholder="Tu correo electrónico"
                  type="email"
                  className="backdrop-blur-sm bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-primary/50"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Suscribirse
              </Button>
            </form>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Enlaces Rápidos</h3>
            <nav className="space-y-2 text-sm text-zinc-400">
              <a
                href="/"
                className="block transition-colors hover:text-white"
              >
                Inicio
              </a>
              <a
                href="#"
                className="block transition-colors hover:text-white"
              >
                Nosotros
              </a>
              <a
                href="#"
                className="block transition-colors hover:text-white"
              >
                Servicios
              </a>
              <a
                href="/soluciones/catalyst"
                className="block transition-colors hover:text-white"
              >
                Soluciones
              </a>
              <a
                href="#"
                className="block transition-colors hover:text-white"
              >
                Contacto
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contáctanos</h3>
            <address className="space-y-2 text-sm not-italic text-zinc-400">
              <p>123 Innovation Street</p>
              <p>Tech City, TC 12345</p>
              <p>Teléfono: (123) 456-7890</p>
              <p>Email: hello@example.com</p>
            </address>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Síguenos</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full text-zinc-400 hover:text-white hover:bg-white/10">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-zinc-400 hover:text-white hover:bg-white/10">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
                <span className="sr-only">X (Twitter)</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-zinc-400 hover:text-white hover:bg-white/10">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-zinc-400 hover:text-white hover:bg-white/10">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center pb-8">
          <p className="text-sm text-zinc-500">
            © 2024 Catalyst. Todos los derechos reservados.
          </p>
        </div>
      </div>
      <style jsx>{`
        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-wave {
          animation: wave 15s linear infinite;
          /* Width is handled by Tailwind classes (w-[200%]) */
        }
      `}</style>
    </footer>
  );
}
