import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Termos, Privacidade e FAQ",
};

const SECTIONS = [
  {
    id: "termos",
    title: "Termos de Serviço",
    body: [
      "Ao comprar na Terroir você concorda com estes termos. Os preços e a disponibilidade dos micro-lotes podem mudar sem aviso, já que cada safra é limitada.",
      "Assinaturas são renovadas automaticamente a cada ciclo e podem ser pausadas ou canceladas a qualquer momento, sem multa.",
    ],
  },
  {
    id: "privacidade",
    title: "Política de Privacidade",
    body: [
      "Coletamos apenas os dados necessários para processar pedidos e entregas: nome, e-mail, endereço e informações de pagamento.",
      "Nunca vendemos seus dados. Você pode pedir a exclusão da sua conta a qualquer momento, conforme a LGPD.",
    ],
  },
  {
    id: "trocas",
    title: "Trocas e Devoluções",
    body: [
      "Acessórios podem ser devolvidos em até 7 dias após o recebimento, na embalagem original.",
      "Cafés são produtos perecíveis: se o pacote chegar danificado ou fora do padrão, enviamos um novo sem custo.",
    ],
  },
  {
    id: "faq",
    title: "Perguntas Frequentes",
    faq: [
      ["Quanto tempo leva a entrega?", "Torramos sob demanda e despachamos em até 2 dias úteis. A entrega leva de 3 a 7 dias úteis, conforme a região."],
      ["Qual moagem devo escolher?", "Grãos inteiros preservam o aroma por mais tempo. Se não tiver moedor, informe seu método de preparo e moemos na medida certa."],
      ["Posso trocar o café da minha assinatura?", "Sim. Refaça o quiz “Seu Perfil” ou altere o plano na sua conta antes do próximo ciclo."],
    ],
  },
];

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-coffee-cream pt-40 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <span className="text-coffee-accent font-medium tracking-[0.3em] text-xs uppercase mb-4 block">Institucional</span>
          <h1 className="font-serif text-4xl md:text-5xl text-coffee-dark mb-12">Transparência em cada grão</h1>

          {/* Índice */}
          <nav aria-label="Seções" className="flex flex-wrap gap-3 mb-16">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="rounded-full border border-coffee-dark/15 px-4 py-2 text-sm text-coffee-earth hover:border-coffee-caramel hover:text-coffee-accent transition-colors">
                {s.title}
              </a>
            ))}
          </nav>

          <div className="space-y-16">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id}>
                <h2 className="font-serif text-2xl md:text-3xl text-coffee-dark mb-6">{s.title}</h2>
                {s.body?.map((p) => (
                  <p key={p} className="text-coffee-earth leading-relaxed mb-4">{p}</p>
                ))}
                {s.faq && (
                  <div className="divide-y divide-coffee-dark/10 border-y border-coffee-dark/10">
                    {s.faq.map(([q, a]) => (
                      <details key={q} className="group py-5">
                        <summary className="cursor-pointer list-none flex justify-between items-center font-medium text-coffee-dark">
                          {q}
                          <span className="text-coffee-caramel text-xl transition-transform group-open:rotate-45">+</span>
                        </summary>
                        <p className="mt-3 text-coffee-earth leading-relaxed">{a}</p>
                      </details>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
