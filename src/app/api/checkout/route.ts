import { NextResponse } from "next/server";

const STORE_ID = process.env.NUVEMSHOP_STORE_ID;
const ACCESS_TOKEN = process.env.NUVEMSHOP_ACCESS_TOKEN;
// Garante que a URL não tenha barra no final para não duplicar
const BASE_URL = (process.env.NEXT_PUBLIC_STORE_URL || "https://devmundofemme.lojavirtualnuvem.com.br").replace(/\/$/, "");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Carrinho vazio" }, { status: 400 });
    }

    // --- CORREÇÃO: FORMATO EXATO DA DOCUMENTAÇÃO ---
    // A API exige "line_items", não "items".
    const cartPayload = {
      line_items: items.map((item: any) => ({
        variant_id: item.selectedVariantId || item.variants[0].id,
        quantity: item.quantity,
      }))
    };

    console.log("--- ENVIANDO PARA API NUVEMSHOP ---");
    console.log("Payload:", JSON.stringify(cartPayload, null, 2));

    // Endpoint de Criação de Carrinho
    const response = await fetch(`https://api.nuvemshop.com.br/v1/${STORE_ID}/carts`, {
      method: "POST",
      headers: {
        "Authentication": `bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "MundoFemme (External App)"
      },
      body: JSON.stringify(cartPayload),
    });

    const data = await response.json();

    // Se a API recusar, mostramos o erro exato no terminal
    if (!response.ok) {
      console.error("ERRO NUVEMSHOP:", JSON.stringify(data, null, 2));
      throw new Error(data.message || data.description || "Erro ao criar carrinho via API");
    }

    console.log("Carrinho criado com Sucesso! ID:", data.id);

    // --- MONTAGEM DA URL DE CHECKOUT ---
    // A API retorna o ID e um 'token' (hash de segurança).
    // A URL oficial para assumir esse carrinho é:
    // https://loja.com.br/checkout/v3/start/{id}/{token}
    
    const cartId = data.id;
    const cartHash = data.token; 

    if (!cartId || !cartHash) {
      throw new Error("API retornou sucesso mas sem ID/Token");
    }

    const checkoutUrl = `${BASE_URL}/checkout/v3/start/${cartId}/${cartHash}`;
    
    return NextResponse.json({ url: checkoutUrl });

  } catch (error: any) {
    console.error("ERRO NO SERVIDOR:", error.message);
    return NextResponse.json(
      { error: error.message || "Falha interna no servidor" },
      { status: 500 }
    );
  }
}