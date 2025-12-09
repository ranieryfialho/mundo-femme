import { Product } from "@/types/nuvemshop";

const STORE_ID = process.env. NUVEMSHOP_STORE_ID;
const ACCESS_TOKEN = process.env.NUVEMSHOP_ACCESS_TOKEN;
const API_URL = `https://api.nuvemshop.com.br/v1/${STORE_ID}`;

export async function getProducts(): Promise<Product[]> {
  if (! STORE_ID || !ACCESS_TOKEN) {
    console.error("❌ [Nuvemshop] Credenciais faltando no . env.local");
    return [];
  }

  try {
    let allProducts: Product[] = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
      const url = `${API_URL}/products?per_page=50&page=${page}&_t=${Date.now()}`;

      const res = await fetch(url, {
        headers: {
          "Authentication": `bearer ${ACCESS_TOKEN}`,
          "User-Agent": "MundoFemme (dev@loja.com)",
          "Content-Type": "application/json"
        },
        cache: "no-store",
        next: { revalidate: 0 }
      });

      if (!res.ok) {
        console.error(`❌ [Nuvemshop API] Erro ${res.status}`);
        break;
      }

      const data: Product[] = await res.json();
      
      if (data.length === 0) {
        hasMore = false;
      } else {
        allProducts = [... allProducts, ...data];
        
        if (data.length < 50) {
          hasMore = false;
        } else {
          page++;
        }
      }
    }

    // Filtra apenas produtos publicados
    return allProducts.filter(p => p.published);

  } catch (error) {
    console.error("❌ [Nuvemshop] Erro ao buscar produtos:", error);
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
      product.name. pt.toLowerCase().includes(lowerQuery) ||
      product.description.pt.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error("❌ [Nuvemshop] Erro na busca:", error);
    return [];
  }
}