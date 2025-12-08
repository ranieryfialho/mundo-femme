import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  {
    id: 1,
    title: "Lingerie",
    image: "https://images.unsplash.com/photo-1546220304-4b478332d75d?q=80&w=1500&auto=format&fit=crop",
    link: "/categoria/lingerie"
  },
  {
    id: 2,
    title: "Coleção Nova",
    image: "https://images.unsplash.com/photo-1596483424683-9bb6fa69c0d9?q=80&w=2070&auto=format&fit=crop",
    link: "/categoria/colecao"
  },
  {
    id: 3,
    title: "Fitness",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070&auto=format&fit=crop",
    link: "/categoria/fitness"
  }
];

export function CategoryGrid() {
  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-3">
            Nossas Categorias
          </h2>
          <p className="text-gray-500 font-sans text-sm tracking-wide uppercase">
            Explore por estilo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={cat.link} className="group relative block aspect-[3/4] overflow-hidden bg-gray-100">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <h3 className="text-white font-serif text-2xl mb-4 drop-shadow-md">
                  {cat.title}
                </h3>
                <Button className="bg-white text-brand-dark hover:bg-brand-pink hover:text-white rounded-none uppercase tracking-widest text-xs px-8 py-6 transition-colors">
                  Ver Agora
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}