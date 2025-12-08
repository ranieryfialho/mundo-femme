"use client";

import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="mb-10">
          <CustomBreadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Fale Conosco" }
            ]} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Informações */}
          <div className="space-y-8">
            <div>
              <h1 className="font-serif text-4xl text-brand-dark mb-4">Estamos aqui para ajudar</h1>
              <p className="font-sans text-gray-500 leading-relaxed">
                Tem alguma dúvida sobre tamanho, pedido ou quer apenas dar um "oi"? 
                Nossa equipe de atendimento está pronta para te ouvir.
              </p>
            </div>

            <div className="space-y-6 pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-offwhite rounded-full text-brand-pink">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-sm uppercase tracking-wide">E-mail</h4>
                  <p className="text-gray-500 text-sm">atendimento@mundofemme.com.br</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-offwhite rounded-full text-brand-pink">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-sm uppercase tracking-wide">WhatsApp</h4>
                  <p className="text-gray-500 text-sm">(85) 99999-9999</p>
                  <p className="text-xs text-gray-400 mt-1">Seg a Sex, das 9h às 18h</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-offwhite rounded-full text-brand-pink">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-sm uppercase tracking-wide">Escritório</h4>
                  <p className="text-gray-500 text-sm">
                    Av. Teste, 100 - Bairro<br />
                    Caucaia - CE
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="bg-brand-offwhite p-8 rounded-lg border border-gray-100">
            <h3 className="font-serif text-2xl text-brand-dark mb-6">Envie uma mensagem</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase font-bold text-gray-500">Nome</label>
                  <input type="text" className="w-full h-12 px-4 bg-white border border-gray-200 focus:border-brand-pink focus:outline-none transition-colors rounded-sm" placeholder="Seu nome" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase font-bold text-gray-500">Sobrenome</label>
                  <input type="text" className="w-full h-12 px-4 bg-white border border-gray-200 focus:border-brand-pink focus:outline-none transition-colors rounded-sm" placeholder="Seu sobrenome" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase font-bold text-gray-500">E-mail</label>
                <input type="email" className="w-full h-12 px-4 bg-white border border-gray-200 focus:border-brand-pink focus:outline-none transition-colors rounded-sm" placeholder="seu@email.com" />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase font-bold text-gray-500">Mensagem</label>
                <textarea className="w-full h-32 p-4 bg-white border border-gray-200 focus:border-brand-pink focus:outline-none transition-colors rounded-sm resize-none" placeholder="Como podemos ajudar?" />
              </div>

              <Button className="w-full h-14 bg-brand-dark hover:bg-brand-pink text-white uppercase tracking-widest text-xs font-bold transition-all mt-2">
                Enviar Mensagem <Send size={16} className="ml-2" />
              </Button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}