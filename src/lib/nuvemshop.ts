import { Product } from "@/types/nuvemshop";

const STORE_ID = process.env.NUVEMSHOP_STORE_ID;
const ACCESS_TOKEN = process.env.NUVEMSHOP_ACCESS_TOKEN;
const API_URL = `https://api.nuvemshop.com.br/v1/${STORE_ID}`;

export async function getProducts(): Promise<Product[]> {
  if (!STORE_ID || !ACCESS_TOKEN) {
    return [];
  }

  try {
    const res = await fetch(`${API_URL}/products?per_page=20`, {
      headers: {
        "Authentication": `bearer ${ACCESS_TOKEN}`,
        "User-Agent": "MundoFemme (dev@loja.com)",
        "Content-Type": "application/json"
      },
      cache: "no-store", 
    });

    if (!res.ok) throw new Error("Falha na API");
    return await res.json();
  } catch (error) {
    console.error(error);
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