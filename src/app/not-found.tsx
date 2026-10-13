import type { Metadata } from "next";
import Link from "next/link";
import { LuArrowLeft, LuCoffee } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#0a0705] text-white flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Brilho âmbar de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(184,115,51,0.18)_0%,transparent_70%)] pointer-events-none" />

      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04]">
        <span className="font-serif font-bold text-[40vw] leading-none before:content-['404']" />
      </div>

      <div className="relative z-10 text-center max-w-xl">
        <LuCoffee className="w-14 h-14 mx-auto mb-8 text-coffee-caramel" />
        <span className="text-coffee-gold tracking-[0.3em] text-xs uppercase font-medium block mb-4">
          Erro 404
        </span>
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Este lote <em className="font-medium text-coffee-gold">esgotou</em>.
        </h1>
        <p className="text-white/60 text-lg leading-relaxed mb-10">
          A página que você procura não existe ou mudou de endereço. Que tal voltar e escolher outro café?
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-coffee-copper hover:bg-coffee-accent text-white px-8 py-4 rounded-full font-medium transition-colors shadow-lg shadow-coffee-caramel/20"
        >
          <LuArrowLeft className="w-5 h-5" />
          Voltar para a loja
        </Link>
      </div>
    </main>
  );
}
