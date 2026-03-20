import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/cart/cart-drawer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShopHub - Premium E-commerce Platform',
  description: 'Shop the best products with WordPress integration. Quality guaranteed.',
  keywords: ['ecommerce', 'shop', 'online store', 'WordPress', 'woocommerce'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CartDrawer />
      </body>
    </html>
  );
}
