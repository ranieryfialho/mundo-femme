"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Search, Loader2, ArrowRight, ImageOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types/nuvemshop";
import { formatPrice } from "@/lib/nuvemshop";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    async function fetchResults() {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        if (!res.ok) throw new Error("Erro na busca");
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-brand-white/95 backdrop-blur-md flex flex-col"
        >
          <div className="container mx-auto px-6 py-8 flex items-center justify-between">
            <h2 className="font-serif text-2xl text-brand-dark hidden md:block">Buscar</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-auto"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="container mx-auto px-6">
            <div className="relative max-w-3xl mx-auto">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="O que você procura?"
                className="w-full text-3xl md:text-5xl font-serif text-brand-dark bg-transparent border-b border-gray-200 py-4 focus:outline-none focus:border-brand-pink placeholder:text-gray-300 transition-colors"
                autoFocus
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
                {isLoading ? <Loader2 className="animate-spin w-8 h-8" /> : <Search className="w-8 h-8" />}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto mt-12 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/produto/${product.handle.pt}`}
                      onClick={onClose}
                      className="flex gap-4 p-4 hover:bg-white hover:shadow-sm transition-all rounded-lg group"
                    >
                      {/* Lógica de Imagem Segura */}
                      <div className="relative w-20 h-24 bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-300">
                        {product.images[0]?.src ? (
                          <Image
                            src={product.images[0].src}
                            alt={product.name.pt}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <ImageOff size={24} />
                        )}
                      </div>
                      
                      <div className="flex flex-col justify-center">
                        <h4 className="font-serif text-lg text-brand-dark group-hover:text-brand-pink transition-colors line-clamp-2">
                          {product.name.pt}
                        </h4>
                        <p className="text-sm font-sans text-gray-500">
                          {formatPrice(product.promotional_price || product.variants[0]?.price || product.price)}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="text-brand-pink" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : query.length > 2 && !isLoading ? (
                <div className="text-center text-gray-400 mt-10">
                  <p>Nenhum resultado encontrado para "{query}"</p>
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}