import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/nuvemshop';

interface WishlistState {
  items: Product[];
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearWishlist: () => void;
  hasItem: (productId: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openWishlist: () => set({ isOpen: true }),
      closeWishlist: () => set({ isOpen: false }),

      toggleItem: (product) => {
        const { items } = get();
        const exists = items.find((i) => i.id === product.id);

        if (exists) {
          set({ items: items.filter((i) => i.id !== product.id) });
        } else {
          set({ items: [...items, product], isOpen: true });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      clearWishlist: () => set({ items: [] }),

      hasItem: (id) => {
        return get().items.some((i) => i.id === id);
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);