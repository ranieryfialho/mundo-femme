import { getProducts } from "@/lib/nuvemshop";
import { ProductCard } from "@/components/product/ProductCard";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import { FilterBar } from "@/components/catalog/FilterBar";

interface ShopPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  let products = await getProducts();
  const resolvedSearchParams = await Promise.resolve(searchParams);
  
  // 1. Filtro de Tamanho
  const sizeFilter = resolvedSearchParams.size as string;
  if (sizeFilter) {
    products = products.filter(product => 
      product.variants.some(variant => 
        variant.values?.some(val => val.pt === sizeFilter)
      )
    );
  }

  // 2. Ordenação
  const sort = resolvedSearchParams.sort as string;
  if (sort) {
    products.sort((a, b) => {
      const priceA = parseFloat(a.promotional_price || a.variants[0]?.price || a.price);
      const priceB = parseFloat(b.promotional_price || b.variants[0]?.price || b.price);

      switch (sort) {
        case 'price_asc': return priceA - priceB;
        case 'price_desc': return priceB - priceA;
        case 'name_asc': return a.name.pt.localeCompare(b.name.pt);
        case 'newest': return b.id - a.id;
        default: return 0;
      }
    });
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Cabeçalho da Página */}
        <div className="mb-8">
          <CustomBreadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Loja Completa" }
            ]} 
          />
          <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mt-4 mb-2">
            Loja Completa
          </h1>
          <p className="font-sans text-gray-500 font-light text-sm">
            {products.length} peças encontradas
          </p>
        </div>

        {/* Barra de Filtros (Reutilizada) */}
        <FilterBar />

        {/* Grid de Produtos */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center space-y-4 border-t border-gray-100">
            <h3 className="font-serif text-2xl text-gray-400">
              Nenhum produto encontrado.
            </h3>
            <p className="font-sans text-gray-500">
              Tente limpar os filtros para ver mais opções.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}