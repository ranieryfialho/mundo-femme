import { NextResponse } from "next/server";

const STORE_ID = process. env.NUVEMSHOP_STORE_ID;
const ACCESS_TOKEN = process.env.NUVEMSHOP_ACCESS_TOKEN;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!items || items. length === 0) {
      return NextResponse.json({ error: "Carrinho vazio" }, { status: 400 });
    }

    console.log("=== CRIANDO DRAFT ORDER ===");

    const draftOrderPayload = {
      contact_email: "cliente@exemplo.com",
      contact_name: "Cliente",
      contact_lastname: "MundoFemme",
      products: items.map((item: any) => ({
        variant_id: item.selectedVariantId || item.variants?.[0]?.id,
        quantity: item.quantity || 1,
      })),
      send_confirmation_email: false,
      send_fulfillment_email: false,
    };

    console.log("Payload:", JSON.stringify(draftOrderPayload, null, 2));

    const apiUrl = `https://api.nuvemshop.com.br/v1/${STORE_ID}/draft_orders`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authentication": `bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "MundoFemme-App/1.0",
      },
      body: JSON.stringify(draftOrderPayload),
    });

    const data = await response. json();
    console.log("Response status:", response.status);
    console.log("Response data:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return NextResponse.json(
        { 
          error: "Erro na API da Nuvemshop",
          details: data,
        },
        { status: response.status }
      );
    }

    const checkoutUrl = data.checkout_url;

    if (!checkoutUrl) {
      throw new Error("Draft Order criado mas sem checkout_url");
    }

    console.log("✅ SUCCESS! Checkout URL:", checkoutUrl);
    
    return NextResponse.json({ url: checkoutUrl });

  } catch (error: any) {
    console.error("❌ ERRO:", error. message);
    return NextResponse. json(
      { error: error.message || "Falha interna" },
      { status: 500 }
    );
  }
}