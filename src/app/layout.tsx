import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { SmoothScrolling } from "@/providers/SmoothScrolling";
import { CartDrawer } from "@/components/cart/CartDrawer"; // Importação do Carrinho

// Configuração das Fontes
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mundo Femme | Moda Íntima & Fitness",
  description: "Elegância, conforto e performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(
        "min-h-screen bg-brand-offwhite font-sans antialiased",
        cormorant.variable, 
        montserrat.variable
      )}>
        {/* Provider de Scroll Suave envolve toda a aplicação */}
        <SmoothScrolling>
          
          {/* Header Fixo Global */}
          <Header />
          
          {/* Gaveta do Carrinho (Global, pode abrir de qualquer lugar) */}
          <CartDrawer />
          
          {/* Conteúdo da Página */}
          {children}
          
        </SmoothScrolling>
      </body>
    </html>
  );
}