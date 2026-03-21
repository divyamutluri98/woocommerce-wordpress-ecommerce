import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('per_page') || '12');
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const featured = searchParams.get('featured') === 'true';
  const onSale = searchParams.get('on_sale') === 'true';

  let filteredProducts = [...products];

  if (category) {
    filteredProducts = filteredProducts.filter((p) =>
      p.categories.some((c) => c.slug === category)
    );
  }

  if (search) {
    const query = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query)
    );
  }

  const sort = searchParams.get('sort');
  if (sort) {
    switch (sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }

  if (featured) {
    filteredProducts = filteredProducts.filter((p) => p.featured);
  }

  if (onSale) {
    filteredProducts = filteredProducts.filter((p) => p.onSale);
  }

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedProducts = filteredProducts.slice(start, end);

  return NextResponse.json({
    data: paginatedProducts,
    pagination: {
      page,
      per_page: perPage,
      total: filteredProducts.length,
      total_pages: Math.ceil(filteredProducts.length / perPage),
    },
  });
}
