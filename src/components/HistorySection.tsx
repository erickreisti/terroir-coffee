"use client";

import { Fragment, useRef, useEffect, useState } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────
   SVG: Folha
───────────────────────────────────────────── */
function LeafSvg({ size = 24, color = "#7d9455" }: { size?: number; color?: string }) {
  // Folha de café: alongada, ponta fina, nervura central e laterais
  return (
    <svg width={size * 0.55} height={size} viewBox="0 0 22 40" fill="none">
      <path d="M11 1C4 9 1.5 18 3 27c1.2 7 4.6 11 8 12 3.4-1 6.8-5 8-12 1.5-9-1-18-8-26z" fill={color} />
      <path
        d="M11 3v35M11 12l-4.5-3.5M11 12l4.5-3.5M11 19l-6-4M11 19l6-4M11 26l-6-4M11 26l6-4M11 32l-4-3M11 32l4-3"
        stroke="rgba(22,11,6,0.35)"
        strokeWidth={0.8}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SVG: Grão de Café
───────────────────────────────────────────── */
function BeanSvg({ size = 20 }: { size?: number }) {
  // Grão torrado: marrom escuro com volume, fenda em "S" e um brilho discreto
  return (
    <svg width={size * 0.72} height={size} viewBox="0 0 18 25" fill="none">
      <ellipse cx="9" cy="12.5" rx="8" ry="11.5" fill="#5a3320" />
      <ellipse cx="7" cy="9.5" rx="4.5" ry="6.5" fill="#7a4a2c" fillOpacity={0.7} />
      <path
        d="M9.5 2.5C6.5 6 11.5 9 9 12.5S7.5 19 9.5 22.5"
        stroke="#24130a"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <ellipse cx="5.5" cy="7" rx="1.4" ry="2.4" fill="#f0c48f" fillOpacity={0.25} />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Partículas animadas que cruzam o bloco
───────────────────────────────────────────── */
const LEAF_CONFIGS = [
  { delay: 0, duration: 5.0, size: 100, rot: 20, top: "-5%", right: "5%" },
  { delay: 0.7, duration: 5.8, size: 72, rot: -40, top: "5%", right: "18%" },
  { delay: 1.3, duration: 6.2, size: 120, rot: 55, top: "-12%", right: "32%" },
  { delay: 2.0, duration: 4.8, size: 64, rot: -15, top: "10%", right: "48%" },
  { delay: 2.8, duration: 5.5, size: 90, rot: 70, top: "-8%", right: "62%" },
  { delay: 1.6, duration: 6.5, size: 80, rot: -30, top: "2%", right: "75%" },
  { delay: 3.2, duration: 5.2, size: 56, rot: 45, top: "-15%", right: "10%" },
  { delay: 0.4, duration: 7.0, size: 110, rot: -60, top: "8%", right: "88%" },
  { delay: 3.8, duration: 5.8, size: 68, rot: 25, top: "-3%", right: "55%" },
  { delay: 1.0, duration: 6.0, size: 85, rot: -50, top: "15%", right: "25%" },
];

const BEAN_CONFIGS = [
  { delay: 0, duration: 5.0, size: 90, rot: 30, top: "-5%", right: "3%" },
  { delay: 0.9, duration: 6.5, size: 70, rot: -20, top: "5%", right: "15%" },
  { delay: 1.8, duration: 5.5, size: 110, rot: 50, top: "-10%", right: "28%" },
  { delay: 2.7, duration: 7.0, size: 60, rot: -45, top: "8%", right: "42%" },
  { delay: 3.4, duration: 5.8, size: 85, rot: 10, top: "-3%", right: "57%" },
  { delay: 1.2, duration: 6.2, size: 75, rot: -65, top: "12%", right: "70%" },
  { delay: 2.3, duration: 5.3, size: 95, rot: 80, top: "-8%", right: "83%" },
  { delay: 0.5, duration: 6.8, size: 65, rot: -30, top: "3%", right: "92%" },
  { delay: 3.0, duration: 5.6, size: 80, rot: 55, top: "-14%", right: "36%" },
];

// Ritmo de fundo: lento o bastante para não competir com o texto
const PARTICLE_SLOWDOWN = 2.2;

function FloatingParticles({
  type,
  active,
  compact,
}: {
  type: "leaves" | "beans" | "steam";
  active: boolean;
  compact: boolean;
}) {
  const all = type === "leaves" ? LEAF_CONFIGS : type === "beans" ? BEAN_CONFIGS : STEAM_CONFIGS;
  // No celular, metade das partículas e menores: a tela é estreita e o texto ocupa tudo
  const configs = compact ? all.slice(0, 5) : all;
  // Grãos de verdade são pequenos: em tamanho de folha viram manchas
  // Vapor é o contrário: nuvens grandes e difusas, senão parecem bolinhas de luz
  const scale =
    type === "beans" ? (compact ? 0.3 : 0.42) : type === "steam" ? (compact ? 1.1 : 1.8) : compact ? 0.45 : 0.7;

  return (
    // Atrás do texto (z-10): passam pelo fundo sem cobrir nenhuma letra
    <div aria-hidden="true" className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
      {configs.map((cfg, i) => {
        const leafBean = cfg as typeof LEAF_CONFIGS[0];
        const steam = cfg as typeof STEAM_CONFIGS[0];
        const size = Math.round(cfg.size * scale);
        return (
          <m.div
            key={i}
            className="absolute will-change-transform"
            style={
              type === "steam"
                ? { bottom: "-10%", left: steam.left, filter: "blur(16px)" }
                // As maiores ficam desfocadas: parecem mais perto da câmera e dão profundidade
                : { top: leafBean.top, right: leafBean.right, filter: cfg.size >= 100 ? "blur(3px)" : undefined }
            }
            initial={{ opacity: 0 }}
            animate={
              !active
                ? { opacity: 0 }
                : type === "steam"
                  ? {
                    y: ["0vh", "-120vh"],
                    x: [0, steam.dx],
                    scale: [0.7, 1.6],
                    opacity: [0, 0.5, 0.3, 0],
                  }
                  : {
                    x: ["0vw", "-115vw"],
                    y: ["0vh", "110vh"],
                    rotate: [leafBean.rot, leafBean.rot + 360],
                    opacity: type === "beans" ? [0, 0.85, 0.85, 0] : [0, 0.55, 0.55, 0],
                  }
            }
            transition={
              active
                ? {
                  duration: cfg.duration * PARTICLE_SLOWDOWN,
                  delay: cfg.delay,
                  repeat: Infinity,
                  ease: type === "steam" ? "easeOut" : "linear",
                  times: [0, 0.08, 0.85, 1],
                }
                : { duration: 0.6 }
            }
          >
            {type === "leaves" ? (
              <LeafSvg size={size} />
            ) : type === "beans" ? (
              <BeanSvg size={size} />
            ) : (
              <SteamSvg size={size} />
            )}
          </m.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SVG: Vapor / Fumaça
───────────────────────────────────────────── */
function SteamSvg({ size = 40 }: { size?: number }) {
  // Nuvem de vapor com borda que se dissolve (gradiente radial) em vez de elipse chapada
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 40 60" fill="none">
      <defs>
        <radialGradient id="steam-puff">
          <stop offset="0%" stopColor="#fff" stopOpacity={0.55} />
          <stop offset="60%" stopColor="#fff" stopOpacity={0.18} />
          <stop offset="100%" stopColor="#fff" stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx="20" cy="30" rx="20" ry="30" fill="url(#steam-puff)" />
    </svg>
  );
}

const STEAM_CONFIGS = [
  { delay: 0,   duration: 6.0, size: 100, left: "15%", dx: -20 },
  { delay: 1.0, duration: 7.5, size: 75,  left: "32%", dx: 30  },
  { delay: 2.2, duration: 6.8, size: 120, left: "50%", dx: -40 },
  { delay: 0.5, duration: 8.0, size: 85,  left: "65%", dx: 15  },
  { delay: 3.0, duration: 7.0, size: 110, left: "80%", dx: -25 },
  { delay: 1.5, duration: 6.5, size: 70,  left: "8%",  dx: 35  },
  { delay: 2.8, duration: 7.2, size: 95,  left: "45%", dx: -15 },
];

/* ─────────────────────────────────────────────
   Componente: Texto dividido em letras com animação 3D
───────────────────────────────────────────── */
function SplitText({
  text,
  className = "",
  baseDelay = 0,
  charDelay = 18,
  start,
  accentLast = false,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  charDelay?: number;
  // Quando informado, o pai decide quando animar (em vez de o próprio texto entrar na tela)
  start?: boolean;
  // Última palavra em itálico dourado, numa linha própria no desktop
  accentLast?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const selfInView = useInView(ref, { once: true, margin: "-80px" });
  const inView = start ?? selfInView;
  const words = text.split(" ");
  // Índice da primeira letra de cada palavra no texto (conta os espaços, como antes)
  const offsets = words.map((_, w) => words.slice(0, w).join(" ").length + (w > 0 ? 1 : 0));

  return (
    <span ref={ref} className={`inline ${className}`}>
      <span className="sr-only">{text}</span>
      {/* Letras agrupadas por palavra: a linha só quebra entre palavras, nunca no meio de uma */}
      {words.map((word, w) => (
        <Fragment key={w}>
          {w > 0 && " "}
          <span
            aria-hidden="true"
            className={`inline-block whitespace-nowrap ${
              accentLast && w === words.length - 1 ? "italic font-medium text-coffee-gold lg:block" : ""
            }`}
          >
            {word.split("").map((char, c) => (
              <m.span
                key={c}
                className="inline-block"
                // Só sobe e aparece: sem giro 3D nem escala, a letra nunca deforma
                initial={{ opacity: 0, y: "0.45em" }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: baseDelay + (offsets[w] + c) * (charDelay / 1000),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </m.span>
            ))}
          </span>
        </Fragment>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────
   BigRevealCard
───────────────────────────────────────────── */
function BigRevealCard({
  title,
  body,
  titleDelay = 0,
  bodyDelay = 0.6,
  show,
}: {
  title: string;
  body: string;
  titleDelay?: number;
  bodyDelay?: number;
  // Quando informado, o pai decide quando revelar (desktop, em sequência automática)
  show?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const selfInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const inView = show ?? selfInView;

  return (
    <div ref={ref} className="relative w-full py-7 last:pb-0">
      {/* Fio dourado acima de cada tópico */}
      <m.div
        className="absolute top-0 inset-x-0 h-px bg-coffee-gold/35"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: titleDelay }}
      />

      <h3 className="font-serif text-2xl lg:text-[1.625rem] font-semibold text-white leading-snug mb-3">
        <SplitText text={title} start={inView} baseDelay={titleDelay} charDelay={20} />
      </h3>

      <m.p
        className="text-base text-white/85 leading-relaxed"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: bodyDelay }}
      >
        {body}
      </m.p>
    </div>
  );
}

// true a partir do breakpoint lg (no servidor e no primeiro render, false)
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

/* ─────────────────────────────────────────────
   Bloco principal de Parallax
───────────────────────────────────────────── */
function ParallaxBlock({
  bgImage,
  label,
  title,
  paragraph,
  cards,
  particles,
  ambientLight,
}: {
  bgImage: string;
  label: string;
  title: string;
  paragraph: string;
  cards: { title: string; body: string }[];
  particles?: "leaves" | "beans" | "steam";
  ambientLight?: boolean;
}) {
  const blockRef = useRef<HTMLDivElement>(null);
  const inView = useInView(blockRef, { once: true, amount: 0.35 });
  // background-image não tem loading="lazy": só aplica a imagem a uma tela de distância,
  // senão as três baixam junto com o hero e atrasam o LCP
  const nearView = useInView(blockRef, { once: true, margin: "100% 0px" });
  // No celular as colunas ficam empilhadas: sem o deslize lateral e com títulos menores
  const isDesktop = useIsDesktop();
  // Partículas só rodam com o capítulo na tela (fora dela ficam paradas, sem gastar CPU)
  const onScreen = useInView(blockRef, { amount: 0.1 });
  const reduceMotion = useReducedMotion();

  // Etapas do capítulo: 0 = só o título, 1 = assentado com parágrafo, 2+ = cada tópico.
  // Tudo entra sozinho, em sequência curta, logo que o capítulo aparece: quem rola rápido
  // já vê o conteúdo chegando. No celular os tópicos entram pela rolagem (ficam empilhados abaixo)
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const settle = isDesktop ? 1100 : 500;
    const timers = [settle, settle + 450, settle + 850].map((ms, i) =>
      setTimeout(() => setStep((prev) => Math.max(prev, i + 1)), ms),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, isDesktop]);

  const phase = step >= 1 ? "settled" : "center";

  // Desktop: a foto aparece em cima e escurece só embaixo, onde fica o texto.
  // No celular o texto ocupa a tela toda: overlay uniforme para manter o contraste
  const overlayStyle = isDesktop
    ? "linear-gradient(to top, rgba(22,11,6,0.96) 0%, rgba(22,11,6,0.7) 45%, rgba(22,11,6,0.25) 100%)"
    : "rgba(22, 11, 6, 0.82)";

  return (
    <div
      ref={blockRef}
      // bg-fixed só no desktop: no iOS/mobile o "fixed" é ignorado ou fica pesado
      className="relative min-h-screen w-full flex flex-col lg:flex-row justify-center lg:justify-between lg:items-end gap-14 py-28 lg:pt-0 lg:pb-24 overflow-hidden bg-cover bg-center bg-no-repeat lg:bg-fixed"
      style={{ backgroundImage: nearView ? `url(${bgImage})` : undefined }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-0" style={{ background: overlayStyle }} />

      {/* Luz ambiente âmbar pulsante (apenas quando ambientLight=true e o bloco já entrou na tela) */}
      {ambientLight && inView && (
        <m.div
          className="absolute inset-0 z-1 pointer-events-none"
          animate={{ opacity: [0.0, 0.18, 0.0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(184,115,51,0.55) 0%, transparent 75%)",
          }}
        />
      )}

      {/* Partículas flutuantes */}
      {particles && !reduceMotion && (
        <FloatingParticles type={particles} active={inView && onScreen} compact={!isDesktop} />
      )}

      {/* Container de texto — começa centrado, desliza para a esquerda */}
      <m.div
        className={`relative z-10 flex flex-col gap-6 lg:gap-7 px-6 md:px-16 lg:px-20 w-full lg:w-7/12`}
        initial={false}
        animate={{ x: phase === "settled" || !isDesktop ? 0 : "20vw" }}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Label com fio dourado */}
        <div className="flex items-center gap-4">
          <m.span
            aria-hidden="true"
            className="block w-12 h-px bg-coffee-gold"
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8 }}
          />
          <SplitText
            text={label}
            className="text-coffee-gold tracking-[0.25em] text-xs uppercase font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            start={inView}
            baseDelay={0.2}
            charDelay={22}
          />
        </div>

        {/* Título — última palavra em itálico dourado */}
        {/* Tamanho fixo: animar fontSize recalcula o texto a cada frame e as letras tremem */}
        <h2 className="font-serif font-bold leading-[1.02] tracking-[-0.01em] text-white drop-shadow-2xl lg:whitespace-nowrap text-[clamp(2.25rem,9vw,2.75rem)] lg:text-[clamp(3rem,6.1vw,5.5rem)]">
          <SplitText text={title} start={inView} baseDelay={0.15} charDelay={25} accentLast />
        </h2>

        {/* Parágrafo — só aparece após o slide */}
        <m.p
          className="text-lg md:text-xl text-white/85 leading-relaxed max-w-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={phase === "settled" ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          {paragraph}
        </m.p>
      </m.div>

      {/* Coluna estreita de tópicos, alinhada à base junto com o título */}
      <div className="relative z-10 w-full lg:w-4/12 px-6 md:px-16 lg:pl-0 lg:pr-20 flex flex-col">
        {cards.map((card, i) => (
          <BigRevealCard
            key={card.title}
            title={card.title}
            body={card.body}
            titleDelay={0.1}
            bodyDelay={0.5}
            show={isDesktop ? step >= 2 + i : undefined}
          />
        ))}
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────
   SEÇÃO PRINCIPAL
───────────────────────────────────────────── */
export default function HistorySection() {
  return (
    <section id="historia" className="relative w-full text-white">

      <ParallaxBlock
        bgImage="/images/coffee_farm.webp"
        label="A Origem"
        title="Nascido nas Montanhas"
        paragraph="A verdadeira identidade de um café reside no seu terroir — no solo vulcânico, na altitude e na névoa que abraça os grãos ao amanhecer."
        particles="leaves"
        cards={[
          {
            title: "O Solo que Faz a Diferença",
            body: "Percorremos as montanhas de Minas Gerais, as altitudes da Colômbia e os planaltos etíopes. Cada região, cada fazenda, carrega uma assinatura única e irrepetível. É isso que chamamos de terroir.",
          },
          {
            title: "Micro-Lotes Raros",
            body: "Selecionamos apenas os micro-lotes de maior pontuação sensorial — aqueles que nenhum supermercado terá acesso. Cafés raros, com produção limitada e histórias para contar.",
          },
        ]}
      />

      <ParallaxBlock
        bgImage="/images/founders.webp"
        label="Os Mestres"
        title="Artesãos da Torra"
        paragraph="Nossa busca pela xícara perfeita nos levou a dedicar vidas inteiras ao estudo da curva de torra. Cada grão, uma decisão. Sem automação. Sem atalhos."
        particles="beans"
        cards={[
          {
            title: "A Arte da Torra",
            body: "A curva de torra é a nossa linguagem. Controlamos temperatura, tempo e desenvolvimento com precisão cirúrgica — transformando um grão comum em uma obra-prima sensorial.",
          },
          {
            title: "Nossa Filosofia",
            body: "Acreditamos que um café excepcional não precisa de nada além de si mesmo. Apenas as notas florais, frutadas e achocolatadas que a natureza inscreveu no grão.",
          },
        ]}
      />

      <ParallaxBlock
        bgImage="/images/store.webp"
        label="O Santuário"
        title="Nossa Boutique"
        paragraph="Um espaço criado para celebrar o café como ele deve ser: sem pressa, sem distrações, com atenção total ao que está na xícara."
        particles="steam"
        ambientLight={true}
        cards={[
          {
            title: "Degustação Guiada",
            body: "Cada visita começa com uma seleção curada de micro-lotes. Nossos especialistas conduzem sua percepção sensorial do aroma à finalização.",
          },
          {
            title: "Moagem na Hora",
            body: "O café é moído no momento do pedido. Nunca um segundo antes. O aroma que enche a loja é a nossa maior promessa cumprida.",
          },
        ]}
      />

    </section>
  );
}
