export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  regularPrice: number;
  salePrice?: number;
  onSale: boolean;
  stockStatus: StockStatus;
  stockQuantity: number;
  categories: ProductCategory[];
  tags: ProductTag[];
  images: ProductImage[];
  attributes: ProductAttribute[];
  relatedIds: string[];
  averageRating: number;
  reviewCount: number;
  featured: boolean;
  sku?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description?: string;
  image?: ProductImage;
}

export interface ProductTag {
  id: number;
  name: string;
  slug: string;
}

export interface ProductImage {
  id: number;
  src: string;
  alt: string;
  name: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  slug: string;
  options: string[];
  visible: boolean;
  variation: boolean;
}

export type StockStatus = 'instock' | 'outofstock' | 'onbackorder';

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  customerNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'on-hold'
  | 'completed'
  | 'cancelled'
  | 'refunded'
  | 'failed';

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  billingAddress: Address;
  shippingAddress: Address;
  ordersCount: number;
  totalSpent: number;
  avatarUrl?: string;
}

export interface Review {
  id: string;
  productId: string;
  reviewer: string;
  reviewerEmail: string;
  rating: number;
  review: string;
  status: 'approved' | 'pending' | 'spam';
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  data?: {
    status: number;
  };
}
