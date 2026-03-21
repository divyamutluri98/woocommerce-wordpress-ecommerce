'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Package, MapPin, Clock, CheckCircle, Truck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const orderNumberFromUrl = searchParams.get('order');
  const [orderNumber, setOrderNumber] = useState(orderNumberFromUrl || '');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const trackOrder = async () => {
    if (!orderNumber) return;
    setLoading(true);
    
    setTimeout(() => {
      setOrder({
        orderNumber: orderNumber,
        status: 'SHIPPED',
        estimatedDelivery: '2024-01-25',
        timeline: [
          { status: 'Order Placed', date: '2024-01-20 10:30 AM', completed: true },
          { status: 'Payment Confirmed', date: '2024-01-20 10:35 AM', completed: true },
          { status: 'Processing', date: '2024-01-21 09:00 AM', completed: true },
          { status: 'Shipped', date: '2024-01-22 02:00 PM', completed: true },
          { status: 'Out for Delivery', date: 'Expected by Jan 25', completed: false },
          { status: 'Delivered', date: '', completed: false },
        ],
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Track Your Order</h1>
          <p className="text-muted-foreground">
            Enter your order number to see the latest status
          </p>
        </div>

        <Card className="p-6 mb-8">
          <div className="flex gap-4">
            <Input
              placeholder="Enter order number (e.g., ORD-2024-001)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="flex-1"
            />
            <Button onClick={trackOrder} disabled={loading || !orderNumber}>
              {loading ? 'Tracking...' : 'Track'}
            </Button>
          </div>
        </Card>

        {order && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="text-xl font-bold">{order.orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="font-semibold">{order.estimatedDelivery}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Order Shipped</p>
                <p className="text-sm text-muted-foreground">
                  Your package is on its way
                </p>
              </div>
            </div>

            <h3 className="font-semibold mb-4">Order Timeline</h3>
            <div className="space-y-4">
              {order.timeline.map((step: any, index: number) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Package className="h-5 w-5" />
                      )}
                    </div>
                    {index < order.timeline.length - 1 && (
                      <div className={`w-0.5 h-8 ${
                        order.timeline[index + 1]?.completed 
                          ? 'bg-green-100' 
                          : 'bg-muted'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className={`font-medium ${step.completed ? '' : 'text-muted-foreground'}`}>
                      {step.status}
                    </p>
                    {step.date && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {step.date}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium mb-2">Shipping Address</h4>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <p>
                  123 Main Street<br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
