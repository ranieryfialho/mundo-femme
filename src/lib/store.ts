import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/nuvemshop';

export interface CartItem extends Product {
  quantity: number;
  selectedVariantId?: number;
  selectedSizeName?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size?: string, variantId?: number) => void; 
  removeItem: (productId: number) => void;
  clearCart: () => void;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product, size, variantId) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => 
          item.id === product.id && item.selectedVariantId === variantId
        );

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id && item.selectedVariantId === variantId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [
              ...currentItems, 
              { 
                ...product, 
                quantity: 1, 
                selectedSizeName: size, 
                selectedVariantId: variantId
              }
            ],
            isOpen: true,
          });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      clearCart: () => set({ items: [] }),

      subtotal: () => {
        return get().items.reduce((total, item) => {
          const price = parseFloat(item.promotional_price || item.variants[0]?.price || item.price);
          return total + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);