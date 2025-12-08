"use client";

import { Package, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const NUVEMSHOP_LOGIN_URL = "https://devmundofemme.lojavirtualnuvem.com.br/account/login/";

export function OrdersList() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white border border-gray-100 rounded-lg shadow-sm">
      
      {/* Ícone de Destaque */}
      <div className="w-20 h-20 bg-brand-offwhite rounded-full flex items-center justify-center mb-6 text-brand-dark">
        <Package size={36} strokeWidth={1} />
      </div>
      
      <h3 className="font-serif text-2xl md:text-3xl text-brand-dark mb-4">
        Acompanhe seus Pedidos
      </h3>
      
      <div className="max-w-md space-y-4 mb-8">
        <p className="font-sans text-gray-500 leading-relaxed">
          Para garantir a máxima segurança dos seus dados pessoais e de pagamento, o histórico detalhado das suas compras é gerenciado no nosso <strong>Portal do Cliente Seguro</strong>.
        </p>
        
        <div className="flex items-center justify-center gap-2 text-xs text-brand-pink font-medium">
          <ShieldCheck size={14} />
          <span>Ambiente Protegido pela Nuvemshop</span>
        </div>
      </div>

      <Button 
        asChild
        className="bg-brand-dark hover:bg-brand-pink text-white uppercase tracking-widest text-xs h-14 px-10 rounded-none transition-all flex gap-3 items-center shadow-lg"
      >
        <a href={NUVEMSHOP_LOGIN_URL} target="_blank" rel="noopener noreferrer">
          Acessar Meus Pedidos <ExternalLink size={16} />
        </a>
      </Button>
      
      <p className="mt-8 text-xs text-gray-400 font-sans">
        Você será redirecionado para uma nova aba.
      </p>
    </div>
  );
}