"use client";

import Link from 'next/link';
import { ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

import { useState, useEffect } from 'react';

export default function Header() {
  const { openCart, items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'bg-coffee-dark/95 backdrop-blur-md border-b border-white/10 py-1 shadow-xl' : 'bg-gradient-to-b from-black/50 to-transparent py-4'}`}>
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-2xl font-medium tracking-[0.25em] text-white transition-colors group-hover:text-white/80">
            TERROIR<span className="text-coffee-caramel">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 font-medium text-sm text-white/90">
          {[
            { name: "Assinaturas", href: "#planos" },
            { name: "Boutique", href: "#loja" },
            { name: "Nossa História", href: "#historia" }
          ].map((link) => (
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
          <button className="hover:text-coffee-caramel transition-transform hover:scale-110 duration-300" aria-label="Conta">
            <User className="w-5 h-5 stroke-[1.5]" />
          </button>
          <button 
            className="hover:text-coffee-caramel transition-transform hover:scale-110 duration-300 relative group" 
            aria-label="Carrinho"
            onClick={openCart}
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-[18px] h-[18px] bg-coffee-caramel text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg border border-coffee-dark/50 group-hover:bg-white group-hover:text-coffee-caramel transition-colors">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
