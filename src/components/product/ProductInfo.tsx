"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/nuvemshop";
import { formatPrice } from "@/lib/nuvemshop";
import { Button } from "@/components/ui/button";
import { Truck, ShieldCheck, Ruler } from "lucide-react";
import { useCartStore } from "@/lib/store";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  // SELEÇÃO SEGURA: Se variants for undefined ou vazio, usa null. Se tiver, pega o primeiro.
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    product?.variants?.length > 0 ? product.variants[0].id : null
  );

  const addItem = useCartStore((state) => state.addItem);

  // --- LÓGICA DE PREÇO ULTRA SEGURA ---
  // Encontra a variante selecionada ou usa a primeira como fallback
  const selectedVariant = product?.variants?.find(v => v.id === selectedVariantId) || product?.variants?.[0];
  
  // Tenta pegar o preço em ordem de prioridade. Se tudo falhar, usa "0".
  const rawPrice = selectedVariant?.price 
    || product?.promotional_price 
    || product?.price 
    || "0";

  // Limpa o preço (troca vírgula por ponto) e converte. Se der erro, vira 0.
  const priceString = String(rawPrice).replace(',', '.');
  const finalPrice = isNaN(Number(priceString)) ? 0 : Number(priceString);

  // --- LÓGICA DE EXIBIÇÃO DE TAMANHO ---
  const hasMultipleVariants = product?.variants?.length > 1;

  // Função para descobrir o nome da variante (mesmo que a API mande dados estranhos)
  const getVariantLabel = (variant: any, index: number) => {
    if (variant?.values && variant.values.length > 0 && variant.values[0].pt) {
      return variant.values.map((v: any) => v.pt).join(" / ");
    }
    return `Opção ${index + 1}`;
  };

  const handleAddToCart = () => {
    const variantIdToAdd = selectedVariantId || product?.variants?.[0]?.id;
    if (!variantIdToAdd) return;

    const variantObj = product.variants.find(v => v.id === variantIdToAdd);
    const sizeName = variantObj ? getVariantLabel(variantObj, 0) : "Padrão";

    addItem(product, sizeName, variantIdToAdd);
  };

  return (
    <div className="space-y-8 sticky top-24">
      <div className="space-y-2">
        <h1 className="font-serif text-4xl md:text-5xl text-brand-dark font-light">
          {product.name.pt}
        </h1>
        <div className="flex items-center gap-4">
          <p className="font-sans text-2xl font-medium text-brand-dark">
            {/* Proteção final: Se for 0 e não for promocional, mostra "Sob Consulta" ou o valor formatado */}
            {finalPrice > 0 ? formatPrice(finalPrice) : "R$ 0,00"}
          </p>
        </div>
      </div>

      <div 
        className="prose prose-sm text-gray-600 font-sans leading-relaxed"
        dangerouslySetInnerHTML={{ __html: product.description.pt }} 
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold uppercase tracking-wide">
            {hasMultipleVariants ? "Escolha a Opção:" : "Opção Selecionada:"}
          </span>
          {hasMultipleVariants && (
            <button className="text-xs underline text-gray-500 flex items-center gap-1">
              <Ruler size={14} /> Guia de Medidas
            </button>
          )}
        </div>

        {/* SE TIVER VÁRIOS, MOSTRA BOTÕES. SE TIVER UM SÓ, MOSTRA TEXTO FIXO. */}
        {hasMultipleVariants ? (
          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant, index) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariantId(variant.id)}
                className={`min-w-[3rem] px-4 h-12 flex items-center justify-center border text-sm transition-all uppercase font-medium ${
                  selectedVariantId === variant.id
                    ? "border-brand-dark bg-brand-dark text-white"
                    : "border-gray-200 text-gray-900 hover:border-brand-dark"
                }`}
              >
                {getVariantLabel(variant, index)}
              </button>
            ))}
          </div>
        ) : (
          // Fallback visual para produto de variante única
          <div className="p-3 border border-gray-100 bg-gray-50 text-gray-600 text-sm inline-block rounded-sm">
            {product.variants?.[0] ? getVariantLabel(product.variants[0], 0) : "Tamanho Único"}
          </div>
        )}
      </div>

      <div className="pt-4">
        <Button 
          onClick={handleAddToCart}
          // Removemos o disabled para garantir que sempre dê para clicar se tiver ao menos 1 variante
          className="w-full h-14 bg-brand-pink hover:bg-brand-pink/90 text-white text-base font-semibold tracking-widest uppercase rounded-none transition-transform active:scale-[0.99]"
        >
          Adicionar à Sacola
        </Button>
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
    </div>
  );
}