import { getProductsByCategory } from "@/lib/nuvemshop";
import { ProductCard } from "@/components/product/ProductCard";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

function formatTitle(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const products = await getProductsByCategory(resolvedParams.slug);
  const title = formatTitle(resolvedParams.slug);

  return (
    <main className="min-h-screen pt-24 pb-16 bg-brand-offwhite">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="mb-12 space-y-6">
          <CustomBreadcrumb 
            items={[
              { label: "Categoria" },
              { label: title }
            ]} 
          />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-8">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-2">
                {title}
              </h1>
              <p className="font-sans text-gray-500 font-light">
                {products.length} {products.length === 1 ? "produto encontrado" : "produtos encontrados"}
              </p>
            </div>
            
            <div className="hidden md:block">
            </div>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center space-y-4">
            <h3 className="font-serif text-2xl text-gray-400">
              Nenhum produto encontrado nesta categoria.
            </h3>
            <p className="font-sans text-gray-500">
              Estamos atualizando nosso estoque de {title}.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}