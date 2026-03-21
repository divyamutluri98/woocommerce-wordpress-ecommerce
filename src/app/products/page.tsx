'use client';

import { ProductGrid } from '@/components/products/product-grid';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { categories } from '@/data/products';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products' },
        ]}
        className="mb-6"
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="text-muted-foreground mt-2">
          Discover our complete range of premium products
        </p>
      </div>

      <ProductGrid products={[]} categories={categories} />
    </div>
  );
}
