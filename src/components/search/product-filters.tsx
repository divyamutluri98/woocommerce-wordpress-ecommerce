'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
  ratings: number[];
  inStock: boolean;
  onSale: boolean;
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  categories: { id: string; name: string; count: number }[];
}

export default function ProductFilters({ onFilterChange, categories }: ProductFiltersProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 1000],
    brands: [],
    ratings: [],
    inStock: false,
    onSale: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  const brands = ['Apple', 'Samsung', 'Sony', 'Bose', 'JBL', 'LG'];
  const ratings = [5, 4, 3, 2, 1];

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleArrayFilter = (key: 'categories' | 'brands', value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFilters((prev: typeof filters) => ({ ...prev, [key]: updated }));
    onFilterChange({ ...filters, [key]: updated });
  };

  const toggleRatingFilter = (rating: number) => {
    const current = filters.ratings;
    const updated = current.includes(rating)
      ? current.filter((v) => v !== rating)
      : [...current, rating];
    setFilters((prev: typeof filters) => ({ ...prev, ratings: updated }));
    onFilterChange({ ...filters, ratings: updated });
  };

  const clearFilters = () => {
    const reset: FilterState = {
      categories: [],
      priceRange: [0, 1000],
      brands: [],
      ratings: [],
      inStock: false,
      onSale: false,
    };
    setFilters(reset);
    onFilterChange(reset);
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.ratings.length > 0 ||
    filters.inStock ||
    filters.onSale ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000;

  return (
    <div className="lg:w-64">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Filters</h2>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-sm text-primary hover:underline">
            Clear All
          </button>
        )}
      </div>

      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden flex items-center gap-2 mb-4"
      >
        <Filter className="h-4 w-4" />
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div>
          <h3 className="font-medium mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={filters.categories.includes(cat.id)}
                  onCheckedChange={() => toggleArrayFilter('categories', cat.id)}
                />
                <span className="text-sm flex-1">{cat.name}</span>
                <span className="text-xs text-muted-foreground">({cat.count})</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
            min={0}
            max={1000}
            step={10}
            className="mb-2"
          />
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) =>
                updateFilter('priceRange', [Number(e.target.value), filters.priceRange[1]])
              }
              className="w-24"
              min={0}
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) =>
                updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])
              }
              className="w-24"
              max={1000}
            />
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Brands</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={() => toggleArrayFilter('brands', brand)}
                />
                <span className="text-sm">{brand}</span>
              </label>
            ))}
          </div>
        </div>

          <div>
          <h3 className="font-medium mb-3">Rating</h3>
          <div className="space-y-2">
            {ratings.map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={filters.ratings.includes(rating)}
                  onCheckedChange={() => toggleRatingFilter(rating)}
                />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">& up</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={filters.inStock}
              onCheckedChange={(checked) => updateFilter('inStock', checked)}
            />
            <span className="text-sm">In Stock Only</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={filters.onSale}
              onCheckedChange={(checked) => updateFilter('onSale', checked)}
            />
            <span className="text-sm">On Sale</span>
          </label>
        </div>
      </div>
    </div>
  );
}
