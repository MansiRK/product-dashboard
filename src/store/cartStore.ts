import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];

  loading: boolean;

  setLoading: (value: boolean) => void;

  addToCart: (product: Product, quantity?: number) => void;
  addMultipleToCart: (products: Product[]) => void;
  removeFromCart: (id: number) => void;
  toggleCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  isCart: (id: number) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      loading: true,

      setLoading: (value) => set({ loading: value }),

      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);

          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                    }
                  : item,
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              {
                ...product,
                quantity,
              },
            ],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      toggleCart: (product) =>
        set((state) => {
          const exists = state.cart.some((item) => item.id === product.id);

          return {
            cart: exists
              ? state.cart.filter((item) => item.id !== product.id)
              : [
                  ...state.cart,
                  {
                    ...product,
                    quantity: 1,
                  },
                ],
          };
        }),

      increaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: Math.max(1, item.quantity - 1),
                }
              : item,
          ),
        })),

      addMultipleToCart: (products) =>
        set((state) => {
          const updatedCart = [...state.cart];

          products.forEach((product) => {
            const exists = updatedCart.find((item) => item.id === product.id);

            if (exists) {
              exists.quantity += 1;
            } else {
              updatedCart.push({
                ...product,
                quantity: 1,
              });
            }
          });

          return {
            cart: updatedCart,
          };
        }),

      isCart: (id) => get().cart.some((item) => item.id === id),
    }),

    {
      name: "cart-storage",

      onRehydrateStorage: () => {
        return (state) => {
          state?.setLoading(false);
        };
      },
    },
  ),
);
