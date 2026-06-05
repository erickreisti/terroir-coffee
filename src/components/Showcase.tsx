"use client";

import { useRef, MouseEvent } from "react";
import { LuArrowRight, LuCheck, LuStar, LuShoppingBag } from "react-icons/lu";
import { motion, useInView, useMotionValue, useMotionTemplate } from "framer-motion";
import { useCart } from "@/context/CartContext";

const plans = [
  {
    id: "curioso",
    name: "Curioso",
    price: "R$ 69,90",
    description: "Para quem quer começar a explorar o mundo dos cafés especiais.",
    features: ["1 pacote (250g) por mês", "Frete Grátis Sul/Sudeste", "Acesso ao grupo VIP"],
    recommended: false,
    delay: 0.1,
  },
  {
    id: "entusiasta",
    name: "Entusiasta",
    price: "R$ 129,90",
    description: "A experiência completa para quem já ama e consome diariamente.",
    features: [
      "2 pacotes (250g) por mês",
      "Frete Grátis Todo Brasil",
      "Brinde surpresa trimestral",
      "Acesso antecipado a micro-lotes",
    ],
    recommended: true,
    delay: 0.3,
  },
  {
    id: "sommelier",
    name: "Sommelier",
    price: "R$ 189,90",
    description: "Grãos raros e exóticos. O auge da experiência sensorial.",
    features: [
      "3 pacotes (250g) por mês",
      "Grãos de pontuação 90+",
      "Frete Grátis Todo Brasil",
      "Consultoria com barista online",
    ],
    recommended: false,
    delay: 0.5,
  },
];

const products = [
  {
    id: "p1",
    name: "Moinho Manual Comandante C40",
    price: "R$ 2.450,00",
    image: "/images/manual_grinder.png",
    category: "Equipamentos",
  },
  {
    id: "p2",
    name: "Café Especial Mantiqueira (250g)",
    price: "R$ 55,00",
    image: "/images/coffee_bag.png",
    category: "Grãos",
  },
  {
    id: "p3",
    name: "Chaleira Pescoço de Ganso BDK",
    price: "R$ 320,00",
    image: "/images/gooseneck_kettle.png",
    category: "Equipamentos",
  },
];

/* ─────────────────────────────────────────────
   Componente do Card do Plano com Animações Premium
───────────────────────────────────────────── */
function PlanCard({ plan, isPlansInView, handleSubscribe }: { plan: any, isPlansInView: boolean, handleSubscribe: (p: any) => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      key={plan.id}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.8, delay: plan.delay, ease: [0.215, 0.61, 0.355, 1] } 
        },
        hover: { 
          y: -12, 
          transition: { duration: 0.4, ease: "easeOut" } 
        }
      }}
      initial="hidden"
      animate={isPlansInView ? "visible" : "hidden"}
      whileHover="hover"
      onMouseMove={handleMouseMove}
      className={`relative group rounded-3xl p-8 md:p-10 flex flex-col transition-colors duration-300 ${
        plan.recommended
          ? "bg-[#2a1c14] border border-coffee-caramel/40 shadow-2xl scale-100 md:scale-105 z-10"
          : "bg-[#1a120b] border border-white/5 mt-0 md:mt-4 mb-0 md:mb-4"
      }`}
    >
      {/* 1. Spotlight Glow Hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(184, 115, 51, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Badge "Mais Escolhido" com Shimmer no Hover */}
      {plan.recommended && (
        <div className="absolute overflow-hidden -top-4 left-1/2 -translate-x-1/2 bg-coffee-caramel text-white px-6 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg shadow-coffee-caramel/20 whitespace-nowrap z-10">
          Mais Escolhido
          <motion.div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
            variants={{
              hover: { translateX: "100%", transition: { duration: 0.8, ease: "easeInOut" } }
            }}
          />
        </div>
      )}
      
      <div className="mb-8 relative z-10">
        <h3 className="font-serif text-3xl font-bold text-white mb-3">{plan.name}</h3>
        <p className="text-white/50 text-sm leading-relaxed h-14">{plan.description}</p>
      </div>
      
      <div className="mb-8 pb-8 border-b border-white/10 relative z-10">
        <span className="text-5xl font-serif font-bold text-coffee-caramel">{plan.price}</span>
        <span className="text-white/40 ml-2">/mês</span>
      </div>
      
      <ul className="space-y-5 mb-10 flex-grow relative z-10">
        {plan.features.map((feature: string, i: number) => (
          <li key={i} className="flex items-start gap-3">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-coffee-caramel/20 flex items-center justify-center shrink-0">
              <LuCheck className="w-3 h-3 text-coffee-caramel" />
            </div>
            <span className="text-white/70 text-sm leading-snug">{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* Botão com Pulse (Scale) no Hover */}
      <motion.button
        variants={{
          hover: { scale: 1.05 }
        }}
        onClick={() => handleSubscribe(plan)}
        className={`relative z-10 w-full py-4 rounded-full font-medium transition-colors flex items-center justify-center gap-2 ${
          plan.recommended
            ? "bg-coffee-caramel text-white shadow-lg shadow-coffee-caramel/25"
            : "bg-white/5 text-white border border-white/10"
        }`}
      >
        Assinar {plan.name}
      </motion.button>
    </motion.div>
  );
}

export default function Showcase() {

  const { addItem } = useCart();
  const plansRef = useRef(null);
  const isPlansInView = useInView(plansRef, { once: true, margin: "-100px" });
  
  const shopRef = useRef(null);
  const isShopInView = useInView(shopRef, { once: true, margin: "-100px" });

  const handleSubscribe = (plan: any) => {
    addItem({
      id: plan.id,
      name: `Assinatura: ${plan.name}`,
      price: parseFloat(plan.price.replace("R$ ", "").replace(",", ".")),
      isSubscription: true,
    });
  };

  const handleAddProduct = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(
        product.price.replace("R$ ", "").replace(".", "").replace(",", ".")
      ),
      image: product.image,
    });
  };

  return (
    <div className="bg-[#120e0c] text-white">
      {/* Planos de Assinatura */}
      <section id="planos" className="py-24 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-coffee-caramel/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10" ref={plansRef}>
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={isPlansInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-coffee-caramel tracking-[0.25em] text-xs uppercase font-medium block mb-4"
            >
              Nossas Assinaturas
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isPlansInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl font-bold mb-6"
            >
              Escolha seu Ritual
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isPlansInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-lg max-w-2xl mx-auto"
            >
              Receba mensalmente cafés frescos, torrados artesanalmente, sem se preocupar em pedir. Cancele quando quiser.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {plans.map((plan) => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                isPlansInView={isPlansInView} 
                handleSubscribe={handleSubscribe} 
              />
            ))}
          </div>
        </div>

      </section>

      {/* Produtos Avulsos */}
      <section id="loja" className="py-24 relative" ref={shopRef}>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={isShopInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-coffee-caramel tracking-[0.25em] text-xs uppercase font-medium block mb-4"
              >
                Boutique
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={isShopInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Equipamentos & Edições Limitadas
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={isShopInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/60 text-lg"
              >
                Tudo que você precisa para extrair o máximo de sabor, selecionado a dedo pelos nossos baristas.
              </motion.p>
            </div>
            
            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              animate={isShopInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/80 hover:text-coffee-caramel font-medium flex items-center gap-2 group transition-colors pb-2 border-b border-transparent hover:border-coffee-caramel"
            >
              Ver coleção completa
              <LuArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 30 }}
                animate={isShopInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-6 bg-[#1a120b] border border-white/5 group-hover:border-coffee-caramel/30 transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase text-white/90 border border-white/10">
                    {product.category}
                  </div>
                  
                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddProduct(product);
                      }}
                      className="bg-coffee-caramel text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                    >
                      <LuShoppingBag className="w-4 h-4" />
                      Adicionar
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 px-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-serif text-xl font-medium text-white group-hover:text-coffee-caramel transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <span className="font-medium text-coffee-caramel text-lg whitespace-nowrap">
                      {product.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <LuStar key={i} className="w-4 h-4 fill-coffee-caramel text-coffee-caramel" />
                    ))}
                    <span className="text-xs text-white/40 ml-2">(Avaliações premium)</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
