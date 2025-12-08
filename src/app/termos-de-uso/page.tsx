import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        
        <div className="mb-10">
          <CustomBreadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Termos de Uso" }
            ]} 
          />
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-brand-dark mb-8">
          Termos de Uso
        </h1>

        <div className="prose prose-neutral max-w-none font-sans text-gray-600 text-sm md:text-base leading-relaxed">
          <h3>1. Termos</h3>
          <p>Ao acessar ao site Mundo Femme, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site.</p>
          
          <h3>2. Uso de Licença</h3>
          <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Mundo Femme , apenas para visualização transitória pessoal e não comercial.</p>
          
          <h3>3. Isenção de responsabilidade</h3>
          <p>Os materiais no site da Mundo Femme são fornecidos 'como estão'. Mundo Femme não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>
          
          <h3>4. Limitações</h3>
          <p>Em nenhum caso o Mundo Femme ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Mundo Femme.</p>
          
          <p className="mt-8 text-xs text-gray-400">Última atualização: Dezembro de 2025.</p>
        </div>

      </div>
    </main>
  );
}