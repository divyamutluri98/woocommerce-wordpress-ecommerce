'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useWishlistStore } from '@/hooks/use-wishlist';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const [isAdding, setIsAdding] = useState<string | null>(null);

  const addToCart = async (productId: string) => {
    setIsAdding(productId);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsAdding(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">My Wishlist</h2>
        <p className="text-muted-foreground">Items you&apos;ve saved for later</p>
      </div>

      {items.length === 0 ? (
        <Card className="p-8 text-center">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative aspect-square bg-muted">
                {product.images?.[0]?.src ? (
                  <Image
                    src={product.images[0].src}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No Image
                  </div>
                )}
                <button
                  onClick={() => removeItem(product.id)}
                  className="absolute top-2 right-2 p-2 bg-background/80 rounded-full hover:bg-background"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
              <div className="p-4">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-semibold hover:text-primary">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold">${Number(product.price).toFixed(2)}</span>
                  {product.salePrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${Number(product.regularPrice).toFixed(2)}
                    </span>
                  )}
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={() => addToCart(product.id)}
                  disabled={isAdding === product.id}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {isAdding === product.id ? 'Adding...' : 'Add to Cart'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
