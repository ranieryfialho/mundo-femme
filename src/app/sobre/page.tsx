import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        <div className="mb-10">
          <CustomBreadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Sobre a Marca" }
            ]} 
          />
        </div>

        <article className="space-y-12">
          <div className="text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl text-brand-dark leading-tight">
              A Essência do <br /> <span className="italic">Mundo Femme</span>
            </h1>
            <p className="font-sans text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Mais do que moda, um movimento de liberdade, conforto e sofisticação para mulheres que sabem o que querem.
            </p>
          </div>

          <div className="relative w-full aspect-[21/9] bg-gray-100 overflow-hidden rounded-sm">
            <Image 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
              alt="Atelier Mundo Femme" 
              fill
              className="object-cover opacity-90"
            />
          </div>

          <div className="prose prose-neutral prose-lg mx-auto font-sans text-gray-600">
            <p>
              O Mundo Femme nasceu de um desejo simples: criar peças que unissem a delicadeza da lingerie clássica com a tecnologia e o conforto necessários para o dia a dia da mulher moderna.
            </p>
            <p>
              Acreditamos que a roupa íntima é a primeira camada de confiança que vestimos. Por isso, nossa curadoria é meticulosa, priorizando tecidos respiráveis, rendas de toque suave e modelagens que valorizam a diversidade dos corpos brasileiros.
            </p>
            <h3 className="font-serif text-brand-dark mt-8 mb-4 text-2xl">Nosso Compromisso</h3>
            <p>
              Qualidade não é negociável. Cada peça passa por um rigoroso controle para garantir que você receba não apenas um produto, mas uma experiência de autocuidado.
            </p>
          </div>
        </article>

      </div>
    </main>
  );
}