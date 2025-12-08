import { notFound } from "next/navigation";
import { getProductByHandle, getProducts } from "@/lib/nuvemshop";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    handle: product.handle.pt,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await Promise.resolve(params); 
  const product = await getProductByHandle(resolvedParams.handle);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="mb-8">
          <CustomBreadcrumb 
            items={[
              { label: "Loja", href: "/" },
              { label: product.name.pt }
            ]} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <ProductGallery images={product.images} />
          <ProductInfo product={product} />
        </div>

        <div className="mt-24 max-w-3xl mx-auto border-t border-gray-100 pt-12">
          <h3 className="font-serif text-3xl mb-8 text-center text-brand-dark">Detalhes do Produto</h3>
          <div 
            className="prose prose-neutral mx-auto font-sans text-gray-600 leading-8"
            dangerouslySetInnerHTML={{ __html: product.description.pt }} 
          />
        </div>

      </div>
    </main>
  );
}