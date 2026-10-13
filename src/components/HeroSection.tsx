"use client";

import Link from 'next/link';
import { LuArrowRight } from "react-icons/lu";
import { useRef, useState, type RefObject } from 'react';

type LoopVideoProps = {
  name: string;
  fadeColor: string;
  className?: string;
  videoRef?: RefObject<HTMLVideoElement | null>;
  autoPlay?: boolean;
};

// Vídeo em loop com poster (aparece já no HTML, antes da hidratação)
// e um fade para a cor de fundo pouco antes do corte do loop.
function LoopVideo({ name, fadeColor, className = "", videoRef, autoPlay }: LoopVideoProps) {
  const [isFading, setIsFading] = useState(false);

  return (
    <>
      {/* No vídeo principal, o poster vira uma <img> de alta prioridade: é ela que conta
          como LCP (pinta no primeiro paint), e o vídeo entra por cima quando carrega */}
      {autoPlay && (
        // No celular usa uma versão menor do poster (~40 KB em vez de ~75 KB)
        <picture>
          <source media="(max-width: 767px)" srcSet={`/images/poster-${name}-mobile.webp`} />
          <img
            src={`/images/poster-${name}.webp`}
            alt=""
            fetchPriority="high"
            className={`absolute inset-0 w-full h-full object-cover ${className}`}
          />
        </picture>
      )}
      <video
        ref={videoRef}
        src={`/videos/${name}.mp4`}
        // O vídeo principal já tem a <img> por baixo; poster só nos cards (evita baixar a versão desktop no celular)
        poster={autoPlay ? undefined : `/images/poster-${name}.webp`}
        autoPlay={autoPlay}
        preload={autoPlay ? "auto" : "metadata"}
        loop
        muted
        playsInline
        onTimeUpdate={(e) => {
          const { currentTime, duration } = e.currentTarget;
          setIsFading(duration - currentTime < 0.8);
        }}
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
      />
      <div
        className={`absolute inset-0 z-1 pointer-events-none transition-opacity duration-700 ${isFading ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundColor: fadeColor }}
      />
    </>
  );
}

const CARDS = [
  {
    href: "#quiz",
    video: "coffee-perfil",
    title: "Encontre Seu Terroir",
    text: "Responda a duas breves perguntas e descubra o grão perfeito para a sua jornada sensorial.",
    cta: "Iniciar Avaliação",
    fadeColor: "#0a0705",
    cardClass: "bg-linear-to-br from-[#120e0c] to-[#0a0705] border-b border-white/5",
    videoClass: "opacity-30",
    overlayClass: "from-[#0a0705] via-[#0a0705]/40",
    iconClass: "bg-coffee-caramel",
  },
  {
    href: "#loja",
    video: "coffee-shop",
    title: "Boutique Premium",
    text: "Acessórios profissionais e pacotes avulsos escolhidos a dedo por nossos mestres de torra.",
    cta: "Explorar Catálogo",
    fadeColor: "#8c5422",
    cardClass: "bg-linear-to-br from-[#B87333] to-[#8c5422]",
    videoClass: "opacity-25",
    overlayClass: "from-[#8c5422] via-[#8c5422]/20",
    iconClass: "bg-coffee-dark",
  },
];

function HeroCard({ card }: { card: (typeof CARDS)[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Link
      href={card.href}
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => videoRef.current?.pause()}
      className={`group flex-1 text-white p-8 lg:p-12 flex flex-col justify-center lg:justify-end overflow-hidden relative ${card.cardClass}`}
    >
      <LoopVideo
        name={card.video}
        videoRef={videoRef}
        fadeColor={card.fadeColor}
        className={`transition-opacity duration-700 group-hover:opacity-70 ${card.videoClass}`}
      />
      <div className={`absolute inset-0 z-1 bg-linear-to-t to-transparent pointer-events-none ${card.overlayClass}`} />

      <div className="relative z-10 mb-6">
        <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-2 lg:mb-3">{card.title}</h2>
        <p className="text-white/85 text-sm lg:text-base leading-relaxed hidden md:block">{card.text}</p>
      </div>

      <div className="relative z-10 inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-sm font-medium transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40 w-fit shadow-lg">
        {card.cta}
        <div className={`rounded-full p-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110 shadow-md ${card.iconClass}`}>
          <LuArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}

export default function HeroSection() {
  return (
    <section className="h-screen min-h-150 w-full flex flex-col lg:flex-row overflow-hidden bg-[#0a0705]">
      {/* Bloco principal */}
      <div className="relative w-full lg:w-[75%] h-[60%] lg:h-full flex items-end p-8 md:p-16 lg:p-24 overflow-hidden group">
        <LoopVideo
          name="coffee"
          autoPlay
          fadeColor="#0a0705"
          className="transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 z-1 bg-linear-to-t from-[#0a0705] via-black/40 to-black/10" />
        <div className="absolute inset-0 z-2 bg-noise opacity-20 mix-blend-overlay pointer-events-none" />

        <div className="relative z-10 text-coffee-cream max-w-4xl">
          <span className="animate-fade-up text-coffee-caramel font-medium tracking-[0.3em] text-sm uppercase mb-6 block drop-shadow-md">
            Curadoria Premium
          </span>
          <h1 className="animate-fade-up [animation-delay:100ms] font-serif text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] mb-8 lg:mb-10 text-white/90 text-balance tracking-tight">
            O ápice do <br />
            <span className="italic font-light text-coffee-cream">Terroir.</span>
          </h1>
          <p className="animate-fade-up [animation-delay:200ms] text-lg md:text-2xl text-white/80 leading-relaxed max-w-xl font-light">
            Grãos raros. Torra impecável. Uma experiência sensorial exclusiva entregue na sua porta.
          </p>
        </div>
      </div>

      {/* Cards secundários */}
      <div className="w-full lg:w-[25%] h-[40%] lg:h-full flex flex-col">
        {CARDS.map((card) => <HeroCard key={card.href} card={card} />)}
      </div>
    </section>
  );
}
