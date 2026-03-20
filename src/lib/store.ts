import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '@/types/product';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product: Product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item.productId === product.id);
        
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: `${product.id}-${Date.now()}`,
                productId: product.id,
                quantity,
                product,
              },
            ],
          });
        }
      },
      
      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        });
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'ecommerce-cart',
    }
  )
);
