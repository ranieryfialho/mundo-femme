import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { FeaturedBanner } from "@/components/sections/FeaturedBanner";
import { BenefitsBar } from "@/components/sections/BenefitsBar";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { getProducts } from "@/lib/nuvemshop";
import { ProductCard } from "@/components/product/ProductCard";

export default async function Home() {
  const allProducts = await getProducts();
  
  // Filtra produtos com a tag "invisive" (com verificação segura)
  const invisiveProducts = allProducts.filter(product => {
    // Verifica se tags existe e é um array
    if (Array.isArray(product.tags)) {
      return product.tags. some(tag => 
        typeof tag === 'string' && tag.toLowerCase().includes('invisive')
      );
    }
    // Verifica se tags é uma string
    if (typeof product.tags === 'string') {
      return product. tags.toLowerCase().includes('invisive');
    }
    return false;
  });

  // Se não houver produtos com a tag, mostra os 8 primeiros
  const displayProducts = invisiveProducts.length > 0 
    ? invisiveProducts.slice(0, 8)
    : allProducts. slice(0, 8);

  return (
    <main className="min-h-screen flex flex-col">
      <HeroCarousel />
      <CategoryGrid />
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-4xl md: text-5xl text-brand-dark">
              Coleção Invisive
            </h2>
            <p className="text-gray-500 font-sans max-w-xl mx-auto">
              Peças que se moldam ao seu corpo com invisibilidade e conforto absoluto. 
            </p>
          </div>

          {displayProducts. length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-brand-offwhite rounded-lg">
              <p className="text-gray-500 font-serif italic">Carregando coleção...</p>
            </div>
          )}
        </div>
      </section>
      <FeaturedBanner />
      <BenefitsBar />
      <BlogGrid />
    </main>
  );
}