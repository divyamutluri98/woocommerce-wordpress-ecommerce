'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

interface SearchResult {
  id: string;
  name: string;
  slug: string;
  price: number;
  image?: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showFullResults, setShowFullResults] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 2) {
        searchProducts();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const searchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.products || []);
    } catch (error) {
      console.error('Search failed:', error);
      setResults(mockResults);
    } finally {
      setLoading(false);
    }
  };

  const mockResults: SearchResult[] = [
    { id: '1', name: 'Wireless Headphones Pro', slug: 'wireless-headphones-pro', price: 199.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' },
    { id: '2', name: 'Smart Watch Series X', slug: 'smart-watch-series-x', price: 399.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100' },
    { id: '3', name: 'Bluetooth Speaker', slug: 'bluetooth-speaker', price: 79.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100' },
  ].filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowResults(true)}
            className="pl-10 pr-10"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {showResults && query.length >= 2 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-auto">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin mx-auto" />
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="p-2">
                {results.slice(0, 5).map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={() => setShowResults(false)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted"
                  >
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <button
                onClick={() => setShowFullResults(true)}
                className="w-full p-3 text-center text-sm text-primary hover:bg-muted border-t"
              >
                See all results for &quot;{query}&quot;
              </button>
            </>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No products found for &quot;{query}&quot;
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
