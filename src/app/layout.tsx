import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrolling } from "@/providers/SmoothScrolling";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";

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
        "min-h-screen bg-brand-offwhite font-sans antialiased flex flex-col",
        cormorant.variable, 
        montserrat.variable
      )}>
        <SmoothScrolling>
          <Header />
          <CartDrawer />
          <WishlistDrawer />          
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}