export interface ProductImage {
  id: number;
  src: string;
  position: number;
  alt?: string[];
}

export interface ProductVariant {
  id: number;
  price: string;
  promotional_price: string | null;
  stock: number;
}

export interface Category {
  id: number;
  name: {
    pt: string;
  };
  handle: {
    pt: string;
  };
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
  images: ProductImage[];
  variants: ProductVariant[];
  promotional_price: string | null;
  price: string;
  categories: Category[];
}