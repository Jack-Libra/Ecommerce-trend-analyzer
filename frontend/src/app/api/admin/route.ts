import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: 改為 fetch('https://your-fastapi-url/admin')
  const res = await fetch('https://ecommerce-trend-analyzer.vercel.app/' + '/admin');
  const data = await res.json();
  return NextResponse.json(data);
}
