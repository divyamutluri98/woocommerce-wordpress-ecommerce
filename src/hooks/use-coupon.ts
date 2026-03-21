'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CouponState {
  code: string | null;
  discount: number;
  type: 'PERCENTAGE' | 'FIXED' | null;
  setCoupon: (code: string, discount: number, type: 'PERCENTAGE' | 'FIXED') => void;
  clearCoupon: () => void;
  calculateDiscount: (subtotal: number) => number;
}

export const useCouponStore = create<CouponState>()(
  persist(
    (set, get) => ({
      code: null,
      discount: 0,
      type: null,
      setCoupon: (code, discount, type) => set({ code, discount, type }),
      clearCoupon: () => set({ code: null, discount: 0, type: null }),
      calculateDiscount: (subtotal) => {
        const { discount, type } = get();
        if (!type) return 0;
        if (type === 'PERCENTAGE') {
          return (subtotal * discount) / 100;
        }
        return Math.min(discount, subtotal);
      },
    }),
    {
      name: 'coupon-storage',
    }
  )
);
