"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────
   SVG: Folha
───────────────────────────────────────────── */
function LeafSvg({ size = 24, color = "#a0b070" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C8 2 3 7 3 13c0 4.5 3.5 8 9 9 5.5-1 9-4.5 9-9 0-6-5-11-9-11z"
        fill={color}
        fillOpacity={0.85}
      />
      <path
        d="M12 2 Q11 8 12 22"
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.5}
        fill="none"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SVG: Grão de Café
───────────────────────────────────────────── */
function BeanSvg({ size = 20, color = "#b87333" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 14 20" fill="none">
      <ellipse cx="7" cy="10" rx="6" ry="9" fill={color} fillOpacity={0.9} />
      <path
        d="M7 2 Q3 7 4 10 Q5 13 7 18"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth={1.2}
        fill="none"
        strokeLinecap="round"
      />
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

function FloatingParticles({
  type,
  visible,
}: {
  type: "leaves" | "beans" | "steam";
  visible: boolean;
}) {
  const configs = type === "leaves" ? LEAF_CONFIGS : type === "beans" ? BEAN_CONFIGS : STEAM_CONFIGS;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {configs.map((cfg, i) => {
        const leafBean = cfg as typeof LEAF_CONFIGS[0];
        const steam = cfg as typeof STEAM_CONFIGS[0];
        return (
          <motion.div
            key={i}
            className="absolute"
            style={
              type === "steam"
                ? {
                  bottom: "-10%",
                  left: steam.left,
                  filter: "blur(8px)",
                }
                : {
                  top: leafBean.top,
                  right: leafBean.right,
                }
            }
            animate={
              visible
                ? type === "steam"
                  ? {
                    y: [0, -(typeof window !== "undefined" ? window.innerHeight * 1.2 : 900)],
                    x: [0, steam.dx],
                    scale: [0.6, 1.8],
                    opacity: [0, 0.6, 0.4, 0],
                  }
                  : {
                    x: [0, -(typeof window !== "undefined" ? window.innerWidth * 1.15 : 1600)],
                    y: [0, typeof window !== "undefined" ? window.innerHeight * 1.1 : 800],
                    rotate: [leafBean.rot, leafBean.rot + 360],
                    opacity: [0, 1, 1, 0.8],
                  }
                : { opacity: 0 }
            }
            transition={
              visible
                ? {
                  duration: cfg.duration,
                  delay: cfg.delay,
                  repeat: Infinity,
                  ease: type === "steam" ? "easeOut" : "linear",
                  times: [0, 0.05, 0.9, 1],
                }
                : { duration: 1.2 }
            }
          >
            {type === "leaves" ? (
            <LeafSvg size={cfg.size} />
          ) : type === "beans" ? (
            <BeanSvg size={cfg.size} />
          ) : (
            <SteamSvg size={cfg.size} />
          )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SVG: Vapor / Fumaça
───────────────────────────────────────────── */
function SteamSvg({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 40 60" fill="none">
      <ellipse cx="20" cy="30" rx="14" ry="22" fill="white" fillOpacity={0.12} />
      <ellipse cx="20" cy="30" rx="8" ry="14" fill="white" fillOpacity={0.08} />
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
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  charDelay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <span ref={ref} className={`inline ${className}`} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
          initial={{
            opacity: 0,
            transform:
              "perspective(500px) translate3d(-25px, -30px, -120px) rotate3d(1, -1, 0, 30deg)",
          }}
          animate={
            inView
              ? {
                opacity: 1,
                transform:
                  "perspective(500px) translate3d(0, 0, 0) rotate3d(0, 0, 0, 0deg)",
              }
              : {}
          }
          transition={{
            duration: 0.6,
            delay: baseDelay + i * (charDelay / 1000),
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
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
  scrollReveal = false,
}: {
  title: string;
  body: string;
  titleDelay?: number;
  bodyDelay?: number;
  scrollReveal?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: scrollReveal ? "0px 0px -30% 0px" : "0px 0px -5% 0px",
  });

  return (
    <div ref={ref} className="w-full">
      <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 whitespace-nowrap">
        <SplitText
          text={title}
          baseDelay={inView ? titleDelay : 999}
          charDelay={20}
        />
      </h3>

      <motion.div
        className="h-px bg-coffee-caramel/50 mb-5"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: titleDelay + 0.2 }}
      />

      <motion.p
        className="text-base md:text-lg text-white/70 leading-relaxed"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: bodyDelay }}
      >
        {body}
      </motion.p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Bloco principal de Parallax
───────────────────────────────────────────── */
function ParallaxBlock({
  bgImage,
  label,
  title,
  paragraph,
  align = "center",
  rightContent,
  leftContent,
  particles,
  ambientLight,
}: {
  bgImage: string;
  label: string;
  title: string;
  paragraph: string;
  align?: "center" | "left" | "right";
  rightContent?: React.ReactNode;
  leftContent?: React.ReactNode;
  particles?: "leaves" | "beans" | "steam";
  ambientLight?: boolean;
}) {
  const blockRef = useRef<HTMLDivElement>(null);
  const inView = useInView(blockRef, { once: true, margin: "-15%" });
  const [phase, setPhase] = useState<"center" | "settled">("center");

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setPhase("settled"), 2600);
      return () => clearTimeout(t);
    }
  }, [inView]);

  const hasRight = !!rightContent && align === "left";
  const hasLeft = !!leftContent && align === "right";

  const overlayStyle =
    align === "left"
      ? "linear-gradient(to right, rgba(22,11,6,0.94) 40%, rgba(22,11,6,0.15) 100%)"
      : align === "right"
        ? "linear-gradient(to left, rgba(22,11,6,0.94) 40%, rgba(22,11,6,0.15) 100%)"
        : "rgba(22, 11, 6, 0.60)";

  return (
    <div
      ref={blockRef}
      className="relative h-screen w-full flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-0" style={{ background: overlayStyle }} />

      {/* Luz ambiente âmbar pulsante (apenas quando ambientLight=true) */}
      {ambientLight && (
        <motion.div
          className="absolute inset-0 z-[1] pointer-events-none"
          animate={{ opacity: [0.0, 0.18, 0.0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(184,115,51,0.55) 0%, transparent 75%)",
          }}
        />
      )}

      {/* Partículas flutuantes */}
      {particles && (
        <FloatingParticles type={particles} visible={inView && phase === "center"} />
      )}

      {/* Container de texto — começa centrado, desliza para a esquerda */}
      <motion.div
        className="relative z-10 flex flex-col gap-6 px-12 md:px-16 lg:px-20"
        initial={{ x: "25vw" }}
        animate={phase === "settled" ? { x: 0 } : { x: "25vw" }}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
        style={{ width: hasRight ? "50%" : "100%", maxWidth: hasRight ? "50%" : "56rem" }}
      >
        {/* Label */}
        <SplitText
          text={label}
          className="text-coffee-caramel tracking-[0.25em] text-xs uppercase font-medium"
          baseDelay={inView ? 0 : 999}
          charDelay={22}
        />

        {/* Título — grande enquanto centrado */}
        <motion.h2
          className="font-serif font-bold leading-tight text-white drop-shadow-2xl whitespace-nowrap"
          animate={
            phase === "settled"
              ? { fontSize: "clamp(2.5rem, 5vw, 4rem)", scale: 1 }
              : inView
                ? {
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                  scale: [1, 1.015, 1],
                  transition: {
                    fontSize: { duration: 1.3, ease: [0.76, 0, 0.24, 1] },
                    scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                  },
                }
                : { fontSize: "clamp(3rem, 7vw, 6rem)", scale: 1 }
          }
          transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
        >
          <SplitText text={title} baseDelay={inView ? 0.15 : 999} charDelay={25} />
        </motion.h2>

        {/* Parágrafo — só aparece após o slide */}
        <motion.p
          className="text-lg md:text-xl text-white/80 leading-relaxed max-w-md"
          initial={{ opacity: 0, y: 12 }}
          animate={phase === "settled" ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {paragraph}
        </motion.p>
      </motion.div>

      {/* Lado esquerdo para align=right */}
      {hasLeft && (
        <motion.div
          className="relative z-10 w-1/2 px-12 md:px-16 lg:px-20 flex flex-col gap-10 items-end text-right"
          initial={{ opacity: 0, x: -40 }}
          animate={phase === "settled" ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          {leftContent}
        </motion.div>
      )}

      {/* Lado direito para align=left */}
      {hasRight && (
        <motion.div
          className="relative z-10 w-1/2 px-12 md:px-16 lg:px-20 flex flex-col gap-10 items-start"
          initial={{ opacity: 0, x: 40 }}
          animate={phase === "settled" ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          {rightContent}
        </motion.div>
      )}
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
        bgImage="/images/coffee_farm.png"
        label="Capítulo 1 — A Origem"
        title="Nascido nas Montanhas"
        paragraph="A verdadeira identidade de um café reside no seu terroir — no solo vulcânico, na altitude e na névoa que abraça os grãos ao amanhecer."
        align="left"
        particles="leaves"
        rightContent={
          <div className="flex flex-col gap-14 w-full">
            <BigRevealCard
              title="O Solo que Faz a Diferença"
              body="Percorremos as montanhas de Minas Gerais, as altitudes da Colômbia e os planaltos etíopes. Cada região, cada fazenda, carrega uma assinatura única e irrepetível. É isso que chamamos de terroir."
              titleDelay={0.2}
              bodyDelay={0.8}
            />
            <BigRevealCard
              title="Micro-Lotes Raros"
              body="Selecionamos apenas os micro-lotes de maior pontuação sensorial — aqueles que nenhum supermercado terá acesso. Cafés raros, com produção limitada e histórias para contar."
              titleDelay={0.1}
              bodyDelay={0.7}
              scrollReveal={true}
            />
          </div>
        }
      />

      <ParallaxBlock
        bgImage="/images/founders.png"
        label="Capítulo 2 — Os Mestres"
        title="Artesãos da Torra"
        paragraph="Nossa busca pela xícara perfeita nos levou a dedicar vidas inteiras ao estudo da curva de torra. Cada grão, uma decisão. Sem automação. Sem atalhos."
        align="left"
        particles="beans"
        rightContent={
          <div className="flex flex-col gap-14 w-full">
            <BigRevealCard
              title="A Arte da Torra"
              body="A curva de torra é a nossa linguagem. Controlamos temperatura, tempo e desenvolvimento com precisão cirúrgica — transformando um grão comum em uma obra-prima sensorial."
              titleDelay={0.2}
              bodyDelay={0.8}
            />
            <BigRevealCard
              title="Nossa Filosofia"
              body="Acreditamos que um café excepcional não precisa de nada além de si mesmo. Apenas as notas florais, frutadas e achocolatadas que a natureza inscreveu no grão."
              titleDelay={0.1}
              bodyDelay={0.7}
              scrollReveal={true}
            />
          </div>
        }
      />

      <ParallaxBlock
        bgImage="/images/store.png"
        label="Capítulo 3 — O Santuário"
        title="Nossa Boutique"
        paragraph="Um espaço criado para celebrar o café como ele deve ser: sem pressa, sem distrações, com atenção total ao que está na xícara."
        align="right"
        particles="steam"
        ambientLight={true}
        leftContent={
          <div className="flex flex-col gap-10 w-full items-end">
            <BigRevealCard
              title="Degustação Guiada"
              body="Cada visita começa com uma seleção curada de micro-lotes. Nossos especialistas conduzem sua percepção sensorial do aroma à finalização."
              titleDelay={0.2}
              bodyDelay={0.8}
            />
            <BigRevealCard
              title="Moagem na Hora"
              body="O café é moído no momento do pedido. Nunca um segundo antes. O aroma que enche a loja é a nossa maior promessa cumprida."
              titleDelay={0.1}
              bodyDelay={0.7}
              scrollReveal={true}
            />
          </div>
        }
      />

    </section>
  );
}
