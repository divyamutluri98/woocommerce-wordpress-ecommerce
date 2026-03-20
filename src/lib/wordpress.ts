import type { Product, PaginatedResponse, ProductCategory } from '@/types/product';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || '';
const WORDPRESS_CONSUMER_KEY = process.env.WORDPRESS_CONSUMER_KEY || '';
const WORDPRESS_CONSUMER_SECRET = process.env.WORDPRESS_CONSUMER_SECRET || '';

function getAuthParams(): string {
  return `consumer_key=${WORDPRESS_CONSUMER_KEY}&consumer_secret=${WORDPRESS_CONSUMER_SECRET}`;
}

async function fetchFromWordPress<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${WORDPRESS_API_URL}${endpoint}`);
  
  url.searchParams.append('consumer_key', WORDPRESS_CONSUMER_KEY);
  url.searchParams.append('consumer_secret', WORDPRESS_CONSUMER_SECRET);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getProducts(params?: {
  page?: number;
  perPage?: number;
  category?: string;
  tag?: string;
  search?: string;
  orderBy?: string;
  order?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  onSale?: boolean;
}): Promise<PaginatedResponse<Product>> {
  const queryParams: Record<string, string> = {
    page: String(params?.page || 1),
    per_page: String(params?.perPage || 12),
  };

  if (params?.category) queryParams.category = params.category;
  if (params?.tag) queryParams.tag = params.tag;
  if (params?.search) queryParams.search = params.search;
  if (params?.orderBy) queryParams.orderby = params.orderBy;
  if (params?.order) queryParams.order = params.order;
  if (params?.featured) queryParams.featured = 'true';
  if (params?.onSale) queryParams.on_sale = 'true';

  const products = await fetchFromWordPress<Product[]>('/wc/v3/products', queryParams);
  
  return {
    data: products,
    pagination: {
      page: Number(queryParams.page),
      pageSize: Number(queryParams.per_page),
      totalPages: 1,
      totalItems: products.length,
    },
  };
}

export async function getProduct(id: string): Promise<Product> {
  return fetchFromWordPress<Product>(`/wc/v3/products/${id}`);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await fetchFromWordPress<Product[]>('/wc/v3/products', {
    slug,
  });
  return products[0] || null;
}

export async function getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
  const product = await getProduct(productId);
  if (!product?.relatedIds?.length) return [];

  const related = await fetchFromWordPress<Product[]>('/wc/v3/products', {
    include: product.relatedIds.slice(0, limit).join(','),
  });

  return related;
}

export async function getFeaturedProducts(limit = 10): Promise<Product[]> {
  return fetchFromWordPress<Product[]>('/wc/v3/products', {
    featured: 'true',
    per_page: String(limit),
  });
}

export async function getProductsOnSale(limit = 10): Promise<Product[]> {
  return fetchFromWordPress<Product[]>('/wc/v3/products', {
    on_sale: 'true',
    per_page: String(limit),
  });
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  return fetchFromWordPress<ProductCategory[]>('/wc/v3/products/categories', {
    hide_empty: 'true',
  });
}

export async function getProductCategory(id: string): Promise<ProductCategory> {
  return fetchFromWordPress<ProductCategory>(`/wc/v3/products/categories/${id}`);
}

export async function getProductReviews(productId: string): Promise<any[]> {
  return fetchFromWordPress<any[]>(`/wc/v3/products/reviews`, {
    product: productId,
    status: 'approved',
  });
}

export async function createOrder(orderData: {
  payment_method: string;
  payment_method_title: string;
  billing: any;
  shipping: any;
  line_items: Array<{
    product_id: number;
    quantity: number;
  }>;
  set_paid: boolean;
}): Promise<any> {
  const response = await fetch(`${WORDPRESS_API_URL}/wc/v3/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...orderData,
      consumer_key: WORDPRESS_CONSUMER_KEY,
      consumer_secret: WORDPRESS_CONSUMER_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create order: ${response.statusText}`);
  }

  return response.json();
}

export async function getCustomer(customerId: string): Promise<any> {
  return fetchFromWordPress<any>(`/wc/v3/customers/${customerId}`);
}

export async function searchProducts(query: string, limit = 10): Promise<Product[]> {
  return fetchFromWordPress<Product[]>('/wc/v3/products', {
    search: query,
    per_page: String(limit),
  });
}

export function getWordPressImageUrl(image: { source_url: string }): string {
  return image?.source_url || '';
}
