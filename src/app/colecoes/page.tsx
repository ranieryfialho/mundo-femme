import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/nuvemshop";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import { ArrowRight } from "lucide-react";

const COLLECTION_IMAGES: Record<string, string> = {
  "invisive": "https://images.unsplash.com/photo-1596483424683-9bb6fa69c0d9?q=80&w=2070&auto=format&fit=crop",
  "verao": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
  // Adicione aqui as imagens das próximas coleções usando o handle
};

const EXCLUDED_HANDLES = ["feminino", "masculino", "infantil"];

export default async function CollectionsPage() {
  const allCategories = await getCategories();

  const collections = allCategories.filter(cat => {
    const isRoot = !cat.parent || cat.parent === null;
        const handle = cat.handle.pt.toLowerCase();
    const isNotExcluded = !EXCLUDED_HANDLES.includes(handle);

    return isRoot && isNotExcluded;
  });

  return (
    <main className="min-h-screen pt-24 pb-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="mb-12">
          <CustomBreadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Coleções" }
            ]} 
          />
          <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mt-6 mb-4">
            Nossas Coleções
          </h1>
          <p className="font-sans text-gray-500 leading-relaxed">
            Descubra nossas linhas exclusivas, pensadas para cada momento do seu dia. Do conforto invisível à elegância da renda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection) => {
            const bgImage = COLLECTION_IMAGES[collection.handle.pt] || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"; 

            return (
              <Link 
                key={collection.id} 
                href={`/categoria/${collection.handle.pt}`}
                className="group relative h-[400px] overflow-hidden rounded-sm block"
              >
                {/* Imagem */}
                <Image
                  src={bgImage}
                  alt={collection.name.pt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                {/* Conteúdo do Card */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <span className="text-white/90 font-sans text-xs uppercase tracking-widest mb-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    Ver Produtos
                  </span>
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-3xl md:text-4xl text-white drop-shadow-md">
                      {collection.name.pt}
                    </h2>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-dark opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 hover:bg-brand-pink hover:text-white">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {collections.length === 0 && (
          <div className="text-center py-24 border border-dashed border-gray-200 rounded-lg bg-brand-offwhite/30 mt-8">
            <div className="max-w-md mx-auto">
              <h3 className="font-serif text-2xl text-brand-dark mb-2">Em breve novas coleções</h3>
              <p className="text-gray-500 font-sans text-sm">
                Estamos preparando novidades exclusivas para você.
              </p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}