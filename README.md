<div align="center">
  <img src="https://raw.githubusercontent.com/erickreisti/terroir-coffee/main/public/globe.svg" width="80" alt="Terroir Logo"/>
  <h1>Terroir Coffee Co.</h1>
  <p><strong>A Next-Generation E-commerce Experience</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TailwindCSS-v3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript" alt="TypeScript" />
  </p>
</div>

<br/>

> **Terroir Coffee** é um projeto de portfólio *Full-Stack Front-End* concebido para demonstrar fluência nas mais recentes tendências de design de interfaces (Spatial UI, Glassmorphism e Dark Mode Elegance) e nas melhores práticas arquiteturais do ecossistema React/Next.js atual.

## ✨ Destaques de UI/UX (2026 Standards)

- 🪞 **Glassmorphism Dinâmico:** Interfaces de navegação e resumo de carrinho flutuantes e translúcidas (`backdrop-blur-2xl`), inspiradas nos sistemas operacionais espaciais.
- 🎬 **Micro-interações Fluidas:** Nada é estático. Desde botões que emanam brilho radial interativo (`shimmer`) até *Floating Labels* nos formulários de pagamento. Tudo orquestrado de forma nativa com Tailwind e Framer Motion.
- ☕ **Quiz Interativo de Paladar:** Um sistema guiado que recomenda o plano de assinatura perfeito baseado nas respostas do usuário, integrado diretamente ao Estado Global.
- 🛒 **Checkout Sem Fricção:** Transição contínua entre a vitrine, o *Cart Drawer* deslizante e a rota dedicada e segura de Checkout simulado.

## 🏗️ Arquitetura e Padrões de Código

A aplicação foi estruturada seguindo o **Single Responsibility Principle** e **Componentização por Domínio**, fugindo do anti-pattern de hiper-fragmentação de componentes genéricos.

```text
src/
├── app/                  # Roteamento e Layouts Base (Next.js App Router)
│   ├── checkout/         # Rota de pagamento isolada
│   ├── globals.css       # Configurações globais e tipografia
│   └── page.tsx          # Ponto de entrada da Landing Page
├── components/           # Componentes de Domínio (Interface)
│   ├── CartDrawer.tsx    # Carrinho flutuante
│   ├── CoffeeQuiz.tsx    # Lógica e visual do onboarding
│   ├── HeroSection.tsx   # Vídeos orquestrados e crossfade loop
│   └── ...
└── context/              # Lógica de Negócio (Sem UI)
    └── CartContext.tsx   # Gerenciamento de Estado Global do Carrinho
```

- **Fronteiras "Use Client":** Uso cirúrgico das diretivas `"use client"`, garantindo que apenas a interatividade passe para o navegador, deixando o roteamento pesado a cargo do servidor.
- **Tailwind Arbitrary Values:** Estilização de altíssima fidelidade gerada "Just in Time" (JIT), sem arquivos sujos de CSS externo (ex: `bg-[radial-gradient(...)]`, `w-[140%]`).
- **Context API Nativa:** Gerenciamento de estado rápido e leve. Sem dependências antigas de terceiros para um fluxo que exige agilidade.

## 🚀 Como Rodar Localmente

Para testar a fluidez dessa aplicação em sua máquina:

1. Clone o repositório:
```bash
git clone https://github.com/erickreisti/terroir-coffee.git
```

2. Acesse a pasta do projeto:
```bash
cd terroir-coffee
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.

## 👤 Autor

Desenvolvido por **Erick**. 

Seja para trocar ideias sobre interfaces premium, performance no Front-End ou novos projetos, fique à vontade para conectar-se:

- GitHub: [@erickreisti](https://github.com/erickreisti)
