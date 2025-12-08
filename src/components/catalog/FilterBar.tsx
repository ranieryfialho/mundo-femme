"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 py-4 border-t border-b border-gray-100 mb-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mr-auto">
        <SlidersHorizontal size={16} />
        <span className="uppercase tracking-widest font-medium">Filtros</span>
      </div>

      <select 
        className="bg-transparent text-sm text-brand-dark font-sans focus:outline-none cursor-pointer"
        onChange={(e) => updateFilter("sort", e.target.value)}
        defaultValue={searchParams.get("sort") || "newest"}
      >
        <option value="newest">Mais Recentes</option>
        <option value="price_asc">Menor Preço</option>
        <option value="price_desc">Maior Preço</option>
        <option value="name_asc">Nome (A-Z)</option>
      </select>

      <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
        <span className="text-xs text-gray-400 uppercase">Tamanho:</span>
        {['P', 'M', 'G', 'GG'].map((size) => (
          <button
            key={size}
            onClick={() => updateFilter("size", searchParams.get("size") === size ? "all" : size)}
            className={`w-8 h-8 flex items-center justify-center text-xs border transition-colors ${
              searchParams.get("size") === size
                ? "border-brand-dark bg-brand-dark text-white"
                : "border-gray-200 text-gray-600 hover:border-brand-dark"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}