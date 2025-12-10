export interface ProductImage {
  id: number;
  src: string;
  position: number;
  alt?: string[];
}

export interface VariantValue {
  pt: string;
  es?: string;
  en?: string;
}

export interface ProductVariant {
  id: number;
  price: string;
  promotional_price: string | null;
  stock: number | null;
  values: VariantValue[];
}

export interface Category {
  id: number;
  name: {
    pt: string;
  };
  handle: {
    pt: string;
  };
  parent?: number | null;
  subcategories?: number[];
  description?: {
    pt: string;
  };
  image?: {
    src: string;
  } | null; // <--- CAMPO NOVO ADICIONADO
}

export interface Product {
  id: number;
  name: {
    pt: string;
  };
  description: {
    pt: string;
  };
  handle: {
    pt: string;
  };
  published: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
  promotional_price: string | null;
  price: string;
  categories: Category[];
  tags?: string | string[];
}