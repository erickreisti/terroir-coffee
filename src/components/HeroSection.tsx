"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Animações
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8 } 
  },
};

export default function HeroSection() {
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const quizVideoRef = useRef<HTMLVideoElement>(null);
  const lojaVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoFading, setIsVideoFading] = useState(false);
  const [isQuizFading, setIsQuizFading] = useState(false);
  const [isLojaFading, setIsLojaFading] = useState(false);

  // Monitora o tempo do vídeo para criar um crossfade suave antes do loop (esconde o corte)
  const handleTimeUpdate = () => {
    if (mainVideoRef.current) {
      const { currentTime, duration } = mainVideoRef.current;
      if (duration - currentTime < 0.8) setIsVideoFading(true);
      else if (currentTime < 1) setIsVideoFading(false);
    }
  };

  const handleQuizTimeUpdate = () => {
    if (quizVideoRef.current) {
      const { currentTime, duration } = quizVideoRef.current;
      if (duration - currentTime < 0.8) setIsQuizFading(true);
      else if (currentTime < 1) setIsQuizFading(false);
    }
  };

  const handleLojaTimeUpdate = () => {
    if (lojaVideoRef.current) {
      const { currentTime, duration } = lojaVideoRef.current;
      if (duration - currentTime < 0.8) setIsLojaFading(true);
      else if (currentTime < 1) setIsLojaFading(false);
    }
  };

  return (
    <section className="h-screen w-full bg-coffee-cream flex overflow-hidden">
      {/* Container Integrado Edge-to-Edge (100% View) */}
      <div className="w-full h-full flex flex-col lg:flex-row relative">
        
        {/* Bloco Esquerdo (Principal) */}
        <div 
          className="relative w-full lg:w-[75%] h-[60%] lg:h-full flex items-end p-8 md:p-16 lg:p-24 transition-all duration-700 overflow-hidden cursor-default group"
        >
          <div className="absolute inset-0 z-0">
            {/* Background Video */}
            <video 
              ref={mainVideoRef}
              autoPlay 
              loop 
              muted 
              playsInline
              onTimeUpdate={handleTimeUpdate}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            >
              <source src="/videos/coffee.mp4" type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
            
            {/* Camada de Fade Cinematográfico para o Loop */}
            <div 
              className={`absolute inset-0 bg-[#0a0705] transition-opacity duration-700 z-10 pointer-events-none ${
                isVideoFading ? "opacity-100" : "opacity-0"
              }`} 
            />
            
            {/* Gradient Overlay & Cinematic Noise */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0705] via-black/40 to-black/10 z-10" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-20" />
          </div>

          <motion.div 
            className="relative z-10 text-coffee-cream max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={itemVariants} className="text-coffee-caramel font-medium tracking-[0.3em] text-sm uppercase mb-6 block drop-shadow-md">
              Curadoria Premium
            </motion.span>
            
            <motion.h1 variants={itemVariants} className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] mb-8 lg:mb-10 text-white/90 text-balance tracking-tight">
              O ápice do <br/>
              <span className="italic font-light text-coffee-cream">Terroir.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-2xl text-white/80 leading-relaxed max-w-xl font-light">
              Grãos raros. Torra impecável. Uma experiência sensorial exclusiva entregue na sua porta.
            </motion.p>
          </motion.div>
        </div>

        {/* Blocos da Direita (Secundários) */}
        <div className="w-full lg:w-[25%] h-[40%] lg:h-full flex flex-col">
          
          {/* Card Quiz */}
          <Link 
            href="#quiz"
            onMouseEnter={() => quizVideoRef.current?.play()}
            onMouseLeave={() => quizVideoRef.current?.pause()}
            className="group flex-1 bg-gradient-to-br from-[#120e0c] to-[#0a0705] border-b border-white/5 text-coffee-cream p-8 lg:p-12 flex flex-col justify-center lg:justify-end transition-colors duration-700 overflow-hidden relative"
          >
            {/* Background Video Revelado no Hover */}
            <video 
              ref={quizVideoRef}
              loop 
              muted 
              playsInline
              onTimeUpdate={handleQuizTimeUpdate}
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-70 transition-opacity duration-700 z-0"
            >
              <source src="/videos/coffee-perfil.mp4" type="video/mp4" />
            </video>
            
            {/* Camada de Fade Cinematográfico para o Loop */}
            <div 
              className={`absolute inset-0 bg-[#0a0705] transition-opacity duration-700 z-[1] pointer-events-none ${
                isQuizFading ? "opacity-100" : "opacity-0"
              }`} 
            />
            
            {/* Gradient Overlay de Proteção para Contraste */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0705] via-[#0a0705]/40 to-transparent z-0 pointer-events-none" />
            
            <div className="relative z-10 mb-6">
              <h3 className="font-serif text-2xl lg:text-3xl font-bold mb-2 lg:mb-3 text-white">Encontre Seu Terroir</h3>
              <p className="text-white/80 text-sm lg:text-base leading-relaxed hidden md:block">
                Responda a três breves perguntas e descubra o grão perfeito para a sua jornada sensorial.
              </p>
            </div>
            
            {/* Botão Interativo Moderno */}
            <div className="relative z-10 inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm font-medium transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/30 text-white w-fit shadow-lg">
              Iniciar Avaliação
              <div className="bg-coffee-caramel rounded-full p-2 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 shadow-md">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </Link>

          {/* Card Loja */}
          <Link 
            href="#loja"
            onMouseEnter={() => lojaVideoRef.current?.play()}
            onMouseLeave={() => lojaVideoRef.current?.pause()}
            className="group flex-1 bg-gradient-to-br from-[#B87333] to-[#8c5422] text-white p-8 lg:p-12 flex flex-col justify-center lg:justify-end transition-colors duration-700 overflow-hidden relative"
          >
            {/* Background Video Revelado no Hover */}
            <video 
              ref={lojaVideoRef}
              loop 
              muted 
              playsInline
              onTimeUpdate={handleLojaTimeUpdate}
              className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-70 transition-opacity duration-700 z-0"
            >
              <source src="/videos/coffee-shop.mp4" type="video/mp4" />
            </video>

            {/* Camada de Fade Cinematográfico para o Loop */}
            <div 
              className={`absolute inset-0 bg-[#8c5422] transition-opacity duration-700 z-[1] pointer-events-none ${
                isLojaFading ? "opacity-100" : "opacity-0"
              }`} 
            />

            {/* Gradient Overlay de Proteção para Contraste */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#8c5422] via-[#8c5422]/20 to-transparent z-0 pointer-events-none" />

            <div className="relative z-10 mb-6">
              <h3 className="font-serif text-2xl lg:text-3xl font-bold mb-2 lg:mb-3 text-white">Boutique Premium</h3>
              <p className="text-white/90 text-sm lg:text-base leading-relaxed hidden md:block">
                Acessórios profissionais e pacotes avulsos escolhidos a dedo por nossos mestres de torra.
              </p>
            </div>

            {/* Botão Interativo Moderno */}
            <div className="relative z-10 inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-sm font-medium transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40 text-white w-fit shadow-lg">
              Explorar Catálogo
              <div className="bg-coffee-dark rounded-full p-2 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 shadow-md">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
