import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { code, amount } = await request.json();

    if (!code || !amount) {
      return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    const coupon = mockCoupons.find((c) => c.code.toUpperCase() === code.toUpperCase());

    if (!coupon || !coupon.active) {
      return NextResponse.json({ message: 'Invalid coupon' }, { status: 404 });
    }

    if (coupon.minOrderValue && amount < coupon.minOrderValue) {
      return NextResponse.json({
        message: `Minimum order value is $${coupon.minOrderValue}`,
      }, { status: 400 });
    }

    let discount = 0;
    if (coupon.type === 'PERCENTAGE') {
      discount = (amount * coupon.value) / 100;
    } else {
      discount = Math.min(coupon.value, amount);
    }

    return NextResponse.json({
      success: true,
      discount,
      newTotal: amount - discount,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

const mockCoupons = [
  { id: '1', code: 'SAVE10', type: 'PERCENTAGE', value: 10, minOrderValue: 50, active: true },
  { id: '2', code: 'FLAT20', type: 'FIXED', value: 20, minOrderValue: 100, active: true },
];
