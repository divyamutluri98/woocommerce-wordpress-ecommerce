'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/hooks/use-cart';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getSubtotal, getTax, getShipping, getTotal, clearCart } = useCartStore();

  const updateQty = async (productId: string, newQty: number) => {
    if (newQty < 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQty);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Cart is empty');
      return;
    }
    router.push('/checkout');
  };

  const shipping = getShipping();
  const tax = getTax();
  const total = getTotal();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <Card className="p-16 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added anything yet.</p>
            <Link href="/products">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <Link href={`/products/${item.productId}`}>
                          <h3 className="font-semibold hover:text-primary">{item.name}</h3>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.productId)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="text-lg font-bold mt-auto">${item.price.toFixed(2)}</p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQty(item.productId, item.quantity - 1)}
                            className="h-8 w-8"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQty(item.productId, item.quantity + 1)}
                            disabled={item.maxQuantity ? item.quantity >= item.maxQuantity : false}
                            className="h-8 w-8"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <p className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="flex justify-end">
                <Button variant="outline" onClick={clearCart} className="text-destructive hover:text-destructive">
                  Clear Cart
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.length} items)</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Add ${(100 - getSubtotal()).toFixed(2)} more for free shipping!
                  </p>
                )}

                <Button
                  className="w-full mt-6"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                </Button>

                <div className="mt-4 text-center">
                  <Link href="/products" className="text-sm text-primary hover:underline">
                    Continue Shopping
                  </Link>
                </div>

                <div className="mt-6 pt-4 border-t text-xs text-muted-foreground space-y-1">
                  <p>Secure checkout powered by Stripe</p>
                  <p>30-day return policy</p>
                  <p>Money-back guarantee</p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
