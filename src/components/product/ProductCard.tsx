"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/nuvemshop";
import { formatPrice } from "@/lib/nuvemshop";
import { ShoppingBag, Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/wishlist";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { hasItem, toggleItem } = useWishlistStore();
  const isWishlisted = hasItem(product.id);

  // Imagens e Preços
  const mainImage = product.images[0]?.src || "/placeholder.jpg";
  const hoverImage = product.images[1]?.src || mainImage;
  const price = product.promotional_price || product.variants[0]?.price || product.price;

  return (
    <div className="group block space-y-3 relative">
      {/* Container da Imagem */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        
        <Link href={`/produto/${product.handle.pt}`} className="block w-full h-full">
          <Image
            src={mainImage}
            alt={product.name.pt}
            fill
            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Image
            src={hoverImage}
            alt={product.name.pt}
            fill
            className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </Link>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleItem(product);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm z-20 hover:scale-110 transition-all"
          aria-label="Adicionar aos favoritos"
        >
          <Heart 
            size={18} 
            className={cn(
              "transition-colors duration-300", 
              isWishlisted ? "fill-brand-pink text-brand-pink" : "text-gray-400 hover:text-brand-pink"
            )} 
          />
        </button>

        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-20">
          <button className="bg-white p-3 text-brand-dark shadow-md hover:bg-brand-pink hover:text-white transition-colors rounded-full">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      {/* Informações */}
      <Link href={`/produto/${product.handle.pt}`} className="block text-center space-y-1">
        <h3 className="font-sans text-sm text-gray-900 group-hover:text-brand-pink transition-colors line-clamp-1">
          {product.name.pt}
        </h3>
        <p className="font-serif text-lg font-medium text-gray-900">
          {formatPrice(price)}
        </p>
      </Link>
    </div>
  );
}