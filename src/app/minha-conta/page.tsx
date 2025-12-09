"use client";

import { useState } from "react";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import { WishlistGrid } from "@/components/account/WishlistGrid";
import { OrdersList } from "@/components/account/OrdersList"; // Importe o novo componente
import { Package, User, Heart, LogOut, ExternalLink, Settings } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// URL de login direto da sua loja Nuvemshop
const NUVEMSHOP_LOGIN_URL = "https://www.mundofemme.com.br/account/login/";

// Definição das Abas
type TabType = "wishlist" | "orders" | "settings";

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>("wishlist");

  return (
    <main className="min-h-screen pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <CustomBreadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Minha Conta" }
            ]} 
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- BARRA LATERAL (MENU DE NAVEGAÇÃO) --- */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-brand-offwhite p-6 rounded-lg space-y-6 sticky top-24 border border-gray-100">
              
              {/* Perfil */}
              <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                <div className="w-14 h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center text-brand-dark shadow-sm">
                  <User size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Bem-vinda,</p>
                  <p className="font-serif text-xl text-brand-dark">Visitante</p>
                </div>
              </div>

              {/* Menu */}
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab("wishlist")}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 font-medium rounded-md transition-all text-sm",
                    activeTab === "wishlist" 
                      ? "bg-brand-dark text-white shadow-md" 
                      : "bg-transparent text-gray-600 hover:bg-white hover:text-brand-dark"
                  )}
                >
                  <Heart size={18} /> Meus Favoritos
                </button>
                
                <button 
                  onClick={() => setActiveTab("orders")}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 font-medium rounded-md transition-all text-sm",
                    activeTab === "orders" 
                      ? "bg-brand-dark text-white shadow-md" 
                      : "bg-transparent text-gray-600 hover:bg-white hover:text-brand-dark"
                  )}
                >
                  <Package size={18} /> Meus Pedidos
                </button>

                {/* Link Externo Real */}
                <a 
                  href={NUVEMSHOP_LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-white hover:text-brand-dark rounded-md transition-all group"
                >
                  <Settings size={18} /> Dados Pessoais
                  <ExternalLink size={14} className="ml-auto opacity-0 group-hover:opacity-100" />
                </a>
              </nav>

              <div className="pt-6 border-t border-gray-200">
                <a href={NUVEMSHOP_LOGIN_URL}>
                  <button className="flex items-center gap-2 text-sm text-brand-pink hover:text-brand-dark transition-colors font-medium">
                    <LogOut size={16} /> Fazer Login / Cadastrar
                  </button>
                </a>
              </div>
            </div>
          </aside>

          {/* --- CONTEÚDO DINÂMICO --- */}
          <div className="flex-1 min-h-[500px]">
            
            {/* Título da Seção */}
            <div className="mb-10 pb-4 border-b border-gray-100">
              <h1 className="font-serif text-3xl md:text-4xl text-brand-dark mb-2 animate-fade-in">
                {activeTab === "wishlist" && "Lista de Desejos"}
                {activeTab === "orders" && "Meus Pedidos"}
                {activeTab === "settings" && "Configurações"}
              </h1>
              <p className="text-gray-500 font-sans text-sm">
                {activeTab === "wishlist" && "Gerencie seus itens favoritos e adicione à sacola."}
                {activeTab === "orders" && "Acompanhe o status das suas compras recentes."}
              </p>
            </div>

            {/* Renderização Condicional */}
            <div className="animate-fade-up">
              {activeTab === "wishlist" && <WishlistGrid />}
              {activeTab === "orders" && <OrdersList />}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}