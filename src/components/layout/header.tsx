'use client';

import Link from 'next/link';
import { Menu, X, Search, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartButton } from '@/components/cart/cart-button';
import { useState } from 'react';
import { useCartStore } from '@/lib/store';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isCartOpen = useCartStore((state) => state.isOpen);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <Link href="/" className="text-xl font-bold md:text-2xl">
              ShopHub
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-sm font-medium hover:text-primary">
              All Products
            </Link>
            <Link href="/products?category=electronics" className="text-sm font-medium hover:text-primary">
              Electronics
            </Link>
            <Link href="/products?category=clothing" className="text-sm font-medium hover:text-primary">
              Clothing
            </Link>
            <Link href="/products?category=home-garden" className="text-sm font-medium hover:text-primary">
              Home & Garden
            </Link>
            <Link href="/products?category=sports-outdoors" className="text-sm font-medium hover:text-primary">
              Sports
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[200px] pl-9 lg:w-[300px]"
              />
            </div>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>
            <CartButton />
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <Link
                href="/products"
                className="text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Products
              </Link>
              <Link
                href="/products?category=electronics"
                className="text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Electronics
              </Link>
              <Link
                href="/products?category=clothing"
                className="text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Clothing
              </Link>
              <Link
                href="/products?category=home-garden"
                className="text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home & Garden
              </Link>
              <Link
                href="/products?category=sports-outdoors"
                className="text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sports
              </Link>
            </nav>
            <div className="mt-4 sm:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
