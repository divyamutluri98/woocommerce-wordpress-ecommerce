import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-bold">
              ShopHub
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your one-stop shop for premium products. Quality guaranteed with fast shipping and excellent customer service.
            </p>
            <div className="mt-4 flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-primary">All Products</Link></li>
              <li><Link href="/products?featured=true" className="hover:text-primary">Featured</Link></li>
              <li><Link href="/products?onSale=true" className="hover:text-primary">On Sale</Link></li>
              <li><Link href="/products?category=electronics" className="hover:text-primary">Electronics</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Customer Service</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-primary">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-primary">Returns</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Newsletter</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Subscribe to get special offers and exclusive deals.
            </p>
            <form className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 ShopHub. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
