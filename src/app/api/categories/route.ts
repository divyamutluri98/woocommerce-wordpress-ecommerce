import { NextResponse } from 'next/server';
import { categories } from '@/data/products';

export async function GET() {
  return NextResponse.json(categories);
}
