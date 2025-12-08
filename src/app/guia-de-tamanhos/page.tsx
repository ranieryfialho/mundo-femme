import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import { SizeGuideContent } from "@/components/product/SizeGuideContent";

export default function SizeGuidePage() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        
        <div className="mb-10">
          <CustomBreadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Ajuda", href: "#" },
              { label: "Guia de Tamanhos" }
            ]} 
          />
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-brand-dark mb-8 text-center">
          Guia de Medidas
        </h1>
        
        <p className="text-center text-gray-500 mb-12 max-w-lg mx-auto font-sans">
          Encontre o caimento perfeito para você. Use nossa tabela de referência para escolher suas peças com segurança.
        </p>

        <div className="border border-gray-100 rounded-xl p-6 md:p-10 shadow-sm">
          <SizeGuideContent />
        </div>

      </div>
    </main>
  );
}