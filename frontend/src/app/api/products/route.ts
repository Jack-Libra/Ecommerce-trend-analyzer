import { NextResponse } from 'next/server';

export async function GET() {
  // fetch FastAPI /products/top
  const res = await fetch('https://ecommerce-trend-analyzer.vercel.app/' + '/products/top');
  const data = await res.json();
  return NextResponse.json(data);
}
