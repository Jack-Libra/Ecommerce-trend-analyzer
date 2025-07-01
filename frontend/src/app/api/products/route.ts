import { NextResponse } from 'next/server';

export async function GET() {
  // fetch FastAPI /products/top
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/products/top');
  const data = await res.json();
  return NextResponse.json(data);
}
