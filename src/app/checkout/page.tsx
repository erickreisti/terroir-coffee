"use client";

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { LuArrowLeft, LuCreditCard, LuLock, LuCircleCheck, LuInfo, LuLoaderCircle } from "react-icons/lu";
import { useRouter } from 'next/navigation';

// Máscaras simples: mantêm só os dígitos e reaplicam a formatação
const onlyDigits = (v: string, max: number) => v.replace(/\D/g, '').slice(0, max);
const maskCep = (v: string) => onlyDigits(v, 8).replace(/^(\d{5})(\d)/, '$1-$2');
const maskCard = (v: string) => onlyDigits(v, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
const maskExpiry = (v: string) => onlyDigits(v, 4).replace(/^(\d{2})(\d)/, '$1/$2');

// Bandeira pelo prefixo, só para destacar o selo no cartão
function cardBrand(card: string) {
  const d = card.replace(/\D/g, '');
  if (/^(4011|4312|4389|4514|4576|5041|5066|5067|6277|6362|6363|6504|6505|6516)/.test(d)) return 'ELO';
  if (/^4/.test(d)) return 'VISA';
  if (/^(5[1-5]|2[2-7])/.test(d)) return 'MASTER';
  return null;
}

type CepStatus = 'idle' | 'loading' | 'found' | 'notfound';

export default function CheckoutPage() {
  const { items, total, clearCart, isHydrated } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cepStatus, setCepStatus] = useState<CepStatus>('idle');
  const ruaRef = useRef<HTMLInputElement>(null);

  // Espera o carrinho ser lido do localStorage antes de decidir
  if (!isHydrated) return <div className="min-h-screen bg-[#0a0705]" />;

  // Durante o processamento o carrinho é limpo antes do redirect; não mostrar o estado vazio
  if (items.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-[#0a0705] flex flex-col items-center justify-center text-white p-6">
        <h1 className="font-serif text-3xl mb-4">Seu carrinho está vazio.</h1>
        <p className="text-white/50 mb-8">Parece que você ainda não selecionou seu Terroir.</p>
        <Link href="/" className="text-coffee-caramel hover:text-[#ffd6a5] transition-colors flex items-center gap-2">
          <LuArrowLeft className="w-4 h-4" /> Voltar para a loja
        </Link>
      </div>
    );
  }

  // Preenche o endereço pela API pública do ViaCEP quando o CEP fica completo
  const handleCep = async (value: string) => {
    const masked = maskCep(value);
    setCep(masked);
    const digits = masked.replace('-', '');
    if (digits.length !== 8) {
      setCepStatus('idle');
      return;
    }
    setCepStatus('loading');
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (data.erro) throw new Error('CEP não encontrado');
      const street = data.logradouro ? `${data.logradouro}, nº ` : '';
      const rest = [data.bairro, `${data.localidade}/${data.uf}`].filter(Boolean).join(', ');
      setRua(street ? `${street}, ${rest}` : rest);
      setCepStatus('found');
      // Leva o cursor para depois de "nº " para digitar só o número
      requestAnimationFrame(() => {
        const input = ruaRef.current;
        if (!input) return;
        const idx = input.value.indexOf('nº ');
        const pos = idx >= 0 ? idx + 3 : input.value.length;
        input.focus();
        input.setSelectionRange(pos, pos);
      });
    } catch {
      setCepStatus('notfound');
    }
  };

  const brand = cardBrand(card);

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
            <LuArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Voltar à loja</span>
          </Link>
          <div className="absolute left-1/2 -translate-x-1/2">
            <span className="font-serif text-2xl font-medium tracking-[0.25em] text-white">
              TERROIR<span className="text-coffee-caramel">.</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest font-bold">
            <LuLock className="w-4 h-4 text-coffee-caramel" />
            <span>Seguro</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Formulários (Esquerda) */}
          <form onSubmit={handleCheckout} className="w-full lg:w-3/5 space-y-12">
            <div role="note" className="flex items-start gap-3 rounded-xl border border-coffee-gold/30 bg-coffee-gold/10 px-5 py-4 text-sm text-white/80">
              <LuInfo className="w-5 h-5 text-coffee-gold shrink-0 mt-0.5" />
              <p>
                <strong className="text-coffee-gold font-semibold">Ambiente demonstrativo.</strong>{' '}
                Nenhum pagamento é processado e nenhum dado sai do seu navegador. Use dados fictícios, como o cartão 4242 4242 4242 4242.
              </p>
            </div>
            
            {/* Seção 1: Identificação */}
            <section>
              <h2 className="font-serif text-2xl lg:text-3xl text-white mb-6 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-coffee-caramel/20 text-coffee-caramel flex items-center justify-center text-sm font-bold">1</span>
                Seus Dados
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input type="text" id="nome" required autoComplete="name" className="block w-full bg-white/5 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:border-coffee-caramel focus:ring-1 focus:ring-coffee-caramel transition-all peer" placeholder=" " />
                    <label htmlFor="nome" className="absolute text-sm text-white/50 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-coffee-caramel">Nome Completo</label>
                  </div>
                  <div className="relative group">
                    <input type="email" id="email" required autoComplete="email" className="block w-full bg-white/5 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:border-coffee-caramel focus:ring-1 focus:ring-coffee-caramel transition-all peer" placeholder=" " />
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
                    <input type="text" id="cep" required inputMode="numeric" autoComplete="postal-code" pattern="\d{5}-\d{3}" title="CEP com 8 dígitos" aria-describedby="cep-status" value={cep} onChange={(e) => handleCep(e.target.value)} className="block w-full bg-white/5 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:border-coffee-caramel transition-all peer" placeholder=" " />
                    <label htmlFor="cep" className="absolute text-sm text-white/50 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-coffee-caramel">CEP</label>
                    {cepStatus === 'loading' && (
                      <LuLoaderCircle aria-hidden="true" className="absolute right-4 top-4 w-4 h-4 text-coffee-caramel animate-spin" />
                    )}
                    <p id="cep-status" aria-live="polite" className="mt-2 text-xs text-white/60 empty:hidden">
                      {cepStatus === 'loading' && 'Buscando endereço...'}
                      {cepStatus === 'found' && 'Endereço encontrado. Complete com o número.'}
                      {cepStatus === 'notfound' && 'CEP não encontrado. Preencha o endereço à mão.'}
                    </p>
                  </div>
                  <div className="relative group md:col-span-2">
                    <input ref={ruaRef} type="text" id="rua" required autoComplete="street-address" value={rua} onChange={(e) => setRua(e.target.value)} className="block w-full bg-white/5 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white focus:outline-none focus:border-coffee-caramel transition-all peer" placeholder=" " />
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
              
              <div className="space-y-8">
                <div className="bg-linear-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
                  {/* Decoração sutil do cartão */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(184,115,51,0.15)_0%,transparent_70%)] rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white font-medium flex items-center gap-2">
                        <LuCreditCard className="w-5 h-5 text-coffee-caramel" />
                        Cartão de Crédito
                      </span>
                      <div className="flex gap-2">
                        {['VISA', 'MASTER', 'ELO'].map((b) => (
                          <span
                            key={b}
                            className={`px-2 h-5 rounded text-[9px] font-bold tracking-wider flex items-center transition-colors duration-300 ${
                              brand === b ? 'bg-coffee-gold text-coffee-dark' : 'bg-white/10 text-white/50'
                            }`}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <input type="text" id="card" required inputMode="numeric" autoComplete="cc-number" pattern="(\d{4} ){3}\d{4}" title="Número do cartão com 16 dígitos" value={card} onChange={(e) => setCard(maskCard(e.target.value))} className="block w-full bg-black/20 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white font-mono tracking-wider focus:outline-none focus:border-coffee-caramel transition-all peer" placeholder=" " />
                      <label htmlFor="card" className="absolute text-sm text-white/50 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-coffee-caramel">Número do Cartão</label>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="relative group">
                        <input type="text" id="expiry" required inputMode="numeric" autoComplete="cc-exp" pattern="(0[1-9]|1[0-2])/\d{2}" title="Mês e ano no formato MM/AA" value={expiry} onChange={(e) => setExpiry(maskExpiry(e.target.value))} className="block w-full bg-black/20 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white font-mono tracking-wider focus:outline-none focus:border-coffee-caramel transition-all peer" placeholder=" " />
                        <label htmlFor="expiry" className="absolute text-sm text-white/50 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-coffee-caramel">Validade (MM/AA)</label>
                      </div>
                      <div className="relative group">
                        <input type="password" id="cvv" required inputMode="numeric" autoComplete="cc-csc" pattern="\d{3,4}" title="3 ou 4 dígitos" value={cvv} onChange={(e) => setCvv(onlyDigits(e.target.value, 4))} className="block w-full bg-black/20 border border-white/10 rounded-lg px-4 pt-6 pb-2 text-white font-mono tracking-wider focus:outline-none focus:border-coffee-caramel transition-all peer" placeholder=" " />
                        <label htmlFor="cvv" className="absolute text-sm text-white/50 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-coffee-caramel">CVV</label>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full relative overflow-hidden group bg-coffee-copper hover:bg-[#8c5422] text-white py-5 rounded-full font-bold text-lg tracking-wide transition-all duration-300 shadow-[0_0_40px_rgba(184,115,51,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className={`relative z-10 flex items-center justify-center gap-3 ${isProcessing ? 'opacity-0' : 'opacity-100'}`}>
                    <LuLock className="w-5 h-5" />
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
                  <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                </button>
              </div>
            </section>
          </form>

          {/* Resumo do Pedido (Direita) */}
          <div className="w-full lg:w-2/5">
            <div className="sticky top-28 bg-linear-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
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
                        <LuCircleCheck className="w-6 h-6 text-coffee-caramel/50" />
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
