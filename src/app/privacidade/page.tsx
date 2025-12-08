import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        
        <div className="mb-10">
          <CustomBreadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Privacidade" }
            ]} 
          />
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-brand-dark mb-8">
          Política de Privacidade
        </h1>

        <div className="prose prose-neutral max-w-none font-sans text-gray-600 text-sm md:text-base leading-relaxed">
          <p>A sua privacidade é importante para nós. É política do Mundo Femme respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Mundo Femme, e outros sites que possuímos e operamos.</p>
          
          <h3>1. Informações que coletamos</h3>
          <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>
          
          <h3>2. Uso de Dados</h3>
          <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
          
          <h3>3. Compartilhamento</h3>
          <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
          
          <h3>4. Cookies</h3>
          <p>O nosso site usa cookies para melhorar a experiência do usuário. Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</p>
          
          <p className="mt-8 text-xs text-gray-400">Última atualização: Dezembro de 2025.</p>
        </div>

      </div>
    </main>
  );
}