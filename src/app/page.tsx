import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/products/product-card';
import { products, getFeaturedProducts, getProductsOnSale, categories } from '@/data/products';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const saleProducts = getProductsOnSale();

  return (
    <div className="flex flex-col">
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Discover Premium Products for Every Lifestyle
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Shop from our curated collection of high-quality products. 
                Seamless WordPress integration for the best shopping experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/products">
                    Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/products?featured=true">View Featured</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-square lg:aspect-[4/3]">
              <Image
                src="https://picsum.photos/seed/hero/800/800"
                alt="Hero image"
                fill
                className="object-cover rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">Orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">100% Protected</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-4">
                <RotateCcw className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">30-day policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">Handpicked items</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground mt-2">Our top picks for you</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products?featured=true">View All</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4)).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">On Sale</h2>
              <p className="text-muted-foreground mt-2">Limited time offers</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products?onSale=true">View All</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(saleProducts.length > 0 ? saleProducts : products.filter(p => p.onSale).slice(0, 4)).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.slug}`}>
                <Card className="group overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative aspect-square">
                    <Image
                      src={`https://picsum.photos/seed/${category.slug}/400/400`}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                      <p className="text-sm text-white/80">{category.count} Products</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
            Subscribe to get special offers, free stuff, and exclusive deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-12 flex-1 rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary-foreground text-primary h-12 px-6 py-2 hover:bg-primary-foreground/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
