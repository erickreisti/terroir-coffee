import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const sans = DM_Sans({
  variable: "--font-sans-main",
  subsets: ["latin"],
});

const serif = Fraunces({
  variable: "--font-serif-main",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Terroir Coffee Co.",
  description: "A Terroir conecta os paladares mais exigentes às melhores safras de cafés especiais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-coffee-cream text-coffee-dark font-sans selection:bg-coffee-caramel selection:text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
