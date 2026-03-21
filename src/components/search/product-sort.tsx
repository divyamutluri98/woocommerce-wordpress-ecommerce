'use client';

import { useState } from 'react';
import { ArrowUpDown, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'bestselling', label: 'Best Selling' },
];

export default function ProductSort({
  totalProducts,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: {
  totalProducts: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}) {
  const [showSortMenu, setShowSortMenu] = useState(false);

  const currentSort = sortOptions.find((opt) => opt.value === sortBy);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <p className="text-muted-foreground">
        {totalProducts} product{totalProducts !== 1 ? 's' : ''}
      </p>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted"
          >
            <ArrowUpDown className="h-4 w-4" />
            <span className="hidden sm:inline">Sort by:</span>
            <span>{currentSort?.label}</span>
          </button>

          {showSortMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowSortMenu(false)}
              />
              <div className="absolute right-0 top-full mt-1 z-20 bg-background border rounded-lg shadow-lg min-w-[200px]">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortChange(option.value);
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-muted first:rounded-t-lg last:rounded-b-lg ${
                      sortBy === option.value ? 'bg-primary/10 text-primary' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-1 border rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded ${
              viewMode === 'grid' ? 'bg-muted' : 'hover:bg-muted'
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded ${
              viewMode === 'list' ? 'bg-muted' : 'hover:bg-muted'
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
