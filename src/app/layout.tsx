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
  style: ["normal", "italic"],
});

const SITE_URL = "https://terroir-coffee-three.vercel.app";
const DESCRIPTION = "A Terroir conecta os paladares mais exigentes às melhores safras de cafés especiais.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Terroir Coffee Co.",
    template: "%s | Terroir Coffee Co.",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Terroir Coffee Co.",
    title: "Terroir Coffee Co. — Cafés especiais de micro-lotes",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Terroir Coffee Co. — Cafés especiais de micro-lotes",
    description: DESCRIPTION,
  },
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
