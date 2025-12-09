import { Product } from "@/types/nuvemshop";

const STORE_ID = process.env.NUVEMSHOP_STORE_ID;
const ACCESS_TOKEN = process.env.NUVEMSHOP_ACCESS_TOKEN;
const API_URL = `https://api.nuvemshop.com.br/v1/${STORE_ID}`;

export async function getProducts(): Promise<Product[]> {
  if (!STORE_ID || !ACCESS_TOKEN) {
    console.error("❌ [Nuvemshop] Credenciais faltando no .env.local");
    return [];
  }

  try {
    // Timestamp na URL para evitar cache agressivo
    const url = `${API_URL}/products?per_page=50&_t=${Date.now()}`;
    
    const res = await fetch(url, {
      headers: {
        "Authentication": `bearer ${ACCESS_TOKEN}`,
        "User-Agent": "MundoFemme (dev@loja.com)",
        "Content-Type": "application/json"
      },
      cache: "no-store" // Garante dados sempre frescos
    });

    if (!res.ok) {
      console.error(`❌ [API Error] Status: ${res.status}`);
      throw new Error("Falha na API");
    }
    
    const data: Product[] = await res.json();

    // --- BLOCO DE DEBUG ---
    console.log("==========================================");
    console.log(`📦 [API] Total recebido: ${data.length} produtos.`);
    
    const published = data.filter(p => p.published);
    const hidden = data.filter(p => !p.published);

    console.log(`✅ [Visíveis/Publicados]: ${published.length}`);
    console.log(`👻 [Ocultos/Rascunho]: ${hidden.length}`);
    
    if (hidden.length > 0) {
      console.log("   -> Nomes dos Ocultos:", hidden.map(p => p.name.pt).join(", "));
    }
    console.log("==========================================");
    // -------------------------------------------------------

    // --- ALTERAÇÃO AQUI: RETORNA TUDO (VISÍVEIS + OCULTOS) ---
    return data;

  } catch (error) {
    console.error("Erro no getProducts:", error);
    return [];
  }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.handle.pt === handle) || null;
}

export async function getProductsByCategory(categoryHandle: string): Promise<Product[]> {
  const allProducts = await getProducts();
  return allProducts.filter((product) => 
    product.categories.some((cat) => cat.handle.pt === categoryHandle)
  );
}

export function formatPrice(price: string | number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(price));
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const allProducts = await getProducts();

    if (!query) return [];

    const lowerQuery = query.toLowerCase();

    return allProducts.filter((product) => 
      product.name.pt.toLowerCase().includes(lowerQuery) ||
      product.description.pt.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error("Erro na busca:", error);
    return [];
  }
}