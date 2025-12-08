"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/nuvemshop";
import { X, ShoppingBag, Trash2, Loader2, Lock, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, subtotal } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  // --- FUNÇÃO DE CHECKOUT VIA API ---
  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      // Chama nossa rota interna (route.ts) que cria o carrinho na Nuvemshop
      // usando o payload correto 'line_items'
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        console.log("Sucesso! Redirecionando para:", data.url);
        // Redireciona o usuário para a URL de checkout segura da Nuvemshop
        window.location.href = data.url;
      } else {
        console.error("Erro no retorno da API:", data);
        alert(`Não foi possível iniciar o checkout: ${data.error || "Erro desconhecido"}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      alert("Erro de conexão. Verifique sua internet e tente novamente.");
      setIsLoading(false);
    }
  };

  // Função auxiliar para compra via WhatsApp (Fallback)
  const handleWhatsApp = () => {
    const phone = "5511999999999"; // Substitua pelo seu número real
    const message = items
      .map((i) => `- ${i.quantity}x ${i.name.pt} (${i.selectedSizeName || "Padrão"})`)
      .join("%0A");
    const total = formatPrice(subtotal());
    const url = `https://wa.me/${phone}?text=Olá, quero fechar meu pedido:%0A${message}%0ATotal: ${total}`;
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY (Fundo Escuro) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* GAVETA LATERAL (Drawer) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col border-l border-gray-100"
          >
            
            {/* --- CABEÇALHO --- */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-dark" />
                <h2 className="font-serif text-2xl text-brand-dark">Sua Sacola</h2>
                <span className="text-sm text-gray-400 font-sans ml-2">
                  ({items.length} itens)
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* --- LISTA DE ITENS --- */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                // Estado Vazio
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-sans">Sua sacola está vazia.</p>
                  <Button
                    variant="outline"
                    onClick={closeCart}
                    className="uppercase tracking-widest text-xs"
                  >
                    Continuar Comprando
                  </Button>
                </div>
              ) : (
                // Lista de Produtos
                items.map((item) => (
                  <motion.div
                    layout
                    // Chave composta para diferenciar variantes do mesmo produto
                    key={`${item.id}-${item.selectedVariantId || 'default'}`}
                    className="flex gap-4"
                  >
                    {/* Imagem */}
                    <div className="relative w-20 h-24 bg-gray-50 flex-shrink-0 border border-gray-100">
                      <Image
                        src={item.images[0]?.src || "/placeholder.jpg"}
                        alt={item.name.pt}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Detalhes */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-lg text-brand-dark leading-tight line-clamp-2 pr-2">
                            {item.name.pt}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-300 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        {item.selectedSizeName && (
                          <p className="text-xs text-gray-500 font-sans mt-1">
                            Opção: {item.selectedSizeName}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-sans text-brand-dark px-2 py-1 border border-gray-200">
                          {item.quantity} un.
                        </span>
                        <p className="font-medium text-brand-dark font-sans">
                          {formatPrice(
                            parseFloat(
                              item.promotional_price ||
                                item.variants[0]?.price ||
                                "0"
                            ) * item.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* --- RODAPÉ (Subtotal e Botões) --- */}
            {items.length > 0 && (
              <div className="p-6 bg-brand-offwhite border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between text-brand-dark mb-4">
                  <span className="font-sans text-sm uppercase tracking-wider">
                    Subtotal
                  </span>
                  <span className="font-serif text-2xl">
                    {formatPrice(subtotal())}
                  </span>
                </div>

                <p className="text-xs text-center text-gray-400 font-sans pb-2">
                  Taxas e frete serão calculados no checkout seguro.
                </p>

                {/* Botão Principal: Checkout via API */}
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full h-14 bg-brand-dark hover:bg-brand-pink text-white uppercase tracking-[0.2em] font-bold text-xs rounded-none transition-all flex gap-2 items-center justify-center shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" /> Redirecionando...
                    </>
                  ) : (
                    <>
                      <Lock size={16} className="mr-1" /> Finalizar Compra
                    </>
                  )}
                </Button>

                {/* Botão Secundário: WhatsApp */}
                <Button
                  variant="outline"
                  onClick={handleWhatsApp}
                  className="w-full h-12 border-green-600 text-green-700 hover:bg-green-50 uppercase tracking-widest text-xs font-bold rounded-none flex gap-2"
                >
                  <MessageCircle size={18} /> Comprar pelo WhatsApp
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}