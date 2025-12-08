import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import { WishlistGrid } from "@/components/account/WishlistGrid";
import { Package, User, Heart, LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NUVEMSHOP_LOGIN_URL = "https://devmundofemme.lojavirtualnuvem.com.br/login";

export default function MyAccountPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="mb-8">
          <CustomBreadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Minha Conta" }
            ]} 
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- BARRA LATERAL (MENU) --- */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-brand-offwhite p-6 rounded-lg space-y-6 sticky top-24">
              <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
                <div className="w-12 h-12 bg-brand-pink text-white rounded-full flex items-center justify-center font-serif text-xl">
                  VF
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Bem-vinda,</p>
                  <p className="font-serif text-lg text-brand-dark">Visitante</p>
                </div>
              </div>

              <nav className="space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-brand-dark font-medium shadow-sm rounded-md transition-all">
                  <Heart size={18} /> Meus Favoritos
                </button>
                
                {/* Link Externo para Pedidos (Estratégia Headless Segura) */}
                <a 
                  href={NUVEMSHOP_LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-white hover:text-brand-dark rounded-md transition-all group"
                >
                  <Package size={18} /> Meus Pedidos
                  <ExternalLink size={14} className="ml-auto opacity-0 group-hover:opacity-100" />
                </a>

                <a 
                  href={NUVEMSHOP_LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-white hover:text-brand-dark rounded-md transition-all group"
                >
                  <User size={18} /> Dados Pessoais
                  <ExternalLink size={14} className="ml-auto opacity-0 group-hover:opacity-100" />
                </a>
              </nav>

              <div className="pt-6 border-t border-gray-200">
                <Link href="/">
                  <button className="flex items-center gap-2 text-sm text-red-400 hover:text-red-600 transition-colors">
                    <LogOut size={16} /> Sair / Voltar para Loja
                  </button>
                </Link>
              </div>
            </div>
          </aside>

          {/* --- CONTEÚDO PRINCIPAL --- */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="font-serif text-3xl md:text-4xl text-brand-dark mb-2">Meus Favoritos</h1>
              <p className="text-gray-500 font-sans">
                Gerencie sua lista de desejos e adicione itens à sacola.
              </p>
            </div>

            {/* Grid de Wishlist */}
            <WishlistGrid />

            {/* Banner Informativo sobre Pedidos */}
            <div className="mt-16 p-8 bg-brand-offwhite rounded-lg border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-serif text-xl text-brand-dark mb-2">Procurando seus pedidos anteriores?</h4>
                <p className="text-sm text-gray-500 max-w-md">
                  Para garantir a segurança dos seus dados, o histórico de compras e o rastreamento são gerenciados no nosso portal seguro.
                </p>
              </div>
              <Button 
                asChild
                className="bg-brand-dark hover:bg-brand-pink text-white uppercase tracking-widest text-xs h-12 px-8 whitespace-nowrap"
              >
                <a href={NUVEMSHOP_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                  Acessar Portal do Cliente
                </a>
              </Button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}