'use client';

import { useState } from 'react';
import { Tag, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function CouponsPage() {
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const validateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult({
          success: true,
          message: `Coupon applied! ${data.coupon.type === 'PERCENTAGE' ? `${data.coupon.value}% off` : `$${data.coupon.value} off`}`,
        });
      } else {
        setResult({ success: false, message: data.message });
      }
    } catch {
      setResult({ success: false, message: 'Failed to validate coupon' });
    } finally {
      setLoading(false);
    }
  };

  const availableCoupons = [
    { code: 'SAVE10', discount: '10% off', minOrder: '$50', expires: 'Dec 31, 2024' },
    { code: 'FLAT20', discount: '$20 off', minOrder: '$100', expires: 'Dec 31, 2024' },
    { code: 'NEWUSER', discount: '15% off', minOrder: 'No minimum', expires: 'Never' },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Coupons & Deals</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Save big with our exclusive coupons and promotions
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="p-8 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Apply Coupon Code
            </h2>
            <form onSubmit={validateCoupon} className="flex gap-2">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1 font-mono text-lg"
              />
              <Button type="submit" disabled={loading || !couponCode.trim()}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Apply'
                )}
              </Button>
            </form>

            {result && (
              <div
                className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
                  result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}
              >
                {result.success ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
                <span>{result.message}</span>
              </div>
            )}
          </Card>

          <h2 className="text-2xl font-bold mb-6">Available Coupons</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {availableCoupons.map((coupon) => (
              <Card key={coupon.code} className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full" />
                <Tag className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-2xl font-bold font-mono mb-2">{coupon.code}</h3>
                <p className="text-xl font-semibold text-primary mb-4">{coupon.discount}</p>
                <div className="space-y-1 text-sm text-muted-foreground mb-4">
                  <p>Min. order: {coupon.minOrder}</p>
                  <p>Expires: {coupon.expires}</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full font-mono"
                  onClick={() => setCouponCode(coupon.code)}
                >
                  Use Code
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
          <ul className="text-muted-foreground max-w-2xl mx-auto space-y-2 text-left">
            <li>• Coupons cannot be combined with other offers</li>
            <li>• Only one coupon code can be used per order</li>
            <li>• Coupons are valid for a limited time only</li>
            <li>• Minimum order requirements must be met</li>
            <li>• Some products may be excluded from promotions</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
