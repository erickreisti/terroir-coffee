"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } },
};

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0705] text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Texto gigante de fundo (Marca d'água) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none select-none overflow-hidden opacity-[0.02]">
        <span className="font-serif text-[20vw] font-bold tracking-tighter whitespace-nowrap">
          TERROIR
        </span>
      </div>

      <motion.div 
        className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        {/* Coluna 1 - Marca */}
        <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col justify-between">
          <div>
            <span className="font-serif text-3xl font-bold tracking-widest text-white mb-6 block">
              TERROIR.
            </span>
            <p className="text-white/60 leading-relaxed max-w-sm mb-8">
              Conectando paladares exigentes às melhores safras de cafés especiais. Da fazenda à sua xícara com rastreabilidade, pureza e sofisticação incomparável.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-coffee-caramel hover:border-coffee-caramel hover:bg-coffee-caramel/10 transition-all font-sans text-xs font-bold tracking-wider">
              <FaInstagram className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-coffee-caramel hover:border-coffee-caramel hover:bg-coffee-caramel/10 transition-all font-sans text-xs font-bold tracking-wider">
              <FaXTwitter className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-coffee-caramel hover:border-coffee-caramel hover:bg-coffee-caramel/10 transition-all font-sans text-xs font-bold tracking-wider">
              <FaYoutube className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
        
        {/* Coluna 2 - Links Rápidos */}
        <motion.div variants={itemVariants} className="md:col-span-2 md:col-start-6">
          <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-coffee-caramel mb-8 font-bold">Navegação</h4>
          <ul className="space-y-4">
            {["A Origem", "Nossa Torra", "Assinaturas", "Boutique", "O Quiz"].map((item) => (
              <li key={item}>
                <Link href="#" className="group inline-flex items-center text-white/60 hover:text-[#ffd6a5] transition-colors duration-500 text-sm">
                  <span className="relative pb-1">
                    {/* Efeito Poeira Âmbar Flocada/Sutil (Mais visível) */}
                    <span className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[160%] bg-[radial-gradient(ellipse_at_center,rgba(184,115,51,0.6)_0%,transparent_70%)] blur-[6px] opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-110 transition-all duration-700 rounded-full z-0 pointer-events-none mix-blend-screen" />
                    <span className="relative z-10 tracking-wide">{item}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Coluna 3 - Legal */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-coffee-caramel mb-8 font-bold">Legal</h4>
          <ul className="space-y-4">
            {["Termos de Serviço", "Política de Privacidade", "Trocas e Devoluções", "FAQ"].map((item) => (
              <li key={item}>
                <Link href="#" className="group inline-flex items-center text-white/60 hover:text-[#ffd6a5] transition-colors duration-500 text-sm">
                  <span className="relative pb-1">
                    {/* Efeito Poeira Âmbar Flocada/Sutil (Mais visível) */}
                    <span className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[160%] bg-[radial-gradient(ellipse_at_center,rgba(184,115,51,0.6)_0%,transparent_70%)] blur-[6px] opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-110 transition-all duration-700 rounded-full z-0 pointer-events-none mix-blend-screen" />
                    <span className="relative z-10 tracking-wide">{item}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Coluna 4 - Newsletter */}
        <motion.div variants={itemVariants} className="md:col-span-3">
          <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-coffee-caramel mb-8 font-bold">The Insider</h4>
          <p className="text-sm text-white/60 mb-6 leading-relaxed">
            Receba convites para micro-lotes exclusivos antes do lançamento público e dicas avançadas de preparo.
          </p>
          <form className="relative group">
            <input 
              type="email" 
              placeholder="Seu endereço de e-mail" 
              className="bg-white/5 border border-white/10 rounded-full pl-6 pr-14 py-4 text-sm w-full text-white focus:outline-none focus:border-coffee-caramel focus:bg-white/10 transition-all placeholder:text-white/30"
            />
            <button 
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-coffee-caramel text-white flex items-center justify-center hover:scale-105 hover:bg-white hover:text-coffee-dark transition-all shadow-lg shadow-coffee-caramel/20"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </motion.div>
      
      {/* Bottom Bar */}
      <motion.div 
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-6 mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40 font-medium tracking-wide relative z-10"
      >
        <p>&copy; {new Date().getFullYear()} Terroir Coffee Co. Todos os direitos reservados.</p>
        <p className="flex items-center gap-1">
          Feito com precisão <span className="text-coffee-caramel mx-1">✦</span> para paladares exigentes
        </p>
      </motion.div>
    </footer>
  );
}
