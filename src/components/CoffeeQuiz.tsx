"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Coffee, Droplets, ThermometerSun, Flame, Leaf, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";

type Step = "intro" | "method" | "flavor" | "result";

const STEPS: { id: Step; label: string }[] = [
  { id: "intro",  label: "Início"   },
  { id: "method", label: "Preparo"  },
  { id: "flavor", label: "Paladar"  },
  { id: "result", label: "Match"    },
];

const METHODS = [
  {
    id: "filtro",
    label: "Filtro",
    sublabel: "V60, Melitta, Chemex",
    icon: <Droplets className="w-8 h-8" />,
    desc: "Extração limpa que valoriza a acidez e as notas mais delicadas do grão.",
  },
  {
    id: "espresso",
    label: "Espresso",
    sublabel: "Máquina Automática",
    icon: <Coffee className="w-8 h-8" />,
    desc: "Alta pressão que concentra sabor e cria uma crema densa e aromática.",
  },
  {
    id: "prensa",
    label: "Prensa Francesa",
    sublabel: "Imersão Total",
    icon: <ThermometerSun className="w-8 h-8" />,
    desc: "Imersão prolongada que entrega um café encorpado e com textura veludo.",
  },
];

const FLAVORS = [
  {
    id: "doce",
    label: "Doce & Encorpado",
    desc: "Notas de chocolate amargo, caramelo e nozes. Corpo denso.",
    icon: <Flame className="w-8 h-8" />,
    gradient: "from-amber-900/40 to-yellow-800/20",
  },
  {
    id: "frutado",
    label: "Frutado & Floral",
    desc: "Acidez brilhante, notas cítricas, florais e de frutas vermelhas.",
    icon: <Leaf className="w-8 h-8" />,
    gradient: "from-emerald-900/40 to-teal-800/20",
  },
  {
    id: "equilibrado",
    label: "Clássico & Equilibrado",
    desc: "Um pouco de tudo. Cafés completos, fáceis e sempre surpreendentes.",
    icon: <Star className="w-8 h-8" />,
    gradient: "from-stone-700/40 to-stone-600/20",
  },
];

const RESULTS: Record<string, { title: string; desc: string; price: number; tags: string[] }> = {
  doce: {
    title: "Plano Entusiasta",
    desc: "Micro-lotes com perfil doce e encorpado — chocolate amargo, caramelo e avelã. Torra média-alta, corpo aveludado.",
    price: 129.90,
    tags: ["Chocolate", "Caramelo", "Corpo Alto"],
  },
  frutado: {
    title: "Plano Sommelier",
    desc: "Cafés exóticos com acidez brilhante e notas florais ou de frutas vermelhas. Para paladares aventureiros.",
    price: 189.90,
    tags: ["Florais", "Frutas Vermelhas", "Acidez Elegante"],
  },
  equilibrado: {
    title: "Plano Curioso",
    desc: "Uma coleção equilibrada e surpreendente a cada mês. Perfeito para explorar o universo dos cafés especiais.",
    price: 69.90,
    tags: ["Versátil", "Equilibrado", "Discovery"],
  },
};

export default function CoffeeQuiz() {
  const { addItem } = useCart();
  const [currentStep, setCurrentStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState({ method: "", flavor: "" });
  const stepIndex = STEPS.findIndex((s) => s.id === currentStep);

  const selectAnswer = (key: "method" | "flavor", value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => {
      setCurrentStep(key === "method" ? "flavor" : "result");
    }, 350);
  };

  const result = answers.flavor ? RESULTS[answers.flavor] : null;

  const handleSubscribe = () => {
    if (!result) return;
    addItem({
      id: result.title.toLowerCase().replace(/ /g, "-"),
      name: `Assinatura: ${result.title.replace("Plano ", "")}`,
      price: result.price,
      isSubscription: true,
    });
  };

  return (
    <section id="quiz" className="relative bg-coffee-dark text-coffee-cream overflow-hidden py-0">

      {/* Header fixo da seção */}
      <div className="pt-24 pb-16 text-center px-4">
        <span className="text-coffee-caramel tracking-[0.25em] text-xs uppercase font-medium block mb-4">
          Descubra seu Terroir
        </span>
        <h2 className="font-serif text-5xl md:text-6xl font-bold mb-4">
          Qual é o seu café?
        </h2>
        <p className="text-coffee-cream/60 text-lg max-w-xl mx-auto">
          Três perguntas. Um match perfeito. Sem erro.
        </p>
      </div>

      {/* Timeline horizontal */}
      <div className="relative max-w-3xl mx-auto px-6 mb-16">
        <div className="flex items-center justify-between relative">
          {/* Linha de fundo */}
          <div className="absolute top-5 left-0 right-0 h-px bg-white/10" />
          {/* Linha de progresso */}
          <motion.div
            className="absolute top-5 left-0 h-px bg-coffee-caramel"
            initial={{ width: "0%" }}
            animate={{ width: `${(stepIndex / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
          {STEPS.map((step, i) => {
            const done    = i < stepIndex;
            const active  = i === stepIndex;
            return (
              <div key={step.id} className="flex flex-col items-center gap-2 z-10">
                <motion.div
                  animate={{
                    backgroundColor: done || active ? "#b87333" : "transparent",
                    borderColor: done || active ? "#b87333" : "rgba(255,255,255,0.2)",
                    scale: active ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                >
                  {done ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-xs font-bold text-white/60">{i + 1}</span>
                  )}
                </motion.div>
                <span className={`text-xs tracking-wider uppercase ${active ? "text-coffee-caramel font-bold" : "text-white/30"}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conteúdo das etapas */}
      <div className="max-w-6xl mx-auto px-6 pb-28">
        <AnimatePresence mode="wait">

          {/* INTRO */}
          {currentStep === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Coffee className="w-20 h-20 mx-auto mb-8 text-coffee-caramel" />
              <h3 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Pronto para a jornada sensorial?
              </h3>
              <p className="text-coffee-cream/60 mb-12 max-w-lg mx-auto text-lg leading-relaxed">
                Vamos entender o que você mais valoriza na xícara e encontrar
                o micro-lote perfeito para o seu paladar.
              </p>
              <button
                onClick={() => setCurrentStep("method")}
                className="inline-flex items-center gap-3 bg-coffee-caramel hover:bg-coffee-accent text-white px-10 py-4 rounded-full font-medium transition-all text-lg shadow-lg shadow-coffee-caramel/20"
              >
                Começar o Quiz
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* MÉTODO */}
          {currentStep === "method" && (
            <motion.div
              key="method"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
                Como você prepara seu café?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {METHODS.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectAnswer("method", item.id)}
                    className={`relative overflow-hidden flex flex-col gap-5 p-8 border rounded-2xl text-left transition-all duration-500 group backdrop-blur-md ${
                      answers.method === item.id
                        ? "border-coffee-caramel bg-coffee-caramel/10 shadow-[0_0_30px_rgba(184,115,51,0.15)]"
                        : "border-white/10 hover:border-coffee-caramel/40 bg-white/[0.02] hover:bg-white/[0.08]"
                    }`}
                  >
                    {/* Efeito de Vidro/Brilho Interno */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className={`${answers.method === item.id ? "text-coffee-caramel" : "text-white/40 group-hover:text-coffee-caramel"} transition-colors`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-serif text-2xl font-bold text-white mb-1">{item.label}</p>
                      <p className="text-coffee-caramel/70 text-sm mb-4">{item.sublabel}</p>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                    {answers.method === item.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-6 h-6 bg-coffee-caramel rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* PALADAR */}
          {currentStep === "flavor" && (
            <motion.div
              key="flavor"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
                O que atrai mais o seu paladar?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FLAVORS.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectAnswer("flavor", item.id)}
                    className={`relative overflow-hidden flex flex-col gap-5 p-8 border rounded-2xl text-left transition-all duration-500 group bg-gradient-to-br backdrop-blur-md ${item.gradient} ${
                      answers.flavor === item.id
                        ? "border-coffee-caramel shadow-[0_0_30px_rgba(184,115,51,0.15)]"
                        : "border-white/10 hover:border-coffee-caramel/40 opacity-80 hover:opacity-100"
                    }`}
                  >
                    {/* Efeito de Vidro/Brilho Interno */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className={`${answers.flavor === item.id ? "text-coffee-caramel" : "text-white/40 group-hover:text-coffee-caramel"} transition-colors`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-serif text-2xl font-bold text-white mb-3">{item.label}</p>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                    {answers.flavor === item.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-6 h-6 bg-coffee-caramel rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* RESULTADO */}
          {currentStep === "result" && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-coffee-caramel/20 border border-coffee-caramel/40 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <Check className="w-12 h-12 text-coffee-caramel" />
                </motion.div>
                <span className="text-coffee-caramel tracking-[0.25em] text-xs uppercase font-medium block mb-4">
                  Seu Match Perfeito
                </span>
                <h3 className="font-serif text-5xl font-bold text-white mb-6">{result.title}</h3>
                <p className="text-coffee-cream/60 text-xl leading-relaxed max-w-xl mx-auto mb-8">
                  {result.desc}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                  {result.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 border border-coffee-caramel/40 text-coffee-caramel text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <button
                  onClick={handleSubscribe}
                  className="inline-flex items-center gap-3 bg-coffee-caramel hover:bg-coffee-accent text-white px-10 py-4 rounded-full font-medium transition-all text-lg shadow-lg shadow-coffee-caramel/20"
                >
                  Assinar por R$ {result.price.toFixed(2).replace(".", ",")}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => { setAnswers({ method: "", flavor: "" }); setCurrentStep("intro"); }}
                  className="text-sm text-white/40 hover:text-coffee-caramel underline transition-colors"
                >
                  Refazer o Quiz
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
