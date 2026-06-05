"use client";

import { useCart } from '@/context/CartContext';
import { LuX, LuMinus, LuPlus, LuShoppingBag } from "react-icons/lu";
import Link from 'next/link';

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, removeItem, total } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />
      
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0705]/95 backdrop-blur-2xl z-[70] shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 border-l border-white/10 overflow-hidden">
        {/* Amber Dust Effect no fundo do Drawer */}
        <div className="absolute top-0 right-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_top_right,rgba(184,115,51,0.15)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/10 bg-transparent">
          <h2 className="font-serif text-2xl font-medium tracking-wide text-white flex items-center gap-3">
            <LuShoppingBag className="w-5 h-5 text-coffee-caramel stroke-[1.5]" />
            Sua Seleção
          </h2>
          <button 
            onClick={closeCart}
            className="p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            <LuX className="w-5 h-5" />
          </button>
        </div>

        <div className="relative z-10 flex-grow overflow-y-auto p-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-white/40">
              <LuShoppingBag className="w-16 h-16 text-white/10 mb-6 stroke-[1]" />
              <p className="text-lg font-light">Seu carrinho está vazio.</p>
              <button 
                onClick={closeCart}
                className="mt-6 text-coffee-caramel hover:text-[#ffd6a5] font-medium tracking-wide transition-colors"
              >
                Retornar à Boutique
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="group flex gap-4 items-center bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-black/50" />
                  ) : (
                    <div className="w-20 h-20 bg-black/40 rounded-xl flex items-center justify-center border border-white/5">
                      <LuShoppingBag className="w-8 h-8 text-white/20 stroke-[1.5]" />
                    </div>
                  )}
                  
                  <div className="flex-grow">
                    <h4 className="font-medium text-white/90 text-sm">{item.name}</h4>
                    {item.isSubscription && (
                      <span className="text-[10px] uppercase tracking-wider bg-coffee-caramel/20 text-coffee-caramel px-2 py-0.5 rounded-full mt-1.5 inline-block font-bold">
                        Assinatura Mensal
                      </span>
                    )}
                    <div className="text-white/80 font-medium mt-2 text-sm">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-white/30 hover:text-red-400 transition-colors uppercase tracking-widest font-medium"
                    >
                      Remover
                    </button>
                    <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-full px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-white/50 hover:text-coffee-caramel transition-colors p-1"
                      >
                        <LuMinus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center text-white/90">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-white/50 hover:text-coffee-caramel transition-colors p-1"
                      >
                        <LuPlus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="relative z-10 p-6 border-t border-white/10 bg-[#0a0705]/80 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <span className="text-white/60 font-medium text-sm uppercase tracking-widest">Subtotal</span>
              <span className="text-2xl font-serif text-white">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
              </span>
            </div>
            <Link 
              href="/checkout"
              onClick={closeCart}
              className="group relative w-full overflow-hidden bg-coffee-caramel hover:bg-[#c9803b] text-white py-4 rounded-full font-bold tracking-wide transition-all duration-300 flex items-center justify-center shadow-[0_0_30px_rgba(184,115,51,0.2)]"
            >
              <span className="relative z-10">Finalizar Pedido</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
