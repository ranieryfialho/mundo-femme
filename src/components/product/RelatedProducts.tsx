import { getProductsByCategory } from "@/lib/nuvemshop";
import { ProductCard } from "@/components/product/ProductCard";

interface RelatedProductsProps {
  categoryHandle?: string;
  currentProductId: number;
}

export async function RelatedProducts({ categoryHandle, currentProductId }: RelatedProductsProps) {
  if (!categoryHandle) return null;

  const products = await getProductsByCategory(categoryHandle);

  const related = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="py-24 border-t border-gray-100 mt-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12 space-y-2">
          <h3 className="font-serif text-3xl text-brand-dark">
            Você também pode gostar
          </h3>
          <p className="font-sans text-gray-500 text-sm">
            Complete seu look com estas escolhas
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {related.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}