import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FeaturedBanner() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] bg-gray-100 overflow-hidden flex items-center">
      <div className="absolute inset-0 flex">
        <div className="w-full md:w-1/2 bg-[#EAEAEA] relative hidden md:block">
        </div>
        <div className="w-full md:w-1/2 relative h-full">
          <Image
            src="https://images.unsplash.com/photo-1616248249518-ea16b2580238?q=80&w=2070&auto=format&fit=crop"
            alt="Best Minimal Collection"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative container mx-auto px-6 md:px-12 h-full flex items-center">
        <div className="max-w-lg md:ml-12 p-8 md:p-0 text-center md:text-left bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-lg md:rounded-none">
          <span className="text-brand-pink font-sans font-bold tracking-widest uppercase text-xs mb-4 block">
            Destaque da Semana
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-brand-dark mb-6 leading-tight">
            Coleção Minimal <br />
            <span className="italic">Essence</span>
          </h2>
          <p className="text-gray-600 font-sans mb-8 leading-relaxed">
            Peças atemporais criadas com tecidos premium para quem busca elegância sem esforço. Descubra a sofisticação na simplicidade.
          </p>
          <Link href="/categoria/colecao">
            <Button className="bg-brand-dark text-white hover:bg-brand-pink rounded-none uppercase tracking-[0.2em] px-10 py-7 text-xs">
              Comprar Agora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}