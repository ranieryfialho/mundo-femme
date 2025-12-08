"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/types/nuvemshop";
import { motion } from "framer-motion";

interface ProductGalleryProps {
  images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]?.src || "");

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Lista de Miniaturas (Thumbnails) */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => setSelectedImage(img.src)}
            className={cn(
              "relative w-20 h-24 flex-shrink-0 border transition-all overflow-hidden",
              selectedImage === img.src 
                ? "border-brand-dark ring-1 ring-brand-dark" 
                : "border-transparent hover:border-gray-200"
            )}
          >
            <Image
              src={img.src}
              alt={`Vista ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Imagem Principal */}
      <div className="relative flex-1 aspect-[3/4] bg-gray-50 overflow-hidden">
        <motion.div
          key={selectedImage} // Chave muda = animação reinicia
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src={selectedImage}
            alt="Produto principal"
            fill
            className="object-cover"
            priority // Carrega rápido para LCP
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </div>
  );
}