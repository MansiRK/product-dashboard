import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";

interface WishlistStore {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.some((item) => item.id === product.id);

          if (exists) {
            return state;
          }

          return {
            wishlist: [...state.wishlist, product],
          };
        }),

      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        })),
      clearWishlist: () =>
        set({
          wishlist: [],
        }),

      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.some((item) => item.id === product.id);

          return {
            wishlist: exists
              ? state.wishlist.filter((item) => item.id !== product.id)
              : [...state.wishlist, product],
          };
        }),

      isWishlisted: (id) => {
        return get().wishlist.some((item) => item.id === id);
      },
    }),
    {
      name: "wishlist-storage",
    },
  ),
);
