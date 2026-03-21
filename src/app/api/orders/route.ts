import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    orders: mockOrders,
  });
}

const mockOrders = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    status: 'DELIVERED',
    email: 'user@example.com',
    total: 299.99,
    subtotal: 269.99,
    shipping: 15,
    tax: 15,
    discount: 0,
    createdAt: '2024-01-15',
    itemCount: 2,
    items: [
      { id: '1', productId: '1', name: 'Wireless Headphones Pro', price: 199.99, quantity: 1, total: 199.99 },
      { id: '2', productId: '5', name: 'USB-C Cable', price: 29.99, quantity: 2, total: 59.99 },
    ],
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
    },
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    status: 'SHIPPED',
    email: 'user@example.com',
    total: 149.99,
    subtotal: 134.99,
    shipping: 15,
    tax: 0,
    discount: 0,
    createdAt: '2024-01-20',
    itemCount: 1,
    items: [
      { id: '3', productId: '2', name: 'Smart Watch Series X', price: 399.99, quantity: 1, total: 149.99 },
    ],
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
    },
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    status: 'PROCESSING',
    email: 'user@example.com',
    total: 79.99,
    subtotal: 79.99,
    shipping: 0,
    tax: 0,
    discount: 0,
    createdAt: '2024-01-22',
    itemCount: 1,
    items: [
      { id: '4', productId: '3', name: 'Bluetooth Speaker', price: 79.99, quantity: 1, total: 79.99 },
    ],
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
    },
  },
];
