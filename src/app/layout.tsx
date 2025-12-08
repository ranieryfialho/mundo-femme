import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer"; // Importação do Footer
import { SmoothScrolling } from "@/providers/SmoothScrolling";
import { CartDrawer } from "@/components/cart/CartDrawer";

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
        // Adicionei 'flex flex-col' para garantir que o footer vá para o final
        "min-h-screen bg-brand-offwhite font-sans antialiased flex flex-col",
        cormorant.variable, 
        montserrat.variable
      )}>
        {/* Provider de Scroll Suave envolve toda a aplicação */}
        <SmoothScrolling>
          
          {/* Header Fixo Global */}
          <Header />
          
          {/* Gaveta do Carrinho (Global, pode abrir de qualquer lugar) */}
          <CartDrawer />
          
          {/* Conteúdo da Página (Expande para empurrar o footer) */}
          <div className="flex-1">
            {children}
          </div>

          {/* Rodapé Global */}
          <Footer />
          
        </SmoothScrolling>
      </body>
    </html>
  );
}