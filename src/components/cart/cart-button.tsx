'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';

export function CartButton() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const openCart = useCartStore((state) => state.openCart);

  return (
    <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
      <ShoppingBag className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Button>
  );
}
