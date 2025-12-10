import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/nuvemshop";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import { ArrowRight } from "lucide-react";

const COLLECTION_IMAGES: Record<string, string> = {
  "colecao": "https://d1a9qnv764bsoo.cloudfront.net/stores/002/359/702/categories/captura-de-tela-de-2025-12-10-13-47-18-4f3123291bee40531b17653871964738-1024-1024.png",
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
          <p className="font-sans text-gray-500 max-w-2xl leading-relaxed">
            Descubra nossas linhas exclusivas, pensadas para cada momento do seu dia.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {collections.map((collection) => {
            const handleKey = collection.handle.pt.toLowerCase();
            
            const bgImage = COLLECTION_IMAGES[handleKey] || 
                            "https://d1a9qnv764bsoo.cloudfront.net/stores/002/359/702/categories/captura-de-tela-de-2025-12-10-13-47-18-4f3123291bee40531b17653871964738-1024-1024.png"; 

            return (
              <Link 
                key={collection.id} 
                href={`/categoria/${collection.handle.pt}`}
                className="group relative h-[400px] w-full overflow-hidden rounded-sm block"
              >
                <Image
                  src={bgImage}
                  alt={collection.name.pt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={true}
                  sizes="100vw"
                />
                
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <span className="text-white/90 font-sans text-xs uppercase tracking-widest mb-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    Ver Produtos
                  </span>
                  <div className="flex items-center justify-between w-full">
                    <h2 className="font-serif text-3xl md:text-5xl text-white drop-shadow-md">
                      {collection.name.pt}
                    </h2>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-dark opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 hover:bg-brand-pink hover:text-white shrink-0 ml-4">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {collections.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center py-24 border border-dashed border-gray-200 rounded-lg bg-brand-offwhite/30 mt-8">
            <h3 className="font-serif text-2xl text-brand-dark mb-2">Em breve novas coleções</h3>
            <p className="text-gray-500 font-sans text-sm">
              Estamos preparando novidades exclusivas para você.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}