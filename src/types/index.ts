export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: 'USER' | 'ADMIN';
  emailVerified: Date | null;
  createdAt: Date;
}

export interface Address {
  id: string;
  type: 'BILLING' | 'SHIPPING';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  email: string;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  items: OrderItem[];
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName?: string;
  rating: number;
  title?: string;
  content?: string;
  verified: boolean;
  createdAt: Date;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'PERCENTAGE' | 'FIXED';
  value: number;
  minOrderValue?: number;
  maxUses?: number;
  usedCount: number;
  expiresAt?: Date;
  active: boolean;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  active: boolean;
  createdAt: Date;
}
