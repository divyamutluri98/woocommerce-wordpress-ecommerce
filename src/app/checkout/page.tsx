'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });

  const subtotal = getSubtotal();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStep('success');
    clearCart();
    setIsProcessing(false);
  };

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Add some products to checkout</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your order. You will receive a confirmation email shortly.
          </p>
          <div className="space-y-4">
            <p className="font-semibold">Order Number: ORD-{Date.now().toString(36).toUpperCase()}</p>
            <Button className="w-full" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/products">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {step === 'info' ? '1' : '✓'}
                </span>
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {step === 'info' ? '2' : '✓'}
                </span>
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Street Address</label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">City</label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">State</label>
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">ZIP Code</label>
                  <Input
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    placeholder="10001"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Country</label>
                  <Input
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  3
                </span>
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <CreditCard className="h-5 w-5" />
                <span className="font-medium">Credit Card</span>
                <span className="ml-auto text-xs bg-muted px-2 py-1 rounded">Recommended</span>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Card Number</label>
                  <Input placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Expiry Date</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CVC</label>
                    <Input placeholder="123" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </CardContent>
          </Card>

          <Button
            size="lg"
            className="w-full"
            onClick={handlePlaceOrder}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Place Order - ${formatPrice(total)}`}
          </Button>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                      <Image
                        src={item.product.images[0]?.src || '/api/placeholder/200/200'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
