"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/lib/wishlist";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/nuvemshop";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function WishlistDrawer() {
  const { items, isOpen, closeWishlist, removeItem } = useWishlistStore();
  const addItemToCart = useCartStore((state) => state.addItem);

  const handleMoveToCart = (product: any) => {
    const variantId = product.variants[0]?.id;
    addItemToCart(product, "Padrão", variantId);
    removeItem(product.id);
    closeWishlist();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Escuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Gaveta Lateral (Esquerda) */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col border-r border-gray-100"
          >
            {/* Cabeçalho */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-brand-pink fill-brand-pink" />
                <h2 className="font-serif text-2xl text-brand-dark">Meus Favoritos</h2>
                <span className="text-sm text-gray-400 font-sans ml-2">({items.length})</span>
              </div>
              <button onClick={closeWishlist} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Lista de Produtos */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
                  <Heart size={48} strokeWidth={1} />
                  <p className="font-sans">Sua lista de desejos está vazia.</p>
                  <Button variant="outline" onClick={closeWishlist} className="uppercase tracking-widest text-xs">
                    Explorar Coleção
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div layout key={item.id} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0">
                    {/* Imagem */}
                    <Link href={`/produto/${item.handle.pt}`} onClick={closeWishlist} className="relative w-20 h-24 bg-gray-50 flex-shrink-0 border border-gray-100 block">
                      <Image
                        src={item.images[0]?.src || "/placeholder.jpg"}
                        alt={item.name.pt}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Detalhes */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link href={`/produto/${item.handle.pt}`} onClick={closeWishlist}>
                            <h3 className="font-serif text-lg text-brand-dark leading-tight line-clamp-2 pr-2 hover:text-brand-pink transition-colors">
                              {item.name.pt}
                            </h3>
                          </Link>
                          <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-sm font-medium text-brand-dark mt-1">
                          {formatPrice(item.promotional_price || item.variants[0]?.price || item.price)}
                        </p>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full mt-2 bg-brand-dark hover:bg-brand-pink text-white text-xs uppercase rounded-none"
                        onClick={() => handleMoveToCart(item)}
                      >
                        <ShoppingBag size={14} className="mr-2" /> Mover para Sacola
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}