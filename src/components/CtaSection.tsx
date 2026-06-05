"use client";

import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax para a imagem de fundo do CTA
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"], // Ajustado para terminar quando o CTA chega no final da tela
  });
  
  // Movimento maior (em pixels ou % maiores) para ficar mais evidente
  const yBg = useTransform(scrollYProgress, [0, 1], ["-30%", "10%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 1, 1, 1]);
  const yText = useTransform(scrollYProgress, [0, 0.4], [50, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 lg:py-48 overflow-hidden bg-[#0a0705] text-white"
    >
      {/* Background com Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0705] via-transparent to-[#0a0705] z-10"></div>
        <div className="absolute inset-0 bg-black/60 z-[5]"></div>
        <motion.img 
          src="/images/hero_bg.png" 
          alt="Coffee texture" 
          style={{ y: yBg }}
          className="absolute top-[-20%] left-0 w-full h-[160%] object-cover opacity-60 mix-blend-luminosity"
        />
      </div>

      <motion.div 
        style={{ opacity: opacityText, y: yText }}
        className="container mx-auto px-6 relative z-20 text-center max-w-4xl"
      >
        <span className="text-coffee-caramel font-medium tracking-[0.3em] text-sm uppercase mb-8 block">
          Um convite ao extraordinário
        </span>
        
        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-10 leading-tight drop-shadow-2xl text-balance">
          Pronto para elevar o seu ritual matinal?
        </h2>
        
        <p className="text-white/70 text-lg md:text-xl mb-14 leading-relaxed max-w-2xl mx-auto">
          Junte-se a centenas de amantes do café que já transformaram sua rotina. Receba em casa o que há de mais raro na alta gastronomia cafeeira.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="#planos" 
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-coffee-caramel text-white font-medium hover:bg-white hover:text-coffee-dark transition-all duration-500 shadow-xl shadow-coffee-caramel/20 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 text-lg"
          >
            Escolher Assinatura
            <LuArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="#loja" 
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-300 text-lg"
          >
            Explorar Boutique
          </Link>
        </div>
      </motion.div>

    </section>
  );
}
