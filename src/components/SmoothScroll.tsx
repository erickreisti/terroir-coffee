"use client";

import { useEffect } from "react";

const HEADER_OFFSET = 64;

// easeInOutCubic: começa e termina devagar
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Intercepta cliques em links "#ancora" e rola com uma animação longa e suave
// (o scroll-behavior nativo é rápido demais e não permite ajustar a duração).
export function SmoothScroll() {
  useEffect(() => {
    let frame = 0;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      // Aceita "#ancora", "/#ancora" e links para a própria página (ex.: a logo → topo)
      const link = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.origin !== location.origin || link.pathname !== location.pathname || link.target) return;
      const hash = link.hash;
      const target = hash ? document.querySelector(hash) : null;
      if (hash && !target) return;

      e.preventDefault();
      cancelAnimationFrame(frame);

      const start = window.scrollY;
      const distance = target ? target.getBoundingClientRect().top - HEADER_OFFSET : -start;
      // Duração proporcional à distância, entre 0,9s e 1,8s
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = reduce ? 1 : Math.min(1800, Math.max(900, Math.abs(distance) * 0.6));
      const t0 = performance.now();

      const step = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        window.scrollTo(0, start + distance * ease(p));
        if (p < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
      history.pushState(null, "", hash || location.pathname);
    };

    // Rolagem manual do usuário cancela a animação
    const cancel = () => cancelAnimationFrame(frame);

    document.addEventListener("click", onClick, true);
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
