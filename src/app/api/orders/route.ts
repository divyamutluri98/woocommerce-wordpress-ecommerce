import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer, shippingAddress, paymentIntentId } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in order' },
        { status: 400 }
      );
    }

    if (!customer?.email) {
      return NextResponse.json(
        { error: 'Customer email is required' },
        { status: 400 }
      );
    }

    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const order = {
      id: orderId,
      orderNumber: orderId,
      status: 'pending',
      items: items.map((item: any) => ({
        productId: item.productId,
        productName: item.product?.name || 'Unknown Product',
        quantity: item.quantity,
        price: item.product?.price || 0,
        total: (item.product?.price || 0) * item.quantity,
      })),
      subtotal: items.reduce(
        (sum: number, item: any) => sum + (item.product?.price || 0) * item.quantity,
        0
      ),
      shipping: 9.99,
      tax: items.reduce(
        (sum: number, item: any) => sum + (item.product?.price || 0) * item.quantity,
        0
      ) * 0.08,
      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
      },
      shippingAddress,
      paymentIntentId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
