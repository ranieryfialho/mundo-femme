"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* --- SEÇÃO SUPERIOR: NEWSLETTER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b border-white/10 pb-16 mb-16">
          <div className="max-w-xl space-y-4">
            <h3 className="font-serif text-3xl md:text-4xl">Fique por dentro</h3>
            <p className="font-sans text-gray-400 font-light leading-relaxed">
              Inscreva-se para receber novidades exclusivas, acesso antecipado a lançamentos e convites para eventos privados.
            </p>
          </div>
          
          <div className="w-full md:w-auto flex-1 max-w-md">
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="flex-1 bg-transparent border-b border-white/30 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-pink transition-colors font-sans"
              />
              <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white hover:text-brand-dark rounded-none uppercase tracking-widest text-xs h-12 px-8">
                Assinar
              </Button>
            </form>
          </div>
        </div>

        {/* --- SEÇÃO DO MEIO: LINKS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Coluna 1: Marca */}
          <div className="space-y-6">
            <h4 className="font-serif text-2xl uppercase tracking-widest">Mundo Femme</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-brand-pink transition-colors"><Instagram size={20} /></Link>
              <Link href="#" className="text-gray-400 hover:text-brand-pink transition-colors"><Facebook size={20} /></Link>
              <Link href="#" className="text-gray-400 hover:text-brand-pink transition-colors"><Twitter size={20} /></Link>
            </div>
          </div>

          {/* Coluna 2: Shop */}
          <div className="space-y-6">
            <h5 className="font-sans text-xs font-bold uppercase tracking-widest text-brand-beige">Loja</h5>
            <ul className="space-y-4 font-sans text-sm text-gray-400">
              <li><Link href="/categoria/colecao" className="hover:text-white transition-colors">Nova Coleção</Link></li>
              <li><Link href="/categoria/lingerie" className="hover:text-white transition-colors">Lingerie</Link></li>
              <li><Link href="/categoria/fitness" className="hover:text-white transition-colors">Fitness</Link></li>
              <li><Link href="/categoria/best-sellers" className="hover:text-white transition-colors">Best Sellers</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Institucional */}
          <div className="space-y-6">
            <h5 className="font-sans text-xs font-bold uppercase tracking-widest text-brand-beige">Sobre</h5>
            <ul className="space-y-4 font-sans text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Nossa História</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sustentabilidade</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Carreiras</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Coluna 4: Ajuda */}
          <div className="space-y-6">
            <h5 className="font-sans text-xs font-bold uppercase tracking-widest text-brand-beige">Ajuda</h5>
            <ul className="space-y-4 font-sans text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Trocas e Devoluções</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Envio e Entregas</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Guia de Tamanhos</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors flex items-center gap-2"><Mail size={14}/> Fale Conosco</Link></li>
            </ul>
          </div>
        </div>

        {/* --- SEÇÃO INFERIOR: DIREITOS --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-500 font-sans">
          <p>&copy; {new Date().getFullYear()} Mundo Femme. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Privacidade</span>
            <span>Termos de Uso</span>
          </div>
        </div>

      </div>
    </footer>
  );
}