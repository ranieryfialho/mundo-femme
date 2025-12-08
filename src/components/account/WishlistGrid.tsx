"use client";

import { useWishlistStore } from "@/lib/wishlist";
import { ProductCard } from "@/components/product/ProductCard";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function WishlistGrid() {
  const { items } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-gray-200 rounded-lg">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-gray-300" />
        </div>
        <h3 className="font-serif text-xl text-brand-dark mb-2">Sua lista está vazia</h3>
        <p className="text-gray-500 font-sans mb-6 max-w-md">
          Salve seus itens favoritos para não perdê-los de vista e comprar quando quiser.
        </p>
        <Link href="/categoria/colecao">
          <Button variant="outline" className="uppercase tracking-widest text-xs">
            Ir para a Loja
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}