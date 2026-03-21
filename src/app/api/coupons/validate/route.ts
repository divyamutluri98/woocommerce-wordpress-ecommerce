import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ message: 'Coupon code is required' }, { status: 400 });
    }

    const coupon = mockCoupons.find((c) => c.code.toUpperCase() === code.toUpperCase());

    if (!coupon) {
      return NextResponse.json({ message: 'Invalid coupon code' }, { status: 404 });
    }

    if (!coupon.active) {
      return NextResponse.json({ message: 'This coupon has expired' }, { status: 400 });
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json({ message: 'This coupon has expired' }, { status: 400 });
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({ message: 'This coupon has reached its usage limit' }, { status: 400 });
    }

    return NextResponse.json({ success: true, coupon });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to validate coupon' }, { status: 500 });
  }
}

const mockCoupons = [
  { id: '1', code: 'SAVE10', type: 'PERCENTAGE', value: 10, minOrderValue: 50, active: true, usedCount: 0, maxUses: 100, expiresAt: '2024-12-31' },
  { id: '2', code: 'FLAT20', type: 'FIXED', value: 20, minOrderValue: 100, active: true, usedCount: 0, maxUses: 50, expiresAt: '2024-12-31' },
  { id: '3', code: 'NEWUSER', type: 'PERCENTAGE', value: 15, minOrderValue: 0, active: true, usedCount: 0, maxUses: null, expiresAt: null },
];
