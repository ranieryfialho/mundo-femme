import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const POSTS = [
  {
    id: 1,
    title: "Tendências de Lingerie para 2025",
    excerpt: "Descubra as cores e cortes que vão dominar a próxima estação.",
    image: "https://images.unsplash.com/photo-1560506840-e5f81b69451c?q=80&w=1500&auto=format&fit=crop",
    date: "12 AGO 2025"
  },
  {
    id: 2,
    title: "Como cuidar das suas peças delicadas",
    excerpt: "Guia completo de lavagem e conservação para maior durabilidade.",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1470&auto=format&fit=crop",
    date: "05 AGO 2025"
  },
  {
    id: 3,
    title: "O conforto encontra a sensualidade",
    excerpt: "Por que você não precisa abrir mão de um para ter o outro.",
    image: "https://images.unsplash.com/photo-1615233500570-c5d63b0647e3?q=80&w=1374&auto=format&fit=crop",
    date: "28 JUL 2025"
  }
];

export function BlogGrid() {
  return (
    <section className="py-24 bg-brand-offwhite">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-3">
            Do Nosso Blog
          </h2>
          <p className="text-gray-500 font-sans text-sm tracking-wide">
            Dicas, tendências e inspirações.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <article key={post.id} className="group bg-white cursor-pointer hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <span className="text-xs font-bold text-brand-pink uppercase tracking-widest mb-3 block">
                  {post.date}
                </span>
                <h3 className="font-serif text-xl text-brand-dark mb-4 group-hover:text-brand-pink transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 font-sans text-sm mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-xs font-bold text-brand-dark uppercase tracking-widest group-hover:gap-2 transition-all">
                  Ler Mais <ArrowRight size={14} className="ml-2" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}