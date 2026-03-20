'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types/product';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product);
    openCart();
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]?.src || `/api/placeholder/600/600`}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <Button size="icon" variant="secondary" className="h-10 w-10">
              <Eye className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10"
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
          {product.onSale && (
            <Badge variant="sale" className="absolute left-2 top-2">
              -{Math.round((1 - product.salePrice! / product.regularPrice) * 100)}%
            </Badge>
          )}
          {product.featured && !product.onSale && (
            <Badge variant="default" className="absolute left-2 top-2">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">{product.categories[0]?.name}</p>
          <h3 className="mt-1 font-semibold line-clamp-2">{product.name}</h3>
          <div className="mt-2 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.averageRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            {product.onSale && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.regularPrice)}
              </span>
            )}
          </div>
          <Button size="sm" onClick={handleAddToCart} disabled={isAdding}>
            {isAdding ? 'Added!' : 'Add'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
