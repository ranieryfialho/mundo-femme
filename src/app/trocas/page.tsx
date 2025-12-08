import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import { RefreshCw, ShieldCheck, Clock } from "lucide-react";

export default function ExchangesPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-brand-offwhite">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        
        <div className="mb-10">
          <CustomBreadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Trocas e Devoluções" }
            ]} 
          />
        </div>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-gray-100">
          <h1 className="font-serif text-3xl md:text-4xl text-brand-dark mb-8 text-center">
            Política de Trocas
          </h1>

          {/* Destaques Rápidos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 border-b border-gray-100 pb-8">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-brand-offwhite rounded-full flex items-center justify-center mx-auto text-brand-pink">
                <Clock size={24} />
              </div>
              <p className="font-bold text-brand-dark text-sm">7 Dias</p>
              <p className="text-xs text-gray-500">Para desistência ou arrependimento</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-brand-offwhite rounded-full flex items-center justify-center mx-auto text-brand-pink">
                <RefreshCw size={24} />
              </div>
              <p className="font-bold text-brand-dark text-sm">30 Dias</p>
              <p className="text-xs text-gray-500">Para troca por defeito ou tamanho</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-brand-offwhite rounded-full flex items-center justify-center mx-auto text-brand-pink">
                <ShieldCheck size={24} />
              </div>
              <p className="font-bold text-brand-dark text-sm">1ª Troca Grátis</p>
              <p className="text-xs text-gray-500">O frete de envio é por nossa conta</p>
            </div>
          </div>

          <div className="space-y-8 font-sans text-gray-600 leading-relaxed text-sm md:text-base">
            <section>
              <h3 className="font-serif text-xl text-brand-dark mb-3">Como solicitar uma troca?</h3>
              <p>
                Envie um e-mail para <strong>trocas@mundofemme.com.br</strong> informando o número do seu pedido e o motivo da troca. Nossa equipe retornará em até 48 horas úteis com o código de postagem reversa.
              </p>
            </section>

            <section>
              <h3 className="font-serif text-xl text-brand-dark mb-3">Condições das Peças</h3>
              <p>
                Para que a troca seja aceita, as peças devem estar:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Com as etiquetas e lacres intactos;</li>
                <li>Na embalagem original;</li>
                <li>Sem indícios de uso, lavagem ou odores;</li>
                <li>Sem alterações feitas pelo cliente (ex: ajustes de bainha).</li>
              </ul>
              <p className="mt-3 text-red-400 text-xs font-bold uppercase tracking-wider">
                * Peças íntimas (calcinhas) só podem ser trocadas em caso de defeito de fabricação, por questões de higiene.
              </p>
            </section>

            <section>
              <h3 className="font-serif text-xl text-brand-dark mb-3">Reembolso</h3>
              <p>
                Caso prefira a devolução do valor, o estorno será feito na mesma forma de pagamento utilizada na compra, após o recebimento e análise da peça em nosso centro de distribuição.
              </p>
            </section>
          </div>
        </div>

      </div>
    </main>
  );
}