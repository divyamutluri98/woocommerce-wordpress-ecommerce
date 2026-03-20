'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types/product';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = () => {
    addItem(product, quantity);
    openCart();
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < (product.stockQuantity || 10)) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.images[selectedImage]?.src || '/api/placeholder/600/600'}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {product.onSale && (
            <Badge variant="sale" className="absolute left-4 top-4 text-lg">
              Sale {Math.round((1 - product.salePrice! / product.regularPrice) * 100)}% OFF
            </Badge>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {product.images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 ${
                selectedImage === index ? 'border-primary' : 'border-transparent'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">{product.categories[0]?.name}</p>
          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.averageRating} ({product.reviewCount} reviews)
            </span>
          </div>
        </div>

        <div className="flex items-baseline gap-4">
          <span className="text-4xl font-bold">{formatPrice(product.price)}</span>
          {product.onSale && (
            <span className="text-xl text-muted-foreground line-through">
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>

        <p className="text-muted-foreground">{product.shortDescription}</p>

        <div className="flex items-center gap-4">
          <span className={`text-sm ${product.stockStatus === 'instock' ? 'text-green-600' : 'text-red-600'}`}>
            {product.stockStatus === 'instock' ? 'In Stock' : 'Out of Stock'}
          </span>
          {product.stockQuantity && product.stockQuantity < 10 && (
            <span className="text-sm text-orange-600">Only {product.stockQuantity} left</span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" onClick={decreaseQuantity}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={increaseQuantity}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button className="flex-1" size="lg" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-muted-foreground" />
            <div className="text-sm">
              <p className="font-medium">Free Shipping</p>
              <p className="text-muted-foreground">On orders over $100</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <div className="text-sm">
              <p className="font-medium">Secure Payment</p>
              <p className="text-muted-foreground">100% secure checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="h-5 w-5 text-muted-foreground" />
            <div className="text-sm">
              <p className="font-medium">Easy Returns</p>
              <p className="text-muted-foreground">30-day return policy</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Description</h3>
          <p className="text-muted-foreground">{product.description}</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Product Details</h3>
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <dt className="text-muted-foreground">SKU</dt>
            <dd>{product.sku}</dd>
            <dt className="text-muted-foreground">Category</dt>
            <dd>{product.categories.map((c) => c.name).join(', ')}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
