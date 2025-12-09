"use client";

import { useState } from "react";
import { Product, ProductVariant } from "@/types/nuvemshop";
import { formatPrice } from "@/lib/nuvemshop";
import { Button } from "@/components/ui/button";
import { Truck, ShieldCheck, Ruler, Heart } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useWishlistStore } from "@/lib/wishlist";
import { cn } from "@/lib/utils";
import { SizeGuideModal } from "./SizeGuideModal";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { hasItem, toggleItem } = useWishlistStore();
  const isWishlisted = hasItem(product.id);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Encontra a primeira variante que tenha estoque para ser a padrão
  // Se stock for null, considera infinito (tem estoque). Se for número, checa se > 0.
  const firstInStockVariant = product.variants.find(v => v.stock === null || v.stock > 0);
  
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    firstInStockVariant ? firstInStockVariant.id : product.variants[0]?.id
  );

  const addItem = useCartStore((state) => state.addItem);

  const selectedVariant = product?.variants?.find(v => v.id === selectedVariantId) || product?.variants?.[0];
  
  // Lógica de Preço
  const rawPrice = selectedVariant?.price || product?.promotional_price || product?.price || "0";
  const priceString = String(rawPrice).replace(',', '.');
  const finalPrice = isNaN(Number(priceString)) ? 0 : Number(priceString);

  // Lógica de Estoque da Variante Selecionada
  const hasStock = selectedVariant?.stock === null || (selectedVariant?.stock !== undefined && selectedVariant.stock > 0);

  const hasMultipleVariants = product?.variants?.length > 1;

  const getVariantLabel = (variant: any, index: number) => {
    if (variant?.values && variant.values.length > 0 && variant.values[0].pt) {
      return variant.values.map((v: any) => v.pt).join(" / ");
    }
    return `Opção ${index + 1}`;
  };

  const handleAddToCart = () => {
    if (!hasStock) return; // Proteção extra

    const variantIdToAdd = selectedVariantId || product?.variants?.[0]?.id;
    if (!variantIdToAdd) return;

    const variantObj = product.variants.find(v => v.id === variantIdToAdd);
    const sizeName = variantObj ? getVariantLabel(variantObj, 0) : "Padrão";

    addItem(product, sizeName, variantIdToAdd);
  };

  // Função auxiliar para checar estoque de uma variante específica durante o map
  const checkVariantStock = (variant: ProductVariant) => {
    return variant.stock === null || variant.stock > 0;
  };

  return (
    <div className="space-y-8 sticky top-24">
      
      <div className="space-y-2">
        <h1 className="font-serif text-4xl md:text-5xl text-brand-dark font-light">
          {product.name.pt}
        </h1>
        <div className="flex items-center gap-4">
          <p className="font-sans text-2xl font-medium text-brand-dark">
            {finalPrice > 0 ? formatPrice(finalPrice) : "R$ 0,00"}
          </p>
        </div>
      </div>

      <div 
        className="prose prose-sm text-gray-600 font-sans leading-relaxed line-clamp-3"
        dangerouslySetInnerHTML={{ __html: product.description.pt }} 
      />

      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <span className="text-sm font-semibold uppercase tracking-wide">
            {hasMultipleVariants ? "Escolha a Opção:" : "Opção Selecionada:"}
          </span>
          
          <button 
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-xs underline text-gray-500 flex items-center gap-1 hover:text-brand-pink transition-colors cursor-pointer"
          >
            <Ruler size={14} /> Guia de Medidas
          </button>
        </div>

        {hasMultipleVariants ? (
          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant, index) => {
              const inStock = checkVariantStock(variant);
              return (
                <button
                  key={variant.id}
                  onClick={() => inStock && setSelectedVariantId(variant.id)}
                  disabled={!inStock}
                  className={cn(
                    "min-w-[3rem] px-4 h-12 flex items-center justify-center border text-sm transition-all uppercase font-medium relative overflow-hidden",
                    selectedVariantId === variant.id
                      ? "border-brand-dark bg-brand-dark text-white"
                      : "border-gray-200 text-gray-900",
                    !inStock && "opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-100 hover:border-gray-100"
                  )}
                >
                  {getVariantLabel(variant, index)}
                  {/* Linha diagonal para indicar visualmente sem estoque */}
                  {!inStock && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[120%] h-[1px] bg-gray-400 rotate-45 transform origin-center"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-3 border border-gray-100 bg-gray-50 text-gray-600 text-sm inline-block rounded-sm">
            {product.variants?.[0] ? getVariantLabel(product.variants[0], 0) : "Tamanho Único"}
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <Button 
          onClick={handleAddToCart}
          disabled={!hasStock}
          className={cn(
            "flex-1 h-14 text-base font-semibold tracking-widest uppercase rounded-none transition-transform active:scale-[0.99]",
            hasStock 
              ? "bg-brand-pink hover:bg-brand-pink/90 text-white" 
              : "bg-gray-200 text-gray-400 hover:bg-gray-200 cursor-not-allowed"
          )}
        >
          {hasStock ? "Adicionar à Sacola" : "Produto Esgotado"}
        </Button>

        <button 
          onClick={() => toggleItem(product)}
          className={cn(
            "h-14 w-14 flex items-center justify-center border transition-colors",
            isWishlisted 
              ? "border-brand-pink bg-brand-pink/10 text-brand-pink" 
              : "border-gray-200 text-gray-400 hover:border-brand-dark hover:text-brand-dark"
          )}
          aria-label="Adicionar aos favoritos"
        >
          <Heart size={24} className={cn(isWishlisted && "fill-current")} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3 text-gray-600">
          <Truck className="w-5 h-5 text-brand-pink" />
          <span className="text-xs font-medium">Frete Grátis acima de R$299</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <ShieldCheck className="w-5 h-5 text-brand-pink" />
          <span className="text-xs font-medium">Garantia de 30 dias</span>
        </div>
      </div>

      <SizeGuideModal 
        isOpen={isSizeGuideOpen} 
        onClose={() => setIsSizeGuideOpen(false)} 
      />

    </div>
  );
}