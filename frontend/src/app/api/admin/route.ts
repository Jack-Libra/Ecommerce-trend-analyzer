import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/admin');
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}
