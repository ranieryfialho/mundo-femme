import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import { Truck, Clock, MapPin, Box } from "lucide-react";

export default function ShippingPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        <div className="mb-10">
          <CustomBreadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Envio e Entregas" }
            ]} 
          />
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-brand-dark mb-12 text-center">
          Política de Envio e Entregas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card Frete Grátis */}
          <div className="bg-brand-offwhite p-8 rounded-lg border border-gray-100 flex items-start gap-4">
            <div className="bg-white p-3 rounded-full text-brand-pink shadow-sm">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-serif text-xl text-brand-dark mb-2">Frete Grátis</h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                Oferecemos frete gratuito para todo o Brasil em compras acima de <strong>R$ 299,00</strong>. O desconto é aplicado automaticamente no carrinho.
              </p>
            </div>
          </div>

          {/* Card Prazo */}
          <div className="bg-brand-offwhite p-8 rounded-lg border border-gray-100 flex items-start gap-4">
            <div className="bg-white p-3 rounded-full text-brand-pink shadow-sm">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="font-serif text-xl text-brand-dark mb-2">Prazo de Envio</h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                Seu pedido é preparado com carinho e despachado em até <strong>2 dias úteis</strong> após a confirmação do pagamento.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12 font-sans text-gray-600 leading-relaxed">
          
          <section className="border-b border-gray-100 pb-8">
            <h3 className="font-serif text-2xl text-brand-dark mb-4 flex items-center gap-3">
              <Box size={24} className="text-brand-pink" /> Formas de Envio
            </h3>
            <p>
              Trabalhamos com os Correios (PAC e SEDEX) e transportadoras parceiras para garantir que seu pedido chegue rápido e seguro. O prazo de entrega varia de acordo com o seu CEP e a modalidade escolhida no momento da compra.
            </p>
            <p className="mt-4 text-sm bg-gray-50 p-4 rounded-md border-l-4 border-brand-pink">
              <strong>Nota:</strong> Em períodos de alta demanda (como Black Friday e Natal), o prazo de postagem pode se estender em até 2 dias úteis.
            </p>
          </section>

          <section className="border-b border-gray-100 pb-8">
            <h3 className="font-serif text-2xl text-brand-dark mb-4 flex items-center gap-3">
              <MapPin size={24} className="text-brand-pink" /> Rastreamento
            </h3>
            <p>
              Assim que seu pedido for enviado, você receberá um e-mail com o código de rastreamento. Você também pode acompanhar o status diretamente na sua área de <strong>Meus Pedidos</strong> aqui no site.
            </p>
          </section>

          <section>
            <h3 className="font-serif text-2xl text-brand-dark mb-4">Problemas na Entrega?</h3>
            <p className="mb-4">
              Caso ocorra algum imprevisto (atraso excessivo, extravio ou embalagem violada), entre em contato imediatamente com nosso suporte.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Verifique se o endereço cadastrado está correto.</li>
              <li>Certifique-se de que haverá alguém no local para receber.</li>
              <li>Se a embalagem estiver aberta ou avariada, recuse o recebimento.</li>
            </ul>
          </section>

        </div>

      </div>
    </main>
  );
}