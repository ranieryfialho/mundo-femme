"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function SizeGuideContent() {
  const [activeTab, setActiveTab] = useState<"lingerie" | "fitness">("lingerie");

  return (
    <div className="space-y-8">
      
      {/* Abas de Navegação */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab("lingerie")}
          className={cn(
            "flex-1 pb-4 text-sm font-bold uppercase tracking-widest transition-colors",
            activeTab === "lingerie" 
              ? "border-b-2 border-brand-dark text-brand-dark" 
              : "text-gray-400 hover:text-brand-dark"
          )}
        >
          Lingerie
        </button>
        <button
          onClick={() => setActiveTab("fitness")}
          className={cn(
            "flex-1 pb-4 text-sm font-bold uppercase tracking-widest transition-colors",
            activeTab === "fitness" 
              ? "border-b-2 border-brand-dark text-brand-dark" 
              : "text-gray-400 hover:text-brand-dark"
          )}
        >
          Fitness
        </button>
      </div>

      {/* Conteúdo Lingerie */}
      {activeTab === "lingerie" && (
        <div className="space-y-8 animate-fade-in">
          <div>
            <h4 className="font-serif text-lg text-brand-dark mb-4">Tabela de Sutiãs</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-brand-dark uppercase bg-brand-offwhite">
                  <tr>
                    <th className="px-4 py-3">Tamanho</th>
                    <th className="px-4 py-3">Numeração</th>
                    <th className="px-4 py-3">Busto (cm)</th>
                    <th className="px-4 py-3">Tórax (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="px-4 py-3 font-medium">P</td>
                    <td className="px-4 py-3">40</td>
                    <td className="px-4 py-3">77 - 82</td>
                    <td className="px-4 py-3">62 - 67</td>
                  </tr>
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    <td className="px-4 py-3 font-medium">M</td>
                    <td className="px-4 py-3">42</td>
                    <td className="px-4 py-3">83 - 87</td>
                    <td className="px-4 py-3">68 - 72</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="px-4 py-3 font-medium">G</td>
                    <td className="px-4 py-3">44</td>
                    <td className="px-4 py-3">88 - 92</td>
                    <td className="px-4 py-3">73 - 77</td>
                  </tr>
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    <td className="px-4 py-3 font-medium">GG</td>
                    <td className="px-4 py-3">46</td>
                    <td className="px-4 py-3">93 - 97</td>
                    <td className="px-4 py-3">78 - 82</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg text-brand-dark mb-4">Tabela de Calcinhas</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-brand-dark uppercase bg-brand-offwhite">
                  <tr>
                    <th className="px-4 py-3">Tamanho</th>
                    <th className="px-4 py-3">Cintura (cm)</th>
                    <th className="px-4 py-3">Quadril (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="px-4 py-3 font-medium">P</td>
                    <td className="px-4 py-3">60 - 68</td>
                    <td className="px-4 py-3">85 - 93</td>
                  </tr>
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    <td className="px-4 py-3 font-medium">M</td>
                    <td className="px-4 py-3">69 - 76</td>
                    <td className="px-4 py-3">94 - 101</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="px-4 py-3 font-medium">G</td>
                    <td className="px-4 py-3">77 - 84</td>
                    <td className="px-4 py-3">102 - 109</td>
                  </tr>
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    <td className="px-4 py-3 font-medium">GG</td>
                    <td className="px-4 py-3">85 - 92</td>
                    <td className="px-4 py-3">110 - 117</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo Fitness */}
      {activeTab === "fitness" && (
        <div className="space-y-8 animate-fade-in">
          <div>
            <h4 className="font-serif text-lg text-brand-dark mb-4">Leggings e Tops</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-brand-dark uppercase bg-brand-offwhite">
                  <tr>
                    <th className="px-4 py-3">Tamanho</th>
                    <th className="px-4 py-3">Manequim</th>
                    <th className="px-4 py-3">Busto (cm)</th>
                    <th className="px-4 py-3">Quadril (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="px-4 py-3 font-medium">P</td>
                    <td className="px-4 py-3">36 - 38</td>
                    <td className="px-4 py-3">80 - 88</td>
                    <td className="px-4 py-3">90 - 98</td>
                  </tr>
                  <tr className="border-b border-gray-50 bg-gray-50/50">
                    <td className="px-4 py-3 font-medium">M</td>
                    <td className="px-4 py-3">40 - 42</td>
                    <td className="px-4 py-3">89 - 96</td>
                    <td className="px-4 py-3">99 - 108</td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="px-4 py-3 font-medium">G</td>
                    <td className="px-4 py-3">44 - 46</td>
                    <td className="px-4 py-3">97 - 105</td>
                    <td className="px-4 py-3">109 - 118</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Como Medir */}
      <div className="bg-brand-offwhite p-6 rounded-lg text-sm text-gray-600 space-y-3">
        <h5 className="font-bold text-brand-dark uppercase text-xs tracking-wider mb-2">Como tirar suas medidas</h5>
        <p><strong>Busto:</strong> Passe a fita métrica sobre a parte mais volumosa dos seios.</p>
        <p><strong>Tórax:</strong> Medida logo abaixo dos seios, bem justa ao corpo.</p>
        <p><strong>Cintura:</strong> A parte mais fina do tronco, cerca de dois dedos acima do umbigo.</p>
        <p><strong>Quadril:</strong> A parte mais larga do bumbum.</p>
      </div>
    </div>
  );
}