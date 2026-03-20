import { ProductGrid } from '@/components/products/product-grid';
import { products, categories } from '@/data/products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products - ShopHub',
  description: 'Browse our full collection of premium products.',
};

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const category = searchParams.category as string | undefined;
  const featured = searchParams.featured === 'true';
  const onSale = searchParams.onSale === 'true';

  let filteredProducts = [...products];

  if (category) {
    filteredProducts = filteredProducts.filter((p) =>
      p.categories.some((c) => c.slug === category)
    );
  }

  if (featured) {
    filteredProducts = filteredProducts.filter((p) => p.featured);
  }

  if (onSale) {
    filteredProducts = filteredProducts.filter((p) => p.onSale);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {category
            ? categories.find((c) => c.slug === category)?.name || 'Products'
            : featured
            ? 'Featured Products'
            : onSale
            ? 'Products on Sale'
            : 'All Products'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {category
            ? `Browse our ${category.replace('-', ' ')} collection`
            : 'Discover our complete range of premium products'}
        </p>
      </div>
      <ProductGrid products={filteredProducts} categories={categories} />
    </div>
  );
}
