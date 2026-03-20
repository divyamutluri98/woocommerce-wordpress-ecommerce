import { ProductDetails } from '@/components/products/product-details';
import { ProductCard } from '@/components/products/product-card';
import { products, getProductBySlug } from '@/data/products';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} - ShopHub`,
    description: product.shortDescription,
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.categories[0]?.id === product.categories[0]?.id && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails product={product} />
      
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
