"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, Search, User, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store"; // Conectado ao Zustand

const NAV_LINKS = [
  { name: "Coleção", href: "/categoria/colecao" },
  { name: "Lingerie", href: "/categoria/lingerie" },
  { name: "Fitness", href: "/categoria/fitness" },
  { name: "Best Sellers", href: "/categoria/best-sellers" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Hooks do Next.js e Zustand
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { items, openCart } = useCartStore(); // Pegando itens e função de abrir

  // Verifica se estamos na página inicial
  const isHome = pathname === "/";

  // Fecha o menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Bloqueia scroll quando menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  // Monitora o scroll para mudar a cor do header
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = isScrolled;
    const current = latest > 50;
    if (previous !== current) {
      setIsScrolled(current);
    }
  });

  // LÓGICA DE ESTILO INTELIGENTE:
  // O Header deve ser "Sólido" (Texto Escuro) se:
  // 1. O usuário rolou a página.
  // 2. O menu mobile está aberto.
  // 3. NÃO estamos na Home (Páginas de produto/categoria têm fundo branco).
  const isSolidHeader = isScrolled || isMobileMenuOpen || !isHome;

  const textColorClass = isSolidHeader ? "text-brand-dark" : "text-brand-white";
  
  // Definição do Background
  const bgClass = isMobileMenuOpen 
    ? "bg-transparent" // No mobile open, transparente para não conflitar com overlay branco
    : isSolidHeader 
      ? "bg-brand-white/90 backdrop-blur-md shadow-sm py-3" 
      : "bg-transparent py-4 md:py-5";

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-6",
          bgClass
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex items-center justify-between">
          
          {/* --- BOTÃO MENU MOBILE (ESQUERDA) --- */}
          <div className="flex items-center md:hidden z-50">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn("p-2 -ml-2 transition-colors", textColorClass)}
              aria-label="Alternar menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* --- LOGO --- */}
          <Link href="/" className="flex-shrink-0 z-50">
            <h1 className={cn(
              "font-serif font-medium tracking-widest uppercase transition-colors text-center md:text-left",
              "text-xl sm:text-2xl md:text-3xl", 
              textColorClass
            )}>
              Mundo Femme
            </h1>
          </Link>

          {/* --- NAVEGAÇÃO DESKTOP --- */}
          <nav className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-sans font-medium tracking-wide transition-colors",
                  // Lógica de hover dependendo do fundo
                  !isSolidHeader 
                    ? "text-gray-200 hover:text-brand-white" 
                    : "text-gray-600 hover:text-brand-pink"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* --- ÍCONES (DIREITA) --- */}
          <div className={cn("flex items-center gap-3 md:gap-5 z-50", isMobileMenuOpen ? "text-brand-dark" : "")}>
            <button aria-label="Buscar">
              <Search className={cn("w-5 h-5 transition-colors", textColorClass)} />
            </button>
            
            <button aria-label="Minha Conta" className="hidden sm:block">
              <User className={cn("w-5 h-5 transition-colors", textColorClass)} />
            </button>

            {/* BOTÃO DO CARRINHO (Abre Drawer + Contador) */}
            <button 
              aria-label="Carrinho" 
              className="relative group pl-2"
              onClick={openCart}
            >
              <ShoppingBag className={cn("w-5 h-5 transition-colors", textColorClass)} />
              
              {/* Badge condicional */}
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-pink text-[9px] font-bold text-white animate-fade-in">
                  {items.length}
                </span>
              )}
            </button>
          </div>

        </div>
      </motion.header>

      {/* --- OVERLAY MENU MOBILE --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-white flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif text-3xl text-brand-dark hover:text-brand-pink transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-8 border-t border-gray-100 w-full flex flex-col items-center gap-4"
              >
                <Link href="/conta" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-500 font-sans">
                  <User size={20} /> Minha Conta
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}