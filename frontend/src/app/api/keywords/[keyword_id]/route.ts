import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { keyword_id: string } }) {
  const { keyword_id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/keywords/${keyword_id}`);
  const data = await res.json();
  return NextResponse.json(data);
}
