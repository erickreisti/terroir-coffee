"use client";

import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a0705] flex flex-col items-center justify-center text-white relative overflow-hidden">
      
      {/* Background Cinematográfico */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="/videos/coffee-payment.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0705] via-[#0a0705]/80 to-[#0a0705]/40" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        className="relative z-10 max-w-2xl text-center px-6"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-coffee-caramel/20 rounded-full flex items-center justify-center mx-auto mb-8 relative"
        >
          {/* Brilho pulsante */}
          <div className="absolute inset-0 rounded-full bg-coffee-caramel/30 animate-ping opacity-50" />
          <CheckCircle2 className="w-12 h-12 text-coffee-caramel relative z-10" />
        </motion.div>

        <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 tracking-tight">
          Sua jornada <br />
          <span className="text-coffee-caramel italic">começou.</span>
        </h1>
        
        <p className="text-white/70 text-lg md:text-xl mb-12 max-w-lg mx-auto leading-relaxed">
          Recebemos o seu pedido. Nossos mestres de torra já estão preparando os seus grãos para garantir o máximo de frescor.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/" 
            className="group flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
            <span className="font-medium text-white/90">Voltar à Vitrine</span>
          </Link>

          <Link 
            href="/" 
            className="group flex items-center gap-3 bg-coffee-caramel hover:bg-[#c9803b] text-white px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(184,115,51,0.2)]"
          >
            <Package className="w-5 h-5" />
            <span className="font-bold tracking-wide">Acompanhar Pedido</span>
          </Link>
        </div>
      </motion.div>
      
      {/* Poeira Âmbar na Base */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-[radial-gradient(ellipse_at_bottom,rgba(184,115,51,0.15)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
}
