"use client";

import Link from 'next/link';
import { LuShoppingBag, LuMenu, LuX } from "react-icons/lu";
import { useState, useEffect } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { NAV_LINKS } from './navLinks';

export default function Header() {
  const { openCart, items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu aberto: trava o scroll da página e fecha com Esc
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled || menuOpen ? 'bg-coffee-dark/95 backdrop-blur-md border-b border-white/10 py-1 shadow-xl' : 'bg-linear-to-b from-black/50 to-transparent py-4'}`}>
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-2xl font-medium tracking-[0.25em] text-white transition-colors group-hover:text-white/80">
            TERROIR<span className="text-coffee-caramel">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 font-medium text-sm text-white/90">
          {NAV_LINKS.map((link) => (
            <Link key={link.name} href={link.href} className="group inline-flex items-center text-white/90 hover:text-[#ffd6a5] transition-colors duration-500 tracking-widest uppercase text-xs">
              <span className="relative pb-1">
                {/* Efeito Poeira Âmbar Flocada/Sutil (Igual ao Footer) */}
                <span className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[160%] bg-[radial-gradient(ellipse_at_center,rgba(184,115,51,0.6)_0%,transparent_70%)] blur-[6px] opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-110 transition-all duration-700 rounded-full z-0 pointer-events-none mix-blend-screen" />
                <span className="relative z-10">{link.name}</span>
              </span>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6 text-white">
          <button 
            className="p-2 -m-2 hover:text-coffee-caramel transition-transform hover:scale-110 duration-300 relative group"
            aria-label="Carrinho"
            onClick={openCart}
          >
            <LuShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {itemCount > 0 && (
              <span className="absolute top-0.5 right-0 w-[18px] h-[18px] bg-coffee-copper text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg border border-coffee-dark/50 group-hover:bg-white group-hover:text-coffee-copper transition-colors">
                {itemCount}
              </span>
            )}
          </button>

          {/* Botão do menu mobile */}
          <button
            className="md:hidden p-2 -m-2 hover:text-coffee-caramel transition-colors"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <LuX className="w-6 h-6 stroke-[1.5]" /> : <LuMenu className="w-6 h-6 stroke-[1.5]" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <m.nav
            id="mobile-menu"
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <ul className="container mx-auto px-6 pt-4 pb-8 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <m.li
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 border-b border-white/10 font-serif text-2xl text-white/90 hover:text-[#ffd6a5] transition-colors"
                  >
                    {link.name}
                  </Link>
                </m.li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
