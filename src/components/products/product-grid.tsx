'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductCard } from './product-card';
import { Badge } from '@/components/ui/badge';
import type { Product, ProductCategory } from '@/types/product';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  categories: ProductCategory[];
}

export function ProductGrid({ products, categories }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.categories.some((c) => c.name.toLowerCase().includes(query))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) =>
        p.categories.some((c) => c.slug === selectedCategory)
      );
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        filtered.sort((a, b) => b.averageRating - a.averageRating);
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy, priceRange]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <div className="hidden border md:flex">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === null ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSelectedCategory(null)}
        >
          All Products
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.slug ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(category.slug)}
          >
            {category.name}
          </Badge>
        ))}
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredProducts.length} products
      </div>

      <div
        className={cn(
          'grid gap-6',
          viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        )}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">No products found</p>
          <Button
            variant="link"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
