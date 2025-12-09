"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link"; // <--- Importante: Adicionado para funcionar o link

const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1596483424683-9bb6fa69c0d9?q=80&w=2070&auto=format&fit=crop",
    preTitle: "Coleção Intimates",
    title: "Delicadeza & \nConforto",
    subtitle: "Rendas exclusivas e tecidos que abraçam o corpo.",
    buttonText: "Ir para a Loja", // <--- Alterado conforme pedido
    href: "/produtos",            // <--- Rota da nova página de produtos
    position: "center",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070&auto=format&fit=crop",
    preTitle: "Performance",
    title: "Movimento \nLivre",
    subtitle: "Tecnologia e design para seu melhor desempenho.",
    buttonText: "Ver Fitness",
    href: "/categoria/fitness",   // <--- Link específico
    position: "left",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=2070&auto=format&fit=crop",
    preTitle: "New In",
    title: "Verão \n2025",
    subtitle: "Tons terrosos e nude para a nova estação.",
    buttonText: "Descobrir",
    href: "/categoria/colecao",   // <--- Link específico
    position: "right",
  }
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 8000, stopOnInteraction: false })
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      const autoplay = emblaApi.plugins().autoplay;
      if (autoplay) autoplay.reset();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      const autoplay = emblaApi.plugins().autoplay;
      if (autoplay) autoplay.reset();
    }
  }, [emblaApi]);

  return (
    <section className="relative h-screen w-full bg-brand-dark overflow-hidden">
      <div className="h-full w-full" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((slide) => (
            <div className="relative h-full min-w-0 flex-[0_0_100%]" key={slide.id}>
              
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="h-full w-full object-cover brightness-[0.70]"
                />
              </div>

              <div className="relative z-10 container mx-auto h-full flex items-center px-12 md:px-32">
                <div className={`max-w-2xl ${
                  slide.position === "center" ? "mx-auto text-center items-center" : 
                  slide.position === "right" ? "ml-auto text-right items-end" : "text-left items-start"
                } flex flex-col gap-6`}>
                  
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="inline-block text-brand-beige tracking-[0.3em] uppercase text-sm font-semibold font-sans"
                  >
                    {slide.preTitle}
                  </motion.span>

                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="font-serif text-5xl md:text-7xl lg:text-8xl text-brand-white leading-[1.1] font-light whitespace-pre-line"
                  >
                    {slide.title}
                  </motion.h2>

                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-gray-200 text-lg font-sans font-light max-w-lg"
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  >
                    {/* ADICIONADO O LINK AQUI PARA O BOTÃO FUNCIONAR */}
                    <Link href={slide.href}>
                      <Button 
                        className="rounded-none bg-brand-white text-brand-dark hover:bg-brand-pink hover:text-white px-8 py-7 uppercase tracking-widest text-xs font-bold transition-all duration-300"
                      >
                        {slide.buttonText}
                      </Button>
                    </Link>
                  </motion.div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={scrollPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 border border-white/20 text-white hover:bg-white/10 transition-colors rounded-full z-20 hidden md:flex items-center justify-center group"
      >
        <ChevronLeft size={28} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button 
        onClick={scrollNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 border border-white/20 text-white hover:bg-white/10 transition-colors rounded-full z-20 hidden md:flex items-center justify-center group"
      >
        <ChevronRight size={28} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

    </section>
  );
}