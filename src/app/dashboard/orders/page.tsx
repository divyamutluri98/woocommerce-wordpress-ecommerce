'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, ChevronRight, Eye, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  items: { name: string; quantity: number; image?: string }[];
  shippingAddress?: {
    address1: string;
    city: string;
    state: string;
    zip: string;
  };
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  REFUNDED: 'bg-gray-100 text-gray-800',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data.orders || mockOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  };

  const mockOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      status: 'DELIVERED',
      total: 299.99,
      createdAt: '2024-01-15',
      items: [
        { name: 'Wireless Headphones Pro', quantity: 1 },
        { name: 'USB-C Cable', quantity: 2 },
      ],
      shippingAddress: {
        address1: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      },
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      status: 'SHIPPED',
      total: 149.99,
      createdAt: '2024-01-20',
      items: [
        { name: 'Smart Watch Series X', quantity: 1 },
      ],
      shippingAddress: {
        address1: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      },
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      status: 'PROCESSING',
      total: 79.99,
      createdAt: '2024-01-22',
      items: [
        { name: 'Bluetooth Speaker', quantity: 1 },
      ],
      shippingAddress: {
        address1: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">My Orders</h2>
        <p className="text-muted-foreground">View and track your orders</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading orders...</div>
      ) : orders.length === 0 ? (
        <Card className="p-8 text-center">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">No orders yet</p>
          <Link href="/products">
            <Button>Start Shopping</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{order.orderNumber}</h3>
                    <Badge className={statusColors[order.status]}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item, index) => (
                    <span key={index} className="text-sm text-muted-foreground">
                      {item.quantity}x {item.name}
                    </span>
                  ))}
                </div>
                {order.shippingAddress && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {order.shippingAddress.address1}, {order.shippingAddress.city},{' '}
                    {order.shippingAddress.state} {order.shippingAddress.zip}
                  </div>
                )}
              </div>

              <Link href={`/orders/track?order=${order.orderNumber}`}>
                <Button variant="ghost" className="mt-4 w-full justify-center">
                  Track Order <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
