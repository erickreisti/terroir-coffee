"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  // Se o carrinho estiver vazio, idealmente não deveria estar aqui, mas tratamos:
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0705] flex flex-col items-center justify-center text-white p-6">
        <h1 className="font-serif text-3xl mb-4">Seu carrinho está vazio.</h1>
        <p className="text-white/50 mb-8">Parece que você ainda não selecionou seu Terroir.</p>
        <Link href="/" className="text-coffee-caramel hover:text-[#ffd6a5] transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Voltar para a loja
        </Link>
      </div>
    );
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simula o processamento do pagamento
    setTimeout(() => {
      clearCart();
      router.push('/checkout/sucesso');
    }, 2500);
  };

  const frete = 15.00; // Frete fixo premium simulado
  const totalGeral = total + frete;

  return (
    <div className="min-h-screen bg-[#0a0705] text-coffee-cream selection:bg-coffee-caramel selection:text-white">
      {/* Header Minimalista Isolado */}
      <header className="w-full border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Voltar à loja</span>
          </Link>
          <div className="absolute left-1/2 -translate-x-1/2">
            <span className="font-serif text-2xl font-medium tracking-[0.25em] text-white">
              TERROIR<span className="text-coffee-caramel">.</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest font-bold">
            <Lock className="w-4 h-4 text-coffee-caramel" />
            <span>Seguro</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Formulários (Esquerda) */}
          <div className="w-full lg:w-3/5 space-y-12">
            
            {/* Seção 1: Identificação */}
            <section>
              <h2 className="font-serif text-2xl lg:text-3xl text-white mb-6 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-coffee-caramel/20 text-coffee-caramel flex items-center justify-center text-sm font-bold">1</span>
                Seus Dados
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input type="text" id="nome" required className="block w-full bg-white/5 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:border-coffee-caramel focus:ring-1 focus:ring-coffee-caramel transition-all peer" placeholder=" " />
                    <label htmlFor="nome" className="absolute text-sm text-white/50 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-coffee-caramel">Nome Completo</label>
                  </div>
                  <div className="relative group">
                    <input type="email" id="email" required className="block w-full bg-white/5 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:border-coffee-caramel focus:ring-1 focus:ring-coffee-caramel transition-all peer" placeholder=" " />
                    <label htmlFor="email" className="absolute text-sm text-white/50 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-coffee-caramel">E-mail de Contato</label>
                  </div>
                </div>
              </div>
            </section>

            {/* Seção 2: Entrega */}
            <section>
              <h2 className="font-serif text-2xl lg:text-3xl text-white mb-6 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-coffee-caramel/20 text-coffee-caramel flex items-center justify-center text-sm font-bold">2</span>
                Endereço de Entrega
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative group md:col-span-1">
                    <input type="text" id="cep" required className="block w-full bg-white/5 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:border-coffee-caramel transition-all peer" placeholder=" " />
                    <label htmlFor="cep" className="absolute text-sm text-white/50 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-coffee-caramel">CEP</label>
                  </div>
                  <div className="relative group md:col-span-2">
                    <input type="text" id="rua" required className="block w-full bg-white/5 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:border-coffee-caramel transition-all peer" placeholder=" " />
                    <label htmlFor="rua" className="absolute text-sm text-white/50 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-coffee-caramel">Endereço Completo</label>
                  </div>
                </div>
              </div>
            </section>

            {/* Seção 3: Pagamento (Fake) */}
            <section>
              <h2 className="font-serif text-2xl lg:text-3xl text-white mb-6 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-coffee-caramel/20 text-coffee-caramel flex items-center justify-center text-sm font-bold">3</span>
                Pagamento
              </h2>
              
              <form onSubmit={handleCheckout} className="space-y-8">
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
                  {/* Decoração sutil do cartão */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(184,115,51,0.15)_0%,transparent_70%)] rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white font-medium flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-coffee-caramel" />
                        Cartão de Crédito
                      </span>
                      <div className="flex gap-2">
                        <div className="w-8 h-5 bg-white/20 rounded" />
                        <div className="w-8 h-5 bg-white/20 rounded" />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <input type="text" id="card" required maxLength={19} className="block w-full bg-black/20 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white font-mono tracking-wider focus:outline-none focus:border-coffee-caramel transition-all peer" placeholder=" " />
                      <label htmlFor="card" className="absolute text-sm text-white/50 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-coffee-caramel">Número do Cartão</label>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="relative group">
                        <input type="text" id="expiry" required maxLength={5} className="block w-full bg-black/20 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white font-mono tracking-wider focus:outline-none focus:border-coffee-caramel transition-all peer" placeholder=" " />
                        <label htmlFor="expiry" className="absolute text-sm text-white/50 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-coffee-caramel">Validade (MM/AA)</label>
                      </div>
                      <div className="relative group">
                        <input type="text" id="cvv" required maxLength={4} className="block w-full bg-black/20 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white font-mono tracking-wider focus:outline-none focus:border-coffee-caramel transition-all peer" placeholder=" " />
                        <label htmlFor="cvv" className="absolute text-sm text-white/50 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-coffee-caramel">CVV</label>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full relative overflow-hidden group bg-coffee-caramel hover:bg-[#c9803b] text-white py-5 rounded-full font-bold text-lg tracking-wide transition-all duration-300 shadow-[0_0_40px_rgba(184,115,51,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className={`relative z-10 flex items-center justify-center gap-3 ${isProcessing ? 'opacity-0' : 'opacity-100'}`}>
                    <Lock className="w-5 h-5" />
                    Finalizar Compra
                  </span>
                  
                  {isProcessing && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                      <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="ml-3 font-medium">Processando...</span>
                    </div>
                  )}
                  
                  {/* Brilho hover animado */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                </button>
              </form>
            </section>
          </div>

          {/* Resumo do Pedido (Direita) */}
          <div className="w-full lg:w-2/5">
            <div className="sticky top-28 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              {/* Efeito de Poeira Âmbar Flocada no card */}
              <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(184,115,51,0.15)_0%,transparent_60%)] pointer-events-none" />
              
              <h3 className="font-serif text-2xl text-white mb-8 border-b border-white/10 pb-4">Resumo do Pedido</h3>
              
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-black/20" />
                    ) : (
                      <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-coffee-caramel/50" />
                      </div>
                    )}
                    <div className="flex-grow">
                      <h4 className="text-white/90 text-sm font-medium leading-tight mb-1">{item.name}</h4>
                      <p className="text-white/50 text-xs">Qtd: {item.quantity}</p>
                    </div>
                    <div className="text-white font-medium text-sm">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex justify-between text-white/60 text-sm">
                  <span>Subtotal</span>
                  <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</span>
                </div>
                <div className="flex justify-between text-white/60 text-sm">
                  <span>Frete Premium</span>
                  <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(frete)}</span>
                </div>
                <div className="flex justify-between text-white font-serif text-2xl pt-4 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-coffee-caramel">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalGeral)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
