"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/nuvemshop";
import { formatPrice } from "@/lib/nuvemshop";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Pega a imagem principal e a secundária (para o hover)
  const mainImage = product.images[0]?.src || "/placeholder.jpg";
  const hoverImage = product.images[1]?.src || mainImage;
  
  // Define o preço (usa promocional se existir)
  const price = product.promotional_price || product.variants[0]?.price;

  return (
    <Link href={`/produto/${product.handle.pt}`} className="group block space-y-3">
      {/* Container da Imagem */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {/* Imagem Padrão */}
        <Image
          src={mainImage}
          alt={product.name.pt}
          fill
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Imagem Hover (aparece quando a de cima fica transparente) */}
        <Image
          src={hoverImage}
          alt={product.name.pt}
          fill
          className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Botão Flutuante (Quick Add) */}
        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button className="bg-white p-3 text-brand-dark shadow-md hover:bg-brand-pink hover:text-white transition-colors rounded-full">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      {/* Informações */}
      <div className="text-center space-y-1">
        <h3 className="font-sans text-sm text-gray-900 group-hover:text-brand-pink transition-colors line-clamp-1">
          {product.name.pt}
        </h3>
        <p className="font-serif text-lg font-medium text-gray-900">
          {formatPrice(price)}
        </p>
      </div>
    </Link>
  );
}