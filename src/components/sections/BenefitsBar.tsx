import { Truck, Headset, RefreshCw, CreditCard } from "lucide-react";

const BENEFITS = [
  {
    id: 1,
    icon: Truck,
    title: "Frete Grátis",
    text: "Em compras acima de R$299"
  },
  {
    id: 2,
    icon: Headset,
    title: "Suporte Online",
    text: "Atendimento via WhatsApp"
  },
  {
    id: 3,
    icon: RefreshCw,
    title: "Troca Fácil",
    text: "7 dias para devolução"
  },
  {
    id: 4,
    icon: CreditCard,
    title: "Até 6x Sem Juros",
    text: "Nos cartões de crédito"
  }
];

export function BenefitsBar() {
  return (
    <section className="py-20 border-t border-b border-gray-100 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {BENEFITS.map((item) => (
            <div key={item.id} className="flex flex-col items-center text-center group">
              <div className="mb-6 p-4 rounded-full bg-brand-offwhite text-brand-dark group-hover:bg-brand-pink group-hover:text-white transition-colors duration-300">
                <item.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg text-brand-dark mb-2">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-gray-500">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}